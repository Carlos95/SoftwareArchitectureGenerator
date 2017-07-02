var DecisionTree = function(data) {
  
  this.initial = data.initial;
  this.choices = data.choices;
  
  /* Return an array of choice objects for the root of the tree */
  this.getInitial = function() {
    
    if (!this.initial) throw 'DecisionTree: no initial choice(s) specified';
    return this.getChoices(this.initial);
    
  };
  
  /* Get full choice data by specific id */
  this.getChoice = function(id) {

    if (!(id in this.choices)) return false;
    if (!('id' in this.choices[id])) this.choices[id].id = id;
    return this.choices[id];
    
  };
  
  /* As above, but passing an array of choice IDs */
  this.getChoices = function(idList) {
    if(!idList) return [];
    var list = [];
    for(var i = 0, ln = idList.length; i < ln; i++) {
      var childChoice = this.getChoice(idList[i]);
      list.push(childChoice);
    }
    return list;
    
  };
  
  /* Get an array of choice data for a parent id */
  this.getChildren = function(parentId) {
    
    if (!(parentId in this.choices)) return false;
    if (!('children' in this.choices[parentId])) return false;
    
    var childIds = this.choices[parentId].children;
    return this.getChoices(childIds);
    
  };
  
  /* Get an array of choice data for the parent(s) of an id */
  this.getParents = function(id) {
    
    var parents = [];
    var node = this.getChoice(id);
    
    while(node.parent) {
      node = this.getChoice(node.parent);
      parents.unshift(node);
    }
    
    return parents;
    
  };
  
  /* Get just an array of ids for the parents of a specific id */
  this.getParentIds = function(id) {
    var parents = this.getParents(id);
    var parentIds = [];
    for(var i = 0, ln = parents.length; i < ln; i++) {
      parentIds.push(parents[i].id);
    }
    return parentIds;
  };
  
  /* Get the 'name' prop for the parent of an id */
  this.getParentName = function(id) {
    var parent = this.getParents(id).pop();
    if(!parent) {
      return false;
    } else {
      return parent.name;
    }
  };
  
  /* Init - insert ids into choice objects, check dups, associate parents, etc */
  this.init = function() {
    
    var idList = [];
    for(var k in this.choices) {
      if(idList.indexOf(k) !== -1) throw 'DecisionTree: duplicate ID "' + k + '" in choice set';
      
      var choice = this.getChoice(k);
      choice.id = k;
      
      var children = this.getChildren(k);
      for(var i = 0; i < children.length; i++) {
        
        var child = children[i];
        if(child.parent) throw 'DecisionTree: tried to assign parent "' + k + '" to child "' + choice.children[i] + '" which already has parent "' + child.parent + '"';
        child.parent = k;
       
      }
      
    }
    
    console.log('init', this.initial, this.choices);
    
  };
  
  this.init();
  
};


/*** TEST DATA ***/

var data = {
  initial: ['Is the system that you desire automated?yes', 'Is the system that you desire automated?no'],
  choices: {
    
    // AUTOMATED
    
    'Is the system that you desire automated?yes': {
      name: 'Yes',
      children: ['yes (automated)']
    },
    
    'Is the system that you desire automated?no': {
        name: 'No',
        children: ['no (automated)']
      },
    
      'no (automated)': {
         name: 'Is user interaction needed?',
         children: ['Is user interaction needed?yes', 'Is user interaction needed?no']
       },
       // USER INTERACTION
       'Is user interaction needed?yes': {
    	   name: 'Yes',
    	   children: ['yes (user interaction)']
       	},
       
       'Is user interaction needed?no': {
           name: 'No',
           children: ['no (user interaction)']
         },
       
         'no (user interaction)': {
             name: 'No answer'
            
          },    
         
          'yes (user interaction)': {
        	  name: 'Is the collection of observations needed?',
        	  children: ['Is the collection of observations needed?yes', 'Is the collection of observations needed?no']
           },   
           	// COLLECTION OF OBSERVATIONS
           	'Is the collection of observations needed?yes': {
           		name: 'Yes',
           		children: ['yes (observations)']
           	 },
       
           	'Is the collection of observations needed?no': {
           		name: 'No',
           	    children: ['no (observations)']
           	 },
         
           	 	'yes (observations)': {
           	 		name: 'Data curation: DATA ANNOTATION',
          
           	 	 },
          
           	 	 'no (observations)': {
           	 		 name: 'No answer',
           
           	 	  },
         
         
    'yes (automated)': {
        name: 'Is the collection of data needed?',
        children: ['Is the collection of data needed?yes', 'Is the collection of data needed?no']
      },
    
    'Is the collection of data needed?yes': {
      name: 'Yes',
      children: ['yes (collection of data)']
    },
    
    'Is the collection of data needed?no': {
        name: 'No',
        children: ['no (collection of data)']
     },
    
    'yes (collection of data)': {
        name: 'Is a catalogue needed?',
        children: ['Is a catalogue needed?yes', 'Is a catalogue needed?no']
      },
      
      'no (collection of data)': {
          name: 'No answer'
        },
    
    'Is a catalogue needed?yes': {
        name: 'Yes',
        children: ['yes (catalogue)']
      },
      
      'Is a catalogue needed?no': {
          name: 'No',
          children: ['no (catalogue)']
        },
     
      'yes (catalogue)': {
          name: 'Is a unique identifier needed?',
          children: ['Is a unique identifier needed?yes', 'Is a unique identifier needed?no']
        },
        
        'no (catalogue)': {
            name: 'Will you require management of many instruments or sensors?',
            children: ['Will you require management of many instruments or sensors?yes', 'Will you require management of many instruments or sensors?no']
          }, 
      
          'Will you require management of many instruments or sensors?yes': {
              name: 'Yes',
              children: ['yes (Instrument controller)']
            },
            
            'Will you require management of many instruments or sensors?no': {
                name: 'No',
                children: ['no (Instrument controller)']
              },
            
              'yes (Instrument controller)' : {
            	  name: 'Data Acquisition:Collect Data'
              },
              
              'no (Instrument controller)' : {
            	  name: 'No answer'
              },
              
     'Is a unique identifier needed?yes': {
          name: 'Yes',
          children: ['yes (UI)']
        },
    
        'Is a unique identifier needed?no': {
            name: 'No',
            children: ['no (UI)']
          },
      'yes (UI)' : {
    	  name:'Data Curation: PRESERVATION'
      },
      
      'no (UI)' : {
    	  name:'No answer'
      }
    
   
  }
};

