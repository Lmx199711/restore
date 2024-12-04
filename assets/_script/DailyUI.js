var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyUI = undefined;
var r_UIDef = require("UIDef");
var r_FarmCfg = require("FarmCfg");
var r_FarmSystem = require("FarmSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_BaseWin = require("BaseWin");
var exp_DailyUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Res.UI.DailyUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DailyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DailyUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(function () {
      t.hide();
    }, this);
    this.btnGet.onClick(function () {
      t.btnGet.enabled = false;
      r_PlayerData.PlayerData.data.Daily = {
        isGet: true,
        nextDay: r_TimeSystem.TimeSystem.getTimeByHour(0) + r_TimeSystem.TimeSystem.oneDaySecond
      };
      var e = function (e) {
        var t = r_FarmCfg.DailyReward[e];
        r_PlayerData.PlayerData.setFarmSeed(t.id, t.num);
        setTimeout(function () {
          r_UtilsSystem.UtilsSystem.showTip("获得" + t.num + "个" + r_FarmSystem.FarmSystem.getFarmInfo(t.id).name + "种子");
        }, 400 * e);
      };
      for (var o = 0; o < r_FarmCfg.DailyReward.length; o++) {
        e(o);
      }
      r_PlayerData.PlayerData.saveData();
      r_Index.UIWind.get(r_UIDef.UIDef.Urls.UI.FarmUI).checkRedTip();
      t.hide();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.btnGet.enabled = _ctor.canGet();
    for (var o = 0; o < r_FarmCfg.DailyReward.length; o++) {
      var i = r_FarmCfg.DailyReward[o];
      var n = r_FarmCfg.FarmCfg[i.id - 1];
      var a = this.contentPane.getChild("item" + o).asCom;
      r_ResSystem.ResSystem.loadBundleFguiImg(a.getChild("icon"), "game2", "farm/item/item" + n.id);
      a.getChild("name").text = n.name;
      a.getChild("num").text = i.num + "";
      a.getController("c1").setSelectedPage(n.lv);
      a.getController("c2").selectedIndex = 1;
    }
  };
  _ctor.canGet = function () {
    return !r_PlayerData.PlayerData.data.Daily || !r_PlayerData.PlayerData.data.Daily.isGet || r_TimeSystem.TimeSystem.getServerTime() >= r_PlayerData.PlayerData.data.Daily.nextDay;
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.DailyUI = exp_DailyUI;