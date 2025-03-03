var e = "[UMENG] -- ",
  t = function () {
    var t = null,
      n = !1;
    function r() {
      this.setDebug = function (e) {
        n = e;
      }, this.d = function () {
        if (n) try {
          "string" == typeof arguments[0] && (arguments[0] = e + arguments[0]), console.debug.apply(console, arguments);
        } catch (e) {}
      }, this.i = function () {
        try {
          if (n) try {
            "string" == typeof arguments[0] && (arguments[0] = e + arguments[0]), console.info.apply(console, arguments);
          } catch (e) {}
        } catch (e) {}
      }, this.e = function () {
        if (n) try {
          "string" == typeof arguments[0] && (arguments[0] = e + arguments[0]), console.error.apply(console, arguments);
        } catch (e) {}
      }, this.w = function () {
        if (n) try {
          "string" == typeof arguments[0] && (arguments[0] = e + arguments[0]), console.warn.apply(console, arguments);
        } catch (e) {}
      }, this.v = function () {
        if (n) try {
          "string" == typeof arguments[0] && (arguments[0] = e + arguments[0]), console.log.apply(console, arguments);
        } catch (e) {}
      }, this.t = function () {
        if (n) try {
          console.table.apply(console, arguments);
        } catch (e) {}
      }, this.tip = function () {
        try {
          "string" == typeof arguments[0] && (arguments[0] = e + arguments[0]), console.log.apply(console, arguments);
        } catch (e) {}
      }, this.tip_w = function (e) {
        try {
          console.log("%c [UMENG] -- " + e, "background:red; padding: 4px; padding-right: 8px; border-radius: 4px; color: #fff;");
        } catch (e) {}
      }, this.err = function () {
        try {
          "string" == typeof arguments[0] && (arguments[0] = e + arguments[0]), console.error.apply(console, arguments);
        } catch (e) {}
      }, this.repeat = function (e) {
        for (var t = e; t.length < 86;) t += e;
        return t;
      };
    }
    return function () {
      return null === t && (t = new r()), t;
    };
  }(),
  n = function () {
    var e = null;
    function t() {
      var e = {};
      this.useOpenid = function () {
        return !!e.useOpenid;
      }, this.useSwanid = function () {
        return !!e.useSwanid;
      }, this.autoGetOpenid = function () {
        return !!e.autoGetOpenid;
      }, this.appKey = function () {
        return e.appKey;
      }, this.uploadUserInfo = function () {
        return e.uploadUserInfo;
      }, this.enableVerify = function () {
        return e.enableVerify;
      }, this.set = function (t) {
        e = t;
      }, this.get = function () {
        return e;
      }, this.setItem = function (t, n) {
        e[t] = n;
      }, this.getItem = function (t) {
        return e[t];
      };
    }
    return function () {
      return e || (e = new t()), e;
    };
  }();
