class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { items: [], text: '', isLimit: '5' };
  }

  render() {
    let handleSubmit = null;
    if (this.state.items.length < this.state.isLimit) {
      handleSubmit = React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement('input', { onChange: this.handleChange, value: this.state.text, required: true }),
        React.createElement(
          'button',
          null,
          'Add Requirement number ' + (this.state.items.length + 1)
        )
      );
    } else {
      handleSubmit = React.createElement(
        'h3',
        null,
        'Maximum amount of requirements inputed'
      );
    }
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Please Input The Requirements One By One'
      ),
      React.createElement(TodoList, { items: this.state.items }),
      handleSubmit
    );
  }

  handleChange(e) {

    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }

}

class TodoList extends React.Component {
  render() {
    return React.createElement(
      'ul',
      null,
      this.props.items.map(item => React.createElement(
        'li',
        { key: item.id },
        item.text
      ))
    );
  }
}

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('search'));
