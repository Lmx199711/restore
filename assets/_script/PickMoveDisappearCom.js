var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickMoveDisappearCom = undefined;
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
    this.targetNode = null;
    this.isDisappeared = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "拾取目标点"
  })], e.prototype, "targetNode", undefined);
  return __decorate([_ccclass("PickDisappearInfo")], e);
}();
var exp_PickMoveDisappearCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.pickInfo = [];
    t.pickPoint = null;
    t.moveDistance = 150;
    t.pickSound = "";
    t.disappearSound = "";
    t.finishedBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: [y],
    displayName: "拾取消失信息"
  })], _ctor.prototype, "pickInfo", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "拾取点"
  })], _ctor.prototype, "pickPoint", undefined);
  __decorate([_property({
    displayName: "拾取之后移动多少距离消失"
  })], _ctor.prototype, "moveDistance", undefined);
  __decorate([_property({
    displayName: "拾取到时播放的音效"
  })], _ctor.prototype, "pickSound", undefined);
  __decorate([_property({
    displayName: "消失时播放的音效"
  })], _ctor.prototype, "disappearSound", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  return __decorate([_ccclass, d(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/拾取拖动指定距离消失")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.PickMoveDisappearCom = exp_PickMoveDisappearCom;