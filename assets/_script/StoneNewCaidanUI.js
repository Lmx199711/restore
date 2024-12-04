var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_StoneNewSystem = require("StoneNewSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_StoneNewDogzUI = require("StoneNewDogzUI");
var def_StoneNewCaidanUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.StoneNew, r_UIDef.UIDef.Res.UI.StoneNewCaidanUI) || this;
    t.prices = [4e8, 8e8, 5e8, 6e8, 7e9];
    t.randomIndex = 0;
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
    this.show(r_UIDef.UIDef.Urls.UI.StoneNewCaidanUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StoneNewCaidanUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnSell, this.btnVideo, this.btnBack, this.btnResult);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    r_StoneNewSystem.StoneNewSystem.useCaidan();
    if (null != this.data.randomIndex) {
      this.randomIndex = this.data.randomIndex;
    } else {
      this.randomIndex = r_UtilsSystem.UtilsSystem.getRandomNum(0, 4);
    }
    this.contentPane.getController("c1").selectedIndex = this.randomIndex;
    this.contentPane.getController("c2").selectedIndex = 0;
    this.btnSell.title = r_UtilsSystem.UtilsSystem.numFormats(this.prices[this.randomIndex]);
  };
  _ctor.prototype.onClickbtnSell = function () {
    r_PlayerData.PlayerData.addCoin("石头彩蛋出售", this.prices[this.randomIndex], r_ReportSystem.SystemKey.石头);
    r_StoneNewDogzUI.default.hide();
    this.hide();
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("石头彩蛋", function () {
      e.contentPane.getController("c2").selectedIndex = 1;
    });
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.onResultCall();
  };
  _ctor.prototype.onClickbtnResult = function () {
    this.onResultCall();
  };
  _ctor.prototype.onResultCall = function () {
    switch (this.randomIndex) {
      case 0:
        r_PlayerData.PlayerData.addCoin("石头彩蛋", 15e8, r_ReportSystem.SystemKey.石头);
        break;
      case 1:
        r_PlayerData.PlayerData.addCoin("石头彩蛋", 2e9, r_ReportSystem.SystemKey.石头);
        break;
      case 2:
        r_PlayerData.PlayerData.addCoin("石头彩蛋", 12e8, r_ReportSystem.SystemKey.石头);
        break;
      case 3:
        if (r_PlayerData.PlayerData.isCoinEnough(1e8)) {
          r_PlayerData.PlayerData.deleteCoin("石头彩蛋", 1e8, r_ReportSystem.SystemKey.石头);
        } else {
          r_PlayerData.PlayerData.deleteCoin("石头彩蛋", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.石头);
        }
    }
    r_StoneNewDogzUI.default.hide();
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnSell")], _ctor.prototype, "btnSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnResult")], _ctor.prototype, "btnResult", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_StoneNewCaidanUI;