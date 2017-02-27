import Express from "express";
import axios from "axios";
import * as firebase from "firebase";
import ipaddr from 'ipaddr.js';
import bodyParser from 'body-parser';
import moment from 'moment';

let app = Express();

let config = {
  apiKey: "AIzaSyAxcZJyF6UL9DeDKNdZxUsEpaq3970F-HY",
  authDomain: "dsd-testing-tool.firebaseapp.com",
  databaseURL: "https://dsd-testing-tool.firebaseio.com",
  storageBucket: "dsd-testing-tool.appspot.com",
  messagingSenderId: "170770944657"
};
firebase.initializeApp(config);

let database = firebase.database();

let addNodeInfo = (nodeInfo) => {
  database.ref("nodes/" + nodeInfo.nodeId).update({
    pid: nodeInfo.pid,
    nodePort: nodeInfo.port
  })
};

let addPyInfo = (pyInfo) => {
  database.ref("nodes/" + pyInfo.nodeId).update({
    pyPort: pyInfo.port,
    ip: pyInfo.ip
  })
};

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/v1/node-info', (req, res) => {
  if (!req.query.nodeId) {
    res.send('must provide a nodeId')
  }
  addNodeInfo({
    nodeId: req.query.nodeId,
    port: req.query.port,
    pid: req.query.pid
  });
  res.send('pid sent');
});

let convertIp = (ip) => {
  if (ipaddr.IPv4.isValid(ip)) {
    return ip;
  } else if (ipaddr.IPv6.isValid(ip)) {
    return ipaddr.IPv6.parse(ip).toIPv4Address().toString();
  }
};

app.get('/api/v1/py-info', (req, res) => {
  if (!req.query.nodeId) {
    res.send('must provide a nodeId')
  }
  addPyInfo({
    nodeId: req.query.nodeId,
    ip: convertIp(req.ip),
    port: req.query.port
  });
  res.send('py port sent');
});

const killProcess = (nodeId, callback, errCallback) => {
  return database.ref('nodes/' + nodeId).once('value').then((snapshot) => {
    let node = snapshot.val();
    console.log(node);
    return axios.get(`http://${node.ip}:${node.pyPort}/kill-process?pid=${node.pid}`).then((response) => {
      if (!callback) {
        callback(response);
      }
    }).catch((err) => {
      if (!errCallback) {
        errCallback(err);
      }
    })
  })
};

app.get('/api/v1/kill-process', (req, res) => {
  if (!req.query.nodeId) {
    res.send('must provide a nodeId');
  }
  killProcess(req.query.nodeId,(response) => {
    if (response.data === 'success') {
      res.send("kill succeeded")
    } else {
      res.send("kill failed from python receiver")
    }
  }, (err) => {
    console.log(err);
    res.send("kill failed due to internal error of node server")
  });
});

app.get('/api/v1/generate-node-id', (req, res) => {
  let nodeId = database.ref('nodes').push().key;
  res.send(nodeId);
});

app.param('taskId', (req, res, next, taskId) => {
  database.ref(`tasks/${taskId}`).once('value').then((snapshot) => {
    let task = snapshot.val();
    task.id = taskId;
    console.log(task);
    req.task = task;
    next();
  })
});

app.param('actionId', (req, res, next, actionId) => {
  req.actionRef = database.ref(`actions/${actionId}`);
  next();
});

app.get('/api/v1/actions/:actionId', (req, res) => {
  req.actionRef.once('value').then((snapshot) => {
    let action = snapshot.val();
    res.json({
      success: 'ok',
      data: action
    });
  })
});

app.post('/api/v1/actions', (req, res) => {
  let action = database.ref('actions').push();
  action.set({
    name: req.body.name,
    request: req.body.request,
    responseExpected: req.body.responseExpected,
    repeat: req.body.repeat,
    killProcess: req.body.killProcess,
    delay: req.body.delay,
    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
  }).then(() => {
    res.json({success: 'ok'})
  })
});

app.get('/api/v1/actions', (req, res) => {
  database.ref('actions').once('value', (snapshot) => {
    let actions = [];
    snapshot.forEach((child) => {
      console.log(`${child.key}`);
      if (!child.val().deleted) {
        actions.push({id: child.key, value: child.val()})
      }
    });
    res.json({
      success: 'ok',
      data: actions
    });
  })
});

app.put('/api/v1/actions/:actionId', (req, res) => {
  req.actionRef.update({
    name: req.body.name,
    request: req.body.request,
    responseExpected: req.body.responseExpected,
    repeat: req.body.repeat,
    killProcess: req.body.killProcess,
    delay: req.body.delay,
    createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
  }).then(() => {
    res.json({success: 'ok'})
  })
});

app.delete('/api/v1/actions/:actionId', (req, res) => {
  req.actionRef.update({
    modifiedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    deleted: true
  }).then(() => {
    res.json({success: 'ok'})
  })
});

app.get('/api/v1/tasks/:taskId/run', (req, res) => {
  killProcessFromTask(task).then(() => {
    let caseActions = req.task.caseActions;
    let actionsProm = caseActions.actions.map((actionId) => {
      return database.ref(`actions/${actionId}`).once('value').then((snapshot) => {
        let action = snapshot.val();
        action.id = actionId;
        return action;
      })
    });
    if (caseActions.way == 1) { //concurrently
      Promise.all(actionsProm).then((actions) => {
        let actionArr = [];
        actions.map((action) => {
          for (let cnt = 0; cnt < action.repeat; cnt++) {
            actionArr.push(action);
          }
        });
        axios.all(actionArr.map((act) => {
          makeRequest(act);
        })).then(axios.spread((responses) => {
          console.log(responses);
        }));
      })
    } else if (caseActions.way == 2) { // sequentially
      Promise.all(actionsProm).then((actions) => {
        actions.map((action) => {
          executeSingleAction(action);
        })
      });
    }
  });
  res.json({success: 'ok'})
});

const handleKillProcessResult = (taskId, res) => {
  database.ref(`tasks/${taskId}/killProcessResult`).push({
    killProcessResult: {
      status: res.status,
      data: res.data
    }
  })
};

const killProcessFromTask = (task) => {
  let resultsProm = [];
  if (!task.killProcess) {
    resultsProm = task.killProcess.nodeIds.map((nodeId) => {
        return killProcess(nodeId, (response) => {
          handleKillProcessResult(task.id, response);
        }, (err) => {
          handleKillProcessResult(task.id, err.response)
        })
    });
  }
  return Promise.all(resultsProm);
};

const executeSingleAction = (action) => {
  for (let cnt = 1; cnt <= action.repeat; cnt++) {
    setTimeout(() => {
      makeRequest(action)
    }, action.delay * cnt)
  }
};

const makeRequest = (action) => {
  return axios(action.request).then((res) => {
    handleActionRes(res, action.id);
  }).catch((err) => {
    handleActionRes(err.response, action.id);
  })
};

const handleActionRes = (res, actionId) => {
  database.ref(`actions/${actionId}/responses`).push({
      status: res.status,
      data: res.data
  });
};

app.listen(4000);
