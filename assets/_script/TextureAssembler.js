var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UtilsSystem = require("UtilsSystem");
var r_PolygonUtil = require("PolygonUtil");
var r = cc.gfx;
var c = new r.VertexFormat([{
  name: r.ATTR_POSITION,
  type: r.ATTR_TYPE_FLOAT32,
  num: 2
}, {
  name: r.ATTR_UV0,
  type: r.ATTR_TYPE_FLOAT32,
  num: 2
}, {
  name: r.ATTR_COLOR,
  type: r.ATTR_TYPE_UINT8,
  num: 4,
  normalize: true
}]);
var def_TextureAssembler = function (e) {
  function _ctor() {
    var t = e.call(this) || this;
    t.floatsPerVert = 5;
    t.verticesCount = 4;
    t.indicesCount = 6;
    t.uvOffset = 2;
    t.colorOffset = 4;
    t._renderData = null;
    t._renderData = new cc.RenderData();
    t._renderData.init(t);
    t.initData();
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "verticesFloats", {
    get: function () {
      return this.verticesCount * this.floatsPerVert;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.getVfmt = function () {
    return c;
  };
  _ctor.prototype.getBuffer = function () {
    return cc.renderer._handle.getBuffer("mesh", this.getVfmt());
  };
  _ctor.prototype.initData = function () {
    this._renderData.createQuadData(0, this.verticesFloats, this.indicesCount);
  };
  _ctor.prototype.resetData = function (e) {
    var t = e.polygon;
    if (!(!t || t.length < 3)) {
      this.verticesCount = t.length;
      this.indicesCount = this.verticesCount + 2 * (this.verticesCount - 3);
      this._renderData.clear();
      this.initData();
    }
  };
  _ctor.prototype.initQuadIndices = function (e, t) {
    for (var o = 0; o < t.length; o++) {
      e[o] = t[o];
    }
  };
  _ctor.prototype.updateColor = function (e, t) {
    var o = this._renderData.uintVDatas[0];
    if (o) {
      t = null != t ? t : e.node.color._val;
      var i = this.floatsPerVert;
      var n = this.colorOffset;
      var a = e.polygon;
      for (var s = 0; s < a.length; s++) {
        o[n + s * i] = t;
      }
    }
  };
  _ctor.prototype.updateUVs = function (e) {
    var t = this.uvOffset;
    var o = this.floatsPerVert;
    var i = this._renderData.vDatas[0];
    var n = e.polygon;
    for (var s = 0; s < n.length; s++) {
      var r = o * s + t;
      var c = 0;
      var l = 0;
      if (e._uvs) {
        c = e._uvs[s].x;
        l = e._uvs[s].y;
      } else {
        var u = n[s].x;
        var h = n[s].y;
        var p = e.rootNode.width;
        var d = e.rootNode.height;
        c = u = r_UtilsSystem.UtilsSystem.clamp(0, 1, (u + p / 2) / p);
        l = h = r_UtilsSystem.UtilsSystem.clamp(0, 1, 1 - (h + d / 2) / d);
      }
      i[r] = c;
      i[r + 1] = l;
    }
  };
  _ctor.prototype.updateWorldVertsWebGL = function (e) {
    var t = this._renderData.vDatas[0];
    var o = e.node._worldMatrix.m;
    var i = o[0];
    var n = o[1];
    var a = o[4];
    var s = o[5];
    var r = o[12];
    var c = o[13];
    var l = 1 === i && 0 === n && 0 === a && 1 === s;
    var u = this.floatsPerVert;
    if (l) {
      var h = e.polygon;
      for (var p = 0; p < h.length; p++) {
        t[p * u] = h[p].x + r;
        t[p * u + 1] = h[p].y + c;
      }
    } else {
      h = e.polygon;
      for (p = 0; p < h.length; p++) {
        t[p * u] = i * h[p].x + a * h[p].y + r;
        t[p * u + 1] = n * h[p].x + s * h[p].y + c;
      }
    }
  };
  _ctor.prototype.updateWorldVertsNative = function (e) {
    var t = this._renderData.vDatas[0];
    var o = this.floatsPerVert;
    var i = e.polygon;
    for (var n = 0; n < i.length; n++) {
      t[n * o] = i[n].x;
      t[n * o + 1] = i[n].y;
    }
  };
  _ctor.prototype.updateWorldVerts = function (e) {
    this.updateWorldVertsWebGL(e);
  };
  _ctor.prototype.updateVerts = function (e) {
    var t = r_PolygonUtil.PolygonUtil.splitePolygon(e.polygon);
    this.initQuadIndices(this._renderData.iDatas[0], t);
    this.updateWorldVerts(e);
  };
  _ctor.prototype.updateRenderData = function (e) {
    if (e._vertsDirty) {
      this.resetData(e);
      this.updateUVs(e);
      this.updateVerts(e);
      this.updateColor(e, null);
      e._vertsDirty = false;
    }
  };
  _ctor.prototype.fillBuffers = function (e, t) {
    t.worldMatDirty && this.updateWorldVerts(e);
    var o = this._renderData;
    var i = o.vDatas[0];
    var n = o.iDatas[0];
    var a = this.getBuffer();
    var s = a.request(this.verticesCount, this.indicesCount);
    var r = s.byteOffset >> 2;
    var c = a._vData;
    if (i.length + r > c.length) {
      c.set(i.subarray(0, c.length - r), r);
    } else {
      c.set(i, r);
    }
    var l = a._iData;
    var u = s.indiceOffset;
    var h = s.vertexOffset;
    var p = 0;
    for (var d = n.length; p < d; p++) {
      l[u++] = h + n[p];
    }
  };
  return _ctor;
}(cc.Assembler);
exports.default = def_TextureAssembler;