var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiledCoinUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_FiledGameUI = require("FiledGameUI");
var r_FiledSelectUI = require("FiledSelectUI");
var exp_FiledCoinUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Field, r_UIDef.UIDef.Res.UI.FiledCoinUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.m_data = e;
    this.show(r_UIDef.UIDef.Urls.UI.FiledCoinUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FiledCoinUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnFangqi").asButton.onClick(this.hide, this);
    this.btnKaiCai = this.contentPane.getChild("btnKaicai").asButton;
    this.btnKaiCai.onClick(this.onBtnKaiCai, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("labName").asLabel.text = _ctor.m_data.name;
    this.contentPane.getChild("labPrice").asLabel.text = r_UtilsSystem.UtilsSystem.getShowCoin(_ctor.m_data.price);
    this.btnKaiCai.getChild("label").asLabel.text = "(" + r_FiledSelectUI.FiledSelectUI.viedoNumList[_ctor.m_data.id] % _ctor.m_data.video + " / " + _ctor.m_data.video + ")";
  };
  _ctor.prototype.onBtnKaiCai = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("进入油田", function () {
      r_PlayerData.PlayerData.data.fieldNum++;
      r_PlayerData.PlayerData.saveData();
      r_FiledSelectUI.FiledSelectUI.viedoNumList[_ctor.m_data.id]++;
      e.btnKaiCai.getChild("label").asLabel.text = "(" + r_FiledSelectUI.FiledSelectUI.viedoNumList[_ctor.m_data.id] % _ctor.m_data.video + " / " + _ctor.m_data.video + ")";
      if (r_FiledSelectUI.FiledSelectUI.viedoNumList[_ctor.m_data.id] % _ctor.m_data.video == 0) {
        var o = r_UtilsSystem.UtilsSystem.getRandomNum(0, 14);
        r_UtilsSystem.UtilsSystem.showLoading(true);
        return void r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/field/prefab/fieldMap" + o, cc.Prefab, function () {
          r_UtilsSystem.UtilsSystem.showLoading(false);
          r_FiledGameUI.FiledGameUI.showUI({
            coeff: _ctor.m_data.coefficient,
            random: o
          });
          e.hide();
        });
      }
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.FiledCoinUI = exp_FiledCoinUI;