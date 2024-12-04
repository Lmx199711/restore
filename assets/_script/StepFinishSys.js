Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepFinishSys = undefined;
var r_StepFinishCom = require("StepFinishCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_StepFinishSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function () {};
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_StepFinishCom.StepFinishCom)], _ctor);
}();
exports.StepFinishSys = exp_StepFinishSys;