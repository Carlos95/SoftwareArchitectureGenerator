var keyword_extractor = require("keyword-extractor");
var tmpSplitText = [];
var splitText = [];
var extractList = [];
var limit;

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLimit = this.handleLimit.bind(this);
    this.state = {items: [], text: '',isLimit: ''};
  }

  
 render() {
	 let handleSubmit=null;
	 let handleExport=null;
	 let limitSubmit=null;
	 let output=null;
	 let reset=null;
	 
	 if (this.state.isLimit == ''){
		 limitSubmit = <form>
		 				<h3>Please input the number of requirements (or terms) you desire</h3>
		 				<input type="number" onChange={this.handleLimit} value={this.state.isLimit} />
		 				</form>		
	 }
	 else if (this.state.items.length < this.state.isLimit){
		 handleSubmit= <form onSubmit={this.handleSubmit}>
		 			   The software shall  <input onChange={this.handleChange} value={this.state.text}required />
		 			   <div class="input-button">	
		 			   <button>{'Save Requirement'}</button>
	
		 			   </div>
		 			   	</form>;
	 }
	 else {
		 handleSubmit = <h3>Thank you</h3>
		 reset = <Reset />
		 //handleExport = <ExportList items={this.state.items} />
		 output = <Data items={this.state.items}/>
		 		 
	 }
	 return (
      <div>
        {limitSubmit}
        <TodoList items={this.state.items} />
        {handleSubmit} 
        
        {output}
        {reset}
      </div>
    );
  }

 handleLimit(e) {
	    
	  this.setState({isLimit: e.target.value});
   
   }
 
  handleChange(e) {
    
	  this.setState({text: e.target.value});
    
    }
   
  handleSubmit(e) {
    
	  e.preventDefault();
    var newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState((prevState) => ({
    	items: prevState.items.concat(newItem),
    	text: ''
    }));
    
    tmpSplitText = (this.state.text).split(" ");
    for (var i = 0; i<tmpSplitText.length;i++){
    	splitText.push(tmpSplitText[i]);
    }
  }

}
/*
class ExportList extends React.Component {
	
	render() {
		var keyword_extractor = require("keyword-extractor");
		
		return (
				 		      <ul>
	
			        {this.props.items.map((item) => keyword_extractor.extract(item.text,{
                        language:"english",
                        remove_digits: true,
                        return_changed_case:true,
                        remove_duplicates: false

			        }))}
	 			      </ul>
			      
			     );
	}}return(null);
			    
		
	}
}

///////////////////////////////////////////////////////////////////
///																///
///																///
///						DUMMY CODE  							///
///																///
///																///
///////////////////////////////////////////////////////////////////
var fieldLab = false;
var experimentalLab = false;
var AAAI = false;
var PID = false;
var catalogueService = false;
var dataStoreController = false;
var instrumentController = false;
var acquisitionService = false;

function check(item){
	
	// Field Lab
	if ((item.text).includes('calibration') && (item.text).includes('instruments')
		|| (item.text).includes('calibration') && (item.text).includes('sensors')
		|| (item.text).includes('arrangement') && (item.text).includes('instruments')
		|| (item.text).includes('arrangement') && (item.text).includes('sensors')
		|| (item.text).includes('adjustment') && (item.text).includes('instruments')
		|| (item.text).includes('adjustment') && (item.text).includes('sensors')
		|| (item.text).includes('calibrate') && (item.text).includes('instruments')
		|| (item.text).includes('calibrate') && (item.text).includes('sensors')
		|| (item.text).includes('arrange') && (item.text).includes('instruments')
		|| (item.text).includes('arrange') && (item.text).includes('sensors')
		|| (item.text).includes('adjust') && (item.text).includes('instruments')
		|| (item.text).includes('adjust') && (item.text).includes('sensors')){
			//document.getElementById("generate").innerHTML = "Field Lab";
			fieldLab = true;
	};
	
	//Experimental lab
	if ((item.text).includes('processing') && (item.text).includes('results')
		|| (item.text).includes('acquiring') && (item.text).includes('results')
		|| (item.text).includes('deployment') && (item.text).includes('datasets')){
			//document.getElementById("generate").innerHTML = "Experimental lab";
			experimentalLab = true;
	};
	
	//AAAI Service
	if ((item.text).includes('authentication')
		|| (item.text).includes('authorisation')
		|| (item.text).includes('tracking') && (item.text).includes('user')){
			//document.getElementById("generate").innerHTML = "AAAI Service";
			AAAI = true;
	};
	// PID Service
	if ((item.text).includes('identifier')
		|| (item.text).includes('identifiers')	
		|| (item.text).includes('identify')
		|| (item.text).includes('identify') && (item.text).includes('items')
		|| (item.text).includes('identify') && (item.text).includes('entities')){
			//document.getElementById("generate").innerHTML = "PID Service";
			PID = true;
	};
		
	// Catalogue Service
	if ((item.text).includes('create') && (item.text).includes('dataset')
		|| (item.text).includes('export') && (item.text).includes('metadata')
		|| (item.text).includes('update') && (item.text).includes('catalogue')){
			//document.getElementById("generate").innerHTML = "Catalogue Service";
			catalogueService = true;
		};	
	// Data Store Controller
		if ((item.text).includes('stores')
				|| (item.text).includes('maintains')
				|| (item.text).includes('store')
				|| (item.text).includes('maintain')
				|| (item.text).includes('stores') && (item.text).includes('datasets')
				|| (item.text).includes('maintains') && (item.text).includes('datasets')
				|| (item.text).includes('stores') && (item.text).includes('dataset')
				|| (item.text).includes('maintains') && (item.text).includes('dataset')){
					//document.getElementById("generate").innerHTML = "Data Store Controller";
					dataStoreController = true;
		};
		
		// Instrument Controller
		if ((item.text).includes('controls')
				|| (item.text).includes('control')
				|| (item.text).includes('control') && (item.text).includes('instrument')
				|| (item.text).includes('control') && (item.text).includes('sensor')
				|| (item.text).includes('controls') && (item.text).includes('instruments')
				|| (item.text).includes('constrols') && (item.text).includes('sensors')){
					//document.getElementById("generate").innerHTML = "Instrument controller";
					instrumentController = true;
		};
	
		// Acquisition service
		if ((item.text).includes('monitor')
				|| (item.text).includes('manage')
				|| (item.text).includes('monitors')
				|| (item.text).includes('manages')
				|| (item.text).includes('monitor') && (item.text).includes('instrument')
				|| (item.text).includes('monitor') && (item.text).includes('sensor')
				|| (item.text).includes('manage') && (item.text).includes('instrument')
				|| (item.text).includes('manage') && (item.text).includes('sensor')
				|| (item.text).includes('monitors') && (item.text).includes('instruments')
				|| (item.text).includes('monitors') && (item.text).includes('sensors')
				|| (item.text).includes('manages') && (item.text).includes('instruments')
				|| (item.text).includes('manages') && (item.text).includes('sensors')){
					//document.getElementById("generate").innerHTML = "Acquisition Service";
					acquisitionService = true;
		};
		
		
		
}

export default class Output extends React.Component{
	
	render(){
		// Data Preservation dataStoreController == true && catalogueService == true && PID == true
		if (dataStoreController == true && catalogueService == true && PID == true){
			
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
			    	{"from":1, "to":2, "fromPort":"left0", "toPort":"right0", text: "Update Catalogues"},
			    	{"from":1, "to":3, "fromPort":"bottom0", "toPort":"top0", text: "Query Resources"},
			    	{"from":2, "to":3, "fromPort":"bottom1", "toPort":"left1", text: "Import Data for Curation"},
			    	{"from":5, "to":2, "fromPort":"top0", "toPort":"bottom0", text: "Acquire Identifier"},
			    	{"from":3, "to":2, "fromPort":"left0", "toPort":"right1", text: "Update Records"},
			    	{"from":4, "to":2, "fromPort":"bottom0", "toPort":"top0", text: "New Transporter"}
			    	 ]});
		}

		// Collect Data fieldLab == true && acquisitionService == true || instrumentController == true 
		else if ( fieldLab == true && acquisitionService == true || instrumentController == true ){
			
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
		
		else if (fieldLab == true){
			window.init({ "class": "go.GraphLinksModel",
		    	  "copiesArrays": true,
		    	  "copiesArrayObjects": true,
		    	  "linkFromPortIdProperty": "fromPort",
		    	  "linkToPortIdProperty": "toPort",
		    	  "nodeDataArray": [
		    	{"key":1, "name":"Field Laboratory", "loc":"030 050",
		    	 "leftArray":[ {"portColor":"#425e5c", "portId":"top0"} ],
		    	 "topArray":[  ],
		    	 "bottomArray":[  ],
		    	 "rightArray":[ {"portColor":"#425e5c", "portId":"right0"} ] }
		    	 ],
		    	  "linkDataArray": []});
			
		}
		
		else if (experimentalLab == true){
			window.init({ "class": "go.GraphLinksModel",
		    	  "copiesArrays": true,
		    	  "copiesArrayObjects": true,
		    	  "linkFromPortIdProperty": "fromPort",
		    	  "linkToPortIdProperty": "toPort",
		    	  "nodeDataArray": [
		    	{"key":1, "name":"Experimental Laboratory", "loc":"030 050",
		    	 "leftArray":[ {"portColor":"#425e5c", "portId":"top0"} ],
		    	 "topArray":[  ],
		    	 "bottomArray":[  ],
		    	 "rightArray":[ {"portColor":"#425e5c", "portId":"right0"}, {"portColor":"#425e5c", "portId":"right1"} ] }
		    	 ],
		    	  "linkDataArray": []});
			
		}
		
		else if (AAAI == true){
			window.init({ "class": "go.GraphLinksModel",
		    	  "copiesArrays": true,
		    	  "copiesArrayObjects": true,
		    	  "linkFromPortIdProperty": "fromPort",
		    	  "linkToPortIdProperty": "toPort",
		    	  "nodeDataArray": [
		    	{"key":1, "name":"AAAI", "loc":"030 050",
		    	 "leftArray":[ {"portColor":"#425e5c", "portId":"top0"} ],
		    	 "topArray":[  ],
		    	 "bottomArray":[  ],
		    	 "rightArray":[ ] }
		    	 ],
		    	  "linkDataArray": []});
			
		}
		
		
		else{
			window.alert("No Output Generated, please try with other requirements");
			
		}
		
		return(null)
		
	}
	
}




class Data extends React.Component {
	
	render() {
		return (
		<div>
			 {this.props.items.filter(check)} 
		</div>
		);
		
	}
}

///////////////////////////////////////////////////////////////////
///																///
///																///
///						END OF DUMMY CODE  						///
///																///
///																///
///////////////////////////////////////////////////////////////////
*/


class Data extends React.Component {
	
	render() {
		
		for (var i = 0; i < splitText.length; i++){
			var extraction = (keyword_extractor.extract(splitText[i],{
	            language:"english",
	            remove_digits: true,
	            return_changed_case:true,
	            remove_duplicates: false

	        }))
			// Avoids blanks
			if (extraction != '')
			
				extractList.push(extraction);
			
		}
		
		window.runProvides(extractList);
		
		return (null)
		
		}
}


class Reset extends React.Component {
	
	render(){
		return (
			<form onSubmit={this.setState({items: [], text: '',isLimit: ''})}>
				<button>{'Input New Rquirements'}</button>
			</form>
		)
	}
}



class TodoList extends React.Component {
	render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>The software shall {item.text}</li>
        ))}
      </ul>
      
    );
  }
}



ReactDOM.render(
		<TodoApp />,
		document.getElementById('search')
);