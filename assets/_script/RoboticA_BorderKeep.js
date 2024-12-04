var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoboticA_BorderKeep = undefined;
var r_RoboticCom = require("RoboticCom");
var r_TheRobotic = require("TheRobotic");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var p = _decorator.requireComponent;
var exp_RoboticA_BorderKeep = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.limitN = null;
    t.isUseLimitWindow = false;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "窗口节点",
    tooltip: "带有size的mask节点",
    type: cc.Node
  })], _ctor.prototype, "limitN", undefined);
  __decorate([_property({
    displayName: "是否使用窗口作为移动节点"
  })], _ctor.prototype, "isUseLimitWindow", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/02区域内移动_边缘附着1"), p(r_RoboticCom.RoboticCom)], _ctor);
}(r_TheRobotic.TheRobotic);
exports.RoboticA_BorderKeep = exp_RoboticA_BorderKeep;