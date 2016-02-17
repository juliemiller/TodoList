var React = require('react');
var TodoStore = require('../stores/todo_store');
var StepStore = require('../stores/step_store');
var StepListItem = require('./step_list_item');
var StepListForm = require('./step_list_form');

var TodoDetailView = React.createClass({
  getInitialState: function() {
    return {steps: StepStore.all(this.props.item.id)};
  },

  componentDidMount: function() {
    StepStore.addChangeHandler(this.props.item.id, this.stepsChanged);
    StepStore.fetch(this.props.item.id);
  },

  componentWillUnmount: function() {
    StepStore.removeChangeHandler(this.stepsChanged);
  },

  stepsChanged: function() {
    this.setState({ steps: StepStore.all(this.props.item.id) });
  },

  handleDestroy: function() {
    TodoStore.destroy(this.props.item.id);
  },

  render: function() {
    return (
      <div>
        <div>
          Body: {this.props.item.body}
        </div>
        <button onClick={this.handleDestroy}>Delete Todo</button>
        <div>
          <StepListForm todoId={this.props.item.id}/>
        </div>
        <ul>
          {
            this.state.steps.map( function(step) {
              return <StepListItem step={step} key={step.id}/>;
            })
          }
        </ul>
      </div>
    );
  }

});

module.exports = TodoDetailView;
