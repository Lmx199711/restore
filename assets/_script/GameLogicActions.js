var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorMgr = require("BehaviorMgr");
var r_RelaxSystem = require("RelaxSystem");
var r_GameLogicBase = require("GameLogicBase");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_GameLogicActions = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.succAction = "";
    t.succDelay = 1;
    t.failAction = "";
    t.failDelay = 1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.succ = function (e) {
    this.succAction && r_BehaviorMgr.BehaviorMgr.trigger(this.succAction);
    this.scheduleOnce(function () {
      r_RelaxSystem.RelaxSystem.win(e);
    }, this.succDelay);
  };
  _ctor.prototype.fail = function (e) {
    this.failAction && r_BehaviorMgr.BehaviorMgr.trigger(this.failAction);
    this.scheduleOnce(function () {
      r_RelaxSystem.RelaxSystem.lose(e);
    }, this.failDelay);
  };
  _ctor.prototype.handleArg = function (e) {
    if (e) {
      if (1 == e.arg1) {
        this.succ(e.arg2);
      } else {
        this.fail(e.arg2);
      }
    }
  };
  _ctor.prototype.AcFun = function (e, t, o) {
    this.handleArg({
      arg1: o.split(",")[0],
      arg2: o.split(",")[1]
    });
  };
  __decorate([_property({
    displayName: "胜利执行action"
  })], _ctor.prototype, "succAction", undefined);
  __decorate([_property({
    displayName: "延迟几秒->胜利"
  })], _ctor.prototype, "succDelay", undefined);
  __decorate([_property({
    displayName: "失败执行action"
  })], _ctor.prototype, "failAction", undefined);
  __decorate([_property({
    displayName: "延迟几秒->失败"
  })], _ctor.prototype, "failDelay", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/大量行为/胜利失败/先执行action在结算")], _ctor);
}(r_GameLogicBase.default);
exports.default = def_GameLogicActions;