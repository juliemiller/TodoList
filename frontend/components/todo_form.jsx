var React = require('react');
var TodoStore = require('../stores/todo_store');

var TodoForm = React.createClass({
  getInitialState: function() {
    return {title: "", body: ""};
  },
  updateTitle: function(e) {
    this.setState({title: e.target.value});
  },
  updateBody: function(e) {
    this.setState({body: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var todo = { title: this.state.title, body: this.state.body, done: "false" };
    TodoStore.create(todo);
    this.setState({ title: "", body: "" });
  },
  render: function() {
    return (
      <div>
        <h2>Create Todo</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Title: </label>
          <input
            type="text"
            onChange={this.updateTitle}
            value={this.state.title}/><br/>
          <label>Body: </label>
          <input
            type="text"
            onChange={this.updateBody}
            value={this.state.body}/><br/>
          <input
            type="submit"
            value="Submit"/>
        </form>
      </div>
    );
  }

});

module.exports = TodoForm;
