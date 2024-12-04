Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineSystem = undefined;
var r_OnlineCfg = require("OnlineCfg");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var s = function () {
  function e() {
    this.passTime = 0;
    this.timeOff = 21600;
  }
  e.prototype.update = function (e) {
    if (r_PlayerData.PlayerData && r_PlayerData.PlayerData.data) {
      this.passTime = this.passTime + e;
      if (this.passTime >= 1) {
        this.passTime = 0;
        if (r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.onlineTime)) {
          r_PlayerData.PlayerData.data.onlineTime = r_TimeSystem.TimeSystem.getServerTime();
          r_PlayerData.PlayerData.data.onlinePassTime = 0;
          r_PlayerData.PlayerData.data.onlineGetList = [];
        }
        r_PlayerData.PlayerData.data.onlinePassTime = r_PlayerData.PlayerData.data.onlinePassTime + 1;
      }
    }
  };
  e.prototype.needShowRedTip = function () {
    var e = Math.floor(r_PlayerData.PlayerData.data.onlinePassTime / 60);
    for (var t = 0; t < r_OnlineCfg.OnlineCfg.length; t++) {
      var o = r_OnlineCfg.OnlineCfg[t];
      if (-1 == r_PlayerData.PlayerData.data.onlineGetList.indexOf(o.id) && !(e < o.time)) {
        return true;
      }
    }
    return false;
  };
  return e;
}();
exports.OnlineSystem = new s();