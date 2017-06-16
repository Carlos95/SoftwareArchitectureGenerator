function init() {
	
    var $ = go.GraphObject.make;  //for conciseness in defining node templates

    myDiagram =
      $(go.Diagram, "my",  //Diagram refers to its DIV HTML element by id
        { initialContentAlignment: go.Spot.Center, "undoManager.isEnabled": true });


    // To simplify this code we define a function for creating a context menu button:
    function makeButton(text, action, visiblePredicate) {
      return $("ContextMenuButton",
               $(go.TextBlock, text),
               { click: action },
               // don't bother with binding GraphObject.visible if there's no predicate
               visiblePredicate ? new go.Binding("visible", "", function(o, e) { return o.diagram ? visiblePredicate(o, e) : false; }).ofObject() : {});
    }

    var nodeMenu =  // context menu for each Node
      $(go.Adornment, "Vertical",
        makeButton("Copy",
                   function(e, obj) { e.diagram.commandHandler.copySelection(); }),
        makeButton("Delete",
                   function(e, obj) { e.diagram.commandHandler.deleteSelection(); }),
        $(go.Shape, "LineH", { strokeWidth: 2, height: 1, stretch: go.GraphObject.Horizontal }),
        makeButton("Add top port",
                   function (e, obj) { addPort("top"); }),
        makeButton("Add left port",
                   function (e, obj) { addPort("left"); }),
        makeButton("Add right port",
                   function (e, obj) { addPort("right"); }),
        makeButton("Add bottom port",
                   function (e, obj) { addPort("bottom"); })
      );

    var portSize = new go.Size(8, 8);

    var portMenu =  // context menu for each port
      $(go.Adornment, "Vertical",
        makeButton("Remove port",
                   // in the click event handler, the obj.part is the Adornment;
                   // its adornedObject is the port
                   function (e, obj) { removePort(obj.part.adornedObject); }),
        makeButton("Change color",
                   function (e, obj) { changeColor(obj.part.adornedObject); }),
        makeButton("Remove side ports",
                   function (e, obj) { removeAll(obj.part.adornedObject); })
      );

    // the node template
    // includes a panel on each side with an itemArray of panels containing ports
    myDiagram.nodeTemplate =
      $(go.Node, "Table",
        { locationObjectName: "BODY",
          locationSpot: go.Spot.Center,
          selectionObjectName: "BODY",
          contextMenu: nodeMenu
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),

        // the body
        $(go.Panel, "Auto",
          { row: 1, column: 1, name: "BODY",
            stretch: go.GraphObject.Fill },
          $(go.Shape, "Rectangle",
            { fill: "#AC193D", stroke: null, strokeWidth: 0,
              minSize: new go.Size(56, 56) }),
          $(go.TextBlock,
            { margin: 10, textAlign: "center", font: "14px  Segoe UI,sans-serif", stroke: "white", editable: true },
            new go.Binding("text", "name").makeTwoWay())
        ),  // end Auto Panel body

        // the Panel holding the left port elements, which are themselves Panels,
        // created for each item in the itemArray, bound to data.leftArray
        $(go.Panel, "Vertical",
          new go.Binding("itemArray", "leftArray"),
          { row: 1, column: 0,
            itemTemplate:
              $(go.Panel,
                { _side: "left",  // internal property to make it easier to tell which side it's on
                  fromSpot: go.Spot.Left, toSpot: go.Spot.Left,
                  fromLinkable: true, toLinkable: true, cursor: "pointer",
                  contextMenu: portMenu },
                new go.Binding("portId", "portId"),
                $(go.Shape, "Rectangle",
                  { stroke: null, strokeWidth: 0,
                    desiredSize: portSize,
                    margin: new go.Margin(1,0) },
                  new go.Binding("fill", "portColor"))
              )  // end itemTemplate
          }
        ),  // end Vertical Panel

        // the Panel holding the top port elements, which are themselves Panels,
        // created for each item in the itemArray, bound to data.topArray
        $(go.Panel, "Horizontal",
          new go.Binding("itemArray", "topArray"),
          { row: 0, column: 1,
            itemTemplate:
              $(go.Panel,
                { _side: "top",
                  fromSpot: go.Spot.Top, toSpot: go.Spot.Top,
                  fromLinkable: true, toLinkable: true, cursor: "pointer",
                  contextMenu: portMenu },
                new go.Binding("portId", "portId"),
                $(go.Shape, "Rectangle",
                  { stroke: null, strokeWidth: 0,
                    desiredSize: portSize,
                    margin: new go.Margin(0, 1) },
                  new go.Binding("fill", "portColor"))
              )  // end itemTemplate
          }
        ),  // end Horizontal Panel

        // the Panel holding the right port elements, which are themselves Panels,
        // created for each item in the itemArray, bound to data.rightArray
        $(go.Panel, "Vertical",
          new go.Binding("itemArray", "rightArray"),
          { row: 1, column: 2,
            itemTemplate:
              $(go.Panel,
                { _side: "right",
                  fromSpot: go.Spot.Right, toSpot: go.Spot.Right,
                  fromLinkable: true, toLinkable: true, cursor: "pointer",
                  contextMenu: portMenu },
                new go.Binding("portId", "portId"),
                $(go.Shape, "Rectangle",
                  { stroke: null, strokeWidth: 0,
                    desiredSize: portSize,
                    margin: new go.Margin(1, 0) },
                  new go.Binding("fill", "portColor"))
              )  // end itemTemplate
          }
        ),  // end Vertical Panel

        // the Panel holding the bottom port elements, which are themselves Panels,
        // created for each item in the itemArray, bound to data.bottomArray
        $(go.Panel, "Horizontal",
          new go.Binding("itemArray", "bottomArray"),
          { row: 2, column: 1,
            itemTemplate:
              $(go.Panel,
                { _side: "bottom",
                  fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom,
                  fromLinkable: true, toLinkable: true, cursor: "pointer",
                  contextMenu: portMenu },
                new go.Binding("portId", "portId"),
                $(go.Shape, "Rectangle",
                  { stroke: null, strokeWidth: 0,
                    desiredSize: portSize,
                    margin: new go.Margin(0, 1) },
                  new go.Binding("fill", "portColor"))
              )  // end itemTemplate
          }
        )  // end Horizontal Panel
      );  // end Node

    // an orthogonal link template, reshapable and relinkable
    myDiagram.linkTemplate =
      $(CustomLink,  // defined below
        {
          routing: go.Link.AvoidsNodes,
          corner: 4,
          curve: go.Link.JumpGap,
          reshapable: true,
          resegmentable: true,
          relinkableFrom: true,
          relinkableTo: true
        },
        new go.Binding("points").makeTwoWay(),
        $(go.Shape, { stroke: "#2F4F4F", strokeWidth: 2 })
      );

   


    // load the diagram from JSON data
    load();
  }


  // This custom-routing Link class tries to separate parallel links from each other.
  // This assumes that ports are lined up in a row/column on a side of the node.
  function CustomLink() {
    go.Link.call(this);
  };
  go.Diagram.inherit(CustomLink, go.Link);

  CustomLink.prototype.findSidePortIndexAndCount = function(node, port) {
    var nodedata = node.data;
    if (nodedata !== null) {
      var portdata = port.data;
      var side = port._side;
      var arr = nodedata[side + "Array"];
      var len = arr.length;
      for (var i = 0; i < len; i++) {
        if (arr[i] === portdata) return [i, len];
      }
    }
    return [-1, len];
  };

  function load() {
    myDiagram.model = go.Model.fromJson(inputText);
  }