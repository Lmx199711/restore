var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeSizeXYCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var u = function () {
  function e() {
    this.target = null;
    this.isUseOrigin = true;
    this.originSizeNum = new cc.Vec2(0, 0);
    this.targetSizeNum = new cc.Vec2(0, 0);
    this.duration = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "需要改变Size的节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "是否设置初始Size"
  })], e.prototype, "isUseOrigin", undefined);
  __decorate([_property({
    displayName: "初始Size"
  })], e.prototype, "originSizeNum", undefined);
  __decorate([_property({
    displayName: "目标Size"
  })], e.prototype, "targetSizeNum", undefined);
  __decorate([_property({
    displayName: "持续时间"
  })], e.prototype, "duration", undefined);
  return __decorate([_ccclass("TweenNodeSizeInfo")], e);
}();
var exp_ChangeSizeXYCom = function (e) {
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
    displayName: "要设置改变Size的节点"
  })], _ctor.prototype, "nodes", undefined);
  __decorate([_property({
    displayName: "缓动方式",
    tooltip: "back bounce circ cubic elastic expo fade quad quart quint sine smooth"
  })], _ctor.prototype, "easeWay", undefined);
  __decorate([_property({
    displayName: "缓动出入设置In/Out/InOut",
    tooltip: "In,Out,InOut"
  })], _ctor.prototype, "easeWayInfo", undefined);
  return __decorate([_ccclass("ChangeSizeXYCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.ChangeSizeXYCom = exp_ChangeSizeXYCom;