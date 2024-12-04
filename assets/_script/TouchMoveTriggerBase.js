var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchMoveTriggerBase = undefined;
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_TouchTriggerBase = require("TouchTriggerBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TouchMoveTriggerBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.dragStartActionId = "";
    t.dragEndActionId = "";
    t.moveX = true;
    t.moveY = true;
    t.worldScale = new cc.Vec2(0, 0);
    t.dragNodeOriginPosX = 0;
    t.dragNodeOriginPosY = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onDragMove, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onDragMove, this);
  };
  _ctor.prototype.onDragStart = function (t) {
    if (!this.checkHasNotClickKey()) {
      e.prototype.onDragStart.call(this, t);
      this.dragNodeOriginPosX = this.node.x;
      this.dragNodeOriginPosY = this.node.y;
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.dragStartActionId);
    }
  };
  _ctor.prototype.onDragMove = function (e) {
    this.worldScale.x || this.node.getWorldScale(this.worldScale);
    if (!this.checkHasNotClickKey()) {
      var t = e.getDeltaX();
      var o = e.getDeltaY();
      this.worldScale.x && (t /= this.worldScale.x);
      this.worldScale.y && (o /= this.worldScale.y);
      this.moveX && (this.node.x += t);
      this.moveY && (this.node.y += o);
      this._OnDragMove(e);
    }
  };
  _ctor.prototype.onDragEnd = function (t) {
    if (!this.checkHasNotClickKey()) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.dragEndActionId);
      e.prototype.onDragEnd.call(this, t);
    }
  };
  _ctor.prototype.nodeOverOtherNode = function (e, t) {
    if (!e || !t) {
      return false;
    }
    var o = t.getComponent(cc.PolygonCollider);
    if (null == o) {
      console.error("没有添加 PolygonCollider 组件");
      return false;
    }
    var i = t.convertToNodeSpaceAR(e.convertToWorldSpaceAR(cc.Vec2.ZERO));
    return !!cc.Intersection.pointInPolygon(i, o.points);
  };
  _ctor.prototype._OnDragMove = function () {};
  _ctor.prototype.resetPos = function () {
    this.node.x = this.dragNodeOriginPosX;
    this.node.y = this.dragNodeOriginPosY;
  };
  __decorate([_property({
    displayName: "开始拖动时执行的action"
  })], _ctor.prototype, "dragStartActionId", undefined);
  __decorate([_property({
    displayName: "拖动结束的action"
  })], _ctor.prototype, "dragEndActionId", undefined);
  __decorate([_property({
    displayName: "拖动X轴"
  })], _ctor.prototype, "moveX", undefined);
  __decorate([_property({
    displayName: "拖动Y轴"
  })], _ctor.prototype, "moveY", undefined);
  return __decorate([_ccclass], _ctor);
}(r_TouchTriggerBase.default);
exports.TouchMoveTriggerBase = exp_TouchMoveTriggerBase;