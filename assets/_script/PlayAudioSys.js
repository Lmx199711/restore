Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayAudioSys = undefined;
var r_SoundMgr = require("SoundMgr");
var r_PlayAudioCom = require("PlayAudioCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_PlayAudioSys = function () {
  function _ctor() {
    this.audioId = -1;
  }
  _ctor.prototype.trigger = function (e) {
    var t = this;
    if ("" != this.entity.soundName) {
      var o = this.entity.soundName;
      e && (o = e);
      r_SoundMgr.SoundMgr.playSound(o, this.entity.isLoop, function (e) {
        t.audioId = e;
      });
    }
  };
  _ctor.prototype.onStart = function () {
    this.audioId = -1;
  };
  _ctor.prototype.onDestroy = function () {
    if (-1 != this.audioId) {
      cc.audioEngine.stop(this.audioId);
      this.audioId = -1;
    }
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_PlayAudioCom.PlayAudioCom)], _ctor);
}();
exports.PlayAudioSys = exp_PlayAudioSys;