var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationToolCom = exports.BeTouchEventChangeNodeInfo = exports.OperationToolShowNodeInfo = exports.ToolMoveInfo = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_EventComBase = require("EventComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_ToolMoveInfo = function () {
  function _ctor() {
    this.target = null;
    this.originPos = new cc.Vec2();
    this.targetPos = new cc.Vec2();
    this.isInit = true;
    this.delay = 0;
    this.duration = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "操作的目标节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "初始位置"
  })], _ctor.prototype, "originPos", undefined);
  __decorate([_property({
    displayName: "初始位置"
  })], _ctor.prototype, "targetPos", undefined);
  __decorate([_property({
    displayName: "是否在初始化时设置为初始位置"
  })], _ctor.prototype, "isInit", undefined);
  __decorate([_property({
    displayName: "延迟时间"
  })], _ctor.prototype, "delay", undefined);
  __decorate([_property({
    displayName: "持续时间"
  })], _ctor.prototype, "duration", undefined);
  return __decorate([_ccclass("ToolMoveInfo")], _ctor);
}();
exports.ToolMoveInfo = exp_ToolMoveInfo;
var exp_OperationToolShowNodeInfo = function () {
  function _ctor() {
    this.isShow = false;
    this.delay = 0;
  }
  __decorate([_property({
    displayName: "操作的节点",
    type: cc.Node
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    displayName: "显示"
  })], _ctor.prototype, "isShow", undefined);
  __decorate([_property({
    displayName: "延迟?"
  })], _ctor.prototype, "delay", undefined);
  return __decorate([_ccclass("OperationToolShowNodeInfo")], _ctor);
}();
exports.OperationToolShowNodeInfo = exp_OperationToolShowNodeInfo;
var exp_BeTouchEventChangeNodeInfo = function () {
  function _ctor() {
    this.starTouch = [];
    this.stratAction = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    this.endTouch = [];
    this.endAction = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    this.triggerEnter = [];
    this.triggerEnterAction = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    this.triggerEixt = [];
    this.triggerEixtAction = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
  }
  _ctor.prototype.onStarTouch = function () {
    this.starTouch.forEach(function (e) {
      e.node.active = e.isShow;
    });
    this.stratAction && this.stratAction.execute();
  };
  _ctor.prototype.onEndTouch = function () {
    this.endTouch.forEach(function (e) {
      e.node.active = e.isShow;
    });
    this.endAction && this.endAction.execute();
  };
  _ctor.prototype.onTriggerEnter = function () {
    this.triggerEnter.forEach(function (e) {
      e.node.active = e.isShow;
    });
    this.triggerEnterAction && this.triggerEnterAction.execute();
  };
  _ctor.prototype.onTriggerEixt = function () {
    this.triggerEixt.forEach(function (e) {
      e.node.active = e.isShow;
    });
    this.triggerEixtAction && this.triggerEixtAction.execute();
  };
  __decorate([_property({
    displayName: "开始点击事件",
    type: [exp_OperationToolShowNodeInfo]
  })], _ctor.prototype, "starTouch", undefined);
  __decorate([_property({
    displayName: "开始行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "stratAction", undefined);
  __decorate([_property({
    displayName: "结束点击事件",
    type: [exp_OperationToolShowNodeInfo]
  })], _ctor.prototype, "endTouch", undefined);
  __decorate([_property({
    displayName: "结束行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "endAction", undefined);
  __decorate([_property({
    displayName: "进入操作区域",
    type: [exp_OperationToolShowNodeInfo]
  })], _ctor.prototype, "triggerEnter", undefined);
  __decorate([_property({
    displayName: "进入操作区域行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "triggerEnterAction", undefined);
  __decorate([_property({
    displayName: "离开操作区域",
    type: [exp_OperationToolShowNodeInfo]
  })], _ctor.prototype, "triggerEixt", undefined);
  __decorate([_property({
    displayName: "离开操作区域行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "triggerEixtAction", undefined);
  return __decorate([_ccclass("BeTouchEventChangeNodeInfo")], _ctor);
}();
exports.BeTouchEventChangeNodeInfo = exp_BeTouchEventChangeNodeInfo;
var exp_OperationToolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isSimplify = true;
    t.needPrecondition = true;
    t.isFree = false;
    t.isTopFloor = false;
    t.isTopOfFloor = false;
    t.operationArea = null;
    t.touchChangeInfo = new exp_BeTouchEventChangeNodeInfo();
    t.canOperationKeys = "";
    t.dieArea = null;
    t.finishedKey = "";
    t.behaviourWhenSuccess = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.showNextToolsKey = "";
    t.nextTools = [];
    t.nextToolsEnter = [];
    t.failNeedKeys = "";
    t.behaviourWhenFail = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "折叠更多选项"
  })], _ctor.prototype, "isSimplify", undefined);
  __decorate([_property({
    displayName: "工具检查点",
    type: cc.Node
  })], _ctor.prototype, "checkPos", undefined);
  __decorate([_property({
    displayName: "自由拖放?",
    tooltip: "拖放结束后不会重置(通常不勾选)"
  })], _ctor.prototype, "isFree", undefined);
  __decorate([_property({
    displayName: "按下时是否放在顶层"
  })], _ctor.prototype, "isTopFloor", undefined);
  __decorate([_property({
    displayName: "按下时是否放在顶层（松手时会还原层级）"
  })], _ctor.prototype, "isTopOfFloor", undefined);
  __decorate([_property({
    displayName: "操作区域",
    type: cc.Node
  })], _ctor.prototype, "operationArea", undefined);
  __decorate([_property({
    displayName: "特定操作显示内容",
    visible: function () {
      return !this.isSimplify;
    }
  })], _ctor.prototype, "touchChangeInfo", undefined);
  __decorate([_property({
    displayName: "有这些key才能操作",
    visible: function () {
      return !this.isSimplify;
    }
  })], _ctor.prototype, "canOperationKeys", undefined);
  __decorate([_property({
    displayName: "死亡判定区域",
    type: cc.Node,
    visible: function () {
      return !this.isSimplify;
    }
  })], _ctor.prototype, "dieArea", undefined);
  __decorate([_property({
    displayName: "不存在其中任何一个key后执行",
    tooltip: "多个key用逗号隔开",
    visible: function () {
      return !this.isSimplify;
    }
  })], _ctor.prototype, "finishedKey", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    visible: function () {
      return !this.isSimplify;
    }
  })], _ctor.prototype, "behaviourWhenSuccess", undefined);
  __decorate([_property({
    displayName: "显示或隐藏其他道具的key",
    tooltip: "多个key用逗号隔开"
  })], _ctor.prototype, "showNextToolsKey", undefined);
  __decorate([_property({
    type: exp_OperationToolShowNodeInfo,
    displayName: "成功之后显示或隐藏其他道具",
    tooltip: "常用于显示相同的另一个道具",
    visible: function () {
      return this.showNextToolsKey.length > 0;
    }
  })], _ctor.prototype, "nextTools", undefined);
  __decorate([_property({
    type: exp_ToolMoveInfo,
    displayName: "下一个道具进场/退场",
    tooltip: "常用于道具进场和退场",
    visible: function () {
      return this.showNextToolsKey.length > 0;
    }
  })], _ctor.prototype, "nextToolsEnter", undefined);
  __decorate([_property({
    displayName: "触发失败所需要的key",
    visible: function () {
      return !this.isSimplify;
    }
  })], _ctor.prototype, "failNeedKeys", undefined);
  __decorate([_property({
    displayName: "失败后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    visible: function () {
      return !this.isSimplify;
    }
  })], _ctor.prototype, "behaviourWhenFail", undefined);
  return __decorate([_ccclass, _menu("新系统/工具/工具功能组件")], _ctor);
}(r_EventComBase.EventComBase);
exports.OperationToolCom = exp_OperationToolCom;