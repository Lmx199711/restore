var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickableInfo = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_BaseTargetable = require("BaseTargetable");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_PickableInfo = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isExpand = false;
    t.isApplyToArray = false;
    t.transformIn = cc.v3(1, 1, 0);
    t.transformOut = cc.v3(1, 1, 0);
    t.quantumIn = cc.v3(0, 0, 0);
    t.quantumOut = cc.v3(0, 0, 0);
    t.nippingBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.successBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "结束时设置新的附着点",
    type: cc.Node
  })], _ctor.prototype, "placeNode", undefined);
  __decorate([_property({
    displayName: "高级组"
  })], _ctor.prototype, "isExpand", undefined);
  __decorate([_property({
    displayName: "* 共享此拓展",
    tooltip: "是否让所有拾取物都使用此配置？(避免重复配置)",
    visible: function () {
      return this.isExpand;
    }
  })], _ctor.prototype, "isApplyToArray", undefined);
  __decorate([_property({
    displayName: "拾取时的缩放倍率和rotation",
    type: cc.Vec3,
    visible: function () {
      return this.isExpand;
    }
  })], _ctor.prototype, "transformIn", undefined);
  __decorate([_property({
    displayName: "放置时的缩放倍率和rotation",
    visible: function () {
      return this.isExpand;
    },
    type: cc.Vec3
  })], _ctor.prototype, "transformOut", undefined);
  __decorate([_property({
    displayName: "拾取时的xy偏移和透明度变化",
    type: cc.Vec3,
    visible: function () {
      return this.isExpand;
    }
  })], _ctor.prototype, "quantumIn", undefined);
  __decorate([_property({
    displayName: "放置时的xy偏移和透明度变化",
    visible: function () {
      return this.isExpand;
    },
    type: cc.Vec3
  })], _ctor.prototype, "quantumOut", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "拾取时执行的action",
    visible: function () {
      return this.isExpand;
    }
  })], _ctor.prototype, "nippingBehaviors", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "放置完成后执行的action"
  })], _ctor.prototype, "successBehaviors", undefined);
  return __decorate([_ccclass("PickableInfo")], _ctor);
}(r_BaseTargetable.BaseTargetable);
exports.PickableInfo = exp_PickableInfo;