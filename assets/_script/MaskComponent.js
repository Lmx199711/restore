var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_MaskComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cr = 30;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    var e = this;
    this.node.on(cc.Node.EventType.TOUCH_START, function (t) {
      cc.log("touch start");
      var o = t.touch.getLocation();
      o = e.mask.node.convertToNodeSpaceAR(o);
      e._addCircle(o);
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
      var o = t.touch.getLocation();
      o = e.mask.node.convertToNodeSpaceAR(o);
      e._addCircle(o);
    }, this);
  };
  _ctor.prototype._addCircle = function (e) {
    var t = this.mask;
    t._graphics.lineWidth = 1;
    t._graphics.strokeColor = cc.color(255, 0, 0);
    t._graphics.fillColor = cc.color(0, 255, 0);
    t._graphics.rect(e.x, e.y, 100, 100);
    t._graphics.fill();
    t._graphics.stroke();
  };
  __decorate([_property({
    type: cc.Integer,
    tooltip: "涂抹圆的半径"
  })], _ctor.prototype, "cr", undefined);
  __decorate([_property({
    type: cc.Mask,
    tooltip: "mask"
  })], _ctor.prototype, "mask", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_MaskComponent;