var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountMoneyResult = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_CountMoneyUI = require("CountMoneyUI");
var r_TimeSystem = require("TimeSystem");
var r_DialogueUI = require("DialogueUI");
var exp_CountMoneyResult = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.CountMoney, r_UIDef.UIDef.Res.UI.CountMoneyResult) || this;
    t.caidan = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CountMoneyResult, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CountMoneyResult);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickClose, this);
    this.btnAgain.onClick(this.onClickAgain, this);
    this.btnGet.onClick(this.onClickGet, this);
    this.btnDouble.onClick(this.onClickDouble, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    if (this.data && this.data.mode) {
      this.contentPane.getController("c1").selectedIndex = 1;
      this.lbCount.text = "数了：" + this.data.money;
      this.lbMoney.text = "x" + r_UtilsSystem.UtilsSystem.numFormats(1e4 * this.data.money);
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickClose = function () {
    this.hide();
    r_CountMoneyUI.CountMoneyUI.hide();
    console.log("cd3:", r_PlayerData.PlayerData.data.countMoneyGame.caidan3);
    this.caidan && !r_PlayerData.PlayerData.data.countMoneyGame.caidan3 && r_TimeSystem.TimeSystem.scheduleOnce("DialogueUI_504", .1, function () {
      r_DialogueUI.DialogueUI.showUI(504);
      if (!r_PlatformSystem.PlatformSystem.getIsWebPlatform()) {
        r_PlayerData.PlayerData.data.countMoneyGame.caidan3 = 1;
        r_PlayerData.PlayerData.saveData();
      }
    });
  };
  _ctor.prototype.onClickAgain = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("数钱重新挑战", function () {
      r_CountMoneyUI.CountMoneyUI.Inst && r_CountMoneyUI.CountMoneyUI.Inst.againStartGame();
      e.hide();
    });
  };
  _ctor.prototype.onClickGet = function () {
    r_PlayerData.PlayerData.addCoin("数钱", 1e4 * this.data.money, r_ReportSystem.SystemKey.None, true, true);
    this.showCaidan1Rewad(1);
    this.onClickClose();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("数钱双倍领取", function () {
      r_PlayerData.PlayerData.addCoin("数钱", 2e4 * e.data.money, r_ReportSystem.SystemKey.None, true, true);
      e.showCaidan1Rewad(1);
      e.onClickClose();
    });
  };
  _ctor.prototype.showCaidan1Rewad = function (e) {
    undefined === e && (e = 1);
    if (r_CountMoneyUI.CountMoneyUI.Inst.tiggerCaidan1 && !r_PlayerData.PlayerData.data.countMoneyGame.caidan1) {
      if (!r_PlatformSystem.PlatformSystem.getIsWebPlatform()) {
        r_PlayerData.PlayerData.data.countMoneyGame.caidan1 = 1;
        r_PlayerData.PlayerData.saveData();
      }
      this.caidan = true;
      setTimeout(function () {
        r_PlayerData.PlayerData.addCoin("数钱", 1e8 * e);
      }, 500);
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbMoney")], _ctor.prototype, "lbMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbCount")], _ctor.prototype, "lbCount", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.CountMoneyResult = exp_CountMoneyResult;