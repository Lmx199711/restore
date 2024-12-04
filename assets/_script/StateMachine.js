var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateMachine = undefined;
var r_State = require("State");
var r_StateBase = require("StateBase");
var r_Transition = require("Transition");
var r_TransitionBase = require("TransitionBase");
var l = function () {
  function e() {}
  e.prototype.addTransition = function (e) {
    this.transitions || (this.transitions = []);
    -1 == this.transitions.indexOf(e) && this.transitions.push(e);
  };
  e.prototype.addTriggerTransition = function (e, t) {
    var o;
    this.triggerToTransitions || (this.triggerToTransitions = new Map());
    if (this.triggerToTransitions.has(e)) {
      o = this.triggerToTransitions.get(e);
    } else {
      o = [];
      this.triggerToTransitions.set(e, o);
    }
    -1 == o.indexOf(t) && o.push(t);
  };
  return e;
}();
var exp_StateMachine = function (e) {
  function _ctor() {
    var t = e.call(this) || this;
    t.isStateMachine = true;
    t.startState = -1;
    t.pendingState = {
      id: -1,
      data: null
    };
    t.transitionsFromAny = [];
    t.stateBundles = new Map();
    t.triggerTransitionsFromAny = new Map();
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "isRootFsm", {
    get: function () {
      return null == this.fsm;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "activeState", {
    get: function () {
      return this.mCurState;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "activeID", {
    get: function () {
      if (this.activeState) {
        return this.activeState.stateId;
      } else {
        return -1;
      }
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.setStartState = function (e) {
    this.startState = e;
  };
  _ctor.prototype.stateCanExit = function () {
    if (-1 != this.pendingState.id) {
      this.changeState(this.pendingState.id, this.pendingState.data);
      this.pendingState.id = -1;
      this.pendingState.data = null;
    }
    this.fsm && this.fsm.stateCanExit();
  };
  _ctor.prototype.requestExit = function () {
    var e = this.getRealActiveState();
    if (e && e.needExitTime) {
      e.requestExit();
    } else {
      this.fsm.stateCanExit();
    }
  };
  _ctor.prototype.getRealActiveState = function () {
    if (!this.activeState) {
      return null;
    }
    for (var e = this.activeState; e && e.isStateMachine;) {
      e = e.activeState;
    }
    return e || null;
  };
  _ctor.prototype.curStateNeedExitTime = function () {
    var e = this.getRealActiveState();
    return !!e && e.needExitTime;
  };
  _ctor.prototype.requestStateChange = function (e, t, o) {
    if (this.activeState && this.curStateNeedExitTime() && !o) {
      this.pendingState.id = e;
      this.pendingState.data = t;
      null != this.activeState && this.activeState.requestExit();
    } else {
      this.changeState(e, t);
    }
  };
  _ctor.prototype.stop = function () {
    if (-1 != this.pendingState.id) {
      this.pendingState.id = -1;
      this.pendingState.data = null;
    }
    if (null != this.mCurState) {
      this.mCurState.onExit(null);
      this.mCurState = null;
      this.curBundle = null;
    }
  };
  _ctor.prototype.init = function () {
    this.isRootFsm && this.onEnter(null);
  };
  _ctor.prototype.onEnter = function (e, t) {
    this.changeState(this.startState, t);
    for (var o = 0; o < this.transitionsFromAny.length; o++) {
      this.transitionsFromAny[o].onEnter();
    }
    this.triggerTransitionsFromAny.forEach(function (e) {
      e.forEach(function (e) {
        e.onEnter();
      });
    });
  };
  _ctor.prototype.onExit = function (e, t) {
    if (null != this.activeState) {
      this.mCurState.onExit(null, t);
      this.mCurState = null;
      this.curBundle = null;
    }
  };
  _ctor.prototype.onUpdate = function (e) {
    if (this.activeState) {
      for (var t = 0; t < this.transitionsFromAny.length && ((o = this.transitionsFromAny[t]).to == this.activeState.stateId || !this.tryTransition(o)); t++) {
        ;
      }
      if (this.mCurState && this.curBundle) {
        if (this.curBundle.transitions) {
          for (t = 0; t < this.curBundle.transitions.length; t++) {
            var o = this.curBundle.transitions[t];
            if (this.tryTransition(o)) {
              break;
            }
          }
        }
        this.mCurState && this.mCurState.onUpdate(e);
      }
    }
  };
  _ctor.prototype.addState = function (e, t) {
    t.fsm = this;
    t.stateId = e;
    t.init();
    this.getOrCreateStateBundle(e).state = t;
    -1 == this.startState && this.setStartState(e);
    return this;
  };
  _ctor.prototype.addStateFunc = function (e, t, o, i, n, r) {
    undefined === t && (t = null);
    undefined === o && (o = null);
    undefined === i && (i = null);
    undefined === n && (n = null);
    undefined === r && (r = false);
    if (null == t && null == o && null == i && null == n) {
      this.addState(e, new r_StateBase.StateBase());
    } else {
      this.addState(e, new r_State.State(t, o, i, n, r));
    }
    return this;
  };
  _ctor.prototype.addTransition = function () {
    var e = this;
    var t = function (t) {
      e.initTransition(t);
      e.getOrCreateStateBundle(t.from).addTransition(t);
    };
    if (1 == arguments.length) {
      t(arguments[0]);
    } else {
      var o = arguments[0];
      var i = arguments[1];
      var n = arguments.length > 2 ? arguments[2] : null;
      var a = arguments.length > 3 && arguments[3];
      var s = arguments.length > 4 ? arguments[4] : null;
      t(this.createOptimizedTransition(o, i, n, a, s));
    }
    return this;
  };
  _ctor.prototype.addTransitionFromAny = function () {
    var e;
    var t = [];
    for (var o = 0; o < arguments.length; o++) {
      t[o] = arguments[o];
    }
    if ("number" == typeof t[0]) {
      var i = t[0];
      var n = t.length > 1 ? t[1] : null;
      var a = t.length > 2 && t[2];
      var s = t.length > 3 ? t[3] : null;
      e = this.createOptimizedTransition(-1, i, n, a, s);
    } else {
      e = t[0];
    }
    this.initTransition(e);
    -1 == this.transitionsFromAny.indexOf(e) && this.transitionsFromAny.push(e);
    return this;
  };
  _ctor.prototype.addTriggerTransition = function () {
    var e = [];
    for (var t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }
    var o;
    var i = e[0];
    if ("number" == typeof e[1]) {
      var n = e[1];
      var a = e[2];
      var s = e.length > 3 ? e[3] : null;
      var r = e.length > 4 && e[4];
      var c = e.length > 5 && e[5];
      o = this.createOptimizedTransition(n, a, s, r, c);
    } else {
      o = e[1];
    }
    this.initTransition(o);
    var l = this.getOrCreateStateBundle(o.from);
    l.addTriggerTransition(i, o);
    return this;
  };
  _ctor.prototype.addTriggerTransitionFromAny = function () {
    var e = [];
    for (var t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }
    var o;
    var i;
    var n = e[0];
    if ("number" == typeof e[1]) {
      var a = e[1];
      var s = e.length > 2 ? e[2] : null;
      var r = e.length > 3 && e[3];
      o = this.createOptimizedTransition(-1, a, s, r);
    } else {
      o = e[1];
    }
    this.initTransition(o);
    if (this.triggerTransitionsFromAny.has(n)) {
      i = this.triggerTransitionsFromAny.get(n);
    } else {
      i = [];
      this.triggerTransitionsFromAny.set(n, i);
    }
    i.push(o);
  };
  _ctor.prototype.trigger = function (e, t) {
    var o = false;
    if (this.triggerTransitionsFromAny.has(e)) {
      var i = this.triggerTransitionsFromAny.get(e);
      for (var n = 0; n < i.length; n++) {
        var a = i[n];
        if ((-1 == this.activeID || a.to != this.activeID) && this.tryTransition(a, t)) {
          o = true;
          break;
        }
      }
    }
    if (!o && this.activeState) {
      var s = this.stateBundles.get(this.activeState.stateId);
      if (s && s.triggerToTransitions && s.triggerToTransitions.has(e)) {
        var r = s.triggerToTransitions.get(e);
        for (n = 0; n < r.length; n++) {
          var c = r[n];
          if (o = this.tryTransition(c, t)) {
            break;
          }
        }
      }
    }
    !o && this.activeState && this.activeState.trigger && this.activeState.trigger(e);
    return o;
  };
  _ctor.prototype.changeState = function (e, t) {
    undefined === t && (t = null);
    var o = this.stateBundles.has(e) ? this.stateBundles.get(e) : null;
    if (o) {
      var i = this.activeState;
      i && i.onExit(o.state, t);
      this.mCurState = o.state;
      this.mCurState.onEnter(i, t);
      this.curBundle = o;
      if (o.transitions) {
        for (var n = 0; n < o.transitions.length; n++) {
          o.transitions[n].onEnter();
        }
      }
      o.triggerToTransitions && o.triggerToTransitions.forEach(function (e) {
        e.forEach(function (e) {
          e.onEnter();
        });
      });
    } else {
      console.warn("需要跳转到的状态:[" + e + "]不存在,维持现在状态不变");
    }
  };
  _ctor.prototype.initTransition = function (e) {
    e.fsm = this;
    e.init();
  };
  _ctor.prototype.getOrCreateStateBundle = function (e) {
    var t;
    if (this.stateBundles.has(e)) {
      t = this.stateBundles.get(e);
    } else {
      t = new l();
      this.stateBundles.set(e, t);
    }
    return t;
  };
  _ctor.prototype.createOptimizedTransition = function (e, t, o, i, n) {
    undefined === o && (o = null);
    undefined === i && (i = false);
    undefined === n && (n = null);
    if (o) {
      return new r_Transition.Transition(e, t, o, i, n);
    } else {
      return new r_TransitionBase.TransitionBase(e, t, i, n);
    }
  };
  _ctor.prototype.tryTransition = function (e, t) {
    var o = e.shouldTransition();
    o && this.requestStateChange(e.to, t || e.data, e.forceInstantly);
    return o;
  };
  return _ctor;
}(r_StateBase.StateBase);
exports.StateMachine = exp_StateMachine;