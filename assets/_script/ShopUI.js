var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopUI = undefined;
var r_UIDef = require("UIDef");
var r_FarmCfg = require("FarmCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_OpenCardUI = require("OpenCardUI");
var exp_ShopUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Res.UI.ShopUI) || this;
    t.maxCount = 5;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ShopUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ShopUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    _ctor.Inst = this;
    this.btnClose.onClick(function () {
      o.hide();
    }, this);
    this.btnFive.onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("五连抽", function () {
        r_OpenCardUI.OpenCardUI.showUI({
          count: 5
        });
      });
    }, this);
    this.btnOne.onClick(function () {
      if (r_PlayerData.PlayerData.data.farmCardCount <= 0) {
        r_UtilsSystem.UtilsSystem.showTip("次数不足哦");
      } else if (r_PlayerData.PlayerData.isCoinEnough(r_FarmCfg.OpenCardCost)) {
        r_PlayerData.PlayerData.deleteCoin("农场抽一次", r_FarmCfg.OpenCardCost, r_ReportSystem.SystemKey.农场);
        r_PlayerData.PlayerData.data.farmCardCount >= o.maxCount && (r_PlayerData.PlayerData.data.farmCardNextTime = r_TimeSystem.TimeSystem.getServerTime() + r_FarmCfg.OpenCardInterval);
        r_PlayerData.PlayerData.data.farmCardCount--;
        r_PlayerData.PlayerData.saveData();
        o.downTime();
        r_OpenCardUI.OpenCardUI.showUI({
          count: 1
        });
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足哦");
      }
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("cost").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_FarmCfg.OpenCardCost);
    this.showSSRTip();
  };
  _ctor.prototype.onHide = function () {
    r_TimeSystem.TimeSystem.unregistSecondUpdate("farmCardDownTime");
  };
  _ctor.prototype.showSSRTip = function () {
    var e = r_FarmCfg.OpenCardCountSSR - (r_PlayerData.PlayerData.data.farmCardOpenCount || 0);
    var t = Math.ceil(e / 5);
    this.contentPane.getChild("ssrTip1").asTextField.setVar("num", "" + e).flushVars();
    this.contentPane.getChild("ssrTip5").asTextField.setVar("num", "" + t).flushVars();
    this.downTime();
  };
  _ctor.prototype.updateDownTime = function (e) {
    this.btnOne.getChild("num").text = "(" + r_PlayerData.PlayerData.data.farmCardCount + "/" + this.maxCount + ")";
    var t = this.contentPane.getChild("downTime");
    t.visible = r_PlayerData.PlayerData.data.farmCardCount < this.maxCount;
    e && t.asTextField.setVar("num", e).flushVars();
    r_OpenCardUI.OpenCardUI.Inst && e && r_OpenCardUI.OpenCardUI.Inst.updateDownTime(e);
  };
  _ctor.prototype.downTime = function () {
    var e = this;
    var t = r_PlayerData.PlayerData.data.farmCardCount || 0;
    var o = r_PlayerData.PlayerData.data.farmCardNextTime || 0;
    var i = r_TimeSystem.TimeSystem.getServerTime();
    if (i >= o) {
      t++;
      var n = i - o;
      n >= r_FarmCfg.OpenCardInterval && (t += Math.floor(n / r_FarmCfg.OpenCardInterval));
      t > this.maxCount && (t = this.maxCount);
      r_PlayerData.PlayerData.data.farmCardCount = t;
      r_PlayerData.PlayerData.data.farmCardNextTime = i + r_FarmCfg.OpenCardInterval - n % r_FarmCfg.OpenCardInterval;
      r_PlayerData.PlayerData.saveData();
    }
    this.updateDownTime();
    if (!(t >= this.maxCount)) {
      var a = function () {
        var t = r_PlayerData.PlayerData.data.farmCardNextTime || 0;
        var o = r_TimeSystem.TimeSystem.getServerTime();
        var i = t - o;
        if (i <= 0) {
          i = r_FarmCfg.OpenCardInterval;
          r_PlayerData.PlayerData.data.farmCardCount++;
          r_PlayerData.PlayerData.data.farmCardNextTime = o + r_FarmCfg.OpenCardInterval;
          if (r_PlayerData.PlayerData.data.farmCardCount >= e.maxCount) {
            r_PlayerData.PlayerData.data.farmCardCount = e.maxCount;
            r_TimeSystem.TimeSystem.unregistSecondUpdate("farmCardDownTime");
          }
          r_PlayerData.PlayerData.saveData();
        }
        var n = i % 60;
        var a = Math.floor(i / 60).toString().padStart(2, "0") + ":" + n.toString().padStart(2, "0");
        e.updateDownTime(a);
      };
      a();
      r_TimeSystem.TimeSystem.registSecondUpdate("farmCardDownTime", function () {
        a();
      });
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOne")], _ctor.prototype, "btnOne", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFive")], _ctor.prototype, "btnFive", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.ShopUI = exp_ShopUI;