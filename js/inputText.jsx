
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: '',isLimit: '2'};
  }

  
 render() {
	 let handleSubmit=null;
	 let handleExport=null;
	 if (this.state.items.length < this.state.isLimit){
		 handleSubmit= <form onSubmit={this.handleSubmit}>
		 			   <input onChange={this.handleChange} value={this.state.text}required />
		 			   <div class="input-button">	
		 			   <button>{'Add Requirement number ' + (this.state.items.length + 1)}</button>
		 			   </div>
		 			   	</form>;
	 }
	 else {
		 handleSubmit = <h3>Maximum amount of requirements inputed</h3>
		 handleExport = <ExportList items={this.state.items} />;
			 			
	 }
	 return (
      <div>
        <h1>Please Input The Requirements One By One</h1>
        <TodoList items={this.state.items} />
        {handleSubmit} 
        {handleExport}
      </div>
    );
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
    
  }

}

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
		
	}
}

class TodoList extends React.Component {
	render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      
    );
  }
}



ReactDOM.render(
		<TodoApp />,
		document.getElementById('search')
);