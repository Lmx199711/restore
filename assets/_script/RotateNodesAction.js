var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotateNodesAction = undefined;
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var h = function () {
  function e() {
    this.target = null;
    this.originAngle = 0;
    this.targetAngle = 0;
    this.completeActionId = "";
    this.duration = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "旋转的节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    type: cc.Integer,
    displayName: "初始的旋转"
  })], e.prototype, "originAngle", undefined);
  __decorate([_property({
    type: cc.Integer,
    displayName: "目标的旋转"
  })], e.prototype, "targetAngle", undefined);
  __decorate([_property({
    displayName: "旋转完后需要执行的action"
  })], e.prototype, "completeActionId", undefined);
  __decorate([_property({
    displayName: "持续时间"
  })], e.prototype, "duration", undefined);
  return __decorate([_ccclass("RotateNodeInfo")], e);
}();
var exp_RotateNodesAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.targetNodes = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    var t = function (e) {
      var t = o.targetNodes[e];
      if (0 == t.duration) {
        t.target.angle = t.targetAngle;
      } else {
        t.target.angle = t.originAngle;
        cc.tween(t.target).to(t.duration, {
          angle: t.targetAngle
        }).call(function () {
          r_TriggerActionMgr.TriggerActionMgr.trigger(t.completeActionId);
        }).start();
      }
    };
    var o = this;
    for (var i = 0; i < this.targetNodes.length; i++) {
      t(i);
    }
  };
  _ctor.prototype.destroy = function () {
    e.prototype.destroy.call(this);
    for (var t = 0; t < this.targetNodes.length; t++) {
      cc.Tween.stopAllByTarget(this.targetNodes[t].target);
    }
  };
  __decorate([_property({
    type: [h],
    displayName: "需要旋转的节点"
  })], _ctor.prototype, "targetNodes", undefined);
  return __decorate([_ccclass("RotateNodesAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.RotateNodesAction = exp_RotateNodesAction;