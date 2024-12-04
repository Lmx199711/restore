var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameWinAction = undefined;
var r_GameEvent = require("GameEvent");
var r_ActionBase = require("ActionBase");
var r_Index = require("Index");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_GameWinAction = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    r_Index.App.inst.dispatchEventWith(r_GameEvent.default.WinGame);
  };
  return __decorate([_ccclass("GameWinAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.GameWinAction = exp_GameWinAction;