var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_OpacityComponent = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.isOpacity = false;
    this.isOver = false;
  };
  _ctor.prototype.update = function (e) {
    if (this.isOpacity && !this.isOver) {
      this.node.opacity += this.perSecondOpacity * e;
      if (this.targetOpacity > this.origOpacity) {
        if (this.node.opacity >= this.targetOpacity) {
          this.callback && this.callback();
          this.isOver = true;
          this.callback = null;
        }
      } else if (this.node.opacity <= this.targetOpacity) {
        this.callback && this.callback();
        this.isOver = true;
        this.callback = null;
      }
    }
  };
  _ctor.prototype.startOpacity = function (e, t, o, i) {
    this.origOpacity = e;
    this.targetOpacity = t;
    this.perSecondOpacity = o;
    this.node.opacity = e;
    this.isOver = false;
    this.callback = i;
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_OpacityComponent;