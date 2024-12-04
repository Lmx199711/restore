var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToTargetAndShakeFall = undefined;
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
var exp_MoveToTargetAndShakeFall = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.checkNode = null;
    t.successSaveKey = "";
    t.showSuccessAnim = false;
    t.continueSoundName = "";
    t.cleanDistance = 100;
    t.progress = 0;
    t.fallCount = 0;
    t.isGameOver = false;
    t.fallNodes = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    this.progress = 0;
    this.fallCount = 0;
    this.ownerPolygon = this.node.getComponent(cc.PolygonCollider);
    null == this.checkNode && (this.checkNode = this.node);
    for (var t = 0; t < this.fallRootNode.childrenCount; t++) {
      this.fallNodes.push(this.fallRootNode.children[t]);
    }
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
    var o = this.checkNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
    var i = function (e) {
      var t = n.fallNodes[e];
      var i = t.convertToWorldSpaceAR(cc.Vec2.ZERO);
      if (!t.isFall && Math.abs(o.x - i.x) <= n.cleanDistance && Math.abs(o.y - i.y) <= n.cleanDistance) {
        if (r_CheckHasKeys.checkHasKeys(n.hasKey)) {
          t.isFall = true;
          n.fallCount++;
          n.progress = n.fallCount / n.fallNodes.length;
          cc.tween(t).to(.1, {
            angle: 20
          }).to(.2, {
            angle: -20
          }).to(.1, {
            angle: 0
          }).by(.5, {
            y: -1002
          }, {
            easing: cc.easing.smooth
          }).call(function () {
            t.active = false;
          }).start();
        } else {
          r_TriggerActionMgr.TriggerActionMgr.trigger(n.failTriggerActionId);
          n.isGameOver = true;
          n.resetPos();
        }
      }
    };
    var n = this;
    for (var a = 0; a < this.fallNodes.length; a++) {
      i(a);
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
      if (this.showSuccessAnim) {
        this.showSuccessAnim = false;
        r_GamingUI.GamingUI.Inst.showStepTip(true);
      }
    }
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "掉落的根节点"
  })], _ctor.prototype, "fallRootNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "检测点"
  })], _ctor.prototype, "checkNode", undefined);
  __decorate([_property({
    displayName: "成功后存储的key"
  })], _ctor.prototype, "successSaveKey", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  __decorate([_property({
    displayName: "抬起持续音效"
  })], _ctor.prototype, "continueSoundName", undefined);
  __decorate([_property({
    displayName: "清理距离"
  })], _ctor.prototype, "cleanDistance", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "抬起节点"
  })], _ctor.prototype, "upNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "放下节点"
  })], _ctor.prototype, "downNode", undefined);
  return __decorate([_ccclass, _menu("Action/事件/移动时碰到节点晃动并掉落")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.MoveToTargetAndShakeFall = exp_MoveToTargetAndShakeFall;