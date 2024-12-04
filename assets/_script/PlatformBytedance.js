Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ByteSceneValue = exports.PlatformBytedance = exports._PlatformBytedance = undefined;
var i;
var r_Config = require("Config");
var r_ADMgr = require("ADMgr");
var r_AdPushSystem = require("AdPushSystem");
var r_HttpSystem = require("HttpSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_MainHomeUI = require("MainHomeUI");
var exp__PlatformBytedance = function () {
  function _ctor() {
    this.inWhiteList = false;
    this.isPingbi = false;
    this.GameId = "1173";
    this.APIVersion = "1.0.1";
    this.VideoAdPos = "6a02inlagrs1e3c44i";
    this.BannerId = "";
    this.ShareId = "e4rs6emjgd318ehlvx";
    this.InterstitialId = "大哥逆袭记";
    this.ShareVideoTitle = "大哥逆袭记";
    this.ShareVideoDesc = "大哥逆袭记";
    this.ShareVideoTopic = ["大哥逆袭记"];
    this.RecorderDuration = 300;
    this.ClipVideoTime = 30;
    this.MinVideoTime = 5;
    this.isAddToDeskTop = false;
    this.onStopCallBack = null;
    this.jjss = "1";
    this.jjs = "1";
    this.nzzy = "1";
    this.supportJumpToSide = false;
    this.tiaoxi = "1";
    this.dafuweng = "1";
    this.yuebing = "1";
    this.daihuo = "1";
    this.appInfoSync = null;
    this.isShowFromSide = false;
    this.isRecording = false;
    this.daren_channelid = 0;
    this.daren_channel = "";
    this.daren_scene = null;
    this.playerDataFilePath = "ttfile://user/1090Data";
  }
  _ctor.prototype.init = function () {
    this.update();
    1016 != r_Config.default.gameId && (this.playerDataFilePath = "ttfile://user/" + r_Config.default.gameId + "Data");
    this.initSysInfo();
    this.getLaunchOptionsSync();
    this.initRewardVideo();
    this.initRecorder();
  };
  _ctor.prototype.getUserId = function (e, t) {
    var o = this;
    var i = function (t, i, a) {
      var s = r_PlayerData.PlayerData.data.openId;
      var l = 1;
      var u = "";
      var h = "";
      if (t) {
        l = a.userInfo.gender;
        if (!l) {
          l = 1;
        }
        u = a.userInfo.nickName;
        h = a.userInfo.avatarUrl;
        o.nickName = u;
      }
      r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/login", {
        openid: r_Config.default.gameId + "_" + s,
        gender: l,
        nickname: u,
        avatarUrl: h
      }, function (t) {
        console.log("userId login result=", t);
        if (t) {
          var o = t.id;
          if (o) {
            r_PlayerData.PlayerData.setUserId(o);
            e && e();
          }
        }
      });
    };
    tt.login({
      force: true,
      success: function (e) {
        var o;
        var a;
        console.log("login res=", e);
        console.log("login 调用成功" + e.code + " " + e.anonymousCode);
        o = e.code;
        a = function () {
          t && t();
          tt.getUserInfo({
            withCredentials: true,
            success: function (t) {
              console.log("getUserInfo 调用成功 " + t.userInfo);
              i(true, e.code, t);
            },
            fail: function (t) {
              console.log("getUserInfo 调用失败");
              i(false, e.code, t);
            }
          });
        };
        if (r_PlayerData.PlayerData.data.openId) {
          a();
        } else {
          r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/api/getopenid2", {
            gameId: r_Config.default.gameId,
            code: o
          }, function (e) {
            console.log("getUserId getopenid2 responseJson=", e);
            if (e) {
              r_PlayerData.PlayerData.setOpenId(e.openid);
              a();
            }
          });
        }
      },
      fail: function () {
        console.log("login 调用失败");
      }
    });
  };
  _ctor.prototype.getNickName = function () {
    return this.nickName;
  };
  _ctor.prototype.canFollow = function () {
    console.log("this.sysInfo.appName: ", this.sysInfo.appName);
    return "Douyin" == this.sysInfo.appName || "douyin_lite" == this.sysInfo.appName;
  };
  _ctor.prototype.follow = function (e) {
    tt.openAwemeUserProfile({
      success: e
    });
  };
  _ctor.prototype.checkFollow = function (e) {
    tt.checkFollowAwemeState({
      success: e
    });
  };
  _ctor.prototype.isInWhiteList = function () {
    return this.inWhiteList;
  };
  _ctor.prototype.checkInWhiteList = function () {
    var e = this;
    r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/api/baimingdan", {
      gameId: r_Config.default.gameId,
      uid: r_PlayerData.PlayerData.data.userId + ""
    }, function (t) {
      console.log("checkInWhiteList result=", t);
      e.inWhiteList = !!t;
    });
  };
  _ctor.prototype.checkGetOpenId = function () {
    console.log("checkGetOpenId 1=", r_PlayerData.PlayerData.data.openId);
    if (!r_PlayerData.PlayerData.data.openId) {
      console.log("checkGetOpenId 2");
      this.getUserId(function () {}, function () {
        console.log("checkGetOpenId checkUpdateOrUploadData");
        r_HttpSystem.HttpSystem.checkUpdateOrUploadData();
      });
    }
  };
  _ctor.prototype.checkGetUserId = function () {
    console.log("checkGetUserId 1=", r_PlayerData.PlayerData.data.userId);
    if (!r_PlayerData.PlayerData.data.userId) {
      console.log("checkGetUserId 2");
      this.getUserId(function () {});
    }
  };
  _ctor.prototype.getOpenId = function () {
    tt.login({
      force: true,
      success: function (e) {
        console.log("login res=", e);
        console.log("login 调用成功" + e.code + " " + e.anonymousCode);
        r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/api/getopenid2", {
          gameId: r_Config.default.gameId,
          code: e.code
        }, function (e) {
          console.log("getopenid2 responseJson=", e);
          if (e) {
            var t = e.openid;
            r_PlayerData.PlayerData.data.openId = t;
            r_PlayerData.PlayerData.setOpenId(t);
            r_HttpSystem.HttpSystem.checkUpdateOrUploadData();
          }
        });
      },
      fail: function () {
        console.log("login 调用失败");
      }
    });
  };
  _ctor.prototype.needShowUid = function () {
    return !!r_PlayerData.PlayerData.data.userId;
  };
  _ctor.prototype.copyUserId = function () {
    this.isTTPlatform && r_PlayerData.PlayerData.data.userId && tt.setClipboardData({
      data: "" + r_PlayerData.PlayerData.data.userId,
      success: function () {
        r_UtilsSystem.UtilsSystem.showTip("id拷贝成功");
      },
      fail: function () {
        r_UtilsSystem.UtilsSystem.showTip("id拷贝失败");
      }
    });
  };
  _ctor.prototype.initSysInfo = function () {
    var e = this;
    if (this.isTTPlatform) {
      this.sysInfo = tt.getSystemInfoSync();
      console.log("this.sysInfo=", this.sysInfo);
      var t = tt.getLaunchOptionsSync();
      console.log("lauchInfo=", t);
      if (t.query && t.query.clickid) {
        r_AdPushSystem.AdPushSystem.setClickid(t.query.clickid, t.query);
        t.query.liantiao && (r_AdPushSystem.AdPushSystem.liantiao = t.query.liantiao);
        t.query.pvok && (r_AdPushSystem.AdPushSystem.pvok = t.query.pvok);
      }
      console.log("调用tt.onShow");
      tt.onShow(function (t) {
        console.log("启动参数如下：", t.query);
        console.log("来源信息如下：", t.refererInfo);
        console.log("场景值信息如下：", t.scene);
        r_MainHomeUI.default.instance && r_MainHomeUI.default.instance.refreshGiftBtn();
        r_MainHomeUI.default.instance && r_MainHomeUI.default.instance.refreshDeskBtn();
        e.daren_scene = t.scene;
        ("homepage" === t.launch_from || "homepage" === t.launchFrom) && t.location;
        e.appInfoSync = tt.getAppInfoSync();
      });
      this.appInfoSync = tt.getAppInfoSync();
      console.log("appInfoSync=", this.appInfoSync);
      "Douyin" == this.sysInfo.appName && tt.checkScene && tt.checkScene({
        scene: "sidebar",
        success: function (t) {
          e.supportJumpToSide = true;
          console.log("check scene success: ", t.isExist);
        },
        fail: function (e) {
          console.log("check scene fail:", e);
        }
      });
    }
  };
  _ctor.prototype.navigateToScene = function () {
    console.log("tt.navigateToScene");
    tt.navigateToScene({
      scene: "sidebar",
      success: function () {
        console.log("navigate to scene success");
      },
      fail: function (e) {
        console.log("navigate to scene fail: ", e);
      }
    });
  };
  _ctor.prototype.canJumpToSide = function () {
    return this.supportJumpToSide && tt.navigateToScene;
  };
  _ctor.prototype.islaunchFromSide = function () {
    if (this.daren_scene) {
      return this.daren_scene == i.抖极侧边栏 || this.daren_scene == i.抖音侧边栏 || this.daren_scene == i.测试侧边栏;
    } else {
      console.log("no daren_scene");
      return false;
    }
  };
  _ctor.prototype.initInterstitial = function () {
    var e = this;
    if (this.isTTPlatform) {
      if ("Douyin" == this.sysInfo.appName) {
        this.interstitialAd = tt.createInterstitialAd({
          adUnitId: this.InterstitialId
        });
        this.interstitialAd.onLoad(function () {
          console.log("插屏广告加载成功");
        });
        this.interstitialAd.onError(function (e) {
          console.log("插屏广告加载失败:", e);
        });
        this.interstitialAd.onClose(function () {
          e.interstitialAd.load();
        });
        this.interstitialAd.load();
      } else {
        console.log("插屏广告仅今日头条安卓客户端支持");
      }
    }
  };
  _ctor.prototype.initRewardVideo = function () {
    var e = this;
    if (this.isTTPlatform && tt.createRewardedVideoAd) {
      this.adRewardVideo = tt.createRewardedVideoAd({
        adUnitId: this.VideoAdPos
      });
      this.adRewardVideo.onClose(function (t) {
        if (t && t.isEnded || undefined === t) {
          if (e.onVideoRewardHandler) {
            e.onVideoRewardHandler();
            e.onVideoRewardHandler = null;
          }
        } else {
          e.onVideoCloseHandler && e.onVideoCloseHandler();
          e.showToast("视频未看完");
        }
      });
      this.adRewardVideo.onError(function (t) {
        console.log("激励视频加载失败", JSON.stringify(t));
        e.onVideoCloseHandler && e.onVideoCloseHandler();
        r_UtilsSystem.UtilsSystem.showTip("拉取广告时会受到广告内部策略控制，广告平台会为当前用户推荐最适合展示的广告，当前无合适广告即不会展示");
      });
    }
  };
  _ctor.prototype.initRecorder = function () {
    var e = this;
    if (this.isTTPlatform) {
      this.videoRecorder = tt.getGameRecorderManager();
      this.videoRecorder.onStart(function (t) {
        e.isRecording = true;
        console.log("录屏开始", t);
        e.startRecorderTime = new Date().getTime();
      });
      this.videoRecorder.onStop(function (t) {
        e.isRecording = false;
        e.videoPath = null;
        var o = t.videoPath;
        var i = new Date().getTime();
        e.MinVideoTime || (e.MinVideoTime = 5);
        console.log("录屏结束,时常：" + (i - e.startRecorderTime) / 1e3 + "s,videoPath：" + e.videoPath);
        if (i - e.startRecorderTime < 1e3 * e.MinVideoTime) {
          e.videoPath = null;
        } else {
          e.videoRecorder.clipVideo({
            path: o,
            timeRange: [e.ClipVideoTime, 0],
            success: function (t) {
              console.log("录屏成功地址：", t);
              e.videoPath = t.videoPath;
              e.onStopCallBack && e.onStopCallBack(true);
            },
            fail: function (t) {
              e.videoPath = null;
              console.log("剪辑视频失败：", t);
              e.onStopCallBack && e.onStopCallBack(false);
            }
          });
        }
      });
    }
  };
  _ctor.prototype.hasShareVideo = function () {
    return !!this.videoPath;
  };
  _ctor.prototype.showToast = function (e) {
    this.isTTPlatform && tt.showToast({
      title: e,
      duration: 2e3,
      icon: "none"
    });
  };
  _ctor.prototype.setVibrate = function (e) {
    if (this.isTTPlatform) {
      if (e > 200) {
        tt.vibrateLong({
          success: function () {},
          fail: function (e) {
            console.log("长震动失败:", e);
          },
          complete: function () {}
        });
      } else {
        tt.vibrateShort({
          success: function () {},
          fail: function (e) {
            console.log("短震动失败:", e);
          },
          complete: function () {}
        });
      }
    }
  };
  _ctor.prototype.showVideo = function (e, t, o) {
    var i = this;
    if (this.isTTPlatform) {
      this.onVideoRewardHandler = e;
      this.onVideoCloseHandler = t;
      this.adRewardVideo.show().then(function () {
        console.log("广告显示成功");
        o && o();
        null != i.daren_channel && null != i.daren_channelid && r_ADMgr.default.Ins.darenshangbao(i.daren_channel, i.daren_channelid);
      }).catch(function (e) {
        console.log("广告组件出现问题", e);
        i.adRewardVideo.load().then(function () {
          o && o();
          i.adRewardVideo.show().then(function () {
            null != i.daren_channel && null != i.daren_channelid && r_ADMgr.default.Ins.darenshangbao(i.daren_channel, i.daren_channelid);
          }).catch(function () {
            i.onVideoCloseHandler && i.onVideoCloseHandler();
          });
        });
      });
    } else {
      e && e();
    }
  };
  _ctor.prototype.showInterstitial = function () {
    null != this.interstitialAd && this.interstitialAd.show();
  };
  _ctor.prototype.startRecorder = function () {
    null != this.videoRecorder && (this.isRecording || this.videoRecorder.start({
      duration: this.RecorderDuration
    }));
  };
  _ctor.prototype.stopRecorder = function (e) {
    if (null != this.videoRecorder) {
      this.onStopCallBack = e;
      this.isRecording && this.videoRecorder.stop();
    }
  };
  Object.defineProperty(_ctor.prototype, "isTTPlatform", {
    get: function () {
      var e = true;
      "undefined" == typeof tt && (e = false);
      return e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "IsAndroidPlatform", {
    get: function () {
      return "android" == this.sysInfo.platform;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.shareAppVideoMessage = function (e, t) {
    var o = this;
    this.shareVedioSuc = e;
    this.shareVedioFail = t;
    if (null == this.videoRecorder) {
      this.showToast("暂无视频");
      if (this.shareVedioFail) {
        this.shareVedioFail();
        this.shareVedioFail = null;
      }
      return void (this.shareVedioSuc = null);
    }
    if (null != this.videoPath) {
      var i = this.daren_channelid && "qrcode" == this.daren_channel ? "channel=share&channelid=" + this.daren_channelid : "";
      tt.shareAppMessage({
        channel: "video",
        title: this.ShareVideoTitle,
        desc: this.ShareVideoDesc,
        imageUrl: "",
        templateId: this.ShareId,
        query: i,
        extra: {
          videoPath: this.videoPath,
          videoTopics: this.ShareVideoTopic,
          hashtag_list: this.ShareVideoTopic
        },
        success: function () {
          if (o.shareVedioSuc) {
            o.shareVedioSuc();
            o.shareVedioSuc = null;
          }
          console.log("分享视频成功");
          o.shareVedioFail = null;
        },
        fail: function (e) {
          console.log("分享视频失败", e);
          if (o.shareVedioFail) {
            o.shareVedioFail();
            o.shareVedioFail = null;
          }
          o.shareVedioSuc = null;
        }
      });
    } else {
      if (this.shareVedioFail) {
        this.shareVedioFail();
        this.shareVedioFail = null;
      }
      this.shareVedioSuc = null;
      console.log("没有视频");
      this.showToast("录屏太短");
    }
  };
  _ctor.prototype.report = function (e, t) {
    tt.reportAnalytics(e, t);
  };
  _ctor.prototype.checkDeskTopChanged = function () {
    if (this.daren_scene) {
      return this.daren_scene == i.抖极桌面 || this.daren_scene == i.抖音桌面 || this.daren_scene == i.测试桌面;
    } else {
      console.log("no daren_scene");
      return false;
    }
  };
  _ctor.prototype.getLaunchOptionsSync = function () {
    var e = this;
    if (this.isTTPlatform) {
      var t = tt.getLaunchOptionsSync();
      console.log(t);
      this.daren_scene = t.scene;
      console.log("场景值: ", t.scene);
      var o = localStorage.getItem("game_query");
      this.daren_channelid = 0;
      this.daren_channel = "";
      if ("" != t.query) {
        o = t.query;
        localStorage.setItem("game_query", o);
        this.daren_channelid = o.channelid;
        this.daren_channel = o.channel;
        null != this.daren_channel && null != this.daren_channelid && r_ADMgr.default.Ins.getDaren(o.channel, o.channelid);
      }
      if (!o) {
        console.log(o);
        if (o && o.channelid) {
          this.daren_channelid = o.channelid;
          this.daren_channel = o.channel;
        }
      }
      var i = this.daren_channelid && "qrcode" == this.daren_channel ? "channel=share&channelid=" + this.daren_channelid : "";
      tt.onShareAppMessage(function () {
        return {
          title: e.ShareVideoTitle,
          query: i,
          success: function () {
            console.log("分享成功");
          },
          fail: function (e) {
            console.log("分享失败", e);
          }
        };
      });
    }
  };
  _ctor.prototype.isSupportFileData = function () {
    return true;
  };
  _ctor.prototype.isSupportServerData = function () {
    return true;
  };
  _ctor.prototype.getPlayerData = function (e) {
    console.log("readFile 11");
    var t = tt.getFileSystemManager();
    try {
      var o = t.readFileSync(this.playerDataFilePath, "utf8");
      console.log("readFile 调用成功", o);
      e && e(o);
    } catch (i) {
      console.log("调用失败", i);
      e && e(null);
    }
  };
  _ctor.prototype.savePlayerData = function (e, t) {
    tt.getFileSystemManager().writeFile({
      filePath: this.playerDataFilePath,
      encoding: "utf8",
      data: e,
      success: function () {
        console.log("savePlayerData 调用成功");
        t && t(true);
      },
      fail: function (e) {
        console.log("savePlayerData 调用失败", e.errMsg);
        t && t(false, e.errMsg);
      }
    });
  };
  _ctor.prototype.checkShortcut = function (e) {
    var t = this;
    undefined === e && (e = false);
    if (this.isTTPlatform && this.IsAndroidPlatform) {
      if (this.sysInfo.platform) {
        tt.checkShortcut({
          success: function (e) {
            console.log("checkShortcut success res=", e);
            e.status.exist && (t.isAddToDeskTop = true);
          },
          fail: function (e) {
            console.log("checkShortcut fail res=", e);
          }
        });
      } else {
        console.log("checkShortcut needAddDeskTop3");
      }
    }
  };
  _ctor.prototype.addShortcut = function (e, t) {
    var o = this;
    this.isTTPlatform && tt.addShortcut({
      success: function (t) {
        console.log("addShortcut success res=", t);
        if (o.IsAndroidPlatform) {
          e && e();
          o.checkShortcut(true);
        }
      },
      fail: function (e) {
        console.log("addShortcut fail res=", e);
        r_UtilsSystem.UtilsSystem.showTip("请检查是否开启添加到桌面权限");
        t && t();
      }
    });
  };
  _ctor.prototype.checkToDeskTop = function (e) {
    this.checkShortcut2(function () {
      e && e();
    });
  };
  _ctor.prototype.checkShortcut2 = function (e) {
    var t = this;
    if (this.isTTPlatform && this.IsAndroidPlatform) {
      if (this.sysInfo.platform) {
        tt.checkShortcut({
          success: function (o) {
            console.log("checkShortcut success res=", o);
            if (o.status.exist) {
              t.isAddToDeskTop = true;
              e && e();
            }
          },
          fail: function (e) {
            console.log("checkShortcut fail res=", e);
            r_UtilsSystem.UtilsSystem.showTip("无法检测到是否添加~");
          }
        });
      } else {
        console.log("checkShortcut needAddDeskTop3");
      }
    }
  };
  _ctor.prototype.addToDeskTop = function (e) {
    if (this.isAddToDeskTop) {
      r_UtilsSystem.UtilsSystem.showTip("已经添加到桌面~");
    } else {
      this.addShortcut(e, function () {});
    }
  };
  _ctor.prototype.isSupportDesk = function () {
    return "Douyin" == this.sysInfo.appName || "douyin_lite" == this.sysInfo.appName;
  };
  _ctor.prototype.update = function () {
    this.updateManager = tt.getUpdateManager();
    var e = this;
    e.updateManager.onUpdateReady(function () {
      tt.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启小游戏？",
        success: function (t) {
          t.confirm && e.updateManager.applyUpdate();
        }
      });
    });
    e.updateManager.onUpdateFailed(function (e) {
      console.log("版本下载失败原因", e);
      tt.showToast({
        title: "新版本下载失败，请稍后再试",
        icon: "none"
      });
    });
  };
  _ctor.prototype.vibrateShort = function () {};
  _ctor.prototype.vibrateLong = function () {};
  return _ctor;
}();
exports._PlatformBytedance = exp__PlatformBytedance;
exports.PlatformBytedance = new exp__PlatformBytedance();
(function (e) {
  e["抖音侧边栏"] = "021001";
  e["抖极侧边栏"] = "101001";
  e["测试侧边栏"] = "990003";
  e["抖音桌面"] = "021020";
  e["抖极桌面"] = "101020";
  e["测试桌面"] = "991020";
})(i = exports.ByteSceneValue || (exports.ByteSceneValue = {}));