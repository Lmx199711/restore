Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RankSystem = exports._RankSystem = undefined;
var r_Config = require("Config");
var r_jsbi = require("jsbi");
var r_HttpSystem = require("HttpSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var exp__RankSystem = function () {
  function _ctor() {
    this.areaInfo = null;
    this.areamId = 0;
    this.areaNameList = ["河北省", "山西省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "海南省", "四川省", "贵州省", "云南省", "陕西省", "甘肃省", "青海省", "台湾省", "内蒙古自治区", "广西壮族自治区", "西藏自治区", "宁夏回族自治区", "新疆维吾尔自治区", "北京市", "天津市", "上海市", "重庆市", "香港特别行政区", "澳门特别行政区"];
    this.showNameList = ["河北", "山西", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "台湾", "内蒙古", "广西壮族", "西藏", "宁夏", "新疆", "北京", "天津", "上海", "重庆", "香港", "澳门"];
    this.rankList = [];
    this.scoreRankList = [];
    this.donateRankList = [];
    this.levelRankList = [];
    this.myAreaInfo = null;
    this.requestSpaceTime = 3600;
    this.requestRankTime = 0;
    this.requestScoreRankTime = 0;
    this.requestLevelRankTime = 0;
    this.requestDonateRankTime = 0;
    this.requestPetRankTime = {};
    this.updateScoreRankTime = 0;
    this.updateLevelRankTime = 0;
    this.updateDonateRankTime = 0;
    this.addDonateRankTime = 0;
    this.getDonateRankTime = 0;
    this.randomName = ["待到风云起", "人间难得此少年", "久光", "余生颓废", "ー個亽の江湖", "风恬月淡时", "迷人又混蛋", "北方挽歌", "亡城孤影", "故渊", "旧识遇冷", "一见钟情不将就", "昔年有你", "热寂", "温柔撩人醉", "你走了心碎了", "那时初秋", "只此热忱", "以可爱出名", "七巷猫友", "星河万里", "山后别相逢", "清酒孤灯", "孤独患者", "午山言风", "忘川鱼之", "忆往昔"];
    this.nameMapKey = "RankUINameMap";
    this.nameMap = {};
    this.isGetScoreRank = false;
    this.isGetLevelRank = false;
    this.isGetDonateRank = false;
    this.petRank = {};
  }
  _ctor.prototype.init = function () {
    this.updateScoreRankTime = r_TimeSystem.TimeSystem.getServerTime() + this.requestSpaceTime;
    this.updateLevelRankTime = r_TimeSystem.TimeSystem.getServerTime() + this.requestSpaceTime;
    this.updateDonateRankTime = r_TimeSystem.TimeSystem.getServerTime() + this.requestSpaceTime;
    this.addDonateRankTime = r_TimeSystem.TimeSystem.getServerTime() + this.requestSpaceTime;
    this.getDonateRankTime = r_TimeSystem.TimeSystem.getServerTime() + this.requestSpaceTime;
    this.initNameMap();
  };
  _ctor.prototype.initNameMap = function () {
    var e = cc.sys.localStorage.getItem(this.nameMapKey);
    if (e) {
      try {
        this.nameMap = JSON.parse(e);
      } catch (t) {
        this.nameMap = {};
      }
    } else {
      this.nameMap = {};
    }
  };
  _ctor.prototype.getAreaRankList = function () {
    var e = [];
    for (var t = 0; t < this.showNameList.length; t++) {
      e.push({
        provinceid: t + 1,
        source: "0"
      });
    }
    null == this.rankList && (this.rankList = []);
    for (t = 0; t < e.length; t++) {
      for (var o = 0; o < this.rankList.length; o++) {
        var i = this.rankList[o];
        e[t].provinceid == i.provinceid && (e[t].source = i.source);
      }
    }
    e.sort(function (e, t) {
      return t.source - e.source;
    });
    return e;
  };
  _ctor.prototype.getArea = function () {
    var e = this;
    r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/api/getarea", {
      gameId: r_Config.default.gameId
    }, function (t) {
      console.log("getarea responseJson=", t);
      e.areaInfo = t;
      console.log("getarea this.areaInfo.province=", e.areaInfo.province);
      e.findAreaId();
      e.getDonate();
    });
  };
  _ctor.prototype.findAreaId = function () {
    for (var e = 0; e < this.areaNameList.length; e++) {
      if (-1 != this.areaNameList[e].indexOf(this.areaInfo.province)) {
        this.areamId = e + 1;
        return void console.log("this.areamId=", this.areamId);
      }
    }
    console.log("this.areamId=", null);
  };
  _ctor.prototype.getAreaRank = function (e) {
    var t = this;
    if (!this.areamId) {
      this.getArea();
      return void (e && e());
    }
    if (r_TimeSystem.TimeSystem.getServerTime() - this.requestRankTime < this.requestSpaceTime) {
      e && e();
    } else {
      this.requestRankTime = r_TimeSystem.TimeSystem.getServerTime();
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/Gameapi/get_sy_rank_all", {
        gameid: r_Config.default.gameId,
        data_name: this.getTimeKey()
      }, function (o) {
        console.log("getAreaRank responseJson=", o);
        if (o) {
          t.rankList = o;
          t.rankList = t.getAreaRankList();
          e && e(true);
        } else {
          e && e(false);
        }
      });
    }
  };
  _ctor.prototype.getInfoFromRank = function () {
    for (var e = 0; e < this.rankList.length; e++) {
      if (this.rankList[e].provinceid == this.areamId) {
        this.rankList[e].rankNum = e + 1;
        return this.rankList[e];
      }
    }
    return null;
  };
  _ctor.prototype.getMyInfo = function () {
    var e = {
      coin: 0
    };
    if (exports.RankSystem.myAreaInfo) {
      e.coin = exports.RankSystem.myAreaInfo.score;
      e.rankNum = exports.RankSystem.myAreaInfo.rankNum;
    } else {
      var t = exports.RankSystem.getInfoFromRank();
      if (t) {
        e.coin = t.source;
        e.rankNum = t.rankNum;
      }
    }
    return e;
  };
  _ctor.prototype.getMyAreaRank = function () {
    return 0 != this.rankList.length && "0" != this.rankList[0].source && this.rankList[0].provinceid == this.areamId;
  };
  _ctor.prototype.canGetAreaReward = function () {
    return !(!this.getMyAreaRank() || !r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.rankRewardTime));
  };
  _ctor.prototype.getTimeKey = function () {
    var e = new Date();
    var t = e.getMonth() + 1;
    var o = t + "";
    t < 10 && (o = "0" + t);
    var i = e.getDate() + "";
    e.getDate() < 10 && (i = "0" + e.getDate());
    return e.getFullYear() + "-" + o + "-" + i;
  };
  _ctor.prototype.addDonate = function (e, t, o) {
    var n = this;
    e && (r_TimeSystem.TimeSystem.getServerTime() - this.addDonateRankTime < this.requestSpaceTime || (this.addDonateRankTime = r_TimeSystem.TimeSystem.getServerTime(), r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/set_sy_rank_provinceid", {
      gameid: r_Config.default.gameId,
      provinceid: e,
      data_name: this.getTimeKey(),
      num: t
    }, function (e) {
      console.log("addDonate responseJson=", e);
      o && o();
      n.uploadDonateScore(t);
    })));
  };
  _ctor.prototype.getDonate = function (e) {
    var t = this;
    this.areamId && (r_TimeSystem.TimeSystem.getServerTime() - this.getDonateRankTime < this.requestSpaceTime || (this.getDonateRankTime = r_TimeSystem.TimeSystem.getServerTime(), r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/get_sy_rank_provinceid", {
      gameid: r_Config.default.gameId,
      provinceid: this.areamId,
      data_name: this.getTimeKey()
    }, function (o) {
      console.log("getDonate responseJson=", o);
      if (o) {
        t.myAreaInfo = o;
        e && e();
      }
    })));
  };
  _ctor.prototype.checkUploadScore = function () {
    if (!r_jsbi.default.LT(r_PlayerData.PlayerData.bigCoin, r_PlayerData.PlayerData.data.maxCoinStr) && this.checkPlatformToRank() && r_PlayerData.PlayerData.data.userId && !r_jsbi.default.LT(r_PlayerData.PlayerData.bigCoin, 1016 == r_Config.default.gameId ? "1000000000000" : "10000000000") && !r_jsbi.default.GT(r_PlayerData.PlayerData.bigCoin, "100000000000000000000000000000000000000000000000000000000000") && !(r_TimeSystem.TimeSystem.getServerTime() - this.updateScoreRankTime < this.requestSpaceTime) && this.isGetScoreRank) {
      if (this.scoreRankList.length >= 50) {
        var e = this.scoreRankList[this.scoreRankList.length - 1];
        if (r_jsbi.default.LT(r_PlayerData.PlayerData.bigCoin, e.score)) {
          return;
        }
      }
      r_PlayerData.PlayerData.data.maxCoinStr = r_PlayerData.PlayerData.data.coinStr;
      this.updateScoreRankTime = r_TimeSystem.TimeSystem.getServerTime();
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/uploaduserscore", {
        gameid: r_Config.default.gameId,
        userID: r_PlayerData.PlayerData.data.userId,
        mapid: "1",
        score: r_PlayerData.PlayerData.data.coinStr,
        valid: true
      }, function (e) {
        console.log("uploadScore responseJson=", e);
      });
    }
  };
  _ctor.prototype.checkUploadLevel = function () {
    if (this.checkPlatformToRank() && r_PlayerData.PlayerData.data.userId && !(r_TimeSystem.TimeSystem.getServerTime() - this.updateLevelRankTime < this.requestSpaceTime) && this.isGetLevelRank) {
      if (this.levelRankList.length >= 50) {
        var e = this.levelRankList[this.levelRankList.length - 1];
        if (r_jsbi.default.LT(r_PlayerData.PlayerData.data.level, e.score)) {
          return;
        }
      }
      this.updateLevelRankTime = r_TimeSystem.TimeSystem.getServerTime();
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/uploaduserscore", {
        gameid: r_Config.default.gameId,
        userID: r_PlayerData.PlayerData.data.userId,
        mapid: "6",
        score: r_PlayerData.PlayerData.data.level,
        valid: true
      }, function (e) {
        console.log("uploadScore responseJson=", e);
      });
    }
  };
  _ctor.prototype.uploadDonateScore = function (e) {
    "number" == typeof e && (e = Math.ceil(e));
    var t = r_jsbi.default.ADD(r_jsbi.default.BigInt(r_PlayerData.PlayerData.data.donateCoinStr), r_jsbi.default.BigInt(e));
    r_PlayerData.PlayerData.data.donateCoinStr = t.toString();
    if (this.checkPlatformToRank() && r_PlayerData.PlayerData.data.userId && !(r_TimeSystem.TimeSystem.getServerTime() - this.updateDonateRankTime < this.requestSpaceTime) && this.isGetDonateRank) {
      if (this.donateRankList.length >= 50) {
        var o = this.donateRankList[this.donateRankList.length - 1];
        if (r_jsbi.default.LT(t, o.score)) {
          return;
        }
      }
      this.updateDonateRankTime = r_TimeSystem.TimeSystem.getServerTime();
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/uploaduserscore", {
        gameid: r_Config.default.gameId,
        userID: r_PlayerData.PlayerData.data.userId,
        mapid: "2",
        score: r_PlayerData.PlayerData.data.donateCoinStr,
        valid: true
      }, function (e) {
        console.log("uploadDonateScore responseJson=", e);
      });
    }
  };
  _ctor.prototype.uploadPetRankScore = function (e, t) {
    if (this.checkPlatformToRank() && r_PlayerData.PlayerData.data.userId && (this.petRank[e] || (this.petRank[e] = {}), !(r_TimeSystem.TimeSystem.getServerTime() - (this.petRank[e].updateTime || 0) < this.requestSpaceTime))) {
      var o = this.petRank[e].randList;
      if (o) {
        if (o.length >= 50) {
          var c = o[o.length - 1];
          if (r_jsbi.default.LT(t, c.score)) {
            return;
          }
        }
        this.petRank[e].updateTime = r_TimeSystem.TimeSystem.getServerTime();
        r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/uploaduserscore", {
          gameid: r_Config.default.gameId,
          userID: r_PlayerData.PlayerData.data.userId,
          mapid: e,
          score: t,
          valid: true
        }, function (t) {
          console.log("uploadPetRankScore mapid:" + e + " responseJson=", t);
        });
      }
    }
  };
  _ctor.prototype.getRankList = function (e) {
    var t = this;
    if (r_TimeSystem.TimeSystem.getServerTime() - this.requestScoreRankTime < this.requestSpaceTime) {
      e && e();
    } else {
      this.requestScoreRankTime = r_TimeSystem.TimeSystem.getServerTime();
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/getcommonrank", {
        gameid: r_Config.default.gameId,
        sorttype: 0,
        mapid: "1"
      }, function (o) {
        console.log("uploadScore responseJson=", o);
        if (o) {
          t.scoreRankList = o.rank;
          t.isGetScoreRank = true;
          e && e();
        }
      });
    }
  };
  _ctor.prototype.getLevelRankList = function (e) {
    var t = this;
    if (r_TimeSystem.TimeSystem.getServerTime() - this.requestLevelRankTime < this.requestSpaceTime) {
      e && e();
    } else {
      this.requestLevelRankTime = r_TimeSystem.TimeSystem.getServerTime();
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/getcommonrank", {
        gameid: r_Config.default.gameId,
        sorttype: 0,
        mapid: "6"
      }, function (o) {
        console.log("uploadScore responseJson=", o);
        if (o) {
          t.levelRankList = o.rank;
          t.isGetLevelRank = true;
          e && e();
        }
      });
    }
  };
  _ctor.prototype.getDonateRankList = function (e) {
    var t = this;
    if (r_TimeSystem.TimeSystem.getServerTime() - this.requestDonateRankTime < this.requestSpaceTime) {
      e && e();
    } else {
      this.requestDonateRankTime = r_TimeSystem.TimeSystem.getServerTime();
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/getcommonrank", {
        gameid: r_Config.default.gameId,
        sorttype: 0,
        mapid: "2"
      }, function (o) {
        console.log("getDonateRankList responseJson=", o);
        if (o) {
          t.isGetDonateRank = true;
          t.donateRankList = o.rank;
          e && e();
        }
      });
    }
  };
  _ctor.prototype.getPetRankList = function (e, t) {
    var o = this;
    this.petRank[e] || (this.petRank[e] = {});
    if (r_TimeSystem.TimeSystem.getServerTime() - (this.petRank[e].requestTime || 0) < this.requestSpaceTime) {
      t && t(this.petRank[e].randList);
    } else {
      this.petRank[e].requestTime = r_TimeSystem.TimeSystem.getServerTime();
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/getcommonrank", {
        gameid: r_Config.default.gameId,
        sorttype: 0,
        mapid: e
      }, function (i) {
        console.log("getPetRankList mapid:" + e + " responseJson=", i);
        if (i) {
          o.petRank[e].randList = i.rank;
          t && t(o.petRank[e].randList);
        }
      });
    }
  };
  _ctor.prototype.getMyRank = function () {
    for (var e = 0; e < this.scoreRankList.length; e++) {
      if (this.scoreRankList[e].uid == r_PlayerData.PlayerData.data.userId) {
        return e + 1;
      }
    }
    return 0;
  };
  _ctor.prototype.getMyLevelRank = function () {
    for (var e = 0; e < this.levelRankList.length; e++) {
      if (this.levelRankList[e].uid == r_PlayerData.PlayerData.data.userId) {
        return e + 1;
      }
    }
    return 0;
  };
  _ctor.prototype.canGetScoreReward = function () {
    return !!r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.scoreRankRewardTime) && !!this.getMyRank();
  };
  _ctor.prototype.canGetLevelReward = function () {
    return !!r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.levelRankRewardTime) && !!this.getMyLevelRank();
  };
  _ctor.prototype.canGetRankFirstReward = function (e) {
    var t = r_PlayerData.PlayerData.data.rewardTimeMap["areaRank_" + e];
    t || (t = 0);
    return !!r_TimeSystem.TimeSystem.isNextDay(t);
  };
  _ctor.prototype.canGetLevelFirstReward = function (e) {
    var t = r_PlayerData.PlayerData.data.rewardTimeMap["levelRank_" + e];
    t || (t = 0);
    return !!r_TimeSystem.TimeSystem.isNextDay(t);
  };
  _ctor.prototype.canGetDonateReward = function (e) {
    var t = r_PlayerData.PlayerData.data.rewardTimeMap["donateRank_" + e];
    t || (t = 0);
    return !!r_TimeSystem.TimeSystem.isNextDay(t);
  };
  _ctor.prototype.checkPlatformToRank = function () {
    return cc.sys.platform == cc.sys.BYTEDANCE_GAME || cc.sys.platform == cc.sys.WECHAT_GAME || window.ks;
  };
  return _ctor;
}();
exports._RankSystem = exp__RankSystem;
exports.RankSystem = new exp__RankSystem();