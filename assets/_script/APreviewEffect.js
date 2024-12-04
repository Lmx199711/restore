var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APreviewEffect = undefined;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var l = _decorator.executeInEditMode;
var exp_APreviewEffect = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.NNodes = Array();
    t.depth = 1;
    t.childLen = 0;
    t.curPreview = -1;
    t.next = false;
    t.last = false;
    t.reset = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.update = function () {};
  __decorate([_property([cc.Node])], _ctor.prototype, "NNodes", undefined);
  __decorate([_property({
    displayName: "节点深度",
    tooltip: "节点树的高度，叶节点为1"
  })], _ctor.prototype, "depth", undefined);
  __decorate([_property({
    displayName: "组的叶子数量",
    tooltip: "用于限制上下边界"
  })], _ctor.prototype, "childLen", undefined);
  __decorate([_property({
    displayName: "下一个"
  })], _ctor.prototype, "next", undefined);
  __decorate([_property({
    displayName: "上一个"
  })], _ctor.prototype, "last", undefined);
  __decorate([_property({
    displayName: "重置"
  })], _ctor.prototype, "reset", undefined);
  return __decorate([_ccclass, l], _ctor);
}(cc.Component);
exports.APreviewEffect = exp_APreviewEffect;