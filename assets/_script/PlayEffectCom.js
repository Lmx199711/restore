var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayEffectCom = undefined;
var r_EventComBase = require("EventComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_PlayEffectCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.deltaTime = 1;
    t.playTime = .5;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: cc.Float,
    displayName: "粒子特效播放间隔"
  })], _ctor.prototype, "deltaTime", undefined);
  __decorate([_property({
    type: cc.Float,
    displayName: "播放粒子特效时的时长"
  })], _ctor.prototype, "playTime", undefined);
  return __decorate([_ccclass, _menu("新系统/玩家操作/间隔性播放粒子特效")], _ctor);
}(r_EventComBase.EventComBase);
exports.PlayEffectCom = exp_PlayEffectCom;