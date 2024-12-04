var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BankResultUI = undefined;
var r_UIDef = require("UIDef");
var r_BankSystem = require("BankSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var exp_BankResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Bank, r_UIDef.UIDef.Res.UI.BankResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BankResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BankResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.labDesc = this.contentPane.getChild("labDesc");
    this.btnClose = this.contentPane.getChild("btnClose");
    this.btnDouble = this.contentPane.getChild("btnDouble");
    this.bubble = this.contentPane.getChild("bubble");
    this.groupShow = this.contentPane.getChild("groupShow");
    this.sk0 = this.contentPane.getChild("sk0");
    this.sk1 = this.contentPane.getChild("sk1");
    this.btnClose.onClick(this.onClickClose, this);
    this.btnDouble.onClick(this.onClickDouble, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instace = this;
    this.groupShow.visible = true;
    this.sk0.visible = false;
    this.sk1.visible = false;
    this.bubble.visible = false;
    var o = r_PlayerData.PlayerData.data.bankInfo.coin + r_PlayerData.PlayerData.data.bankInfo.unit;
    this.labDesc.text = "领取未来钱包收益" + o;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
  };
  _ctor.prototype.onClickClose = function () {
    r_BankSystem.BankSystem.forgetCoint();
    this.hide();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双倍未来银行", function () {
      e.playAnim(false);
    });
  };
  _ctor.prototype.playAnim = function (e) {
    var t = this;
    var o = r_PlayerData.PlayerData.data.bankInfo.unit;
    this.groupShow.visible = false;
    this.sk0.visible = true;
    this.sk1.visible = true;
    this.sk0.alpha = 1;
    this.sk1.alpha = 1;
    this.sk0.loop = false;
    this.sk1.loop = false;
    this.sk0.animationName = "step_" + ("元" == o ? 0 : "万" == o ? 1 : 2);
    this.sk1.animationName = "step_" + ("元" == o ? 1 : "万" == o ? 2 : 3);
    this.sk0.playing = true;
    this.sk1.playing = true;
    r_SoundMgr.SoundMgr.playSound("bank/传送门打开");
    "元" == o && r_TimeSystem.TimeSystem.scheduleOnce("bubble", 1, function () {
      t.bubble.visible = true;
      r_SoundMgr.SoundMgr.playSound("bank/哎非酋");
    });
    r_TimeSystem.TimeSystem.scheduleOnce("closeWin", "元" == o ? 3.5 : "万" == o ? 4.2 : 8.5, function () {
      r_BankSystem.BankSystem.getCoin(e);
      cc.tween(t.sk0).to(.5, {
        alpha: 0
      }).call(function () {
        t.sk0.playing = false;
      }).start();
      cc.tween(t.sk1).to(1, {
        alpha: 0
      }).call(function () {
        t.sk1.playing = false;
        t.hide();
      }).start();
    });
    r_SoundMgr.SoundMgr.playSound("bank/金币" + ("元" == o ? 1 : "万" == o ? 2 : 3));
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BankResultUI = exp_BankResultUI;