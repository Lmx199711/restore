var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CleanFallToolCom = undefined;
var r_OperationToolCom = require("OperationToolCom");
var r_CleanNodeInfo = require("CleanNodeInfo");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_ToolComBase = require("ToolComBase");
var u = cc.Vec2;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var f = _decorator.requireComponent;
var exp_CleanFallToolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cleanInfos = [];
    t.cleanPoint = null;
    t.fallParent = null;
    t.fallNode = null;
    t.fallSpeed = 300;
    t.intervalTime = .1;
    t.rotateRange = new u(0, 0);
    t.finishedBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
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
    type: cc.Node,
    displayName: "掉落节点生成在哪个节点下",
    visible: function () {
      return 0 != this.cleanInfos.length;
    }
  })], _ctor.prototype, "fallParent", undefined);
  __decorate([_property({
    displayName: "掉落节点",
    type: cc.Node,
    visible: function () {
      return 0 != this.cleanInfos.length;
    }
  })], _ctor.prototype, "fallNode", undefined);
  __decorate([_property({
    displayName: "掉落速度",
    visible: function () {
      return 0 != this.cleanInfos.length;
    }
  })], _ctor.prototype, "fallSpeed", undefined);
  __decorate([_property({
    displayName: "掉落间隔",
    visible: function () {
      return 0 != this.cleanInfos.length;
    }
  })], _ctor.prototype, "intervalTime", undefined);
  __decorate([_property({
    displayName: "旋转速度(区间)",
    type: u,
    visible: function () {
      return 0 != this.cleanInfos.length;
    }
  })], _ctor.prototype, "rotateRange", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  return __decorate([_ccclass, f(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/清理工具-掉落清理的物品")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.CleanFallToolCom = exp_CleanFallToolCom;