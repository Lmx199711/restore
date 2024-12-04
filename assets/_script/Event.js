Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = undefined;
var exp_Event = function () {
  function _ctor(e, t) {
    this.type = e;
    this.data = t;
  }
  _ctor.prototype.stopImmediatePropagation = function () {
    this.isPropagationImmediateStopped = true;
  };
  _ctor.prototype.clean = function () {
    this.data = this.target = null;
    this.isPropagationImmediateStopped = false;
  };
  _ctor.create = function (e, t) {
    var o;
    e.hasOwnProperty("eventPool") && (o = e.eventPool);
    o || (o = e.eventPool = []);
    if (o.length) {
      var i = o.pop();
      i.type = t;
      return i;
    }
    return new e(t);
  };
  _ctor.dispatchEvent = function (t, o, i) {
    var n = _ctor.create(_ctor, o);
    n.data = i;
    t.dispatchEvent(n);
    _ctor.release(n);
  };
  _ctor.release = function (e) {
    e.clean();
    Object.getPrototypeOf(e).constructor.eventPool.push(e);
  };
  return _ctor;
}();
exports.Event = exp_Event;