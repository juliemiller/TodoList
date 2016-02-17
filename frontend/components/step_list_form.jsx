var React = require('react');
var StepStore = require('../stores/step_store');

var StepListForm = React.createClass({
  getInitialState: function() {
    return {title: "", body: ""};
  },

  updateBody: function(e) {
    this.setState({body: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var step = { body: this.state.body, done: "false", todo_id: this.props.todoId };
    StepStore.create(step);
    this.setState({ title: "", body: "" });
  },
  render: function() {
    return (
      <div>
        <h2>Create Step</h2>
        <form onSubmit={this.handleSubmit}>
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

module.exports = StepListForm;
