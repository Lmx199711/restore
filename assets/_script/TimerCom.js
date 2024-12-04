var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TimerCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.events = "";
    t.time = "";
    t.keyTimer = "";
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "事件"
  })], _ctor.prototype, "events", undefined);
  __decorate([_property({
    displayName: "时间"
  })], _ctor.prototype, "time", undefined);
  __decorate([_property({
    displayName: "key"
  })], _ctor.prototype, "keyTimer", undefined);
  return __decorate([_ccclass("TimerCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.TimerCom = exp_TimerCom;