var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransitionAfter = undefined;
var r_Transition = require("Transition");
var exp_TransitionAfter = function (e) {
  function _ctor(t, o, i, n, a, s) {
    undefined === n && (n = null);
    undefined === a && (a = false);
    undefined === s && (s = null);
    var r = e.call(this, t, o, n, a, s) || this;
    r.delay = i;
    r.time = Date.now();
    return r;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "runTime", {
    get: function () {
      return .001 * (Date.now() - this.time);
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onEnter = function () {
    this.time = Date.now();
  };
  _ctor.prototype.shouldTransition = function () {
    return !(this.runTime < this.delay) && (null == this.condition || this.condition(this));
  };
  return _ctor;
}(r_Transition.Transition);
exports.TransitionAfter = exp_TransitionAfter;