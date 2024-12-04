var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_AuctionHouseSystem = require("AuctionHouseSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_AuctionHouseUI = require("AuctionHouseUI");
var def_AuctionHouseResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.AuctionHouse, r_UIDef.UIDef.Res.UI.AuctionHouseResultUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.AuctionHouseResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.AuctionHouseResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnAgian, this.btnBack, this.btnDouble, this.btnGet);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data.index;
    this.labPrice.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_AuctionHouseSystem.AuctionHouseSystem.currPrice, 1);
  };
  _ctor.prototype.onClickbtnAgian = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("拍卖行再来一次", function () {
      e.hide();
      r_AuctionHouseUI.default.Inst && r_AuctionHouseUI.default.Inst.restart();
    });
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.hide();
    r_AuctionHouseUI.default.hide();
  };
  _ctor.prototype.onClickbtnDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("拍卖行双倍奖励", function () {
      e.hide();
      r_AuctionHouseUI.default.hide();
      r_PlayerData.PlayerData.addCoin("拍卖行双倍奖励", 2 * r_AuctionHouseSystem.AuctionHouseSystem.currPrice, r_ReportSystem.SystemKey.小游戏);
    });
  };
  _ctor.prototype.onClickbtnGet = function () {
    this.hide();
    r_AuctionHouseUI.default.hide();
    r_PlayerData.PlayerData.addCoin("拍卖行双倍奖励", r_AuctionHouseSystem.AuctionHouseSystem.currPrice, r_ReportSystem.SystemKey.小游戏);
  };
  __decorate([r_DecorateFunction1.AutoFind("btnAgian")], _ctor.prototype, "btnAgian", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labPrice")], _ctor.prototype, "labPrice", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_AuctionHouseResultUI;