Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameServer = undefined;
var exp_GameServer = function () {
  function _ctor() {}
  _ctor.createOpenId = function () {
    return new Date().getTime() + "" + Math.ceil(1e4 * Math.random());
  };
  _ctor.init = function (e, t, o, i) {
    undefined === o && (o = true);
    undefined === i && (i = "");
    this.httpRoot = "https://wxxcx.tanyu.mobi:4443";
    this.serVersion = t;
    this.mGameId = e;
    i || (i = cc.sys.localStorage.getItem("__GAME_USER_OPENID")) && 0 != i.length || (i = this.createOpenId());
    this.openId = i;
    cc.sys.localStorage.setItem("__GAME_USER_OPENID", i);
  };
  _ctor.httpDefaultGet = function (e, t, o, n, a) {
    undefined === n && (n = null);
    undefined === a && (a = 2e3);
    this.httpGet(e, __assign(__assign({}, t), {
      version: this.serVersion
    }), o, n);
  };
  _ctor.httpGet = function (e, t, o, i, n) {
    undefined === i && (i = null);
    undefined === n && (n = 2e3);
    var a = this.httpRoot + "/" + e + "?gameId=" + this.mGameId;
    if (t) {
      for (var s in t) null != t[s] && (a += "&" + s + "=" + t[s]);
    }
    var r = new XMLHttpRequest();
    r.timeout = n;
    r.onreadystatechange = function () {
      if (4 == r.readyState) {
        if (r.status >= 200 && r.status < 400) {
          o && o(JSON.parse(r.responseText));
        } else {
          console.error("请求服务数据失败:", "state=" + r.readyState, "url=" + a, "参数 ==> :", t);
        }
      }
    };
    console.log("请求的url ==> ", a);
    r.open("GET", a, true);
    r.setRequestHeader("Access-Control-Allow-Origin", "*");
    r.send();
  };
  _ctor.autoErrHttpGet = function (e, t, o) {
    this.httpDefaultGet(e, t, o, function (e) {
      console.warn("请求失败", e);
      o && o(null);
    });
  };
  _ctor.login = function (e, t) {
    undefined === t && (t = "");
    this.autoErrHttpGet("admin/api/login", {
      openId: this.openId,
      channel_id: t
    }, function () {
      e && e();
    });
  };
  _ctor.isPinBi = function (e) {
    this.autoErrHttpGet("admin/api/isPinbi", null, e);
  };
  _ctor.getWxOpenId = function (e, t) {
    this.autoErrHttpGet("admin/api/getopenid", {
      code: e
    }, function (e) {
      t && t(e);
    });
  };
  _ctor.ovRate = function (e, t, o) {
    this.autoErrHttpGet("admin/api/ovrate", {
      adid: e,
      type: t
    }, o);
  };
  _ctor.ovShowAdRate = function (e, t) {
    this.ovRate(e, "show", t);
  };
  _ctor.ovCanClickAdRate = function (e, t) {
    this.ovRate(e, "canclick", t);
  };
  _ctor.ovClickAd = function (e, t) {
    this.ovRate(e, "click", t);
  };
  _ctor.httpRoot = "";
  _ctor.mGameId = "";
  _ctor.serVersion = "";
  return _ctor;
}();
exports.GameServer = exp_GameServer;