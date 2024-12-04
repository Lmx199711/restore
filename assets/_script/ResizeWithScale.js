var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeWithScale = undefined;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var exp_ResizeWithScale = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.node.width *= this.node.scaleX;
    this.node.height *= this.node.scaleY;
    this.node.scaleX = this.node.scaleY = 1;
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.ResizeWithScale = exp_ResizeWithScale;