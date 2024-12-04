Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpSystem = exports._HttpSystem = undefined;
var r_Config = require("Config");
var r_Index = require("Index");
var r_Base64Helper = require("Base64Helper");
var r_PlayerData = require("PlayerData");
var exp__HttpSystem = function () {
  function _ctor() {
    this.gameVersion = "1.0.0";
  }
  _ctor.prototype.Get = function (e, t, o) {
    e += "?";
    var i = true;
    for (var n in t) {
      if (i) {
        e += n + "=" + t[n];
        i = false;
      } else {
        e += "&" + n + "=" + t[n];
      }
    }
    console.log("Get url=", e);
    var a = new XMLHttpRequest();
    a.onreadystatechange = function () {
      if (4 == a.readyState) {
        if (a.status >= 200 && a.status < 400) {
          var e = a.responseText;
          if (e) {
            var t = JSON.parse(e);
            o(t);
          } else {
            console.log("HttpSystem 返回数据不存在");
            o(false);
          }
        } else {
          console.log("HttpSystem 请求失败");
          o(false);
        }
      }
    };
    a.open("GET", e, true);
    a.send();
  };
  _ctor.prototype.Post = function (e, t, o) {
    var i = {};
    for (var n in t) i[n] = t[n];
    console.log("Post url=", e);
    console.log("Post postContent=", i);
    var a = new XMLHttpRequest();
    a.onreadystatechange = function () {
      if (4 == a.readyState) {
        if (a.status >= 200 && a.status < 400) {
          var e = a.responseText;
          console.log(e);
          if (e) {
            var t = JSON.parse(e);
            o(t);
          } else {
            console.log("HttpSystem 返回数据不存在");
            o(false);
          }
        } else {
          console.log("HttpSystem 请求失败");
          o(false);
        }
      }
    };
    a.open("POST", e);
    a.setRequestHeader("Access-Control-Allow-Origin", "*");
    a.setRequestHeader("Content-type", "application/json; charset=utf-8");
    a.send(JSON.stringify(i));
  };
  _ctor.prototype.pbLevelList = function (e, t) {
    for (var o = e.length - 1; o >= 0; o--) {
      t.indexOf(e[o]) > -1 && e.splice(o, 1);
    }
  };
  _ctor.prototype.getPingbiKey = function () {
    console.log("cc.sys.platform=", cc.sys.platform);
    if (cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER) {
      return "webpingbiguanka";
    } else {
      return "pingbiguanka";
    }
  };
  _ctor.prototype.uploadPlayerData = function (e) {
    if (!r_Index.Platform.isDarenPlatform() && r_PlayerData.PlayerData.data.openId && !(r_PlayerData.PlayerData.data.version <= r_PlayerData.PlayerData.serverDataVersion)) {
      r_PlayerData.PlayerData.data.version < 10 && (r_PlayerData.PlayerData.data.version = 10);
      var t = JSON.stringify(r_PlayerData.PlayerData.data);
      if (t) {
        var o = r_Base64Helper.Base64Helper.encode(t);
        o = encodeURIComponent(o);
        console.log("encodeStr: ", o);
        console.log("更新服务器用户数据上传");
        this.Post("https://wxxcx.tanyu.mobi:4443/admin/gameapi/save_cloud_user_data", {
          gameid: r_Config.default.gameId,
          data_name: "playerData_weixin",
          userid: r_PlayerData.PlayerData.data.openId,
          user_data: o
        }, function (t) {
          console.log("更新服务器用户数据上传返回:", t);
          if (!t.errcode) {
            r_PlayerData.PlayerData.serverDataVersion = r_PlayerData.PlayerData.data.version;
            console.log("更新服务器用户数据上传返回 version:", r_PlayerData.PlayerData.data.version);
            e && e();
          }
        });
      }
    }
  };
  _ctor.prototype.checkUpdateOrUploadData = function (e, t, o, n) {
    var r = this;
    undefined === e && (e = true);
    undefined === t && (t = null);
    undefined === o && (o = null);
    undefined === n && (n = null);
    console.log("checkUpdateOrUploadData PlayerData.data.openId= ", r_PlayerData.PlayerData.data.openId);
    if (r_PlayerData.PlayerData.data.openId) {
      r_PlayerData.PlayerData.setUpdateServerTime();
      console.log("刷新本地或服务器数据");
      this.Get("https://wxxcx.tanyu.mobi:4443/admin/Gameapi/get_cloud_user_data", {
        gameid: r_Config.default.gameId,
        data_name: "playerData_weixin",
        userid: r_PlayerData.PlayerData.data.openId
      }, function (i) {
        console.log("刷新本地或服务器数据返回=", i);
        if (i) {
          r_PlayerData.PlayerData.isGetServerData = true;
          var c = i.data;
          if ("" == c || !c) {
            console.log("更新服务器数据,服务器数据为空");
            r_PlayerData.PlayerData.serverDataVersion = 0;
            return void r.uploadPlayerData(t);
          }
          c = decodeURIComponent(c);
          c = r_Base64Helper.Base64Helper.decode(c);
          console.log("serverPlayerString: ", c);
          if ("" == c || !c) {
            console.log("更新服务器数据,反编码失败");
            r_PlayerData.PlayerData.serverDataVersion = 0;
            return void r.uploadPlayerData(t);
          }
          try {
            var l = JSON.parse(c + "");
            if (!l) {
              r_PlayerData.PlayerData.serverDataVersion = 0;
              console.log("更新服务器数据,解析用户数据失败1");
              return void r.uploadPlayerData(t);
            }
            console.log("PlayerData.data.version=", r_PlayerData.PlayerData.data.version);
            console.log("serverPlayerData.version=", l.version);
            if (l.version == r_PlayerData.PlayerData.data.version) {
              console.log("服务器和本地数据版本一致 version=", r_PlayerData.PlayerData.data.version);
              n && n();
            } else if (r_PlayerData.PlayerData.data.version > l.version) {
              console.log("本地数据更新服务器数据");
              r.uploadPlayerData(t);
            } else if (e && l.version > r_PlayerData.PlayerData.data.version) {
              console.log("服务器数据更新本地数据 serverPlayerData=", l);
              r_PlayerData.PlayerData.updateFromServer(l);
              r_PlayerData.PlayerData.resetData();
              o && o();
            }
          } catch (u) {
            console.error("更新服务器数据,解析用户数据失败error=", u);
            r_PlayerData.PlayerData.serverDataVersion = 0;
            r.uploadPlayerData(t);
          }
        } else {
          r.uploadPlayerData(t);
        }
      });
    }
  };
  return _ctor;
}();
exports._HttpSystem = exp__HttpSystem;
exports.HttpSystem = new exp__HttpSystem();