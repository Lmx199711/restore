var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CleanFlagDataConvertCom = undefined;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var l = _decorator.executeInEditMode;
var exp_CleanFlagDataConvertCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.convertToData = false;
    t.convertToNode = false;
    t.delAll = false;
    t.left = 0;
    t.right = 0;
    t.top = 0;
    t.bottom = 0;
    t.spacingX = 10;
    t.spacingY = 10;
    t.createNode = false;
    t.childPos = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.update = function () {};
  _ctor.prototype.cleanChildNode = function () {
    for (var e = 0; e < this.node.childrenCount; e++) {
      this.node.children[e].destroy();
    }
  };
  __decorate([_property({
    displayName: "转换成数据"
  })], _ctor.prototype, "convertToData", undefined);
  __decorate([_property({
    displayName: "转换成节点"
  })], _ctor.prototype, "convertToNode", undefined);
  __decorate([_property({
    displayName: "删除所有"
  })], _ctor.prototype, "delAll", undefined);
  __decorate([_property()], _ctor.prototype, "left", undefined);
  __decorate([_property()], _ctor.prototype, "right", undefined);
  __decorate([_property()], _ctor.prototype, "top", undefined);
  __decorate([_property()], _ctor.prototype, "bottom", undefined);
  __decorate([_property()], _ctor.prototype, "spacingX", undefined);
  __decorate([_property()], _ctor.prototype, "spacingY", undefined);
  __decorate([_property({
    displayName: "创建节点",
    tooltip: "一般只用用于第一次创建节点或者修改节点布局"
  })], _ctor.prototype, "createNode", undefined);
  __decorate([_property({
    type: [cc.Vec2],
    displayName: "转换之后的数据"
  })], _ctor.prototype, "childPos", undefined);
  return __decorate([_ccclass, l], _ctor);
}(cc.Component);
exports.CleanFlagDataConvertCom = exp_CleanFlagDataConvertCom;