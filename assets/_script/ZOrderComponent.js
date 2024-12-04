var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_ZOrderComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.zOrder = 0;
    t.curHang = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.node.zIndex = this.zOrder;
  };
  __decorate([_property({
    tooltip: "节点的层级"
  })], _ctor.prototype, "zOrder", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ZOrderComponent;