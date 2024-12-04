var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var def_BartenderCaidanUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Bartender, r_UIDef.UIDef.Res.UI.BartenderCaidanUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BartenderCaidanUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BartenderCaidanUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnGet = this.contentPane.getChild("btnGet");
    this.btnGet.onClick(this.onClickGet, this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickGet = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("奶茶彩蛋", function () {
      r_PlayerData.PlayerData.addCoin("奶茶彩蛋", 2e7, r_ReportSystem.SystemKey.小游戏);
      e.hide();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_BartenderCaidanUI;