/** TEST CODE **/

$(function() {
  
  var tree = new DecisionTree(data);
  var $list = $('#choices');
  var $title = $('h3');
  
  var current_id = null;
  
  var renderList = function(items) {
    
    var title = tree.getParentName(items[0].id);
    if(title) {
      $title.text(title);
    } else {
      $title.text('Is the system that you desire automated?');
    }
    
    $list.empty();
    for(var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.name == "No answer"){
    	  $list.append('<li><a href="#" data-choice="' + item.id + '">No answer in our system suitable for your choices.<br><br> Please press restart and try again</a></li>');
      }
      else if (item.name == "Data Curation: PRESERVATION" ){
    	  $list.append('<li><a href="#" data-choice="' + item.id + '">Data Curation: Preservation <br><br> You can find the visualisation of the system at the bottom of the page.</a></li>');
      }
      
      else if (item.name == "Data Acquisition:Collect Data"){
    	  $list.append('<li><a href="#" data-choice="' + item.id + '">Data Acquisition: Collect Data <br><br> You can find the visualisation of the system at the bottom of the page.</a></li>');
      }
      
      else if (item.name == "Data curation: DATA ANNOTATION"){
    	  $list.append('<li><a href="#" data-choice="' + item.id + '">Data curation: Data Annotation <br><br> You can find the visualisation of the system at the bottom of the page.</a></li>');
      }
      else if (title == "Yes" || title=="No"){
    	  $list.append('<li><a href="#" data-choice="' + item.id + '">Press to go to next question</a></li>');
      }
      
      
      else{
      $list.append('<li><a href="#" data-choice="' + item.id + '">' + item.name + '</a></li>');
      }
      //////////////////////
      if (item.name == 'Data Curation: PRESERVATION'){
    	  window.init({ "class": "go.GraphLinksModel",
	    	  "copiesArrays": true,
	    	  "copiesArrayObjects": true,
	    	  "linkFromPortIdProperty": "fromPort",
	    	  "linkToPortIdProperty": "toPort",
	    	  "nodeDataArray": [
	    	{"key":1, "name":"Catalogue Service", "loc":"300 104",
	    	 "leftArray":[ {"portColor":"#425e5c", "portId":"left0"} ],
	    	 "topArray":[  ],
	    	 "bottomArray":[ {"portColor":"#316571", "portId":"bottom0"} ],
	    	 "rightArray":[  ] },
	    	{"key":2, "name":"Data Transporter", "loc":"080 180",
	    	 "leftArray":[  ],
	    	 "topArray":[ {"portColor":"#dd45c7", "portId":"top0"} ],
	    	 "bottomArray":[ {"portColor":"#dd45c7", "portId":"bottom0"},{"portColor":"#995aa6", "portId":"bottom1"} ],
	    	 "rightArray":[ {"portColor":"#dd45c7", "portId":"right0"},{"portColor":"#995aa6", "portId":"right1"} ] },
	    	{"key":3, "name":"Data Store Controller", "loc":"300 200",
	    	 "leftArray":[ {"portColor":"#bd8f27", "portId":"left0"},{"portColor":"#c14617", "portId":"left1"} ],
	    	 "topArray":[ {"portColor":"#d08154", "portId":"top0"} ],
	    	 "bottomArray":[  ],
	    	 "rightArray":[  ] },
	    	 {"key":4, "name":"Data Transfer Service", "loc":"050 070",
		    	 "leftArray":[  ],
		    	 "topArray":[  ],
		    	 "bottomArray":[ {"portColor":"#6cafdb", "portId":"bottom0"} ],
		    	 "rightArray":[  ] },
	    	 {"key":5, "name":"PID", "loc":"030 280",
	    	 "leftArray":[  ],
	    	 "topArray":[ {"portColor":"#77ac1e", "portId":"top0"} ],
	    	 "bottomArray":[  ],
	    	 "rightArray":[  ] }
	    	 ],
	    	  "linkDataArray": [
	    	{"from":1, "to":2, "fromPort":"left0", "toPort":"right0",text:"Update Catalogues"},
	    	{"from":3, "to":1, "fromPort":"top0", "toPort":"bottom0", text:"Query Resource"},
	    	{"from":2, "to":3, "fromPort":"bottom1", "toPort":"left1", text:"Import Data For Curation"},
	    	{"from":5, "to":2, "fromPort":"top0", "toPort":"bottom0", text:"Acquire Identifier"},
	    	{"from":3, "to":2, "fromPort":"left0", "toPort":"right1", text: "Update Records"},
	    	{"from":4, "to":2, "fromPort":"bottom0", "toPort":"top0", text: "New Transporter"}
	    	 ]});
    	  
      }
      else if (item.name == 'Data Acquisition:Collect Data'){
    	  window.init({ "class": "go.GraphLinksModel",
	    	  "copiesArrays": true,
	    	  "copiesArrayObjects": true,
	    	  "linkFromPortIdProperty": "fromPort",
	    	  "linkToPortIdProperty": "toPort",
	    	  "nodeDataArray": [
	    	{"key":1, "name":"Field Laboratory", "loc":"030 050",
	    	 "leftArray":[  ],
	    	 "topArray":[ {"portColor":"#425e5c", "portId":"top0"} ],
	    	 "bottomArray":[ {"portColor":"#316571", "portId":"bottom0"} ],
	    	 "rightArray":[ {"portColor":"#425e5c", "portId":"right0"} ] },
	    	{"key":2, "name":"Acquisition Service", "loc":"050 200",
	    	 "leftArray":[  ],
	    	 "topArray":[ {"portColor":"#dd45c7", "portId":"top0"} ],
	    	 "bottomArray":[  ],
	    	 "rightArray":[ {"portColor":"#dd45c7", "portId":"right0"},{"portColor":"#995aa6", "portId":"right1"} ] },
	    	{"key":3, "name":"Instrument Controller", "loc":"170 120",
	    	 "leftArray":[ {"portColor":"#bd8f27", "portId":"left0"} ],
	    	 "topArray":[ {"portColor":"#d08154", "portId":"top0"} ],
	    	 "bottomArray":[ {"portColor":"#d08154", "portId":"bottom0"} ],
	    	 "rightArray":[ {"portColor":"#bd8f27", "portId":"right0"},{"portColor":"#c14617", "portId":"right1"} ] },
	    	 {"key":4, "name":"Raw Data Collector", "loc":"300 050",
		    	 "leftArray":[ {"portColor":"#d08154", "portId":"left0"}, {"portColor":"#d08154", "portId":"left1"} ],
		    	 "topArray":[  ],
		    	 "bottomArray":[ {"portColor":"#6cafdb", "portId":"bottom0"} ],
		    	 "rightArray":[  ] },
	    	 {"key":5, "name":"Data Transfer Service", "loc":"300 200",
	    	 "leftArray":[ {"portColor":"#d08154", "portId":"left0"} ],
	    	 "topArray":[ {"portColor":"#77ac1e", "portId":"top0"} ],
	    	 "bottomArray":[  ],
	    	 "rightArray":[  ] }
	    	 ],
	    	  "linkDataArray": [
	    	{"from":1, "to":3, "fromPort":"top0", "toPort":"top0", text: "Calibrate Instrument"},
	    	{"from":1, "to":2, "fromPort":"bottom0", "toPort":"top0", text: "Update Registry"},
	    	{"from":1, "to":3, "fromPort":"right0", "toPort":"left0", text: "New Controller"},
	    	{"from":2, "to":3, "fromPort":"right0", "toPort":"bottom0", text: "Configure Controller"},
	    	{"from":2, "to":5, "fromPort":"right1", "toPort":"left0", text: "Prep. Data Transfer"},
	    	{"from":3, "to":4, "fromPort":"right1", "toPort":"left1", text: "Deliver Data"},
	    	{"from":4, "to":3, "fromPort":"left0", "toPort":"right0", text: "Retrieve Data"},
	    	{"from":5, "to":4, "fromPort":"top0", "toPort":"bottom0", text: "New Transporter"}
	    	 ]});
      }
      else if (item.name == 'Data curation: DATA ANNOTATION'){
    	  window.init({ "class": "go.GraphLinksModel",
	    	  "copiesArrays": true,
	    	  "copiesArrayObjects": true,
	    	  "linkFromPortIdProperty": "fromPort",
	    	  "linkToPortIdProperty": "toPort",
	    	  "nodeDataArray": [
	    	{"key":1, "name":"Semantic Laboratory", "loc":"030 050",
	    	 "leftArray":[  ],
	    	 "topArray":[  ],
	    	 "bottomArray":[ {"portColor":"#316571", "portId":"bottom0"} ],
	    	 "rightArray":[  ] },
	    	{"key":2, "name":"Semantic Broker", "loc":"050 150",
	    	 "leftArray":[  ],
	    	 "topArray":[ {"portColor":"#dd45c7", "portId":"top0"} ],
	    	 "bottomArray":[ {"portColor":"#995aa6", "portId":"bottom0"} ],
	    	 "rightArray":[ {"portColor":"#dd45c7", "portId":"right0"} ] },
	    	{"key":3, "name":"Annotation Service", "loc":"150 250",
	    	 "leftArray":[ {"portColor":"#bd8f27", "portId":"left0"} ],
	    	 "topArray":[ {"portColor":"#d08154", "portId":"top0"} ],
	    	 "bottomArray":[  ],
	    	 "rightArray":[ {"portColor":"#bd8f27", "portId":"right0"},{"portColor":"#c14617", "portId":"right1"} ] },
	    	 {"key":4, "name":"Catalogue Service", "loc":"300 120",
		    	 "leftArray":[ {"portColor":"#d08154", "portId":"left0"} ],
		    	 "topArray":[  ],
		    	 "bottomArray":[ {"portColor":"#6cafdb", "portId":"bottom0"} ],
		    	 "rightArray":[  ] },
	    	 {"key":5, "name":"Data Store Controller", "loc":"300 260",
	    	 "leftArray":[ {"portColor":"#d08154", "portId":"left0"} ],
	    	 "topArray":[ {"portColor":"#77ac1e", "portId":"top0"} ],
	    	 "bottomArray":[  ],
	    	 "rightArray":[  ] }
	    	 ],
	    	  "linkDataArray": [
	    	{"from":2, "to":1, "fromPort":"top0", "toPort":"bottom0", text: "Data Request"},
	    	{"from":3, "to":2, "fromPort":"left0", "toPort":"bottom0", text: "Update Model"},
	    	{"from":3, "to":2, "fromPort":"top0", "toPort":"right0", text: "Annotate Data"},
	    	{"from":4, "to":3, "fromPort":"left0", "toPort":"right0", text: "Update Catalogues"},
	    	{"from":5, "to":3, "fromPort":"left0", "toPort":"right1", text: "Update Records"},
	    	{"from":5, "to":4, "fromPort":"top0", "toPort":"bottom0", text: "Query Resource"}
	    	 ]});
      }
    }
  };
  
  var _doInitial = function() {
      var initData = tree.getInitial();
      current_id = null;
      renderList(initData);
  };
  
  $(document).on('click', '#choices a', function(e) {
    e.preventDefault();
    var choiceId = $(this).data('choice');
    console.log('clicked', choiceId);
    
    var kids = tree.getChildren(choiceId);
    if(kids) {
      current_id = choiceId;
      renderList(kids);
    }
  });
  /* ------------DEBUG------------
  $('#back').on('click', function(e) {
    e.preventDefault();
    if(!current_id) return false;
    console.log('back button clicked', current_id);
    
    var parents = tree.getParents(current_id);
   
    if(parents.length > 0) {
      var prev_node = parents.pop();
      current_id = prev_node.id;
      renderList(tree.getChildren(prev_node.id));
    } else {
      _doInitial();
    }
    
  });
  
  $('#go').on('click', function(e) {
    e.preventDefault();
    
    var cid = $('#show-id').val();
    if(!cid || !(cid in data,choices)) return false;
    console.log('show parents for', cid);
    
    var parentData = tree.getParents(cid);
    $('#results').val(JSON.stringify(parentData, null, 4));
    
  });*/

  _doInitial();

  
});