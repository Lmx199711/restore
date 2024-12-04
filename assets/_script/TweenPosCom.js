var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenPosCom = exports.TweenPosNodeInfo = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TweenPosNodeInfo = function () {
  function _ctor() {
    this.target = null;
    this.originPosNode = null;
    this.targetPosNode = null;
    this.duration = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "移动的节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "初始位置的节点"
  })], _ctor.prototype, "originPosNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "目标位置的节点"
  })], _ctor.prototype, "targetPosNode", undefined);
  __decorate([_property({
    displayName: "持续时间"
  })], _ctor.prototype, "duration", undefined);
  return __decorate([_ccclass("TweenPosNodeInfo")], _ctor);
}();
exports.TweenPosNodeInfo = exp_TweenPosNodeInfo;
var exp_TweenPosCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.targetNodes = [];
    t.easeWay = "smooth";
    t.easeWayInfo = "";
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: [exp_TweenPosNodeInfo],
    displayName: "需要移动的节点"
  })], _ctor.prototype, "targetNodes", undefined);
  __decorate([_property({
    displayName: "缓动方式",
    tooltip: "back bounce circ cubic elastic expo fade quad quart quint sine smooth"
  })], _ctor.prototype, "easeWay", undefined);
  __decorate([_property({
    displayName: "缓动出入设置 In/Out/InOut",
    tooltip: "In,Out,InOut"
  })], _ctor.prototype, "easeWayInfo", undefined);
  return __decorate([_ccclass("TweenPosCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.TweenPosCom = exp_TweenPosCom;