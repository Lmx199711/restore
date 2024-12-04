var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ShareSystem = require("ShareSystem");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_HouseUI = require("HouseUI");
var r_VentureUI = require("VentureUI");
var r_CatchDogCom = require("CatchDogCom");
var r_CatchDogUI = require("CatchDogUI");
var def_CatchDogResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.CatchDog, r_UIDef.UIDef.Res.UI.CatchDogResultUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.CatchDogResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CatchDogResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnNoPlay, this.btnAddNet, this.btnSell, this.btnGohome, this.btnOk, this.btnShare);
    this.btnShare.visible = false;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_ShareSystem.ShareSystem.stopRecord(false);
    this.restart();
    r_CatchDogCom.default.instance && (r_CatchDogCom.default.instance.isPause = true);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_CatchDogCom.default.instance && (r_CatchDogCom.default.instance.isPause = false);
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data;
  };
  _ctor.prototype.onClickbtnNoPlay = function () {
    r_CatchDogUI.default.instance && r_CatchDogUI.default.instance.restart();
    this.hide();
  };
  _ctor.prototype.onClickbtnAddNet = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("补充抓狗网子", function () {
      r_CatchDogUI.default.instance.addCatchNum();
      e.hide();
    });
  };
  _ctor.prototype.onClickbtnSell = function () {
    r_PlayerData.PlayerData.addCoin("售卖狗策划", 1e9, r_ReportSystem.SystemKey.抓狗);
    this.hide();
    r_CatchDogUI.default.instance && r_CatchDogUI.default.instance.restart();
  };
  _ctor.prototype.onClickbtnGohome = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("狗策划带回家", function () {
      r_PlayerData.PlayerData.data.isHasDogScheme = 1;
      e.hide();
      r_CatchDogUI.default.hide();
      r_VentureUI.VentureUI.hide();
      r_TimeSystem.TimeSystem.scheduleOnce("HouseUIshowUI", .1, function () {
        r_HouseUI.default.showUI();
      });
    });
  };
  _ctor.prototype.onClickbtnOk = function () {
    if (r_CatchDogUI.default.instance.catachNum <= 0) {
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      this.hide();
    }
  };
  _ctor.prototype.onClickbtnShare = function () {
    r_ShareSystem.ShareSystem.shareAppVideoMessage(function () {
      r_PlayerData.PlayerData.addCoin("分享获得金币", 1e5, r_ReportSystem.SystemKey.None);
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnNoPlay")], _ctor.prototype, "btnNoPlay", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAddNet")], _ctor.prototype, "btnAddNet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSell")], _ctor.prototype, "btnSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGohome")], _ctor.prototype, "btnGohome", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnShare")], _ctor.prototype, "btnShare", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_CatchDogResultUI;