Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HamSystem = undefined;
var r_HamResultUI = require("HamResultUI");
var r_HamUI = require("HamUI");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var c = function () {
  function e() {
    this.npcs = [];
    this.isGame = false;
    this.startGame = 0;
    this.passTime = 0;
    this.succCount = 6;
    this.fialCount = 2;
    this.m_succNum = 0;
    this.roles = [1, 2, 3, 4, 5, 6];
    this.m_fialNum = 0;
  }
  Object.defineProperty(e.prototype, "succNum", {
    get: function () {
      return this.m_succNum;
    },
    set: function (e) {
      this.m_succNum = e;
      if (e >= this.succCount) {
        r_HamUI.default.Inst && r_HamUI.default.Inst.gameOver();
        r_HamResultUI.default.showUI({
          index: 1
        });
      }
      r_HamUI.default.Inst && r_HamUI.default.Inst.showNum(this.m_succNum + "/" + this.succCount);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "fialNum", {
    get: function () {
      return this.m_fialNum;
    },
    set: function (e) {
      this.m_fialNum = e;
      if (e >= this.fialCount) {
        r_HamUI.default.Inst && r_HamUI.default.Inst.gameOver();
        r_HamResultUI.default.showUI({
          index: 0
        });
      }
    },
    enumerable: false,
    configurable: true
  });
  e.prototype.init = function (e) {
    this.npcs = e;
    this.isGame = true;
    this.startGame = r_TimeSystem.TimeSystem.getServerTime();
    this.m_succNum = 0;
    this.m_fialNum = 0;
  };
  e.prototype.update = function (e) {
    if (r_PlayerData.PlayerData && r_PlayerData.PlayerData.data && this.isGame && 0 != this.npcs.length && (this.passTime = this.passTime + e, this.passTime > 1)) {
      this.passTime = 0;
      var t = this.roles.filter(function () {
        return true;
      });
      var o = function (e) {
        var o = i.npcs[e];
        if (!o.isShow) {
          o.create(t[r_UtilsSystem.UtilsSystem.getRandomNum(0, t.length - 1)]);
          return "break";
        }
        t = t.filter(function (e) {
          return o.uid != e;
        });
        o.onUpdateTime();
      };
      var i = this;
      for (var n = 0; n < this.npcs.length && "break" !== o(n); n++) {
        ;
      }
    }
  };
  return e;
}();
exports.HamSystem = new c();