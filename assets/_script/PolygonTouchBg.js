var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var _menu = _decorator.menu;
var def_PolygonTouchBg = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNodeList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {};
  _ctor.prototype.addPolygonNode = function (e) {
    this.touchNodeList.indexOf(e) > -1 || this.touchNodeList.push(e);
  };
  _ctor.prototype.onEnable = function () {
    this.registTouch();
  };
  _ctor.prototype.unregistTouch = function () {
    this.node.off(cc.Node.EventType.TOUCH_START);
    this.node.off(cc.Node.EventType.TOUCH_MOVE);
    this.node.off(cc.Node.EventType.TOUCH_END);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL);
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.unregistTouch();
    this.node.on(cc.Node.EventType.TOUCH_START, function (t) {
      for (var o = 0; o < e.touchNodeList.length; o++) {
        e.touchNodeList[o].touchBegin(t);
      }
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
      for (var o = 0; o < e.touchNodeList.length; o++) {
        e.touchNodeList[o].touchMove(t);
      }
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_END, function (t) {
      for (var o = 0; o < e.touchNodeList.length; o++) {
        e.touchNodeList[o].touchEnd(t);
      }
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (t) {
      for (var o = 0; o < e.touchNodeList.length; o++) {
        e.touchNodeList[o].touchEnd(t);
      }
    }, this);
  };
  _ctor.prototype.onDisable = function () {
    this.node.scale = 1;
  };
  return __decorate([_ccclass, _menu("公用/多边形按钮点击层")], _ctor);
}(cc.Component);
exports.default = def_PolygonTouchBg;