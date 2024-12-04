Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainHomeSystem = undefined;
var r_PlayerData = require("PlayerData");
var n = function () {
  function e() {}
  e.prototype.initData = function () {
    r_PlayerData.PlayerData.data.mainData.touchNum = 1;
  };
  e.prototype.getTouchNum = function () {
    return r_PlayerData.PlayerData.data.mainData.touchNum;
  };
  return e;
}();
exports.MainHomeSystem = new n();