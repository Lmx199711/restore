Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerSystem = exports._TowerSystem = undefined;
var r_TowerCfg = require("TowerCfg");
var r_TowerUI = require("TowerUI");
var r_DragonBallSystem = require("DragonBallSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponSystem = require("WeaponSystem");
var exp__TowerSystem = function () {
  function _ctor() {
    this.maxNum = 18;
    this.towerCfgMap = null;
    this.dropCfgMap = null;
  }
  _ctor.prototype.init = function () {
    if (!this.towerCfgMap) {
      this.towerCfgMap = {};
      for (var e = 0; e < r_TowerCfg.TowerCfg.length; e++) {
        this.towerCfgMap[r_TowerCfg.TowerCfg[e].id] = r_TowerCfg.TowerCfg[e];
      }
      this.dropCfgMap = {};
      for (e = 0; e < r_TowerCfg.TowerDropCfg.length; e++) {
        this.dropCfgMap[r_TowerCfg.TowerDropCfg[e].id] = r_TowerCfg.TowerDropCfg[e];
      }
    }
    if (!r_PlayerData.PlayerData.data.towerMap.curTower) {
      r_PlayerData.PlayerData.data.towerMap.curTower = 1;
      r_PlayerData.PlayerData.data.towerMap.curWeapon = 0;
    }
    r_PlayerData.PlayerData.data.towerMap.timeMap || (r_PlayerData.PlayerData.data.towerMap.timeMap = {});
  };
  _ctor.prototype.getCurTower = function () {
    return r_PlayerData.PlayerData.data.towerMap.curTower;
  };
  _ctor.prototype.getCurWeapon = function () {
    if (!r_PlayerData.PlayerData.data.towerMap.curWeapon) {
      return 0;
    }
    var e = r_WeaponSystem.WeaponSystem.GetWeaponInfo(r_PlayerData.PlayerData.data.towerMap.curWeapon);
    if (r_WeaponSystem.WeaponSystem.GetMyWeapon(e.id)) {
      return r_PlayerData.PlayerData.data.towerMap.curWeapon;
    } else {
      return 0;
    }
  };
  _ctor.prototype.getTowerCfg = function (e) {
    return this.towerCfgMap[e];
  };
  _ctor.prototype.getDropCfg = function (e) {
    return this.dropCfgMap[e];
  };
  _ctor.prototype.equipWeapon = function (e) {
    r_PlayerData.PlayerData.data.towerMap.curWeapon = e;
    r_TowerUI.TowerUI.Inst && r_TowerUI.TowerUI.Inst.updateWeapon();
    r_PlayerData.PlayerData.saveData(true);
  };
  _ctor.prototype.passTower = function (e) {
    r_PlayerData.PlayerData.data.towerMap.curTower == e.id && r_PlayerData.PlayerData.data.towerMap.curTower < exports.TowerSystem.maxNum && (r_PlayerData.PlayerData.data.towerMap.curTower = r_PlayerData.PlayerData.data.towerMap.curTower + 1);
    this.setPassTime(e.id);
    r_PlayerData.PlayerData.data.towerMap.curTower > 10 && r_DragonBallSystem.DragonBallSystem.unlockDragonBall(r_DragonBallSystem.DragonBallUnlockType.通关登天塔第十层);
    r_TowerUI.TowerUI.Inst && r_TowerUI.TowerUI.Inst.updateTowers();
    r_PlayerData.PlayerData.saveData(true);
    r_PlatformSystem.PlatformSystem.report("tower_success", {
      num: e.id + ""
    });
  };
  _ctor.prototype.getPassTime = function (e) {
    if (r_PlayerData.PlayerData.data.towerMap.timeMap[e]) {
      return r_PlayerData.PlayerData.data.towerMap.timeMap[e];
    } else {
      return 0;
    }
  };
  _ctor.prototype.resetPassTime = function (e) {
    r_PlayerData.PlayerData.data.towerMap.timeMap[e] = 0;
  };
  _ctor.prototype.setPassTime = function (e) {
    r_PlayerData.PlayerData.data.towerMap.timeMap[e] = r_TimeSystem.TimeSystem.getServerTime();
  };
  _ctor.prototype.canEnter = function () {
    return !!(r_PlayerData.PlayerData.data.weapon && r_PlayerData.PlayerData.data.weapon.weapons && r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) >= 1);
  };
  return _ctor;
}();
exports._TowerSystem = exp__TowerSystem;
exports.TowerSystem = new exp__TowerSystem();