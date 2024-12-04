var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenXYCom = exports.TweenXYInfo = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var r = cc.Vec2;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TweenXYInfo = function () {
  function _ctor() {
    this.targetNode = null;
    this.originPos = new r();
    this.targetPos = new r();
    this.duration = 1;
    this.delay = 0;
    this.initPos = true;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "移动的节点"
  })], _ctor.prototype, "targetNode", undefined);
  __decorate([_property({
    displayName: "初始位置"
  })], _ctor.prototype, "originPos", undefined);
  __decorate([_property({
    displayName: "目标位置"
  })], _ctor.prototype, "targetPos", undefined);
  __decorate([_property({
    displayName: "持续时间"
  })], _ctor.prototype, "duration", undefined);
  __decorate([_property({
    displayName: "延迟时间"
  })], _ctor.prototype, "delay", undefined);
  __decorate([_property({
    displayName: "设置初始位置",
    tooltip: "开启后会在进入场景时,将节点的XY设置成初始位置的XY"
  })], _ctor.prototype, "initPos", undefined);
  return __decorate([_ccclass("TweenXYInfo")], _ctor);
}();
exports.TweenXYInfo = exp_TweenXYInfo;
var exp_TweenXYCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.positionInfo = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: [exp_TweenXYInfo],
    displayName: "需要移动的位置信息"
  })], _ctor.prototype, "positionInfo", undefined);
  return __decorate([_ccclass("TweenXYCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.TweenXYCom = exp_TweenXYCom;