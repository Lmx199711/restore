var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var l = _decorator.requireComponent;
var def_GraphicSprite = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.spriteH = 30;
    t.vertices = {
      x: [],
      y: [],
      nu: [],
      nv: [],
      triangles: [],
      u: [],
      v: []
    };
    t.dir = cc.v2();
    t.leftTop = cc.v2();
    t.leftBottom = cc.v2();
    t.rightTop = cc.v2();
    t.rightBottom = cc.v2();
    t.tempVec2 = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.sprite = this.getComponent(cc.Sprite);
    this.sprite.spriteFrame.vertices = this.vertices;
  };
  _ctor.prototype.addVertices = function () {
    var e = this;
    var t = [];
    for (var o = 0; o < arguments.length; o++) {
      t[o] = arguments[o];
    }
    t.forEach(function (t) {
      e.vertices.x.push(t.x);
      e.vertices.y.push(t.y);
    });
  };
  _ctor.prototype.getTriangleOffset = function () {
    return this.vertices.x.length;
  };
  _ctor.prototype.stroke = function (e, t) {
    for (var o in this.vertices) this.vertices[o].length = 0;
    if (!(e.length < 2)) {
      var i = e[e.length - 1];
      var n = e[0];
      if (!(e.length > 2 && i.equals(n))) {
        var a = 0;
        var s = this.spriteH / 2;
        for (var r = 0; r < e.length - 1; r++) {
          var c = this.getTriangleOffset();
          var l = e[r];
          var u = e[r + 1];
          u.sub(l, this.dir);
          var h = this.dir.mag();
          var p = t[r];
          var d = t[r + 1];
          p.mul(s, this.tempVec2);
          l.add(this.tempVec2, this.leftTop);
          l.sub(this.tempVec2, this.leftBottom);
          d.mul(s, this.tempVec2);
          u.add(this.tempVec2, this.rightTop);
          u.sub(this.tempVec2, this.rightBottom);
          this.addVertices(this.leftBottom, this.leftTop, this.rightBottom, this.rightTop);
          this.vertices.nv.push(1, 0, 1, 0);
          var y = a / this.node.width;
          this.vertices.nu.push(y, y);
          y = (a += h) / this.node.width;
          this.vertices.nu.push(y, y);
          this.vertices.triangles.push(c + 0);
          this.vertices.triangles.push(c + 1);
          this.vertices.triangles.push(c + 2);
          this.vertices.triangles.push(c + 1);
          this.vertices.triangles.push(c + 2);
          this.vertices.triangles.push(c + 3);
        }
        this.sprite.setVertsDirty();
      }
    }
  };
  __decorate([_property({
    displayName: "宽度"
  })], _ctor.prototype, "spriteH", undefined);
  return __decorate([_ccclass, l(cc.Sprite)], _ctor);
}(cc.Component);
exports.default = def_GraphicSprite;