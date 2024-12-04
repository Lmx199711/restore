Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventDispatcher = undefined;
var r_Event = require("Event");
var exp_EventDispatcher = function () {
  function _ctor() {
    this.dicEventListener = new Map();
    this.onceList = new Array();
  }
  _ctor.prototype.on = function (e, t, o, i, n) {
    var a;
    if (this.hasEventListener(e)) {
      a = this.dicEventListener.get(e);
    } else {
      a = new Array();
      this.dicEventListener.set(e, a);
    }
    this.insertEventBin(a, e, t, o, i, !!n);
    return this;
  };
  _ctor.prototype.once = function (e, t, o, i) {
    this.on(e, t, o, i, true);
    return this;
  };
  _ctor.prototype.off = function (e, t, o) {
    this.removeListener(e, t, o);
    return this;
  };
  _ctor.prototype.offAll = function (e) {
    if (e && this.hasEventListener(e)) {
      this.dicEventListener.delete(e);
    } else {
      this.dicEventListener.clear();
    }
    return this;
  };
  _ctor.prototype.offAllCaller = function (e) {
    var t = new Array();
    this.dicEventListener.forEach(function (o) {
      for (var i = 0; i < o.length; i++) {
        var n = o[i];
        n.thisObject == e && t.push(n);
      }
    });
    for (var o = 0; o < t.length; o++) {
      var i = t[o];
      this.removeListener(i.type, i.listener, i.thisObject);
    }
    return this;
  };
  _ctor.prototype.hasEventListener = function (e) {
    return this.dicEventListener.has(e);
  };
  _ctor.prototype.dispatchEvent = function (e) {
    e.target = this;
    this.notifyListener(e);
  };
  _ctor.prototype.dispatchEventWith = function (e, t) {
    if (this.hasEventListener(e)) {
      var o = r_Event.Event.create(r_Event.Event, e);
      o.data = t;
      this.dispatchEvent(o);
      r_Event.Event.release(o);
    }
    return true;
  };
  _ctor.prototype.insertEventBin = function (e, t, o, i, n, a) {
    n = 0 | +n;
    var s = -1;
    var r = e.length;
    for (var c = 0; c < r; c++) {
      var l = e[c];
      if (l.listener == o && l.thisObject == i && l.target == this) {
        return false;
      }
      -1 == s && l.priority < n && (s = c);
    }
    var u = {
      type: t,
      listener: o,
      thisObject: i,
      priority: n,
      target: this,
      dispatchOnce: !!a
    };
    if (-1 !== s) {
      e.splice(s, 0, u);
    } else {
      e.push(u);
    }
    return true;
  };
  _ctor.prototype.removeListener = function (e, t, o) {
    this.hasEventListener(e) && this.removeEventBin(this.dicEventListener.get(e), t, o);
  };
  _ctor.prototype.removeEventBin = function (e, t, o) {
    var i = e.length;
    for (var n = 0; n < i; n++) {
      var a = e[n];
      if (a.listener == t && a.thisObject == o && a.target == this) {
        e.splice(n, 1);
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.notifyListener = function (e) {
    var t = this.dicEventListener.get(e.type);
    if (t && 0 != t.length) {
      for (var o = 0; o < t.length && (null == (i = t[o]) || (i.listener.call(i.thisObject, e), i.dispatchOnce && this.onceList.push(i), !e.isPropagationImmediateStopped)); o++) {
        ;
      }
      for (; this.onceList.length;) {
        var i;
        (i = this.onceList.pop()).target.off(i.type, i.listener, i.thisObject);
      }
    }
  };
  return _ctor;
}();
exports.EventDispatcher = exp_EventDispatcher;