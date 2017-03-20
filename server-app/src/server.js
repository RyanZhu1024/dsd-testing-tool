import Express from "express";
import axios from "axios";
import * as firebase from "firebase";
import ipaddr from 'ipaddr.js';
import bodyParser from 'body-parser';
import moment from 'moment';

const TaskResScope = {
  responses: "responses",
  verifyResponses: "verifyResponses"
};

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
  return database.ref("nodes/" + nodeInfo.nodeId).update({
    pid: nodeInfo.pid,
    nodePort: nodeInfo.port
  })
};

let addPyInfo = (pyInfo) => {
  return database.ref("nodes/" + pyInfo.nodeId).update({
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
  }).then(() => {
    res.send('pid sent');
  });
});

app.get('/api/v1/nodes', (req, res) => {
  database.ref('nodes').once('value', (snapshot) => {
    let nodes = [];
    snapshot.forEach((child) => {
      console.log(`Node Id: ${child.key}`);
      nodes.push(Object.assign({}, child.val(), {id: child.key}))
    });
    console.log(`Nodes: ${JSON.stringify(nodes)}`);
    res.json({
      success: 'ok',
      data: nodes
    });
  })
});

app.param('nodeId', (req,res, next, nodeId) => {
  database.ref("nodes/" + nodeId).once('value').then((snapshot) => {
    const node = snapshot.val();
    node.id = nodeId;
    req.node = node;
    next();
  })
});

app.get('/api/v1/node-info/:nodeId', (req, res) => {
  console.log(req.node);
  res.json(req.node);
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
  }).then(() => {
    res.send('py port sent');
  });
});

