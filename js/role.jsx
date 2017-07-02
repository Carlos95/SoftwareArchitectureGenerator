var React = require('react');
var dragula = require('react-dragula');
///////////////////////////////////////////////
var cols = [];
var data = [];
var count = 0;
class App extends React.Component {
  render() {
	  return( <div className='parent'>
    		<div id='leftcontainer'className='container'>
      <div id="1">Data Acquisition Community</div>
      <div id="2">Data Curation Community</div>
      <div id="3">Data Publishing Community</div>
      <div id="4">Data Processing Community</div>
    </div>
    
    </div>
    
    );
  }
  componentDidMount() {
    
	var container = ReactDOM.findDOMNode(this);
    dragula([leftcontainer],{isContainer(el){el.className += ' ex-moved'; return true;}})
    dragula([leftcontainer])
    .on('out', function (el) {
    	
    	
    		
    		
    	
    	
    	if (el.id == '1'){
        	var title = "Data Acquisition Community";
    		var cols = [
        	            { key: 'role', label: 'Roles' },
        	            { key: 'type', label:'Type'},
        	            { key: 'description', label: 'Description' }
        	        ];

        	        var data = [
        	            { id: 1, role: 'Environmental Scientist', type: 'active',description: 'Conducts research or performs scientific investigations.' },
        	            { id: 2, role: 'Sensor', type: 'passive',description: 'Measures a physical quantity and converts it into a signal which can be read by a observer.' },
        	            { id: 3, role: 'Sensor network', type: 'passive',description: 'Group of autonomous sensors.' },
        	            { id: 4, role: 'Measurement Model Designer', type: 'active',description: 'Designs the measurements ad monitoring of models based on the requiremets of environmental scientists.' },
        	            { id: 5, role: 'Technician', type: 'active',description: 'Develops and deploys sensor instruments.' }
        	        ];	
        	        
        	        ReactDOM.render(<Table cols={cols} data={data}/>, document.getElementById('table-output'));
        }
        else if (el.id == '2'){
        	var title = "Data Curation Community";
        	var cols = [
        	            { key: 'role', label: 'Roles' },
        	            { key: 'type', label:'Type'},
        	            { key: 'description', label: 'Description' }
        	        ];

        	        var data = [
        	            { id: 1, role: 'Data Curator', type: 'Active',description: 'Verifies the quality of data.' },
        	            { id: 2, role: 'Semantic Curator', type: 'Active',description: 'Designs and maintains local and global conceptual models.' },
        	            { id: 3, role: 'Storage Administrator', type: 'Active',description: 'Has the responsibilities to design data storage, tune queries and perform backup and recovery operations.' },
        	            { id: 4, role: 'PID Manager', type: 'Passive',description: 'Assigns persistent global unique identifiers to data and metadata products.' },
        	            { id: 5, role: 'PID Generator', type: 'Passive',description: 'Generats and assigns persisten global unique identifiers to sets of digital objects.' }
        	        ];


        	        ReactDOM.render(<Table cols={cols} data={data}/>, document.getElementById('table-output'));
        } 
        else if (el.id == '3'){
        	var title = "Data Publishing Community";
        	var cols = [
        	            { key: 'role', label: 'Roles' },
        	            { key: 'type', label:'Type'},
        	            { key: 'description', label: 'Description' }
        	        ];

        	        var data = [
        	            { id: 1, role: 'Data Originator', type: 'Active or Passive',description: 'Provides the digital material to be made available for public access.' },
        	            { id: 2, role: 'Data Repository', type: 'Passive',description: 'Facility for the deposition of published data.' },
        	            { id: 3, role: 'Semantic Mediator', type: 'Passive',description: 'Facilitates semantic mapping.' },
        	            { id: 4, role: 'Data Publisher', type: 'Active',description: 'In charge of supervising the data publishing processes.' },
        	            { id: 5, role: 'Data Publishing Subsystem', type: 'Passive',description: 'Enables the discovery and retrieval of scientific data.' }
        	        ];


        	        ReactDOM.render(<Table cols={cols} data={data}/>, document.getElementById('table-output'));
        }
        else if (el.id == '4'){
        	var title = "Data Processing Community";
        	var cols = [
        	            { key: 'role', label: 'Roles' },
        	            { key: 'type', label:'Type'},
        	            { key: 'description', label: 'Description' }
        	        ];

        	        var data = [
        	            { id: 1, role: 'Data Provider', type: 'Active or Passive',description: 'Provides the data to be used.' },
        	            { id: 2, role: 'Service', type: 'Passive',description: 'Functionality for processing data is available for general use.' },
        	            { id: 3, role: 'Service Consumer', type: 'Active or Passive',description: 'Entity using the services provided.' },
        	            { id: 4, role: 'Service Provider', type: 'Active or Passive',description: 'Entity providing the services to be used.' },
        	            { id: 5, role: 'Service Registry', type: 'Passive',description: ' Information system for registering services.' }
        	        ];


        	        ReactDOM.render(<Table cols={cols} data={data}/>, document.getElementById('table-output'));
        }
    })
    
  }
};



class Table extends React.Component {

    render() {
        var headerComponents = this.generateHeaders(),
            rowComponents = this.generateRows();

        return (
            <table>
                <thead> {headerComponents} </thead>
                <tbody> {rowComponents} </tbody>
            </table>
        );
    }

    generateHeaders() {
        var cols = this.props.cols;  // [{key, label}]

        // generate our header (th) cell components
        return cols.map(function(colData) {
            return <th key={colData.key}> {colData.label} </th>;
        });
    }

    generateRows() {
        var cols = this.props.cols,  // [{key, label}]
            data = this.props.data;

        return data.map(function(item) {
            // handle the column data within each row
            var cells = cols.map(function(colData) {

                // colData.key might be "firstName"
                return <td> {item[colData.key]} </td>;
            });
            return <tr key={item.id}> {cells} </tr>;
        });
    }
}

        


ReactDOM.render(<App />, document.getElementById('output'));