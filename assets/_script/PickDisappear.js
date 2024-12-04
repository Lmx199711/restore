var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickDisappear = undefined;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var r_SoundMgr = require("SoundMgr");
var r_GamingUI = require("GamingUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_PickDisappear = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.pickAction = "";
    t.disappearAction = "";
    t.touchStartNode = null;
    t.touchEndNode = null;
    t.pickingSprite = null;
    t.pickPoint = null;
    t.pickNode = [];
    t.moveDis = 300;
    t.upSoundName = "";
    t.downSoundName = "";
    t.showSuccessAnim = false;
    t.pickNodeIndex = -1;
    t.curPickingNode = null;
    t.isGameOver = false;
    t.pickX = 0;
    t.pickY = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    this.touchStartNode.active = false;
    this.touchEndNode.active = true;
    for (var t = 0; t < this.pickNode.length; t++) {
      this.pickNode[t].active = true;
    }
  };
  _ctor.prototype.onDragMove = function (t) {
    this.isGameOver || e.prototype.onDragMove.call(this, t);
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
    this.checkPick();
    this.checkPut();
  };
  _ctor.prototype._OnDragEnd = function (t) {
    e.prototype._OnDragEnd.call(this, t);
    this.curPickingNode && (this.curPickingNode.active = true);
    this.resetPos();
    this.checkPickFinish();
  };
  _ctor.prototype.resetPos = function () {
    e.prototype.resetPos.call(this);
    this.touchStartNode.active = false;
    this.touchEndNode.active = true;
    this.pickingSprite.spriteFrame = null;
    this.curPickingNode = null;
    this.pickNodeIndex = -1;
  };
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
    this.pickingSprite.node.scaleX = 1;
    this.pickingSprite.node.scaleY = 1;
    this.touchStartNode.active = true;
    this.touchEndNode.active = false;
    this.isGameOver = false;
  };
  _ctor.prototype.checkPick = function () {
    if (-1 == this.pickNodeIndex) {
      for (var e = 0; e < this.pickNode.length; e++) {
        var t = this.pickNode[e];
        if (t.active && this.nodeOverOtherNode(this.pickPoint, t)) {
          if (!r_CheckHasKeys.checkHasKeys(this.hasKey)) {
            this.isGameOver = true;
            r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
            return void this.resetPos();
          }
          this.pickNodeIndex = e;
          this.pickingSprite.spriteFrame = t.getComponent(cc.Sprite).spriteFrame;
          this.curPickingNode = t;
          t.active = false;
          this.pickX = this.node.x;
          this.pickY = this.node.y;
          r_TriggerActionMgr.TriggerActionMgr.trigger(this.pickAction);
          "" != this.upSoundName && r_SoundMgr.SoundMgr.playSound(this.upSoundName);
          break;
        }
      }
    }
  };
  _ctor.prototype.checkPut = function () {
    if (-1 != this.pickNodeIndex && !this.isGameOver) {
      var e = this.node.x - this.pickX;
      var t = this.node.y - this.pickY;
      if (e * e + t * t > this.moveDis * this.moveDis) {
        this.pickingSprite.spriteFrame = null;
        this.curPickingNode = null;
        this.pickNodeIndex = -1;
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.disappearAction);
        "" != this.downSoundName && r_SoundMgr.SoundMgr.playSound(this.downSoundName);
      }
    }
  };
  _ctor.prototype.checkPickFinish = function () {
    var e = true;
    for (var t = 0; t < this.pickNode.length; t++) {
      if (this.pickNode[t].active) {
        e = false;
        break;
      }
    }
    if (e) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
      this.showSuccessAnim && r_GamingUI.GamingUI.Inst.showStepTip(true);
    }
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
    cc.Tween.stopAllByTarget(this.pickingSprite.node);
  };
  __decorate([_property({
    displayName: "拾取时的action"
  })], _ctor.prototype, "pickAction", undefined);
  __decorate([_property({
    displayName: "消失时的action"
  })], _ctor.prototype, "disappearAction", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "按下时显示的节点"
  })], _ctor.prototype, "touchStartNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "抬起时显示的节点"
  })], _ctor.prototype, "touchEndNode", undefined);
  __decorate([_property({
    type: cc.Sprite,
    displayName: "拾取到时显示的节点"
  })], _ctor.prototype, "pickingSprite", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "拾取的点，用于检测是否触摸到了拾取目标"
  })], _ctor.prototype, "pickPoint", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "可以拾取的图片"
  })], _ctor.prototype, "pickNode", undefined);
  __decorate([_property({
    displayName: "移动多远消失"
  })], _ctor.prototype, "moveDis", undefined);
  __decorate([_property({
    displayName: "抬起音效"
  })], _ctor.prototype, "upSoundName", undefined);
  __decorate([_property({
    displayName: "放下音效"
  })], _ctor.prototype, "downSoundName", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拾取图片到设定的范围外时消失")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.PickDisappear = exp_PickDisappear;