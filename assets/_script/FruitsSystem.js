Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FruitsSystem = undefined;
var r_FruitsUI = require("FruitsUI");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var s = function () {
  function e() {}
  e.prototype.resetData = function () {
    null == r_PlayerData.PlayerData.data.fruitsDay && (r_PlayerData.PlayerData.data.fruitsDay = r_DaySystem.DaySystem.getShowDay());
    null == r_PlayerData.PlayerData.data.fruitsList && (r_PlayerData.PlayerData.data.fruitsList = [0, 1, 2, 3, 4, 5]);
  };
  e.prototype.initData = function () {
    r_PlayerData.PlayerData.data.fruitsDay = r_DaySystem.DaySystem.getShowDay();
    r_PlayerData.PlayerData.data.fruitsList = [0, 1, 2, 3, 4, 5];
  };
  e.prototype.nextDay = function () {
    if (r_DaySystem.DaySystem.getShowDay() - r_PlayerData.PlayerData.data.fruitsDay >= 5) {
      r_PlayerData.PlayerData.data.fruitsDay = r_DaySystem.DaySystem.getShowDay();
      this.stock();
      r_FruitsUI.FruitsUI.instace && r_FruitsUI.FruitsUI.instace.restart();
    }
  };
  e.prototype.stock = function () {
    r_PlayerData.PlayerData.data.fruitsList = [0, 1, 2, 3, 4, 5];
    r_PlayerData.PlayerData.saveData();
  };
  return e;
}();
exports.FruitsSystem = new s();