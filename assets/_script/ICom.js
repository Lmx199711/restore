var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_ICom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.targets = [];
    t.isNeedTargets = false;
    t.isClicking = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.addTraget = function (e) {
    this.targets.push(e);
  };
  _ctor.prototype.startFunc = function () {};
  _ctor.prototype.moveFunc = function () {};
  _ctor.prototype.endFunc = function () {};
  return _ctor;
}(cc.Component);
exports.default = def_ICom;