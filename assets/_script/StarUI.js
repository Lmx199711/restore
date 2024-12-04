var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarUI = undefined;
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_StarSystem = require("StarSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_StarCfg = require("StarCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var exp_StarUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Star, r_UIDef.UIDef.Res.UI.StarUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.StarUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StarUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.hide, this);
    this.btnTotalIncome.onClick(this.onClickTotalIncome, this);
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.list.numItems = 8;
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    r_StarSystem.StarSystem.checkInit();
    r_TimeSystem.TimeSystem.registSecondUpdate("StarUI", function () {
      t.updateSecond();
    });
    this.updateSecond();
    this.ShowredDot();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("StarUI");
  };
  _ctor.prototype.onClickTotalIncome = function () {
    var e = r_StarSystem.StarSystem.countAllCoin(r_StarSystem.CoinType.income, true);
    if (r_jsbi.default.GE(e, 0)) {
      r_PlayerData.PlayerData.addCoin("收取全部收入", e, r_ReportSystem.SystemKey.星球, true, true, true);
    } else {
      r_SoundMgr.SoundMgr.playSound("click");
    }
  };
  _ctor.prototype.refreshList = function () {
    this.updateMap = {};
    this.list.numItems = r_StarCfg.starCfg.length;
  };
  _ctor.prototype.updateSecond = function () {
    for (var e in this.updateMap) {
      var t = this.updateMap[e];
      t && r_StarSystem.StarSystem.isbuyStar(t.cfg.id) && (t.getController("buyStar").selectedIndex = 1);
    }
    var o = r_StarSystem.StarSystem.countAllCoin(r_StarSystem.CoinType.income);
    var i = r_StarSystem.StarSystem.countAllCoin(r_StarSystem.CoinType.savings);
    this.allIncome.text = "总收入：" + r_UtilsSystem.UtilsSystem.getShowCoin(o);
    this.allSavings.text = "总积蓄：" + r_UtilsSystem.UtilsSystem.getShowCoin(i);
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this;
    t.index && (this.updateMap[t.index] = undefined);
    t.index = e + 1;
    this.updateMap[t.index] = t;
    var i = r_StarCfg.starCfg[e];
    t.cfg = i;
    t.getChild("icon").url = "ui://Star/" + r_StarCfg.starCfg[e].name;
    t.getChild("name").text = r_StarCfg.starCfg[e].name;
    t.getChild("income").text = "收入：" + r_UtilsSystem.UtilsSystem.getShowCoin(r_StarCfg.starCfg[e].income) + "/秒";
    t.getChild("btnCost").getChild("cost").text = "费用:" + r_UtilsSystem.UtilsSystem.getShowCoin(r_StarCfg.starCfg[e].cost);
    t.getChild("btnCost").onClick(function () {
      if (r_PlayerData.PlayerData.isCoinEnough(r_StarCfg.starCfg[e].cost)) {
        r_PlayerData.PlayerData.deleteCoin(0, r_StarCfg.starCfg[e].cost, r_ReportSystem.SystemKey.星球);
        r_PlatformSystem.PlatformSystem.report("Buyy", {
          stage: "星球" + (e + 1)
        });
        t.getController("buyStar").selectedIndex = 1;
        o.ShowredDot();
        r_StarSystem.StarSystem.buyStar(r_StarCfg.starCfg[e].id);
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    });
  };
  _ctor.prototype.ShowredDot = function () {
    for (var e in this.updateMap) {
      var t = this.updateMap[e];
      console.log("this.updateMap" + t.cfg.id);
      if (r_PlayerData.PlayerData.isCoinEnough(t.cfg.cost)) {
        console.log("显示红点");
        t.getChild("btnCost").getController("redTip").selectedIndex = 1;
      } else {
        console.log("不显示红点");
        t.getChild("btnCost").getController("redTip").selectedIndex = 0;
      }
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTotalIncome")], _ctor.prototype, "btnTotalIncome", undefined);
  __decorate([r_DecorateFunction1.AutoFind("allIncome")], _ctor.prototype, "allIncome", undefined);
  __decorate([r_DecorateFunction1.AutoFind("allSavings")], _ctor.prototype, "allSavings", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.StarUI = exp_StarUI;