function i() {}
i.prototype = {
  on: function on(e, t, n) {
    var r = this.e || (this.e = {});
    return (r[e] || (r[e] = [])).push({
      fn: t,
      ctx: n
    }), this;
  },
  once: function once(e, t, n) {
    var r = this;
    function i() {
      r.off(e, i), t.apply(n, arguments);
    }
    return i._ = t, this.on(e, i, n);
  },
  emit: function emit(e) {
    for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), r = 0, i = n.length; r < i; r++) n[r].fn.apply(n[r].ctx, t);
    return this;
  },
  off: function off(e, t) {
    var n = this.e || (this.e = {}),
      r = n[e],
      i = [];
    if (r && t) for (var o = 0, a = r.length; o < a; o++) r[o].fn !== t && r[o].fn._ !== t && i.push(r[o]);
    return i.length ? n[e] = i : delete n[e], this;
  }
};
var r = new i();
r.messageType = {
  CONFIG_LOADED: 0,
  UMA_LIB_INITED: 1
};
var _o = function o(e, t) {
  return (_o = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
  })(e, t);
};
function s(e, t) {
  function n() {
    this.constructor = e;
  }
  _o(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}
var c,
  a = new (function (e) {
    function n() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return s(n, e), n.prototype.getSdkType = function () {
      return "wxgamemp";
    }, n.prototype.getUserInfo = function (e) {
      var n = {
        fail: function fail() {
          e && e();
        },
        success: function success(t) {
          if (t && t.userInfo) {
            var n = t.userInfo;
            e && e({
              avatar: n.avatarUrl,
              nickName: n.nickName,
              gender: n.gender,
              country: n.country,
              province: n.province,
              city: n.city,
              language: n.language
            });
          }
        }
      };
      try {
        wx.getSetting({
          success: function success(e) {
            e.authSetting["scope.userInfo"] && wx.getUserInfo(n);
          },
          fail: function fail() {
            e();
          }
        });
      } catch (e) {
        t.e("getUserInfo error", e);
      }
    }, n;
  }(function () {
    function e() {}
    return e.prototype.setStorage = function (e, t, n) {
      wx.setStorage({
        key: e,
        data: t,
        success: function success() {
          "function" == typeof n && n(!0);
        },
        fail: function fail() {
          "function" == typeof n && n(!1);
        }
      });
    }, e.prototype.getStorage = function (e, n) {
      wx.getStorage({
        key: e,
        success: function success(e) {
          "function" == typeof n && n(e.data);
        },
        fail: function fail(r) {
          t().w(e + ": " + r.errMsg), "function" == typeof n && n();
        }
      });
    }, e.prototype.removeStorage = function (e, t) {
      wx.removeStorage({
        key: e,
        success: function success() {
          "function" == typeof t && t(!0);
        },
        fail: function fail() {
          "function" == typeof t && t(!1);
        }
      });
    }, e.prototype.getSystemInfo = function (e) {
      wx.getSystemInfo({
        success: function success(t) {
          t.safeArea = t.safeArea || {};
          var n = "";
          t.host && "string" == typeof t.host.env && (n = t.host.env);
          var r = {
              model: t.model,
              brand: t.brand,
              pixelRatio: t.pixelRatio,
              screenWidth: t.screenWidth,
              screenHeight: t.screenHeight,
              fontSizeSetting: t.fontSizeSetting,
              platform: t.platform,
              platformVersion: t.version,
              platformSDKVersion: t.SDKVersion,
              language: t.language,
              deviceName: t.model,
              OSVersion: t.system,
              resolution: "",
              theme: t.theme,
              benchmarkLevel: t.benchmarkLevel,
              safeArea: {
                width: t.safeArea.width,
                height: t.safeArea.height,
                top: t.safeArea.top,
                left: t.safeArea.left,
                bottom: t.safeArea.bottom,
                right: t.safeArea.right
              },
              statusBarHeight: t.statusBarHeight,
              host: n
            },
            i = t.system.split(" ");
          Array.isArray(i) && (r.OS = i[0]);
          var o = Math.round(t.screenWidth * t.pixelRatio),
            a = Math.round(t.screenHeight * t.pixelRatio);
          r.resolution = o > a ? o + "*" + a : a + "*" + o, "function" == typeof e && e(r);
        },
        fail: function fail() {
          "function" == typeof e && e();
        }
      });
    }, e.prototype.getDeviceInfo = function (e) {
      "function" == typeof e && e("");
    }, e.prototype.checkNetworkAvailable = function (e) {
      wx.getNetworkType({
        success: function success(t) {
          "function" == typeof e && e(t && "none" !== t.networkType);
        },
        fail: function fail() {
          "function" == typeof e && e(!1);
        }
      });
    }, e.prototype.getNetworkInfo = function (e) {
      wx.getNetworkType({
        success: function success(t) {
          "function" == typeof e && e({
            networkAvailable: "none" !== t.networkType,
            networkType: t.networkType
          });
        },
        fail: function fail() {
          "function" == typeof e && e();
        }
      });
    }, e.prototype.getDeviceId = function (e) {
      e("");
    }, e.prototype.getAdvertisingId = function (e) {
      "function" == typeof e && e("");
    }, e.prototype.onNetworkStatusChange = function (e) {
      wx.onNetworkStatusChange(function (t) {
        "function" == typeof e && e(t.isConnected);
      });
    }, e.prototype.request = function (e) {
      var t = e.success,
        n = e.fail,
        r = !1,
        i = null;
      e.success = function (e) {
        r || (i && clearTimeout(i), "function" == typeof t && t(e));
      }, e.fail = function () {
        r || (i && clearTimeout(i), "function" == typeof n && n(!1));
      }, wx.request(e), i = setTimeout(function () {
        i && clearTimeout(i), r = !0, "function" == typeof n && n(r);
      }, e.timeout || 5e3);
    }, e.prototype.getSdkType = function () {
      return "wxmp";
    }, e.prototype.getPlatform = function () {
      return "wx";
    }, e.prototype.getUserInfo = function (e) {
      e();
    }, e.prototype.getAppInfoSync = function () {
      if (wx.getAccountInfoSync) {
        var e = wx.getAccountInfoSync(),
          t = e && e.miniProgram ? e.miniProgram : {};
        return {
          appId: t.appId,
          appEnv: t.envVersion,
          appVersion: t.version
        };
      }
      return {};
    }, e.prototype.onShareAppMessage = function (e) {
      wx.onShareAppMessage(e);
    }, e.prototype.shareAppMessage = function (e) {
      wx.shareAppMessage(e);
    }, e.prototype.getLaunchOptionsSync = function () {
      var e = null;
      if (e) return e;
      if (!wx.getLaunchOptionsSync) return {};
      try {
        e = wx.getLaunchOptionsSync();
      } catch (t) {
        e = null;
      }
      return e || {};
    }, e;
  }()))(),
  u = {
    SESSION_INTERVAL: 3e4,
    LOG_URL: "/wxm_logs",
    GET_OPENID_URL: "/uminiprogram_logs/wx/getuut",
    USERINFO_URL: "/uminiprogram_logs/comm/uif",
    ENDPOINT: "https://umini.shujupie.com",
    ENDPOINTB: "https://ulogs.umeng.com",
    DEVICE_INFO_KEY: "device_info",
    ADVERTISING_ID: "mobile_ad_id",
    ANDROID_ID: "android_id",
    CURRENT_SESSION: "current_session",
    SESSION_PAUSE_TIME: "session_pause_time",
    EVENT_SEND_DEFAULT_INTERVAL: 15e3,
    EVENT_LAST_SEND_TIME: "last_send_time",
    MAX_EVENTID_LENGTH: 128,
    MAX_PROPERTY_KEY_LENGTH: 256,
    MAX_PROPERTY_KEYS_COUNT: 100,
    REPORT_POLICY: "report_policy",
    REPORT_INTERVAL_TIME: "report_interval_time",
    REPORT_POLICY_START_SEND: "1",
    REPORT_POLICY_INTERVAL: "6",
    IMPRINT: "imprint",
    SEED_VERSION: "1.0.0",
    IMPL_VERSION: "2.8.0",
    ALIPAY_AVAILABLE_VERSION: "10.1.52",
    SHARE_PATH: "um_share_path",
    SHARES: "shares",
    REQUESTS: "requests",
    UUID: "um_uuid",
    UUID_SUFFIX: "ud",
    OPENID: "um_od",
    UNIONID: "um_unid",
    ALIPAYID: "um_alipayid",
    USERID: "um_userid",
    PROVIDER: "um_provider",
    SWANID: "um_swanid",
    ANONYMOUSID: "um_anonymousid",
    LAUNCH_OPTIONS: "LAUNCH_OPTIONS",
    UM_SSRC: "_um_ssrc",
    USER_INFO: "user_info",
    IS_ALIYUN: !1
  },
  f = {
    isNumber: function isNumber(e) {
      return !Number.isNaN(parseInt(e, 10));
    },
    compareVersion: function compareVersion(e, t) {
      for (var n = String(e).split("."), r = String(t).split("."), i = 0; i < Math.max(n.length, r.length); i++) {
        var o = parseInt(n[i] || 0, 10),
          a = parseInt(r[i] || 0, 10);
        if (o > a) return 1;
        if (o < a) return -1;
      }
      return 0;
    },
    getRandomStr: function getRandomStr(e) {
      for (var t = "", n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], r = 0; r < Number(e); r++) t += n[Math.round(Math.random() * (n.length - 1))];
      return t;
    },
    clone: function clone(e) {
      return JSON.parse(JSON.stringify(e));
    },
    startsWith: function startsWith(e, t) {
      return !(!e || !t || 0 === t.length || t.length > e.length) && e.substr(0, t.length) === t;
    },
    endsWith: function endsWith(e, t) {
      return !(!t || 0 === e.length || t.length > e.length) && e.substring(e.length - t.length) === t;
    },
    assign: function assign(e) {
      if (null == e) throw new TypeError("Cannot convert undefined or null to object");
      for (var t = Object(e), n = 1; n < arguments.length; n++) {
        var r = arguments[n];
        if (r) for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
      }
      return t;
    },
    deepEqual: function e(t, n) {
      if (t === n) return !0;
      if (t && "object" == typeof(t) && n && "object" == typeof(n)) {
        if (Object.keys(t).length !== Object.keys(n).length) return !1;
        for (var r in t) {
          if (Object.prototype.hasOwnProperty.call(n, r)) return !1;
          if (!e(t[r], n[r])) return !1;
        }
        return !0;
      }
      return !1;
    },
    trimStart: function trimStart(e, t) {
      if (!e) return "";
      if ("string" == typeof t && t.length) {
        var n = new RegExp("^" + t + "*");
        e = e.replace(n, "");
      } else e = e.replace(/^s*/, "");
      return e;
    },
    trimEnd: function trimEnd(e, t) {
      if (!e) return "";
      var n, r;
      if ("string" == typeof t && t.length) {
        for (n = new RegExp(t), r = e.length; n.test(e.charAt(r));) r -= 1;
        return e.slice(0, r + 1);
      }
      for (n = /s/, r = e.length - 1; n.test(e.charAt(r));) r -= 1;
      return e.slice(0, r + 1);
    },
    isFunction: function isFunction(e) {
      return "function" == typeof e;
    }
  },
  p = function (e) {
    function n() {
      return null !== e && e.apply(this, arguments) || this;
    }
    return s(n, e), n.prototype.getOpenIdAsync = function (e, n) {
      var r = this;
      wx.login({
        success: function success(i) {
          i.code ? a.request({
            url: u.ENDPOINT + u.GET_OPENID_URL,
            method: "GET",
            data: {
              key: e,
              code: i.code
            },
            success: function success(e) {
              if (e && 200 === e.statusCode && e.data && e.data.data) {
                var t = e.data.data;
                return r.setOpenid(t.oid), r.setUnionid(t.uid), n && n(!0);
              }
              n && n();
            },
            fail: function fail(e) {
              t().v("wx request failed...", e), n && n();
            }
          }) : n && n();
        },
        fail: function fail() {
          n && n();
        }
      });
    }, n;
  }(function (e) {
    function n() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t._openid = "", t._unionid = "", t._useOpenid = !1, t;
    }
    return s(n, e), n.prototype.initID = function (e) {
      var n = this;
      n._idType = n._useOpenid ? "openid" : "uuid", t().v("id type: ", n._idType), a.getStorage(u.UNIONID, function (e) {
        n._unionid = e;
      }), this._useOpenid ? a.getStorage(u.OPENID, function (t) {
        n._openid = t, e && e();
      }) : e && e();
    }, n.prototype.setUseOpenid = function (e) {
      this._useOpenid = e;
    }, n.prototype.setOpenid = function (e) {
      !this._openid && e && (this._openid = e, a.setStorage(u.OPENID, e));
    }, n.prototype.setUnionid = function (e) {
      !this._unionid && e && (this._unionid = e, a.setStorage(u.UNIONID, e));
    }, n.prototype.getIdTracking = function () {
      var t = e.prototype.getIdTracking.call(this);
      return this._openid && (t.openid = this._openid), this._unionid && (t.unionid = this._unionid), this._userid && (t.userid = this._userid), t;
    }, n.prototype.getId = function () {
      return this._useOpenid ? this._openid : this._uuid;
    }, n;
  }(function () {
    function e() {
      this._uuid = "", this._userid = "", this._provider = "", this._idType = "";
    }
    return e.prototype.createUUID = function () {
      return f.getRandomStr(10) + Date.now() + f.getRandomStr(7) + u.UUID_SUFFIX;
    }, e.prototype.initUUID = function (e) {
      var t = this;
      a.getStorage(u.UUID, function (n) {
        n ? t._uuid = n : (t._uuid = t.createUUID(), a.setStorage(u.UUID, t._uuid)), e && e(n);
      });
    }, e.prototype.initUserid = function () {
      var e = this;
      a.getStorage(u.USERID, function (n) {
        !e._userid && n && (e._userid = n, t().v("userId is ", n));
      }), a.getStorage(u.PROVIDER, function (n) {
        !e._provider && n && (e._provider = n, t().v("provider is ", n));
      });
    }, e.prototype.init = function (e) {
      var t = this;
      t.initUUID(function () {
        t.initUserid(), t.initID(e);
      });
    }, e.prototype.setUserid = function (e, t) {
      !this._userid && e && (this._userid = e, this._provider = t, a.setStorage(u.USERID, e), a.setStorage(u.PROVIDER, t));
    }, e.prototype.removeUserid = function () {
      this._userid = void 0, this._provider = void 0, a.removeStorageSync(u.USERID), a.removeStorageSync(u.PROVIDER);
    }, e.prototype.getUserId = function () {
      return this._userid;
    }, e.prototype.getProvider = function () {
      return this._provider;
    }, e.prototype.getIdType = function () {
      return this._idType;
    }, e.prototype.getIdTracking = function () {
      var e = {};
      return this._uuid && (e.uuid = this._uuid), this._userid && (e.userid = this._userid), e;
    }, e;
  }())),
  l = (c = null, function () {
    return c || (c = new p()), c;
  }),
  d = function () {
    var e = null;
    function t() {
      var e = !1,
        t = null,
        n = [];
      this.addPageStart = function (n) {
        n && !e && (t = {
          ts: Date.now(),
          path: n,
          page_name: n
        }, e = !0);
      }, this.addPageEnd = function (r) {
        if (e && r && t && r === t.page_name) {
          var i = Date.now() - t.ts;
          t.duration = Math.abs(i), n.push(t), t = null, e = !1;
        }
      }, this.get = function () {
        return n;
      }, this.getCurrentPage = function () {
        return t;
      }, this.clear = function () {
        n.length = 0;
      };
    }
    return function () {
      return e || (e = new t()), e;
    };
  }(),
  h = {},
  g = function () {
    var e = null,
      n = [],
      r = "";
    function i() {
      return {
        add: function add(e, i) {
          t().v("share origin: %o", e);
          var o = {
            title: e && e.title,
            path: e && e.path && e.path.split("?")[0],
            _um_sts: Date.now()
          };
          o.path && o.path.length > 1 && f.startsWith(o.path, "/") && (o.path = f.trimStart(o.path, "/"));
          var a = e.path || "",
            s = l().getId();
          if (s) {
            var u = r.split(","),
              c = (u = u.filter(function (e) {
                return e.length > 0;
              })).indexOf(s);
            c >= 0 && (u = u.slice(0, c)), u.length < 3 && u.push(s);
            var p = u.join(",");
            -1 !== a.indexOf("?") ? a += "&_um_ssrc=" + p : a += "?_um_ssrc=" + p;
            var d = Date.now();
            if (a += "&_um_sts=" + d, i) {
              var g = function (e) {
                  var t = [];
                  for (var n in e) "_um_ssrc" !== n && "_um_sts" !== n && t.push(n + "=" + e[n]);
                  return t.join("&");
                }(h),
                v = g ? g + "&_um_ssrc=" + p + "&_um_sts=" + d : "_um_ssrc=" + p + "&_um_sts=" + d;
              e.query = e.query ? e.query + "&_um_ssrc=" + p + "&_um_sts=" + d : v;
            } else e.path = a;
            o._um_ssrc = p, o._um_sts = d;
          }
          return n.push(o), t().v("share: %o", e), e;
        },
        setShareSource: function setShareSource(e) {
          r = e;
        },
        clear: function clear() {
          n.length = 0;
        },
        get: function get() {
          return n;
        }
      };
    }
    return function () {
      return e || (e = new i()), e;
    };
  }(),
  v = function v(e) {
    if (e) try {
      return JSON.stringify(e);
    } catch (e) {}
    return "";
  },
  _ = function _(e) {
    if (e) try {
      return JSON.parse(e);
    } catch (e) {}
    return null;
  },
  y = function () {
    var e = null,
      t = "",
      r = null,
      i = !1;
    function o() {
      this.load = function (e) {
        r ? (a.removeStorage(t), e()) : (t = "um_cache_" + n().appKey(), a.getStorage(t, function (n) {
          r = _(n) || {}, i = !0, a.removeStorage(t), e();
        }));
      }, this.save = function () {
        r && a.setStorage(t, v(r));
      }, this.set = function (e, t) {
        r && (r[e] = t);
      }, this.get = function (e) {
        return (r || {})[e];
      }, this.remove = function (e) {
        r && r[e] && delete r[e];
      }, this.getAll = function () {
        return r;
      }, this.clear = function () {
        r = null;
      }, this.has = function (e) {
        return !!this.get(e);
      }, this.isLoaded = function () {
        return i;
      };
    }
    return function () {
      return e || (e = new o()), e;
    };
  }(),
  m = function () {
    var e,
      n,
      r = [],
      i = [];
    function o() {
      if (r.length) {
        var e = y().get("ekvs");
        (function (e) {
          var t = 0;
          for (var n in e) Array.isArray(e[n]) && (t += e[n].length);
          return t;
        })(e) + r.length <= 1e4 && (e = a(e, r), y().set("ekvs", e));
      }
    }
    function a(e, t) {
      var r = (e = e || {})[n];
      return Array.isArray(r) && r.length ? e[n] = r.concat(t) : e[n] = [].concat(t), e;
    }
    return function () {
      return e || (e = {
        addEvent: function addEvent(e) {
          n ? (r.unshift(e), r.length > 1 && (o(), r.length = 0)) : (t().w("session id is null: ", n), i.unshift(e));
        },
        setSessionId: function setSessionId(e) {
          if (n = e, t().v("setSessionId: ", n), Array.isArray(i) && i.length && n) {
            for (var r = 0; r < i.length; r++) this.addEvent(i[r]);
            i.length = 0;
          }
        },
        getEkvs: function getEkvs() {
          var e = y().get("ekvs");
          return r && r.length && (e = a(e, r)), e;
        },
        clear: function clear() {
          y().remove("ekvs"), r.length = 0;
        }
      }), e;
    };
  }(),
  S = "2g",
  I = "3g",
  E = "4g",
  O = "half_session",
  A = "close_session",
  N = "ekv",
  T = ["access", "access_subtype"],
  w = function () {
    var e = null;
    function t() {
      var e = !1,
        t = {};
      function r(e) {
        var r = y().get(u.IMPRINT);
        r && (t.imprint = r), t.device_type = "Phone", t.sdk_version = u.IMPL_VERSION, t.appkey = n().appKey(), a.getDeviceInfo(function (e) {
          t.device_info = e || "";
        });
        var i = a.getAppInfoSync();
        t.appid = i.appId, t.app_env = i.appEnv, t.app_version = i.appVersion, a.getSystemInfo(function (n) {
          a.getNetworkInfo(function (r) {
            var i = function (e, t) {
              var n = {};
              (e = e || {}).safeArea = e.safeArea || {};
              var r = (t = t || {}).networkType;
              "none" === r && (r = "unknown");
              var i = e.model || "",
                o = e.platform || "",
                s = e.brand || "",
                u = s.toLowerCase();
              switch (n.sdk_type = a.getSdkType(), n.platform = a.getPlatform(), n.platform_sdk_version = e.platformSDKVersion, n.platform_version = e.platformVersion, n.resolution = e.resolution, n.pixel_ratio = e.pixelRatio, n.os = o, n.font_size_setting = e.fontSizeSetting, n.device_model = i, n.device_brand = s, n.device_manufacturer = u, n.device_manuid = i, n.device_name = i, n.os_version = e.OSVersion, n.language = e.language, n.theme = e.theme, n.benchmark_level = e.benchmarkLevel, n.status_bar_height = e.statusBarHeight, n.safe_area_top = e.safeArea.top, n.safe_area_left = e.safeArea.left, n.safe_area_right = e.safeArea.right, n.safe_area_bottom = e.safeArea.bottom, n.safe_area_height = e.safeArea.height, n.safe_area_width = e.safeArea.width, n.storage = e.storage, n.screen_width = e.screenWidth, n.screen_height = e.screenHeight, n.host = e.host, r = r ? r.toLowerCase() : "") {
                case E:
                  n.access_subtype = "LTE", n.access = "4G";
                  break;
                case I:
                  n.access_subtype = "CDMA", n.access = "3G";
                  break;
                case S:
                  n.access_subtype = "GRPS", n.access = "2G";
                  break;
                default:
                  n.access = r, delete n.access_subtype;
              }
              return n;
            }(n, r);
            f.assign(t, i), e && e();
          });
        });
      }
      return {
        init: function init() {
          r(function () {
            e = !0;
          });
        },
        isLoaded: function isLoaded() {
          return e;
        },
        get: function get() {
          return t;
        },
        getRealtimeFields: function getRealtimeFields() {
          var e = {};
          return T.forEach(function (n) {
            e[n] = t[n];
          }), e;
        },
        setIdTracking: function setIdTracking(e) {
          this.setItem("id_tracking", e);
        },
        setIdType: function setIdType(e) {
          this.setItem("id_type", e);
        },
        setAppVersion: function setAppVersion(e) {
          this.setItem("app_version", e);
        },
        setSuperProperty: function setSuperProperty(e) {
          t.sp || (t.sp = {}), t.sp.isv = e;
        },
        getSuperProperty: function getSuperProperty() {
          return t && t.sp ? t.sp.isv : "";
        },
        setItem: function setItem(e, n) {
          t[e] = n;
        },
        getItem: function getItem(e) {
          return t[e];
        }
      };
    }
    return {
      instance: function instance() {
        return e || (e = t()), e;
      }
    };
  }(),
  k = function () {
    var e = null,
      n = null,
      r = null;
    return function () {
      return e || (e = {
        resume: function resume(e) {
          var i = !1;
          r || (r = y().get(u.CURRENT_SESSION));
          var o = new Date();
          return n = o.getTime(), !r || !r.end_time || n - r.end_time > u.SESSION_INTERVAL ? (i = !0, function (e) {
            try {
              var n = (r || {}).options || {},
                i = f.assign({}, function (e) {
                  var n = {};
                  for (var r in e) 0 === r.indexOf("_um_") && (n[r] = e[r]);
                  return t().v("query: ", e), t().v("_um_params: ", n), n;
                }(e.query));
              i.path = e.path || n.path, "gaode" !== a.getPlatform() && (i.scene = e.scene ? a.getPlatform() + "_" + e.scene : n.scene);
              var o = e.referrerInfo;
              o && (i.referrerAppId = o.appId), t().v("session options: ", i);
              var s = i[u.UM_SSRC];
              s && g().setShareSource(s);
              var c = Date.now();
              r = {
                id: f.getRandomStr(10) + c,
                start_time: c,
                options: i
              };
            } catch (e) {
              t().e("生成新session失败: ", e);
            }
          }(e), t().v("开始新的session(%s): ", r.id, r)) : t().v("延续上一次session(%s): %s ", r.id, o.toLocaleTimeString(), r), i;
        },
        pause: function pause() {
          !function () {
            if (r) {
              var e = new Date();
              r.end_time = e.getTime(), "number" != typeof r.duration && (r.duration = 0), r.duration = r.end_time - n, y().set(u.CURRENT_SESSION, r), t().v("退出会话(%s): %s ", r.id, e.toLocaleTimeString(), r);
            }
          }();
        },
        getCurrentSessionId: function getCurrentSessionId() {
          return (r || {}).id;
        },
        getCurrentSession: function getCurrentSession() {
          return r;
        },
        cloneCurrentSession: function cloneCurrentSession() {
          return f.clone(r);
        }
      }), e;
    };
  }();
