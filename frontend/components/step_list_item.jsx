var React = require('react');
var StepStore = require('../stores/step_store');
var DoneButton = require('./done_button');

var StepListItem = React.createClass({
  handleDestroy: function() {
    StepStore.destroy(this.props.step);
  },

  render: function() {
    return (
      <li>
        Body: {this.props.step.body} <br/>
      <DoneButton step={this.props.step} /><br/>
      <button onClick={this.handleDestroy}>Delete Step</button>
      </li>
    );
  }

});

module.exports = StepListItem;
