Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonopolySystem = undefined;
var r_MonopolyCfg = require("MonopolyCfg");
var r_MonopolyUI = require("MonopolyUI");
var r_PlayerData = require("PlayerData");
var s = function () {
  function e() {}
  e.prototype.restartData = function () {
    null == r_PlayerData.PlayerData.data.newMonpolyData && this.initData();
    if (null != r_PlayerData.PlayerData.data.monopolyData) {
      for (var e in r_PlayerData.PlayerData.data.monopolyData) r_PlayerData.PlayerData.data.newMonpolyData[e] = r_PlayerData.PlayerData.data.monopolyData[e];
      r_PlayerData.PlayerData.data.monopolyData = null;
    }
  };
  e.prototype.initData = function () {
    r_PlayerData.PlayerData.data.newMonpolyData = {};
    r_PlayerData.PlayerData.data.newMonpolyData.dice = 5;
    r_PlayerData.PlayerData.data.newMonpolyData.assignDice = 0;
    r_PlayerData.PlayerData.data.newMonpolyData.shield = 0;
    r_PlayerData.PlayerData.data.newMonpolyData.freeCard = 0;
    r_PlayerData.PlayerData.data.newMonpolyData.countDown = 0;
  };
  e.prototype.getMap = function (e) {
    return r_MonopolyCfg.MonopolyMap[e];
  };
  e.prototype.getCheesPos = function (e) {
    return cc.v2(e.x - 42, e.y - 110);
  };
  e.prototype.getTimeStr = function () {
    if (r_PlayerData.PlayerData.data.newMonpolyData.dice >= 5) {
      r_PlayerData.PlayerData.data.newMonpolyData.countDown = 0;
      return "";
    }
    var e = Date.now();
    0 == r_PlayerData.PlayerData.data.newMonpolyData.countDown && (r_PlayerData.PlayerData.data.newMonpolyData.countDown = e + 3e5);
    var t = r_PlayerData.PlayerData.data.newMonpolyData.countDown - e;
    if (t < 0) {
      r_PlayerData.PlayerData.data.newMonpolyData.countDown = e + 3e5;
      r_PlayerData.PlayerData.data.newMonpolyData.countDown++;
      r_PlayerData.PlayerData.saveData();
      r_MonopolyUI.default.instance.propShow();
    }
    t = r_PlayerData.PlayerData.data.newMonpolyData.countDown - e;
    return this.getTimeForm(Math.ceil(t / 1e3)) + "后获得一个";
  };
  e.prototype.getTimeForm = function (e) {
    var t = Math.floor(e / 60);
    var o = e % 60;
    return (t > 10 ? "" + t : "0" + t) + ":" + (o > 10 ? "" + o : "0" + o);
  };
  return e;
}();
exports.MonopolySystem = new s();