var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadBundleAsset = exports.LoadGroup = exports.LoadResGroup = undefined;
var r_Task = require("Task");
var exp_LoadResGroup = function (e) {
  function _ctor(t) {
    undefined === t && (t = false);
    var o = e.call(this) || this;
    o.loadGroup = new exp_LoadGroup();
    o.preLoad = false;
    o.preLoad = t;
    return o;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "progress", {
    get: function () {
      return this.loadGroup.Progress;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.addRes = function (e, t, o) {
    undefined === t && (t = null);
    undefined === o && (o = null);
    this.loadGroup.add(e, t, o);
    return this;
  };
  _ctor.prototype.onExecute = function () {
    var t = this;
    e.prototype.onExecute.call(this);
    this.loadGroup.onCompletion(function () {
      t.endAction(true);
    }).load();
  };
  _ctor.prototype.onReset = function () {
    e.prototype.onReset.call(this);
    this.loadGroup.needLoad.splice(0, this.loadGroup.needLoad.length);
  };
  return _ctor;
}(r_Task.Task);
exports.LoadResGroup = exp_LoadResGroup;
var s = function () {};
var exp_LoadGroup = function () {
  function _ctor() {
    this.Progress = 0;
    this.needLoad = new Array();
  }
  _ctor.prototype.add = function (e, t, o, i) {
    undefined === t && (t = null);
    undefined === o && (o = null);
    undefined === i && (i = null);
    if (-1 == this.needLoad.findIndex(function (o) {
      return o.url == e && o.bundle == t;
    })) {
      var n = new s();
      n.url = e;
      n.type = o;
      n.bundle = t;
      this.needLoad.push(n);
    }
    return this;
  };
  _ctor.prototype.onCompletion = function (e) {
    this.finish = e;
    return this;
  };
  _ctor.prototype.onItemCompletion = function (e) {
    this.loadItem = e;
    return this;
  };
  _ctor.prototype.load = function (e) {
    var t = this;
    undefined === e && (e = false);
    var o = [];
    var i = new Map();
    this.needLoad.forEach(function (e) {
      if (null == e.bundle) {
        o.push(e);
      } else {
        var t = undefined;
        if (i.has(e.bundle)) {
          t = i.get(e.bundle);
        } else {
          t = [];
          i.set(e.bundle, t);
        }
        t.push(e);
      }
    });
    var n = [];
    var a = new exp_LoadBundleAsset(null, o);
    n.push(a);
    i.forEach(function (e, t) {
      n.push(new exp_LoadBundleAsset(t, e));
    });
    var s = n.length;
    var r = function (e) {
      s--;
      e && cc.error("资源加载失败", e);
      if (s <= 0) {
        t.Progress = 1;
        null != t.loadItem && t.loadItem(t.Progress);
        null != t.finish && t.finish(e);
      } else {
        var o = 0;
        n.forEach(function (e) {
          o += e.progress;
        });
        t.Progress = o / n.length;
        null != t.loadItem && t.loadItem(t.Progress);
      }
    };
    n.forEach(function (o) {
      o.start(r, function () {
        var e = 0;
        n.forEach(function (t) {
          e += t.progress;
        });
        t.Progress = e / n.length;
        null != t.loadItem && t.loadItem(t.Progress);
      }, e);
    });
  };
  return _ctor;
}();
exports.LoadGroup = exp_LoadGroup;
var exp_LoadBundleAsset = function () {
  function _ctor(e, t) {
    this.progress = 0;
    this.urls = [];
    this.preLoad = false;
    this.bundleName = e;
    this.urls = t;
  }
  _ctor.prototype.start = function (e, t, o) {
    var i = this;
    undefined === t && (t = null);
    undefined === o && (o = false);
    this.callback = e;
    this.mOnProgress = t;
    this.preLoad = o;
    if (null != this.bundleName) {
      this.bundle = cc.assetManager.getBundle(this.bundleName);
      if (null == this.bundle) {
        cc.assetManager.loadBundle(this.bundleName, function (e, t) {
          if (null != e) {
            cc.error("资源加载失败", e);
          } else {
            i.bundle = t;
            i.loadAsset();
          }
        });
      } else {
        this.loadAsset();
      }
    } else {
      this.bundle = cc.resources;
      this.loadAsset();
    }
  };
  _ctor.prototype.loadAsset = function () {
    var e;
    var t = this;
    var o = this.urls.length;
    var i = function (i) {
      i && (e = i);
      if (--o <= 0) {
        t.progress = 1;
        t.mOnProgress && t.mOnProgress(t.progress);
        null != t.callback && t.callback(e);
      } else {
        t.progress = (t.urls.length - o) / t.urls.length;
        t.mOnProgress && t.mOnProgress(t.progress);
      }
    };
    if (o > 0) {
      this.urls.forEach(function (e) {
        if (t.preLoad) {
          t.bundle.preload(e.url, e.type, i.bind(t));
        } else {
          t.bundle.load(e.url, e.type, i.bind(t));
        }
      });
    } else {
      i();
    }
  };
  return _ctor;
}();
exports.LoadBundleAsset = exp_LoadBundleAsset;