var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickPut = undefined;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var r_SoundMgr = require("SoundMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_GamingUI = require("GamingUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var m = function () {
  function e() {
    this.pickNode = null;
    this.putNode = null;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "需要拾取的节点"
  })], e.prototype, "pickNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "放置时的节点"
  })], e.prototype, "putNode", undefined);
  return __decorate([_ccclass("PickPutNodeInfo")], e);
}();
var g = function () {
  function e() {
    this.targetNode = null;
    this.pickPutNodeInfo = [];
    this.pickActionId = "";
    this.putActionId = "";
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "可以放置的目标节点"
  })], e.prototype, "targetNode", undefined);
  __decorate([_property({
    type: [m],
    displayName: "拾取和放置节点信息"
  })], e.prototype, "pickPutNodeInfo", undefined);
  __decorate([_property({
    displayName: "拾取时的action"
  })], e.prototype, "pickActionId", undefined);
  __decorate([_property({
    displayName: "放下时的action"
  })], e.prototype, "putActionId", undefined);
  return __decorate([_ccclass("PickPutInfo")], e);
}();
var exp_PickPut = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchStartNode = null;
    t.touchEndNode = null;
    t.pickingSprite = null;
    t.pickPoint = null;
    t.pickPutInfo = [];
    t.canTouchKey = [];
    t.pickSound = "";
    t.putSound = "";
    t.successSaveKey = "";
    t.successDeleteKey = "";
    t.showSuccessAnim = true;
    t.pickNodeIndex = -1;
    t.pickIndex = -1;
    t.curPickingNode = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    this.touchStartNode && (this.touchStartNode.active = false);
    this.touchEndNode && (this.touchEndNode.active = true);
    for (var t = 0; t < this.pickPutInfo.length; t++) {
      var o = this.pickPutInfo[t];
      for (var i = 0; i < o.pickPutNodeInfo.length; i++) {
        o.pickPutNodeInfo[i].pickNode.active = true;
        o.pickPutNodeInfo[i].putNode.active = false;
      }
    }
  };
  _ctor.prototype.hitTest = function () {
    return !(this.canTouchKey.length > 0) || r_CheckHasKeys.checkHasKeys(this.canTouchKey);
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
    this.checkPick();
    this.checkPut();
  };
  _ctor.prototype._OnDragEnd = function (t) {
    e.prototype._OnDragEnd.call(this, t);
    this.resetPos();
    this.checkPickFinish();
  };
  _ctor.prototype.resetPos = function () {
    e.prototype.resetPos.call(this);
    this.curPickingNode && (this.curPickingNode.active = true);
    this.touchStartNode && (this.touchStartNode.active = false);
    this.touchEndNode && (this.touchEndNode.active = true);
    this.pickingSprite.spriteFrame = null;
    this.curPickingNode = null;
    this.pickIndex = this.pickNodeIndex = -1;
  };
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
    this.pickingSprite.node.scaleX = 1;
    this.pickingSprite.node.scaleY = 1;
    this.touchStartNode && (this.touchStartNode.active = true);
    this.touchEndNode && (this.touchEndNode.active = false);
  };
  _ctor.prototype.checkPick = function () {
    if (-1 == this.pickIndex) {
      for (var e = 0; e < this.pickPutInfo.length; e++) {
        var t = this.pickPutInfo[e];
        for (var o = 0; o < t.pickPutNodeInfo.length; o++) {
          var i = t.pickPutNodeInfo[o];
          if (i.pickNode.active && this.nodeOverOtherNode(this.pickPoint, i.pickNode)) {
            if (!r_CheckHasKeys.checkHasKeys(this.hasKey)) {
              this.resetPos();
              return void r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
            }
            "" != this.pickSound && r_SoundMgr.SoundMgr.playSound(this.pickSound);
            this.pickIndex = e;
            this.pickNodeIndex = o;
            this.pickingSprite.spriteFrame = i.pickNode.getComponent(cc.Sprite).spriteFrame;
            this.curPickingNode = i.pickNode;
            i.pickNode.active = false;
            r_TriggerActionMgr.TriggerActionMgr.trigger(t.pickActionId);
            break;
          }
        }
      }
    }
  };
  _ctor.prototype.checkPut = function () {
    var e = this;
    if (-1 != this.pickIndex && this.nodeOverOtherNode(this.pickPoint, this.pickPutInfo[this.pickIndex].targetNode)) {
      var t = this.pickPutInfo[this.pickIndex].pickPutNodeInfo;
      var o = function (o) {
        var n = t[o].putNode;
        if (o == i.pickNodeIndex) {
          "" != i.putSound && r_SoundMgr.SoundMgr.playSound(i.putSound);
          r_TriggerActionMgr.TriggerActionMgr.trigger(i.pickPutInfo[i.pickIndex].putActionId);
          cc.tween(i.pickingSprite.node).to(.3, {
            scaleX: 0,
            scaleY: 0
          }).call(function () {
            n.active = true;
            e.pickingSprite.node.scaleX = 1;
            e.pickingSprite.node.scaleY = 1;
            e.pickingSprite.spriteFrame = null;
          }).start();
          i.curPickingNode = null;
          i.pickIndex = i.pickNodeIndex = -1;
        }
      };
      var i = this;
      for (var n = 0; n < t.length; n++) {
        o(n);
      }
    }
  };
  _ctor.prototype.checkPickFinish = function () {
    var e = true;
    for (var t = 0; t < this.pickPutInfo.length; t++) {
      var o = this.pickPutInfo[t];
      for (var i = 0; i < o.pickPutNodeInfo.length; i++) {
        o.pickPutNodeInfo[i].pickNode.active && (e = false);
      }
    }
    if (e) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
      "" != this.successSaveKey && r_GameKeyMgr.GameKeyMgr.add(this.successSaveKey);
      "" != this.successDeleteKey && r_GameKeyMgr.GameKeyMgr.remove(this.successDeleteKey);
      this.showSuccessAnim && r_GamingUI.GamingUI.Inst.showStepTip(true);
    }
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
    cc.Tween.stopAllByTarget(this.pickingSprite.node);
  };
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
    type: [g],
    displayName: "拾取和放置信息"
  })], _ctor.prototype, "pickPutInfo", undefined);
  __decorate([_property({
    type: r_CheckHasKeys.GameKeyInfo,
    displayName: "有这些key时才可以拖动"
  })], _ctor.prototype, "canTouchKey", undefined);
  __decorate([_property({
    displayName: "拾取的音效"
  })], _ctor.prototype, "pickSound", undefined);
  __decorate([_property({
    displayName: "放置的音效"
  })], _ctor.prototype, "putSound", undefined);
  __decorate([_property({
    displayName: "成功后存储的key"
  })], _ctor.prototype, "successSaveKey", undefined);
  __decorate([_property({
    displayName: "成功后删除的key"
  })], _ctor.prototype, "successDeleteKey", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拾取图片到指定位置")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.PickPut = exp_PickPut;