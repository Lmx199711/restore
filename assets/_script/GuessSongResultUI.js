var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessSongResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_GuessSongUI = require("GuessSongUI");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var exp_GuessSongResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GuessSong, r_UIDef.UIDef.Res.UI.GuessSongResultUI) || this;
    t.reward = 5e6;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GuessSongResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GuessSongResultUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnOK").onClick(function () {
      t.hide();
      r_GuessSongUI.GuessSongUI.hide();
    }, this);
    this.contentPane.getChild("btnNO").onClick(function () {
      t.hide();
      r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.GuessSongUI).showCaidan(1);
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = this.data.result;
    if (0 == this.data.result) {
      this.contentPane.getChild("reward").asTextField.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.reward);
      r_PlayerData.PlayerData.addCoin("歌词猜歌", this.reward);
    }
    this.contentPane.getController("c2").selectedIndex = r_PlayerData.PlayerData.data.miniGame.guessSongCaidan || 0 != this.data.result ? 0 : 1;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.GuessSongResultUI = exp_GuessSongResultUI;