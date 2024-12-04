Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdPushSystemKS = exports._AdPushSystemKS = undefined;
var r_Config = require("Config");
var r_HttpSystem = require("HttpSystem");
var r_TimeSystem = require("TimeSystem");
var exp__AdPushSystemKS = function () {
  function _ctor() {
    this.advertiserId = 24840992;
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
    this.isGetServerInfo = false;
    this.mAdRate = {};
    this.ecpmTime = 0;
    this.localData = null;
    this.localStorageKey = "localStorageAdPushKS";
    this.addIpuTime = 0;
  }
  _ctor.prototype.init = function () {
    this.localStorageKey = "localStorageAdPushKS" + r_Config.default.gameId;
    if (this.isKSPlatform()) {
      var e = ks.getLaunchOptionsSync();
      console.log("快手 lauchInfo=", e);
      if (e.query && e.query.callback) {
        exports.AdPushSystemKS.setClickid(e.query.callback, e.query);
        e.query.liantiao && (exports.AdPushSystemKS.liantiao = e.query.liantiao);
        e.query.pvok && (exports.AdPushSystemKS.pvok = e.query.pvok);
      }
      this.getCurTimeStr();
      this.initData();
    }
  };
  _ctor.prototype.checkGetOpenId = function () {
    if (!this.localData.openId) {
      console.log("快手登录 checkGetOpenId this.localData.openId=", this.localData.openId);
      if ("undefined" != typeof ks) {
        var e = this;
        this.localData.openId || ks.login({
          success: function (t) {
            console.log("快手登录 res.code=", t.code);
            r_HttpSystem.HttpSystem.Get(r_Config.default.httpsAdress + "getKSopenid", {
              gameId: r_Config.default.gameId,
              code: t.code
            }, function (t) {
              console.log("快手登录 getKSopenid responseJson=", t);
              if (t) {
                e.localData.openId = t.union_id;
                e.saveData();
              }
            });
          },
          fail: function (e) {
            console.error("快手登录失败 :", e);
          },
          complete: function () {
            console.log("login complete");
          }
        });
      } else {
        console.error("checkGetOpenId 不是在快手平台");
      }
    }
  };
  _ctor.prototype.initData = function () {
    var e = cc.sys.localStorage.getItem(this.localStorageKey);
    e && (this.localData = JSON.parse(e));
    this.localData || (this.localData = {});
    this.checkData();
    this.sendActive();
  };
  _ctor.prototype.saveData = function () {
    if (this.localData) {
      var e = JSON.stringify(this.localData);
      cc.sys.localStorage.setItem(this.localStorageKey, e);
    }
  };
  _ctor.prototype.isKSPlatform = function () {
    return "undefined" != typeof ks;
  };
  _ctor.prototype.getEcpmLimit = function (e) {
    for (var t = 0; t < e.length; t++) {
      var o = e[t];
      if (o && o.rate) {
        "ipu" == o.key && (this.serverIpu = o.rate);
        "ecpm" == o.key && (this.serverEcpm = o.rate);
        "pvok" == o.key && (this.pvok = o.rate);
        "arpu" == o.key && (this.serverArpu = o.rate);
      }
    }
    console.log("this.serverIpu=", this.serverIpu);
    console.log("this.serverEcpm=", this.serverEcpm);
  };
  _ctor.prototype.setClickid = function (e, t) {
    if (this.isKSPlatform()) {
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
      var o = 0;
      if (t.server) {
        o = t.server;
        console.log("server=", o);
      }
      this.checkData();
    }
  };
  _ctor.prototype.checkData = function () {
    if (this.isKSPlatform()) {
      console.log("checkData 1");
      if (this.localData) {
        console.log("checkData 2");
        this.localData.adPushMap || (this.localData.adPushMap = {});
        console.log("checkData 3");
        if (!this.localData.adPushMap.clickid) {
          console.log("checkData setClickId1=", this.clickid);
          this.localData.adPushMap.clickid = this.clickid;
          this.localData.adPushMap.clickidTime = this.clickidTime;
          this.localData.adPushMap.ecpm = 0;
          this.localData.adPushMap.ipu = 0;
          this.localData.adPushMap.sumAdCost = 0;
          this.localData.adPushMap.sumAdNum = 0;
          this.localData.adPushMap.loginEcpm = this.loginEcpm;
          this.localData.adPushMap.loginIpu = this.loginIpu;
          this.localData.adPushMap.loginArpu = this.loginArpu;
        }
        this.loginArpu && (this.localData.adPushMap.loginArpu = this.loginArpu);
        this.saveData();
      }
    }
  };
  _ctor.prototype.updateServerData = function (e) {
    if (this.isKSPlatform()) {
      this.localData.adPushMap || (this.localData.adPushMap = {});
      if (!this.localData.adPushMap.clickid) {
        if (e && e.clickid) {
          console.log("updateServerData setClickId1=", e.clickid);
          this.localData.adPushMap.clickid = e.clickid;
          this.localData.adPushMap.clickidTime = e.clickidTime;
          this.localData.adPushMap.ecpm = e.ecpm;
          this.localData.adPushMap.ipu = e.ipu;
          this.localData.adPushMap.sumAdCost = e.sumAdCost;
          this.localData.adPushMap.sumAdNum = e.sumAdNum;
          this.localData.adPushMap.loginEcpm = e.loginEcpm;
          this.localData.adPushMap.loginIpu = e.loginIpu;
          this.localData.adPushMap.loginArpu = e.loginArpu;
        } else {
          console.log("updateServerData setClickId2=", this.clickid);
          this.localData.adPushMap.clickid = this.clickid;
          this.localData.adPushMap.clickidTime = this.clickidTime;
          this.localData.adPushMap.ecpm = 0;
          this.localData.adPushMap.ipu = 0;
          this.localData.adPushMap.sumAdCost = 0;
          this.localData.adPushMap.sumAdNum = 0;
          this.localData.adPushMap.loginEcpm = this.loginEcpm;
          this.localData.adPushMap.loginIpu = this.loginIpu;
          this.localData.adPushMap.loginArpu = this.loginArpu;
        }
      }
    }
  };
  _ctor.prototype.showVideo = function () {
    console.log("AdPushSystemKS showVideo 11");
    if (this.isKSPlatform() && this.localData.adPushMap && this.localData.adPushMap.clickid && (exports.AdPushSystemKS.liantiao || !this.localData.adPushMap.isSendEcpm)) {
      if (exports.AdPushSystemKS.liantiao) {
        this.localData.adPushMap.isSendEcpm = true;
        this.localData.adPushMap.ecpm = 200;
        this.localData.adPushMap.ipu = 5;
        this.sendEcpmEvent();
      }
      var e = r_TimeSystem.TimeSystem.getServerTime();
      if (e - this.addIpuTime >= 2) {
        this.addIpuTime = e;
        this.localData.adPushMap.ipu = this.localData.adPushMap.ipu + 1;
      }
      this.saveData();
    }
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
  _ctor.prototype.getDayTimeStr = function () {
    var e = new Date();
    var t = e.getFullYear();
    var o = e.getMonth() + 1;
    var i = e.getDate();
    var n = e.getHours();
    o < 10 && (o = "0" + o);
    i < 10 && (i = "0" + i);
    n < 10 && (n = "0" + n);
    var a = t + "-" + o + "-" + i;
    console.log("getDayTimeStr timeStr=", a);
    return a;
  };
  _ctor.prototype.watchVideoEnd = function (e) {
    var t = this;
    console.log("watchVideoEnd isSuccess=", e);
    if (this.isKSPlatform() && !this.localData.adPushMap.isSendEcpm) {
      var o = this.getCurTimeStr();
      console.log("watchVideoEnd1 timeStr=", o);
      if (this.localData.adPushMap) {
        console.log("watchVideoEnd2 timeStr=", o);
        if (this.localData.adPushMap.clickid) {
          console.log("watchVideoEnd3 timeStr=", o);
          if (!(!e && this.pvok)) {
            console.log("watchVideoEnd4 timeStr=", o);
            setTimeout(function () {
              t.getEcpmFromServer();
            }, 6e4);
          }
        }
      }
    }
  };
  _ctor.prototype.isWorking = function () {
    if (this.isKSPlatform()) {
      return !(!this.localData.adPushMap || !this.localData.adPushMap.clickid || !this.localData.adPushMap.clickidTime || r_TimeSystem.TimeSystem.getServerTime() - this.localData.adPushMap.clickidTime > this.timeLimit);
    }
  };
  _ctor.prototype.getEcpmFromServer = function () {
    var e = this;
    if (this.isKSPlatform() && (console.log("getEcpmFromServer1 "), this.localData.openId)) {
      if (this.isWorking()) {
        var t = r_TimeSystem.TimeSystem.getServerTime();
        if (!(t - this.ecpmTime < 60)) {
          var o = this.getDayTimeStr();
          console.log("getEcpmFromServer2 timeStr=", o);
          this.ecpmTime = t;
          r_HttpSystem.HttpSystem.Get(r_Config.default.httpsAdress + "getKuaishouEcpm", {
            version: r_Config.default.gameVersion,
            openId: this.localData.openId,
            gameId: r_Config.default.gameId,
            timestr: o,
            advertiserId: this.advertiserId
          }, function (t) {
            console.log("getEcpmFromServer responseJson=", t);
            if (!e.localData.adPushMap.isSendEcpm && t && t.data && t.data.details) {
              var o = t.data.details;
              var i = e.serverEcpm;
              e.localData.adPushMap.loginEcpm && (i = e.localData.adPushMap.loginEcpm);
              var n = e.serverIpu;
              e.localData.adPushMap.loginIpu && (n = e.localData.adPushMap.loginIpu);
              var a = 0;
              var s = 0;
              var r = 0;
              for (var c = 0; c < o.length; c++) {
                var l = o[c];
                if (l.cost) {
                  a += l.cost;
                  s += 1;
                  var u = Number(l.cost);
                  u && u >= i && (r += 1);
                }
              }
              if (!s) {
                return;
              }
              var h = a / s;
              e.localData.adPushMap.ecpm = h;
              i && n && r >= n && e.sendEcpmEvent();
            }
          });
        }
      } else {
        console.log("getEcpmFromServer2 not working");
      }
    }
  };
  _ctor.prototype.sendEcpmEvent = function () {
    var e = this;
    if (this.isKSPlatform()) {
      var t = this.localData.adPushMap;
      console.log("sendEcpmEvent adPushMap=", t);
      r_HttpSystem.HttpSystem.Get(r_Config.default.httpsAdress + "sendKuaishouEcpmEvent", {
        version: r_Config.default.gameVersion,
        gameid: r_Config.default.gameId,
        clickid: t.clickid,
        time: new Date().getTime(),
        ecpm: t.ecpm,
        ipu: t.ipu
      }, function (t) {
        console.log("sendEcpmEvent responseJson=", t);
        if (t && 1 == t.result) {
          console.log("sendEcpmEvent 成功");
          e.localData.adPushMap.isSendEcpm = true;
          e.saveData();
        }
      });
    }
  };
  _ctor.prototype.sendActive = function () {
    var e = this;
    if (this.isKSPlatform()) {
      console.log("sendActive 1");
      if (this.localData.adPushMap) {
        console.log("sendActive 2");
        if (this.localData.adPushMap.clickid) {
          console.log("sendActive 3");
          if (!(!exports.AdPushSystemKS.liantiao && this.localData.adPushMap.isSendActive)) {
            console.log("sendActive 4");
            r_HttpSystem.HttpSystem.Get(r_Config.default.httpsAdress + "sendKuaishouActiveEvent", {
              version: r_Config.default.gameVersion,
              gameid: r_Config.default.gameId,
              clickid: this.localData.adPushMap.clickid,
              time: new Date().getTime()
            }, function (t) {
              console.log("sendActive responseJson=", t);
              if (t && 1 == t.result) {
                console.log("sendActive 成功");
                e.localData.adPushMap.isSendActive = true;
                e.saveData();
              }
            });
          }
        }
      }
    }
  };
  return _ctor;
}();
exports._AdPushSystemKS = exp__AdPushSystemKS;
exports.AdPushSystemKS = new exp__AdPushSystemKS();