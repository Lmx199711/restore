var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_DragScaleCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.maxScale = 4;
    t.minScale = 1;
    t.touchNode = null;
    t.maskTouchNode = null;
    t.isScale = true;
    t.moveDistance = 0;
    t.beginDistance = 0;
    t.beginScale = 1;
    t.originWidth = 1668;
    t.originHeight = 1002;
    t.top = 0;
    t.bottom = 0;
    t.left = 0;
    t.right = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.originWidth = this.touchNode.width;
    this.originHeight = this.touchNode.height;
    this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.right = .5 * (this.originWidth - this.maskTouchNode.node.width);
    this.top = .5 * (this.originHeight - this.maskTouchNode.node.height);
    this.left = -this.right;
    this.bottom = -this.top;
  };
  _ctor.prototype.onTouchStart = function () {
    this.moveDistance = 0;
    this.beginDistance = 0;
    this.beginScale = this.touchNode.scale;
  };
  _ctor.prototype.onTouchMove = function (e) {
    var t = e.getTouches();
    if (1 == t.length) {
      this.moveDistance += e.getDelta().len();
      this.checkMapPosition(e.getDeltaX(), e.getDeltaY());
    } else if (2 == t.length && this.isScale) {
      var o = t[0].getLocation();
      var i = t[1].getLocation();
      var n = o.sub(i).len();
      this.beginDistance <= 0 && (this.beginDistance = n);
      var a = n / this.beginDistance * this.beginScale;
      var s = cc.misc.clampf(a, this.minScale, this.maxScale);
      this.checkFourLimit(s);
      this.checkMapPosition();
      this.touchNode.scale = s;
    }
  };
  _ctor.prototype.onMouseWheel = function (e) {
    var t = e.getScrollY() / 1200;
    var o = this.touchNode.scale += t;
    var i = cc.misc.clampf(o, this.minScale, this.maxScale);
    this.checkFourLimit(i);
    this.checkMapPosition();
    this.touchNode.scale = i;
  };
  _ctor.prototype.checkMapPosition = function (e, t) {
    undefined === e && (e = 0);
    undefined === t && (t = 0);
    var o = this.touchNode;
    o.x = cc.misc.clampf(o.x + e, this.left, this.right);
    o.y = cc.misc.clampf(o.y + t, this.bottom, this.top);
  };
  _ctor.prototype.checkFourLimit = function (e) {
    e || (e = this.touchNode.scale);
    var t = this.maskTouchNode.node.width;
    var o = this.maskTouchNode.node.height;
    var i = this.originWidth * e;
    var n = this.originHeight * e;
    this.top = (n - o) / 2;
    this.bottom = -this.top;
    this.right = (i - t) / 2;
    this.left = -this.right;
  };
  __decorate([_property({
    displayName: "缩放最大值",
    tooltip: "最大值和最小值相同时,表示无法缩放"
  })], _ctor.prototype, "maxScale", undefined);
  __decorate([_property({
    displayName: "缩放最小值",
    tooltip: "最大值和最小值相同时,表示无法缩放"
  })], _ctor.prototype, "minScale", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    type: cc.Mask,
    displayName: "显示区域mask"
  })], _ctor.prototype, "maskTouchNode", undefined);
  __decorate([_property({
    displayName: "是否缩放"
  })], _ctor.prototype, "isScale", undefined);
  return __decorate([_ccclass("拖拽和缩放节点")], _ctor);
}(cc.Component);
exports.default = def_DragScaleCom;