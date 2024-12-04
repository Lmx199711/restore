Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameWinSys = undefined;
var r_GameWinCom = require("GameWinCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_RelaxSystem = require("RelaxSystem");
var exp_GameWinSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function () {
    console.log("游戏胜利");
    r_RelaxSystem.RelaxSystem.win();
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_GameWinCom.GameWinCom)], _ctor);
}();
exports.GameWinSys = exp_GameWinSys;