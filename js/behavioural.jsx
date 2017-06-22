var React = require('react');
var dragula = require('react-dragula');
///////////////////////////////////////////////
var cols = [];
var data = [];

class App extends React.Component {
  render() {
	  return( <div className='parent'>
    		<div id='leftcontainer'className='container'>
      <div id="1">Data Acquisition Community</div>
      <div id="2">Data Curation Community</div>
      <div id="3">Data Publishing Community</div>
      <div id="4">Data Processing Community</div>
    </div>
    <DropBox />
    </div>
    
    );
  }
  componentDidMount() {
    var container = ReactDOM.findDOMNode(this);
    dragula([rightcontainer],{isContainer(el){ return false;}})
    dragula([leftcontainer,rightcontainer])
    .on('drop', function (el) {
        if (el.id == '1'){
        	var cols = [
        	            { key: 'behaviour', label: 'Behaviours' },
        	            { key: 'performedby', label:'Performed By'},
        	            { key: 'description', label: 'Description' }
        	        ];

        	        var data = [
        	            { id: 1, behaviour: 'Design Experiment', performedby: 'Environmental Scientist',description: 'Design scientific experiments.' },
        	            { id: 2, behaviour: 'Design Measurement Model', performedby: 'Measurement Model Designer',description: 'Designs the mesurement or monitoring model based on scientific requirements.' },
        	            { id: 3, behaviour: 'Instrument configuration', performedby: 'Technician',description: 'Sets up a sensor or a sensor network.' },
        	            { id: 4, behaviour: 'Instrument calibration', performedby: 'Technician',description: 'Controls and records the process of aligning or testing a sensor.' },
        	            { id: 5, behaviour: 'Data Collection', performedby: 'Data Collector',description: 'Controls and monitors the collection of the digital values from a sensor instrument.' }
        	        ];


        	        ReactDOM.render(<Table cols={cols} data={data}/>, document.getElementById('table-output'));
        }
        else if (el.id == '2'){
        	var cols = [
        	            { key: 'behaviour', label: 'Behaviours' },
        	            { key: 'performedby', label: 'Performed by'},
        	            { key: 'description', label: 'Description' }
        	        ];

        	        var data = [
        	            { id: 1, behaviour: 'Data Quality Checking',performedby: 'Data Curator' ,description: 'Detects and corrects corrupt, inconsistent or inaccurate records from a data set.' },
        	            { id: 2, behaviour: 'Data Preservation',performedby: 'Data Curator' ,description: 'Deposits the data and metadata or other supplementary data and methods according to specified policies, and makes them accessible on request.' },
        	            { id: 3, behaviour: 'Data Product Generation', performedby: 'Data Curator',description: 'Processes data against requirement specifications and standardised formats and descriptions.' },
        	            { id: 4, behaviour: 'Data Replication', performedby: 'Storage Administration',description: 'Creates, deletes and maintains the consistency of copies of a data set on multiple storage devices.' },
        	            { id: 5, behaviour: 'Data Identification', performedby: 'PID Manager' ,description: 'Provides a unique PID for data and metadata being curated' },
        	            { id: 6, behaviour: 'Select or Build Local Conceptual Model', performedby: 'Semantic Curator' ,description: 'Supports annotation of data and metadata.' },
        	            { id: 7, behaviour: 'Data Annotation',performedby: 'Semantic Curator',description: 'Supports the linking of data and metadata with a local conceptual model.' }
        	        ];


        	        ReactDOM.render(<Table cols={cols} data={data}/>, document.getElementById('table-output'));
        } 
        else if (el.id == '3'){
        	var cols = [
        	            { key: 'behaviour', label: 'Behaviours' },
        	            { key: 'performedby', label: 'Performed by'},
        	            { key: 'description', label: 'Description' }
        	        ];

        	        var data = [
        	            { id: 1, behaviour: 'Data Publication',performedby: 'NA' ,description: 'Provides clean, well-annotated, anonymaty-preserving datasets in a suitable format.' },
        	            { id: 2, behaviour: 'Semantic Harmonisation',performedby: 'Semantic Mediator' ,description: 'Unifies similar data models based on the consensus of collaborative domain experts to achieve better data reuse.' },
        	            { id: 3, behaviour: 'Data Discovery and Access', performedby: 'Data Discovery and Access System',description: 'Retrieves requested data from a data resource by using suitable search technology.' },
        	            { id: 4, behaviour: 'Data Citation', performedby: 'PID Manager',description: 'Assigns an accurate, consistent and standised reference to a data object.' }
        	            
        	        ];


        	        ReactDOM.render(<Table cols={cols} data={data}/>, document.getElementById('table-output'));
        }
        else if (el.id == '4'){
        	var cols = [
        	            { key: 'behaviour', label: 'Behaviours' },
        	            { key: 'performedby', label:'Performed By'},
        	            { key: 'description', label: 'Description' }
        	        ];

        	        var data = [
        	            { id: 1, behaviour: 'Cordinate Service', performedby: 'Service Provider',description: 'Coordinate actions of dristributed applications in order to reach consistent agreement ofn the outcome of distributed transactions.' },
        	            { id: 2, behaviour: 'Service Choreography', performedby: 'Collab between Service Provider and Service Consumer',description: 'NA' },
        	            { id: 3, behaviour: 'Service Orchestration', performedby: 'Service Provider',description: 'Performed internally to realise a service that it provides.' },
        	            { id: 4, behaviour: 'Compose Service', performedby: 'Service Provider',description: 'Combine multiple services.' },
        	            { id: 5, behaviour: 'Customise Processing Environment', performedby: 'Processing Environment',description: 'Enables data processing susbsystem to prepare customised infrastructure and service platforms for managing specific data processing applications optimally.' },
        	            { id: 6, behaviour: 'Describe Service', performedby: 'Service Provider',description: 'Provides the information needed in order to use a service.' },
        	            { id: 7, behaviour: 'Register Service', performedby: 'Service Provider',description: 'Makes service visible to Service Consumers by registering it in the service registry.' }
        	        ];
        	        ReactDOM.render(<Table cols={cols} data={data}/>, document.getElementById('table-output'));
        }
    })
    
  }
};


class DropBox extends React.Component {
	render() {
		return(
				<div id='rightcontainer' className='container'>
				</div>
		)
	}
}

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