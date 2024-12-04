Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdPushSystem = exports._AdPushSystem = undefined;
var r_Config = require("Config");
var r_HttpSystem = require("HttpSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var exp__AdPushSystem = function () {
  function _ctor() {
    this.liantiao = 0;
    this.timeLimit = 604800;
    this.clickid = 0;
    this.clickidTime = 0;
    this.loginEcpm = 0;
    this.loginIpu = 0;
    this.loginArpu = 0;
    this.pvok = 0;
    this.serverEcpm = 1;
    this.serverIpu = 1;
    this.serverArpu = 0;
    this.serverHuichuan = 1;
    this.mAdRate = {};
    this.httpsAdress = "https://wxxcx.tanyu.mobi:4443/admin/api/";
  }
  _ctor.prototype.init = function () {
    this.getCurTimeStr();
    this.getEcpmLimit();
  };
  _ctor.prototype.testEcpm = function () {
    var e = JSON.parse('{"BaseResp":{"StatusCode":0,"StatusMessage":""},"data":{"records":[{"aid":"1128","cost":20383,"did":"****************","event_name":"send","event_time":"2023-05-16 22:08:29"},{"aid":"1128","cost":17352,"did":"****************","event_name":"send","event_time":"2023-05-16 22:09:41"}],"total":2},"err_msg":"","err_no":0,"log_id":"20230516221114DE442632BAC74A3D5062"}');
    this.checkData();
    if (e && e.data && e.data.records) {
      var t = e.data.records;
      if (!r_PlayerData.PlayerData.data.adPushMap.sumAdCost) {
        r_PlayerData.PlayerData.data.adPushMap.sumAdCost = 0;
        r_PlayerData.PlayerData.data.adPushMap.sumAdNum = 0;
      }
      r_PlayerData.PlayerData.data.adPushMap.costTime || (r_PlayerData.PlayerData.data.adPushMap.costTime = 0);
      for (var o = 0; o < t.length; o++) {
        var i = t[o];
        var n = new Date(i.event_time).getTime();
        console.log("info.event_time=", i.event_time);
        console.log("time=", n);
        if (n > r_PlayerData.PlayerData.data.adPushMap.costTime) {
          r_PlayerData.PlayerData.data.adPushMap.costTime = n;
          r_PlayerData.PlayerData.data.adPushMap.sumAdCost = r_PlayerData.PlayerData.data.adPushMap.sumAdCost + i.cost / 1e5;
          r_PlayerData.PlayerData.data.adPushMap.sumAdNum = r_PlayerData.PlayerData.data.adPushMap.sumAdNum + 1;
        }
      }
      console.log("PlayerData.data.adPushMap=", r_PlayerData.PlayerData.data.adPushMap);
    }
  };
  _ctor.prototype.getEcpmLimit = function () {};
  _ctor.prototype.setClickid = function (e, t) {
    console.log("setClickid id=", e);
    this.clickid = e;
    this.clickidTime = r_TimeSystem.TimeSystem.getServerTime();
    if (t.ecpm) {
      this.loginEcpm = t.ecpm;
      console.log("this.loginEcpm=", this.loginEcpm);
    }
    if (t.ipu) {
      this.loginIpu = t.ipu;
      console.log("this.loginIpu=", this.loginIpu);
    }
    if (t.arpu) {
      this.loginArpu = t.arpu;
      console.log("this.loginArpu=", this.loginArpu);
    }
    this.checkData();
  };
  _ctor.prototype.checkData = function () {
    console.log("checkData 1");
    if (r_PlayerData.PlayerData.data) {
      console.log("checkData 2");
      r_PlayerData.PlayerData.data.adPushMap || (r_PlayerData.PlayerData.data.adPushMap = {});
      console.log("checkData 3");
      if (!r_PlayerData.PlayerData.data.adPushMap.clickid) {
        console.log("checkData setClickId1=", this.clickid);
        if (this.clickid) {
          r_PlayerData.PlayerData.data.adPushMap.clickid = this.clickid;
          r_PlayerData.PlayerData.data.adPushMap.clickidTime = this.clickidTime;
          r_PlayerData.PlayerData.data.adPushMap.ecpm = 0;
          r_PlayerData.PlayerData.data.adPushMap.ipu = 0;
          r_PlayerData.PlayerData.data.adPushMap.sumAdCost = 0;
          r_PlayerData.PlayerData.data.adPushMap.sumAdNum = 0;
          r_PlayerData.PlayerData.data.adPushMap.loginEcpm = this.loginEcpm;
          r_PlayerData.PlayerData.data.adPushMap.loginIpu = this.loginIpu;
          r_PlayerData.PlayerData.data.adPushMap.loginArpu = this.loginArpu;
        } else {
          r_PlayerData.PlayerData.data.adPushMap.clickid = "1";
          r_PlayerData.PlayerData.data.adPushMap.isSendActive = true;
          r_PlayerData.PlayerData.data.adPushMap.isSendEcpm = true;
        }
      }
      this.loginArpu && (r_PlayerData.PlayerData.data.adPushMap.loginArpu = this.loginArpu);
    }
  };
  _ctor.prototype.updateServerData = function (e) {
    r_PlayerData.PlayerData.data.adPushMap || (r_PlayerData.PlayerData.data.adPushMap = {});
    if (!r_PlayerData.PlayerData.data.adPushMap.clickid) {
      if (e && e.clickid) {
        console.log("updateServerData setClickId1=", e.clickid);
        r_PlayerData.PlayerData.data.adPushMap.clickid = e.clickid;
        r_PlayerData.PlayerData.data.adPushMap.clickidTime = e.clickidTime;
        r_PlayerData.PlayerData.data.adPushMap.ecpm = e.ecpm;
        r_PlayerData.PlayerData.data.adPushMap.ipu = e.ipu;
        r_PlayerData.PlayerData.data.adPushMap.sumAdCost = e.sumAdCost;
        r_PlayerData.PlayerData.data.adPushMap.sumAdNum = e.sumAdNum;
        r_PlayerData.PlayerData.data.adPushMap.loginEcpm = e.loginEcpm;
        r_PlayerData.PlayerData.data.adPushMap.loginIpu = e.loginIpu;
        r_PlayerData.PlayerData.data.adPushMap.loginArpu = e.loginArpu;
      } else {
        console.log("updateServerData setClickId2=", this.clickid);
        if (this.clickid) {
          r_PlayerData.PlayerData.data.adPushMap.clickid = this.clickid;
          r_PlayerData.PlayerData.data.adPushMap.clickidTime = this.clickidTime;
          r_PlayerData.PlayerData.data.adPushMap.ecpm = 0;
          r_PlayerData.PlayerData.data.adPushMap.ipu = 0;
          r_PlayerData.PlayerData.data.adPushMap.sumAdCost = 0;
          r_PlayerData.PlayerData.data.adPushMap.sumAdNum = 0;
          r_PlayerData.PlayerData.data.adPushMap.loginEcpm = this.loginEcpm;
          r_PlayerData.PlayerData.data.adPushMap.loginIpu = this.loginIpu;
          r_PlayerData.PlayerData.data.adPushMap.loginArpu = this.loginArpu;
        } else {
          r_PlayerData.PlayerData.data.adPushMap.clickid = "1";
          r_PlayerData.PlayerData.data.adPushMap.isSendActive = true;
          r_PlayerData.PlayerData.data.adPushMap.isSendEcpm = true;
        }
      }
    }
  };
  _ctor.prototype.showVideo = function () {
    r_PlayerData.PlayerData.data.adPushMap && r_PlayerData.PlayerData.data.adPushMap.clickid && (!exports.AdPushSystem.liantiao && r_PlayerData.PlayerData.data.adPushMap.isSendEcpm || (exports.AdPushSystem.liantiao && (r_PlayerData.PlayerData.data.adPushMap.isSendEcpm = true, r_PlayerData.PlayerData.data.adPushMap.ecpm = 200, r_PlayerData.PlayerData.data.adPushMap.ipu = 5, this.sendEcpmEvent()), r_PlayerData.PlayerData.data.adPushMap.ipu = r_PlayerData.PlayerData.data.adPushMap.ipu + 1));
  };
  _ctor.prototype.getCurTimeStr = function () {
    var e = new Date();
    var t = e.getFullYear();
    var o = e.getMonth() + 1;
    var i = e.getDate();
    var n = e.getHours();
    o < 10 && (o = "0" + o);
    i < 10 && (i = "0" + i);
    n < 10 && (n = "0" + n);
    var a = t + "-" + o + "-" + i + "%20" + n;
    console.log("getCurTimeStr timeStr=", a);
    return a;
  };
  _ctor.prototype.watchVideoEnd = function (e) {
    var t = this;
    if (!r_PlayerData.PlayerData.data.adPushMap.isSendEcpm) {
      var o = this.getCurTimeStr();
      console.log("watchVideoEnd1 timeStr=", o);
      if (r_PlayerData.PlayerData.data.adPushMap) {
        console.log("watchVideoEnd2 timeStr=", o);
        if (r_PlayerData.PlayerData.data.adPushMap.clickid) {
          console.log("watchVideoEnd3 timeStr=", o);
          if (!(!e && this.pvok)) {
            console.log("watchVideoEnd4 timeStr=", o);
            setTimeout(function () {
              t.getEcpmFromServer(o);
            }, 6e4);
          }
        }
      }
    }
  };
  _ctor.prototype.isWorking = function () {
    return !(!r_PlayerData.PlayerData.data.adPushMap || !r_PlayerData.PlayerData.data.adPushMap.clickid || !r_PlayerData.PlayerData.data.adPushMap.clickidTime || r_TimeSystem.TimeSystem.getServerTime() - r_PlayerData.PlayerData.data.adPushMap.clickidTime > this.timeLimit);
  };
  _ctor.prototype.getEcpmFromServer = function (e) {
    var t = this;
    console.log("getEcpmFromServer1 timeStr=", e);
    if (r_PlayerData.PlayerData.data.openId) {
      if (this.isWorking()) {
        console.log("getEcpmFromServer2 timeStr=", e);
        r_HttpSystem.HttpSystem.Get(this.httpsAdress + "getBytedanceEcpm", {
          openId: r_PlayerData.PlayerData.data.openId,
          gameId: r_Config.default.gameId,
          timestr: e
        }, function (e) {
          console.log("getEcpmFromServer responseJson=", e);
          if (!r_PlayerData.PlayerData.data.adPushMap.isSendEcpm && e && e.data && e.data.records) {
            var o = e.data.records;
            if (!r_PlayerData.PlayerData.data.adPushMap.sumAdCost) {
              r_PlayerData.PlayerData.data.adPushMap.sumAdCost = 0;
              r_PlayerData.PlayerData.data.adPushMap.sumAdNum = 0;
            }
            r_PlayerData.PlayerData.data.adPushMap.costTime || (r_PlayerData.PlayerData.data.adPushMap.costTime = 0);
            r_PlayerData.PlayerData.data.adPushMap.fitNum || (r_PlayerData.PlayerData.data.adPushMap.fitNum = 0);
            var i = t.serverEcpm;
            r_PlayerData.PlayerData.data.adPushMap.loginEcpm && (i = r_PlayerData.PlayerData.data.adPushMap.loginEcpm);
            for (var n = 0; n < o.length; n++) {
              var s = o[n];
              var r = new Date(s.event_time).getTime();
              console.log("info.event_time=", s.event_time);
              console.log("time=", r);
              if (r > r_PlayerData.PlayerData.data.adPushMap.costTime) {
                r_PlayerData.PlayerData.data.adPushMap.costTime = r;
                console.log("info.cost=", s.cost);
                r_PlayerData.PlayerData.data.adPushMap.sumAdCost = r_PlayerData.PlayerData.data.adPushMap.sumAdCost + s.cost / 1e5;
                r_PlayerData.PlayerData.data.adPushMap.sumAdNum = r_PlayerData.PlayerData.data.adPushMap.sumAdNum + 1;
                s.cost / 100 >= i && (r_PlayerData.PlayerData.data.adPushMap.fitNum = r_PlayerData.PlayerData.data.adPushMap.fitNum + 1);
              }
            }
            r_PlayerData.PlayerData.data.adPushMap.sumAdNum && (r_PlayerData.PlayerData.data.adPushMap.ecpm = r_PlayerData.PlayerData.data.adPushMap.sumAdCost / r_PlayerData.PlayerData.data.adPushMap.sumAdNum * 1e3);
            console.log("当前sumAdCost=", r_PlayerData.PlayerData.data.adPushMap.sumAdCost);
            console.log("当前sumAdNum=", r_PlayerData.PlayerData.data.adPushMap.sumAdNum);
            console.log("当前ecpm=", r_PlayerData.PlayerData.data.adPushMap.ecpm);
            console.log("当前ipu=", r_PlayerData.PlayerData.data.adPushMap.ipu);
            console.log("this.serverEcpm=", t.serverEcpm);
            console.log("this.serverIpu=", t.serverIpu);
            console.log("PlayerData.data.adPushMap.loginEcpm=", r_PlayerData.PlayerData.data.adPushMap.loginEcpm);
            console.log("PlayerData.data.adPushMap.loginIpu=", r_PlayerData.PlayerData.data.adPushMap.loginIpu);
            var c = t.serverIpu;
            r_PlayerData.PlayerData.data.adPushMap.loginIpu && (c = r_PlayerData.PlayerData.data.adPushMap.loginIpu);
            var l = t.serverArpu;
            r_PlayerData.PlayerData.data.adPushMap.loginArpu && (l = r_PlayerData.PlayerData.data.adPushMap.loginArpu);
            t.loginArpu && (l = t.loginArpu);
            if (l && r_PlayerData.PlayerData.data.adPushMap.sumAdCost >= l) {
              var u = Math.random();
              if (t.serverHuichuan >= u) {
                t.sendEcpmEvent();
              } else {
                r_PlayerData.PlayerData.data.adPushMap.isSendEcpm = true;
              }
            }
            if (i && c && r_PlayerData.PlayerData.data.adPushMap.fitNum >= c) {
              u = Math.random();
              if (t.serverHuichuan >= u) {
                t.sendEcpmEvent();
              } else {
                r_PlayerData.PlayerData.data.adPushMap.isSendEcpm = true;
              }
            }
          }
        });
      } else {
        console.log("getEcpmFromServer2 not working");
      }
    }
  };
  _ctor.prototype.sendEcpmEvent = function () {
    var e = r_PlayerData.PlayerData.data.adPushMap;
    console.log("sendEcpmEvent adPushMap=", e);
    r_HttpSystem.HttpSystem.Get(this.httpsAdress + "sendBytedanceEcpmEvent", {
      gameid: r_Config.default.gameId,
      clickid: e.clickid,
      time: new Date().getTime(),
      ecpm: e.ecpm,
      ipu: e.ipu
    }, function (e) {
      console.log("sendEcpmEvent responseJson=", e);
      if (e && 0 === e.code) {
        console.log("sendEcpmEvent 成功");
        r_PlayerData.PlayerData.data.adPushMap.isSendEcpm = true;
      }
    });
  };
  _ctor.prototype.getActiveUserDate = function () {
    var e = new Date(new Date().getTime() - 1e3 * r_TimeSystem.TimeSystem.oneDaySecond);
    var t = e.getFullYear();
    var o = e.getMonth() + 1;
    var i = e.getDate();
    o < 10 && (o = "0" + o);
    i < 10 && (i = "0" + i);
    var n = t + "-" + o + "-" + i;
    console.log("getActiveUserDate timeStr=", n);
    return n;
  };
  _ctor.prototype.sendActiveMsg = function () {
    console.log("sendActiveMsg 1");
    r_HttpSystem.HttpSystem.Get(this.httpsAdress + "sendBytedanceActiveEvent", {
      clickid: r_PlayerData.PlayerData.data.adPushMap.clickid,
      time: new Date().getTime()
    }, function (e) {
      console.log("sendActive responseJson=", e);
      if (e && 0 === e.code) {
        console.log("sendActive 成功");
        r_PlayerData.PlayerData.data.adPushMap.isSendActive = true;
      }
    });
  };
  _ctor.prototype.sendActive = function () {
    var e = this;
    console.log("sendActive 1");
    if (r_PlayerData.PlayerData.data.adPushMap && (console.log("sendActive 2"), r_PlayerData.PlayerData.data.adPushMap.clickid && (console.log("sendActive 3"), r_PlayerData.PlayerData.data.openId && (console.log("sendActive 4"), exports.AdPushSystem.liantiao || !r_PlayerData.PlayerData.data.adPushMap.isSendActive)))) {
      var t = this.getActiveUserDate();
      r_HttpSystem.HttpSystem.Get(this.httpsAdress + "getBytedanceActiveUserInfo", {
        gameId: r_Config.default.gameId,
        openId: r_PlayerData.PlayerData.data.openId,
        date: t
      }, function (t) {
        console.log("getBytedanceActiveUserInfo responseJson=", t);
        if (t && t.data && t.data.active_user_infos) {
          for (var o = 0; o < t.data.active_user_infos.length; o++) {
            var i = t.data.active_user_infos[o];
            if (i.open_id == r_PlayerData.PlayerData.data.openId && 2 == i.new_source) {
              return void console.log("getBytedanceActiveUserInfo block");
            }
          }
        }
        e.sendActiveMsg();
      });
      console.log("sendActive 4");
    }
  };
  return _ctor;
}();
exports._AdPushSystem = exp__AdPushSystem;
exports.AdPushSystem = new exp__AdPushSystem();