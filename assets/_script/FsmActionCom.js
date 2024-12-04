var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FsmActionCom = exports.FsmActionInfo = undefined;
var r_EventComBase = require("EventComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_FsmActionInfo = function () {
  function _ctor() {
    this.key = "";
    this.actionId = "";
  }
  __decorate([_property({
    displayName: "Key"
  })], _ctor.prototype, "key", undefined);
  __decorate([_property({
    displayName: "Action"
  })], _ctor.prototype, "actionId", undefined);
  return __decorate([_ccclass("FsmActionInfo")], _ctor);
}();
exports.FsmActionInfo = exp_FsmActionInfo;
var exp_FsmActionCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.ids = "";
    t.fsmInfo = Array();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "状态切换时事件ID",
    tooltip: "用逗号隔开每个id"
  })], _ctor.prototype, "ids", undefined);
  __decorate([_property(exp_FsmActionInfo)], _ctor.prototype, "fsmInfo", undefined);
  return __decorate([_ccclass, _menu("新系统/状态机/事件")], _ctor);
}(r_EventComBase.EventComBase);
exports.FsmActionCom = exp_FsmActionCom;