var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_MedusaUI = require("MedusaUI");
var def_MedusaResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Medusa, r_UIDef.UIDef.Res.UI.MedusaResultUI) || this;
    t.showAnimFlag = false;
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
    this.show(r_UIDef.UIDef.Urls.UI.MedusaResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MedusaResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBack, this.btnVideo);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data.index;
  };
  _ctor.prototype.onClickbtnBack = function () {
    3 == this.data.index && r_PlayerData.PlayerData.addCoin("美杜莎通关奖励", "10000000", r_ReportSystem.SystemKey.美杜莎);
    this.hide();
    r_MedusaUI.default.hide();
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("重玩美杜莎", function () {
      e.hide();
      r_MedusaUI.default.instance && r_MedusaUI.default.instance.restart();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_MedusaResultUI;