import Express from "express";
import Axios from "axios";
import * as firebase from "firebase";
import ipaddr from 'ipaddr.js';

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
}

let addPyInfo = (pyInfo) => {
  database.ref("nodes/" + pyInfo.nodeId).update({
    pyPort: pyInfo.port,
    ip: pyInfo.ip
  })
}

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
  })
  res.send('pid sent');
});

let convertIp = (ip) => {
  if (ipaddr.IPv4.isValid(ip)) {
    return ip;
  } else if (ipaddr.IPv6.isValid(ip)) {
    return ipaddr.IPv6.parse(ip).toIPv4Address().toString();
  }
}

app.get('/api/v1/py-info', (req, res) => {
  if (!req.query.nodeId) {
    res.send('must provide a nodeId')
  }
  addPyInfo({
    nodeId: req.query.nodeId,
    ip: convertIp(req.ip),
    port: req.query.port
  })
  res.send('py port sent');
});

app.get('/api/v1/kill-process', (req, res) => {
  if (!req.query.nodeId) {
    res.send('must provide a nodeId');
  }
  database.ref('nodes/' + req.query.nodeId).once('value').then((snapshot) => {
    let node = snapshot.val();
    console.log(node);
    Axios.get(`http://${node.ip}:${node.pyPort}/kill-process?pid=${node.pid}`).then((response) => {
      if (response.data === 'success') {
        res.send("kill succeeded")
      } else {
        res.send("kill failed from python receiver")
      }
    }).catch((err) => {
      console.log(err);
      res.send("kill failed due to internal error of node server")
    })
  })
});

app.get('/api/v1/generate-node-id', (req, res) => {
  let nodeId = database.ref('nodes').push().key;
  res.send(nodeId);
})

app.listen(4000);
