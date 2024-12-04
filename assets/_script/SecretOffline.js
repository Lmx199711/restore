var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecretOffline = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_SecretSystem = require("SecretSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var exp_SecretOffline = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Secret, r_UIDef.UIDef.Res.UI.SecretOffline) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SecretOffline, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretOffline);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnGet").asButton.onClick(this.onClickGet, this);
    this.contentPane.getChild("btnVideo").asButton.onClick(this.onClickVideo, this);
    this.labShouyi = this.contentPane.getChild("labShouyi").asButton;
    this.labAward = this.contentPane.getChild("labAward").asButton;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.m_info = r_SecretSystem.SecretSystem.allGainInfo();
    this.m_curTime = r_TimeSystem.TimeSystem.getServerTime();
    this.labShouyi.text = "离线收益效率：" + r_UtilsSystem.UtilsSystem.numFormats(this.m_info.gains) + "/秒";
    this.labAward.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.m_info.gainNum);
    this.contentPane.getController("c1").selectedIndex = this.m_info.gainNum > 0 ? 0 : 1;
  };
  _ctor.prototype.onClickGet = function () {
    r_SecretSystem.SecretSystem.addAllIncome(this.m_info.gainNum, this.m_curTime, false);
    this.hide();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双倍离线收益", function () {
      r_SecretSystem.SecretSystem.addAllIncome(e.m_info.gainNum, e.m_curTime, true);
      e.hide();
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SecretOffline = exp_SecretOffline;