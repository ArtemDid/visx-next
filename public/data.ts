const rawTree = {
  "level": 0, "name": "WR1 20KTL", "content": "", "color": "#3CB371", "child":
    [
      {
        "level": 1, "name": "String 1.1", "color": "#A5BB68", "content": "2722 W", "child":
          [
            { "level": 1, "name": "1.1.1", "color": "#687abb", "content": "" },
            { "level": 1, "name": "1.1.2", "color": "#687abb", "content": "" }
          ]
      },
      {
        "level": 1, "name": "String 1.2", "color": "#A5BB68", "content": "2722 W", "child":
          [
            { "level": 1, "name": "1.1.1", "color": "#687abb", "content": "" },
            { "level": 1, "name": "1.1.2", "color": "#687abb", "content": "" }
          ]
      },
      {
        "level": 1, "name": "String 1.3", "color": "#A5BB68", "content": "2722 W", "child":
          [
            { "level": 1, "name": "1.2.1", "color": "#687abb", "content": "" },
            { "level": 1, "name": "1.2.2", "color": "#687abb", "content": "" }
          ]
      },
      {
        "level": 1, "name": "String 1.4", "color": "#A5BB68", "content": "2722 W", "child":
          [
            { "level": 1, "name": "1.3.1", "color": "#687abb", "content": "" },
            { "level": 1, "name": "1.3.2", "color": "#687abb", "content": "" }
          ]
      }
    ]
};

delete Object.assign(rawTree, {["children"]: rawTree["child"] })["child"];

rawTree["children"].map(item=>{
  delete Object.assign(item, {["children"]: item["child"] })["child"];
})

export default rawTree;

