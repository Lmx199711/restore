Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeSystem = undefined;
var r_HomeCfg = require("HomeCfg");
var r_HouseUI = require("HouseUI");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r = function () {
  function e() {}
  e.prototype.getRandomBaomu = function (e) {
    var t = Math.random() <= r_HomeCfg.BaomuPr;
    r_PlayerData.PlayerData.data.baomuId = t ? e : 100 + e;
    r_PlayerData.PlayerData.data.baomuId2 = null;
    var o = r_PlayerData.PlayerData.data.wawaList.indexOf(e);
    -1 != o && r_PlayerData.PlayerData.data.wawaList.splice(o, 1);
    r_PlayerData.PlayerData.saveData();
    r_HouseUI.default.instace && r_HouseUI.default.instace.restart();
    return r_PlayerData.PlayerData.data.baomuId;
  };
  e.prototype.getCaidanBaomu = function (e) {
    r_PlayerData.PlayerData.data.baomuId = e;
    r_PlayerData.PlayerData.data.baomuId2 = null;
    var t = r_PlayerData.PlayerData.data.wawaList.indexOf(e);
    -1 != t && r_PlayerData.PlayerData.data.wawaList.splice(t, 1);
    r_PlayerData.PlayerData.data.wawaCaidan = 2;
    r_PlayerData.PlayerData.saveData();
    r_HouseUI.default.instace && r_HouseUI.default.instace.restart();
    return r_PlayerData.PlayerData.data.baomuId;
  };
  e.prototype.initWawaList = function () {
    r_PlayerData.PlayerData.data.wawaList = [0, 1, 2, 3, 4, 5];
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.savePlayDay = function () {
    r_PlayerData.PlayerData.data.wawaDay = r_DaySystem.DaySystem.getShowDay();
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.checkPlayDay = function () {
    return r_PlayerData.PlayerData.data.wawaDay == r_DaySystem.DaySystem.getShowDay();
  };
  return e;
}();
exports.HomeSystem = new r();