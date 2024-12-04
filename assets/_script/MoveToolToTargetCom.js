var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToolToTargetCom = undefined;
var r_OperationToolCom = require("OperationToolCom");
var r_ToolComBase = require("ToolComBase");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = _decorator.requireComponent;
var y = function () {
  function e() {
    this.node = null;
    this.isShow = true;
    this.delay = 0;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "操作的节点"
  })], e.prototype, "node", undefined);
  __decorate([_property({
    displayName: "显示?"
  })], e.prototype, "isShow", undefined);
  __decorate([_property({
    displayName: "延迟时间"
  })], e.prototype, "delay", undefined);
  return __decorate([_ccclass("OpOtherNode")], e);
}();
var exp_MoveToolToTargetCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.targetPos = null;
    t.checkPoint = null;
    t.showTargetNode = null;
    t.hideOwner = false;
    t.delayShowOwner = 0;
    t.isAdsorb = true;
    t.isChangeParent = false;
    t.isShowOtherNode = false;
    t.otherNodeInfo = [];
    t.finishedBehaviors = null;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "目标位置",
    type: cc.Node
  })], _ctor.prototype, "targetPos", undefined);
  __decorate([_property({
    displayName: "检测点",
    type: cc.Node,
    tooltip: "检测点,如果没有,以自身位置为检测点"
  })], _ctor.prototype, "checkPoint", undefined);
  __decorate([_property({
    displayName: "拖到目标位置之后显示一个目标节点",
    type: cc.Node
  })], _ctor.prototype, "showTargetNode", undefined);
  __decorate([_property({
    displayName: "拖到目标位置后隐藏自身节点"
  })], _ctor.prototype, "hideOwner", undefined);
  __decorate([_property({
    displayName: "延迟显示",
    tooltip: "隐藏自身节点，在多少s之后在显示",
    visible: function () {
      return !this.hideOwner;
    }
  })], _ctor.prototype, "delayShowOwner", undefined);
  __decorate([_property({
    displayName: "是否吸附到目标位置",
    visible: function () {
      return !this.hideOwner;
    }
  })], _ctor.prototype, "isAdsorb", undefined);
  __decorate([_property({
    displayName: "是否将该节点放到目标位置下",
    tooltip: "勾选之后会改变该节点的父物体",
    visible: function () {
      return !this.hideOwner;
    }
  })], _ctor.prototype, "isChangeParent", undefined);
  __decorate([_property({
    displayName: "显示或隐藏其他节点"
  })], _ctor.prototype, "isShowOtherNode", undefined);
  __decorate([_property({
    type: y,
    displayName: "其他节点信息",
    visible: function () {
      return this.isShowOtherNode;
    }
  })], _ctor.prototype, "otherNodeInfo", undefined);
  __decorate([_property({
    displayName: "拖动工具到目标位置后执行",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  return __decorate([_ccclass, d(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/拖动工具到指定位置")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.MoveToolToTargetCom = exp_MoveToolToTargetCom;