Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchDisabledSys = undefined;
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TouchDisabledCom = require("TouchDisabledCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_TouchDisabledSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    var t = this.entity.disabled;
    e && !isNaN(parseInt(e)) && (t = parseInt(e) > 0);
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.touchDisabled = t;
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_TouchDisabledCom.TouchDisabledCom)], _ctor);
}();
exports.TouchDisabledSys = exp_TouchDisabledSys;