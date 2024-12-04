var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_Joystick = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.circleRadius = 200;
    t._bigCircleInitPos = new cc.Vec2(0, 0);
    t._touchID = 0;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onLoad = function () {
    this._bigCircleInitPos = new cc.Vec2(0, 0);
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.startTake = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
  };
  _ctor.prototype.stop = function () {
    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.node.convertToNodeSpaceAR(e.getLocation());
    this._touchID = e.getID();
    this.node.emit(_ref__ctor.START);
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this._touchID == e.getID()) {
      var t = e.getLocation();
      var i = e.getStartLocation();
      cc.Vec2.distance(t, i);
      var n = Math.atan2(t.y - i.y, t.x - i.x);
      this.circleRadius;
      this.node.emit(_ref__ctor.MOVE, 180 * n / Math.PI);
    }
  };
  _ctor.prototype.onTouchEnd = function (e) {
    this._touchID == e.getID() && this.node.emit(_ref__ctor.END);
  };
  _ctor.prototype.onTouchCancel = function (e) {
    this.onTouchEnd(e);
  };
  _ctor.START = "JoystickEvent_TouchStart";
  _ctor.MOVE = "JoystickEvent_TouchMove";
  _ctor.END = "JoystickEvent_TouchEnd";
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_Joystick;