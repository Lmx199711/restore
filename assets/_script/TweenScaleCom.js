var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenScaleCom = exports.TweenScaleNodeInfo = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TweenScaleNodeInfo = function () {
  function _ctor() {
    this.target = null;
    this.originScale = cc.v2(1, 1);
    this.targetScale = new cc.Vec2(1, 1);
    this.duration = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "缩放的节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "缩放的初始值"
  })], _ctor.prototype, "originScale", undefined);
  __decorate([_property({
    displayName: "缩放的目标值"
  })], _ctor.prototype, "targetScale", undefined);
  __decorate([_property({
    displayName: "持续时间"
  })], _ctor.prototype, "duration", undefined);
  return __decorate([_ccclass("TweenScaleNodeInfo")], _ctor);
}();
exports.TweenScaleNodeInfo = exp_TweenScaleNodeInfo;
var exp_TweenScaleCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.targetNodes = [];
    t.easeWay = "smooth";
    t.easeWayInfo = "";
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: [exp_TweenScaleNodeInfo],
    displayName: "需要缩放的节点"
  })], _ctor.prototype, "targetNodes", undefined);
  __decorate([_property({
    displayName: "缓动方式",
    tooltip: "back bounce circ cubic elastic expo fade quad quart quint sine smooth"
  })], _ctor.prototype, "easeWay", undefined);
  __decorate([_property({
    displayName: "缓动出入设置In/Out/InOut",
    tooltip: "In,Out,InOut"
  })], _ctor.prototype, "easeWayInfo", undefined);
  return __decorate([_ccclass("TweenScaleCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.TweenScaleCom = exp_TweenScaleCom;