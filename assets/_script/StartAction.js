var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartAction = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_StartAction = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    this.trigger();
  };
  return __decorate([_ccclass("StartAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.StartAction = exp_StartAction;