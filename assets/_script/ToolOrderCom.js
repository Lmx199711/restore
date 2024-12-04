var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolOrderCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var u = function () {
  function e() {
    this.time = 0;
    this.actions = Array();
  }
  __decorate([_property({
    displayName: "第n个工具出现时"
  })], e.prototype, "time", undefined);
  __decorate([_property([String])], e.prototype, "actions", undefined);
  return __decorate([_ccclass("toolOrderInfo")], e);
}();
var exp_ToolOrderCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.centerPos = null;
    t.moveTime = 1;
    t.moveWay = "sineIn";
    t.toolNodes = [];
    t.toolOrderInfos = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: cc.Node,
    displayName: "中心位置"
  })], _ctor.prototype, "centerPos", undefined);
  __decorate([_property({
    displayName: "移动时间"
  })], _ctor.prototype, "moveTime", undefined);
  __decorate([_property({
    displayName: "指定缓动(默认sineIn)"
  })], _ctor.prototype, "moveWay", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "工具顺序",
    tooltip: ""
  })], _ctor.prototype, "toolNodes", undefined);
  __decorate([_property({
    type: u,
    displayName: "指定工具触发的行为"
  })], _ctor.prototype, "toolOrderInfos", undefined);
  return __decorate([_ccclass("ToolOrderCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.ToolOrderCom = exp_ToolOrderCom;