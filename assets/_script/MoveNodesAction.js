var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveNodesAction = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var u = function () {
  function e() {
    this.target = null;
    this.originPosNode = null;
    this.targetPosNode = null;
    this.duration = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "移动的节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "初始位置的节点"
  })], e.prototype, "originPosNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "目标位置的节点"
  })], e.prototype, "targetPosNode", undefined);
  __decorate([_property({
    displayName: "持续时间"
  })], e.prototype, "duration", undefined);
  return __decorate([_ccclass("MoveNodeInfo")], e);
}();
var exp_MoveNodesAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.targetNodes = [];
    t.tempPos = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    for (var t = 0; t < this.targetNodes.length; t++) {
      var o = this.targetNodes[t];
      if (null == o.originPosNode) {
        return void console.error("没有设置初始节点：", this.actionId);
      }
      if (0 == o.duration) {
        o.targetPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.tempPos);
        o.target.parent.convertToNodeSpaceAR(this.tempPos, this.tempPos);
        o.target.setPosition(this.tempPos);
      } else {
        o.originPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.tempPos);
        o.target.parent.convertToNodeSpaceAR(this.tempPos, this.tempPos);
        o.target.setPosition(this.tempPos);
        o.targetPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.tempPos);
        o.target.parent.convertToNodeSpaceAR(this.tempPos, this.tempPos);
        cc.tween(o.target).to(o.duration, {
          x: this.tempPos.x,
          y: this.tempPos.y
        }, {
          easing: cc.easing.smooth
        }).start();
      }
    }
  };
  _ctor.prototype.destroy = function () {
    e.prototype.destroy.call(this);
    for (var t = 0; t < this.targetNodes.length; t++) {
      cc.Tween.stopAllByTarget(this.targetNodes[t].target);
    }
  };
  _ctor.prototype.onStop = function () {
    for (var e = 0; e < this.targetNodes.length; e++) {
      cc.Tween.stopAllByTarget(this.targetNodes[e].target);
    }
  };
  __decorate([_property({
    type: [u],
    displayName: "需要移动的节点"
  })], _ctor.prototype, "targetNodes", undefined);
  return __decorate([_ccclass("MoveNodesAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.MoveNodesAction = exp_MoveNodesAction;