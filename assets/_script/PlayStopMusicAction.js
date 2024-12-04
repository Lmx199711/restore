var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayStopMusicAction = undefined;
var r_ActionBase = require("ActionBase");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_PlayStopMusicAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.musicName = "";
    t.isStop = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    if (this.isStop) {
      r_SoundMgr.SoundMgr.stopMusic();
    } else {
      "" != this.musicName && r_SoundMgr.SoundMgr.playMusic(this.musicName);
    }
  };
  _ctor.prototype.destroy = function () {
    e.prototype.destroy.call(this);
  };
  __decorate([_property({
    displayName: "音乐名称"
  })], _ctor.prototype, "musicName", undefined);
  __decorate([_property({
    displayName: "是否停止音乐"
  })], _ctor.prototype, "isStop", undefined);
  return __decorate([_ccclass("PlayStopMusicAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.PlayStopMusicAction = exp_PlayStopMusicAction;