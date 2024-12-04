var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ScoreBase = require("ScoreBase");
var r_ShowEffectBase = require("ShowEffectBase");
var r_BehaviorMgr = require("BehaviorMgr");
var r_IPicLabel = require("IPicLabel");
var r_ValueTrigger = require("ValueTrigger");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_ScoreSimpleTime = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.curScore = -1;
    t.maxScore = 999;
    t.txtPrefix = "";
    t.theLabel = null;
    t.theTextCom = null;
    t.txtPostfix = "";
    t.targetScore = -1;
    t.hasClose = false;
    t.effectNodeOri = 0;
    t.autoTriggerTimer = 10;
    t.useScoreAsTarget = false;
    t.autoTriggerId = "";
    t.effectNode = null;
    t.curTriggerTime = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.cur = this.curScore;
    this.max = this.maxScore;
    this.target = this.targetScore;
  };
  _ctor.prototype.start = function () {
    this.beCurLabel();
  };
  _ctor.prototype.beCurLabel = function (e) {
    if (this.theLabel) {
      var t = "" + this.txtPrefix + (e || this.cur) + this.txtPostfix;
      this.showTxt(t);
    }
  };
  _ctor.prototype.init = function (t, o) {
    e.prototype.init.call(this, t, o);
    this.beCurLabel();
  };
  _ctor.prototype.addScore = function (t) {
    console.log("当前分数" + this.cur + ",变化分数为" + t);
    e.prototype.addScore.call(this, t);
    var o = "" + this.txtPrefix + this.cur + this.txtPostfix;
    this.showTxt(o);
    this.effectNode && this.effectNode.getComponent(r_ShowEffectBase.default).handleArg({
      text: t,
      time: .5
    });
    this.curTriggerTime++;
    if (this.curTriggerTime >= this.autoTriggerTimer && !this.useScoreAsTarget) {
      console.log("达到" + this.autoTriggerTimer + ",触发" + this.autoTriggerId);
      r_BehaviorMgr.BehaviorMgr.trigger(this.autoTriggerId);
      this.over2Success();
    }
    this.node.getComponent(r_ValueTrigger.ValueTrigger) && this.node.getComponent(r_ValueTrigger.ValueTrigger).valueMatch({
      value: this.curTriggerTime
    });
    if (this.cur >= this.target && this.useScoreAsTarget) {
      console.log("达到" + this.target + ",触发" + this.autoTriggerId);
      r_BehaviorMgr.BehaviorMgr.trigger(this.autoTriggerId);
      this.over2Success();
      this.node.getChildByName("提交").active = false;
    }
  };
  _ctor.prototype.showTxt = function (e) {
    if (this.theLabel.getComponent(r_IPicLabel.default)) {
      this.theLabel.getComponent(r_IPicLabel.default).setString(e);
    } else if (this.theTextCom) {
      this.theTextCom.string = e;
    } else {
      this.theTextCom = this.theLabel.getComponent(cc.Label) || this.theLabel.getComponent(cc.RichText);
    }
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.OverCheck = function () {
    if (this.curTriggerTime >= this.autoTriggerTimer) {
      console.log("分数组件达到目标，执行runInstance的胜利");
      this.over2Success();
    } else {
      console.log("分数组件没有达到，执行runInstance的失败");
      this.over2Defeat();
    }
  };
  _ctor.prototype.OverCheckByScore = function (e) {
    if (this.cur >= this.target) {
      console.log("分数组件达到目标，执行runInstance的胜利");
      this.over2Success();
      e.target.active = false;
    } else {
      console.log("分数组件没有达到，执行runInstance的失败");
      this.over2Defeat();
      e.target.active = false;
    }
  };
  _ctor.prototype.bntCheckSuccess = function () {
    this.hasClose || (this.hasClose = true);
  };
  __decorate([_property({
    displayName: "初始化cur",
    type: cc.Integer
  })], _ctor.prototype, "curScore", undefined);
  __decorate([_property({
    displayName: "初始化max",
    type: cc.Integer
  })], _ctor.prototype, "maxScore", undefined);
  __decorate([_property({
    displayName: "文本前缀"
  })], _ctor.prototype, "txtPrefix", undefined);
  __decorate([_property({
    displayName: "the Label",
    type: cc.Node
  })], _ctor.prototype, "theLabel", undefined);
  __decorate([_property({
    displayName: "文本后缀"
  })], _ctor.prototype, "txtPostfix", undefined);
  __decorate([_property({
    displayName: "目标分",
    type: cc.Integer
  })], _ctor.prototype, "targetScore", undefined);
  __decorate([_property({
    displayName: "需要触发几次"
  })], _ctor.prototype, "autoTriggerTimer", undefined);
  __decorate([_property({
    displayName: "使用分数代替次数目标"
  })], _ctor.prototype, "useScoreAsTarget", undefined);
  __decorate([_property({
    displayName: "达到n次后触发id"
  })], _ctor.prototype, "autoTriggerId", undefined);
  __decorate([_property({
    displayName: "额外的效果组件",
    type: r_ShowEffectBase.default
  })], _ctor.prototype, "effectNode", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/大量行为/分数组件/(图片)数字计数")], _ctor);
}(r_ScoreBase.default);
exports.default = def_ScoreSimpleTime;