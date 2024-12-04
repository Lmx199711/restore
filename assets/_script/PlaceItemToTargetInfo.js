var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaceItemToTargetInfo = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_BaseTargetable = require("BaseTargetable");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_PlaceItemToTargetInfo = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.changeSize = false;
    t.placeSize = cc.v2(1, 1);
    t.successBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "成功后放入此节点下",
    type: cc.Node
  })], _ctor.prototype, "placeNode", undefined);
  __decorate([_property({
    displayName: "改变大小",
    visible: function () {
      return this.placeNode;
    }
  })], _ctor.prototype, "changeSize", undefined);
  __decorate([_property({
    displayName: "放置后大小",
    visible: function () {
      return this.changeSize;
    },
    type: cc.Vec2
  })], _ctor.prototype, "placeSize", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "拖动完成后执行的action"
  })], _ctor.prototype, "successBehaviors", undefined);
  return __decorate([_ccclass("PlaceItemToTargetInfo")], _ctor);
}(r_BaseTargetable.BaseTargetable);
exports.PlaceItemToTargetInfo = exp_PlaceItemToTargetInfo;