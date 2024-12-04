Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragonBallSystem = exports._DragonBallSystem = exports.DragonBallUnlockType = undefined;
var i;
var r_PlayerData = require("PlayerData");
var r_TowerSystem = require("TowerSystem");
var r_UtilsSystem = require("UtilsSystem");
(function (e) {
  e[e["获得27种定制女友"] = 0] = "获得27种定制女友";
  e[e["获得9种女儿"] = 1] = "获得9种女儿";
  e[e["地底投资三种属性升满"] = 2] = "地底投资三种属性升满";
  e[e["通关登天塔第十层"] = 3] = "通关登天塔第十层";
  e[e["每次点击达到200亿"] = 4] = "每次点击达到200亿";
})(i = exports.DragonBallUnlockType || (exports.DragonBallUnlockType = {}));
var exp__DragonBallSystem = function () {
  function _ctor() {
    this.maxBallCount = 5;
    this.tipStrings = ["恭喜获得金系龙珠", "恭喜获得木系龙珠", "恭喜获得水系龙珠", "恭喜获得火系龙珠", "恭喜获得土系龙珠"];
    this.iconNames = ["龙元金", "龙元木", "龙元水", "龙元火", "龙元土"];
  }
  _ctor.prototype.init = function () {
    r_TowerSystem.TowerSystem.getCurTower() > 10 && exports.DragonBallSystem.unlockDragonBall(i.通关登天塔第十层, false);
  };
  _ctor.prototype.unlockDragonBall = function (e, t) {
    undefined === t && (t = true);
    if (-1 == r_PlayerData.PlayerData.data.dragonBallList.indexOf(e)) {
      r_PlayerData.PlayerData.data.dragonBallList.push(e);
      t && r_UtilsSystem.UtilsSystem.showAlert(this.tipStrings[e]);
    }
  };
  return _ctor;
}();
exports._DragonBallSystem = exp__DragonBallSystem;
exports.DragonBallSystem = new exp__DragonBallSystem();