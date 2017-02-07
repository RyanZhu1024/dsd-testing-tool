import Express from "express";
import Axios from "axios";

let app = Express();

app.get('/', (req, res) => {
  res.send('hello world');
})

app.get('/api/v1/node-info', (req, res) => {
  console.log(req.query);
  console.log(req.ip);
  res.send('pid sent');
})

app.get('/api/v1/py-info', (req, res) => {
  console.log(req.query);
  console.log(req.ip);
  res.send('py port sent');
})

app.get('/api/v1/kill-process', (req, res) => {
  Axios.get('http://localhost:5000/kill-process?pid=31600').then((res) => {
    console.log(res);
    res.send("kill succeeded")
  }).catch((err) => {
    console.log(err);
    res.send("kill failed")
  })
})

app.listen(4000)
