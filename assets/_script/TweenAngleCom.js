var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenAngleCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var u = function () {
  function e() {
    this.target = null;
    this.originAngleNum = 0;
    this.targetAngleNum = 0;
    this.duration = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "需要旋转的节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "初始旋转角度"
  })], e.prototype, "originAngleNum", undefined);
  __decorate([_property({
    displayName: "目标旋转角度"
  })], e.prototype, "targetAngleNum", undefined);
  __decorate([_property({
    displayName: "持续时间"
  })], e.prototype, "duration", undefined);
  return __decorate([_ccclass("TweenNodeAngleInfo")], e);
}();
var exp_TweenAngleCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodes = [];
    t.easeWay = "smooth";
    t.easeWayInfo = "";
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: u,
    displayName: "要设置旋转的节点"
  })], _ctor.prototype, "nodes", undefined);
  __decorate([_property({
    displayName: "缓动方式",
    tooltip: "back bounce circ cubic elastic expo fade quad quart quint sine smooth"
  })], _ctor.prototype, "easeWay", undefined);
  __decorate([_property({
    displayName: "缓动出入设置In/Out/InOut",
    tooltip: "In,Out,InOut"
  })], _ctor.prototype, "easeWayInfo", undefined);
  return __decorate([_ccclass("TweenAngleCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.TweenAngleCom = exp_TweenAngleCom;