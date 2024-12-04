var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicChooseCom = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_ToolComBase = require("ToolComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
_decorator.requireComponent;
var p = function () {
  function e() {
    this.collideNode = null;
    this.selectedBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
  }
  __decorate([_property({
    displayName: "碰撞范围节点",
    type: cc.Node
  })], e.prototype, "collideNode", undefined);
  __decorate([_property({
    displayName: "指针停在碰撞范围内执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], e.prototype, "selectedBehaviors", undefined);
  return __decorate([_ccclass("DynamicSelectItemInfo")], e);
}();
var d = function () {
  function e() {
    this.selectItems = [];
  }
  __decorate([_property({
    displayName: "所有选项",
    type: [p]
  })], e.prototype, "selectItems", undefined);
  return __decorate([_ccclass("DynamicChooseInfo")], e);
}();
var exp_DynamicChooseCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.pointerMoveSpeed = 10;
    t.pointerNode = null;
    t.moveTargetNodes = [];
    t.dynamicChooseInfos = [];
    t.dynamicChooseInfosIndex = 0;
    t.clickBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.resetNeedKeys = "";
    t.canClick = true;
    t.isNeedAll = true;
    t.clickNode = null;
    t.isScaleTween = false;
    t.scaleRate = .95;
    t.scaleDuration = .15;
    t.clickNodeorigScaleX = 1;
    t.clickNodeorigScaleY = 1;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "指针移动速度",
    type: cc.Float
  })], _ctor.prototype, "pointerMoveSpeed", undefined);
  __decorate([_property({
    displayName: "指针节点",
    type: cc.Node
  })], _ctor.prototype, "pointerNode", undefined);
  __decorate([_property({
    displayName: "指针位移的目标点",
    type: [cc.Node]
  })], _ctor.prototype, "moveTargetNodes", undefined);
  __decorate([_property({
    displayName: "所有选择信息",
    type: [d]
  })], _ctor.prototype, "dynamicChooseInfos", undefined);
  __decorate([_property({
    displayName: "点击时执行的action",
    tooltip: "每次点击都会执行"
  })], _ctor.prototype, "clickBehaviors", undefined);
  __decorate([_property({
    displayName: "重制为能点击需要的key",
    tooltip: "当有这些key发生变化时会触发按钮重置,多个用逗号隔开"
  })], _ctor.prototype, "resetNeedKeys", undefined);
  __decorate([_property({
    displayName: "能否开始选择道具"
  })], _ctor.prototype, "canClick", undefined);
  __decorate([_property({
    displayName: "检测方式",
    tooltip: "全部满足还是满足最新的key"
  })], _ctor.prototype, "isNeedAll", undefined);
  __decorate([_property({
    displayName: "停止指针移动的按钮",
    type: cc.Node
  })], _ctor.prototype, "clickNode", undefined);
  __decorate([_property({
    displayName: "按下时是否缩放",
    visible: function () {
      return this.clickNode;
    }
  })], _ctor.prototype, "isScaleTween", undefined);
  __decorate([_property({
    displayName: "缩放系数",
    type: cc.Float,
    visible: function () {
      return this.isScaleTween && this.clickNode;
    }
  })], _ctor.prototype, "scaleRate", undefined);
  __decorate([_property({
    displayName: "缩放所需时间",
    type: cc.Float,
    visible: function () {
      return this.isScaleTween && this.clickNode;
    }
  })], _ctor.prototype, "scaleDuration", undefined);
  return __decorate([_ccclass, _menu("新系统/工具/选择动态移动中的一个选项")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.DynamicChooseCom = exp_DynamicChooseCom;