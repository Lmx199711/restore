Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShareState = exports.ShareSystem = exports._ShareSystem = undefined;
var i;
var r_TaskCfg = require("TaskCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TaskSystem = require("TaskSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp__ShareSystem = function () {
  function _ctor() {
    this.startTime = 0;
  }
  _ctor.prototype.init = function () {
    this.state = i.未开始;
    this.startTime = 0;
  };
  _ctor.prototype.startRecord = function () {
    if (this.state != i.进行中) {
      console.log("开始录屏");
      this.startTime = r_TimeSystem.TimeSystem.getServerTime();
      this.state = i.进行中;
      r_PlatformSystem.PlatformSystem.startRecorder();
    }
  };
  _ctor.prototype.stopRecord = function (e) {
    undefined === e && (e = true);
    console.log("停止录屏");
    if (r_TimeSystem.TimeSystem.getServerTime() - this.startTime <= 3) {
      this.startTime = 0;
      this.state = i.未开始;
      r_PlatformSystem.PlatformSystem.stopRecorder();
      return void r_UtilsSystem.UtilsSystem.showTip("录屏时间过短");
    }
    this.startTime = 0;
    this.state = i.未开始;
    r_PlatformSystem.PlatformSystem.stopRecorder();
    e && this.shareAppVideoMessage();
  };
  _ctor.prototype.shareAppVideoMessage = function (e) {
    console.log("开始分享");
    r_PlatformSystem.PlatformSystem.shareAppVideoMessage(function () {
      var t = new Date().toLocaleDateString();
      r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.分享);
      if (r_PlayerData.PlayerData.data.recorderTime != t) {
        r_PlayerData.PlayerData.addCoin("每日分享奖励", 1e5, r_ReportSystem.SystemKey.None);
        r_PlayerData.PlayerData.data.recorderTime = t;
      }
      e && e();
    }, function () {
      r_UtilsSystem.UtilsSystem.showTip("未发布成功,无法获得奖励");
    });
  };
  _ctor.prototype.getTime = function () {
    var e = r_TimeSystem.TimeSystem.getServerTime() - this.startTime;
    if (e <= 0) {
      return "";
    }
    var t = Math.floor(e / 60);
    var o = e % 60;
    return (t >= 10 ? "" + t : "0" + t) + ":" + (o >= 10 ? "" + o : "0" + o);
  };
  return _ctor;
}();
exports._ShareSystem = exp__ShareSystem;
exports.ShareSystem = new exp__ShareSystem();
(function (e) {
  e[e["未开始"] = 0] = "未开始";
  e[e["进行中"] = 1] = "进行中";
})(i = exports.ShareState || (exports.ShareState = {}));