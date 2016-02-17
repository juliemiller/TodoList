var _steps = {},
    _callbacks = {};

var StepStore = {
  all: function(todoId) {
    if(_steps[todoId] === undefined) {
      _steps[todoId] = [];
    }
    return _steps[todoId].slice();
  },

  changed: function(todoId) {
    if(_callbacks[todoId] === undefined) {
      _callbacks[todoId] = [];
    }
    _callbacks[todoId].forEach( function(cb) {
      cb();
    });
  },

  addChangeHandler: function(todoId,callback) {
    if(_callbacks[todoId] === undefined){
      _callbacks[todoId] = [];
    }
    _callbacks[todoId].push(callback);
  },

  removeChangeHandler: function(todoId,callback) {
    var cbIdx;

    for (var i = 0; i < _callbacks[todoId].length; i ++) {
      if (_callbacks[todoId][i] === callback) {
          cbIdx = i;
          break;
      }
    }

    if (!cbIdx) { return; }

    _callbacks.splice(cbIdx,1);
  },

  fetch: function(todoId) {
    var url = 'api/todos/'+ todoId + '/steps';
    $.get(url, {}, function(steps) {
      _steps[todoId] = steps;
      console.log("fetched", steps);
      StepStore.changed(todoId);
    });
  },

  create: function(step) {
    var url = 'api/todos/'+ step.todo_id + '/steps';
    $.post(url, {step: step}, function(newStep) {
      _steps[step.todo_id].push(newStep);
      StepStore.changed(step.todo_id);
    });
  },

  destroy: function(step) {
    $.ajax({
      method: 'DELETE',
      dataType: 'json',
      url: 'api/steps/' + step.id,
      success: function() {
        var idx = StepStore.findByStep(step);
        if (idx === undefined) { return; }

        _steps[step.todo_id].splice(idx,1);
        StepStore.changed(step.todo_id);
      }
    });
  },

  toggleDone: function(step) {
    var done = !_steps[step.todo_id][StepStore.findByStep(step)].done;

    $.ajax({
      method: 'PATCH',
      dataType: 'json',
      data: { step: {done: done} },
      url: 'api/steps/' + step.id,
      success: function(data) {
        _steps[step.todo_id][StepStore.findByStep(step)] = data;
        StepStore.changed(step.todo_id);
      }
    });
  },

  findByStep: function(step) {
    for (var i = 0; i < _steps[step.todo_id].length; i ++) {
      if (_steps[step.todo_id][i].id === step.id) {
          return i;
      }
    }
    return undefined;
  }
};

module.exports = StepStore;
