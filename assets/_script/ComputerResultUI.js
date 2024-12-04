var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_ComputerUI = require("ComputerUI");
var def_ComputerResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Computer, r_UIDef.UIDef.Res.UI.ComputerResultUI) || this;
    t.showAnimFlag = false;
    t.stars = [];
    t.m_price = 1e6;
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
    this.show(r_UIDef.UIDef.Urls.UI.ComputerResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ComputerResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    for (var t = 1; t <= 5; t++) {
      var o = this.contentPane.getChild("start" + t);
      this.stars.push(o);
    }
    this.bindBtnCallback(this.btnOk, this.btnVideo);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    var e = this;
    this.labPrice.text = "获得奖金：" + r_UtilsSystem.UtilsSystem.numFormats(this.m_price * this.data.star);
    this.stars.forEach(function (t, o) {
      return t.visible = o < e.data.star;
    });
  };
  _ctor.prototype.onClickbtnOk = function () {
    r_PlayerData.PlayerData.addCoin("砸电脑奖励", this.m_price * this.data.star, r_ReportSystem.SystemKey.砸电脑);
    this.hide();
    r_ComputerUI.default.hide();
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("砸电脑双倍奖励", function () {
      r_PlayerData.PlayerData.addCoin("砸电脑奖励", e.m_price * e.data.star * 2, r_ReportSystem.SystemKey.砸电脑);
      e.hide();
      r_ComputerUI.default.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("labPrice")], _ctor.prototype, "labPrice", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_ComputerResultUI;