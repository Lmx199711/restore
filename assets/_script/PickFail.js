var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickFail = undefined;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var r_TimeSystem = require("TimeSystem");
var r_GameKeyMgr = require("GameKeyMgr");
var r_GamingUI = require("GamingUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_PickFail = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.pickHead = null;
    t.pickNode = null;
    t.fixX = -135;
    t.successSaveKey = "";
    t.pickSound = "";
    t.isPickSuccess = false;
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
  };
  _ctor.prototype.onDragMove = function (t) {
    this.isGameOver || e.prototype.onDragMove.call(this, t);
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
    this.checkPick();
  };
  _ctor.prototype._OnDragEnd = function (t) {
    e.prototype._OnDragEnd.call(this, t);
    this.curPickingNode && (this.curPickingNode.active = true);
    this.resetPos();
    this.checkPickFinish();
  };
  _ctor.prototype.resetPos = function () {
    e.prototype.resetPos.call(this);
    this.curPickingNode = null;
    this.pickNodeIndex = -1;
  };
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
    this.isGameOver = false;
  };
  _ctor.prototype.checkPick = function () {
    var e = this;
    if (!this.isPickSuccess && this.pickNode.active && this.nodeOverOtherNode(this.pickHead, this.pickNode)) {
      if (!r_CheckHasKeys.checkHasKeys(this.hasKey)) {
        this.isGameOver = true;
        r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
        return void this.resetPos();
      }
      "" != this.successSaveKey && r_GameKeyMgr.GameKeyMgr.add(this.successSaveKey);
      var t = this.pickNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var o = this.pickHead.convertToNodeSpaceAR(t);
      this.isPickSuccess = true;
      this.pickNode.parent = this.pickHead;
      this.pickNode.x = this.fixX;
      this.pickNode.y = o.y;
      "" != this.pickSound && r_SoundMgr.SoundMgr.playSound(this.pickSound);
      r_TimeSystem.TimeSystem.scheduleOnce("PickFail", .3, function () {
        t = e.pickNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
        e.pickNode.x = o.x;
        e.pickNode.y = o.y;
        cc.tween(e.pickNode).by(.5, {
          y: -1002
        }, {
          easing: cc.easing.smooth
        }).call(function () {
          e.pickNode.active = false;
        }).start();
      });
      console.log("localPos.x=", o.x);
    }
  };
  _ctor.prototype.checkPickFinish = function () {
    if (this.isPickSuccess && "" != this.successTriggerActionId) {
      this.successTriggerActionId = "";
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
      r_GamingUI.GamingUI.Inst.showStepTip(true);
    }
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "拾取的点，用于检测是否触摸到了拾取目标"
  })], _ctor.prototype, "pickHead", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "拾取节点"
  })], _ctor.prototype, "pickNode", undefined);
  __decorate([_property({
    displayName: "拾取后的X坐标"
  })], _ctor.prototype, "fixX", undefined);
  __decorate([_property({
    displayName: "成功后存储的key"
  })], _ctor.prototype, "successSaveKey", undefined);
  __decorate([_property({
    displayName: "拾取后的音效"
  })], _ctor.prototype, "pickSound", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拾取后掉落")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.PickFail = exp_PickFail;