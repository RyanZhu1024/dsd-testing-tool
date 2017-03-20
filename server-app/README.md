##action structure
```js
{
  name: name
  request: {
    method: GET,
    url: http://ip:port/path1/path2/path3?param1=val1&param2=val2,
    data: {},
    headers: [{key:"",value:""}]
  },
  responseExpected: {
    code: 200,
    data: {}
  },
  repeat: 1,
  delay: 5, (millisecond) 
}
```

##task structure
```js
{
  name: name,
  nodeIdsToKill:  [abcd],
  killProcessResult: {
    "id": {
      completedAt: "February 27th 2017, 5:30:09 pm",
        results: [
          {
            actionId: "id",
            completedAt: "February 27th 2017, 5:30:09 pm",
            data: 11534,
            status: 200
          }
        ]
    }      
  }
  way: 1(concurrently) | 2(sequentially)
  actions: [id1, id2, id3]
  responses: {
    "id": {
      completedAt: "February 27th 2017, 5:30:09 pm",
        results: [
          {
            actionId: "id",
            completedAt: "February 27th 2017, 5:30:09 pm",
            data: 11534,
            status: 200
          }
        ]
    }
  }
  verifyActions: [id1, id2, id3]
  verifyResponses: {
    "id": {
      completedAt: "February 27th 2017, 5:30:09 pm",
        results: [
          {
            actionId: "id",
            completedAt: "February 27th 2017, 5:30:09 pm",
            data: 11534,
            status: 200
          }
        ]
    }   
  }
}
```