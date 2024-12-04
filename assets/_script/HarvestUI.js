var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HarvestUI = undefined;
var r_UIDef = require("UIDef");
var r_FarmCfg = require("FarmCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_FarmUI = require("FarmUI");
var exp_HarvestUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Res.UI.HarvestUI) || this;
    t.itemId = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HarvestUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HarvestUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnSale.onClick(function () {
      var e = t.getCfg(t.itemId);
      r_PlayerData.PlayerData.addCoin("农场收获售出", e.price, r_ReportSystem.SystemKey.农场);
      t.hide();
    }, this);
    this.btnSaleAD.onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("农场收获双倍售出", function () {
        var e = t.getCfg(t.itemId);
        r_PlayerData.PlayerData.addCoin("农场收获售出", 2 * e.price, r_ReportSystem.SystemKey.农场);
        t.hide();
      });
    }, this);
    this.btnGet.onClick(function () {
      t.data.call && t.data.call();
      t.hide();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.itemId = this.data.id;
    var t = this.getCfg(this.itemId);
    r_ResSystem.ResSystem.loadBundleFguiImg(this.contentPane.getChild("icon"), "game2", "farm/item/item" + t.id);
    this.contentPane.getChild("name").text = t.name;
    this.contentPane.getChild("quality").text = t.lv;
    this.contentPane.getChild("price").text = r_UtilsSystem.UtilsSystem.getShowCoin(t.price);
  };
  _ctor.prototype.getCfg = function (e) {
    if (e > 2e3) {
      return r_FarmCfg.PropCfg.find(function (t) {
        return t.id == e;
      });
    } else if (e > 1e3) {
      return r_FarmCfg.MarkCfg.find(function (t) {
        return t.id == e;
      });
    } else {
      return r_FarmCfg.FarmCfg.find(function (t) {
        return t.id == e;
      });
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_FarmUI.FarmUI.Inst && r_FarmUI.FarmUI.Inst.showBtnMark();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnSale")], _ctor.prototype, "btnSale", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSaleAD")], _ctor.prototype, "btnSaleAD", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.HarvestUI = exp_HarvestUI;