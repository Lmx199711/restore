var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EarnComponet = undefined;
var r_CoinSystem = require("CoinSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var exp_EarnComponet = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    this.labTouch = this.getChild("labTouch");
    this.labTime = this.getChild("labTime");
  };
  _ctor.prototype.onEnable = function () {
    e.prototype.onEnable.call(this);
    this.setView();
  };
  _ctor.prototype.refreshView = function () {
    r_PlayerData.PlayerData.data && this.setView();
  };
  _ctor.prototype.setView = function () {
    this.labTouch.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_CoinSystem.CoinSystem.getClickCoin()) + "_次";
    this.labTime.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_CoinSystem.CoinSystem.getAllAddCoin().allCoin) + "_秒";
  };
  return _ctor;
}(fgui.GComponent);
exports.EarnComponet = exp_EarnComponet;