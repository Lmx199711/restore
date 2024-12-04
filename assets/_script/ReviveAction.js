var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviveAction = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_ReviveAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isReviveAction = true;
    return t;
  }
  __extends(_ctor, e);
  return __decorate([_ccclass("ReviveAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.ReviveAction = exp_ReviveAction;