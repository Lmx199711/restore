Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResMgr = undefined;
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
var exp_ResMgr = function () {
  function _ctor() {}
  _ctor.getRes = function () {
    var e;
    var t;
    var o;
    var i;
    var n = [];
    for (var a = 0; a < arguments.length; a++) {
      n[a] = arguments[a];
    }
    if (2 == n.length) {
      o = cc.resources;
      i = n[0];
      e = n[1];
    } else if (3 == n.length) {
      o = cc.assetManager.getBundle(n[0]);
      i = n[1];
      e = n[2];
    }
    if (null == o) {
      cc.error("加载ab失败 ab名称", n[0]);
    } else {
      t = o.get(i, e);
    }
    return t;
  };
  _ctor.getResAsync = function () {
    var e;
    var t;
    var o;
    var i = [];
    for (var n = 0; n < arguments.length; n++) {
      i[n] = arguments[n];
    }
    var a = null;
    if (3 == i.length) {
      e = cc.resources;
      o = i[0];
      t = i[1];
      a = i[2];
    } else if (4 == i.length) {
      null == (e = i[0]) && (e = cc.resources);
      o = i[1];
      t = i[2];
      a = i[3];
    }
    if (e instanceof cc.AssetManager.Bundle) {
      e.load(o, t, a);
    } else {
      cc.assetManager.loadBundle(e, function (e, i) {
        if (e) {
          cc.error("资源加载失败", "path: " + o + "  error:" + e);
        } else {
          i.load(o, t, a);
        }
      });
    }
  };
  _ctor.pushRes = function () {
    this.oldRes.length = 0;
    for (var e in this.resDic) {
      var t = this.resDic[e];
      t && this.oldRes.push(t.url);
    }
  };
  _ctor.popRes = function () {
    var t = this;
    for (_ctor.needDelRes.length = 0; this.oldRes.length > 0;) {
      var o = this.oldRes.pop();
      var n = this.resDic[o];
      if (n && !n.isKeepInMemory) {
        var a = n.bundleName ? cc.assetManager.getBundle(n.bundleName) : cc.resources;
        if (a) {
          var s = a.get(n.resUrl);
          if (s) {
            s.decRef();
            0 == s.refCount && _ctor.needDelRes.push(o);
          } else {
            _ctor.needDelRes.push(o);
          }
        }
      }
    }
    _ctor.needDelRes.forEach(function (e) {
      i.revert(t.resDic[e]);
      delete t.resDic[e];
    });
  };
  _ctor.resDic = {};
  _ctor.oldRes = [];
  _ctor.needDelRes = [];
  return _ctor;
}();
exports.ResMgr = exp_ResMgr;