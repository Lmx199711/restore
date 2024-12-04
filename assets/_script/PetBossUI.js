var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetBossUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetData = require("PetData");
var r_PetBattleRule = require("PetBattleRule");
var r_PetCommon = require("PetCommon");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PetCfg = require("PetCfg");
var r_PetBaseInfo = require("PetBaseInfo");
var r_PetBattleUI = require("PetBattleUI");
var r_UtilsSystem = require("UtilsSystem");
var exp_PetBossUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetBossUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetBossUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetBossUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.bossList = this.contentPane.getChild("list").asList;
    this.bossList.itemRenderer = this.itemRenderer.bind(this);
    this.bossList.numItems = r_PetCfg.PetBossCfgs.length;
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.contentPane.getChild("btnTip").onClick(function () {
      r_PetBattleRule.PetBattleRule.showUI();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = 1;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYEventDispatcher.TYEventDispatcher.offAllCaller(this);
  };
  _ctor.prototype.itemRenderer = function (e, t) {
    var o = this;
    var i = r_PetCfg.PetBossCfgs[e];
    t.getChild("icon").asLoader.url = "ui://Pet/" + i.icon;
    t.getChild("name").text = i.name;
    t.getChild("desc").text = "LV." + i.level;
    t.getChild("btnBattle").clearClick();
    t.getChild("btnBattle").onClick(function () {
      var e = r_PetData.PetData.getPetBaseInfo();
      e.vitality < r_PetCfg.PetGameCfg.costVitality && r_UtilsSystem.UtilsSystem.showTip("体力不足");
      e.vitality -= r_PetCfg.PetGameCfg.costVitality;
      r_PetData.PetData.setPetBaseInfo(e);
      var t = new r_PetBaseInfo.PetBaseInfo();
      t.name = i.name;
      t.type = r_PetCommon.PetCommon.randomInt(1, 2);
      t.level = i.level;
      r_PetCommon.PetCommon.levelUpData(t.level - 1, t);
      r_PetBattleUI.PetBattleUI.showUI({
        enemyData: {
          baseInfo: t,
          weapons: [],
          skills: []
        }
      });
      o.hide();
    }, this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetBossUI = exp_PetBossUI;