var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetNodesShowAndMove = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var u = function () {
  function e() {
    this.target = null;
    this.isShow = false;
    this.delay = 0;
    this.originIsShow = true;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "显示"
  })], e.prototype, "isShow", undefined);
  __decorate([_property({
    displayName: "延时显示或者隐藏"
  })], e.prototype, "delay", undefined);
  __decorate([_property({
    displayName: "初始是否显示"
  })], e.prototype, "originIsShow", undefined);
  return __decorate([_ccclass("SetNodeShowNodeInfo1")], e);
}();
var h = function () {
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
  return __decorate([_ccclass("MoveNodeInfo1")], e);
}();
var exp_SetNodesShowAndMove = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodes = [];
    t.targetNodes = [];
    t.tempPos = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    var t = this;
    e.prototype.onTrigger.call(this);
    this.nodes.forEach(function (e) {
      if (e.target) {
        if (e.delay > 0) {
          var o = setTimeout(function () {
            e.target && (e.target.active = e.isShow);
          }, 1e3 * e.delay);
          t.timeoutIndex.push(o);
        } else {
          e.target.active = e.isShow;
        }
      }
    });
    for (var o = 0; o < this.targetNodes.length; o++) {
      var i = this.targetNodes[o];
      if (null == i.originPosNode) {
        return void console.error("没有设置初始节点：", this.actionId);
      }
      if (0 == i.duration) {
        i.targetPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.tempPos);
        i.target.parent.convertToNodeSpaceAR(this.tempPos, this.tempPos);
        i.target.setPosition(this.tempPos);
      } else {
        i.originPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.tempPos);
        i.target.parent.convertToNodeSpaceAR(this.tempPos, this.tempPos);
        i.target.setPosition(this.tempPos);
        i.targetPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.tempPos);
        i.target.parent.convertToNodeSpaceAR(this.tempPos, this.tempPos);
        cc.tween(i.target).to(i.duration, {
          x: this.tempPos.x,
          y: this.tempPos.y
        }, {
          easing: cc.easing.smooth
        }).start();
      }
    }
  };
  _ctor.prototype.start = function () {
    this.nodes.forEach(function (e) {
      e.target && (e.target.active = e.originIsShow);
      e.target.name;
    });
  };
  _ctor.prototype.destroy = function () {
    e.prototype.destroy.call(this);
    for (var t = 0; t < this.targetNodes.length; t++) {
      cc.Tween.stopAllByTarget(this.targetNodes[t].target);
    }
  };
  __decorate([_property({
    type: [u],
    displayName: "所有要显示或者隐藏的节点信息",
    tooltip: "所有要显示或者隐藏的节点信息"
  })], _ctor.prototype, "nodes", undefined);
  __decorate([_property({
    type: [h],
    displayName: "需要移动的节点"
  })], _ctor.prototype, "targetNodes", undefined);
  return __decorate([_ccclass("SetNodesShowAndMove")], _ctor);
}(r_ActionBase.ActionBase);
exports.SetNodesShowAndMove = exp_SetNodesShowAndMove;