var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var def_MonopolyBankUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Monopoly, r_UIDef.UIDef.Res.UI.MonopolyBankUI) || this;
    t.m_units = ["元", "万", "亿"];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MonopolyBankUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MonopolyBankUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.num0 = this.contentPane.getChild("num0").asButton;
    this.num1 = this.contentPane.getChild("num1").asButton;
    this.num2 = this.contentPane.getChild("num2").asButton;
    this.num3 = this.contentPane.getChild("num3").asButton;
    this.num4 = this.contentPane.getChild("num4").asButton;
    this.btnGet = this.contentPane.getChild("btnGet").asButton;
    this.btnGet.onClick(this.onClickGet, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.clearTimeMapUpdate("randomCoin");
  };
  _ctor.prototype.restart = function () {
    var e = this;
    var t = 0;
    var o = this.data.coin + this.data.unit;
    this.btnGet.visible = false;
    r_SoundMgr.SoundMgr.playSound("monopoly/支票数字滚动");
    r_TimeSystem.TimeSystem.timeMapUpdate("randomCoin", 1, function (i) {
      var n = 0;
      for (var a = 0; a < 4; a++) {
        var s = r_UtilsSystem.UtilsSystem.getRandomNum(0, 9);
        e["num" + a].text = s + "";
      }
      n >= e.m_units.length && (n = 0);
      e.num4.text = e.m_units[n++];
      if (1 == i) {
        for (a = 4; a >= 0; a--) {
          e["num" + a].text = o[o.length - 1 - t] || "0";
          t++;
        }
        e.btnGet.visible = true;
      }
    });
  };
  _ctor.prototype.onClickGet = function () {
    var e = this.data.coin * ("元" == this.data.unit ? 1 : "万" == this.data.unit ? 1e4 : 1e8);
    r_PlayerData.PlayerData.addCoin("大富翁奖励", e + "", r_ReportSystem.SystemKey.大富翁);
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_MonopolyBankUI;