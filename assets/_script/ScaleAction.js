var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaleAction = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var u = function () {
  function e() {
    this.target = null;
    this.originScale = new cc.Vec2(0, 0);
    this.targetScale = new cc.Vec2(1, 1);
    this.duration = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "缩放的节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "缩放的初始值"
  })], e.prototype, "originScale", undefined);
  __decorate([_property({
    displayName: "缩放的目标值"
  })], e.prototype, "targetScale", undefined);
  __decorate([_property({
    displayName: "缩放的时间"
  })], e.prototype, "duration", undefined);
  return __decorate([_ccclass("ScaleNodeInfo")], e);
}();
var exp_ScaleAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.scaleNode = [];
    t.isResetOnStart = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    e.prototype.start.call(this);
    for (var t = 0; t < this.scaleNode.length; t++) {
      if (this.scaleNode[t].target) {
        this.scaleNode[t].target.scaleX = this.scaleNode[t].originScale.x;
        this.scaleNode[t].target.scaleY = this.scaleNode[t].originScale.y;
      }
    }
  };
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    if (this.isResetOnStart) {
      for (var t = 0; t < this.scaleNode.length; t++) {
        if (this.scaleNode[t].target) {
          this.scaleNode[t].target.scaleX = this.scaleNode[t].originScale.x;
          this.scaleNode[t].target.scaleY = this.scaleNode[t].originScale.y;
        }
      }
    }
    for (t = 0; t < this.scaleNode.length; t++) {
      this.scaleNode[t].target && cc.tween(this.scaleNode[t].target).to(this.scaleNode[t].duration, {
        scaleX: this.scaleNode[t].targetScale.x,
        scaleY: this.scaleNode[t].targetScale.y
      }, {
        easing: cc.easing.smooth
      }).start();
    }
  };
  _ctor.prototype.destroy = function () {
    e.prototype.destroy.call(this);
    for (var t = 0; t < this.scaleNode.length; t++) {
      this.scaleNode[t].target && cc.Tween.stopAllByTarget(this.scaleNode[t].target);
    }
  };
  __decorate([_property({
    type: [u]
  })], _ctor.prototype, "scaleNode", undefined);
  __decorate([_property({
    displayName: "缩放前重置scale"
  })], _ctor.prototype, "isResetOnStart", undefined);
  return __decorate([_ccclass("ScaleAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.ScaleAction = exp_ScaleAction;