var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoboticA1 = exports.CHECK_LIMIT_TYPE = undefined;
var s;
var r_RoboticCom = require("RoboticCom");
var r_TheRobotic = require("TheRobotic");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = _decorator.requireComponent;
(function (e) {
  e[e["图形边缘"] = 0] = "图形边缘";
  e[e["轴心"] = 1] = "轴心";
  e[e["鼠标指针"] = 2] = "鼠标指针";
})(s = exports.CHECK_LIMIT_TYPE || (exports.CHECK_LIMIT_TYPE = {}));
var exp_RoboticA1 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.limitN = null;
    t.limitCheckType = s.图形边缘;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "范围节点",
    tooltip: "1碰撞盒 2Size",
    type: cc.Node
  })], _ctor.prototype, "limitN", undefined);
  __decorate([_property({
    displayName: "检测方式",
    type: cc.Enum(s)
  })], _ctor.prototype, "limitCheckType", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/01区域内移动1"), d(r_RoboticCom.RoboticCom)], _ctor);
}(r_TheRobotic.TheRobotic);
exports.RoboticA1 = exp_RoboticA1;