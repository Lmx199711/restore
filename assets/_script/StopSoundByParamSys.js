Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopSoundByParamSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_SoundMgr = require("SoundMgr");
var r_StopSoundByParamCom = require("StopSoundByParamCom");
var exp_StopSoundByParamSys = function () {
  function _ctor() {}
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.trigger = function (e) {
    if (e) {
      var t = e.split("|")[0];
      r_SoundMgr.SoundMgr.stopSound(t);
    } else {
      console.error("没有传入音效");
    }
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_StopSoundByParamCom.StopSoundByParamCom)], _ctor);
}();
exports.StopSoundByParamSys = exp_StopSoundByParamSys;