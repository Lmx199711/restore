Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FguiResSystem = undefined;
var r_UIDef = require("UIDef");
var s = function () {
  function t() {
    this.isOpen = true;
    this.staticPackageList = ["Main", "MainHome", r_UIDef.UIDef.Pack.FairyLand, r_UIDef.UIDef.Pack.FairyLandDraw, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Pack.FairyLandTg];
    this.noReleaseNum = 3;
    this.recentlyList = [];
    this.packageList = [];
    this.packageCreateUIMap = {};
    this.packageShowUIMap = {};
    this.uiWind = null;
    this.timeSystem = null;
    this.needReleaseResMap = {};
  }
  t.prototype.init = function () {
    return __awaiter(this, undefined, undefined, function () {
      var t;
      var o;
      return __generator(this, function (i) {
        switch (i.label) {
          case 0:
            for (t in r_UIDef.UIDef.Pack) {
              this.packageList.push(t);
              this.packageCreateUIMap[t] = [];
              this.packageShowUIMap[t] = [];
            }
            console.log("this.packageList=", this.packageList);
            o = this;
            return [4, Promise.resolve().then(function () {
              return require("TimeSystem");
            })];
          case 1:
            o.timeSystem = i.sent().TimeSystem;
            return [2];
        }
      });
    });
  };
  t.prototype.isStaticPackage = function (e) {
    return -1 != this.staticPackageList.indexOf(e);
  };
  t.prototype.show = function (e, t) {
    if (this.isOpen) {
      this.uiWind = e;
      var o = t.split("://")[1].split("/")[0];
      if (!this.isStaticPackage(o)) {
        var i = this.recentlyList.indexOf(o);
        -1 != i && this.recentlyList.splice(i, 1);
        this.recentlyList.unshift(o);
        console.log("FguiResSystem url=", t);
        console.log("FguiResSystem packageName=", o);
        -1 == this.packageCreateUIMap[o].indexOf(t) && this.packageCreateUIMap[o].push(t);
        -1 == this.packageShowUIMap[o].indexOf(t) && this.packageShowUIMap[o].push(t);
        this.timeSystem.scheduleClear("FguiResSystem_" + o);
      }
    }
  };
  t.prototype.hide = function (e, t) {
    if (this.isOpen) {
      var o = t.split("://")[1].split("/")[0];
      if (!this.isStaticPackage(o)) {
        var i = this.packageShowUIMap[o].indexOf(t);
        -1 != i && this.packageShowUIMap[o].splice(i, 1);
        console.log("FguiResSystem hide:", t);
        this.checkRemoveNotRecentlyPackage();
      }
    }
  };
  t.prototype.isRecentlyPackage = function (e) {
    var t = this.recentlyList.indexOf(e);
    return t >= 0 && t < this.noReleaseNum;
  };
  t.prototype.checkRemovePackage = function (e) {
    if (this.isOpen) {
      console.log("FguiResSystem 开始检查释放:", e);
      if (this.packageShowUIMap[e].length > 0) {
        console.log("FguiResSystem 检查释放 还有显示的界面");
      } else if (this.isRecentlyPackage(e)) {
        console.log("FguiResSystem 最近使用的包,不释放");
      } else {
        for (var t = 0; t < this.packageCreateUIMap[e].length; t++) {
          var o = this.packageCreateUIMap[e][t];
          console.log("FguiResSystem 开始释放 url:", o);
          this.uiWind.remove(o);
        }
        this.packageCreateUIMap[e] = [];
        this.packageShowUIMap[e] = [];
        console.log("FguiResSystem 释放bao:", e);
        fgui.UIPackage.removePackage(e);
      }
    }
  };
  t.prototype.checkRemoveNotRecentlyPackage = function () {
    if (this.isOpen) {
      for (var e = this.recentlyList.length - 1; e >= this.noReleaseNum; e--) {
        var t = this.recentlyList[e];
        console.log("FguiResSystem 开始检查释放:", t);
        if (this.packageShowUIMap[t].length > 0) {
          console.log("FguiResSystem 检查释放 还有显示的界面");
        } else if (this.isRecentlyPackage(t)) {
          console.log("FguiResSystem 最近使用的包,不释放");
        } else {
          for (var o = 0; o < this.packageCreateUIMap[t].length; o++) {
            var i = this.packageCreateUIMap[t][o];
            console.log("FguiResSystem 开始释放 url:", i);
            this.uiWind.remove(i);
            var n = this.needReleaseResMap[i];
            if (n) {
              for (var a = 0; a < n.length; a++) {
                var s = n[a];
                if (s) {
                  console.log("FguiResSystem 动态释放资源 ", s._name);
                  cc.assetManager.releaseAsset(s);
                }
              }
            }
            this.needReleaseResMap[i] = [];
          }
          this.packageCreateUIMap[t] = [];
          this.packageShowUIMap[t] = [];
          console.log("FguiResSystem 释放bao:", t);
          fgui.UIPackage.removePackage(t);
          this.recentlyList.splice(e, 1);
        }
      }
    }
  };
  t.prototype.addAutoReleaseRes = function (e, t) {
    this.needReleaseResMap[e.url] || (this.needReleaseResMap[e.url] = []);
    this.needReleaseResMap[e.url].push(t);
  };
  return t;
}();
exports.FguiResSystem = new s();