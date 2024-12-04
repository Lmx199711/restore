var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_BigNumSystem = require("BigNumSystem");
var r_OffLineSystem = require("OffLineSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_RoleSystem = require("RoleSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_OfflineUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Offline, r_UIDef.UIDef.Res.UI.OfflineUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.OfflineUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.OfflineUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.sortingOrder = 1e3;
    this.bindBtnCallback(this.btnGet, this.btnDouble);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
    _ctor.Inst = this;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.restart = function () {
    this.m_diamond = r_OffLineSystem.OffLineSystem.getoffLineEarnTime();
    r_jsbi.default.GT(this.m_diamond, r_BigNumSystem.BigNumSystem.getNum("10000000000000000000")) && (this.m_diamond = r_BigNumSystem.BigNumSystem.getNum("10000000000000000000"));
    this.labNum.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.m_diamond);
    this.labTime.text = r_OffLineSystem.OffLineSystem.getOfflineTime();
    r_SoundMgr.SoundMgr.playSound("offline/welcome");
  };
  _ctor.prototype.onClickbtnGet = function () {
    r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.其它, this.m_diamond);
    r_PlayerData.PlayerData.data.offLineEarnTime = r_TimeSystem.TimeSystem.getServerTime();
    r_PlayerData.PlayerData.saveData();
    this.hide();
  };
  _ctor.prototype.onClickbtnDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("离线双倍奖励", function () {
      var t = r_jsbi.default.multiply(e.m_diamond, r_BigNumSystem.BigNumSystem.getNum(2));
      r_jsbi.default.GT(t, r_BigNumSystem.BigNumSystem.getNum("10000000000000000000")) && (t = r_BigNumSystem.BigNumSystem.getNum("10000000000000000000"));
      r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.其它, t);
      r_PlayerData.PlayerData.data.offLineEarnTime = r_TimeSystem.TimeSystem.getServerTime();
      r_PlayerData.PlayerData.saveData();
      e.hide();
    });
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("labNum")], _ctor.prototype, "labNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labTime")], _ctor.prototype, "labTime", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_OfflineUI;