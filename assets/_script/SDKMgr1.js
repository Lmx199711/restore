Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SDKMgr1 = undefined;
var r_Config = require("Config");
var r_BlockSystem = require("BlockSystem");
var r_HttpSystem = require("HttpSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
Object.entries || (Object.entries = function (e) {
  var t = Object.keys(e);
  var o = t.length;
  for (var i = new Array(o); o--;) {
    i[o] = [t[o], e[t[o]]];
  }
  return i;
});
var exp_SDKMgr1 = function () {
  function _ctor() {}
  Object.defineProperty(_ctor, "gameId", {
    get: function () {
      return r_Config.default.gameId;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.gethuoquzhengao = function () {
    var e = cc.view.getVisibleSize();
    this.kuan = .8 * e.width / 2 - 160;
    console.log("visiblesize:", cc.view.getVisibleSize(), "canvassize", cc.view.getCanvasSize(), "framesize", cc.view.getFrameSize());
    var t = e.width - this.kuan - this.kuan;
    this.zuo = t / 4;
    console.error("获取的宽度和高度:", e.width, e.height);
    this.kuan = this.kuan / 2;
    this.tiaozheng = e.width;
    this.zuo = this.zuo / 2 + 70;
  };
  _ctor.createCustomAdquanping = function (e, o) {
    if (window.wx && wx.getSystemInfoSync().SDKVersion >= "2.11.1") {
      _ctor.CustomAdquanping = wx.createCustomAd({
        adUnitId: _ctor.CustomAdPosIdquanping,
        adIntervals: 30,
        style: {
          left: e,
          top: o,
          width: this.kuan,
          fixed: true
        }
      });
      _ctor.CustomAdquanping.onError(function (e) {
        console.log("liming", e);
      });
    }
  };
  _ctor.showCustomAdquanping = function (e, o) {
    if (this.isplatform()) {
      console.log("进入全屏");
      _ctor.createCustomAdquanping(e, o);
      if (_ctor.CustomAdquanping) {
        console.log("进入全屏展示");
        _ctor.CustomAdquanping.show();
      }
    }
  };
  _ctor.hideCustomAdquanping = function () {
    if (this.isplatform()) {
      console.log("隐藏全屏");
      if (_ctor.CustomAdquanping) {
        _ctor.CustomAdquanping.hide();
        _ctor.CustomAdquanping.destroy();
      }
    }
  };
  _ctor.createCustomAd22 = function (e, o) {
    if (window.wx && wx.getSystemInfoSync().SDKVersion >= "2.11.1") {
      _ctor.CustomAd22 = wx.createCustomAd({
        adUnitId: _ctor.CustomAdPosId22,
        adIntervals: 30,
        style: {
          left: e,
          top: o,
          width: 70,
          fixed: true
        }
      });
      _ctor.CustomAd22.onError(function (e) {
        console.log("liming", e);
      });
    }
  };
  _ctor.showCustomAd22 = function (e, o) {
    if (this.isplatform()) {
      console.log("进入22");
      _ctor.createCustomAd22(e, o);
      if (_ctor.CustomAd22) {
        console.log("进入22展示");
        _ctor.CustomAd22.show();
      }
    }
  };
  _ctor.hideCustomAd22 = function () {
    if (this.isplatform()) {
      console.log("隐藏22");
      if (_ctor.CustomAd22) {
        _ctor.CustomAd22.hide();
        _ctor.CustomAd22.destroy();
      }
    }
  };
  _ctor.init = function () {
    return __awaiter(this, undefined, undefined, function () {
      var o;
      return __generator(this, function () {
        if (cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER) {
          return [2];
        } else {
          _ctor.initshare();
          _ctor.getadrate();
          _ctor.initVideoAd();
          _ctor.initInterstitialAd();
          this.getChannelId();
          _ctor.getLocation();
          _ctor.createGameClubButton();
          o = require("1");
          102 !== cc.sys.platform && 103 !== cc.sys.platform && o.init({
            appKey: "65f9575e8d21b86a1842eaec",
            useOpenid: false
          });
          _ctor.gethuoquzhengao();
          return [2];
        }
      });
    });
  };
  _ctor.btnYczs = function (e) {
    if (1 == _ctor.yczs) {
      e.visible = false;
      setTimeout(function () {
        e.visible = true;
      }, 1e3);
    }
  };
  _ctor.createCustomAdShu = function (e, o) {
    if (window.wx && wx.getSystemInfoSync().SDKVersion >= "2.11.1") {
      _ctor.CustomAdShu = wx.createCustomAd({
        adUnitId: _ctor.CustomAdPosIdShu,
        adIntervals: 30,
        style: {
          left: e,
          top: o,
          fixed: true
        }
      });
      _ctor.CustomAdShu.onError(function (e) {
        console.log("liming", e);
      });
    }
  };
  _ctor.showCustomAdShu = function (e, o) {
    if (this.isplatform()) {
      console.log("展示原生竖屏广告");
      _ctor.createCustomAdShu(e, o);
      _ctor.CustomAdShu && _ctor.CustomAdShu.show();
    }
  };
  _ctor.hideCustomAdshu = function () {
    if (this.isplatform() && _ctor.CustomAdShu) {
      _ctor.CustomAdShu.hide();
      _ctor.CustomAdShu.destroy();
    }
  };
  _ctor.createCustomAdShu1 = function (e, o) {
    if (window.wx) {
      var i = wx.getSystemInfoSync();
      if (i.SDKVersion >= "2.11.1") {
        _ctor.CustomAdShu1 = wx.createCustomAd({
          adUnitId: _ctor.CustomAdPosIdShu,
          adIntervals: 30,
          style: {
            left: i.screenWidth - 100 - e,
            top: o,
            fixed: true
          }
        });
        _ctor.CustomAdShu1.onError(function (e) {
          console.log("liming", e);
        });
      }
    }
  };
  _ctor.showCustomAdShu1 = function (e, o) {
    if (this.isplatform()) {
      _ctor.createCustomAdShu1(e, o);
      _ctor.CustomAdShu1 && _ctor.CustomAdShu1.show();
    }
  };
  _ctor.hideCustomAdshu1 = function () {
    if (this.isplatform() && _ctor.CustomAdShu1) {
      _ctor.CustomAdShu1.hide();
      _ctor.CustomAdShu1.destroy();
    }
  };
  _ctor.createCustomAdShu2 = function (e, o) {
    if (window.wx && wx.getSystemInfoSync().SDKVersion >= "2.11.1") {
      _ctor.CustomAdShu2 = wx.createCustomAd({
        adUnitId: _ctor.CustomAdPosIdShu,
        adIntervals: 30,
        style: {
          left: e,
          top: o,
          fixed: true
        }
      });
      _ctor.CustomAdShu2.onError(function (e) {
        console.log("liming", e);
      });
    }
  };
  _ctor.showCustomAdShu2 = function (e, o) {
    if (this.isplatform()) {
      _ctor.createCustomAdShu2(e, o);
      _ctor.CustomAdShu2 && _ctor.CustomAdShu2.show();
    }
  };
  _ctor.hideCustomAdshu2 = function () {
    if (this.isplatform() && _ctor.CustomAdShu2) {
      _ctor.CustomAdShu2.hide();
      _ctor.CustomAdShu2.destroy();
    }
  };
  _ctor.createCustomAdHeng = function (e, o) {
    var i = this;
    if (window.wx && wx.getSystemInfoSync().SDKVersion >= "2.11.1") {
      _ctor.CustomAdHeng = wx.createCustomAd({
        adUnitId: _ctor.CustomAdPosIdHeng,
        adIntervals: 30,
        style: {
          left: e,
          top: o,
          width: 150,
          fixed: true
        }
      });
      _ctor.CustomAdHeng.onError(function (e) {
        console.log("liming", e);
      });
      _ctor.CustomAdHeng.onLoad(function () {
        i.isShowCurstomAd || r_TimeSystem.TimeSystem.scheduleOnce("hideAd", 1e-4, function () {
          i.hideCustomAdHeng();
        });
      });
    }
  };
  _ctor.showCustomAdHeng = function (e, o) {
    this.isShowCurstomAd = true;
    _ctor.createCustomAdHeng(e, o);
    _ctor.CustomAdHeng && _ctor.CustomAdHeng.show();
  };
  _ctor.hideCustomAdHeng = function () {
    this.isShowCurstomAd = false;
    _ctor.CustomAdHeng && _ctor.CustomAdHeng.hide();
  };
  _ctor.getLocation = function () {
    console.log("liming getLocation");
    this.httpRequest("isPinbi", {
      game_id: r_Config.default.gameId,
      version: _ctor.pingbiver
    }, function (e) {
      _ctor.isHideCity = e;
      console.log("liming " + e);
      console.log("liming channelid " + _ctor.isHideCity);
      if ("1" == e) {
        console.log("res&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        r_BlockSystem.BlockSystem.pingbiAll = true;
      } else {
        r_PlatformSystem.PlatformSystem.checkPingbi();
      }
    });
  };
  _ctor.getadrate = function () {
    var e = this;
    return new Promise(function (o) {
      var i = ["shareId"];
      e.httpRequest("adrate2", {
        openId: "1000",
        gameId: r_Config.default.gameId,
        version: _ctor.pingbiver
      }, function (e) {
        console.log("getEcpmLimit responseJson=", e);
        if (e && e.rateJson) {
          var n = JSON.parse(e.rateJson);
          console.log("rateObj=", n);
          if (!n) {
            return;
          }
          for (var a = 0; a < n.length; a++) {
            var s = n[a];
            s && -1 != i.indexOf(s.key) && (_ctor[s.key] = Number(s.rate));
          }
          _ctor.shareMenu();
          o(1);
        } else {
          o(0);
        }
      });
    });
  };
  _ctor.btndelay = function (e) {
    if ("0" == _ctor.isHideCity && 1 == _ctor.yanchi) {
      e.visible = false;
      r_TimeSystem.TimeSystem.scheduleOnce("btndelay1", function () {
        e.visible = true;
      }, 2);
    }
  };
  _ctor.isplatform = function () {
    return cc.sys.platform == cc.sys.WECHAT_GAME;
  };
  _ctor.getChannelId = function () {
    if (this.debug) {
      _ctor.queryChannelId = "test";
    } else if (this.isplatform() && window.wx) {
      if (wx.getLaunchOptionsSync().query.channel_id) {
        _ctor.queryChannelId = wx.getLaunchOptionsSync().query.channel_id;
        cc.sys.localStorage.setItem("queryChannelId", _ctor.queryChannelId);
      } else {
        var e = cc.sys.localStorage.getItem("queryChannelId");
        e && (_ctor.queryChannelId = e);
      }
    }
  };
  _ctor.getDataByScene = function (e) {
    if (_ctor.infoData) {
      var o = [];
      (o = (_ctor.infoData.filter(function (t) {
        return t.scene == e;
      })[0] || {}).list || []).forEach(function (t) {
        t.scene = e;
      });
      return o;
    }
    return [];
  };
  _ctor.checkGetOpenId = function () {
    r_PlayerData.PlayerData.data.openId || _ctor.getDataOpenid();
  };
  _ctor.getDataOpenid = function () {
    if (this.isplatform()) {
      console.log("进入getDataOpenid");
      window.wx && wx.login({
        pkgName: "",
        success: function (e) {
          if (e.code) {
            console.log("login: ", e.code);
            _ctor.httpRequest("getopenid", {
              gameId: r_Config.default.gameId,
              code: e.code
            }, function (e) {
              r_PlayerData.PlayerData.data.openId = e.openid;
              r_HttpSystem.HttpSystem.checkUpdateOrUploadData();
              console.log("--------------->yes");
            });
          } else {
            console.log("登录失败！" + e.errMsg);
          }
        },
        fail: function () {
          console.log("登录失败！");
        },
        complete: function () {}
      });
    }
  };
  _ctor.getaddata = function (e) {
    _ctor.finishcb = e;
    if (this.isplatform()) {
      window.wx && wx.login({
        pkgName: "",
        success: function (e) {
          if (e.code) {
            _ctor.httpRequest("getopenid", {
              gameId: r_Config.default.gameId,
              code: e.code
            }, function (e) {
              _ctor._openId = e.openid;
              r_PlayerData.PlayerData.data.openId = e.openid;
              r_HttpSystem.HttpSystem.checkUpdateOrUploadData();
              _ctor.httpRequest("login", {
                gameId: r_Config.default.gameId,
                version: _ctor._version,
                channel_id: wx.getLaunchOptionsSync().query.channel_id,
                openId: e.openid
              }, _ctor.getDataComplete);
              wx.uma.setOpenid(e.openid);
              console.log("--------------->yes");
            });
          } else {
            console.log("登录失败！" + e.errMsg);
          }
        },
        fail: function () {
          console.log("登录失败！");
        },
        complete: function () {}
      });
    } else {
      _ctor.httpRequest("login", {
        gameId: r_Config.default.gameId,
        version: _ctor._version,
        channel_id: "test",
        openId: "undefined"
      }, _ctor.getDataComplete);
    }
  };
  _ctor.getDataComplete = function (e) {
    if (200 == e.code) {
      _ctor.infoData = e.sceneInfo;
      _ctor.defaultdata = _ctor.getDataByScene("all");
      console.log("get AD data: ", e.sceneInfo);
    } else {
      _ctor.defaultdata = null;
      _ctor.infoData = null;
    }
    _ctor.finishcb();
  };
  _ctor.httpRequest = function (e, t, o) {
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
  _ctor.vibrateShort = function () {
    window.wx && wx.vibrateLong();
  };
  _ctor.admenu = function (e, t, o, i) {
    if (!i) {
      i = true;
      fairygui.GTween.to(t, o, .1).onUpdate(function (t) {
        e.x = t.value.x;
      }).onComplete(function () {
        i = false;
      });
    }
  };
  _ctor.showToast = function (e) {
    this.isplatform() && window.wx && wx.showToast({
      title: e,
      icon: "none",
      duration: 2e3
    });
  };
  _ctor.initBanner = function (e) {
    console.log("目前设置的banner宽度为100");
    if (this.isplatform() && window.wx) {
      console.log("initbanner " + e);
      var o = wx.getSystemInfoSync();
      var i = this;
      this.bannerAd[e] = wx.createBannerAd({
        adUnitId: _ctor.BannerAdPosIds[e],
        adIntervals: 10,
        style: {
          left: 200,
          width: 100,
          top: o.screenHeight
        }
      });
      this.bannerAd[e].onResize(function () {
        i.bannerAd[e].style.top = o.screenHeight - i.bannerAd[e].style.realHeight - 10;
        i.bannerAd[e].style.left = (o.screenWidth - i.bannerAd[e].style.realWidth) / 2;
      });
      this.bannerAd[e].onError(function (e) {
        console.log(e);
      });
    }
  };
  _ctor.showBanner = function () {
    console.error("showbanner");
    if (1 != this.showingbanner && (this.showingbanner = 1, this.bannerIdIdx++, this.bannerIdIdx > 4 && (this.bannerIdIdx = 0), this.isplatform())) {
      if (this.bannerAd[this.bannerIdIdx]) {
        wx.getSystemInfoSync();
        this.bannerAd[this.bannerIdIdx].show();
      } else {
        this.initBanner(this.bannerIdIdx);
        this.bannerAd[this.bannerIdIdx].show();
      }
    }
  };
  _ctor.hideBanner = function () {
    var e = this;
    console.error("hidebanner");
    this.showingbanner = 0;
    var t = this.bannerIdIdx;
    if (this.bannerAd[t]) {
      this.bannerAd[t].hide();
      setTimeout(function () {
        e.bannerAd[t].destroy();
      }, 1e3);
      setTimeout(function () {
        e.initBanner(t);
      }, 2e3);
    }
  };
  _ctor.initInterstitialAd = function () {
    var e = this;
    if (window.wx) {
      this.interstitialAd = wx.createInterstitialAd({
        adUnitId: _ctor.InterstitialAdId
      });
      this.interstitialAd.onClose(function () {
        console.log("插屏 广告关闭");
        e.onClose && e.onCloseInterstitialAd && e.onCloseInterstitialAd();
      });
      this.interstitialAd.onError(function (e) {
        console.log(e);
      });
      this.interstitialAd.onLoad(function () {
        console.log("插屏 广告加载成功");
      });
    }
  };
  _ctor.showInterstitialAd = function (e) {
    var o = this;
    if (null == this.timer) {
      console.log("插屏展示~~~~~~~~");
      this.onCloseInterstitialAd = e;
      if (r_TimeSystem.TimeSystem.getServerTime() - this.showinterTime < _ctor.chapin) {
        this.onCloseInterstitialAd && this.onCloseInterstitialAd();
      } else {
        this.showinterTime = r_TimeSystem.TimeSystem.getServerTime();
        if (this.interstitialAd) {
          this.interstitialAd.show().catch(function (e) {
            console.error(e);
          });
        } else {
          this.onCloseInterstitialAd && this.onCloseInterstitialAd();
        }
        setTimeout(function () {
          o.timer = null;
        }, this.chapin);
      }
    }
  };
  _ctor.initVideoAd = function () {
    if (this.isplatform()) {
      if (window.wx) {
        this.mVideoAd = wx.createRewardedVideoAd({
          adUnitId: _ctor.VideoAdPosId
        });
        console.log("mVideoAd", this.mVideoAd);
      }
      this.mVideoAd.onError(function (e) {
        _ctor.onVideoRewardedError(e);
        _ctor.shareapp(this._videoSuccFunc);
      });
      this.mVideoAd.onLoad(function () {
        _ctor.videoLoaded = true;
      });
      this.mVideoAd.onClose(function (e) {
        _ctor.onClose(e);
      });
      this.mVideoAd.load().then().catch(function (e) {
        return console.log("video load" + e);
      });
    }
  };
  _ctor.onClose = function (e) {
    if (e && e.isEnded) {
      null != this._videoSuccFunc && this._videoSuccFunc();
    } else {
      null != this._videoFailFunc && this._videoFailFunc();
    }
    _ctor.videoLoaded = false;
    this.mVideoAd.load();
  };
  _ctor.onVideoRewardedError = function (e) {
    _ctor.videoLoaded = false;
    console.log("激励广告加载失败：" + e);
  };
  _ctor.showRewardAd = function (e, o) {
    var i = this;
    undefined === e && (e = null);
    undefined === o && (o = null);
    if (this.isplatform()) {
      console.log("展示激励视频");
      if ("" == _ctor.VideoAdPosId) {
        e();
        return void _ctor.showToast("暂无广告");
      }
      var n = this;
      if (_ctor.videoLoaded) {
        this._videoSuccFunc = e;
        this._videoFailFunc = o;
        this.mVideoAd.show().then().catch(function (e) {
          console.log("video show" + e);
          n.mVideoAd.load().then(function () {
            n.mVideoAd.show().catch(function () {
              _ctor.shareapp(i._videoSuccFunc);
              _ctor.showToast("暂无广告");
            });
          });
        });
      } else {
        this.mVideoAd.load();
      }
    } else {
      e();
    }
  };
  _ctor.shareMenu = function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
    var e = _ctor._iconsId[0];
    wx.onShareAppMessage(function () {
      return {
        imageUrlId: _ctor.shareId,
        imageUrl: e.url,
        title: e.title
      };
    });
  };
  _ctor.checkGetUserId = function () {
    console.log("进入检测userid");
    !r_PlayerData.PlayerData.data.userId && r_PlayerData.PlayerData.data.openId && _ctor.getUserInfo();
  };
  _ctor.authorize = function () {
    if ("undefined" != typeof wx) {
      console.log("检测授权");
      wx.getSetting({
        success: function (e) {
          console.log("检测授权成功返回：", e);
          if (e.authSetting["scope.userInfo"]) {
            console.log("已授权直接获取UserInfo");
            wx.getUserInfo({
              success: function (e) {
                var o = e.userInfo;
                o.nickName;
                o.avatarUrl;
                o.gender;
                o.province;
                o.city;
                o.country;
                console.log("授权成功：", e);
                _ctor.gameLogin(true, null, e);
              }
            });
          } else {
            console.log("authorize: 开始授权");
            wx.authorize({
              scope: "scope.userInfo",
              success: function () {
                wx.getUserInfo({
                  success: function (e) {
                    var o = e.userInfo;
                    o.nickName;
                    o.avatarUrl;
                    o.gender;
                    o.province;
                    o.city;
                    o.country;
                    console.log("授权成功：", e);
                    _ctor.gameLogin(true, null, e);
                  }
                });
              },
              complete: function () {
                console.log("授权完毕");
              },
              fail: function () {
                console.log("授权失败");
              }
            });
          }
        },
        complete: function () {
          console.log("检测授权完毕");
        },
        fail: function () {
          console.log("检测授权失败");
        }
      });
    } else {
      console.error("checkGetOpenId 不是在微信平台");
    }
  };
  _ctor.getUserInfo = function () {
    if (cc.sys.platform == cc.sys.WECHAT_GAME && (this.requirePrivacyAuthorize(), console.log("checkGetUserInfo(wx)=", window.wx), window.wx)) {
      console.log("获取用户信息");
      var e = wx.getSystemInfoSync();
      var t = e.windowWidth;
      var o = e.windowHeight;
      var i = wx.createUserInfoButton({
        type: "text",
        text: "",
        style: {
          left: 0,
          top: 0,
          width: t,
          height: o,
          lineHeight: 40,
          backgroundColor: "#00000000",
          color: "#00000000",
          textAlign: "center",
          fontSize: 10,
          borderRadius: 4
        }
      });
      i.onTap(function (e) {
        var t;
        var o;
        console.log("用户信息=", e);
        i.hide();
        i.destroy();
        if (e.userInfo) {
          t = e.userInfo.nickName;
          o = e.userInfo.avatarUrl;
          console.log("nickname=", t);
          console.log("avatarUrl=", o);
          r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/login", {
            openid: r_Config.default.gameId + "_" + r_PlayerData.PlayerData.data.openId,
            gender: 1,
            nickname: t,
            avatarUrl: o
          }, function (e) {
            console.log("userId login result=", e);
            if (e) {
              var t = e.id;
              t && r_PlayerData.PlayerData.setUserId(t);
            }
          });
        }
      });
    }
  };
  _ctor.requirePrivacyAuthorize = function () {
    wx.requirePrivacyAuthorize({
      success: function () {},
      fail: function () {
        console.log("协议处理失败");
      },
      complete: function () {
        console.log("协议处理完成");
      }
    });
  };
  _ctor.isSupportFileData = function () {
    return false;
  };
  _ctor.isSupportServerData = function () {
    return true;
  };
  _ctor.gameLogin = function (e, o, i) {
    var n = r_PlayerData.PlayerData.data.openId;
    var s = 1;
    var c = "";
    var u = "";
    if (e) {
      s = i.userInfo.gender;
      if (!s) {
        s = 1;
      }
      c = i.userInfo.nickName;
      u = i.userInfo.avatarUrl;
      _ctor.nickName = c;
    }
    r_HttpSystem.HttpSystem.Get("https://wxxcx.tanyu.mobi:4443/admin/gameapi/login", {
      openid: r_Config.default.gameId + "_" + n,
      gender: s,
      nickname: c,
      avatarUrl: u
    }, function (e) {
      console.log("userId login result=", e);
      if (e) {
        var t = e.id;
        console.log("获得userId: ", t);
        t && r_PlayerData.PlayerData.setUserId(t);
      }
    });
  };
  _ctor.initshare = function () {
    var e = this;
    if (this.isplatform() && window.wx) {
      var o = _ctor._iconsId[0];
      wx.showShareMenu({
        imageUrl: o.url,
        templateId: o.id,
        withShareTicket: true,
        title: o.title,
        menus: ["shareAppMessage", "shareTimeline"]
      });
      console.log("initshare onShareAppMessage");
      wx.onShareAppMessage(function () {
        console.log("initshare onShareAppMessage");
        return {
          imageUrlId: o.id,
          imageUrl: o.url,
          title: o.title
        };
      });
      console.log("initshare onShareAppMessage  22222");
      var i = 0;
      cc.game.on(cc.game.EVENT_SHOW, function () {
        if (new Date().getTime() - i > 3e3) {
          e.shareSuccess && e.shareSuccess();
        } else {
          e.shareFail && e.shareFail();
        }
        e.shareSuccess = null;
        e.shareFail = null;
      });
      cc.game.on(cc.game.EVENT_HIDE, function () {
        i = new Date().getTime();
      });
    }
  };
  _ctor.shareapp = function (e, o) {
    if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      console.log("pc77 shareApp");
      this.shareSuccess = e;
      this.shareFail = o;
      var i = _ctor._iconsId[0];
      wx.shareAppMessage({
        title: i.title,
        imageUrl: i.url,
        templateId: i.id
      });
    }
  };
  _ctor.createGameClubButton = function () {
    if (this.isplatform()) {
      var e = cc.view.getFrameSize().width;
      console.log("屏幕宽度：！！！", e);
      _ctor.GameClubButton = wx.createGameClubButton({
        icon: "light",
        style: {
          left: 5,
          top: 200,
          width: 40,
          height: 40
        }
      });
      _ctor.hideGameClubButton();
    }
  };
  _ctor.showGameClubButton = function () {
    this.isplatform() && _ctor.GameClubButton && _ctor.GameClubButton.show();
  };
  _ctor.hideGameClubButton = function () {
    this.isplatform() && _ctor.GameClubButton && _ctor.GameClubButton.hide();
  };
  _ctor.nickName = "";
  _ctor.gameVersion = "1.0.46";
  _ctor.VideoAdPosId = "adunit-b02f34d451e6393d";
  _ctor.BannerAdPosIds = ["adunit-7db5e51485103598", "adunit-7db5e51485103598", "adunit-7db5e51485103598", "adunit-7db5e51485103598", "adunit-7db5e51485103598"];
  _ctor.CustomAdPosIdShu = "adunit-94658a003c632998";
  _ctor.CustomAdPosIdHeng = "adunit-94658a003c632998";
  _ctor.CustomAdPosId22 = "adunit-b05379e257cf5771";
  _ctor.CustomAdPosIdquanping = "adunit-b02f34d451e6393d";
  _ctor.InterstitialAdId = "adunit-096e54a4f5057352";
  _ctor.CustomAdquanping = null;
  _ctor.CustomAd22 = null;
  _ctor.shareId = "";
  _ctor._iconsId = [{
    url: "https://cdnsource-1.oss-cn-hangzhou.aliyuncs.com/tanpaixyx/210007/mp_new_nzrs/fx/%E9%80%86%E8%BD%AC.jpg",
    id: "i7qMi+ddTomXusJCr0AHyQ==",
    title: "重生之我就要娶柳如烟！"
  }, {
    url: "https://mmocgame.qpic.cn/wechatgame/zo1YsJvD2jWHMVguuQL3OD4uziabiaJ3q6QAXjutibD7Ad9bY8ISYjACgZjyP5YQ2Z4/0",
    id: "RRYm+0CdTo6qIWXdIlPLog==",
    title: "重生之我就要娶柳如烟！"
  }, {
    url: "https://mmocgame.qpic.cn/wechatgame/zo1YsJvD2jWHMVguuQL3OD4uziabiaJ3q6QAXjutibD7Ad9bY8ISYjACgZjyP5YQ2Z4/0",
    id: "RRYm+0CdTo6qIWXdIlPLog==",
    title: "重生之我就要娶柳如烟！"
  }];
  _ctor.pingbiver = "1.0.11";
  _ctor._version = "1.0.0";
  _ctor._openId = "";
  _ctor.clickindex = 0;
  _ctor.isHideCity = "0";
  _ctor.dahudao = 0;
  _ctor.wudian = 0;
  _ctor.yanchi = 0;
  _ctor.jnkd = 0;
  _ctor.kongzhi = 0;
  _ctor.logo = 0;
  _ctor.ddc = 0;
  _ctor.sxbanner = 10;
  _ctor.kjsp = 0;
  _ctor.kjkd = 0;
  _ctor.jskd = 0;
  _ctor.dszw = 0;
  _ctor.zydc = 0;
  _ctor.yczs = 0;
  _ctor.flcp = 0;
  _ctor.chapin = 30;
  _ctor.weixinpingbi = 0;
  _ctor.weixinpingbi2 = 1;
  _ctor.debug = false;
  _ctor.isfirst = true;
  _ctor.wuchu = 0;
  _ctor.CustomAdShu = null;
  _ctor.CustomAdShu1 = null;
  _ctor.CustomAdShu2 = null;
  _ctor.CustomAdHeng = null;
  _ctor.isShowCurstomAd = false;
  _ctor.wzsy = 0;
  _ctor.bannerAd = [null, null, null, null, null];
  _ctor.bannerIdIdx = 0;
  _ctor.showingbanner = 1;
  _ctor.showinterTime = 0;
  _ctor.timer = null;
  _ctor.shareSuccess = null;
  _ctor.shareFail = null;
  _ctor.GameClubButton = null;
  return _ctor;
}();
exports.SDKMgr1 = exp_SDKMgr1;