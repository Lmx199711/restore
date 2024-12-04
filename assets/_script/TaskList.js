var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskList = exports.ActionsExecutionMode = undefined;
var a;
var r_Task = require("Task");
(function (e) {
  e[e.RunInSequence = 0] = "RunInSequence";
  e[e.RunInParallel = 1] = "RunInParallel";
})(a = exports.ActionsExecutionMode || (exports.ActionsExecutionMode = {}));
var exp_TaskList = function (e) {
  function _ctor(t) {
    var o = e.call(this) || this;
    o.actions = new Array();
    o.finished = new Array();
    o.executionMode = a.RunInSequence;
    o.executionMode = t;
    return o;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "progress", {
    get: function () {
      var e = 0;
      for (var t = 0; t < this.actions.length; t++) {
        e += this.actions[t].progress;
      }
      var o = e / this.actions.length;
      o = isNaN(o) ? 0 : o;
      0 == this.actions.length && (o = 1);
      return o;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onExecute = function () {
    this.mCurIndex = 0;
    this.finished.splice(0, this.finished.length);
    this.mProgress = 0;
  };
  _ctor.prototype.onUpdate = function () {
    e.prototype.onUpdate.call(this);
    if (0 != this.actions.length) {
      switch (this.executionMode) {
        case a.RunInParallel:
          this.checkParallelTask();
          break;
        case a.RunInSequence:
          this.checkInSequenceTask();
      }
    } else {
      this.endAction();
    }
  };
  _ctor.prototype.checkParallelTask = function () {
    var e = function (e) {
      if (-1 != t.finished.findIndex(function (t) {
        return t == e;
      })) {
        return "continue";
      }
      var o = t.actions[e].tick(t.mOwnerSystem);
      if (o == r_Task.Status.Failure) {
        t.mErr = t.actions[e].errInfo;
        t.endAction(false);
        t.actions[e].callFinished(false);
        return {
          value: undefined
        };
      }
      if (o == r_Task.Status.Success) {
        t.finished.push(e);
        t.actions[e].callFinished(true);
      }
    };
    var t = this;
    for (var o = 0; o < this.actions.length; o++) {
      var i = e(o);
      if ("object" == typeof i) {
        return i.value;
      }
    }
    this.finished.length == this.actions.length && this.endAction();
  };
  _ctor.prototype.checkInSequenceTask = function () {
    for (var e = this.mCurIndex; e < this.actions.length; e++) {
      var t = this.actions[e].tick(this.mOwnerSystem);
      if (t == r_Task.Status.Failure) {
        this.endAction(false);
        return void this.actions[e].callFinished(false);
      }
      if (t == r_Task.Status.Running) {
        return void (this.mCurIndex = e);
      }
      this.actions[e].callFinished(true);
    }
    this.endAction();
  };
  _ctor.prototype.onReset = function () {
    for (var e = 0; e < this.actions.length; e++) {
      this.actions[e].reset();
    }
    this.mCurIndex = 0;
    this.finished.splice(0, this.finished.length);
  };
  _ctor.prototype.addTask = function (e) {
    this.actions.push(e);
    return this;
  };
  _ctor.prototype.clear = function () {
    this.reset();
    this.onForcedStop();
    this.actions.splice(0, this.actions.length);
  };
  return _ctor;
}(r_Task.Task);
exports.TaskList = exp_TaskList;