var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveAnimationAction = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_MoveAnimationAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.duration = 1;
    t.autoWorld = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    var t = 0;
    var o = 0;
    if (this.autoWorld) {
      var i = this.originPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var n = this.target.parent.convertToNodeSpaceAR(i);
      var a = this.targetPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var s = this.target.parent.convertToNodeSpaceAR(a);
      this.target.x = n.x;
      this.target.y = n.y;
      cc.tween(this.target).to(this.duration, {
        x: s.x,
        y: s.y
      }, {
        easing: cc.easing.smooth
      }).start();
    } else {
      if (this.targetPosNode) {
        t = this.targetPosNode.x;
        o = this.targetPosNode.y;
      }
      this.target.x = null != this.originPosNode ? this.originPosNode.x : this.target.x;
      this.target.y = null != this.originPosNode ? this.originPosNode.y : this.target.y;
      cc.tween(this.target).to(this.duration, {
        x: t,
        y: o
      }, {
        easing: cc.easing.smooth
      }).start();
    }
  };
  _ctor.prototype.destroy = function () {
    e.prototype.destroy.call(this);
    cc.Tween.stopAllByTarget(this.target);
  };
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
  __decorate([_property({
    displayName: "自动转换世界坐标"
  })], _ctor.prototype, "autoWorld", undefined);
  return __decorate([_ccclass("MoveAnimationAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.MoveAnimationAction = exp_MoveAnimationAction;