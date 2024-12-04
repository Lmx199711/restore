Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolygonUtil = undefined;
var r_earcut = require("earcut");
var r_UtilsSystem = require("UtilsSystem");
var exp_PolygonUtil = function () {
  function _ctor() {}
  _ctor.splitePolygon = function (e) {
    var t = r_UtilsSystem.UtilsSystem.formatVertexArr(e);
    return r_earcut.earcut(t);
  };
  _ctor.computeUv = function (e, t, o) {
    var i = [];
    var a = 0;
    for (var s = e; a < s.length; a++) {
      var r = s[a];
      var c = r.x;
      var l = r.y;
      c = r_UtilsSystem.UtilsSystem.clamp(0, 1, (c + t / 2) / t);
      l = r_UtilsSystem.UtilsSystem.clamp(0, 1, 1 - (l + o / 2) / o);
      i.push(cc.v2(c, l));
    }
    return i;
  };
  _ctor.splitPolygonByLine = function (e, t, o, i) {
    undefined === i && (i = false);
    var n = [];
    for (var a = o.length - 1; a >= 0; a--) {
      var s = o[a];
      var r = 0 == a ? o[o.length - 1] : o[a - 1];
      var c = this.lineCrossPoint(s, r, e, t);
      var l = c[0];
      var u = c[1];
      if (-1 != l) {
        o.splice(a, -1, u);
        n.push(a + 1);
      }
    }
    return n;
  };
  _ctor.lineCrossPoint = function (e, t, o, i) {
    var a;
    var s;
    var r;
    var c;
    var l;
    var u;
    var h = e;
    var p = t;
    var d = o;
    var y = i;
    var f = new cc.Vec2(0, 0);
    r = r_UtilsSystem.UtilsSystem.dblcmp(a = this.ab_cross_ac(h, p, d), 0);
    c = r_UtilsSystem.UtilsSystem.dblcmp(s = this.ab_cross_ac(h, p, y), 0);
    l = r_UtilsSystem.UtilsSystem.dblcmp(this.ab_cross_ac(d, y, h), 0);
    u = r_UtilsSystem.UtilsSystem.dblcmp(this.ab_cross_ac(d, y, p), 0);
    if (-2 == (r ^ c) && -2 == (l ^ u)) {
      f.x = (d.x * s - y.x * a) / (s - a);
      f.y = (d.y * s - y.y * a) / (s - a);
      return [0, f];
    } else if (0 == r && this.point_on_line(d, h, p) <= 0) {
      return [1, f = d];
    } else if (0 == c && this.point_on_line(y, h, p) <= 0) {
      return [1, f = y];
    } else if (0 == l && this.point_on_line(h, d, y) <= 0) {
      return [1, f = h];
    } else if (0 == u && this.point_on_line(p, d, y) <= 0) {
      return [1, f = p];
    } else {
      return [-1, null];
    }
  };
  _ctor.isLineSegmentCross = function (e, t, o, i) {
    return ((o.x - e.x) * (o.y - i.y) - (o.y - e.y) * (o.x - i.x)) * ((o.x - t.x) * (o.y - i.y) - (o.y - t.y) * (o.x - i.x)) < 0 || ((e.x - o.x) * (e.y - t.y) - (e.y - o.y) * (e.x - t.x)) * ((e.x - i.x) * (e.y - t.y) - (e.y - i.y) * (e.x - t.x)) < 0;
  };
  _ctor.point_on_line = function (e, t, o) {
    return r_UtilsSystem.UtilsSystem.dblcmp(this.dot(t.x - e.x, t.y - e.y, o.x - e.x, o.y - e.y), 0);
  };
  _ctor.rayPointToLine = function (e, t, o) {
    Math.min(t.x, o.x);
    var i = Math.max(t.x, o.x);
    var n = Math.min(t.y, o.y);
    var a = Math.max(t.y, o.y);
    if (e.y < n || e.y > a || e.x > i) {
      return -1;
    }
    var s = t.x + (o.x - t.x) / (o.y - t.y) * (e.y - t.y);
    if (s > e.x) {
      return 0;
    } else if (s == e.x) {
      return 1;
    } else {
      return -1;
    }
  };
  _ctor.relationPointToPolygon = function (e, t) {
    var o = 0;
    for (var i = 0; i < t.length; ++i) {
      if (t[i].equals(e)) {
        return 2;
      }
      var n = t[i];
      var a = t[0];
      i < t.length - 1 && (a = t[i + 1]);
      var s = this.rayPointToLine(e, n, a);
      if (1 == s) {
        return 1;
      }
      0 == s && o++;
    }
    if (o % 2 == 0) {
      return -1;
    } else {
      return 0;
    }
  };
  _ctor.lineCutPolygon = function (e, t, o) {
    var i = [];
    var n = [];
    var a = [];
    for (var s = 0; s < o.length; ++s) {
      n.push(o[s]);
      var r = o[s];
      var c = o[0];
      s < o.length - 1 && (c = o[s + 1]);
      var l = this.lineCrossPoint(e, t, r, c);
      if (0 == l[0]) {
        a.push(n.length);
        n.push(l[1]);
      } else if (l[0] > 0) {
        if (l[1].equals(r)) {
          a.push(n.length - 1);
        } else {
          a.push(n.length);
        }
      }
    }
    if (a.length > 1) {
      var u = n[a[0]];
      var h = n[a[1]];
      var p = this.relationPointToPolygon(new cc.Vec2((u.x + h.x) / 2, (u.y + h.y) / 2), o);
      var d = p >= 0;
      if (a.length > 2 && u.sub(h).mag() > u.sub(n[a[a.length - 1]]).mag()) {
        h = n[a[a.length - 1]];
        d = (p = this.relationPointToPolygon(new cc.Vec2((u.x + h.x) / 2, (u.y + h.y) / 2), o)) < 0;
      }
      var y = d;
      var f = 0;
      var m = a[f];
      var g = [];
      var v = [];
      var C = 0;
      g.push(n[m]);
      d && v.push(n[m]);
      f++;
      C++;
      for (m++; C < n.length;) {
        m == n.length && (m = 0);
        var S = n[m];
        if (f >= 0 && m == a[f]) {
          ++f >= a.length && (f = 0);
          if (d) {
            v.push(S);
            i.push(v);
            v = [];
          } else {
            (v = []).push(S);
          }
          g.push(S);
          d = !d;
        } else if (d) {
          v.push(S);
        } else {
          g.push(S);
        }
        m++;
        C++;
      }
      if (d) {
        if (!y && v.length > 1) {
          v.push(n[a[0]]);
          i.push(v);
        } else {
          for (s = 0; s < v.length; ++s) {
            g.push(v[s]);
          }
        }
      }
      i.push(g);
    }
    return i;
  };
  _ctor.calaPolygonArea = function (e) {
    var t = 0;
    var o = 0;
    for (var i = e.length; o < i; o++) {
      t += e[o].x * e[o == e.length - 1 ? 0 : o + 1].y * .5;
      t -= e[o == e.length - 1 ? 0 : o + 1].x * e[o].y * .5;
    }
    return Math.abs(t);
  };
  _ctor.ab_cross_ac = function (e, t, o) {
    return this.cross(t.x - e.x, t.y - e.y, o.x - e.x, o.y - e.y);
  };
  _ctor.dot = function (e, t, o, i) {
    return e * o + t * i;
  };
  _ctor.cross = function (e, t, o, i) {
    return e * i - o * t;
  };
  _ctor.isLineSegmentIntersect = function (e, t, o, i) {
    var n = (e.x - o.x) * (t.y - o.y) - (e.y - o.y) * (t.x - o.x);
    var a = (e.x - i.x) * (t.y - i.y) - (e.y - i.y) * (t.x - i.x);
    if (n * a >= 0) {
      return false;
    }
    var s = (o.x - e.x) * (i.y - e.y) - (o.y - e.y) * (i.x - e.x);
    if (s * (s + n - a) >= 0) {
      return false;
    }
    var r = s / (a - n);
    var c = r * (t.x - e.x);
    var l = r * (t.y - e.y);
    return {
      x: e.x + c,
      y: e.y + l
    };
  };
  _ctor.convertVecArrayToClipperPath = function (e) {
    return e.map(function (e) {
      return {
        X: e.x,
        Y: e.y
      };
    });
  };
  _ctor.convertClipperPathToVecArray = function (e) {
    return e.map(function (e) {
      return cc.v2(e.X, e.Y);
    });
  };
  _ctor.bezier3 = function (e, t, o, i, n, a) {
    cc.Vec2.subtract(this.TEMP_AA, t, e);
    this.TEMP_AA.mul(n, this.TEMP_AA);
    cc.Vec2.add(this.TEMP_AA, e, this.TEMP_AA);
    cc.Vec2.subtract(this.TEMP_BB, o, t);
    this.TEMP_BB.mul(n, this.TEMP_BB);
    cc.Vec2.add(this.TEMP_BB, t, this.TEMP_BB);
    cc.Vec2.subtract(this.TEMP_CC, i, o);
    this.TEMP_CC.mul(n, this.TEMP_CC);
    cc.Vec2.add(this.TEMP_CC, o, this.TEMP_CC);
    cc.Vec2.subtract(this.TEMP_AAA, this.TEMP_BB, this.TEMP_AA);
    this.TEMP_AAA.mul(n, this.TEMP_AAA);
    cc.Vec2.add(this.TEMP_AAA, this.TEMP_AA, this.TEMP_AAA);
    cc.Vec2.subtract(this.TEMP_BBB, this.TEMP_CC, this.TEMP_BB);
    this.TEMP_BBB.mul(n, this.TEMP_BBB);
    cc.Vec2.add(this.TEMP_BBB, this.TEMP_BB, this.TEMP_BBB);
    cc.Vec2.subtract(a, this.TEMP_BBB, this.TEMP_AAA);
    a.mul(n, a);
    cc.Vec2.add(a, this.TEMP_AAA, a);
  };
  _ctor.polygonInPolygon = function (e, t) {
    var o = true;
    var i = 0;
    for (var n = e; i < n.length; i++) {
      var a = n[i];
      if (!cc.Intersection.pointInPolygon(a, t)) {
        o = false;
        break;
      }
    }
    return o;
  };
  _ctor.TEMP_AA = new cc.Vec2();
  _ctor.TEMP_BB = new cc.Vec2();
  _ctor.TEMP_CC = new cc.Vec2();
  _ctor.TEMP_AAA = new cc.Vec2();
  _ctor.TEMP_BBB = new cc.Vec2();
  return _ctor;
}();
exports.PolygonUtil = exp_PolygonUtil;