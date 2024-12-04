var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayAudioCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_PlayAudioCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.soundName = "";
    t.isLoop = false;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "播放的音效名称"
  })], _ctor.prototype, "soundName", undefined);
  __decorate([_property({
    displayName: "是否循环播放"
  })], _ctor.prototype, "isLoop", undefined);
  return __decorate([_ccclass("PlayAudioCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.PlayAudioCom = exp_PlayAudioCom;