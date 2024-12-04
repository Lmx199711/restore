Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopSoundSys = undefined;
var r_SoundMgr = require("SoundMgr");
var r_StopSoundCom = require("StopSoundCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_StopSoundSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    if (e) {
      r_SoundMgr.SoundMgr.stopSound(e);
    } else {
      "" != this.entity.soundName && r_SoundMgr.SoundMgr.stopSound(this.entity.soundName);
    }
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_StopSoundCom.StopSoundCom)], _ctor);
}();
exports.StopSoundSys = exp_StopSoundSys;