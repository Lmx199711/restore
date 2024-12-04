var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HouseEarnUI = undefined;
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_HouseEarnSystem = require("HouseEarnSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_HouseEarnCfg = require("HouseEarnCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var exp_HouseEarnUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.HouseEarn, r_UIDef.UIDef.Res.UI.HouseEarnUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.HouseEarnUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HouseEarnUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(function () {
      t.hide();
    }, this);
    this.btnSellAll.onClick(function () {
      r_HouseEarnSystem.HouseEarnSystem.sellAllHouse();
      t.refreshList();
      t.updateSecond();
    }, this);
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.refreshList();
    r_TimeSystem.TimeSystem.registSecondUpdate("HouseUI", function () {
      t.updateSecond();
    });
    this.updateSecond();
    this.data && this.data.opendCallback && setTimeout(function () {
      t.data.opendCallback();
      t.data.opendCallback = null;
    }, 300);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("HouseUI");
  };
  _ctor.prototype.refreshList = function () {
    this.updateMap = {};
    this.list.numItems = r_HouseEarnCfg.HouseEarnCfg.length;
  };
  _ctor.prototype.updateSecond = function () {
    for (var e in this.updateMap) {
      var t = this.updateMap[e];
      t && r_HouseEarnSystem.HouseEarnSystem.isBuyHouse(t.cfg.id) && (t.getChild("lbSell").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_HouseEarnSystem.HouseEarnSystem.getSellCoin(t.cfg)));
    }
    var o = r_jsbi.default.BigInt(0);
    var i = r_jsbi.default.BigInt(0);
    for (var n = 0; n < r_PlayerData.PlayerData.data.houseMap.houseList.length; n++) {
      var a = r_PlayerData.PlayerData.data.houseMap.houseList[n];
      var s = r_HouseEarnSystem.HouseEarnSystem.getHouseCfg(a.id);
      var l = r_HouseEarnSystem.HouseEarnSystem.getSellCoin(s);
      o = r_jsbi.default.add(o, r_jsbi.default.BigInt(s.buy));
      i = r_jsbi.default.add(i, l);
    }
    this.lbBuy.text = "买入价：" + r_UtilsSystem.UtilsSystem.getShowCoin(o);
    this.lbNow.text = "当前价：" + r_UtilsSystem.UtilsSystem.getShowCoin(i);
    this.lbGet.text = "收益：" + r_UtilsSystem.UtilsSystem.getShowCoin(r_jsbi.default.subtract(i, o));
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this;
    t.index && (this.updateMap[t.index] = undefined);
    t.index = e + 1;
    this.updateMap[t.index] = t;
    var i = r_HouseEarnCfg.HouseEarnCfg[e];
    t.cfg = i;
    t.getChild("lbName").text = i.name;
    t.getChild("lbBuy").text = r_UtilsSystem.UtilsSystem.getShowCoin(i.buy);
    t.getChild("lbSell").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_HouseEarnSystem.HouseEarnSystem.getSellCoin(i));
    t.getChild("icon").url = "ui://HouseEarn/" + i.icon;
    if (r_HouseEarnSystem.HouseEarnSystem.isBuyHouse(i.id)) {
      t.getController("mode").selectedIndex = 1;
    } else {
      t.getController("mode").selectedIndex = 0;
    }
    var n = t.getChild("btnBuy");
    n.getChild("lbNum").text = "费用:" + r_UtilsSystem.UtilsSystem.getShowCoin(i.buy);
    if (r_PlayerData.PlayerData.isCoinEnough(i.buy)) {
      n.getChild("redTip").visible = true;
    } else {
      n.getChild("redTip").visible = false;
    }
    n.clearClick();
    n.onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      if (r_PlayerData.PlayerData.isCoinEnough(i.buy)) {
        r_HouseEarnSystem.HouseEarnSystem.buyHouse(i.id);
        r_PlayerData.PlayerData.deleteCoin("购买房子", i.buy, r_ReportSystem.SystemKey.房产系统, true);
        r_UtilsSystem.UtilsSystem.showTip("恭喜获得" + i.name + "!");
        r_PlatformSystem.PlatformSystem.report("Buyy", {
          stage: "房产" + (e + 1)
        });
        o.refreshList();
        o.updateSecond();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    }, this);
    var a = t.getChild("btnSell");
    a.clearClick();
    a.onClick(function () {
      r_HouseEarnSystem.HouseEarnSystem.sellHouse(i);
      o.onListRenderer(e, t);
      o.updateSecond();
    }, this);
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSellAll")], _ctor.prototype, "btnSellAll", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbBuy")], _ctor.prototype, "lbBuy", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbNow")], _ctor.prototype, "lbNow", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbGet")], _ctor.prototype, "lbGet", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.HouseEarnUI = exp_HouseEarnUI;