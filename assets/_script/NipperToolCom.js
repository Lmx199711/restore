var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NipperToolCom = exports.PICKCOUNT = exports.WhereToGO = undefined;
var s;
var r;
var r_OperationToolCom = require("OperationToolCom");
var r_ToolComBase = require("ToolComBase");
var r_BehaviorDef = require("BehaviorDef");
var r_PickableInfo = require("PickableInfo");
(function (e) {
  e[e["原位置"] = 0] = "原位置";
  e[e["目标处"] = 1] = "目标处";
  e[e["指定地点"] = 2] = "指定地点";
})(s = exports.WhereToGO || (exports.WhereToGO = {}));
(function (e) {
  e[e["无上限"] = 0] = "无上限";
  e[e["单个"] = 1] = "单个";
  e[e["两个"] = 2] = "两个";
  e[e["指定数量"] = 3] = "指定数量";
})(r = exports.PICKCOUNT || (exports.PICKCOUNT = {}));
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var m = _decorator.requireComponent;
var exp_NipperToolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.stickPos = null;
    t.destination = null;
    t.isRandom = false;
    t.judgeMode = r_BehaviorDef.DragJudgeMode.移到位置时检测;
    t.resetWhenFailDrag = true;
    t.isSingleNode = r_BehaviorDef.TargetAmountMode.单个;
    t.target = null;
    t.targetArray = [];
    t.pickLimitMode = r.无上限;
    t.pickCountLimit = 3;
    t.whereToGo = s.原位置;
    t.overPlace = null;
    t.isResetEachTime = false;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "吸附在夹子上的位置",
    type: cc.Node
  })], _ctor.prototype, "stickPos", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "夹子终点"
  })], _ctor.prototype, "destination", undefined);
  __decorate([_property({
    displayName: "是否共享夹取物的目的地",
    visible: function () {
      return null == this.destination;
    }
  })], _ctor.prototype, "isRandom", undefined);
  __decorate([_property({
    type: cc.Enum(r_BehaviorDef.DragJudgeMode),
    displayName: "目的地检测方式"
  })], _ctor.prototype, "judgeMode", undefined);
  __decorate([_property({
    displayName: "抬起时不在终点，则重置夹子位置",
    visible: function () {
      return this.judgeMode == r_BehaviorDef.DragJudgeMode.抬起时检测;
    }
  })], _ctor.prototype, "resetWhenFailDrag", undefined);
  __decorate([_property({
    type: cc.Enum(r_BehaviorDef.TargetAmountMode),
    displayName: "拾取物数量"
  })], _ctor.prototype, "isSingleNode", undefined);
  __decorate([_property({
    displayName: "拾取物",
    tooltip: "可以拾取的节点",
    type: r_PickableInfo.PickableInfo,
    visible: function () {
      return this.isSingleNode == r_BehaviorDef.TargetAmountMode.单个;
    }
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "拾取物们",
    tooltip: "可以拾取的节点",
    type: r_PickableInfo.PickableInfo,
    visible: function () {
      return this.isSingleNode == r_BehaviorDef.TargetAmountMode.多个;
    }
  })], _ctor.prototype, "targetArray", undefined);
  __decorate([_property({
    displayName: "单次拾取上限",
    type: cc.Enum(r),
    visible: function () {
      return this.isSingleNode == r_BehaviorDef.TargetAmountMode.多个;
    }
  })], _ctor.prototype, "pickLimitMode", undefined);
  __decorate([_property({
    displayName: "单次拾取上限指定数量：",
    visible: function () {
      return this.isSingleNode == r_BehaviorDef.TargetAmountMode.多个 && this.pickLimitMode == r.指定数量;
    }
  })], _ctor.prototype, "pickCountLimit", undefined);
  __decorate([_property({
    type: cc.Enum(s),
    displayName: "结束最后一次时夹子去哪里",
    visible: function () {
      return this.isSingleNode == r_BehaviorDef.TargetAmountMode.单个 || this.isSingleNode == r_BehaviorDef.TargetAmountMode.多个 && !this.isResetEachTime;
    }
  })], _ctor.prototype, "whereToGo", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "结束时夹子去的位置(节点)",
    visible: function () {
      return this.whereToGo == s.指定地点;
    }
  })], _ctor.prototype, "overPlace", undefined);
  __decorate([_property({
    displayName: "每次成功后是否重置夹子",
    visible: function () {
      return this.isSingleNode == r_BehaviorDef.TargetAmountMode.多个;
    }
  })], _ctor.prototype, "isResetEachTime", undefined);
  return __decorate([_ccclass, m(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/夹子")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.NipperToolCom = exp_NipperToolCom;