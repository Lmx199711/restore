Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponRankSystem = undefined;
var r_Config = require("Config");
var r_HttpSystem = require("HttpSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_WeaponSystem = require("WeaponSystem");
var c = function () {
  function e() {
    this.wpRankList = [];
    this.upCool = 10;
    this.lastUpStamp = 0;
    this.isGetWeaponRank = false;
    this.downCool = 600;
    this.lastDownStamp = 0;
  }
  e.prototype.init = function () {
    this.GetWPPList();
  };
  e.prototype.GetWPPList = function (e) {
    var t = this;
    if (r_TimeSystem.TimeSystem.getServerTime() - this.lastDownStamp < this.downCool) {
      console.log("下载武器 时间冷却中' + " + r_TimeSystem.TimeSystem.getServerTime() + " - " + this.lastDownStamp + " < " + this.downCool);
      e && e();
    } else {
      this.lastDownStamp = r_TimeSystem.TimeSystem.getServerTime();
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/getcommonrank", {
        gameid: r_Config.default.gameId,
        sorttype: 0,
        mapid: "3"
      }, function (o) {
        if (o) {
          console.log("uploadWpp responseJson=", o);
          t.wpRankList = o.rank;
          t.isGetWeaponRank = true;
          e && e();
        }
      });
    }
  };
  e.prototype.UpWeapon2Rank = function () {
    console.log("上传武器");
    if (this.checkPlatformToRank() && !(r_TimeSystem.TimeSystem.getServerTime() - this.lastUpStamp < this.upCool) && this.isGetWeaponRank) {
      var e = r_WeaponSystem.WeaponSystem.MyHighestWeapon();
      if (null != e.id) {
        var t = 1e4 * e.point + Number(e.id);
        if (this.wpRankList.length >= 50 && t < this.wpRankList[this.wpRankList.length - 1].point) {
          return;
        }
        this.lastUpStamp = r_TimeSystem.TimeSystem.getServerTime();
        r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/uploaduserscore", {
          gameid: r_Config.default.gameId,
          userID: r_PlayerData.PlayerData.data.userId,
          mapid: "3",
          score: t
        }, function (e) {
          console.log("uploadWpp responseJson=", e);
        });
      }
    }
  };
  e.prototype.ForceUp = function () {
    if (this.checkPlatformToRank() && this.isGetWeaponRank) {
      this.lastUpStamp = r_TimeSystem.TimeSystem.getServerTime();
      var e = r_WeaponSystem.WeaponSystem.MyHighestWeapon();
      var t = 0;
      null != e.id && (t = 1e4 * e.point + Number(e.id));
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/uploaduserscore", {
        gameid: r_Config.default.gameId,
        userID: r_PlayerData.PlayerData.data.userId,
        mapid: "3",
        score: t
      }, function (e) {
        console.log("ForceUp responseJson=", e);
      });
    }
  };
  e.prototype.getMyRank = function () {
    for (var e = 0; e < this.wpRankList.length; e++) {
      if (this.wpRankList[e].uid == r_PlayerData.PlayerData.data.userId) {
        return e + 1;
      }
    }
    return 0;
  };
  e.prototype.DropRank = function () {
    var e = "";
    for (var t = 0; t < this.wpRankList.length; t++) {
      if (this.wpRankList[t].uid == r_PlayerData.PlayerData.data.userId) {
        e = this.wpRankList[t].score;
        break;
      }
    }
    e && this.ForceUp();
  };
  e.prototype.GetRankInfo = function (e) {
    var t = e.toString() + "";
    var o = t.length;
    var i = t.substring(0, o - 4);
    return {
      id: Number(t.substring(o - 4)),
      point: i
    };
  };
  e.prototype.checkPlatformToRank = function () {
    return cc.sys.platform == cc.sys.BYTEDANCE_GAME || cc.sys.platform == cc.sys.WECHAT_GAME || window.ks;
  };
  return e;
}();
exports.WeaponRankSystem = new c();