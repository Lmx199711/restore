Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CityType = exports.EntryCitySystem = undefined;
var i = function () {
  function e() {
    this.cfg = {
      0: {
        name: "旧城区",
        lockRole: "icon0_0",
        unlockRole: "icon0_0",
        lockTxt: "旧城区可不是什么小瘪三都能来的",
        unlockTxt: "在下恭候多时,贵客请进"
      },
      1: {
        name: "新城区",
        lockRole: "icon1_0",
        unlockRole: "icon1_1",
        lockTxt: "想进高新城，你还不够格",
        unlockTxt: "高新城欢迎您！"
      },
      2: {
        name: "未来世界",
        lockRole: "icon3_0",
        unlockRole: "icon3_0",
        lockTxt: "未来世界只有地位极高之人才能进入",
        unlockTxt: "新世界的大门为您敞开，请进！"
      },
      3: {
        name: "乡村",
        lockRole: "icon0_0",
        unlockRole: "icon0_0",
        lockTxt: "新世界的大门为您敞开，请进！",
        unlockTxt: "新世界的大门为您敞开，请进！"
      }
    };
  }
  e.prototype.getCfgById = function (e) {
    return this.cfg[e];
  };
  return e;
}();
exports.EntryCitySystem = new i();
(function (e) {
  e[e["旧城区"] = 0] = "旧城区";
  e[e["新城区"] = 1] = "新城区";
  e[e["未来世界"] = 2] = "未来世界";
  e[e["乡村"] = 3] = "乡村";
})(exports.CityType || (exports.CityType = {}));