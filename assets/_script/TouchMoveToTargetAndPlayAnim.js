var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchMoveToTargetAndPlayAnim = undefined;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_CheckHasKeys = require("CheckHasKeys");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_GamingUI = require("GamingUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_TouchMoveToTargetAndPlayAnim = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.successResetPos = false;
    t.successSaveKey = "";
    t.successDeleteKey = "";
    t.checkFailKey = [];
    t.checkWinKey = [];
    t.changeZOrder = false;
    t.downZOrder = 0;
    t.upZOrder = 10;
    t.animName = "";
    t.isLoop = false;
    t.animHideList = [];
    t.animShowList = [];
    t.animAfterHideList = [];
    t.animSoundName = "";
    t.showSuccessAnim = false;
    t.upSoundName = "";
    t.downSoundName = "";
    t.successSound = "";
    t.upAction = "";
    t.downAction = "";
    t.firstTouchAction = "";
    t._triggerFail = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.hitTest = function () {
    return r_CheckHasKeys.checkHasKeys(this.hasKey);
  };
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
    this.downNode && (this.downNode.active = false);
    this.upNode && (this.upNode.active = true);
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.upAction);
    this._triggerFail = false;
    this.changeZOrder && (this.node.zIndex = this.upZOrder);
    "" != this.upSoundName && r_SoundMgr.SoundMgr.playSound(this.upSoundName);
    if ("" != this.firstTouchAction) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.firstTouchAction);
      this.firstTouchAction = "";
    }
  };
  _ctor.prototype._OnDragEnd = function (t) {
    var o = this;
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.downAction);
    this.downNode && (this.downNode.active = true);
    this.upNode && (this.upNode.active = false);
    "" != this.downSoundName && r_SoundMgr.SoundMgr.playSound(this.downSoundName);
    this.changeZOrder && (this.node.zIndex = this.downZOrder);
    if (this._triggerFail) {
      this._triggerFail = false;
    } else {
      e.prototype._OnDragEnd.call(this, t);
      var i = t.getLocation();
      if (this.targetPolygon) {
        this.targetPolygon.node.convertToNodeSpaceAR(i, this._vec2_temp);
        if (cc.Intersection.pointInPolygon(this._vec2_temp, this.targetPolygon.points) && r_CheckHasKeys.checkHasKeys(this.checkWinKey)) {
          this.node.x = this.targetPolygon.node.x;
          this.node.y = this.targetPolygon.node.y;
          if (this.successResetPos) {
            this.node.x = this.dragNodeOriginPosX;
            this.node.y = this.dragNodeOriginPosY;
          }
          if (this.animNode) {
            this.node.active = false;
            this.animNode.active = true;
            for (var n = 0; n < this.animHideList.length; n++) {
              this.animHideList[n].active = false;
            }
            "" == this.animName && console.error("动画名为空，", this.node.name);
            var a = null;
            if (this.isLoop) {
              this.newParentNode && (this.animNode.parent = this.newParentNode);
              for (n = 0; n < this.animShowList.length; n++) {
                this.animShowList[n].active = true;
              }
              for (n = 0; n < this.animAfterHideList.length; n++) {
                this.animAfterHideList[n].active = false;
              }
              this.triggerSuccess();
              a = this.animNode.getComponent(sp.Skeleton).setAnimation(0, this.animName, true);
              this.animNode.getComponent(sp.Skeleton).timeScale = 1;
              this.animNode.getComponent(sp.Skeleton).paused = false;
            } else {
              a = this.animNode.getComponent(sp.Skeleton).setAnimation(0, this.animName, false);
              this.animNode.getComponent(sp.Skeleton).paused = false;
              this.animNode.getComponent(sp.Skeleton).timeScale = 1;
              this.animNode.getComponent(sp.Skeleton).setTrackCompleteListener(a, function () {
                o.node.active = true;
                if (o.newParentNode) {
                  o.animNode.parent = o.newParentNode;
                } else {
                  o.isLoop || (o.animNode.active = false);
                }
                for (var e = 0; e < o.animShowList.length; e++) {
                  o.animShowList[e].active = true;
                }
                for (e = 0; e < o.animAfterHideList.length; e++) {
                  o.animAfterHideList[e].active = false;
                }
                o.triggerSuccess();
              });
            }
            "" != this.animSoundName && r_SoundMgr.SoundMgr.playSound(this.animSoundName);
          } else {
            "" != this.successSound && r_SoundMgr.SoundMgr.playSound(this.successSound);
            for (n = 0; n < this.animHideList.length; n++) {
              this.animHideList[n].active = false;
            }
            for (n = 0; n < this.animShowList.length; n++) {
              this.animShowList[n].active = true;
            }
            this.triggerSuccess();
          }
        } else {
          this.node.x = this.dragNodeOriginPosX;
          this.node.y = this.dragNodeOriginPosY;
        }
      }
    }
  };
  _ctor.prototype.triggerSuccess = function () {
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
    "" != this.successSaveKey && r_GameKeyMgr.GameKeyMgr.add(this.successSaveKey);
    "" != this.successDeleteKey && r_GameKeyMgr.GameKeyMgr.remove(this.successDeleteKey);
    this.showSuccessAnim && r_GamingUI.GamingUI.Inst.showStepTip(true);
  };
  _ctor.prototype.onDragMove = function (e) {
    if (!(this._triggerFail || this.checkHasNotClickKey())) {
      e.getDeltaX();
      this.node.x += e.getDeltaX();
      this.node.y += e.getDeltaY();
      this._OnDragMove(e);
    }
  };
  _ctor.prototype._OnDragMove = function (t) {
    if (!this._triggerFail) {
      e.prototype._OnDragMove.call(this, t);
      var o = t.getLocation();
      if (this.targetPolygon && !r_CheckHasKeys.checkHasKeys(this.checkFailKey)) {
        this.targetPolygon.node.convertToNodeSpaceAR(o, this._vec2_temp);
        if (cc.Intersection.pointInPolygon(this._vec2_temp, this.targetPolygon.points)) {
          r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
          this.node.x = this.dragNodeOriginPosX;
          this.node.y = this.dragNodeOriginPosY;
          this._triggerFail = true;
        }
      }
    }
  };
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "拖动的目标区域"
  })], _ctor.prototype, "targetPolygon", undefined);
  __decorate([_property({
    displayName: "成功后是否重置位置"
  })], _ctor.prototype, "successResetPos", undefined);
  __decorate([_property({
    displayName: "成功后存储的key"
  })], _ctor.prototype, "successSaveKey", undefined);
  __decorate([_property({
    displayName: "成功后删除的key"
  })], _ctor.prototype, "successDeleteKey", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时,检测失败"
  })], _ctor.prototype, "checkFailKey", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时,检测成功"
  })], _ctor.prototype, "checkWinKey", undefined);
  __decorate([_property({
    displayName: "移动是否修改层级"
  })], _ctor.prototype, "changeZOrder", undefined);
  __decorate([_property({
    type: Number,
    displayName: "放下时层级"
  })], _ctor.prototype, "downZOrder", undefined);
  __decorate([_property({
    type: Number,
    displayName: "抬起时层级"
  })], _ctor.prototype, "upZOrder", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "动画节点"
  })], _ctor.prototype, "animNode", undefined);
  __decorate([_property({
    displayName: "动画名称"
  })], _ctor.prototype, "animName", undefined);
  __decorate([_property({
    displayName: "动画是否循环播放"
  })], _ctor.prototype, "isLoop", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "播放动画时隐藏的节点列表"
  })], _ctor.prototype, "animHideList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "播放动画后显示的节点列表"
  })], _ctor.prototype, "animShowList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "播放动画后隐藏的节点列表"
  })], _ctor.prototype, "animAfterHideList", undefined);
  __decorate([_property({
    displayName: "播放动画音效"
  })], _ctor.prototype, "animSoundName", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  __decorate([_property({
    displayName: "抬起音效"
  })], _ctor.prototype, "upSoundName", undefined);
  __decorate([_property({
    displayName: "放下音效"
  })], _ctor.prototype, "downSoundName", undefined);
  __decorate([_property({
    displayName: "成功音效"
  })], _ctor.prototype, "successSound", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "抬起节点"
  })], _ctor.prototype, "upNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "放下节点"
  })], _ctor.prototype, "downNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "播放动画后修改动画父节点"
  })], _ctor.prototype, "newParentNode", undefined);
  __decorate([_property({
    displayName: "抬起时action"
  })], _ctor.prototype, "upAction", undefined);
  __decorate([_property({
    displayName: "放下时action"
  })], _ctor.prototype, "downAction", undefined);
  __decorate([_property({
    displayName: "首次点击时action"
  })], _ctor.prototype, "firstTouchAction", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拖动物体移动到指定目标并播放动画")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.TouchMoveToTargetAndPlayAnim = exp_TouchMoveToTargetAndPlayAnim;