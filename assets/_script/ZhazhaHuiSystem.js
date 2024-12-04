Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZhazhaHuiSystem = undefined;
var r_ZhazhaHuiCfg = require("ZhazhaHuiCfg");
var r_UtilsSystem = require("UtilsSystem");
var a = function () {
  function e() {
    this.m_level = 1;
    this.m_maxLevel = 7;
    this.m_minLevel = 1;
    this.isHasChest = false;
  }
  Object.defineProperty(e.prototype, "roleData", {
    get: function () {
      return this.m_roleData;
    },
    enumerable: false,
    configurable: true
  });
  e.prototype.init = function () {
    this.m_roleData = JSON.parse(JSON.stringify(r_ZhazhaHuiCfg.ZhazhaHuiActionCfg.role));
    this.level = this.m_roleData.level;
    this.isHasChest = false;
  };
  Object.defineProperty(e.prototype, "level", {
    get: function () {
      return this.m_level;
    },
    set: function (e) {
      if (e >= this.m_minLevel && e <= this.m_maxLevel) {
        this.m_level = e;
        this.m_roleData.level = this.m_level;
        this.m_roleData.power = r_ZhazhaHuiCfg.ZhazhaHuiLevelCfg[this.m_level];
      }
    },
    enumerable: false,
    configurable: true
  });
  e.prototype.checkCanUp = function () {
    return this.m_level < this.m_maxLevel - 1;
  };
  e.prototype.upLvel = function () {
    this.level = this.m_level + 1;
    r_UtilsSystem.UtilsSystem.showTip("等级提升");
  };
  e.prototype.downLevel = function () {
    this.level = this.m_level - 1;
    r_UtilsSystem.UtilsSystem.showTip("等级降低");
  };
  e.prototype.getMonster = function (e) {
    return r_ZhazhaHuiCfg.ZhazhaHuiActionCfg["monter" + e];
  };
  e.prototype.getRandomChest = function () {
    return !this.isHasChest && Math.random() <= .5;
  };
  return e;
}();
exports.ZhazhaHuiSystem = new a();