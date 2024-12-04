var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transition = undefined;
var r_TransitionBase = require("TransitionBase");
var exp_Transition = function (e) {
  function _ctor(t, o, i, n, a) {
    undefined === n && (n = false);
    undefined === a && (a = null);
    var s = e.call(this, t, o, n, a) || this;
    s.condition = i;
    return s;
  }
  __extends(_ctor, e);
  _ctor.prototype.shouldTransition = function () {
    if (this.condition) {
      return this.condition(this);
    } else {
      return e.prototype.shouldTransition.call(this);
    }
  };
  return _ctor;
}(r_TransitionBase.TransitionBase);
exports.Transition = exp_Transition;