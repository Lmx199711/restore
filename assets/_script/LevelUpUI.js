var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelUpUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PrinterCfg = require("PrinterCfg");
var r_PlayerData = require("PlayerData");
var r_PrinterCommon = require("PrinterCommon");
var r_RoleSystem = require("RoleSystem");
var exp_LevelUpUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Printer, r_UIDef.UIDef.Res.UI.LevelUpUI) || this;
    t.reward = 1e4;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LevelUpUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LevelUpUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.contentPane.getChild("btnOK").onClick(function () {
      t.hide();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.reward = r_PrinterCfg.CollectInfo[r_PrinterCommon.PrinterCommon.collectLevel].reward;
    this.contentPane.getChild("levelName").asTextField.text = r_PrinterCfg.CollectInfo[r_PrinterCommon.PrinterCommon.collectLevel].name;
    this.contentPane.getChild("levelIcon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/收藏等级" + (r_PrinterCommon.PrinterCommon.collectLevel + 1);
    this.contentPane.getChild("reward").asTextField.text = "+" + this.reward;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.其它, this.reward);
    if (this.data.closeCallback) {
      this.data.closeCallback();
      this.data.closeCallback = null;
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.LevelUpUI = exp_LevelUpUI;