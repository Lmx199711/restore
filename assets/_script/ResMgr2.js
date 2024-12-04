Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Res = undefined;
var i = function () {
  function e() {}
  e.create = function (t, o, i) {
    var n = this.pools.length > 0 ? this.pools.pop() : new e();
    var a = t.split("://");
    n.bundleName = a.length > 1 ? a[0] : "";
    n.isKeepInMemory = o;
    n.resUrl = a.length > 1 ? a[1] : a[0];
    n.url = t;
    n.type = i;
    return n;
  };
  e.revert = function (e) {
    this.pools.push(e);
  };
  e.pools = [];
  return e;
}();
var n = function () {
  function e() {
    this.resDic = {};
    this.oldRes = [];
  }
  e.prototype.loadRes = function () {
    var e = this;
    var t = [];
    for (var o = 0; o < arguments.length; o++) {
      t[o] = arguments[o];
    }
    if (t[0] instanceof Array) {
      var i = t[0];
      var n = t.length > 1 ? t[1] : null;
      var a = t.length > 2 ? t[2] : null;
      var s = i.length;
      var r = 0;
      var c = function () {
        s <= ++r && n && n();
      };
      i.forEach(function (t) {
        e.__loadRes(t.url, t.isKeepInMemory, t.type, c.bind(e), function (e) {
          a && a((r + e) / s);
        });
      });
    } else {
      var l = t[0];
      var u = t[1];
      var h = t.length > 2 ? t[2] : null;
      var p = t.length > 3 ? t[3] : null;
      var d = t.length > 4 ? t[4] : null;
      this.__loadRes(l, u, h, p, d);
    }
  };
  e.prototype.__loadRes = function (e, t, o, n, a) {
    var s = this;
    var r = this.resDic[e];
    if (r) {
      var c = (u = r.bundleName ? cc.assetManager.getBundle(r.bundleName) : cc.resources).get(r.resUrl, r.type);
      c && c.addRef();
      n && n(c);
    } else {
      var l = i.create(e, t, o);
      if (l) {
        var u = l.bundleName ? cc.assetManager.getBundle(l.bundleName) : cc.resources;
        var h = function (t) {
          t.load(l.resUrl, l.type, function (e, t) {
            a && a(e / t);
          }, function (t, o) {
            if (t) {
              console.error("加载资源失败 url" + e, t);
              n && n(null);
            } else {
              s.resDic[e] = l;
              o.addRef();
              n && n(o);
            }
          });
        };
        if (u) {
          h(u);
        } else {
          if (!l.bundleName) {
            throw "加载资源失败 url=" + e;
          }
          cc.assetManager.loadBundle(l.bundleName, function (t, o) {
            if (t) {
              console.error("加载资源失败 url" + e, t);
            } else {
              h(o);
            }
          });
        }
      }
    }
  };
  e.prototype.getRes = function (e) {
    var t = this.resDic[e];
    if (t) {
      var o = t.bundleName ? cc.assetManager.getBundle(t.bundleName) : cc.resources;
      if (o) {
        return o.get(t.resUrl);
      }
    }
    return null;
  };
  e.prototype.unLoadRes = function (e) {
    var t = this.resDic[e];
    if (t) {
      var o = t.bundleName ? cc.assetManager.getBundle(t.bundleName) : cc.resources;
      if (o) {
        i.revert(this.resDic[e]);
        delete this.resDic[e];
        o.release(t.resUrl);
      }
    }
  };
  e.prototype.pushRes = function () {
    this.oldRes.length = 0;
    for (var e in this.resDic) {
      var t = this.resDic[e];
      t && this.oldRes.push(t.url);
    }
  };
  e.prototype.popRes = function () {
    var t = this;
    for (e.needDelRes.length = 0; this.oldRes.length > 0;) {
      var o = this.oldRes.pop();
      var n = this.resDic[o];
      if (n && !n.isKeepInMemory) {
        var a = n.bundleName ? cc.assetManager.getBundle(n.bundleName) : cc.resources;
        if (a) {
          var s = a.get(n.resUrl);
          if (s) {
            s.decRef();
            0 == s.refCount && e.needDelRes.push(o);
          } else {
            e.needDelRes.push(o);
          }
        }
      }
    }
    e.needDelRes.forEach(function (e) {
      i.revert(t.resDic[e]);
      delete t.resDic[e];
    });
  };
  e.needDelRes = [];
  return e;
}();
exports.Res = new n();