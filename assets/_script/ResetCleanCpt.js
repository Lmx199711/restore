var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetCleanCpt = undefined;
var r_ActionBase = require("ActionBase");
var r_CleanComponent = require("CleanComponent");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_ResetCleanCpt = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    this.cpt && this.cpt.resetAll();
    e.prototype.trigger.call(this);
  };
  __decorate([_property({
    type: r_CleanComponent.default,
    displayName: "擦除组件"
  })], _ctor.prototype, "cpt", undefined);
  return __decorate([_ccclass("ResetCleanCpt")], _ctor);
}(r_ActionBase.ActionBase);
exports.ResetCleanCpt = exp_ResetCleanCpt;