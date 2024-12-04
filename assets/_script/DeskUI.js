var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_LevelRoleSystem = require("LevelRoleSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_EffectsCom = require("EffectsCom");
var r_MainHomeUI = require("MainHomeUI");
var def_DeskUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.MainHome, r_UIDef.UIDef.Res.UI.DeskUI) || this;
    t.showAnimFlag = true;
    t.awards = [1e6, 1e7, 1e8, 1e9];
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
    this.show(r_UIDef.UIDef.Urls.UI.DeskUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DeskUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnAdd, this.btnGo, this.btnGet);
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
    var t = r_PlayerData.PlayerData.data.deskTopGetNum >= this.awards.length ? this.awards[this.awards.length - 1] : this.awards[r_PlayerData.PlayerData.data.deskTopGetNum];
    this.labPrice.text = r_UtilsSystem.UtilsSystem.getShowCoin(t, 1);
    this.contentPane.getController("c1").selectedIndex = 0;
    if (r_PlatformSystem.PlatformSystem.checkDeskTopChanged()) {
      this.contentPane.getController("c1").selectedIndex = 2;
    } else {
      r_PlatformSystem.PlatformSystem.checkAndroidPlatform() && r_PlatformSystem.PlatformSystem.checkToDeskTop(function () {
        e.contentPane.getController("c1").selectedIndex = 1;
      });
    }
  };
  _ctor.prototype.onClickbtnAdd = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.addToDeskTop(function () {
      e.getAward();
    });
    this.hide();
  };
  _ctor.prototype.getAward = function () {
    r_PlayerData.PlayerData.addCoin("添加桌面", this.awards[r_PlayerData.PlayerData.data.deskTopGetNum], r_ReportSystem.SystemKey.None);
    r_PlayerData.PlayerData.data.deskTopGetNum++;
    r_PlayerData.PlayerData.data.deskTopEntryTime = r_TimeSystem.TimeSystem.getServerTime();
    r_LevelRoleSystem.LevelRoleSystem.upLevel(5);
    r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_ADD_COIN);
    r_PlayerData.PlayerData.saveData();
    r_MainHomeUI.default.hideDestBtn();
  };
  _ctor.prototype.onClickbtnGo = function () {
    this.hide();
  };
  _ctor.prototype.onClickbtnGet = function () {
    this.getAward();
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("labPrice")], _ctor.prototype, "labPrice", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAdd")], _ctor.prototype, "btnAdd", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGo")], _ctor.prototype, "btnGo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_DeskUI;