var React = require('react');
var TodoStore = require('../stores/todo_store');
var TodoListItem = require('./todo_list_item');
var TodoForm = require('./todo_form');

var TodoList = React.createClass({
  getInitialState: function() {
    return { todos: TodoStore.all() };
  },

  componentDidMount: function() {
    TodoStore.addChangeHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeHandler(this.todosChanged);
  },

  todosChanged: function() {
    this.setState({ todos: TodoStore.all() });
  },

  render: function() {
    return (
      <div>
        <TodoForm /><hr/>
        {
          this.state.todos.map(function(todo, idx) {
            return <TodoListItem key={todo.id} item={todo}/>;
          })
        }
      </div>
    );
  }

});

module.exports = TodoList;
