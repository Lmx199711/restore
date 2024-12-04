var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ShareSystem = require("ShareSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_WeddingUI = require("WeddingUI");
var def_WeddingResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Wedding, r_UIDef.UIDef.Res.UI.WeddingResultUI) || this;
    t.showAnimFlag = true;
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
    this.show(r_UIDef.UIDef.Urls.UI.WeddingResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WeddingResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnOk, this.btnGo, this.btnBack, this.btnShare);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_ShareSystem.ShareSystem.stopRecord(false);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data.index || 0;
  };
  _ctor.prototype.onClickbtnOk = function () {
    r_WeddingUI.default.hide();
    r_PlayerData.PlayerData.data.newGuideType = 3;
    r_PlayerData.PlayerData.data.newGuideStep = 4;
    r_PlayerData.PlayerData.saveData();
    this.hide();
  };
  _ctor.prototype.onClickbtnGo = function () {
    r_WeddingUI.default.showUI();
    this.hide();
  };
  _ctor.prototype.onClickbtnBack = function () {
    0 == this.contentPane.getController("c1").selectedIndex && this.hide();
    if (1 == this.contentPane.getController("c1").selectedIndex) {
      r_WeddingUI.default.hide();
      r_PlayerData.PlayerData.data.newGuideType = 3;
      r_PlayerData.PlayerData.saveData();
      this.hide();
    }
  };
  _ctor.prototype.onClickbtnShare = function () {
    r_ShareSystem.ShareSystem.shareAppVideoMessage(function () {
      r_PlayerData.PlayerData.addCoin("分享获得金币", 1e5, r_ReportSystem.SystemKey.None);
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGo")], _ctor.prototype, "btnGo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnShare")], _ctor.prototype, "btnShare", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_WeddingResultUI;