function b(e) {
  var t = null;
  switch (e) {
    case O:
      t = function () {
        var e = null,
          t = k().cloneCurrentSession();
        return t && (e = {
          header: {
            st: "1"
          },
          analytics: {
            sessions: [t]
          }
        }), e;
      }();
      break;
    case A:
      t = function () {
        var e = null,
          t = {},
          n = k().cloneCurrentSession();
        if (n) {
          var r = d().get(),
            i = g().get();
          Array.isArray(r) && r.length && (n.pages = f.clone(r)), Array.isArray(i) && i.length && (n.shares = f.clone(i)), d().clear(), g().clear(), t.sessions = [n];
        }
        var o = m().getEkvs();
        return o && (t.ekvs = f.clone(o), m().clear()), (t.sessions || t.ekvs) && (e = {
          analytics: t
        }), e;
      }();
      break;
    case N:
      t = function () {
        var e = null,
          t = m().getEkvs();
        return t && (e = {
          analytics: {
            ekvs: f.clone(t)
          }
        }, m().clear()), e;
      }();
  }
  return t;
}
var D = {
    sessions: "sn",
    ekvs: "e",
    active_user: "active_user"
  },
  U = {
    sdk_type: "sdt",
    access: "ac",
    access_subtype: "acs",
    device_model: "dm",
    language: "lang",
    device_type: "dt",
    device_manufacturer: "dmf",
    device_name: "dn",
    platform_version: "pv",
    id_type: "it",
    font_size_setting: "fss",
    os_version: "ov",
    device_manuid: "did",
    platform_sdk_version: "psv",
    device_brand: "db",
    appkey: "ak",
    _id: "id",
    id_tracking: "itr",
    imprint: "imp",
    sdk_version: "sv",
    resolution: "rl",
    testToken: "ttn",
    theme: "t5",
    benchmark_level: "bml",
    screen_width: "sw",
    screen_height: "sh",
    status_bar_height: "sbh",
    safe_area_top: "sat",
    safe_area_left: "sal",
    safe_area_right: "sar",
    safe_area_bottom: "sab",
    safe_area_height: "sah",
    safe_area_width: "saw",
    pixel_ratio: "pr",
    storage: "s7",
    host: "hs"
  },
  R = {
    uuid: "ud",
    unionid: "und",
    openid: "od",
    anonymousid: "nd",
    alipay_id: "ad",
    device_id: "dd",
    userid: "puid"
  };
