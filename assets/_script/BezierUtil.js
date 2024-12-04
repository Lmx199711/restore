Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BezierUtil = undefined;
var exp_BezierUtil = function () {
  function _ctor() {}
  _ctor.getCubicBezierPoint = function (e, t, o) {
    var i = (1 - (t = this.clamp01(t))) * (1 - t) * (1 - t);
    var n = (1 - t) * (1 - t) * t;
    var a = 3 * (1 - t) * t * t;
    var s = t * t * t;
    var r = i * e[0] + n * e[2] + a * e[4] + s * e[6];
    var c = i * e[1] + n * e[3] + a * e[5] * s * e[7];
    if (o) {
      o[0] = r;
      o[1] = c;
    }
    return [r, c];
  };
  _ctor.getCubicBezierFirstDerivative = function (e, t, o) {
    var i = e[0];
    var n = e[1];
    var a = e[2];
    var s = e[3];
    var r = e[4];
    var c = e[5];
    var l = e[6];
    var u = e[7];
    var h = 3 * (1 - (t = this.clamp01(t))) * (1 - t);
    var p = (a - i) * h;
    var d = (s - n) * h;
    p += (r - a) * (h = 6 * (1 - t) * t);
    d += (c - s) * h;
    p += (l - r) * (h = 3 * t * t);
    d += (u - c) * h;
    if (!o) {
      return [p, d];
    }
    o[0] = p;
    o[1] = d;
  };
  _ctor.getCubicBezierNormal = function (e, t, o) {
    t = this.clamp01(t);
    var i = this.getCubicBezierFirstDerivative(e, t);
    var n = i[0];
    var a = i[1];
    var s = Math.sqrt(n * n + a * a);
    var r = -a / s;
    var c = n / s;
    if (!o) {
      return [r, c];
    }
    o[0] = r;
    o[1] = c;
  };
  _ctor.getQuadraticBezierPoint = function (e, t, o) {
    var i = (1 - (t = this.clamp01(t))) * (1 - t);
    var n = 2 * (1 - t) * t;
    var a = t * t;
    var s = i * e[0] + n * e[2] + a * e[4];
    var r = i * e[1] + n * e[3] + a * e[5];
    if (o) {
      o[0] = s;
      o[1] = r;
    }
    return [s, r];
  };
  _ctor.getQuadraticBezierFirstDerivative = function (e, t, o) {
    var i = 2 * ((t = this.clamp01(t)) - 1);
    var n = 2 * (1 - 2 * t);
    var a = 2 * t;
    var s = i * e[0] + n * e[2] + a * e[4];
    var r = i * e[1] + n * e[3] + a * e[5];
    if (o) {
      o[0] = s;
      o[1] = r;
    }
    return [s, r];
  };
  _ctor.getQuadraticBezierNormal = function (e, t, o) {
    t = this.clamp01(t);
    var i = this.getQuadraticBezierFirstDerivative(e, t);
    var n = i[0];
    var a = i[1];
    var s = Math.sqrt(n * n + a * a);
    var r = -a / s;
    var c = n / s;
    if (o) {
      o[0] = r;
      o[1] = c;
    }
    return [r, c];
  };
  _ctor.getBezierPos = function (e, t) {
    undefined === t && (t = 20);
    var o = [];
    if (!e) {
      console.warn("点有误");
      return o;
    }
    var i = e.length;
    var n = i / 2;
    if (n < 2) {
      cc.warn("点的数量不能小于2");
      return o;
    }
    var a = this.getYangHuiTriangle(n);
    for (var s = 0; s < t; s++) {
      var r = s / t;
      var c = 0;
      var l = 0;
      for (var u = 0; u < i - 1; u += 2) {
        var h = Math.floor(u / 2);
        var p = Math.pow(1 - r, n - h - 1);
        var d = Math.pow(r, h) * a[h];
        c += p * e[u] * d;
        l += p * e[u + 1] * d;
      }
      o.push(c, l);
    }
    return o;
  };
  _ctor.getYangHuiTriangle = function (e) {
    var t = [];
    if (1 === e) {
      t[0] = 1;
    } else {
      t[0] = t[1] = 1;
      for (var o = 3; o <= e; o++) {
        var i = [];
        for (var n = 0; n < o - 1; n++) {
          i[n] = t[n];
        }
        t[0] = t[o - 1] = 1;
        for (n = 0; n < o - 2; n++) {
          t[n + 1] = i[n] + i[n + 1];
        }
      }
    }
    return t;
  };
  _ctor.clamp01 = function (e) {
    if (e < 0) {
      return 0;
    } else if (e > 1) {
      return 1;
    } else {
      return e;
    }
  };
  return _ctor;
}();
exports.BezierUtil = exp_BezierUtil;