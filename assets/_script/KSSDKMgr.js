Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KSSDKMgr = undefined;
var r_Config = require("Config");
var r_HttpSystem = require("HttpSystem");
var r_PlayerData = require("PlayerData");
var r_AdPushSystemKS = require("AdPushSystemKS");
var r_UtilsSystem = require("UtilsSystem");
var exp_KSSDKMgr = function () {
  function _ctor() {}
  _ctor.getNickName = function () {
    return this.nickName;
  };
  _ctor.init = function () {
    if ("undefined" != typeof ks) {
      this.initSystemInfo();
      this.checkPingbi();
      this.initRecorder();
      this.initRewardVideo();
    } else {
      console.error("不是在快手平台");
    }
  };
  _ctor.initSystemInfo = function () {
    if ("undefined" == typeof ks) {
      console.error("不是在快手平台");
      return void (this.sysInfo = {
        platform: "web"
      });
    }
    ks.getSystemInfo({
      success: function (t) {
        console.log("sysInfo------------");
        console.log(t.model);
        console.log(t.pixelRatio);
        console.log(t.windowWidth);
        console.log(t.windowHeight);
        console.log(t.language);
        console.log(t.version);
        console.log(t.platform);
        _ctor.sysInfo = t;
      }
    });
  };
  Object.defineProperty(_ctor, "IsAndroidPlatform", {
    get: function () {
      return "undefined" != typeof ks && "android" == this.sysInfo.platform;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.checkClientUpdate = function () {
    if ("undefined" != typeof ks) {
      console.log("检查小游戏更新");
      if (ks.getUpdateManager) {
        var e = ks.getUpdateManager();
        e.onUpdateReady(function () {
          ks.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启小游戏？",
            success: function (t) {
              console.log("checkClientUpdate res=", t);
              t.confirm && e.applyUpdate();
            }
          });
        });
      }
    } else {
      console.error("不是在快手平台");
    }
  };
  _ctor.showVideo = function (e, t, o) {
    if (null == this.rewardedVideoAd) {
      e && e();
    } else {
      this.onVideoReward = e;
      this.onVideoClose = t;
      this.onVideoLoad = o;
      this.rewardedVideoAd.show().then(function () {
        return console.log("激励视频 广告显示");
      });
    }
  };
  _ctor.startRecorder = function () {
    null == this.recorder || this.isRecordering || this.recorder.start();
  };
  _ctor.stopRecorder = function () {
    this.recorder && this.isRecordering && this.recorder.stop();
  };
  _ctor.shareAppVideoMessage = function (e, t) {
    this.recorder.publishVideo({
      video: this.recorderVideoId,
      callback: function (o) {
        if (null != o && null != o) {
          console.log("分享录屏失败: " + JSON.stringify(o));
          return void (t && t());
        }
        console.log("分享录屏成功");
        e && e();
      }
    });
  };
  _ctor.hasShareVideo = function () {
    return null != this.recorderVideoId;
  };
  _ctor.initRewardVideo = function () {
    var e = this;
    this.rewardedVideoAd = ks.createRewardedVideoAd({
      adUnitId: this.videoAdUnitId
    });
    this.rewardedVideoAd.onError(function (e) {
      console.log(e);
    });
    this.rewardedVideoAd.onLoad(function (t) {
      console.log("rewardedVideoAd onLoad err=", t);
      e.onVideoLoad && e.onVideoLoad();
    });
    this.rewardedVideoAd.onClose(function (t) {
      if (t && t.isEnded || undefined === t) {
        e.onVideoReward && e.onVideoReward();
      } else {
        e.onVideoClose && e.onVideoClose();
      }
      e.onVideoReward = null;
      e.onVideoClose = null;
    });
  };
  _ctor.initRecorder = function () {
    var e = this;
    this.recorder = ks.getGameRecorder();
    this.recorder.on("start", function () {
      console.log("开始录制");
      e.recorderVideoId = null;
      e.isRecordering = true;
    });
    this.recorder.on("error", function (t) {
      console.log("录制过程中出现异常:", t);
      e.recorderVideoId = null;
      e.isRecordering = false;
    });
    this.recorder.on("stop", function (t) {
      if (t && t.videoID) {
        console.log("录屏停止，录制成功,videoID is " + t.videoID);
        e.recorderVideoId = t.videoID;
      } else {
        console.log("录屏停止，录制失败");
      }
      e.isRecordering = false;
    });
  };
  _ctor.checkPingbi = function () {
    var e = this;
    var t = "https://wxxcx.tanyu.mobi:4443/admin/api/isPinbi?gameId=" + r_Config.default.gameId + "&version=" + this.version;
    this.httpGet(t, function (t) {
      t && (e.isPingbi = 1 == t);
      console.log("isPingbi:", t, e.isPingbi);
    });
  };
  _ctor.httpGet = function (e, t) {
    var o = new XMLHttpRequest();
    o.onreadystatechange = function () {
      if (4 == o.readyState) {
        if (o.status >= 200 && o.status < 400) {
          var e = o.responseText;
          if (e) {
            var i = JSON.parse(e);
            t(i);
          } else {
            console.log("HttpSystem 返回数据不存在");
            t(false);
          }
        } else {
          console.log("HttpSystem 请求失败");
          t(false);
        }
      }
    };
    o.open("GET", e, true);
    o.send();
  };
  _ctor.checkGetOpenId = function () {
    if ("undefined" != typeof ks) {
      console.log("快手登录 checkGetOpenId PlayerData.data.openId=", r_PlayerData.PlayerData.data.openId);
      r_PlayerData.PlayerData.data.openId || ks.login({
        success: function (t) {
          console.log("快手登录 res.code=", t.code);
          r_HttpSystem.HttpSystem.Get(r_Config.default.httpsAdress + "getKSopenid", {
            gameId: r_Config.default.gameId,
            code: t.code
          }, function (t) {
            console.log("快手登录 getKSopenid responseJson=", t);
            if (t) {
              r_PlayerData.PlayerData.data.openId = t.union_id;
              r_PlayerData.PlayerData.setOpenId(t.union_id);
              _ctor.checkGetUserId();
              r_AdPushSystemKS.AdPushSystemKS.localData.openId = r_PlayerData.PlayerData.data.openId;
              r_AdPushSystemKS.AdPushSystemKS.saveData();
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
  };
  _ctor.checkGetUserId = function () {
    console.log("进入检测userid");
    !r_PlayerData.PlayerData.data.userId && r_PlayerData.PlayerData.data.openId && _ctor.authorize();
  };
  _ctor.authorize = function () {
    if ("undefined" != typeof ks) {
      console.log("进行授权");
      ks.authorize({
        scope: "scope.userInfo",
        success: function () {
          console.log("授权成功");
          ks.getUserInfo({
            withCredentials: false,
            success: function (t) {
              console.log("用户信息: ", t);
              _ctor.gameLogin(true, null, t);
            },
            fail: function (e) {
              console.error("获取用户信息失败 :", e);
            }
          });
        },
        fail: function (e) {
          console.error("授权失败 :", e);
        },
        complete: function () {
          console.log("授权完成");
        }
      });
    } else {
      console.error("checkGetOpenId 不是在快手平台");
    }
  };
  _ctor.gameLogin = function (t, o, s) {
    var r = r_PlayerData.PlayerData.data.openId;
    var c = 1;
    var l = "";
    var u = "";
    if (t) {
      c = s.userInfo.gender;
      if (!c) {
        c = 1;
      }
      l = s.userInfo.nickName;
      u = s.userInfo.avatarUrl;
      _ctor.nickName = l;
    }
    r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/login", {
      openid: r_Config.default.gameId + "_" + r,
      gender: c,
      nickname: l,
      avatarUrl: u
    }, function (e) {
      console.log("userId login result=", e);
      if (e) {
        var t = e.id;
        t && r_PlayerData.PlayerData.setUserId(t);
      }
    });
  };
  _ctor.isSupportDesk = function () {
    return !!window.ks;
  };
  _ctor.addToDeskTop = function (e) {
    if (this.isAddToDeskTop) {
      r_UtilsSystem.UtilsSystem.showTip("已经添加到桌面~");
    } else {
      this.addShortcut(e, function () {});
    }
  };
  _ctor.addShortcut = function (e) {
    var t = this;
    ks.addShortcut({
      success: function () {
        console.log("添加桌面成功");
        t.isAddToDeskTop = true;
        e && e();
      },
      fail: function (e) {
        if (-10005 === e.code) {
          r_UtilsSystem.UtilsSystem.showTip("暂不支持该功能");
        } else {
          r_UtilsSystem.UtilsSystem.showTip("添加桌面失败", e.msg);
        }
      }
    });
  };
  _ctor.checkToDeskTop = function (e) {
    var t = this;
    console.log("checkToDeskTop");
    this.checkShortcut(function () {
      if (t.isAddToDeskTop) {
        r_UtilsSystem.UtilsSystem.showTip("已经添加到桌面~");
        return void console.log("已经添加到桌面~");
      }
      e && e();
    });
  };
  _ctor.checkShortcut = function (e) {
    var t = this;
    if (this.IsAndroidPlatform) {
      if (this.sysInfo.platform) {
        ks.checkShortcut({
          success: function (o) {
            console.log("checkShortcut success res=", o);
            o.installed && (t.isAddToDeskTop = true);
            e && e();
          },
          fail: function (e) {
            if (-10005 === e.code) {
              r_UtilsSystem.UtilsSystem.showTip("暂不支持该功能");
            } else {
              r_UtilsSystem.UtilsSystem.showTip("检查快捷方式失败");
            }
          }
        });
      } else {
        console.log("checkShortcut needAddDeskTop3");
      }
    }
  };
  _ctor.checkAndroidPlatform = function () {
    return !this.checkToDeskTop || !!_ctor.IsAndroidPlatform;
  };
  _ctor.isPingbi = true;
  _ctor.version = "1.0.0";
  _ctor.appId = "ks694398770717676137";
  _ctor.videoAdUnitId = "2300005969_01";
  _ctor.isAddToDeskTop = false;
  _ctor.nickName = "";
  _ctor.isRecordering = false;
  return _ctor;
}();
exports.KSSDKMgr = exp_KSSDKMgr;