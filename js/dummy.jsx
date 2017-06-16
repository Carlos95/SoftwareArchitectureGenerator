export class ExportList extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {items: [], text: '',isLimit: '2'};
	  }
	render() {
		var keyword_extractor = require("keyword-extractor");
		return (
			      <ul>
			        {props.items.map((item) => keyword_extractor.extract(item.text,{
                        language:"english",
                        remove_digits: true,
                        return_changed_case:true,
                        remove_duplicates: false

                   }))}
			      </ul>
			      
			    );
		
	}
}

ReactDOM.render(
		<ExportList />,
		document.getElementById('generate')
);
