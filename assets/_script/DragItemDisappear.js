var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragItemDisappear = undefined;
var r_SoundMgr = require("SoundMgr");
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_DragItemDisappear = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.moveDis = 400;
    t.upSoundName = "";
    t.successSound = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
    "" != this.upSoundName && r_SoundMgr.SoundMgr.playSound(this.upSoundName);
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
  };
  _ctor.prototype._OnDragEnd = function (t) {
    e.prototype._OnDragEnd.call(this, t);
    var o = this.node.x - this.dragNodeOriginPosX;
    var i = this.node.y - this.dragNodeOriginPosY;
    if (o * o + i * i > this.moveDis * this.moveDis) {
      this.node.active = false;
      "" != this.successSound && r_SoundMgr.SoundMgr.playSound(this.successSound);
      this.trigger();
    }
    this.resetPos();
  };
  __decorate([_property({
    displayName: "拖动多远的距离消失"
  })], _ctor.prototype, "moveDis", undefined);
  __decorate([_property({
    displayName: "抬起音效"
  })], _ctor.prototype, "upSoundName", undefined);
  __decorate([_property({
    displayName: "成功音效"
  })], _ctor.prototype, "successSound", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拖动多远的距离消失")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.DragItemDisappear = exp_DragItemDisappear;