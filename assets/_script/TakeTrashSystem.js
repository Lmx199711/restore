Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TakeTrashSystem = undefined;
var r_TakeTrashCfg = require("TakeTrashCfg");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r = function () {
  function e() {}
  e.prototype.getTakeTrashCfg = function (e) {
    return r_TakeTrashCfg.TakeTrashCfg[e];
  };
  e.prototype.getTrashIconCfg = function (e) {
    return r_TakeTrashCfg.TrashIconCfg[e];
  };
  e.prototype.getBtnState = function (e) {
    if (0 == r_PlayerData.PlayerData.data["trashTime" + e]) {
      return 0;
    } else if (r_PlayerData.PlayerData.data["trashTime" + e] > r_TimeSystem.TimeSystem.getServerTime()) {
      return 1;
    } else {
      return 0;
    }
  };
  e.prototype.getTakeTrashList = function (e) {
    var t;
    var o = this.getTakeTrashCfg(e);
    var i = o.count[r_UtilsSystem.UtilsSystem.getRandomNum(0, o.count.length - 1)];
    t = window.tt ? o.randomAward : o.randomAward_wx;
    var n = JSON.parse(JSON.stringify(t));
    var a = [];
    var r = function () {
      if (0 == n.length) {
        return {
          value: a
        };
      }
      var e = r_UtilsSystem.UtilsSystem.randomPercentFromArray(n);
      a.push(e.id);
      n = n.filter(function (t) {
        return t.id != e.id;
      });
    };
    for (var c = 0; c < i; c++) {
      var l = r();
      if ("object" == typeof l) {
        return l.value;
      }
    }
    return a;
  };
  e.prototype.getTakeTime = function (e) {
    if (0 == this.getBtnState(e)) {
      return "";
    }
    var t = r_PlayerData.PlayerData.data["trashTime" + e] - r_TimeSystem.TimeSystem.getServerTime();
    return r_UtilsSystem.UtilsSystem.getTime(t);
  };
  return e;
}();
exports.TakeTrashSystem = new r();