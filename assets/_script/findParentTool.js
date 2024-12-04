var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UtilsSystem = require("UtilsSystem");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_findParentTool = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.mirror = null;
    t.mirrorTarget = null;
    t.canMove = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.mirror.off(cc.Node.EventType.TOUCH_START);
    this.mirror.off(cc.Node.EventType.TOUCH_MOVE);
    this.mirror.off(cc.Node.EventType.TOUCH_END);
    this.mirror.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.mirror.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.mirror.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.startPos = null;
    this.itemPos = null;
    if (this.canMove) {
      this.startPos = e.getLocation();
      this.itemPos = this.mirror.getPosition();
      this.startIndex = this.mirror.getSiblingIndex();
      this.mirror.setSiblingIndex(100);
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.canMove && this.startPos && this.itemPos) {
      var t = e.getLocation().sub(this.startPos);
      this.mirror.setPosition(this.itemPos.add(t));
    }
  };
  _ctor.prototype.onTouchEnd = function (e) {
    if (this.canMove) {
      this.mirror.setPosition(this.itemPos);
      this.mirror.setSiblingIndex(this.startIndex);
      if (r_UtilsSystem.UtilsSystem.touchInNode(this.mirrorTarget, e.getLocation())) {
        r_BehaviorMgr.BehaviorMgr.trigger("显示镜子");
        this.mirror.active = false;
        this.setCanMoveFalse();
      }
      console.log("onTouchEnd");
    }
  };
  _ctor.prototype.setCanMoveFalse = function () {
    this.canMove = false;
  };
  _ctor.prototype.setCanMoveTrue = function () {
    this.canMove = true;
  };
  __decorate([_property({
    displayName: "镜子",
    type: cc.Node
  })], _ctor.prototype, "mirror", undefined);
  __decorate([_property({
    displayName: "镜子拖动到的目标",
    type: cc.Node
  })], _ctor.prototype, "mirrorTarget", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_findParentTool;