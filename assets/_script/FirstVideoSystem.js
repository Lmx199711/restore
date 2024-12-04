Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirstVideoSystem = exports.FirstVideoUIEnum = undefined;
var r_PlayerData = require("PlayerData");
(function (e) {
  e["地底投资开始"] = "地底投资开始";
  e["大胃王开始"] = "大胃王开始";
  e["二手车开始"] = "二手车开始";
  e["眼力大挑战开始"] = "眼力大挑战开始";
  e["网红直播开始"] = "网红直播开始";
  e["美容院开始"] = "美容院开始";
  e["挑战神兽开始"] = "挑战神兽开始";
  e["白金汉进入"] = "白金汉进入";
  e["捡垃圾开始"] = "捡垃圾开始";
  e["乡村厨神开始"] = "乡村厨神开始";
  e["剑灵龙神形态"] = "剑灵龙神形态";
  e["调查仙界古树"] = "调查仙界古树";
  e["首次吃果实"] = "firTPetF";
  e["首次玩二手车app"] = "首次玩二手车app";
})(exports.FirstVideoUIEnum || (exports.FirstVideoUIEnum = {}));
var n = function () {
  function e() {}
  e.prototype.hasFirstEnter = function (e) {
    return !!r_PlayerData.PlayerData.data.firstVideoEnterMap[e];
  };
  e.prototype.setFirstEnter = function (e) {
    r_PlayerData.PlayerData.data.firstVideoEnterMap[e] || (r_PlayerData.PlayerData.data.firstVideoEnterMap[e] = 1);
  };
  return e;
}();
exports.FirstVideoSystem = new n();