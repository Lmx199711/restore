var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShieldTouchTimeCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_ShieldTouchTimeCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.defaultShieldTime = 1.5;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "默认屏蔽用户操作时间"
  })], _ctor.prototype, "defaultShieldTime", undefined);
  return __decorate([_ccclass("ShieldTouchTimeCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.ShieldTouchTimeCom = exp_ShieldTouchTimeCom;