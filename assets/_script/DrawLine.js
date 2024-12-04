var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_DrawLine = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.lineWidth = 50;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.initGraphics(this.graphics);
  };
  _ctor.prototype.initMask = function (e) {
    var t = e._graphics;
    this.initGraphics(t);
  };
  _ctor.prototype.initGraphics = function (e) {
    e.lineWidth = this.lineWidth;
    e.lineCap = cc.Graphics.LineCap.ROUND;
    e.strokeColor = cc.Color.BLACK;
    e.fillColor = cc.Color.BLACK;
  };
  _ctor.prototype.drawCircle = function (e, t, o) {
    e.circle(t.x, t.y, o);
    e.fill();
  };
  _ctor.prototype.drawLine = function (e, t, o) {
    e.moveTo(o.x, o.y);
    e.lineTo(t.x, t.y);
    e.stroke();
  };
  _ctor.prototype.onTouchStart = function (e) {
    var t = e.getLocation();
    var o = this.mask.node.convertToNodeSpaceAR(t);
    this.lastPoint = o;
    this.drawCircle(this.graphics, this.lastPoint, .5 * this.lineWidth);
  };
  _ctor.prototype.onTouchMove = function (e) {
    var t = e.getLocation();
    var o = this.mask.node.convertToNodeSpaceAR(t);
    this.drawLine(this.graphics, this.lastPoint, o);
    this.lastPoint = o;
  };
  _ctor.prototype.onTouchEnd = function () {};
  __decorate([_property({
    type: cc.Graphics
  })], _ctor.prototype, "graphics", undefined);
  __decorate([_property({
    type: cc.Mask
  })], _ctor.prototype, "mask", undefined);
  __decorate([_property()], _ctor.prototype, "lineWidth", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_DrawLine;