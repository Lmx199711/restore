var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIeldTipUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_FiledGameUI = require("FiledGameUI");
var r_EffectsCom = require("EffectsCom");
var r_PlatformSystem = require("PlatformSystem");
var r_ReportSystem = require("ReportSystem");
var exp_FIeldTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Field, r_UIDef.UIDef.Res.UI.FIeldTipUI) || this;
    t.showAnimFlag = true;
    t.hideAnimFlag = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.m_data = e;
    this.show(r_UIDef.UIDef.Urls.UI.FIeldTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FIeldTipUI);
    this.showFlag = false;
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    var t = this.contentPane.getChild("close").asButton;
    this.spCenter = this.contentPane.getChild("center").asLoader;
    t.onClick(this.onBtnOk, this);
    this.btnMainchu = this.contentPane.getChild("btnMainchu").asButton;
    this.btnDouble = this.contentPane.getChild("btnDouble").asButton;
    this.btnMainchu.onClick(this.onBtnMainchu, this);
    this.btnDouble.onClick(this.onBtnDouble, this);
  };
  _ctor.prototype.onHide = function () {
    2 != _ctor.m_data.id && 3 != _ctor.m_data.id || r_FiledGameUI.FiledGameUI.hide();
    _ctor.showFlag = false;
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onShown = function () {
    _ctor.showFlag = true;
    e.prototype.onShown.call(this);
    var o = _ctor.m_data;
    this.contentPane.getController("c1").setSelectedIndex(o.price > 0 ? 1 : 0);
    this.contentPane.getChild("pirce").asLabel.text = r_UtilsSystem.UtilsSystem.getShowCoin(Math.abs(o.price));
    this.contentPane.getChild("tip").asLabel.text = o.tip;
    this.contentPane.getChild("icon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Field + "/" + o.icon;
    this.contentPane.getController("c2").setSelectedIndex(parseInt(o.eventType));
  };
  _ctor.prototype.onBtnOk = function () {
    var e = _ctor.m_data;
    if (e.price > 0) {
      r_PlayerData.PlayerData.addCoin("挖到" + e.icon, e.price, r_ReportSystem.SystemKey.钻井);
      r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_ADD_COIN);
      return void this.hide();
    }
    var o = Math.abs(e.price);
    if (!r_PlayerData.PlayerData.isCoinEnough(o)) {
      r_PlayerData.PlayerData.deleteCoin("挖到" + e.icon, r_PlayerData.PlayerData.bigCoin);
      return void this.hide();
    }
    r_PlayerData.PlayerData.deleteCoin("挖到" + e.icon, o);
    this.hide();
  };
  _ctor.prototype.onBtnMainchu = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("油田处罚", function () {
      r_UtilsSystem.UtilsSystem.showTip("这次就不扣你的钱了");
      e.hide();
    });
  };
  _ctor.prototype.onBtnDouble = function () {
    var e = this;
    var o = _ctor.m_data;
    r_PlatformSystem.PlatformSystem.showVideo("油田双倍", function () {
      r_PlayerData.PlayerData.addCoin("挖到" + o.icon, 2 * o.price, r_ReportSystem.SystemKey.钻井);
      r_UtilsSystem.UtilsSystem.showTip("获得双倍奖励");
      r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_ADD_COIN);
      e.hide();
    });
  };
  _ctor.showFlag = false;
  return _ctor;
}(r_TYIndex.UIWind);
exports.FIeldTipUI = exp_FIeldTipUI;