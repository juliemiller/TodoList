var React = require('react');
var TodoStore = require('../stores/todo_store');
var DoneButton = require('./done_button');
var TodoDetailView = require('./todo_detail_view');

var TodoListItem = React.createClass({
  getInitialState: function() {
    return {shown: false};
  },

  handleClick: function(e) {
    e.preventDefault();
    this.setState({shown: !this.state.shown});
  },

  showDetails: function() {
    if(this.state.shown){
      return <TodoDetailView item={this.props.item}/>;
    }
  },

  render: function() {
    return (
      <div >
        <div onClick={this.handleClick}>
          Title: {this.props.item.title}
        </div>
        {this.showDetails()}
        <DoneButton todo={this.props.item} />
        <br/>
      </div>
    );
  }

});

module.exports = TodoListItem;
