var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickPutOthers = undefined;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_GamingUI = require("GamingUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_PickPutOthers = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.headNode = null;
    t.pickAreaNode = null;
    t.pickSuccessNode = null;
    t.targetNodeList = [];
    t.showSuccessAnim = false;
    t.pickSoundName = "";
    t.putSoundName = "";
    t.isPickSuccess = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
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
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
  };
  _ctor.prototype.checkPick = function () {
    this.isPickSuccess || this.isFinish() || this.nodeOverOtherNode(this.headNode, this.pickAreaNode) && (this.isPickSuccess = true, this.pickSuccessNode.active = true, "" != this.pickSoundName && r_SoundMgr.SoundMgr.playSound(this.pickSoundName));
  };
  _ctor.prototype.checkPut = function () {
    if (this.isPickSuccess) {
      for (var e = 0; e < this.targetNodeList.length; e++) {
        var t = this.targetNodeList[e];
        if (!t.active && this.nodeOverOtherNode(this.headNode, t)) {
          "" != this.putSoundName && r_SoundMgr.SoundMgr.playSound(this.putSoundName);
          t.active = true;
          this.isPickSuccess = false;
          return void (this.pickSuccessNode.active = false);
        }
      }
    }
  };
  _ctor.prototype.isFinish = function () {
    for (var e = 0; e < this.targetNodeList.length; e++) {
      if (!this.targetNodeList[e].active) {
        return false;
      }
    }
    return true;
  };
  _ctor.prototype.checkPickFinish = function () {
    if (this.isFinish()) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
      this.showSuccessAnim && r_GamingUI.GamingUI.Inst.showStepTip(true);
    }
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "碰撞节点"
  })], _ctor.prototype, "headNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "拾取范围节点"
  })], _ctor.prototype, "pickAreaNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "拾取到后显示的节点"
  })], _ctor.prototype, "pickSuccessNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "拾取的点，用于检测是否触摸到了拾取目标"
  })], _ctor.prototype, "targetNodeList", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  __decorate([_property({
    displayName: "拾取音效"
  })], _ctor.prototype, "pickSoundName", undefined);
  __decorate([_property({
    displayName: "放下音效"
  })], _ctor.prototype, "putSoundName", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拾取图片到多个指定位置")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.PickPutOthers = exp_PickPutOthers;