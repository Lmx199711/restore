var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoboticMultiClick = exports.MultiClickInfo = undefined;
var r_RoboticCom = require("RoboticCom");
var r_TheRobotic = require("TheRobotic");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var p = _decorator.requireComponent;
var exp_MultiClickInfo = function () {
  function _ctor() {
    this.clickTime = 2;
    this.coolTime = 1e3;
    this.action = "";
  }
  __decorate([_property({
    displayName: "连点次数",
    range: [2, 99, 1]
  })], _ctor.prototype, "clickTime", undefined);
  __decorate([_property({
    displayName: "重置时间",
    tooltip: "到时间后重置次连击的点击计数"
  })], _ctor.prototype, "coolTime", undefined);
  __decorate([_property({
    displayName: "执行"
  })], _ctor.prototype, "action", undefined);
  return __decorate([_ccclass("MultiClickInfo")], _ctor);
}();
exports.MultiClickInfo = exp_MultiClickInfo;
var exp_RoboticMultiClick = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.DESC = "连点机制就像街霸连击数。结束连击的时候去执行连击数对应的事件(从后往前找)";
    t.multiInfo = new Array();
    t.comboTime = .5;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "描述",
    readonly: true
  })], _ctor.prototype, "DESC", undefined);
  __decorate([_property([exp_MultiClickInfo])], _ctor.prototype, "multiInfo", undefined);
  __decorate([_property({
    displayName: "combo时间"
  })], _ctor.prototype, "comboTime", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/03计次点击"), p(r_RoboticCom.RoboticCom)], _ctor);
}(r_TheRobotic.TheRobotic);
exports.RoboticMultiClick = exp_RoboticMultiClick;