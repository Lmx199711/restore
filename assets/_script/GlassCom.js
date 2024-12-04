var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UtilsSystem = require("UtilsSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_GlassCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.maskList = [];
    t.polyList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {};
  _ctor.prototype.init = function () {
    if (!this.touchArea) {
      this.touchArea = new cc.Node("touchArea");
      this.node.parent.addChild(this.touchArea);
      this.touchArea.width = 2e3;
      this.touchArea.height = 2e3;
    }
  };
  _ctor.prototype.onEnable = function () {
    this.init();
    this.registTouch();
  };
  _ctor.prototype.unregistTouch = function () {
    this.touchArea.off(cc.Node.EventType.TOUCH_START);
    this.touchArea.off(cc.Node.EventType.TOUCH_MOVE);
    this.touchArea.off(cc.Node.EventType.TOUCH_END);
    this.touchArea.off(cc.Node.EventType.TOUCH_CANCEL);
  };
  _ctor.prototype.clearMask = function () {
    for (var e = 0; e < this.maskList.length; e++) {
      this.maskList[e]._graphics.clear();
    }
  };
  _ctor.prototype.showGlassArea = function () {
    for (var e = 0; e < this.maskList.length; e++) {
      var t = this.maskList[e];
      var o = t._graphics;
      o.lineWidth = 1;
      o.strokeColor = cc.color(255, 0, 0);
      o.fillColor = cc.color(0, 255, 0);
      o.clear();
      for (var i = 0; i < this.polyList.length; i++) {
        var n = this.polyList[i];
        var a = n.points;
        for (var s = 0; s < a.length; s++) {
          var r = a[s];
          var c = n.node.convertToWorldSpaceAR(r);
          var l = t.node.convertToNodeSpaceAR(c);
          if (0 == s) {
            o.moveTo(l.x, l.y);
          } else if (s == a.length - 1) {
            o.lineTo(l.x, l.y);
            o.close();
            o.stroke();
            o.fill();
          } else {
            o.lineTo(l.x, l.y);
          }
        }
      }
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.unregistTouch();
    var t = null;
    var o = null;
    var i = null;
    this.touchArea.on(cc.Node.EventType.TOUCH_START, function (o) {
      t = o.getLocation();
      i = null;
      if (e.node.activeInHierarchy && r_UtilsSystem.UtilsSystem.touchInNode(e.node, t)) {
        (i = e.node).startX = i.x;
        i.startY = i.y;
      }
    }, this);
    this.touchArea.on(cc.Node.EventType.TOUCH_MOVE, function (n) {
      o = n.getLocation();
      if (i) {
        i.x = i.startX + o.x - t.x;
        i.y = i.startY + o.y - t.y;
        return void e.showGlassArea();
      }
    }, this);
    this.touchArea.on(cc.Node.EventType.TOUCH_END, function () {
      i = null;
    }, this);
    this.touchArea.on(cc.Node.EventType.TOUCH_CANCEL, function () {
      i = null;
    }, this);
    this.touchArea._touchListener.setSwallowTouches(false);
  };
  __decorate([_property({
    type: [cc.Mask],
    displayName: "遮罩列表"
  })], _ctor.prototype, "maskList", undefined);
  __decorate([_property({
    type: [cc.PolygonCollider],
    displayName: "镜框碰撞"
  })], _ctor.prototype, "polyList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_GlassCom;