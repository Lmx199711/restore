Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransitionBase = undefined;
var exp_TransitionBase = function () {
  function _ctor(e, t, o, i) {
    undefined === o && (o = false);
    undefined === i && (i = null);
    this.from = e;
    this.to = t;
    this.forceInstantly = o;
    this.data = i;
  }
  _ctor.prototype.init = function () {};
  _ctor.prototype.onEnter = function () {};
  _ctor.prototype.shouldTransition = function () {
    return true;
  };
  return _ctor;
}();
exports.TransitionBase = exp_TransitionBase;