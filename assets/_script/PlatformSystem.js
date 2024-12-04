Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformSystem = exports._PlatformSystem = undefined;
var r_Config = require("Config");
var r_PlatformBytedance = require("PlatformBytedance");
var r_SDKMgr1 = require("SDKMgr1");
var r_TYIndex = require("TYIndex");
var r_MonopolyUI = require("MonopolyUI");
var r_SoundMgr = require("SoundMgr");
var r_AdPushSystem = require("AdPushSystem");
var r_BlockSystem = require("BlockSystem");
var r_HttpSystem = require("HttpSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp__PlatformSystem = function () {
  function _ctor() {
    this.isLocalMode = false;
    this.curPlatform = null;
    this._jjss = "1";
    this._jjs = "1";
    this._nzzy = "1";
    this._tiaoxi = "1";
    this._dafuweng = "1";
    this._yuebing = "1";
    this._daihuo = "1";
    this._shenhe = "1";
    this._jumpFish = "1";
    this.curTestGroup = 0;
    this.inWhiteList = false;
  }
  _ctor.prototype.isInWhiteList = function () {
    return this.inWhiteList;
  };
  _ctor.prototype.init = function () {
    console.log("cc.sys.platform =", cc.sys.platform);
    cc.sys.platform == cc.sys.BYTEDANCE_GAME && (this.curPlatform = r_PlatformBytedance.PlatformBytedance);
    this.curPlatform && this.curPlatform.init();
    this.curPlatform = r_SDKMgr1.SDKMgr1;
    r_TYIndex.Platform.isDarenPlatform() && exports.PlatformSystem.getLocation();
  };
  _ctor.prototype.showVideo = function (e, t, o) {
    if (r_PlayerData.PlayerData.data.newMonpolyData.freeCard > 0) {
      r_PlayerData.PlayerData.data.newMonpolyData.freeCard--;
      r_PlayerData.PlayerData.saveData();
      r_MonopolyUI.default.instance && r_MonopolyUI.default.instance.propShow();
      return void (t && (t(), r_UtilsSystem.UtilsSystem.showTip("使用无广卡抵消视频广告")));
    }
    this.setShowVideo(e, t, o);
  };
  _ctor.prototype.checkInWhiteList = function () {
    var e = this;
    r_TYIndex.Platform.isDarenPlatform() || r_PlayerData.PlayerData.data.openId && r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/api/baimingdan", {
      gameId: r_Config.default.gameId,
      uid: r_PlayerData.PlayerData.data.openId + ""
    }, function (t) {
      console.log("checkInWhiteList result=", t);
      e.inWhiteList = !!t;
    });
  };
  _ctor.prototype.addFreeCard = function (e) {
    if (e <= 0) {
      return console.error("num <= 0");
    } else if (r_PlayerData.PlayerData.data) {
      if (r_PlayerData.PlayerData.data.newMonpolyData) {
        r_PlayerData.PlayerData.data.newMonpolyData.freeCard += e;
        r_PlayerData.PlayerData.saveData();
        return void r_UtilsSystem.UtilsSystem.showTip("恭喜获得" + e + "张免广卡");
      } else {
        return console.error("PlayerData.data.newMonpolyData is null");
      }
    } else {
      return console.error("PlayerData.data is null");
    }
  };
  _ctor.prototype.setShowVideo = function (e, t, i) {
    if (exports.PlatformSystem.isInWhiteList()) {
      if (t) {
        console.log("白名单玩家");
        t();
      }
    } else if (this.curPlatform) {
      var n = {
        stage: e
      };
      exports.PlatformSystem.report("Video_click", n);
      if (r_PlayerData.PlayerData.data.isShowVideoOnce) {
        r_PlayerData.PlayerData.data.isShowVideoOnce = 0;
        n.time = Math.ceil(r_TimeSystem.TimeSystem.getOnlineDuration() / 60);
        exports.PlatformSystem.report("Monetization", n);
      }
      r_PlayerData.PlayerData.data.isCloseMusic || r_SoundMgr.SoundMgr.pauseMusic();
      r_AdPushSystem.AdPushSystem.showVideo();
      this.curPlatform.showRewardAd(function () {
        !r_PlayerData.PlayerData.data.isCloseMusic && r_SoundMgr.SoundMgr.curMusicName && r_SoundMgr.SoundMgr.resumeMusic();
        exports.PlatformSystem.report("Video_success", n);
        t && t();
        r_AdPushSystem.AdPushSystem.watchVideoEnd(true);
      }, function () {
        !r_PlayerData.PlayerData.data.isCloseMusic && r_SoundMgr.SoundMgr.curMusicName && r_SoundMgr.SoundMgr.resumeMusic();
        i && i();
        r_AdPushSystem.AdPushSystem.watchVideoEnd(false);
      }, function () {
        exports.PlatformSystem.report("Video_pull", n);
      });
    } else if (t) {
      t();
      r_TimeSystem.TimeSystem.scheduleOnce("showVideo", .5, function () {
        r_UtilsSystem.UtilsSystem.showTip("观看广告");
      });
    }
  };
  Object.defineProperty(_ctor.prototype, "isRecording", {
    get: function () {
      return this.curPlatform.isRecording;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.startRecorder = function () {
    console.log("录屏 startRecorder");
    this.curPlatform && this.curPlatform.startRecorder && this.curPlatform.startRecorder();
  };
  _ctor.prototype.hasShareVideo = function () {
    return !(!this.curPlatform || !this.curPlatform.hasShareVideo) && this.curPlatform.hasShareVideo();
  };
  _ctor.prototype.stopRecorder = function (e) {
    this.curPlatform && this.curPlatform.stopRecorder && this.curPlatform.stopRecorder(e);
  };
  _ctor.prototype.shareAppVideoMessage = function (e, t) {
    this.curPlatform && this.curPlatform.shareAppVideoMessage && this.curPlatform.shareAppVideoMessage(e, t);
  };
  _ctor.prototype.isPingbi = function () {};
  Object.defineProperty(_ctor.prototype, "jjss", {
    get: function () {
      this.curPlatform && null != this.curPlatform.jjss && (this._jjss = this.curPlatform.jjss);
      if (r_TYIndex.Platform.isDarenPlatform()) {
        return "1";
      } else {
        return this._jjss;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "jjs", {
    get: function () {
      this.curPlatform && null != this.curPlatform.jjs && (this._jjs = this.curPlatform.jjs);
      if (r_TYIndex.Platform.isDarenPlatform()) {
        return "1";
      } else {
        return this._jjs;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "nzzy", {
    get: function () {
      this.curPlatform && null != this.curPlatform.nzzy && (this._nzzy = this.curPlatform.nzzy);
      if (r_TYIndex.Platform.isDarenPlatform()) {
        return "1";
      } else {
        return this._nzzy;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "tiaoxi", {
    get: function () {
      this.curPlatform && null != this.curPlatform.tiaoxi && (this._tiaoxi = this.curPlatform.tiaoxi);
      return this._tiaoxi;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "dafuweng", {
    get: function () {
      this.curPlatform && null != this.curPlatform.dafuweng && (this._dafuweng = this.curPlatform.dafuweng);
      return this._dafuweng;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "yuebing", {
    get: function () {
      this.curPlatform && null != this.curPlatform.yuebing && (this._yuebing = this.curPlatform.yuebing);
      return this._yuebing;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "daihuo", {
    get: function () {
      this.curPlatform && null != this.curPlatform.daihuo && (this._daihuo = this.curPlatform.daihuo);
      return this._daihuo;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "shenhe", {
    get: function () {
      this.curPlatform && null != this.curPlatform.shenhe && (this._shenhe = this.curPlatform.shenhe);
      return this._shenhe;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "jumpFish", {
    get: function () {
      return this._jumpFish;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.getLocation = function () {
    console.log("liming getLocation");
    this.httpRequest("isPinbi", {
      game_id: r_Config.default.gameId,
      version: r_SDKMgr1.SDKMgr1.pingbiver
    }, function (e) {
      r_SDKMgr1.SDKMgr1.isHideCity = e;
      console.log("liming " + e);
      console.log("liming channelid " + r_SDKMgr1.SDKMgr1.isHideCity);
      if ("1" == e) {
        console.log("res&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        r_BlockSystem.BlockSystem.pingbiAll = true;
      } else {
        exports.PlatformSystem.checkPingbi();
      }
    });
  };
  _ctor.prototype.httpRequest = function (e, t, o) {
    undefined === t && (t = {});
    undefined === o && (o = null);
    var i = new XMLHttpRequest();
    i.onreadystatechange = function () {
      if (4 == i.readyState && 500 != i.status) {
        i.responseText;
        null != o && o(JSON.parse(i.responseText));
      } else {
        console.log(i);
      }
    };
    var n = "";
    var a = Object.entries(t || {});
    for (var s = 0; s < a.length; ++s) {
      null != a[s][1] && (n += a[s][0] + "=" + a[s][1] + "&");
    }
    var r = "https://wxxcx.tanyu.mobi:4443/admin/api/" + e + "?" + (n = n.substring(0, n.length - 1));
    i.open("GET", r, true);
    i.setRequestHeader("Access-Control-Allow-Origin", "*");
    i.send();
  };
  _ctor.prototype.checkPingbi = function () {
    var e = this;
    r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/api/adrate2", {
      gameId: r_Config.default.gameId,
      version: r_Config.default.gameVersion,
      openId: "1000"
    }, function (t) {
      console.log("HttpSystem responseJson=", t);
      if (t && t.rateJson) {
        var o = JSON.parse(t.rateJson);
        console.log("rateObj=", o);
        if (!o) {
          return;
        }
        var n = r_BlockSystem.BlockSystem.getPingbiKey();
        for (var a = 0; a < o.length; a++) {
          var s = o[a];
          if (s && s.rate && ("ipu" == s.key && (r_AdPushSystem.AdPushSystem.serverIpu = s.rate), "ecpm" == s.key && (r_AdPushSystem.AdPushSystem.serverEcpm = s.rate), "pvok" == s.key && (r_AdPushSystem.AdPushSystem.pvok = s.rate), "arpu" == s.key && (r_AdPushSystem.AdPushSystem.serverArpu = s.rate), "huichuan" == s.key && (r_AdPushSystem.AdPushSystem.serverHuichuan = Number(s.rate)), "jjss" == s.key && (r_Config.default.gameVersion == s.rate ? e._jjss = "0" : e._jjss = "1"), "jjs" == s.key && (r_Config.default.gameVersion == s.rate ? e._jjs = "0" : e._jjs = "1"), "nzzy" == s.key && (r_Config.default.gameVersion == s.rate ? e._nzzy = "0" : e._nzzy = "1"), "shenhe" == s.key && (r_Config.default.gameVersion == s.rate ? e._shenhe = "0" : e._shenhe = "1"), "tiaoxi" == s.key && (e._tiaoxi = s.rate), "dafuweng" == s.key && (e._dafuweng = s.rate), "yuebing" == s.key && (e._yuebing = s.rate), "daihuo" == s.key && (e._daihuo = s.rate), "jumpFish" == s.key && (e._jumpFish = s.rate), s.key == n)) {
            var r = s.rate.split(",");
            if (!r) {
              return;
            }
            if (r.length <= 0) {
              return;
            }
            console.log("pingbiguanka levelList=", r);
            for (var c = 0; c < r.length; c++) {
              var h = r[c];
              if (isNaN(Number(h))) {
                return;
              }
              r_BlockSystem.BlockSystem.blockTrickList.push(Number(h));
              r_BlockSystem.BlockSystem.blockTrickMap[Number(h)] = true;
            }
            console.log("屏蔽服务器玩法列表=", r_BlockSystem.BlockSystem.blockTrickList);
          }
        }
        r_BlockSystem.BlockSystem.isGetAdrate2 = true;
      }
    });
  };
  _ctor.prototype.report = function (e, t) {
    t = r_ReportSystem.ReportSystem.reportUserDay(t);
    console.log("发送埋点:" + e + " ", JSON.stringify(t));
    if (!window.ks && cc.sys.platform == cc.sys.WECHAT_GAME) {
      if (null == e || "" == e) {
        return;
      }
      for (var o in t) "number" == typeof t[o] && (t[o] = "" + t[o]);
      console.log("发送微信埋点:" + e + " ", t);
      return void wx.uma.trackEvent(e, t);
    }
    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      console.log("字节发送埋点:" + e + " " + t);
      r_PlatformBytedance.PlatformBytedance.report(e, t);
    } else {
      this.curPlatform && this.curPlatform.report && this.curPlatform.report(e, t);
    }
  };
  _ctor.prototype.needShowUid = function () {
    return !(!this.curPlatform || !this.curPlatform.needShowUid) && this.curPlatform.needShowUid();
  };
  _ctor.prototype.copyUserId = function () {
    this.curPlatform && this.curPlatform.copyUserId && this.curPlatform.copyUserId();
  };
  _ctor.prototype.canFollow = function () {
    return !(!this.curPlatform || !this.curPlatform.canFollow) && this.curPlatform.canFollow();
  };
  _ctor.prototype.follow = function (e) {
    if (this.curPlatform && this.curPlatform.follow) {
      return this.curPlatform.follow(e);
    }
  };
  _ctor.prototype.checkFollow = function (e) {
    if (this.curPlatform && this.curPlatform.checkFollow) {
      return this.curPlatform.checkFollow(e);
    }
  };
  _ctor.prototype.checkGetOpenId = function () {
    if (this.curPlatform && this.curPlatform.checkGetOpenId) {
      return this.curPlatform.checkGetOpenId();
    }
  };
  _ctor.prototype.checkGetUserId = function () {
    if (this.curPlatform && this.curPlatform.checkGetUserId) {
      return this.curPlatform.checkGetUserId();
    }
  };
  _ctor.prototype.isSupportFileData = function () {
    return !(!this.curPlatform || !this.curPlatform.isSupportFileData) && this.curPlatform.isSupportFileData();
  };
  _ctor.prototype.getPlayerData = function (e) {
    this.curPlatform && this.curPlatform.getPlayerData && this.curPlatform.getPlayerData(e);
  };
  _ctor.prototype.savePlayerData = function (e, t) {
    if (this.curPlatform && this.curPlatform.savePlayerData) {
      return this.curPlatform.savePlayerData(e, t);
    }
  };
  _ctor.prototype.isSupportServerData = function () {
    return !(!this.curPlatform || !this.curPlatform.isSupportServerData) && this.curPlatform.isSupportServerData();
  };
  _ctor.prototype.canJumpToSide = function () {
    return !(!this.curPlatform || !this.curPlatform.canJumpToSide) && this.curPlatform.canJumpToSide();
  };
  _ctor.prototype.navigateToScene = function () {
    console.log("navigateToScene");
    return !(!this.curPlatform || !this.curPlatform.navigateToScene) && this.curPlatform.navigateToScene();
  };
  _ctor.prototype.canShowSideGift = function () {
    return cc.sys.platform == cc.sys.BYTEDANCE_GAME && !(!r_PlayerData.PlayerData.data || !r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.getSideGiftTime));
  };
  _ctor.prototype.islaunchFromSide = function () {
    return !(!this.curPlatform || !this.curPlatform.islaunchFromSide) && this.curPlatform.islaunchFromSide();
  };
  _ctor.prototype.canShowDesk = function () {
    return cc.sys.platform == cc.sys.BYTEDANCE_GAME && !(!r_PlayerData.PlayerData.data || !r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.deskTopEntryTime));
  };
  _ctor.prototype.isSupportDesk = function () {
    return !(!this.curPlatform || !this.curPlatform.isSupportDesk) && this.curPlatform.isSupportDesk();
  };
  _ctor.prototype.checkDeskTopChanged = function () {
    return !(!this.curPlatform || !this.curPlatform.checkDeskTopChanged) && this.curPlatform.checkDeskTopChanged();
  };
  _ctor.prototype.collect = function () {
    if (this.curPlatform && this.curPlatform.collect) {
      return this.curPlatform.collect();
    }
  };
  _ctor.prototype.checkToDeskTop = function (e) {
    if (this.curPlatform && this.curPlatform.checkToDeskTop) {
      return this.curPlatform.checkToDeskTop(e);
    }
  };
  _ctor.prototype.checkAndroidPlatform = function () {
    return !this.curPlatform || !this.curPlatform.checkToDeskTop || !!r_PlatformBytedance.PlatformBytedance.IsAndroidPlatform;
  };
  _ctor.prototype.addToDeskTop = function (e) {
    if (this.curPlatform && this.curPlatform.addToDeskTop) {
      return this.curPlatform.addToDeskTop(e);
    }
  };
  Object.defineProperty(_ctor.prototype, "isAddToDeskTop", {
    get: function () {
      return !(cc.sys.platform != cc.sys.BYTEDANCE_GAME || !this.curPlatform || !this.curPlatform.addToDeskTop) && this.curPlatform.isAddToDeskTop;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.getNickName = function () {
    if (this.curPlatform && this.curPlatform.getNickName) {
      return this.curPlatform.getNickName();
    }
  };
  _ctor.prototype.getIsWebPlatform = function () {
    return cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER;
  };
  _ctor.prototype.setVibrate = function (e) {
    if (this.curPlatform && this.curPlatform.getNickName) {
      return this.curPlatform.vibrate(e);
    }
  };
  _ctor.prototype.checkGetTestGroup = function () {
    if (this.curTestGroup > 0) {
      return this.curTestGroup - 1;
    } else if (this.curPlatform && this.curPlatform.checkGetTestGroup) {
      return this.curPlatform.checkGetTestGroup();
    } else {
      return 0;
    }
  };
  return _ctor;
}();
exports._PlatformSystem = exp__PlatformSystem;
exports.PlatformSystem = new exp__PlatformSystem();