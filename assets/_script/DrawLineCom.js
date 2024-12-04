var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UtilsSystem = require("UtilsSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var def_DrawLineCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchArea = null;
    t.graphic = null;
    t.canTouch = false;
    t.isCallDraw = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.graphic.clear();
    this.canTouch = true;
    this.isCallDraw = false;
  };
  _ctor.prototype.onEnable = function () {
    this.registTouch();
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.touchArea.off(cc.Node.EventType.TOUCH_START);
    this.touchArea.off(cc.Node.EventType.TOUCH_MOVE);
    this.touchArea.off(cc.Node.EventType.TOUCH_END);
    this.touchArea.off(cc.Node.EventType.TOUCH_CANCEL);
    var t = null;
    var o = null;
    var i = null;
    var n = null;
    this.touchArea.on(cc.Node.EventType.TOUCH_START, function (o) {
      if (e.canTouch) {
        t = o.getLocation();
        if (r_UtilsSystem.UtilsSystem.touchInNode(e.touchArea, t)) {
          t = e.graphic.node.convertToNodeSpaceAR(t);
          e.graphic.moveTo(t.x, t.y);
          i = t;
        }
      }
    });
    this.touchArea.on(cc.Node.EventType.TOUCH_MOVE, function (a) {
      o = a.getLocation();
      if (r_UtilsSystem.UtilsSystem.touchInNode(e.touchArea, o)) {
        if (i) {
          o = e.graphic.node.convertToNodeSpaceAR(o);
          e.graphic.lineTo(o.x, o.y);
          e.graphic.stroke();
          if (!e.isCallDraw && e.drawEndCallBack && cc.Vec2.distance(o, t) > 200) {
            e.isCallDraw = true;
            e.drawEndCallBack();
          }
          n = o;
        } else {
          t = a.getLocation();
          t = e.graphic.node.convertToNodeSpaceAR(t);
          e.graphic.moveTo(t.x, t.y);
          i = t;
        }
      } else {
        i = null;
        if (n) {
          e.graphic.moveTo(n.x, n.y);
          n = null;
        }
      }
    });
    this.touchArea.on(cc.Node.EventType.TOUCH_END, function () {
      i = null;
    });
    this.touchArea.on(cc.Node.EventType.TOUCH_CANCEL, function () {
      i = null;
    });
    setTimeout(function () {
      e.touchArea._touchListener.setSwallowTouches(false);
    }, 2);
  };
  _ctor.prototype.breathAnim = function (e) {
    cc.tween(e).to(.2, {
      scale: 1.2
    }).to(.2, {
      scale: 1
    }).to(.2, {
      scale: 1.2
    }).to(.2, {
      scale: 1
    }).call(function () {}).start();
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "点击节点"
  })], _ctor.prototype, "touchArea", undefined);
  __decorate([_property({
    type: cc.Graphics,
    displayName: "点击节点"
  })], _ctor.prototype, "graphic", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_DrawLineCom;