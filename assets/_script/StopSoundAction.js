var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopSoundAction = undefined;
var r_ActionBase = require("ActionBase");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_StopSoundAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.soundName = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    "" != this.soundName && r_SoundMgr.SoundMgr.stopSound(this.soundName);
  };
  __decorate([_property({
    displayName: "停止播放的音效名称"
  })], _ctor.prototype, "soundName", undefined);
  return __decorate([_ccclass("StopSoundAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.StopSoundAction = exp_StopSoundAction;