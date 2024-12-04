var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToTrigger = undefined;
var r_GamingUI = require("GamingUI");
var r_SoundMgr = require("SoundMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_MoveToClean = require("MoveToClean");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_MoveToTrigger = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.showSuccessAnim = true;
    t.continueSoundName = "";
    t.endStopMusic = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onDragStart = function (t) {
    "" != this.continueSoundName && r_SoundMgr.SoundMgr.playSound(this.continueSoundName, true);
    this.upNode && (this.upNode.active = true);
    this.downNode && (this.downNode.active = false);
    this.isGameOver = false;
    this.inCleanPolygon = false;
    e.prototype.onDragStart.call(this, t);
  };
  _ctor.prototype.onDragMove = function (t) {
    this.isGameOver || e.prototype.onDragMove.call(this, t);
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
    this.checkInCleanPolygon();
    if (this.cleanProgress >= 1 && !this.isCompleted) {
      this.endStopMusic && "" != this.continueSoundName && r_SoundMgr.SoundMgr.stopSound(this.continueSoundName);
      this.showSuccessAnim && r_GamingUI.GamingUI.Inst.showStepTip(true);
      this.isCompleted = true;
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
      this.cleanCom.cleanCompeleted();
      for (var o = 0; o < this.cleansCom.length; o++) {
        this.cleansCom[o].cleanCompeleted();
      }
      this.cleanCompeleted();
    }
  };
  _ctor.prototype.onDragEnd = function (t) {
    this.upNode && (this.upNode.active = false);
    this.downNode && (this.downNode.active = true);
    this.isGameOver = false;
    e.prototype.onDragEnd.call(this, t);
  };
  _ctor.prototype._OnDragEnd = function (t) {
    "" != this.continueSoundName && r_SoundMgr.SoundMgr.stopSound(this.continueSoundName);
    e.prototype._OnDragEnd.call(this, t);
    this.setCanClean(false);
    this.resetPos();
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.cleanEndActionId);
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "抬起节点"
  })], _ctor.prototype, "upNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "放下节点"
  })], _ctor.prototype, "downNode", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  __decorate([_property({
    displayName: "抬起持续音效"
  })], _ctor.prototype, "continueSoundName", undefined);
  __decorate([_property({
    displayName: "结束时停止音效"
  })], _ctor.prototype, "endStopMusic", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拖动物体触碰碰撞列表")], _ctor);
}(r_MoveToClean.MoveToClean);
exports.MoveToTrigger = exp_MoveToTrigger;