Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupSystem = undefined;
var r_GameGuideCfg = require("GameGuideCfg");
var r_LevelUpCfg = require("LevelUpCfg");
var r_RoleCfg = require("RoleCfg");
var r_RoleGirlCfg = require("RoleGirlCfg");
var r_LimitSystem = require("LimitSystem");
var c = function () {
  function e() {
    this.curGroup = 0;
  }
  e.prototype.init = function () {
    if (window.wx) {
      var e = wx.getExptInfoSync(["Numerical_testing"]);
      if (!(undefined === e.wxapp_expt_test || "0" == e.wxapp_expt_test)) {
        if ("1" == e.wxapp_expt_test) {
          this.curGroup = 1;
        } else {
          "2" == e.wxapp_expt_test && (this.curGroup = 2);
        }
      }
    }
  };
  e.prototype.getLevelUpCfg = function () {
    exports.GroupSystem.curGroup;
    return r_LevelUpCfg.LevelUpCfg;
  };
  e.prototype.getTouchLevelCfg = function () {
    exports.GroupSystem.curGroup;
    return r_RoleCfg.TouchLevelCfg;
  };
  e.prototype.getRoleGirlLevelCfg = function () {
    exports.GroupSystem.curGroup;
    return r_RoleGirlCfg.RoleGirlLevelCfg;
  };
  e.prototype.getRoleCfg = function () {
    exports.GroupSystem.curGroup;
    return r_RoleCfg.RoleLevelCfg;
  };
  e.prototype.getLimitLevel = function () {
    if (0 == exports.GroupSystem.curGroup) {
      return r_LimitSystem.LimitLevelType;
    } else if (1 == exports.GroupSystem.curGroup) {
      return r_LimitSystem.LimitLevelBType;
    } else if (2 == exports.GroupSystem.curGroup) {
      return r_LimitSystem.LimitLevelCType;
    } else {
      return undefined;
    }
  };
  e.prototype.getSectionCfg = function () {
    if (0 == exports.GroupSystem.curGroup) {
      return r_GameGuideCfg.SectionCfg;
    } else if (1 == exports.GroupSystem.curGroup) {
      return r_GameGuideCfg.SectionCfg;
    } else if (2 == exports.GroupSystem.curGroup) {
      return r_GameGuideCfg.SectionCCfg;
    } else {
      return undefined;
    }
  };
  e.prototype.getCTestVersion = function () {
    return 2 == exports.GroupSystem.curGroup;
  };
  e.prototype.getGameguideStory = function () {
    if (0 == exports.GroupSystem.curGroup) {
      return r_GameGuideCfg.GameguideStory;
    } else if (1 == exports.GroupSystem.curGroup) {
      return r_GameGuideCfg.GameguideStory;
    } else if (2 == exports.GroupSystem.curGroup) {
      return r_GameGuideCfg.GameguideCStory;
    } else {
      return undefined;
    }
  };
  return e;
}();
exports.GroupSystem = new c();