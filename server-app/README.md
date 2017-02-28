##action structure
```js
{
  name: name
  request: {
    method: GET,
    url: http://ip:port/path1/path2/path3?param1=val1&param2=val2,
    data: {},
    headers: {},
  },
  responseExpected: {
    code: 200,
    data: {}
  },
  responses: {
    
  }
  repeat: 1,
  delay: 5, (millisecond) 
}
```

##task structure
```js
{
  name: name,
  killProcess: {
    nodeIds: [abcd]
  },
  killProcessResult: {
        
  }
  caseActions: {
    way: 1(concurrently) | 2(sequentially)
    actions: [id1, id2, id3]
  },
  verifyActions: [id1, id2, id3]
}
```