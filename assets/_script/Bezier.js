var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var c = _decorator.executeInEditMode;
var _property = _decorator.property;
var def_Bezier = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.p1Tracker = null;
    t.p2Tracker = null;
    t.random = false;
    t.debug = false;
    t.p1 = null;
    t.c1 = null;
    t.c2 = null;
    t.p2 = null;
    t.g = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.g = this.getComponent(cc.Graphics);
    this.p1 = this.node.getChildByName("p1");
    this.c1 = this.node.getChildByName("c1");
    this.c2 = this.node.getChildByName("c2");
    this.p2 = this.node.getChildByName("p2");
    this.p1.active = false;
    this.c1.active = false;
    this.c2.active = false;
    this.p2.active = false;
  };
  _ctor.prototype.startMove = function (e, t, o, i) {
    undefined === o && (o = null);
    undefined === i && (i = null);
    if (e) {
      var n = this.getBezierPoints(e);
      e.setPosition(n[0]);
      cc.tween(e).bezierTo(t, n[1], n[2], n[3]).call(function () {
        o && o.call(i, e);
      }).start();
    }
  };
  _ctor.prototype.getBezierPoints = function (e) {
    var t = this.convertToNodeSpace(e, this.p1);
    var o = this.convertToNodeSpace(e, this.c1);
    var i = this.convertToNodeSpace(e, this.c2);
    var n = this.convertToNodeSpace(e, this.p2);
    if (this.random) {
      var a = this.calcMirrorD(t, n, o);
      o = this.getRandomP(o, a);
      var s = this.calcMirrorD(t, n, i);
      i = this.getRandomP(i, s);
    }
    return [cc.v2(t.x, t.y), cc.v2(o.x, o.y), cc.v2(i.x, i.y), cc.v2(n.x, n.y)];
  };
  _ctor.prototype.updateTracker = function () {
    if (this.p1Tracker) {
      var e = this.convertToNodeSpace(this.p1, this.p1Tracker);
      this.p1.setPosition(e);
    }
    if (this.p2Tracker) {
      e = this.convertToNodeSpace(this.p2, this.p2Tracker);
      this.p2.setPosition(e);
    }
  };
  _ctor.prototype.update = function () {
    this.debug && this.draw();
  };
  _ctor.prototype.draw = function () {
    if (this.debug) {
      if (this.p1 && this.c1 && this.c2 && this.p2) {
        var e = this.p1.position;
        var t = this.c1.position;
        var o = this.c2.position;
        var i = this.p2.position;
        this.g.clear();
        this.g.moveTo(e.x, e.y);
        this.g.bezierCurveTo(t.x, t.y, o.x, o.y, i.x, i.y);
        this.g.stroke();
      } else {
        this.g.clear();
      }
    }
  };
  _ctor.prototype.convertToNodeSpace = function (e, t) {
    return e.parent.convertToNodeSpaceAR(t.parent.convertToWorldSpaceAR(t.position));
  };
  _ctor.prototype.calcMirrorD = function (e, t, o) {
    var i = t.sub(e);
    var n = o.sub(e);
    var a = i.normalize();
    var s = n.normalize();
    var r = a.dot(s);
    var c = n.len() * r;
    var l = i.normalize().mul(c);
    var u = e.add(l).sub(o).mul(2);
    return o.add(u);
  };
  _ctor.prototype.getRandomP = function (e, t) {
    var o = t.sub(e).mul(Math.random());
    return e.add(o);
  };
  __decorate([_property({
    type: cc.Node,
    tooltip: "起始点追踪器"
  })], _ctor.prototype, "p1Tracker", undefined);
  __decorate([_property({
    type: cc.Node,
    tooltip: "终止点追踪器"
  })], _ctor.prototype, "p2Tracker", undefined);
  __decorate([_property({
    tooltip: "是否随机"
  })], _ctor.prototype, "random", undefined);
  __decorate([_property({
    tooltip: "运行时显示Bezier曲线"
  })], _ctor.prototype, "debug", undefined);
  return __decorate([_ccclass, c], _ctor);
}(cc.Component);
exports.default = def_Bezier;