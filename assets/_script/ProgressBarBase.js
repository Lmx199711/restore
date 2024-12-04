var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_ProgressBarBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.maxSecond = 0;
    t.curSecond = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.init = function (e) {
    this.maxSecond = e;
  };
  return _ctor;
}(cc.Component);
exports.default = def_ProgressBarBase;