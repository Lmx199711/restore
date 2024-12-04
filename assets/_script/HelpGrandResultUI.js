var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpGrandResultUI = undefined;
var r_UIDef = require("UIDef");
var r_TYIndex = require("TYIndex");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var exp_HelpGrandResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.HelpGrandResultUI) || this;
    t.reward = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HelpGrandResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HelpGrandResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnOK = this.contentPane.getChild("btnOK");
    this.txtReward = this.contentPane.getChild("txtReward");
    this.btnOK.onClick(this.onClickOK, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (!this.data) {
      return this.hide();
    }
    if ("success" == this.data.type) {
      this.contentPane.getController("c1").selectedIndex = 0;
      if (this.data.reward) {
        this.txtReward.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.data.reward);
        this.reward = this.data.reward;
      }
      if (this.data.title) {
        this.contentPane.getChild("n21").asTextField.text = this.data.title;
      } else {
        this.contentPane.getChild("n21").asTextField.text = "你成功帮助爷爷奶奶解决了高温的问题！";
      }
      r_PlayerData.PlayerData.addCoin("小游戏", Number(this.reward));
    } else if ("fail" == this.data.type) {
      this.contentPane.getController("c1").selectedIndex = 1;
      this.contentPane.getChild("n21").asTextField.text = this.data.title;
    }
  };
  _ctor.prototype.onClickOK = function () {
    this.hide();
    this.data.closeCallback && this.data.closeCallback();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.HelpGrandResultUI = exp_HelpGrandResultUI;