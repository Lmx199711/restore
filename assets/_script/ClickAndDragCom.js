var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_ClickAndDragCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.clickTriggerId = "";
    t.DragTriggerId = "";
    t.checkNode = null;
    t.isDrag = false;
    t.initPos = cc.v2(0, 0);
    t.touchStartPos = cc.v2(0, 0);
    t.touchMovePos = cc.v2(0, 0);
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.initPos = this.node.getPosition();
    this.node.on(cc.Node.EventType.TOUCH_START, this.touchNodeStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchNodeMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchNodeEnd, this);
  };
  _ctor.prototype.touchNodeStart = function (e) {
    this.touchStartPos = e.getLocation();
  };
  _ctor.prototype.touchNodeMove = function (e) {
    this.touchMovePos = e.getLocation();
    Math.abs(this.touchStartPos.sub(this.touchMovePos).mag()) > 20 && (this.isDrag = true);
    if (this.isDrag) {
      var t = this.node.parent.convertToNodeSpaceAR(this.touchMovePos);
      this.node.setPosition(t);
    }
  };
  _ctor.prototype.touchNodeEnd = function () {
    if (this.isDrag) {
      console.log("...........检测到移动");
      var e = this.checkNode.getBoundingBox();
      var t = this.checkNode.parent.convertToNodeSpaceAR(this.touchMovePos);
      if (e.contains(t)) {
        this.node.active = false;
        r_BehaviorMgr.BehaviorMgr.trigger(this.DragTriggerId);
      } else {
        this.node.setPosition(this.initPos);
      }
    } else {
      r_BehaviorMgr.BehaviorMgr.trigger(this.clickTriggerId);
    }
  };
  __decorate([_property({
    displayName: "点击事件名"
  })], _ctor.prototype, "clickTriggerId", undefined);
  __decorate([_property({
    displayName: "拖动事件名"
  })], _ctor.prototype, "DragTriggerId", undefined);
  __decorate([_property({
    displayName: "检测节点",
    type: cc.Node
  })], _ctor.prototype, "checkNode", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ClickAndDragCom;