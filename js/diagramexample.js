import * as go from "go";
var diagram = new go.Diagram("search");
    diagram.model = new go.GraphLinksModel(
      [{ key: "Hello" },   // two node data, in an Array
       { key: "World!" }],
      [{ from: "Hello", to: "World!"}]  // one link data, in an Array
    );