function P(e, t) {
  var n = L(e, t);
  return e && e.id_tracking && (n[t.id_tracking || "id_tracking"] = L(e.id_tracking, R)), n;
}
function L(e, t) {
  var n = {};
  for (var r in e) t[r] ? n[t[r]] = e[r] : n[r] = e[r];
  return n;
}
function C(e, t) {
  var n = {};
  if (e) for (var r in e) e[r] && (n[t[r]] = e[r]);
  return n;
}
var x = "";
function M() {
  return x;
}
var V = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  j = function (e) {
    for (var t = {}, n = 0, r = e.length; n < r; n++) t[e.charAt(n)] = n;
    return t;
  }(V),
  F = String.fromCharCode,
  G = function G(e) {
    if (e.length < 2) return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? F(192 | t >>> 6) + F(128 | 63 & t) : F(224 | t >>> 12 & 15) + F(128 | t >>> 6 & 63) + F(128 | 63 & t);
    var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
    return F(240 | t >>> 18 & 7) + F(128 | t >>> 12 & 63) + F(128 | t >>> 6 & 63) + F(128 | 63 & t);
  },
  q = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
  K = function K(e) {
    var t = [0, 2, 1][e.length % 3],
      n = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);
    return [V.charAt(n >>> 18), V.charAt(n >>> 12 & 63), t >= 2 ? "=" : V.charAt(n >>> 6 & 63), t >= 1 ? "=" : V.charAt(63 & n)].join("");
  },
  H = function H(e) {
    return function (e) {
      return e.replace(q, G);
    }(e).replace(/[\s\S]{1,3}/g, K);
  },
  Y = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
  J = function J(e) {
    switch (e.length) {
      case 4:
        var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
        return F(55296 + (t >>> 10)) + F(56320 + (1023 & t));
      case 3:
        return F((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
      default:
        return F((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));
    }
  },
  B = function B(e) {
    var t = e.length,
      n = t % 4,
      r = (t > 0 ? j[e.charAt(0)] << 18 : 0) | (t > 1 ? j[e.charAt(1)] << 12 : 0) | (t > 2 ? j[e.charAt(2)] << 6 : 0) | (t > 3 ? j[e.charAt(3)] : 0),
      i = [F(r >>> 16), F(r >>> 8 & 255), F(255 & r)];
    return i.length -= [0, 0, 2, 1][n], i.join("");
  },
  X = function X(e) {
    return function (e) {
      return e.replace(/[\s\S]{1,4}/g, B);
    }(e).replace(Y, J);
  },
  W = function W(e, t) {
    return t ? H(String(e)).replace(/[+\/]/g, function (e) {
      return "+" == e ? "-" : "_";
    }).replace(/=/g, "") : H(String(e));
  },
  z = function z(e) {
    return X(String(e).replace(/[-_]/g, function (e) {
      return "-" == e ? "+" : "/";
    }).replace(/[^A-Za-z0-9\+\/]/g, ""));
  },
  Q = new function () {
    var e = "",
      t = this;
    this.set = function (t) {
      e = t;
    }, this.get = function () {
      return e;
    }, this.getImpObj = function () {
      return _(z(e));
    }, this.getItem = function (e) {
      var n = t.getImpObj();
      return n && n[e] || "";
    }, this.load = function () {
      e = y().get(u.IMPRINT);
    }, this.save = function () {
      e && y().set(u.IMPRINT, e);
    };
  }();
function Z(e, n, r, i) {
  w.instance().setIdType(l().getIdType()), w.instance().setIdTracking(l().getIdTracking());
  var o = l().getUserId();
  o && e.analytics && (e.analytics.active_user = {
    puid: o,
    provider: l().getProvider()
  });
  var s = f.clone(w.instance().get());
  e.header = f.assign(s, e.header, {
    ts: Date.now(),
    testToken: M(),
    traceId: f.getRandomStr(10) + Date.now() + f.getRandomStr(9)
  });
  var c = function (e) {
      return {
        h: P(e.header, U),
        a: C(e.analytics, D)
      };
    }(e),
    p = v(c),
    d = {
      url: u.ENDPOINT + u.LOG_URL,
      method: "POST",
      data: c,
      success: function success(i) {
        var o = i.code || i.status || i.statusCode;
        200 === o || 413 === o ? (t().i("数据发送成功: ", e, p), function (e) {
          e && (w.instance().setItem(u.IMPRINT, e), Q.set(e), Q.save(), t().v("imprint: ", Q.getImpObj()), Q.getItem("ttn_invalid") && (x = ""));
        }((i.data || {}).imprint), "function" == typeof n && n(i)) : (t().w("数据发送失败: ", p), "function" == typeof r && r());
      },
      fail: function fail() {
        t().w("超时: ", p), "function" == typeof r && r();
      },
      complete: function complete() {
        "function" == typeof i && i();
      }
    };
  a.request(f.assign(d, {
    header: {
      "Msg-Type": a.getSdkType() + "/json",
      "disable-base64": "Y"
    }
  }));
}
function $(e) {
  var t = e,
    n = [];
  this.enqueue = function (e) {
    "number" == typeof t && this.size() >= t && this.dequeue(), n.push(e);
  }, this.dequeue = function () {
    return n.shift();
  }, this.front = function () {
    return n[0];
  }, this.isEmpty = function () {
    return 0 === n.length;
  }, this.clear = function () {
    n.length = 0;
  }, this.size = function () {
    return n.length;
  }, this.items = function () {
    return n;
  }, this.print = function () {
    console.log(n.toString());
  };
}
var ee = function () {
    var e = null,
      n = !1,
      r = [],
      i = new $(50);
    function o(e, t, n) {
      if (w.instance().isLoaded()) {
        t = t || {};
        var r = b(e);
        if (r) {
          var a = w.instance().getRealtimeFields();
          r.header = f.assign({}, r.header, a), r.noCache = t.noCache, i.enqueue(r);
        }
        "function" == typeof n && n();
      } else setTimeout(function () {
        o(e, t, n);
      }, 100);
    }
    function a(e) {
      var t = i.front();
      t ? Z(t, function () {
        i.dequeue(), a(e);
      }, function () {
        var t = i.dequeue();
        t && !t.noCache && r.push(t), a(e);
      }) : (r.forEach(function (e) {
        i.enqueue(e);
      }), r.length = 0, e());
    }
    function s(e) {
      l().getId() ? n ? t().i("队列正在发送中") : (n = !0, a(function () {
        n = !1, "function" == typeof e && e();
      })) : (t().i("获取id标识失败，暂缓发送"), "function" == typeof e && e());
    }
    function c() {
      this.send = function (e, t, n) {
        e ? this.add(e, t, function () {
          s(n);
        }) : s(n);
      }, this.add = function (e, t, n) {
        o(e, t, n);
      }, this.load = function () {
        var e = y().get(u.REQUESTS);
        e && e.length && e.forEach(function (e) {
          i.enqueue(e);
        }), y().remove(u.REQUESTS);
      }, this.save = function () {
        y().set(u.REQUESTS, f.clone(i.items())), i.clear();
      };
    }
    return function () {
      return e || (e = new c()), e;
    };
  }(),
  te = function () {
    var e = null,
      r = null;
    function i() {
      function e(e) {
        if (e && "object" == typeof(e)) {
          var r = y().get(u.USER_INFO);
          return r && f.deepEqual(e, r) || function (e, r) {
            var i = n().appKey(),
              o = a.getSdkType(),
              s = l().getId(),
              c = l().getIdType();
            if (i && o && s && c) {
              var f = {
                  ak: n().appKey(),
                  sdt: a.getSdkType(),
                  uin: e.nickName,
                  uia: e.avatar || e.avatarUrl,
                  uig: e.gender,
                  uit: e.country,
                  uip: e.province,
                  uic: e.city,
                  uil: e.language,
                  id: l().getId(),
                  it: l().getIdType(),
                  age: e.age,
                  cln: e.constellation
                },
                p = JSON.stringify(f);
              p = W(p), a.request({
                url: u.ENDPOINT + u.USERINFO_URL,
                method: "POST",
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                data: "ui=" + p,
                success: function success(n) {
                  t().v("用户信息上传成功: ", e), r && r(n && n.data && 200 === n.data.code);
                },
                fail: function fail() {
                  t().e("用户信息上传失败: ", e), r && r(!1);
                }
              });
            }
          }(e, function (t) {
            t && y().set(u.USER_INFO, e);
          }), !0;
        }
        return !1;
      }
      this.setUserInfo = function (e) {
        r = e;
      }, this.update = function () {
        e(r) || a.getUserInfo(function (t) {
          e(t);
        });
      };
    }
    return function () {
      return e || (e = new i()), e;
    };
  }();
function ne(e, t) {
  this.id = e, this.ts = Date.now();
  var n = typeof(t);
  if ("string" === n && t) this[e] = t;else if ("object" === n) for (var r in t) ({}).hasOwnProperty.call(t, r) && (this[r] = t[r]);
}
function ie() {
  var e = !1,
    r = !1,
    i = 0;
  this.init = function (r) {
    t().v("sdk version: " + u.IMPL_VERSION), e ? t().v("Lib重复实例化") : y().load(function () {
      t().v("cache初始化成功: ", y().getAll()), l().setUseOpenid && l().setUseOpenid(n().useOpenid()), l().init(function () {
        w.instance().init(), t().v("Header初始化成功");
      }), e = !0, "function" == typeof r && r(), t().tip("SDK集成成功");
    });
  }, this.resume = function (i) {
    var o;
    e && !r && (t().v("showOptions: ", i), r = !0, n().enableVerify() && i && i.query && (o = i.query._ttn, x = o || x), this._resume(i));
  }, this._resume = function (e) {
    ee().load();
    var r = k().resume(e),
      i = k().getCurrentSessionId();
    function o(e, r) {
      l().getId() || e <= 0 || l().getOpenIdAsync(n().appKey(), function (n) {
        n ? (t().v("获取id成功"), ee().send()) : (t().v("获取openid失败,启动重试,剩余可用次数", e - 1), setTimeout(function () {
          o(e - 1, r);
        }, r));
      });
    }
    m().setSessionId(i), r && ee().add(O, {}, function () {
      l().setUseOpenid && l().setUseOpenid(n().useOpenid()), n().useOpenid() && n().autoGetOpenid() && !l().getId() ? (t().v("get id async"), o(10, 3e3)) : (t().v("session auto send"), ee().send());
    });
  }, this.pause = function (o) {
    e && (r = !1, i = 0, k().pause(), n().uploadUserInfo() && te().update(), ee().send(A, {}, function () {
      ee().save(), y().save(), t().v("cache save success"), "function" == typeof o && o();
    }));
  }, this.setOpenid = function (e) {
    t().v("setOpenId: %s", e), l().setOpenid(e), ee().send();
  }, this.setUnionid = function (e) {
    t().v("setUnionid: %s", e), l().setUnionid(e);
  }, this.setUserid = function (e, n) {
    t().v("setUserid: %s", e, n), l().setUserid(e, n);
  }, this.removeUserid = function () {
    t().v("removeUserid"), l().removeUserid();
  }, this.setUserInfo = function (e) {
    t().v("setUserInfo: %s", e), te().setUserInfo(e);
  }, this.setAnonymousid = function (e) {
    t().v("setAnonymousId: %s", e), l().setAnonymousid(e), ee().send();
  }, this.setAppVersion = function (e) {
    e && "string" != typeof e ? t().w("setAppVersion方法只接受字符串类型参数") : w.instance().setAppVersion(e);
  }, this.setAlipayUserid = function (e) {
    e && "string" != typeof e ? t().w("setAlipayUserid方法只接受字符串类型参数") : (t().v("setAlipayUserid: %s", e), l().setAlipayUserid(e));
  }, this.setDeviceId = function (e) {
    if ("string" == typeof e) return l().setDeviceId(e), e;
  }, this.setSuperProperty = function (e) {
    if (e && "string" != typeof e) t().w("超级属性只支持字符串类型");else {
      var n = this;
      w.instance().getSuperProperty() !== e && (w.instance().setSuperProperty(e), n.pause(function () {
        n.resume();
      }));
    }
  }, this.trackEvent = function (n, r) {
    if (e && (t().v("event: ", n, r), function (e, n) {
      if (!e || "string" != typeof e) return t().e('please check trackEvent id. id should be "string" and not null'), !1;
      var r = ["id", "ts", "du"],
        i = {};
      if (r.forEach(function (e) {
        i[e] = 1;
      }), i[e]) return t().e("eventId不能与以下保留字冲突: " + r.join(",")), !1;
      if (e.length > u.MAX_EVENTID_LENGTH) return t().e("The maximum length of event id shall not exceed " + u.MAX_EVENTID_LENGTH), !1;
      if (n && ("object" != typeof(n) || Array.isArray(n)) && "string" != typeof n) return t().e("please check trackEvent properties. properties should be string or object(not include Array)"), !1;
      if ("object" == typeof(n)) {
        var o = 0;
        for (var a in n) if ({}.hasOwnProperty.call(n, a)) {
          if (a.length > u.MAX_PROPERTY_KEY_LENGTH) return t().e("The maximum length of property key shall not exceed " + u.MAX_PROPERTY_KEY_LENGTH), !1;
          if (o >= u.MAX_PROPERTY_KEYS_COUNT) return t().e("The maximum count of properties shall not exceed " + u.MAX_PROPERTY_KEYS_COUNT), !1;
          if (i[a]) return t().e("属性中的key不能与以下保留字冲突: " + r.join(",")), !1;
          o += 1;
        }
      }
      return !0;
    }(n, r))) {
      var o = new ne(n, r);
      m().addEvent(o);
      var a = !!M(),
        s = a ? 0 : u.EVENT_SEND_DEFAULT_INTERVAL,
        c = Date.now();
      ("number" != typeof i || "number" != typeof s || i <= 0 || c - i > s) && (i = c, ee().send(N, {
        noCache: a
      }, function () {}));
    }
  }, this.trackShare = function (n) {
    if (e) try {
      a.getSdkType().indexOf("game") > -1 ? (n = g().add(n, !0), t().v("shareQuery: ", n)) : (n = g().add(n, !1), t().v("sharePath: ", n.path));
    } catch (e) {
      t().v("shareAppMessage: ", e);
    }
    return n;
  }, this.trackPageStart = function (t) {
    e && d().addPageStart(t);
  }, this.trackPageEnd = function (t) {
    e && d().addPageEnd(t);
  }, this.onShareAppMessage = function (e) {
    var t = this;
    a.onShareAppMessage(function () {
      return t.trackShare(e());
    });
  }, this.shareAppMessage = function (e) {
    this.trackShare(e), a.shareAppMessage(e);
  };
}
var re = [];
function oe() {}
oe.prototype = {
  createMethod: function createMethod(e, n, r) {
    try {
      e[n] = r && r[n] ? function () {
        return r[n].apply(r, arguments);
      } : function () {
        re.push([n, [].slice.call(arguments)]);
      };
    } catch (e) {
      t().v("create method errror: ", e);
    }
  },
  installApi: function installApi(e, n) {
    try {
      var r,
        i,
        o = "resume,pause,trackEvent,trackPageStart,trackPageEnd,trackShare,setUserid,setOpenid,setUnionid,onShareAppMessage,shareAppMessage".split(",");
      for (r = 0, i = o.length; r < i; r++) this.createMethod(e, o[r], n);
      if (n) for (r = 0, i = re.length; r < i; r++) {
        var a = re[r];
        try {
          n[a[0]].apply(n, a[1]);
        } catch (e) {
          t().v("impl[v[0]].apply error: ", a[0], e);
        }
      }
    } catch (e) {
      t().v("install api errror: ", e);
    }
  }
};
var se = [u.ENDPOINT, u.ENDPOINTB];
function ae(e, n) {
  var r, i;
  if (0 === e || 1 === e && n ? r = u.ENDPOINT : 2 === e && n ? r = u.ENDPOINTB : n && (r = se[e]), e >= se.length || n) return n && (i = r, u.ENDPOINT = i), n && t().v("命中可用服务", r), !n && t().tip_w("未命中可用服务"), !1;
  a.request({
    url: u.ENDPOINT + "/uminiprogram_logs/ckdh",
    success: function success(t) {
      200 === (t.code || t.status || t.statusCode) && t.data && 200 === t.data.code ? ae(e + 1, !0) : ae(e + 1, !1);
    },
    fail: function fail() {
      ae(e + 1, !1);
    }
  });
}
var ue = {
    init: function init(e) {
      u.ENDPOINTB && setTimeout(function () {
        ae(0, !1);
      }, e);
    }
  },
  ce = new oe(),
  fe = {
    _inited: !1,
    _log: t(),
    preinit: function preinit(e) {
      if (e && "object" == typeof(e)) for (var t in e) u[t] = e[t];
      return u;
    },
    use: function use(e, t) {
      return e && f.isFunction(e.install) ? e.install(fe, t) : f.isFunction(e) && e(fe, t), fe;
    },
    messager: r,
    init: function init(e) {
      if (this._inited) t().v("已经实例过，请避免重复初始化");else if (e) {
        if (e.appKey) {
          "boolean" != typeof e.useOpenid && (e.useOpenid = !0), n().set(e), t().setDebug(e.debug), this._inited = !0;
          var i = this;
          r.emit(r.messageType.CONFIG_LOADED, e);
          try {
            var o = new ie();
            t().v("成功创建Lib对象"), o.init(function () {
              t().v("Lib对象初始化成功"), ce.installApi(i, o), t().v("安装Lib接口成功"), r.emit(r.messageType.UMA_LIB_INITED, e);
            }), ue.init(3e3);
          } catch (e) {
            t().w("创建Lib对象异常: " + e);
          }
        } else t().err("请确保传入正确的appkey");
      } else t().err("请正确设置相关信息！");
    }
  };
try {
  ce.installApi(fe, null);
} catch (e) {
  t().w("uma赋值异常: ", e);
}
var pe = "https://ucc.umeng.com/v1/mini/fetch",
  le = "https://pslog.umeng.com/mini_ablog",
  de = "2.8.0",
  he = "none",
  ge = {},
  ve = Array.isArray;
ge.isArray = ve || function (e) {
  return "[object Array]" === toString.call(e);
}, ge.isObject = function (e) {
  return e === Object(e) && !ge.isArray(e);
}, ge.isEmptyObject = function (e) {
  if (ge.isObject(e)) {
    for (var t in e) if (hasOwnProperty.call(e, t)) return !1;
    return !0;
  }
  return !1;
}, ge.isUndefined = function (e) {
  return void 0 === e;
}, ge.isString = function (e) {
  return "[object String]" === toString.call(e);
}, ge.isDate = function (e) {
  return "[object Date]" === toString.call(e);
}, ge.isNumber = function (e) {
  return "[object Number]" === toString.call(e);
}, ge.each = function (e, t, n) {
  if (null != e) {
    var r = {},
      i = Array.prototype.forEach;
    if (i && e.forEach === i) e.forEach(t, n);else if (e.length === +e.length) {
      for (var o = 0, a = e.length; o < a; o++) if (o in e && t.call(n, e[o], o, e) === r) return;
    } else for (var s in e) if (hasOwnProperty.call(e, s) && t.call(n, e[s], s, e) === r) return;
  }
}, ge.buildQuery = function (e, t) {
  var n,
    r,
    i = [];
  return void 0 === t && (t = "&"), ge.each(e, function (e, t) {
    n = encodeURIComponent(e.toString()), r = encodeURIComponent(t), i[i.length] = r + "=" + n;
  }), i.join(t);
}, ge.JSONDecode = function (e) {
  if (e) {
    try {
      return JSON.parse(e);
    } catch (e) {
      console.error("JSONDecode error", e);
    }
    return null;
  }
}, ge.JSONEncode = function (e) {
  try {
    return JSON.stringify(e);
  } catch (e) {
    console.error("JSONEncode error", e);
  }
};
var _e = Object.create(null);
function ye(e) {
  t().v("开始构建 fetch body"), a.getSystemInfo(function (t) {
    a.getNetworkInfo(function (r) {
      var i = (r = r || {}).networkType;
      i = i === he ? "unknown" : i.toUpperCase(), _e.access = i, function (e, t) {
        var r = e.brand || "";
        if (_e.deviceType = "Phone", _e.sdkVersion = de, _e.appkey = n().appKey(), _e.sdkType = a.getSdkType(), _e.umid = l().getId(), e) {
          _e.language = e.language || "", _e.os = e.OS, _e.osVersion = e.OSVersion, _e.deviceName = e.deviceName, _e.platformVersion = e.platformVersion, _e.platformSdkVersion = e.platformSDKVersion, _e.deviceBrand = r;
          var i = e.resolution.split("*");
          ge.isArray(i) && (_e.resolutionHeight = Number(i[0]), _e.resolutionWidth = Number(i[1]));
        }
        !function (e) {
          e && (_e.installTime = e.install_datetime && Date.parse(e.install_datetime), _e.scene = e.install_scene, _e.channel = e.install_channel, _e.campaign = e.install_campaign);
        }(Q.getImpObj()), t && t(_e);
      }(t, e);
    });
  });
}
var me = Object.create(null),
  Se = null,
  Ie = !1,
  Ee = {
    minFetchIntervalSeconds: 43200
  };
function Oe(e) {
  e && ge.each(e, function (e) {
    me[e.k] = e;
  });
}
function Ae() {
  var e = this;
  this.STORAGE_NAME = null, r.once(r.messageType.CONFIG_LOADED, function (n) {
    t().v("云配初始化开始..."), e.init(n);
  });
}
Ae.prototype = {
  setDefaultValues: function setDefaultValues(e) {
    Ie && ge.isObject(e) && ge.each(e, function (e, t) {
      me[t] && me[t].v || (me[t] = {
        v: e
      });
    });
  },
  getValue: function getValue(e) {
    t().v("从配置项中读取 value, 当前配置为: ", me), t().v("待读取的 key : ", e);
    try {
      if (!Ie) return;
      var r = me[e] || {};
      return t().v("读取相应配置ing..., 结果为: ", r), ge.isNumber(r.e) && ge.isNumber(r.g) && (t().v("读取到相应配置, 开始数据上报..."), function (e) {
        var r = {
          appkey: n().appKey(),
          sdkType: a.getSdkType(),
          expId: e && e.e,
          groupId: e && e.g,
          clientTs: Date.now(),
          key: e && e.k,
          value: e && e.v,
          umid: l().getId()
        };
        try {
          a.request({
            url: le,
            method: "POST",
            data: [r],
            success: function success(e) {
              e && 200 === e.statusCode ? t().v("上传数据成功", r) : t().w("ablog 请求成功, 返回结果异常 ", e);
            },
            fail: function fail(e) {
              t().w("ablog 请求数据错误 ", r, e);
            }
          });
        } catch (e) {
          t().w("urequest 调用错误", e);
        }
      }(r)), r.v;
    } catch (n) {
      t().w("getValue error, key: ", e);
    }
  },
  active: function active(e) {
    try {
      if (!Ie) return;
      var n, r;
      e && e.params && (n = e.params), e && e.callback && (r = e.callback), t().v("激活配置项: ", n), n ? (t().v("本地已缓存的配置项: ", me), Oe(n), t().v("合并后的配置项: ", me), r && r(me), t().v("active 结束")) : (t().v("配置项为空!! 读取本地配置..."), a.getStorage(this.STORAGE_NAME, function (e) {
        e ? (Oe((e = ge.JSONDecode(e) || {}).params), t().v("当前本地配置项为: ", me), r && r(me), t().v("active 结束")) : t().v("当前本地配置项为空, 退出激活");
      }));
    } catch (e) {
      t().w("SDK active 错误", e);
    }
  },
  init: function init(e) {
    e.appKey && (Se = e.appKey, this.STORAGE_NAME = "um_remote_config_{{" + Se + "}}"), Se ? Ie ? t().w("SDK 已经初始化, 请避免重复初始化") : (Ie = !0, this.setOptions(e), this.active()) : t().err("请检查您的小程序 appKey, appKey 不能为空");
  },
  setOptions: function setOptions(e) {
    if (ge.isObject(e)) {
      var t = e.minFetchIntervalSeconds;
      ge.isNumber(t) && (Ee.minFetchIntervalSeconds = Math.max(t, 5));
    }
  },
  fetch: function fetch(e) {
    if (Ie && this.STORAGE_NAME) {
      var n, r;
      e && e.active && (n = e.active), e && e.callback && (r = e.callback);
      var i = this;
      a.getStorage(this.STORAGE_NAME, function (e) {
        t().v("开始读缓存 data is ", e), (e = ge.JSONDecode(e) || {}).params && e.ts && Date.now() - e.ts < 1e3 * Ee.minFetchIntervalSeconds ? (t().v("缓存数据存在, 并且本次触发时间距离上次fetch触发时间未超过 fetch 时间间隔, 无需 fetch"), r && r(e.params)) : ye(function (e) {
          t().v("缓存数据不存在, 构建 fetch body :", e);
          try {
            a.request({
              url: pe,
              method: "POST",
              data: e,
              success: function success(e) {
                if (e && 200 === e.statusCode && e.data && e.data.cc) {
                  t().v("fetch 请求成功, 响应数据: ", e.data);
                  var o = Object.create(null);
                  ge.each(e.data.cc, function (e) {
                    o[e.k] = e;
                  });
                  var s = {
                    ts: Date.now(),
                    params: o
                  };
                  t().v("开始缓存 fetch 请求的云配置结果..."), a.setStorage(i.STORAGE_NAME, ge.JSONEncode(s), function (e) {
                    t().v("缓存云配置成功, 缓存数据为: ", s), t().v("缓存云配置成功, 成功消息为: ", e), t().v("云配拉取数据是否自动激活: ", n), e && n && (t().v("激活云配置..."), i.active({
                      params: o,
                      callback: r
                    }));
                  });
                } else t().w("fetch 请求成功,返回结果异常 ", e.data), r && r();
              },
              fail: function fail(n) {
                t().w("fetch请求数据错误 ", e, n), r && r();
              }
            });
          } catch (e) {
            t().w("urequest调用错误", e);
          }
        });
      });
    }
  }
};
var Ne = {
    install: function install(e) {
      return e.rc || (e.rc = new Ae()), e.messager.once(e.messager.messageType.CONFIG_LOADED, function () {
        e._log.v("plugin rc installed");
      }), e.rc;
    }
  },
  Te = "_um",
  we = "revenue",
  ke = "stage",
  be = "level",
  De = "running",
  Ue = "end",
  Re = "init",
  Pe = "set",
  Le = [Te, ke, "start"].join(".");
function Ce(e) {
  var t = {};
  for (var n in e) {
    var r = e[n];
    if ("object" == typeof(r)) for (var i in r) t[n + "." + i] = r[i];else t[n] = r;
  }
  return t;
}
var xe = {
  install: function install(e) {
    e.revenue = function (t) {
      e.trackEvent([Te, we, t.group].join("."), Ce(t));
    };
    var t = 0;
    return e.stage = {
      onStart: function onStart(n) {
        t = Date.now(), e.trackEvent(Le, Ce(n));
      },
      onEnd: function onEnd(n) {
        "number" != typeof n._um_sdu && (n._um_sdu = 0 !== t ? Date.now() - t : 0), e.trackEvent([Te, ke, Ue, n.event].join("."), Ce(n));
      },
      onRunning: function onRunning(t) {
        e.trackEvent([Te, ke, De, t.event].join("."), Ce(t));
      }
    }, e.level = {
      onInitLevel: function onInitLevel(t) {
        e.trackEvent([Te, be, Re].join("."), Ce(t));
      },
      onSetLevel: function onSetLevel(t) {
        e.trackEvent([Te, be, Pe].join("."), Ce(t));
      }
    }, e.messager.once(e.messager.messageType.CONFIG_LOADED, function () {
      e._log.v("plugin game-ext installed");
    }), e;
  }
};
window.wx && wx.onShow(function (e) {
  var n;
  t().v("game onShow: ", e), n = e.query, h = n, fe.resume(e, !0);
}), window.wx && wx.onHide(function () {
  t().v("game onHide"), fe.pause();
});
var Me = fe.init;
fe.init = function (e) {
  e && e.useOpenid && (t().tip_w(t().repeat("!")), t().tip_w("您选择了使用openid进行统计，请确保使用setOpenid回传openid或通过设置autoGetOpenid为true，并在友盟后台设置secret由友盟帮您获取"), t().tip_w(t().repeat("!"))), Me.call(fe, e);
}, fe.use(Ne), fe.use(xe), window.wx && (wx.uma = fe, module.exports = fe);