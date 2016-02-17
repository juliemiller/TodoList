var React = require('react');
var TodoStore = require('../stores/todo_store');
var StepStore = require('../stores/step_store');

var DoneButton = React.createClass({
  buttonText: function() {
    if(this.props.step === undefined) {
      return this.props.todo.done ? "Undo Todo" : "Todo Done";
    } else if (this.props.todo === undefined) {
      return this.props.step.done ? "Undo Step" : "Step Done";
    }
  },

  handleDone: function() {
    if(this.props.step === undefined) {
      TodoStore.toggleDone(this.props.todo.id);
    } else if (this.props.todo === undefined) {
      StepStore.toggleDone(this.props.step);
    }
  },

  render: function() {
    return (
      <button onClick={this.handleDone}>{this.buttonText()}</button>
    );
  }

});

module.exports = DoneButton;
