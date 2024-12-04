Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubwaySystem = undefined;
var r_SubwayCfg = require("SubwayCfg");
var r_SubwayGameUI = require("SubwayGameUI");
var r_SubwayUI = require("SubwayUI");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var u = function (e) {
  this.obj = null;
  this.day = null;
  this.area = null;
  this.obj = e.obj;
  this.day = e.day;
  this.area = e.area;
};
var h = function () {
  function e() {}
  e.prototype.dayCall = function () {
    if (null != r_PlayerData.PlayerData.data.dayObject.obj) {
      var e = new u(r_PlayerData.PlayerData.data.dayObject);
      var t = r_SubwayCfg.SubwayCfg[e.obj];
      if (e.day + t.hasDay >= r_DaySystem.DaySystem.getShowDay()) {
        if (t.coin >= 0) {
          r_PlayerData.PlayerData.addCoin("地铁对象", t.coin, r_ReportSystem.SystemKey.None, false);
          r_UtilsSystem.UtilsSystem.showTip(t.name + "帮你获取" + r_UtilsSystem.UtilsSystem.getShowCoin(t.coin));
        } else {
          var o = t.coin;
          o = -o;
          r_UtilsSystem.UtilsSystem.showTip(t.name + "替你消耗" + r_UtilsSystem.UtilsSystem.getShowCoin(o));
          if (!r_PlayerData.PlayerData.isCoinEnough(o)) {
            return void r_PlayerData.PlayerData.deleteCoin("地铁对象", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.None, true);
          }
          r_PlayerData.PlayerData.deleteCoin("地铁对象", o, r_ReportSystem.SystemKey.None, true);
        }
      }
      if (e.day + t.hasDay <= r_DaySystem.DaySystem.getShowDay()) {
        r_PlayerData.PlayerData.data.dayObject = {};
        r_PlayerData.PlayerData.saveData();
      }
      r_SubwayGameUI.SubwayGameUI.instace && r_SubwayGameUI.SubwayGameUI.instace.restart();
      r_SubwayUI.SubwayUI.instace && r_SubwayUI.SubwayUI.instace.restart();
    }
  };
  return e;
}();
exports.SubwaySystem = new h();