Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SleepAppData = undefined;
var r_PlayerData = require("PlayerData");
var r_SleepAppCfg = require("SleepAppCfg");
var exp_SleepAppData = function () {
  function _ctor() {}
  _ctor.setData = function (e, t) {
    r_PlayerData.PlayerData.data.sleepApp[e] = t;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.getData = function (e, t) {
    return r_PlayerData.PlayerData.data.sleepApp[e] || t;
  };
  _ctor.startRecord = function () {
    this.startTime = r_PlayerData.PlayerData.data.time;
  };
  _ctor.stopRecord = function () {
    var e = r_PlayerData.PlayerData.data.time - this.startTime;
    if (!(e / 60 < r_SleepAppCfg.SleepAppCfg.sleepTimeMin)) {
      var t = {};
      t.sleepDay = Math.floor(this.startTime / 86400) + 1;
      t.sleepTime = Math.floor(e / 60);
      t.apneaCount = this.randomInt(0, 5);
      t.sleepTalkingCount = this.randomInt(0, 5);
      t.snoreCount = this.randomInt(1, 5);
      var o = 10 * t.apneaCount + 5 * t.sleepTalkingCount + 5 * t.snoreCount;
      t.risk = r_SleepAppCfg.SleepAppCfg.risk.filter(function (e) {
        return o >= e.score;
      })[0].type;
      o = 100 - o;
      t.quality = r_SleepAppCfg.SleepAppCfg.quality.filter(function (e) {
        return o >= e.score;
      })[0].type;
      t.sleepScore = o + this.randomInt(-8, 8);
      t.sleepTalkingCount > 0 && (t.sleepTalkingId = this.randomInt(1, 7));
      t.snoreCount > 0 && (t.snoreId = this.randomInt(1, 5));
      t.dreamId = this.randomInt(0, r_SleepAppCfg.SleepAppCfg.dreams.length - 1);
      var a = this.getSleepRecords();
      a.unshift(t);
      a.length > r_SleepAppCfg.SleepAppCfg.recordCountMax && a.pop();
      this.setData("sleepRecords", a);
      this.setData("NewRecoredNum", this.getNewRecoredNum() + 1);
    }
  };
  _ctor.getSleepRecords = function () {
    return this.getData("sleepRecords", []);
  };
  _ctor.getNewRecoredNum = function () {
    return this.getData("NewRecoredNum", 0);
  };
  _ctor.randomInt = function (e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e;
  };
  _ctor.startTime = 0;
  return _ctor;
}();
exports.SleepAppData = exp_SleepAppData;