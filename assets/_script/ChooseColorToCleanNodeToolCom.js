var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChooseColorToCleanNodeToolCom = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_ToolComBase = require("ToolComBase");
var r_OperationToolCom = require("OperationToolCom");
var r_CleanNodeInfo = require("CleanNodeInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var y = _decorator.requireComponent;
var f = function () {
  function e() {
    this.chooseColorNode = null;
    this.chooseColorOverNode = null;
    this.chooseColorBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "选择的颜色"
  })], e.prototype, "chooseColorNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "选择颜色之后显示的节点"
  })], e.prototype, "chooseColorOverNode", undefined);
  __decorate([_property({
    displayName: "选中颜色之后的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], e.prototype, "chooseColorBehaviors", undefined);
  return __decorate([_ccclass("ChooseColorInfo")], e);
}();
var exp_ChooseColorToCleanNodeToolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cleanInfos = [];
    t.cleanPoint = null;
    t.finishedBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.resetColor = true;
    t.chooseColorMinTime = .5;
    t.chooseColorInfo = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "清理组件",
    type: r_CleanNodeInfo.CleanNodeInfo
  })], _ctor.prototype, "cleanInfos", undefined);
  __decorate([_property({
    displayName: "清理点",
    type: cc.Node,
    visible: function () {
      return 0 != this.cleanInfos.length;
    }
  })], _ctor.prototype, "cleanPoint", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  __decorate([_property({
    displayName: "抬起时是否重置",
    visible: function () {
      return 0 != this.chooseColorInfo.length;
    }
  })], _ctor.prototype, "resetColor", undefined);
  __decorate([_property({
    displayName: "选中颜色至少需要停留的时间",
    visible: function () {
      return 0 != this.chooseColorInfo.length;
    }
  })], _ctor.prototype, "chooseColorMinTime", undefined);
  __decorate([_property({
    type: [f],
    displayName: "颜色信息"
  })], _ctor.prototype, "chooseColorInfo", undefined);
  return __decorate([_ccclass, y(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/先选择颜色之后,才能清理")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.ChooseColorToCleanNodeToolCom = exp_ChooseColorToCleanNodeToolCom;