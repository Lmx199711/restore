Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LotterySystem = undefined;
var r_LotteryCfg = require("LotteryCfg");
var r_BlockSystem = require("BlockSystem");
var r_PlayerData = require("PlayerData");
var s = function () {
  function e() {}
  e.prototype.getListData = function () {
    return r_LotteryCfg.LotteryCfg.filter(function (e) {
      return !r_BlockSystem.BlockSystem.isBlock(e.id);
    });
  };
  e.prototype.checkUnlock = function (e) {
    var t = this.getItemById(e);
    return 1 != t.priceType || !!r_PlayerData.PlayerData.data.lotteryMap[t.name + "_lock"];
  };
  e.prototype.unlock = function (e) {
    var t = this.getItemById(e);
    if (1 == t.priceType) {
      r_PlayerData.PlayerData.data.lotteryMap[t.name + "_lock"] = true;
      r_PlayerData.PlayerData.saveData();
    }
  };
  e.prototype.getItemById = function (e) {
    return r_LotteryCfg.LotteryCfg.find(function (t) {
      return t.id == e;
    });
  };
  return e;
}();
exports.LotterySystem = new s();