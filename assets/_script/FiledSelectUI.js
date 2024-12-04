var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiledSelectUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_FiledGameUI = require("FiledGameUI");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_FiledCfg = require("FiledCfg");
var r_FiledCoinUI = require("FiledCoinUI");
var r_ResSystem = require("ResSystem");
var exp_FiledSelectUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Field, r_UIDef.UIDef.Res.UI.FiledSelectUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FiledSelectUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FiledSelectUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.m_data = r_FiledCfg.FiledLevelConfig;
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    for (var t = 0; t < 6; t++) {
      var o = this.contentPane.getChild("item" + t).asCom;
      o.onClick(this.clickItem.bind(this, t), this);
      if (this.m_data[t]) {
        o.getChild("name").asLabel.text = this.m_data[t].name;
        o.getChild("price").asLabel.text = "售价:" + r_UtilsSystem.UtilsSystem.getShowCoin(this.m_data[t].price);
      } else {
        o.visible = false;
      }
    }
  };
  _ctor.prototype.clickItem = function (e) {
    var t = this;
    var o = this.m_data[e].price;
    if (r_PlayerData.PlayerData.isCoinEnough(o)) {
      r_PlayerData.PlayerData.data.fieldNum++;
      r_PlayerData.PlayerData.deleteCoin("进入油田消耗", o);
      console.log("进入油田游戏界面", e);
      var i = r_UtilsSystem.UtilsSystem.getRandomNum(0, 14);
      r_UtilsSystem.UtilsSystem.showLoading(true);
      r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/field/prefab/fieldMap" + i, cc.Prefab, function () {
        r_UtilsSystem.UtilsSystem.showLoading(false);
        r_FiledGameUI.FiledGameUI.showUI({
          coeff: t.m_data[e].coefficient,
          random: i
        });
      });
      r_SoundMgr.SoundMgr.playSound("click");
    } else {
      r_FiledCoinUI.FiledCoinUI.showUI(this.m_data[e]);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.viedoNumList = [0, 0, 0, 0, 0, 0];
  return _ctor;
}(r_TYIndex.UIWind);
exports.FiledSelectUI = exp_FiledSelectUI;