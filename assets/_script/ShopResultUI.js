var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_ShopCfg = require("ShopCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_ShopBillUI = require("ShopBillUI");
var r_ShopGameUI = require("ShopGameUI");
var def_ShopResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Shop, r_UIDef.UIDef.Res.UI.ShopResultUI) || this;
    t.showAnimFlag = true;
    t.m_price = 0;
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
    this.show(r_UIDef.UIDef.Urls.UI.ShopResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ShopResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnLook, this.btnOk);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    var e = this.data.propList;
    var t = 0;
    for (var o = 0; o < e.length; o++) {
      var i = e[o];
      t += r_ShopCfg.ShopPropCfg[i].price;
    }
    this.m_price = t * this.data.earn;
    this.labPrice.text = r_UtilsSystem.UtilsSystem.numFormats(this.m_price);
  };
  _ctor.prototype.onClickbtnOk = function () {
    r_PlayerData.PlayerData.addCoin("双十一结算", this.m_price, r_ReportSystem.SystemKey.小游戏);
    this.hide();
    r_ShopGameUI.default.hide();
  };
  _ctor.prototype.onClickbtnLook = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双十一查看购物车", function () {
      r_ShopBillUI.default.showUI(e.data);
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("labPrice")], _ctor.prototype, "labPrice", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLook")], _ctor.prototype, "btnLook", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_ShopResultUI;