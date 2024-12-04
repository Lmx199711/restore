var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToTargetAndFall = exports.FallInfo = undefined;
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
var exp_FallInfo = function () {
  function _ctor() {
    this.target = null;
    this.startFallAction = "";
    this.flag = true;
    this.autoFail = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "掉落的节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "开始掉落时的action"
  })], _ctor.prototype, "startFallAction", undefined);
  __decorate([_property({
    displayName: "是否需要检测掉落"
  })], _ctor.prototype, "flag", undefined);
  __decorate([_property({
    displayName: "默认掉落，不需要action掉落"
  })], _ctor.prototype, "autoFail", undefined);
  return __decorate([_ccclass("FallInfo")], _ctor);
}();
exports.FallInfo = exp_FallInfo;
var exp_MoveToTargetAndFall = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.fallNodes = [];
    t.checkNode = null;
    t.successSaveKey = "";
    t.successDeleteKey = "";
    t.showSuccessAnim = false;
    t.continueSoundName = "";
    t.fallSoundName = "";
    t.progress = 0;
    t.fallCount = 0;
    t.isGameOver = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    this.progress = 0;
    this.fallCount = 0;
    this.ownerPolygon = this.node.getComponent(cc.PolygonCollider);
    null == this.checkNode && (this.checkNode = this.node);
  };
  _ctor.prototype.onDragStart = function (t) {
    this.upNode && (this.upNode.active = true);
    this.downNode && (this.downNode.active = false);
    this.node.zIndex = 10;
    e.prototype.onDragStart.call(this, t);
    this.isGameOver = false;
    "" != this.continueSoundName && r_SoundMgr.SoundMgr.playSound(this.continueSoundName, true);
  };
  _ctor.prototype.onDragMove = function (t) {
    this.isGameOver || e.prototype.onDragMove.call(this, t);
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
    var o = function (e) {
      var t = i.fallNodes[e];
      if (t.flag && i.nodeOverOtherNode(i.checkNode, t.target)) {
        if (r_CheckHasKeys.checkHasKeys(i.hasKey)) {
          t.flag = false;
          i.fallCount++;
          i.progress = i.fallCount / i.fallNodes.length;
          if (t.autoFail) {
            cc.tween(t.target).by(.5, {
              y: -1002
            }, {
              easing: cc.easing.smooth
            }).call(function () {
              t.target.active = false;
            }).start();
          } else {
            r_TriggerActionMgr.TriggerActionMgr.trigger(t.startFallAction);
          }
          "" != i.fallSoundName && r_SoundMgr.SoundMgr.playSound(i.fallSoundName);
        } else {
          r_TriggerActionMgr.TriggerActionMgr.trigger(i.failTriggerActionId);
          i.isGameOver = true;
          i.resetPos();
        }
      }
    };
    var i = this;
    for (var n = 0; n < this.fallNodes.length; n++) {
      o(n);
    }
  };
  _ctor.prototype._OnDragEnd = function (t) {
    this.upNode && (this.upNode.active = false);
    this.downNode && (this.downNode.active = true);
    this.node.zIndex = 0;
    "" != this.continueSoundName && r_SoundMgr.SoundMgr.stopSound(this.continueSoundName);
    e.prototype._OnDragEnd.call(this, t);
    this.resetPos();
    if (this.progress >= 1) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
      "" != this.successSaveKey && r_GameKeyMgr.GameKeyMgr.add(this.successSaveKey);
      "" != this.successDeleteKey && r_GameKeyMgr.GameKeyMgr.remove(this.successDeleteKey);
      this.showSuccessAnim && r_GamingUI.GamingUI.Inst.showStepTip(true);
    }
  };
  __decorate([_property({
    type: [exp_FallInfo],
    displayName: "所有掉落的节点"
  })], _ctor.prototype, "fallNodes", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "检测点"
  })], _ctor.prototype, "checkNode", undefined);
  __decorate([_property({
    displayName: "成功后存储的key"
  })], _ctor.prototype, "successSaveKey", undefined);
  __decorate([_property({
    displayName: "成功后删除的key"
  })], _ctor.prototype, "successDeleteKey", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  __decorate([_property({
    displayName: "抬起持续音效"
  })], _ctor.prototype, "continueSoundName", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "抬起节点"
  })], _ctor.prototype, "upNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "放下节点"
  })], _ctor.prototype, "downNode", undefined);
  __decorate([_property({
    displayName: "掉落音效"
  })], _ctor.prototype, "fallSoundName", undefined);
  return __decorate([_ccclass, _menu("Action/事件/移动时碰到节点掉落")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.MoveToTargetAndFall = exp_MoveToTargetAndFall;