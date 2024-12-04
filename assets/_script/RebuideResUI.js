var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RebuideResUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var exp_RebuideResUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.RebuideResUI) || this;
    t.reward = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RebuideResUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RebuideResUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnOK = this.contentPane.getChild("btnOK");
    this.txtReward = this.contentPane.getChild("txtReward");
    this.btnOK.onClick(this.onClickOK, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = this.data.win ? 0 : 1;
    if (this.data.reward) {
      this.txtReward.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.data.reward);
      this.reward = this.data.reward;
    }
    r_PlayerData.PlayerData.addCoin("拾荒女孩", Number(this.reward));
  };
  _ctor.prototype.onClickOK = function () {
    this.hide();
    this.data.closeCallback && this.data.closeCallback();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.RebuideResUI = exp_RebuideResUI;