var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuyStoneUI = undefined;
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_BigNumSystem = require("BigNumSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_StoneVideoUI = require("StoneVideoUI");
var exp_BuyStoneUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandDraw, r_UIDef.UIDef.Res.UI.BuyStoneUI) || this;
    t.stages = [r_jsbi.default.BigInt("1"), r_jsbi.default.BigInt("500"), r_jsbi.default.BigInt("1500"), r_jsbi.default.BigInt("3000"), r_jsbi.default.BigInt("5000"), r_jsbi.default.BigInt("10000"), r_jsbi.default.BigInt("20000"), r_jsbi.default.BigInt("50000"), r_jsbi.default.BigInt("100000"), r_jsbi.default.BigInt("500000"), r_jsbi.default.BigInt("1000000"), r_jsbi.default.BigInt("10000000"), r_jsbi.default.BigInt("20000000"), r_jsbi.default.BigInt("50000000"), r_jsbi.default.BigInt("100000000")];
    t.reportName = ["1", "500", "1500", "3000", "5000", "1万", "2万", "5万", "10万", "50万", "100万", "1000万", "2000万", "5000万", "1亿"];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, o) {
    _ctor.unit || (_ctor.unit = r_jsbi.default.BigInt(r_WeaponSystem.WeaponSystem.GetFairySet("stoneUnit")));
    if (this.canOpen()) {
      this.show(r_UIDef.UIDef.Urls.UI.BuyStoneUI, e, o);
    } else {
      r_StoneVideoUI.StoneVideoUI.showUI();
    }
  };
  _ctor.prototype.onShown = function () {
    this.initAll();
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BuyStoneUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.costCoin = r_jsbi.default.BigInt("10");
    this.buyCount = r_jsbi.default.BigInt("10");
    this.btnClose.onClick(function () {
      return t.hide();
    });
    this.btnBuy.onClick(function () {
      return t.onClickOK();
    });
    this.slider.on(fgui.Event.STATUS_CHANGED, this.onChanged, this);
  };
  _ctor.canOpen = function () {
    _ctor.unit || (_ctor.unit = r_jsbi.default.BigInt(r_WeaponSystem.WeaponSystem.GetFairySet("stoneUnit")));
    return !!r_jsbi.default.GE(r_PlayerData.PlayerData.bigCoin, _ctor.unit);
  };
  _ctor.prototype.initAll = function () {
    _ctor.unit = r_jsbi.default.BigInt(r_WeaponSystem.WeaponSystem.GetFairySet("stoneUnit"));
    this.txtUnit.text = r_UtilsSystem.UtilsSystem.getShowCoin(_ctor.unit);
    this.dBigCoin = r_jsbi.default.divide(r_PlayerData.PlayerData.bigCoin, _ctor.unit);
    this.slider.value = 100;
    this.refreshCost();
  };
  _ctor.prototype.refreshCost = function () {
    var e = r_jsbi.default.BigInt(this.slider.value);
    var o = r_jsbi.default.multiply(e, this.dBigCoin);
    o = r_jsbi.default.divide(o, r_jsbi.default.BigInt(100));
    r_jsbi.default.LE(o, r_BigNumSystem.BigNumSystem.getNum("0")) && (o = r_BigNumSystem.BigNumSystem.getNum("1"));
    this.buyCount = o;
    this.costCoin = r_jsbi.default.multiply(this.buyCount, _ctor.unit);
    var i = r_UtilsSystem.UtilsSystem.getShowCoin(this.buyCount);
    i = i.replace("元", "个");
    this.txtStone.text = i;
  };
  _ctor.prototype.onChanged = function () {
    this.slider.value < 1 && (this.slider.value = 1);
    this.refreshCost();
  };
  _ctor.prototype.onClickOK = function () {
    if (r_jsbi.default.LE(this.buyCount, r_BigNumSystem.BigNumSystem.getNum("0")) || !r_PlayerData.PlayerData.isCoinEnough(this.costCoin)) {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    } else {
      r_PlayerData.PlayerData.deleteCoin("购买灵石", this.costCoin, r_ReportSystem.SystemKey.灵石交易);
      r_PlayerData.PlayerData.addStone("金币换符石", this.buyCount, r_ReportSystem.SystemKey.灵石交易);
      this.reportBuyCount();
      this.initAll();
    }
  };
  _ctor.prototype.reportBuyCount = function () {
    var e = this.stages.length;
    for (var t = 1; t < this.stages.length; t++) {
      if (r_jsbi.default.LE(this.buyCount, this.stages[t])) {
        e = t;
        break;
      }
    }
    r_PlatformSystem.PlatformSystem.report("lingshi", {
      zhuanhua: this.reportName[e - 1]
    });
  };
  _ctor.unit = null;
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBuy")], _ctor.prototype, "btnBuy", undefined);
  __decorate([r_DecorateFunction1.AutoFind("slider")], _ctor.prototype, "slider", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtStone")], _ctor.prototype, "txtStone", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtUnit")], _ctor.prototype, "txtUnit", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.BuyStoneUI = exp_BuyStoneUI;