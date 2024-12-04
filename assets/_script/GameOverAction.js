var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameOverAction = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var r_Index = require("Index");
var r_GameEvent = require("GameEvent");
var exp_GameOverAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.failCount = 1;
    t.isRestart = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    this.failCount--;
    if (this.failCount < 0) {
      if (this.isRestart) {
        r_Index.App.inst.dispatchEventWith(r_GameEvent.default.RestartGame);
      } else {
        r_Index.App.inst.dispatchEventWith(r_GameEvent.default.LoseGame);
      }
    }
  };
  __decorate([_property({
    displayName: "容错次数"
  })], _ctor.prototype, "failCount", undefined);
  __decorate([_property({
    displayName: "是否重启"
  })], _ctor.prototype, "isRestart", undefined);
  return __decorate([_ccclass("GameOverAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.GameOverAction = exp_GameOverAction;