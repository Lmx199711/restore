Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadSystem = exports._PreloadSystem = exports.PreloadType = undefined;
var i;
var r_UIDef = require("UIDef");
(function (e) {
  e[e.Res = 1] = "Res";
  e[e.Fgui = 2] = "Fgui";
})(i = exports.PreloadType || (exports.PreloadType = {}));
var exp__PreloadSystem = function () {
  function _ctor() {
    this.isPreloadFguiRes = false;
    this.isPreloadHomeFguiRes = false;
    this.soundList = [];
    this.prefabList = ["ui/race/race", "ui/fun/fun"];
    this.loadingFguiList = [r_UIDef.UIDef.Pack.MainHome, r_UIDef.UIDef.Pack.APng];
    this.enterGameloadList = [r_UIDef.UIDef.Pack.Guide, r_UIDef.UIDef.Pack.Main, r_UIDef.UIDef.Pack.Chat, r_UIDef.UIDef.Pack.Coin, r_UIDef.UIDef.Pack.Setting, r_UIDef.UIDef.Pack.Secret, r_UIDef.UIDef.Pack.Venture, r_UIDef.UIDef.Pack.PhoneMake, r_UIDef.UIDef.Pack.Square, r_UIDef.UIDef.Pack.Job, r_UIDef.UIDef.Pack.Fun, r_UIDef.UIDef.Pack.Rank, r_UIDef.UIDef.Pack.Entry, r_UIDef.UIDef.Pack.City85, r_UIDef.UIDef.Pack.GodWealth, r_UIDef.UIDef.Pack.Bank, r_UIDef.UIDef.Pack.Bartender];
    this.enterHomeloadList = [r_UIDef.UIDef.Pack.FairyLand, r_UIDef.UIDef.Pack.FairyLandDraw, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Pack.FairyLandTg, r_UIDef.UIDef.Pack.Main];
    this.oldSceneLoadList = [r_UIDef.UIDef.Pack.Job, r_UIDef.UIDef.Pack.PhoneMake, r_UIDef.UIDef.Pack.Square, r_UIDef.UIDef.Pack.StoneNew, r_UIDef.UIDef.Pack.City85, r_UIDef.UIDef.Pack.Entry, r_UIDef.UIDef.Pack.House];
    this.newSceneLoadList = [r_UIDef.UIDef.Pack.LuckBag, r_UIDef.UIDef.Pack.Field, r_UIDef.UIDef.Pack.Venture, r_UIDef.UIDef.Pack.Fun, r_UIDef.UIDef.Pack.Potato];
    this.futureSceneLoadList = [r_UIDef.UIDef.Pack.Russia, r_UIDef.UIDef.Pack.Aether];
    this.villageSceneLoadList = [r_UIDef.UIDef.Pack.CatchFish, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Pack.Market, r_UIDef.UIDef.Pack.CountMoney];
  }
  _ctor.prototype.loadS = function (e, t, o) {
    var i = this;
    o && o(0, 0);
    var n = e.length;
    var a = 0;
    var s = function () {
      var r = e[a];
      i.loadFinderTask(r, function () {
        a += 1;
        o && o(a / n, a);
        if (a >= n) {
          t && t();
        } else {
          s();
        }
        console.log("加载资源成功 穿行:", r.path);
      });
    };
    s();
  };
  _ctor.prototype.loadP = function (e, t, o) {
    var i = this;
    o && o(0, 0);
    var n = e.length;
    var a = 0;
    var s = function (e) {
      i.loadFinderTask(e, function () {
        a += 1;
        o && o(a / n, a);
        a >= n && t && t();
        console.log("加载资源成功 并行:", e.path);
      });
    };
    for (var r = 0; r < n; r++) {
      s(e[r]);
    }
  };
  _ctor.prototype.loadFinderTask = function (e, t) {
    if (e.type == i.Res) {
      this.loadResTask(e, t);
    } else {
      e.type == i.Fgui && this.loadFGUITask(e.path, t);
    }
  };
  _ctor.prototype.loadResTask = function (e, t) {
    cc.resources.preload(e.path, e.loadType, function () {
      t && t();
    });
  };
  _ctor.prototype.loadFGUITask = function (e, t) {
    var o = this;
    fgui.UIPackage.loadPackage(this.fguiBundle, e, function (i) {
      if (i) {
        console.log("加载fgui失败", o.fguiBundle, e);
        console.log("error=", i);
      }
      console.log("加载fgui成功 path:", e);
      t && t();
    });
  };
  _ctor.prototype.preloadRes = function (e) {
    var t = this;
    var n = [];
    for (var a = 0; a < e.length; a++) {
      var s = {};
      s.type = i.Fgui;
      s.path = e[a];
      n.push(s);
    }
    cc.assetManager.loadBundle("fgui", {}, function (e, i) {
      t.fguiBundle = i;
      exports.PreloadSystem.loadP(n, function () {});
    });
  };
  _ctor.prototype.preloadFguiRes = function (e, t) {
    var n = this;
    e.type = i.Fgui;
    cc.assetManager.loadBundle("fgui", {}, function (i, a) {
      n.fguiBundle = a;
      exports.PreloadSystem.loadP([e], t);
    });
  };
  return _ctor;
}();
exports._PreloadSystem = exp__PreloadSystem;
exports.PreloadSystem = new exp__PreloadSystem();