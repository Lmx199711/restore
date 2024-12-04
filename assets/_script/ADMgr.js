Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameInfoData = exports.SceneInfo = undefined;
var def_ADMgr = function () {
  function _ctor() {
    this.adGameId = 1004;
    this.adVersion = "1.0.0";
    this.mAdRate = -1;
    this.isPinbi = true;
    this.exchangeX = 0;
  }
  Object.defineProperty(_ctor, "Ins", {
    get: function () {
      return this.mIns = null == this.mIns ? new _ctor() : this.mIns;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "adRate", {
    get: function () {
      return this.mAdRate;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.init = function () {
    this.initOpenId();
    this.initAdRate();
    this.initTopic();
    this.initAppicon();
    this.initExchange();
  };
  _ctor.prototype.initOpenId = function () {
    var e = localStorage.getItem("openid");
    if (e) {
      this.adOpenId = e;
    } else {
      this.adOpenId = new Date().getTime() + "" + Math.ceil(1e4 * Math.random());
      localStorage.setItem("openid", this.adOpenId);
    }
    console.log("adOpenId: " + this.adOpenId);
  };
  _ctor.prototype.initAdRate = function () {
    var t = this;
    this.getLocation(function (o) {
      t.isPinbi = o;
      console.log("isPinbi", t.isPinbi);
      console.log("get location flag :: " + o);
      o && (_ctor.Ins.mAdRate = -1);
    });
  };
  _ctor.prototype.initTopic = function () {
    this.getLocation(function () {});
  };
  _ctor.prototype.initExchange = function () {
    var e = this;
    this.getExchange(function (t) {
      e.exchangeX = t.rate;
      console.log(" exchange: " + t);
    });
  };
  _ctor.prototype.getLocation = function (e) {
    this.httpRequest("isPinbi", {
      game_id: this.adGameId,
      version: this.adVersion
    }, function (t) {
      e(t);
    }.bind(this));
  };
  _ctor.prototype.getTopic = function (e) {
    this.httpRequest("adrate", {
      gameId: this.adGameId,
      version: this.adVersion,
      openId: this.adOpenId,
      key: "topic"
    }, function (t) {
      e && e(t);
    }.bind(this));
  };
  _ctor.prototype.getExchange = function (e) {
    this.httpRequest("adrate", {
      gameId: this.adGameId,
      version: this.adVersion,
      openId: this.adOpenId,
      key: "X"
    }, function (t) {
      e && e(t);
    }.bind(this));
  };
  _ctor.prototype.darenuploadvideo = function (e, t) {
    this.httpRequest("darenuploadvideo", {
      gameId: this.adGameId,
      channelId: e,
      videoid: t
    });
  };
  _ctor.prototype.getDaren = function (e, t) {
    this.httpRequest("daren", {
      gameId: this.adGameId,
      channel: e,
      channelId: t
    });
  };
  _ctor.prototype.darenshangbao = function (e, t) {
    this.httpRequest("darenshangbao", {
      gameId: this.adGameId,
      channel: e,
      channelId: t
    });
  };
  _ctor.prototype.httpRequest = function (e, t, o) {
    undefined === t && (t = {});
    undefined === o && (o = null);
    var i = new XMLHttpRequest();
    i.onreadystatechange = function () {
      if (4 == i.readyState && 500 != i.status) {
        var e = i.responseText;
        console.log(e);
        null != o && o(JSON.parse(i.responseText));
      }
    };
    var n = "";
    var a = this.entries(t || {});
    for (var s = 0; s < a.length; ++s) {
      null != a[s][1] && (n += a[s][0] + "=" + a[s][1] + "&");
    }
    var r = "https://wxxcx.tanyu.mobi:4443/admin/api/" + e + "?" + (n = n.substring(0, n.length - 1));
    console.log("url=>>>>>>>>>", r);
    i.open("GET", r, true);
    i.setRequestHeader("Access-Control-Allow-Origin", "*");
    i.send();
  };
  _ctor.prototype.entries = function (e) {
    var t = Object.keys(e);
    var o = t.length;
    for (var i = new Array(o); o--;) {
      i[o] = [t[o], e[t[o]]];
    }
    return i;
  };
  _ctor.prototype.initAppicon = function () {};
  _ctor.GetLoginExportGames = function () {
    if (this.sceneInfo.length > 0) {
      for (var e = 0; e < this.sceneInfo.length; e++) {
        if ("login" == this.sceneInfo[e].scene) {
          return this.sceneInfo[e].list;
        }
      }
    }
    return new Array();
  };
  _ctor.GetJiesuan = function () {
    if (this.sceneInfo.length > 0) {
      for (var e = 0; e < this.sceneInfo.length; e++) {
        if ("jiesuan" == this.sceneInfo[e].scene) {
          return this.sceneInfo[e].list;
        }
      }
    }
    return new Array();
  };
  _ctor.GetLunBo = function () {
    if (this.sceneInfo.length > 0) {
      for (var e = 0; e < this.sceneInfo.length; e++) {
        if ("lunbo" == this.sceneInfo[e].scene) {
          console.log(this.sceneInfo[e].scene);
          return this.sceneInfo[e].list;
        }
      }
    }
    return new Array();
  };
  _ctor.sceneInfo = new Array();
  return _ctor;
}();
exports.default = def_ADMgr;
exports.SceneInfo = function () {};
exports.GameInfoData = function () {};