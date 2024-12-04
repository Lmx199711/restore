Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErShouCarSystem = exports._ErShouCarSystem = exports.ErShouCarCfg = undefined;
var r_PlayerData = require("PlayerData");
exports.ErShouCarCfg = {
  1: "兰博基牛",
  2: "f1赛车",
  3: "裤里难",
  4: "老爷车",
  5: "六菱宏光"
};
var exp__ErShouCarSystem = function () {
  function _ctor() {}
  _ctor.prototype.checkInit = function () {
    r_PlayerData.PlayerData.data.ErShouCarMap.buyList || (r_PlayerData.PlayerData.data.ErShouCarMap.buyList = []);
  };
  _ctor.prototype.buyCar = function (e) {
    if (-1 == r_PlayerData.PlayerData.data.ErShouCarMap.buyList.indexOf(parseInt(e))) {
      r_PlayerData.PlayerData.data.ErShouCarMap.buyList.push(e);
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.hasCar = function (e) {
    return -1 != r_PlayerData.PlayerData.data.ErShouCarMap.buyList.indexOf(parseInt(e));
  };
  _ctor.prototype.allGet = function () {
    return !(!r_PlayerData.PlayerData.data.ErShouCarMap || !r_PlayerData.PlayerData.data.ErShouCarMap.buyList) && r_PlayerData.PlayerData.data.ErShouCarMap.buyList.length >= Object.keys(exports.ErShouCarCfg).length;
  };
  return _ctor;
}();
exports._ErShouCarSystem = exp__ErShouCarSystem;
exports.ErShouCarSystem = new exp__ErShouCarSystem();