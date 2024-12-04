var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlenderToolCom = undefined;
var r_ToolComBase = require("ToolComBase");
var r_OperationToolCom = require("OperationToolCom");
var r_ExecuteBehaviorInfoByKeys = require("ExecuteBehaviorInfoByKeys");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = _decorator.requireComponent;
var y = function () {
  function e() {
    this.obj = null;
    this.moveTime = 1;
    this.blendTime = 0;
    this.nextBehaviorInfo = [];
  }
  __decorate([_property({
    displayName: "操作节点",
    type: cc.Node
  })], e.prototype, "obj", undefined);
  __decorate([_property({
    displayName: "单位时间",
    tooltip: "一次移动的时间，小=快"
  })], e.prototype, "moveTime", undefined);
  __decorate([_property({
    displayName: "搅拌到第几次时执行行为"
  })], e.prototype, "blendTime", undefined);
  __decorate([_property({
    displayName: "执行信息",
    tooltip: "要执行的所有行为",
    type: r_ExecuteBehaviorInfoByKeys.ExecuteBehaviorInfoByKeys,
    visible: function () {
      return this.blendTime > 0;
    }
  })], e.prototype, "nextBehaviorInfo", undefined);
  return __decorate([_ccclass("BlenderNodeInfo")], e);
}();
var exp_BlenderToolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodeArr = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "被搅拌物",
    type: y,
    tooltip: "当在操作区域并保持移动时，会令被搅拌物按照子节点顺序移动"
  })], _ctor.prototype, "nodeArr", undefined);
  return __decorate([_ccclass, d(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/搅棍")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.BlenderToolCom = exp_BlenderToolCom;