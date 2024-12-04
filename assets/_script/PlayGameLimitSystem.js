Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayGameLimitSystem = exports._PlayGameLimitSystem = exports.playGameLimitEnum = undefined;
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
(function (e) {
  e[e["小强收购"] = 201] = "小强收购";
})(exports.playGameLimitEnum || (exports.playGameLimitEnum = {}));
var s = [{
  id: 201,
  name: "小强收购",
  count: 1
}];
var exp__PlayGameLimitSystem = function () {
  function _ctor() {}
  _ctor.prototype.init = function () {
    this.cfgMap = new Map();
    for (var e = 0; e < s.length; e++) {
      var t = s[e];
      this.cfgMap.set(t.id, t);
    }
  };
  _ctor.prototype.getCfg = function (e) {
    return __rest(this.cfgMap.get(e), []);
  };
  _ctor.prototype.getPlayGameInfoById = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.playGameInfo.length; t++) {
      if (e == r_PlayerData.PlayerData.data.playGameInfo[t].id) {
        return r_PlayerData.PlayerData.data.playGameInfo[t];
      }
    }
    return null;
  };
  _ctor.prototype.setPlayGameInfoById = function (e) {
    var t = this.getPlayGameInfoById(e);
    if (t) {
      t.count += 1;
    } else {
      var o = {
        id: e,
        count: 1,
        time: r_TimeSystem.TimeSystem.getServerTime()
      };
      r_PlayerData.PlayerData.data.playGameInfo.push(o);
    }
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.recoverPlayGameCount = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.playGameInfo.length; t++) {
      if (e == r_PlayerData.PlayerData.data.playGameInfo[t].id) {
        r_PlayerData.PlayerData.data.playGameInfo.splice(t, 1);
        break;
      }
    }
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.getPlayGameRemainCount = function (e) {
    var t = this.getCfg(e);
    var o = t.count;
    this.refreshPlayGameInfo();
    var i = this.getPlayGameInfoById(e);
    i && (o = t.count - i.count) <= 0 && (o = 0);
    return o;
  };
  _ctor.prototype.refreshPlayGameInfo = function () {
    for (var e = 0; e < r_PlayerData.PlayerData.data.playGameInfo.length; e++) {
      r_TimeSystem.TimeSystem.getServerTime();
      var t = r_PlayerData.PlayerData.data.playGameInfo[e].time;
      if (r_TimeSystem.TimeSystem.isNextDay(t)) {
        r_PlayerData.PlayerData.data.playGameInfo.splice(e, 1);
        e--;
      }
    }
  };
  return _ctor;
}();
exports._PlayGameLimitSystem = exp__PlayGameLimitSystem;
exports.PlayGameLimitSystem = new exp__PlayGameLimitSystem();