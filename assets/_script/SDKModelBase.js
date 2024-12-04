Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SDKModelBase = undefined;
var r_Config = require("Config");
var r_GameServer = require("GameServer");
var r_SDKMgr = require("SDKMgr");
var exp_SDKModelBase = function () {
  function _ctor() {
    this.useHttps = true;
    this.mAdRate = {};
    this._isPingbi = true;
  }
  Object.defineProperty(_ctor.prototype, "isPingbi", {
    get: function () {
      return this._isPingbi;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.init = function (e) {
    var t = this;
    r_GameServer.GameServer.init(r_Config.default.gameId + "", r_SDKMgr.default.sdkConfig.APIVersion, this.useHttps);
    var o = 3;
    var s = function () {
      if (--o <= 0 && e) {
        e();
        e = null;
      }
    };
    r_GameServer.GameServer.login(function () {
      s();
    });
    r_GameServer.GameServer.isPinBi(function (e) {
      t._isPingbi = 1 == e;
      s();
      console.log("屏蔽地区：", t.isPingbi);
    });
    r_GameServer.GameServer.getAdRate(function (e) {
      for (var o = 0; o < e.length; o++) {
        var i = e[o];
        t.mAdRate[i.key] = i.rate;
      }
      console.log("后台参数:", e);
      s();
    });
  };
  _ctor.prototype.getAdRate = function (e) {
    return this.mAdRate[e];
  };
  return _ctor;
}();
exports.SDKModelBase = exp_SDKModelBase;