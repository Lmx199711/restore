Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LimitMainTaskType = exports.LimiSecretType = exports.LimitLevelCType = exports.LimitLevelBType = exports.LimitLevelType = exports.LimitSystem = undefined;
var r_PlayerData = require("PlayerData");
var r_RoleGirlSystem = require("RoleGirlSystem");
var a = function () {
  function e() {}
  e.prototype.getCheckLevelLimit = function (e) {
    return r_PlayerData.PlayerData.data.level >= e;
  };
  e.prototype.getCheckSecretLimit = function (e) {
    return r_RoleGirlSystem.RoleGirlSystem.getBoughtRoleCount() >= e;
  };
  e.prototype.getCheckMainTaskLimit = function (e) {
    return r_PlayerData.PlayerData.data.minTaskLevel >= e;
  };
  return e;
}();
exports.LimitSystem = new a();
(function (e) {
  e[e["手机"] = 100] = "手机";
  e[e["小游戏"] = 200] = "小游戏";
  e[e["前往城市"] = 250] = "前往城市";
  e[e["热门游戏"] = 300] = "热门游戏";
  e[e["荒古遗迹"] = 200] = "荒古遗迹";
  e[e["签到系统"] = 150] = "签到系统";
  e[e["旧城区"] = 300] = "旧城区";
  e[e["乡村"] = 250] = "乡村";
  e[e["新城区"] = 350] = "新城区";
  e[e["未来世界"] = 400] = "未来世界";
  e[e["排行榜"] = 50] = "排行榜";
  e[e["侧拉栏"] = 50] = "侧拉栏";
  e[e["添加桌面"] = 100] = "添加桌面";
})(exports.LimitLevelType || (exports.LimitLevelType = {}));
(function (e) {
  e[e["手机"] = 100] = "手机";
  e[e["小游戏"] = 200] = "小游戏";
  e[e["前往城市"] = 200] = "前往城市";
  e[e["热门游戏"] = 300] = "热门游戏";
  e[e["荒古遗迹"] = 100] = "荒古遗迹";
  e[e["签到系统"] = 150] = "签到系统";
  e[e["旧城区"] = 250] = "旧城区";
  e[e["乡村"] = 200] = "乡村";
  e[e["新城区"] = 300] = "新城区";
  e[e["未来世界"] = 350] = "未来世界";
  e[e["排行榜"] = 50] = "排行榜";
})(exports.LimitLevelBType || (exports.LimitLevelBType = {}));
(function (e) {
  e[e["手机"] = 100] = "手机";
  e[e["小游戏"] = 200] = "小游戏";
  e[e["前往城市"] = 9999] = "前往城市";
  e[e["热门游戏"] = 300] = "热门游戏";
  e[e["荒古遗迹"] = 9999] = "荒古遗迹";
  e[e["签到系统"] = 150] = "签到系统";
  e[e["旧城区"] = 300] = "旧城区";
  e[e["乡村"] = 250] = "乡村";
  e[e["新城区"] = 350] = "新城区";
  e[e["未来世界"] = 400] = "未来世界";
  e[e["排行榜"] = 50] = "排行榜";
})(exports.LimitLevelCType || (exports.LimitLevelCType = {}));
(function (e) {
  e[e["房产"] = 2] = "房产";
  e[e["企业"] = 4] = "企业";
  e[e["城市"] = 6] = "城市";
  e[e["星球"] = 8] = "星球";
  e[e["培训秘书"] = 12] = "培训秘书";
})(exports.LimiSecretType || (exports.LimiSecretType = {}));
(function (e) {
  e[e["老城区"] = 2] = "老城区";
  e[e["高新区"] = 4] = "高新区";
  e[e["未来世界"] = 6] = "未来世界";
})(exports.LimitMainTaskType || (exports.LimitMainTaskType = {}));