const killProcess = (nodeId, callback, errCallback) => {
  return database.ref('nodes/' + nodeId).once('value').then((snapshot) => {
    let node = snapshot.val();
    console.log(node);
    return axios.get(`http://${node.ip}:${node.pyPort}/kill-process?pid=${node.pid}`).then((response) => {
      if (callback) {
        callback(response);
      }
    }).catch((err) => {
      if (errCallback) {
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
    console.log(`current task: ${taskId}`);
    console.log(`deleted: ${task.deleted}`);
    req.task = task;
    next();
  })
});

app.param('actionId', (req, res, next, actionId) => {
  req.actionRef = database.ref(`actions/${actionId}`);
  req.actionId = actionId;
  next();
});

app.get('/api/v1/actions/:actionId', (req, res) => {
  req.actionRef.once('value').then((snapshot) => {
    let action = snapshot.val();
    console.log(action);
    action.id = req.actionId;
    res.json({
      success: 'ok',
      data: action
    });
  }).catch((err) => {
    console.log(err);
  })
});

app.post('/api/v1/actions', (req, res) => {
  let action = database.ref('actions').push();
  req.body.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
  action.set(req.body).then(() => {
    req.body.id = action.key;
    res.json({success: 'ok', data: req.body})
  })
});

app.get('/api/v1/actions', (req, res) => {
  database.ref('actions').once('value', (snapshot) => {
    let actions = [];
    snapshot.forEach((child) => {
      console.log(`${child.key}`);
      if (!child.val().deleted) {
        let action = child.val();
        actions.push(Object.assign({}, action, {id: child.key}))
      }
    });
    res.json({
      success: 'ok',
      data: actions
    });
  })
});

app.put('/api/v1/actions/:actionId', (req, res) => {
  console.log("update action" + JSON.stringify(req.body));
  req.body.modifiedAt = moment().format('MMMM Do YYYY, h:mm:ss a');
  req.actionRef.update(req.body).then(() => {
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

app.post('/api/v1/tasks', (req, res) => {
  let task = database.ref('tasks').push();
  req.body.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
  req.body.way = parseInt(req.body.way);
  task.set(req.body).then(() => {
    req.body.id = task.key;
    res.json({success: 'ok', data: req.body});
  })
});

app.get('/api/v1/tasks', (req, res) => {
  database.ref('tasks').once('value', (snapshot) => {
    let tasks = [];
    snapshot.forEach((child) => {
      console.log(`${child.key}`);
      if (!child.val().deleted) {
        tasks.push({
          id: child.key,
          way: child.val().way,
          actions: child.val().actions,
          createdAt: child.val().createdAt,
          modifiedAt: child.val().modifiedAt,
          nodeIdsToKill: child.val().nodeIdsToKill,
          name: child.val().name,
        })
      }
    });
    res.json({
      success: 'ok',
      data: tasks
    });
  })
});

app.get('/api/v1/tasks/:taskId', (req, res) => {
  res.json({
    success: 'ok',
    data: {
      id: req.task.id,
      way: req.task.way,
      actions: req.task.actions,
      createdAt: req.task.createdAt,
      modifiedAt: req.task.modifiedAt,
      nodeIdsToKill: req.task.nodeIdsToKill,
      name: req.task.name,
      deleted: req.task.deleted
    }
  });
});

app.delete('/api/v1/tasks/:taskId', (req, res) => {
  database.ref(`tasks/${req.task.id}`).update({
    modifiedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    deleted: true
  }).then(() => {
    res.json({success: 'ok'})
  })
});

app.put('/api/v1/tasks/:taskId', (req, res) => {
  req.body.modifiedAt = moment().format('MMMM Do YYYY, h:mm:ss a');
  req.body.way = parseInt(req.body.way);
  database.ref(`tasks/${req.task.id}`).update(req.body).then(() => {
    res.json({success: 'ok'})
  })
});

app.get('/api/v1/tasks/:taskId/verify', (req, res) => {
  if (req.task.verifyActions) {
    let verifyActions = req.task.verifyActions;
    let actionsProm = getActionsProm(verifyActions, req);
    Promise.all(actionsProm).then((actions) => {
      actions = actions.filter((act) => !act.disable);
      axios.all(actions.map((action) => {
        return runActionWithTimeout(action);
      })).then((responses) => {
        handleTaskRes(responses, req.task, TaskResScope.verifyResponses);
      })
    })
  }
  res.json({success: 'ok'});
});


app.get('/api/v1/tasks/:taskId/run', (req, res) => {
  killProcessFromTask(req.task).then(() => {
    let actionsProm = getActionsProm(req.task.actions, req);
    if (req.task.way == 1) { //concurrently
      console.log("running concurrently");
      Promise.all(actionsProm).then((actions) => {
        let actionArr = [];
        actions.map((action) => {
          for (let cnt = 0; cnt < action.repeat; cnt++) {
            actionArr.push(runActionWithTimeout(action));
          }
        });
        console.log("start running: " + actionArr);
        axios.all(actionArr).then((responses) => {
          console.log("All actions completed " + responses.length);
          handleTaskRes(responses, req.task, TaskResScope.responses);
        });
      })
    } else if (req.task.way == 2) { // sequentially
      console.log("running sequentially");
      Promise.all(actionsProm).then((actions) => {
        let allActs = actions.reduce((acc, curAct) => {
          return acc.then((res) => {
            return executeSingleAction(curAct).then((responses) => {
              console.log("in root function " + responses);
              return res.concat(responses);
            })
          })
        }, Promise.resolve([]));
        allActs.then((responses) => {
          console.log("complete all actions");
          handleTaskRes(responses, req.task, TaskResScope.responses);
        })
      });
    }
  });
  res.json({success: 'ok'})
});

const getActionsProm = (actionIds, req) => {
  return actionIds.map((actionId) => {
    return database.ref(`actions/${actionId}`).once('value').then((snapshot) => {
      let action = snapshot.val();
      action.id = actionId;
      action.taskId = req.task.id;
      return action;
    })
  });
};

const handleKillProcessResult = (taskId, res, nodeId) => {
  database.ref(`tasks/${taskId}/killProcessResult`).push({
    status: res.status,
    data: res.data,
    nodeId: nodeId
  })
};

const killProcessFromTask = (task) => {
  let resultsProm = [];
  if (task.nodeIdsToKill) {
    resultsProm = task.nodeIdsToKill.map((nodeId) => {
        return killProcess(nodeId, (response) => {
          handleKillProcessResult(task.id, response, nodeId);
        }, (err) => {
          handleKillProcessResult(task.id, err.response, nodeId)
        })
    });
  }
  return Promise.all(resultsProm);
};

let mm = 0;
const runActionWithTimeout = (action) => {
  return new Promise(resolve => {
    setTimeout(() => {
      makeRequest(action).then((response) => {
        console.log(mm++);
        resolve(response);
      })
    }, action.delay);
  });
};

const executeSingleAction = (action) => {
  let promises = Array.from({length: action.repeat}).reduce((acc) => {
    return acc.then((res) => {
      return runActionWithTimeout(action).then((response) => {
        res.push(response);
        return res;
      });
    });
  }, Promise.resolve([]));
  return promises.then((responses) => {
    console.log("in execute single action" + responses);
    return responses;
  });
};

const makeRequest = (action) => {
  let headers = {};
  let requestVar = Object.assign({}, action.request);
  requestVar.headers.map(({key, value}) => Object.assign(headers, {key: value}));
  requestVar.headers = headers;
  return axios.request(requestVar).then((res) => {
    console.log(`completed action: ${action.name}`);
    res.action = action;
    return res;
  }).catch((err) => {
    console.log(`failed action: ${action.name}`);
    console.log(err);
    if (!err.response) {
      err.response = {
        status: err.code,
        data: err.errno,
      }
    }
    err.response.action = action;
    return err.response;
  })
};

const handleTaskRes = (responses, task, scope) => {
  let results = [];
  responses.map((response) => {
    results.push({
      actionId: response.action.id,
      status: response.status,
      data: response.data,
      completedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
    });
  });
  database.ref(`tasks/${task.id}/${scope}`).push({
    results: results,
    completedAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
  });
};

app.listen(4000);
