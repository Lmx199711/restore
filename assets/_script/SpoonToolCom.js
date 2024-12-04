var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpoonToolCom = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_OperationToolCom = require("OperationToolCom");
var r_ToolComBase = require("ToolComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = _decorator.requireComponent;
var y = function () {
  function e() {
    this.startScoopNode = null;
    this.endScoopNode = null;
    this.startScoopBehaviors = null;
    this.endScoopBehaviors = null;
    this.revertBehaviors = null;
  }
  __decorate([_property({
    displayName: "勺起的位置",
    type: cc.Node
  })], e.prototype, "startScoopNode", undefined);
  __decorate([_property({
    displayName: "勺放下的位置",
    type: cc.Node
  })], e.prototype, "endScoopNode", undefined);
  __decorate([_property({
    displayName: "勺起时执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], e.prototype, "startScoopBehaviors", undefined);
  __decorate([_property({
    displayName: "勺起放下时执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], e.prototype, "endScoopBehaviors", undefined);
  __decorate([_property({
    displayName: "勺起后不放入目标点，松手时执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], e.prototype, "revertBehaviors", undefined);
  return __decorate([_ccclass("ScoopInfo")], e);
}();
var exp_SpoonToolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.curIndex = 0;
    t.isScooping = false;
    t.checkNode = null;
    t.scoopInfos = [];
    t.startScoopBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.endScoopBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.finishBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "检测点",
    type: cc.Node
  })], _ctor.prototype, "checkNode", undefined);
  __decorate([_property({
    displayName: "勺多次的信息",
    type: [y]
  })], _ctor.prototype, "scoopInfos", undefined);
  __decorate([_property({
    displayName: "每次勺起时执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "startScoopBehaviors", undefined);
  __decorate([_property({
    displayName: "每次勺起后放下执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "endScoopBehaviors", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishBehaviors", undefined);
  return __decorate([_ccclass, d(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/勺子工具")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.SpoonToolCom = exp_SpoonToolCom;