function exp_earcut(e, t, o) {
  undefined === t && (t = null);
  undefined === o && (o = null);
  o = o || 2;
  var i;
  var a;
  var r;
  var c;
  var l;
  var u;
  var p;
  var d = t && t.length;
  var y = d ? t[0] * o : e.length;
  var f = n(e, 0, y, o, true);
  var m = [];
  if (!f || f.next === f.prev) {
    return m;
  }
  d && (f = h(e, t, f, o));
  if (e.length > 80 * o) {
    i = r = e[0];
    a = c = e[1];
    for (var g = o; g < y; g += o) {
      (l = e[g]) < i && (i = l);
      (u = e[g + 1]) < a && (a = u);
      l > r && (r = l);
      u > c && (c = u);
    }
    p = 0 !== (p = Math.max(r - i, c - a)) ? 32767 / p : 0;
  }
  s(f, m, o, i, a, p, 0);
  return m;
}
function n(e, t, o, i, n) {
  var a;
  var s;
  if (n === B(e, t, o, i) > 0) {
    for (a = t; a < o; a += i) {
      s = R(a, e[a], e[a + 1], s);
    }
  } else {
    for (a = o - i; a >= t; a -= i) {
      s = R(a, e[a], e[a + 1], s);
    }
  }
  if (s && x(s, s.next)) {
    M(s);
    s = s.next;
  }
  return s;
}
function a(e, t) {
  undefined === t && (t = null);
  if (!e) {
    return e;
  }
  t || (t = e);
  var o;
  var i = e;
  do {
    o = false;
    if (i.steiner || !x(i, i.next) && 0 !== b(i.prev, i, i.next)) {
      i = i.next;
    } else {
      M(i);
      if ((i = t = i.prev) === i.next) {
        break;
      }
      o = true;
    }
  } while (o || i !== t);
  return t;
}
function s(e, t, o, i, n, h, p) {
  if (e) {
    !p && h && m(e, i, n, h);
    var d;
    var y;
    for (var f = e; e.prev !== e.next;) {
      d = e.prev;
      y = e.next;
      if (h ? c(e, i, n, h) : r(e)) {
        t.push(d.i / o | 0);
        t.push(e.i / o | 0);
        t.push(y.i / o | 0);
        M(e);
        e = y.next;
        f = y.next;
      } else if ((e = y) === f) {
        if (p) {
          if (1 === p) {
            s(e = l(a(e), t, o), t, o, i, n, h, 2);
          } else {
            2 === p && u(e, t, o, i, n, h);
          }
        } else {
          s(a(e), t, o, i, n, h, 1);
        }
        break;
      }
    }
  }
}
function r(e) {
  var t = e.prev;
  var o = e;
  var i = e.next;
  if (b(t, o, i) >= 0) {
    return false;
  }
  var n = t.x;
  var a = o.x;
  var s = i.x;
  var r = t.y;
  var c = o.y;
  var l = i.y;
  var u = n < a ? n < s ? n : s : a < s ? a : s;
  var h = r < c ? r < l ? r : l : c < l ? c : l;
  var p = n > a ? n > s ? n : s : a > s ? a : s;
  var d = r > c ? r > l ? r : l : c > l ? c : l;
  for (var y = i.next; y !== t;) {
    if (y.x >= u && y.x <= p && y.y >= h && y.y <= d && S(n, r, a, c, s, l, y.x, y.y) && b(y.prev, y, y.next) >= 0) {
      return false;
    }
    y = y.next;
  }
  return true;
}
function c(e, t, o, i) {
  var n = e.prev;
  var a = e;
  var s = e.next;
  if (b(n, a, s) >= 0) {
    return false;
  }
  var r = n.x;
  var c = a.x;
  var l = s.x;
  var u = n.y;
  var h = a.y;
  var p = s.y;
  var d = r < c ? r < l ? r : l : c < l ? c : l;
  var y = u < h ? u < p ? u : p : h < p ? h : p;
  var f = r > c ? r > l ? r : l : c > l ? c : l;
  var m = u > h ? u > p ? u : p : h > p ? h : p;
  var g = v(d, y, t, o, i);
  var C = v(f, m, t, o, i);
  var I = e.prevZ;
  for (var x = e.nextZ; I && I.z >= g && x && x.z <= C;) {
    if (I.x >= d && I.x <= f && I.y >= y && I.y <= m && I !== n && I !== s && S(r, u, c, h, l, p, I.x, I.y) && b(I.prev, I, I.next) >= 0) {
      return false;
    }
    I = I.prevZ;
    if (x.x >= d && x.x <= f && x.y >= y && x.y <= m && x !== n && x !== s && S(r, u, c, h, l, p, x.x, x.y) && b(x.prev, x, x.next) >= 0) {
      return false;
    }
    x = x.nextZ;
  }
  for (; I && I.z >= g;) {
    if (I.x >= d && I.x <= f && I.y >= y && I.y <= m && I !== n && I !== s && S(r, u, c, h, l, p, I.x, I.y) && b(I.prev, I, I.next) >= 0) {
      return false;
    }
    I = I.prevZ;
  }
  for (; x && x.z <= C;) {
    if (x.x >= d && x.x <= f && x.y >= y && x.y <= m && x !== n && x !== s && S(r, u, c, h, l, p, x.x, x.y) && b(x.prev, x, x.next) >= 0) {
      return false;
    }
    x = x.nextZ;
  }
  return true;
}
function l(e, t, o) {
  var i = e;
  do {
    var n = i.prev;
    var s = i.next.next;
    if (!x(n, s) && P(n, i, i.next, s) && k(n, s) && k(s, n)) {
      t.push(n.i / o | 0);
      t.push(i.i / o | 0);
      t.push(s.i / o | 0);
      M(i);
      M(i.next);
      i = e = s;
    }
    i = i.next;
  } while (i !== e);
  return a(i);
}
function u(e, t, o, i, n, r) {
  var c = e;
  do {
    for (var l = c.next.next; l !== c.prev;) {
      if (c.i !== l.i && I(c, l)) {
        var u = D(c, l);
        c = a(c, c.next);
        u = a(u, u.next);
        s(c, t, o, i, n, r, 0);
        return void s(u, t, o, i, n, r, 0);
      }
      l = l.next;
    }
    c = c.next;
  } while (c !== e);
}
function h(e, t, o, i) {
  var a;
  var s;
  var r;
  var c = [];
  a = 0;
  for (s = t.length; a < s; a++) {
    (r = n(e, t[a] * i, a < s - 1 ? t[a + 1] * i : e.length, i, false)) === r.next && (r.steiner = true);
    c.push(C(r));
  }
  c.sort(p);
  for (a = 0; a < c.length; a++) {
    o = d(c[a], o);
  }
  return o;
}
function p(e, t) {
  return e.x - t.x;
}
function d(e, t) {
  var o = y(e, t);
  if (!o) {
    return t;
  }
  var i = D(o, e);
  a(i, i.next);
  return a(o, o.next);
}
function y(e, t) {
  var o;
  var i = t;
  var n = e.x;
  var a = e.y;
  var s = -1 / 0;
  do {
    if (a <= i.y && a >= i.next.y && i.next.y !== i.y) {
      var r = i.x + (a - i.y) * (i.next.x - i.x) / (i.next.y - i.y);
      if (r <= n && r > s && (s = r, o = i.x < i.next.x ? i : i.next, r === n)) {
        return o;
      }
    }
    i = i.next;
  } while (i !== t);
  if (!o) {
    return null;
  }
  var c;
  var l = o;
  var u = o.x;
  var h = o.y;
  var p = 1 / 0;
  i = o;
  do {
    if (n >= i.x && i.x >= u && n !== i.x && S(a < h ? n : s, a, u, h, a < h ? s : n, a, i.x, i.y)) {
      c = Math.abs(a - i.y) / (n - i.x);
      if (k(i, e) && (c < p || c === p && (i.x > o.x || i.x === o.x && f(o, i)))) {
        o = i;
        p = c;
      }
    }
    i = i.next;
  } while (i !== l);
  return o;
}
function f(e, t) {
  return b(e.prev, e, t.prev) < 0 && b(t.next, e, e.next) < 0;
}
function m(e, t, o, i) {
  var n = e;
  do {
    0 === n.z && (n.z = v(n.x, n.y, t, o, i));
    n.prevZ = n.prev;
    n.nextZ = n.next;
    n = n.next;
  } while (n !== e);
  n.prevZ.nextZ = null;
  n.prevZ = null;
  g(n);
}
function g(e) {
  var t;
  var o;
  var i;
  var n;
  var a;
  var s;
  var r;
  var c;
  var l = 1;
  do {
    o = e;
    e = null;
    a = null;
    for (s = 0; o;) {
      s++;
      i = o;
      r = 0;
      for (t = 0; t < l && (r++, i = i.nextZ); t++) {
        ;
      }
      for (c = l; r > 0 || c > 0 && i;) {
        if (0 !== r && (0 === c || !i || o.z <= i.z)) {
          n = o;
          o = o.nextZ;
          r--;
        } else {
          n = i;
          i = i.nextZ;
          c--;
        }
        if (a) {
          a.nextZ = n;
        } else {
          e = n;
        }
        n.prevZ = a;
        a = n;
      }
      o = i;
    }
    a.nextZ = null;
    l *= 2;
  } while (s > 1);
  return e;
}
function v(e, t, o, i, n) {
  return (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = (e - o) * n | 0) | e << 8)) | e << 4)) | e << 2)) | e << 1)) | (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = (t - i) * n | 0) | t << 8)) | t << 4)) | t << 2)) | t << 1)) << 1;
}
function C(e) {
  var t = e;
  var o = e;
  do {
    (t.x < o.x || t.x === o.x && t.y < o.y) && (o = t);
    t = t.next;
  } while (t !== e);
  return o;
}
function S(e, t, o, i, n, a, s, r) {
  return (n - s) * (t - r) >= (e - s) * (a - r) && (e - s) * (i - r) >= (o - s) * (t - r) && (o - s) * (a - r) >= (n - s) * (i - r);
}
function I(e, t) {
  return e.next.i !== t.i && e.prev.i !== t.i && !U(e, t) && (k(e, t) && k(t, e) && w(e, t) && (b(e.prev, e, t.prev) || b(e, t.prev, t)) || x(e, t) && b(e.prev, e, e.next) > 0 && b(t.prev, t, t.next) > 0);
}
function b(e, t, o) {
  return (t.y - e.y) * (o.x - t.x) - (t.x - e.x) * (o.y - t.y);
}
function x(e, t) {
  return e.x === t.x && e.y === t.y;
}
function P(e, t, o, i) {
  var n = T(b(e, t, o));
  var a = T(b(e, t, i));
  var s = T(b(o, i, e));
  var r = T(b(o, i, t));
  return n !== a && s !== r || !(0 !== n || !_(e, o, t)) || !(0 !== a || !_(e, i, t)) || !(0 !== s || !_(o, e, i)) || !(0 !== r || !_(o, t, i));
}
function _(e, t, o) {
  return t.x <= Math.max(e.x, o.x) && t.x >= Math.min(e.x, o.x) && t.y <= Math.max(e.y, o.y) && t.y >= Math.min(e.y, o.y);
}
function T(e) {
  if (e > 0) {
    return 1;
  } else if (e < 0) {
    return -1;
  } else {
    return 0;
  }
}
function U(e, t) {
  var o = e;
  do {
    if (o.i !== e.i && o.next.i !== e.i && o.i !== t.i && o.next.i !== t.i && P(o, o.next, e, t)) {
      return true;
    }
    o = o.next;
  } while (o !== e);
  return false;
}
function k(e, t) {
  if (b(e.prev, e, e.next) < 0) {
    return b(e, t, e.next) >= 0 && b(e, e.prev, t) >= 0;
  } else {
    return b(e, t, e.prev) < 0 || b(e, e.next, t) < 0;
  }
}
function w(e, t) {
  var o = e;
  var i = false;
  var n = (e.x + t.x) / 2;
  var a = (e.y + t.y) / 2;
  do {
    o.y > a != o.next.y > a && o.next.y !== o.y && n < (o.next.x - o.x) * (a - o.y) / (o.next.y - o.y) + o.x && (i = !i);
    o = o.next;
  } while (o !== e);
  return i;
}
function D(e, t) {
  var o = new N(e.i, e.x, e.y);
  var i = new N(t.i, t.x, t.y);
  var n = e.next;
  var a = t.prev;
  e.next = t;
  t.prev = e;
  o.next = n;
  n.prev = o;
  i.next = o;
  o.prev = i;
  a.next = i;
  i.prev = a;
  return i;
}
function R(e, t, o, i) {
  var n = new N(e, t, o);
  if (i) {
    n.next = i.next;
    n.prev = i;
    i.next.prev = n;
    i.next = n;
  } else {
    n.prev = n;
    n.next = n;
  }
  return n;
}
function M(e) {
  e.next.prev = e.prev;
  e.prev.next = e.next;
  e.prevZ && (e.prevZ.nextZ = e.nextZ);
  e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function N(e, t, o) {
  this.i = e;
  this.x = t;
  this.y = o;
  this.prev = null;
  this.next = null;
  this.z = 0;
  this.prevZ = null;
  this.nextZ = null;
  this.steiner = false;
}
function B(e, t, o, i) {
  var n = 0;
  var a = t;
  for (var s = o - i; a < o; a += i) {
    n += (e[s] - e[a]) * (e[a + 1] + e[s + 1]);
    s = a;
  }
  return n;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.earcut = undefined;
exports.earcut = exp_earcut;
exp_earcut.deviation = function (e, t, o, i) {
  var n = t && t.length;
  var a = n ? t[0] * o : e.length;
  var s = Math.abs(B(e, 0, a, o));
  if (n) {
    var r = 0;
    for (var c = t.length; r < c; r++) {
      var l = t[r] * o;
      var u = r < c - 1 ? t[r + 1] * o : e.length;
      s -= Math.abs(B(e, l, u, o));
    }
  }
  var h = 0;
  for (r = 0; r < i.length; r += 3) {
    var p = i[r] * o;
    var d = i[r + 1] * o;
    var y = i[r + 2] * o;
    h += Math.abs((e[p] - e[y]) * (e[d + 1] - e[p + 1]) - (e[p] - e[d]) * (e[y + 1] - e[p + 1]));
  }
  if (0 === s && 0 === h) {
    return 0;
  } else {
    return Math.abs((h - s) / s);
  }
};
exp_earcut.flatten = function (e) {
  var t = e[0][0].length;
  var o = {
    vertices: [],
    holes: [],
    dimensions: t
  };
  var i = 0;
  for (var n = 0; n < e.length; n++) {
    for (var a = 0; a < e[n].length; a++) {
      for (var s = 0; s < t; s++) {
        o.vertices.push(e[n][a][s]);
      }
    }
    if (n > 0) {
      i += e[n - 1].length;
      o.holes.push(i);
    }
  }
  return o;
};