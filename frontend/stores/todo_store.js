var _todos = [],
    _callbacks = [];

var TodoStore = {
  all: function() {
    return _todos.slice();
  },

  changed: function() {
    _callbacks.forEach( function(cb) {
      cb();
    });
  },

  addChangeHandler: function(callback) {
    _callbacks.push(callback);
  },

  removeChangeHandler: function(callback) {
    var cbIdx;

    for (var i = 0; i < _callbacks.length; i ++) {
      if (_callbacks[i] === callback) {
          cbIdx = i;
          break;
      }
    }

    if (!cbIdx) { return; }

    _callbacks.splice(cbIdx,1);
  },

  fetch: function() {
    $.get('api/todos', {}, function(todos) {
      _todos = todos;
      TodoStore.changed();
    });
  },

  create: function(todo) {
    $.post('api/todos', {todo: todo}, function(newTodo) {
      _todos.push(newTodo);
      TodoStore.changed();
    });
  },

  destroy: function(id) {
    $.ajax({
      method: 'DELETE',
      dataType: 'json',
      url: 'api/todos/' + id,
      success: function() {
        var idx = TodoStore.findIdxById(id);
        console.log(idx);
        if (idx === undefined) { return; }

        _todos.splice(idx,1);
        TodoStore.changed();
      }
    });
  },

  toggleDone: function(id) {
    var done = !_todos[TodoStore.findIdxById(id)].done;

    $.ajax({
      method: 'PATCH',
      dataType: 'json',
      data: { todo: {done: done} },
      url: 'api/todos/' + id,
      success: function(data) {
        _todos[TodoStore.findIdxById(id)] = data;
        TodoStore.changed();
      }
    });
  },

  findIdxById: function(id) {
    for (var i = 0; i < _todos.length; i ++) {
      if (_todos[i].id === id) {
          return i;
      }
    }
    return undefined;
  }
};

module.exports = TodoStore;
