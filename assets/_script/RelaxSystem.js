Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelaxSystem = undefined;
var r_GameDataMgr = require("GameDataMgr");
var r_LoadMgr = require("LoadMgr");
var r_LevelLogic13 = require("LevelLogic13");
var r_LevelLogic15 = require("LevelLogic15");
var r_LevelLogic25 = require("LevelLogic25");
var r_LevelLogic36 = require("LevelLogic36");
var r_RelaxLevelCfg = require("RelaxLevelCfg");
var r_City85UI = require("City85UI");
var r_CityResultUI = require("CityResultUI");
var r_MainUI = require("MainUI");
var r_SoundMgr = require("SoundMgr");
var r_DaySystem = require("DaySystem");
var r_GameSystem = require("GameSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_JobResultUI = require("JobResultUI");
var r_JobTestCom = require("JobTestCom");
var r_ReportSystem = require("ReportSystem");
var r_CityResultUI37 = require("CityResultUI37");
var _ = function () {
  function e() {
    this.levelCfgMap = {};
    this.tipNums = {
      158: 2
    };
    this.lastLevelId = null;
    this.levelLogicMap = {
      13: r_LevelLogic13.LevelLogic13,
      15: r_LevelLogic15.LevelLogic15,
      25: r_LevelLogic25.LevelLogic25,
      36: r_LevelLogic36.LevelLogic36
    };
    this.tipMap = [];
    this.iswin = false;
  }
  e.prototype.getRelaxTaskId = function () {
    var e = r_PlayerData.PlayerData.data.relaxTaskId;
    var t = r_RelaxLevelCfg.RelaxIndexsCfg[e];
    var o = r_RelaxLevelCfg.RelaxTaskCfg[t + ""];
    if (r_PlayerData.PlayerData.data.relaxRefresh && o) {
      return o.id;
    } else if (o.dayCount <= r_DaySystem.DaySystem.getShowDay() && r_PlayerData.PlayerData.data.relaxDay + o.IntervalDays <= r_DaySystem.DaySystem.getShowDay()) {
      return o.id;
    } else {
      return null;
    }
  };
  e.prototype.refreshRelaxTaskId = function () {
    r_PlayerData.PlayerData.data.relaxRefresh = true;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.init = function () {
    for (var e = 0; e < r_RelaxLevelCfg.RelaxLevelCfg.length; e++) {
      this.levelCfgMap[r_RelaxLevelCfg.RelaxLevelCfg[e].id] = r_RelaxLevelCfg.RelaxLevelCfg[e];
    }
  };
  e.prototype.resetData = function () {
    var e = r_RelaxLevelCfg.RelaxIndexsCfg;
    r_PlayerData.PlayerData.data.relaxTaskId >= e.length && (r_PlayerData.PlayerData.data.relaxTaskId = 0);
  };
  e.prototype.startLevel = function (e) {
    var t = this;
    r_MainUI.MainUI.hide();
    r_UtilsSystem.UtilsSystem.showLoading(true);
    this.lastLevelId = e;
    this.iswin = false;
    if (e > 1e3 && e < 1e4) {
      r_LoadMgr.default.preLoadLevel(e);
      return void (r_PlayerData.PlayerData.isGame = true);
    }
    if (e > 1e4) {
      r_GameSystem.GameSystem.preloadLevel(e, function () {
        r_GameSystem.GameSystem.startLevel(e, function () {});
      });
      return void (r_PlayerData.PlayerData.isGame = true);
    }
    var o = this.levelCfgMap[e];
    r_ResSystem.ResSystem.loadBundleRes(o.bundle, o.path, cc.Prefab, function (e, o) {
      r_UtilsSystem.UtilsSystem.showLoading(false);
      r_City85UI.default.hide();
      t.loadLevelSuccess(o);
    });
  };
  e.prototype.loadLevelSuccess = function (e) {
    this.levelObj && this.clearLevel();
    r_PlayerData.PlayerData.isGame = true;
    this.prefabRes = e;
    var t = cc.instantiate(e);
    this.levelObj = t;
    cc.director.getScene().getChildByName("Canvas").addChild(t);
    t.x = 0;
    t.y = 0;
    t.width = cc.view.getCanvasSize().width / cc.view.getScaleX();
    t.height = cc.view.getCanvasSize().height / cc.view.getScaleY();
    var o = this.levelLogicMap[this.lastLevelId];
    if (o) {
      this.curLevelLogic = o;
      o.loadLevelSuccess(t);
    } else if (r_RelaxLevelCfg.NewActionLevelCfg.indexOf(this.lastLevelId) < 0) {
      this.curLevelLogic = r_RelaxLevelLogicSystem.RelaxLevelLogicSystem;
      this.curLevelLogic.loadLevelSuccess(t);
    }
  };
  e.prototype.clearLevel = function (e) {
    undefined === e && (e = false);
    r_MainUI.MainUI.showUI();
    if (this.iswin) {
      r_City85UI.default.showUI(2);
    } else {
      r_City85UI.default.showUI(1);
    }
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    this.unregistTouch();
    if (this.lastLevelId > 1e3) {
      r_PlatformSystem.PlatformSystem.report("Level_exit", {
        level: r_LoadMgr.default.currLv
      });
      r_GameDataMgr.default.endTimeReport();
      r_LoadMgr.default.runInstance.destroy();
      return void r_SoundMgr.SoundMgr.playMusic("bgm");
    }
    this.curLevelLogic && this.curLevelLogic.clearLevel && this.curLevelLogic.clearLevel();
    this.curLevelLogic = null;
    if (this.levelObj) {
      this.levelObj.destroy();
      this.levelObj = null;
    }
    if (this.prefabRes && !e) {
      cc.assetManager.releaseAsset(this.prefabRes);
      this.prefabRes = null;
    }
  };
  e.prototype.clearLevel37 = function () {
    r_MainUI.MainUI.showUI();
    this.curLevelLogic && this.curLevelLogic.clearLevel && this.curLevelLogic.clearLevel();
    this.curLevelLogic = null;
    if (this.levelObj) {
      this.levelObj.destroy();
      this.levelObj = null;
    }
    if (this.prefabRes) {
      cc.assetManager.releaseAsset(this.prefabRes);
      this.prefabRes = null;
    }
  };
  e.prototype.win = function (e) {
    cc.log("游戏胜利");
    if ("job" == e) {
      r_PlayerData.PlayerData.addCoin("甲骨文写诗", r_JobTestCom.default.addCoinNum, r_ReportSystem.SystemKey.None);
      r_JobResultUI.JobResultUI.showUI({
        mode: 1
      });
      r_SoundMgr.SoundMgr.playSound("win");
    } else if (37 == this.lastLevelId) {
      r_CityResultUI37.default.showUI();
    } else {
      r_CityResultUI.default.showUI(0);
    }
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    this.unregistTouch();
    this.iswin = true;
    exports.RelaxSystem.addTaskId();
  };
  e.prototype.addTaskId = function () {
    r_PlayerData.PlayerData.data.relaxTaskId++;
    var e = r_RelaxLevelCfg.RelaxIndexsCfg;
    r_PlayerData.PlayerData.data.relaxTaskId >= e.length && (r_PlayerData.PlayerData.data.relaxTaskId = 0);
    r_PlayerData.PlayerData.data.relaxDay = r_DaySystem.DaySystem.getShowDay();
    r_PlayerData.PlayerData.data.relaxRefresh = false;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.addTip = function () {
    this.tipMap.includes(this.lastLevelId) || this.tipMap.push(this.lastLevelId);
  };
  e.prototype.checkTip = function () {
    return this.tipMap.includes(this.lastLevelId);
  };
  e.prototype.lose = function (e) {
    cc.log("游戏失败");
    this.iswin = false;
    if ("job" == e) {
      r_JobResultUI.JobResultUI.showUI({
        mode: 0
      });
      r_SoundMgr.SoundMgr.playSound("fail");
    } else {
      r_CityResultUI.default.showUI(this.lastLevelId > 1e3 ? 2 : 1);
    }
  };
  e.prototype.review = function () {
    var e = this.levelLogicMap[this.lastLevelId];
    if (e) {
      this.curLevelLogic = e;
      e.review();
    }
  };
  e.prototype.unregistTouch = function () {
    var e = cc.director.getScene().getChildByName("Canvas").getChildByName("touchBg");
    e.off(cc.Node.EventType.TOUCH_START);
    e.off(cc.Node.EventType.TOUCH_MOVE);
    e.off(cc.Node.EventType.TOUCH_END);
  };
  return e;
}();
exports.RelaxSystem = new _();