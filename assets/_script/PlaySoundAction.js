var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySoundAction = undefined;
var r_ActionBase = require("ActionBase");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_PlaySoundAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.soundName = "";
    t.isLoop = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    "" != this.soundName && r_SoundMgr.SoundMgr.playSound(this.soundName, this.isLoop);
  };
  _ctor.prototype.destroy = function () {
    e.prototype.destroy.call(this);
    "" != this.soundName && r_SoundMgr.SoundMgr.stopSound(this.soundName);
  };
  __decorate([_property({
    displayName: "播放的音效名称"
  })], _ctor.prototype, "soundName", undefined);
  __decorate([_property({
    displayName: "是否循环播放"
  })], _ctor.prototype, "isLoop", undefined);
  return __decorate([_ccclass("PlaySoundAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.PlaySoundAction = exp_PlaySoundAction;