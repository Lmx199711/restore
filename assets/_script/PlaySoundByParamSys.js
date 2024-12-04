Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySoundByParamSys = undefined;
var r_PlaySoundByParamCom = require("PlaySoundByParamCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_SoundMgr = require("SoundMgr");
var exp_PlaySoundByParamSys = function () {
  function _ctor() {
    this.audioIds = [];
  }
  _ctor.prototype.onDestroy = function () {
    this.audioIds.forEach(function (e) {
      return cc.audioEngine.stop(e);
    });
    this.audioIds.length = 0;
  };
  _ctor.prototype.onStart = function () {
    this.audioIds.length = 0;
  };
  _ctor.prototype.trigger = function (e) {
    var t = this;
    if (e) {
      var o = e.split("|");
      var i = o[0];
      var n = "1" == o[1];
      i && r_SoundMgr.SoundMgr.playSound(i, n, function (e) {
        t.audioIds.push(e);
      });
    } else {
      console.error("没有传入音效");
    }
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_PlaySoundByParamCom.PlaySoundByParamCom)], _ctor);
}();
exports.PlaySoundByParamSys = exp_PlaySoundByParamSys;