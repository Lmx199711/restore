var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_RelaxSystem = require("RelaxSystem");
var r_RelaxLevelCfg = require("RelaxLevelCfg");
var r_LevelLogic37 = require("LevelLogic37");
var r_TouchMgrLevel = require("TouchMgrLevel");
var r_ReportSystem = require("ReportSystem");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var def_CityResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.City85, r_UIDef.UIDef.Res.UI.CityResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CityResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CityResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnDouble").onClick(this.onClickDouble, this);
    this.contentPane.getChild("btnClose").onClick(this.onClickClose, this);
    this.contentPane.getChild("btnReview").onClick(this.onClickReview, this);
    this.contentPane.getChild("btnMainchu").onClick(this.onClickMainchu, this);
    this.labDesc = this.contentPane.getChild("labDesc").asLabel;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").setSelectedIndex(this.data);
    this.labDesc.text = 0 == this.data ? r_RelaxLevelCfg.RelaxTaskCfg[r_RelaxSystem.RelaxSystem.lastLevelId].succDesc : r_RelaxLevelCfg.RelaxTaskCfg[r_RelaxSystem.RelaxSystem.lastLevelId].failDesc;
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("85同城双倍领取", function () {
      r_PlayerData.PlayerData.addCoin("85同城双倍领取", 2 * r_RelaxLevelCfg.RelaxTaskCfg[r_RelaxSystem.RelaxSystem.lastLevelId].succPirce, r_ReportSystem.SystemKey.任务大厅);
      e.hide();
      r_RelaxSystem.RelaxSystem.clearLevel();
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
      r_RelaxSystem.RelaxSystem.unregistTouch();
    });
  };
  _ctor.prototype.onClickClose = function () {
    if (0 == this.data) {
      r_PlayerData.PlayerData.addCoin("85同城领取", r_RelaxLevelCfg.RelaxTaskCfg[r_RelaxSystem.RelaxSystem.lastLevelId].succPirce, r_ReportSystem.SystemKey.任务大厅);
    } else if (r_PlayerData.PlayerData.isCoinEnough(r_RelaxLevelCfg.RelaxTaskCfg[r_RelaxSystem.RelaxSystem.lastLevelId].failPirce)) {
      r_PlayerData.PlayerData.deleteCoin("85同城任务惩罚", r_RelaxLevelCfg.RelaxTaskCfg[r_RelaxSystem.RelaxSystem.lastLevelId].failPirce, r_ReportSystem.SystemKey.任务大厅);
    } else {
      r_PlayerData.PlayerData.deleteCoin("85同城任务惩罚", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.任务大厅);
    }
    this.hide();
    r_RelaxSystem.RelaxSystem.clearLevel();
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    r_RelaxSystem.RelaxSystem.unregistTouch();
  };
  _ctor.prototype.onClickReview = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("同城任务复活", function () {
      r_TouchMgrLevel.TouchMgrLevel.stepController && r_TouchMgrLevel.TouchMgrLevel.stepController.stepAdd2();
      e.hide();
      r_LevelLogic37.default.Inst && r_LevelLogic37.default.Inst.init();
    });
  };
  _ctor.prototype.onClickMainchu = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("85同城免除惩罚", function () {
      e.hide();
      r_RelaxSystem.RelaxSystem.clearLevel();
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
      r_RelaxSystem.RelaxSystem.unregistTouch();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_CityResultUI;