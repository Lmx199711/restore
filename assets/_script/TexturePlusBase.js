var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UtilsSystem = require("UtilsSystem");
var r_PolgonSprite = require("PolgonSprite");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_TexturePlusBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.centerPos = cc.v2();
    t.mPolygon = [];
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "needOutLine", {
    set: function (e) {
      this._needOutLine = e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "outLineWidth", {
    set: function (e) {
      this._outLineWidth = e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "gid", {
    get: function () {
      return this._gid;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "polygon", {
    get: function () {
      return this.mPolygon;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.setOutlineCfg = function (e, t) {
    this._needOutLine = e;
    this._outLineWidth = t;
  };
  _ctor.prototype.setInfo = function (e, t, o) {
    undefined === o && (o = null);
    var i = [];
    for (var n = 3; n < arguments.length; n++) {
      i[n - 3] = arguments[n];
    }
    this._gid = r_UtilsSystem.UtilsSystem.GID;
    this.rootNode = t;
    if (o) {
      this.mPolygon = o;
    } else {
      var a = -e.width / 2;
      var c = -e.height / 2;
      var l = e.height / 2;
      var u = e.width / 2;
      this.mPolygon = [cc.v2(a, c), cc.v2(u, c), cc.v2(u, l), cc.v2(a, l)];
    }
    this.getPolygonCenter(this.mPolygon, this.centerPos);
    this.node.width = e.width;
    this.node.height = e.height;
    this.buildShoadow(e, t);
    if (!this.polgonSprite) {
      var h = new cc.Node();
      l = h.addComponent(r_PolgonSprite.default);
      h.parent = this.node;
      l.texture = e;
      l.rootNode = t;
      this.polgonSprite = l;
    }
    this.polgonSprite.polygon = this.mPolygon;
  };
  _ctor.prototype.buildShoadow = function (e, t) {
    var o = this;
    if (this._needOutLine && !this.polgonShadowSprite) {
      var i = new cc.Node();
      var n = i.addComponent(r_PolgonSprite.default);
      i.parent = this.node;
      n.rootNode = t;
      n.texture = e;
      this.polgonShadowSprite = n;
      i.color = cc.color(0, 0, 0);
    }
    if (this.polgonShadowSprite) {
      this.polgonShadowSprite.texture = e;
      var a = [];
      this.mPolygon.forEach(function (e) {
        var t = cc.v2(e.x, e.y);
        cc.Vec2.subtract(t, t, o.centerPos);
        cc.Vec2.normalize(t, t);
        cc.Vec2.scaleAndAdd(t, e, t, o._outLineWidth);
        a.push(t);
      });
      this.polgonShadowSprite.polygon = a;
    }
  };
  _ctor.prototype.getPolygonCenter = function (e, t) {
    t || (t = cc.v2());
    var o = 0;
    var i = 0;
    for (var n = 0; n < e.length; n++) {
      o += e[n].x;
      i += e[n].y;
    }
    o /= e.length;
    i /= e.length;
    t.x = o;
    t.y = i;
    return t;
  };
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_TexturePlusBase;