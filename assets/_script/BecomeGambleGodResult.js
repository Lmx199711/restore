var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BecomeGambleGodResult = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BecomeGambleGodUI = require("BecomeGambleGodUI");
var r_TimeSystem = require("TimeSystem");
var exp_BecomeGambleGodResult = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.BecomeGambleGod, r_UIDef.UIDef.Res.UI.BecomeGambleGodResult) || this;
    t.isGet = false;
    t.money = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BecomeGambleGodResult, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BecomeGambleGodResult);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickClose, this);
    this.btnAgain.onClick(this.onClickAgain, this);
    this.btnGet.onClick(this.onClickGet, this);
    this.btnDouble.onClick(this.onClickDouble, this);
  };
  _ctor.prototype.onShown = function () {
    var t;
    e.prototype.onShown.call(this);
    this.isGet = false;
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    if (this.data.myScore > this.data.girlScore) {
      this.contentPane.getController("c1").selectedIndex = 1;
      this.money = 2e7;
    } else if (this.data.myScore == this.data.girlScore) {
      this.contentPane.getController("c1").selectedIndex = 2;
      this.money = 2e6;
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
    }
    this.lbMoney.text = "x" + r_UtilsSystem.UtilsSystem.numFormats(2e6);
    this.lbMyScore.text = this.data.myScore + "分";
    if (this.data.myScore < 0) {
      (t = cc.Color.BLACK).fromHEX("#de4f36");
      this.lbMyScore.color = t;
    } else {
      (t = cc.Color.BLACK).fromHEX("#3cff40");
      this.lbMyScore.color = t;
    }
    if (this.data.girlScore < 0) {
      (t = cc.Color.BLACK).fromHEX("#de4f36");
      this.lbGirlScore.color = t;
    } else {
      (t = cc.Color.BLACK).fromHEX("#3cff40");
      this.lbGirlScore.color = t;
    }
    this.lbGirlScore.text = this.data.girlScore + "分";
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickClose = function () {
    this.hide();
    r_BecomeGambleGodUI.BecomeGambleGodUI.hide();
  };
  _ctor.prototype.onClickAgain = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("成为雀神重新挑战", function () {
      r_BecomeGambleGodUI.BecomeGambleGodUI.Inst && r_BecomeGambleGodUI.BecomeGambleGodUI.Inst.againStartGame();
      e.hide();
    });
  };
  _ctor.prototype.onClickGet = function () {
    var e = this;
    if (!this.isGet) {
      this.isGet = true;
      r_PlayerData.PlayerData.addCoin("成为雀神", this.money);
      r_TimeSystem.TimeSystem.scheduleOnce("huodejinbiSound", .2, function () {
        e.onClickClose();
      });
    }
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    this.isGet || r_PlatformSystem.PlatformSystem.showVideo("成为雀神双倍领取", function () {
      e.isGet = true;
      r_PlayerData.PlayerData.addCoin("成为雀神", 2 * e.money);
      r_TimeSystem.TimeSystem.scheduleOnce("huodejinbiSound", .2, function () {
        e.onClickClose();
      });
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbMoney")], _ctor.prototype, "lbMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbGirlScore")], _ctor.prototype, "lbGirlScore", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbMyScore")], _ctor.prototype, "lbMyScore", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.BecomeGambleGodResult = exp_BecomeGambleGodResult;