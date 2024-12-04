var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopSoundByParamCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_StopSoundByParamCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.soundName = "";
    t.isLoop = false;
    return t;
  }
  __extends(_ctor, e);
  return __decorate([_ccclass("StopSoundByParamCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.StopSoundByParamCom = exp_StopSoundByParamCom;