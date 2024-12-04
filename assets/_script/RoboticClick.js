var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoboticClick = undefined;
var r_RoboticCom = require("RoboticCom");
var r_TheRobotic = require("TheRobotic");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var p = _decorator.requireComponent;
var exp_RoboticClick = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.coolTime = 500;
    t.isAutoHide = false;
    t.isHideNode = false;
    t.isMultiClick = false;
    t.clickNum = 2;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "点击冷却-毫秒"
  })], _ctor.prototype, "coolTime", undefined);
  __decorate([_property({
    displayName: "触发后禁用点击"
  })], _ctor.prototype, "isAutoHide", undefined);
  __decorate([_property({
    displayName: "触发后隐藏节点"
  })], _ctor.prototype, "isHideNode", undefined);
  __decorate([_property({
    displayName: "多次点击"
  })], _ctor.prototype, "isMultiClick", undefined);
  __decorate([_property({
    displayName: "点击次数",
    visible: function () {
      return this.isMultiClick;
    }
  })], _ctor.prototype, "clickNum", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/03纯点击"), p(r_RoboticCom.RoboticCom)], _ctor);
}(r_TheRobotic.TheRobotic);
exports.RoboticClick = exp_RoboticClick;