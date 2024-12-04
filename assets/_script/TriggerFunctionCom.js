var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerFunctionCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TriggerFunctionCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.events = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "事件",
    type: cc.Component.EventHandler
  })], _ctor.prototype, "events", undefined);
  return __decorate([_ccclass("TriggerFunctionCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.TriggerFunctionCom = exp_TriggerFunctionCom;