var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeshDraw = undefined;
var r_BezierUtil = require("BezierUtil");
var _property = cc._decorator.property;
var _ccclass = cc._decorator.ccclass;
var r_GraphicSprite = require("GraphicSprite");
var exp_MeshDraw = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.graphicSprite = null;
    t._worldPos = cc.v2();
    t.tempVec2 = cc.v2();
    t.pool = [];
    t.path = [];
    t.samplePath = [];
    t.bezierPath = [];
    t.curves = [];
    t.normals = [];
    t.convertTemp = [];
    t.ctrlPoint = cc.v2();
    t.lastPoint = cc.v2();
    t.minDis = 30;
    t.precision = 10;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "worldPos", {
    get: function () {
      this.node.convertToWorldSpaceAR(cc.Vec2.ZERO, this._worldPos);
      return this._worldPos;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onLoad = function () {
    this.test();
  };
  _ctor.prototype.test = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    var t = e.getLocation();
    this.addPathPoint(this.worldPos);
    this.addPathPoint(t);
  };
  _ctor.prototype.onTouchMove = function (e) {
    var t = e.getLocation();
    this.addPathPoint(t);
    this.draw();
  };
  _ctor.prototype.onTouchEnd = function (e) {
    this.addPathPoint(e.getLocation());
    this.draw();
    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
  };
  _ctor.prototype.addPathPoint = function (e) {
    var t = this.getVec2();
    t.set(e);
    this.path.push(t);
  };
  _ctor.prototype.vectorNormal = function (e) {
    var t = e.x;
    var o = e.y;
    e.x = -o;
    e.y = t;
    var i = this.getVec2();
    e.normalize(i);
    return i;
  };
  _ctor.prototype.getVec2 = function () {
    var e = [];
    for (var t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }
    var o = this.pool.shift();
    o || (o = cc.v2());
    if (1 == e.length) {
      o.set(e[0]);
    } else {
      o.x = e[0] ? e[0] : 0;
      o.y = e[1] ? e[1] : 0;
    }
    return o;
  };
  _ctor.prototype.putVec2 = function () {
    var e = this;
    this.samplePath.length = 0;
    this.curves.forEach(function (t) {
      e.pool.push(t);
    });
    this.curves.length = 0;
    this.normals.forEach(function (t) {
      e.pool.push(t);
    });
    this.normals.length = 0;
    this.bezierPath.forEach(function (t) {
      e.pool.push(t);
    });
    this.bezierPath.length = 0;
  };
  _ctor.prototype.draw = function () {
    var e = this;
    this.putVec2();
    for (var t = 0; t < this.path.length; t++) {
      0 != t && t != this.path.length - 1 || this.samplePath.push(this.path[t]);
      for (var o = t + 1; o < this.path.length && !(o >= this.path.length - 1); o++) {
        var i = this.path[t];
        var n = this.path[o];
        if (cc.Vec2.distance(i, n) >= this.minDis) {
          this.samplePath.push(n);
          t = o;
        }
      }
    }
    var a = 1 / this.precision;
    if (!(this.samplePath.length < 2)) {
      if (2 == this.samplePath.length) {
        this.curves.push(this.getVec2(this.samplePath[0]));
        this.curves.push(this.getVec2(this.samplePath[1]));
        this.samplePath[1].sub(this.samplePath[0], this.tempVec2);
        this.normals.push(this.vectorNormal(this.tempVec2));
        this.normals.push(this.vectorNormal(this.tempVec2));
      } else {
        for (t = 0; t < this.samplePath.length;) {
          0 == t && this.lastPoint.set(this.samplePath[0]);
          var r = 0 == t ? t + 1 : t;
          var c = r + 1;
          if (!this.samplePath[c]) {
            this.curves.push(this.getVec2(this.samplePath[r]));
            this.samplePath[r].sub(this.lastPoint, this.tempVec2);
            this.normals.push(this.vectorNormal(this.tempVec2));
            break;
          }
          this.ctrlPoint.set(this.samplePath[r]);
          this.ctrlPoint.add(this.samplePath[c], this.tempVec2);
          this.tempVec2.mulSelf(.5);
          var l = 0;
          this.convertTemp.length = 0;
          for (this.convertTemp.push(this.lastPoint.x, this.lastPoint.y, this.ctrlPoint.x, this.ctrlPoint.y, this.tempVec2.x, this.tempVec2.y); l <= 1;) {
            var u = r_BezierUtil.BezierUtil.getQuadraticBezierPoint(this.convertTemp, l);
            var h = u[0];
            var p = u[1];
            this.curves.push(this.getVec2(h, p));
            var d = r_BezierUtil.BezierUtil.getQuadraticBezierNormal(this.convertTemp, l);
            var y = d[0];
            var f = d[1];
            this.normals.push(this.getVec2(y, f));
            l += a;
          }
          this.lastPoint.set(this.tempVec2);
          if (0 == t) {
            t += 2;
          } else {
            t++;
          }
        }
      }
      this.curves.forEach(function (t) {
        e.bezierPath.push(e.getVec2(t.x, t.y));
      });
      this.curves.forEach(function (t, o) {
        e.node.parent.convertToNodeSpaceAR(t, e.curves[o]);
      });
      this.graphicSprite.stroke(this.curves, this.normals);
    }
  };
  _ctor.prototype._hitTest = function (e) {
    this.node.convertToNodeSpaceAR(e, this.tempVec2);
    var t = this.node.getComponent(cc.PolygonCollider).points;
    return cc.Intersection.pointInPolygon(this.tempVec2, t);
  };
  __decorate([_property({
    displayName: "管道纹理",
    type: r_GraphicSprite.default
  })], _ctor.prototype, "graphicSprite", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.MeshDraw = exp_MeshDraw;