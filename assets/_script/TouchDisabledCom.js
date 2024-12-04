var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchDisabledCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TouchDisabledCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.disabled = true;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "是否禁用点击"
  })], _ctor.prototype, "disabled", undefined);
  return __decorate([_ccclass("TouchDisabledCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.TouchDisabledCom = exp_TouchDisabledCom;