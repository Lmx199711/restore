var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CityUI = undefined;
var r_UIDef = require("UIDef");
var r_CitySystem = require("CitySystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_CityCfg = require("CityCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var exp_CityUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.City, r_UIDef.UIDef.Res.UI.CityUI) || this;
    t.showAnimFlag = true;
    t.updateMap = {};
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CityUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CityUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    r_CitySystem.CitySystem.checkInit();
    this.btnClose.onClick(this.hide, this);
    this.list.itemRenderer = this.onListRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.refreshList();
    this.ShowredDot();
    this.showlvMax();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.refreshList = function () {
    this.updateMap = {};
    this.list.numItems = r_CityCfg.cityCfg.length;
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this;
    t.index && (this.updateMap[t.index] = undefined);
    t.index = e + 1;
    this.updateMap[t.index] = t;
    var i = r_CityCfg.cityCfg[e];
    var n = r_CitySystem.CitySystem.getCityLevel(i.id);
    var a = r_CitySystem.CitySystem.getCityLevelCfg(i.id, n);
    var s = r_CitySystem.CitySystem.getCityLevelCfg(i.id, n + 1);
    t.cfg = i;
    t.getChild("icon").url = "ui://City/" + i.name;
    t.getChild("name").text = i.name;
    t.getChild("Lv").text = "等级：" + n;
    var d = t.getChild("btnCost");
    if (s) {
      d.visible = true;
      d.getChild("cost").text = "费用:" + r_UtilsSystem.UtilsSystem.getShowCoin(a.coin);
      d.getChild("income").text = "+" + r_UtilsSystem.UtilsSystem.getShowCoin(s.earn) + "/秒";
      d.clearClick();
      d.onClick(function () {
        var n = a.coin;
        if (r_PlayerData.PlayerData.isCoinEnough(n)) {
          console.log("升级花费：" + n);
          r_PlayerData.PlayerData.deleteCoin("升级城市", n, r_ReportSystem.SystemKey.城市, true);
          r_PlatformSystem.PlatformSystem.report("Buyy", {
            stage: "城市" + (e + 1)
          });
          r_SoundMgr.SoundMgr.playSound("升级成功音效");
          r_CitySystem.CitySystem.upgradeCity(i);
          o.onListRenderer(e, t);
          o.ShowredDot();
          o.showlvMax();
        } else {
          r_UtilsSystem.UtilsSystem.showTip("金币不足");
        }
      });
    } else {
      d.visible = false;
    }
  };
  _ctor.prototype.ShowredDot = function () {
    for (var e in this.updateMap) {
      var t = this.updateMap[e];
      console.log("this.updateMap" + t.cfg.id);
      var o = r_CitySystem.CitySystem.getCityLevel(t.cfg.id);
      var i = r_CitySystem.CitySystem.getCityLevelCfg(t.cfg.id, o);
      if (i && r_PlayerData.PlayerData.isCoinEnough(i.coin)) {
        t.getChild("btnCost").getController("redTip").selectedIndex = 1;
      } else {
        t.getChild("btnCost").getController("redTip").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.showlvMax = function () {
    for (var e in this.updateMap) {
      var t = this.updateMap[e];
      var o = r_CitySystem.CitySystem.getCityLevel(t.cfg.id);
      var i = r_CitySystem.CitySystem.getCityLevelCfg(t.cfg.id, o + 1);
      t.getController("lvMax").selectedIndex = i ? 0 : 1;
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.CityUI = exp_CityUI;