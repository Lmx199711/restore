var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopSoundCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_StopSoundCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.soundName = "";
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "停止播放的音效名称"
  })], _ctor.prototype, "soundName", undefined);
  return __decorate([_ccclass("StopSoundCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.StopSoundCom = exp_StopSoundCom;