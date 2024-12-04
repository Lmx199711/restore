Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResUtil = exports.headImgExtList = undefined;
exports.headImgExtList = [".jpeg", ".webp", ".image"];
(function (e) {
  function t(e, t) {
    t || (t = null == e || "" === e ? cc.resources : cc.assetManager.getBundle(e));
    return t;
  }
  function i(e, t, o) {
    var i = new Image();
    function n() {
      i.removeEventListener("load", n);
      i.removeEventListener("error", a);
      o && o(null, i);7
    }
    function a() {
      i.removeEventListener("load", n);
      i.removeEventListener("error", a);
      o && o(new Error(e));
    }
    "file:" !== window.location.protocol && (i.crossOrigin = "anonymous");
    i.addEventListener("load", n);
    i.addEventListener("error", a);
    i.src = e;
    return i;
  }
  e.loadRemote = function (e) {
    null == e.option && (e.option = {});
    var t = e.url;
    var o = e.option;
    return new Promise(function (e) {
      cc.assetManager.loadRemote(t, o, function (t, o) {
        e && e(t ? null : o);
      });
    });
  };
  e.loadBundle = function (e) {
    return new Promise(function (t) {
      cc.assetManager.loadBundle(e, function (e, o) {
        t && t(e ? null : o);
      });
    });
  };
  e.loadAsset = function (e) {
    var o = t(e.bundleName, e.bundle);
    var i = o.get(e.path, e.type);
    if (null != i) {
      return Promise.resolve(i);
    } else {
      return new Promise(function (t) {
        o.load(e.path, e.type, function (e, o) {
          t(e ? null : o);
        });
      });
    }
  };
  e.registerHeadImgLoader = function () {
    for (var e = 0; e < exports.headImgExtList.length; e++) {
      var t = exports.headImgExtList[e];
      cc.assetManager.downloader.register(t, function (e, t, o) {
        o(null, e);
      });
      cc.assetManager.parser.register(t, i);
    }
  };
})(exports.ResUtil || (exports.ResUtil = {}));