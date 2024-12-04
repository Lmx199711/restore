var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MakeDumplingsCom = undefined;
var r_OperationToolCom = require("OperationToolCom");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_ToolComBase = require("ToolComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = _decorator.requireComponent;
var exp_MakeDumplingsCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isAllFinish = false;
    t.putArea = null;
    t.putDumplingsArea = null;
    t.dumplingsWrapper = [];
    t.dumplingsWrapperTarget = [];
    t.dumplingsFilling = [];
    t.dumplingsFillingTarget = [];
    t.dumplingsAniNode = [];
    t.dumplingsAniNodeTarget = [];
    t.delayAniTime = [];
    t.spoon = null;
    t.spoonPickPoint = null;
    t.pickDumplingsWrapperSound = "getItem";
    t.putDumplingsWrapperSound = "itemDown";
    t.pickDumplingsFillingSound = "getItem";
    t.putDumplingsFillingSound = "itemDown";
    t.makeDumplingsSound = "";
    t.isSort = false;
    t.finishedBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: cc.Node,
    displayName: "放饺子皮和馅的区域"
  })], _ctor.prototype, "putArea", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "放饺子的区域"
  })], _ctor.prototype, "putDumplingsArea", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "饺子皮"
  })], _ctor.prototype, "dumplingsWrapper", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "饺子皮目标节点"
  })], _ctor.prototype, "dumplingsWrapperTarget", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "饺子馅"
  })], _ctor.prototype, "dumplingsFilling", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "饺子馅目标节点"
  })], _ctor.prototype, "dumplingsFillingTarget", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "包饺子动画节点"
  })], _ctor.prototype, "dumplingsAniNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "包饺子动画目标位置"
  })], _ctor.prototype, "dumplingsAniNodeTarget", undefined);
  __decorate([_property({
    type: Number,
    displayName: "延迟移动到饺子目标"
  })], _ctor.prototype, "delayAniTime", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "勺子"
  })], _ctor.prototype, "spoon", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "勺子拾取点",
    visible: function () {
      return this.spoon;
    }
  })], _ctor.prototype, "spoonPickPoint", undefined);
  __decorate([_property({
    displayName: "拾取饺子皮时的音效"
  })], _ctor.prototype, "pickDumplingsWrapperSound", undefined);
  __decorate([_property({
    displayName: "放下饺子皮时的音效"
  })], _ctor.prototype, "putDumplingsWrapperSound", undefined);
  __decorate([_property({
    displayName: "拾取饺子馅时的音效"
  })], _ctor.prototype, "pickDumplingsFillingSound", undefined);
  __decorate([_property({
    displayName: "放下饺子馅时的音效"
  })], _ctor.prototype, "putDumplingsFillingSound", undefined);
  __decorate([_property({
    displayName: "包饺子的音效"
  })], _ctor.prototype, "makeDumplingsSound", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  return __decorate([_ccclass, d(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/特殊/包饺子")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.MakeDumplingsCom = exp_MakeDumplingsCom;