var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitResultUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ShareSystem = require("ShareSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_EffectsCom = require("EffectsCom");
var r_BitResultData = require("BitResultData");
var exp_BitResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Bit, r_UIDef.UIDef.Res.UI.BitResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BitResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BitResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnAgain").asButton.onClick(this.onGet, this);
    this.contentPane.getChild("btnDouble").asButton.onClick(this.onDoubleGet, this);
    this.contentPane.getChild("btnUnLoss").asButton.onClick(this.onBtnUnLoss, this);
    this.bindBtnCallback(this.btnShare);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_ShareSystem.ShareSystem.stopRecord(false);
    r_SoundMgr.SoundMgr.stopMusic();
    this.contentPane.getController("c1").setSelectedIndex(r_BitResultData.BitResultData.total >= 0 ? 0 : 1);
    this.contentPane.getChild("labLoss").asLabel.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_BitResultData.BitResultData.loss);
    this.contentPane.getChild("labIncome").asLabel.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_BitResultData.BitResultData.income);
    this.contentPane.getChild("labCount").asLabel.text = (r_BitResultData.BitResultData.total < 0 ? "-" : "") + r_UtilsSystem.UtilsSystem.getShowCoin(Math.abs(r_BitResultData.BitResultData.total));
    this.contentPane.getChild("labDis").asLabel.text = r_BitResultData.BitResultData.dis + "米";
    r_SoundMgr.SoundMgr.playSound("bit/结算音效");
  };
  _ctor.prototype.onHide = function () {
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.bitAgain);
  };
  _ctor.prototype.onGet = function () {
    if (r_BitResultData.BitResultData.total >= 0) {
      r_PlayerData.PlayerData.addCoin("钻井结算", Math.abs(r_BitResultData.BitResultData.total), r_ReportSystem.SystemKey.钻井);
      r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_ADD_COIN);
    } else if (r_PlayerData.PlayerData.isCoinEnough(Math.abs(r_BitResultData.BitResultData.total))) {
      r_PlayerData.PlayerData.deleteCoin("钻井结算", Math.abs(r_BitResultData.BitResultData.total), r_ReportSystem.SystemKey.钻井);
    } else {
      r_PlayerData.PlayerData.deleteCoin("钻井结算", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.钻井);
    }
    this.hide();
  };
  _ctor.prototype.onDoubleGet = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("钻井双倍结算", function () {
      if (r_BitResultData.BitResultData.total >= 0) {
        r_PlayerData.PlayerData.addCoin("钻井结算", Math.abs(2 * r_BitResultData.BitResultData.total), r_ReportSystem.SystemKey.钻井);
        r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_ADD_COIN);
      }
      e.hide();
    });
  };
  _ctor.prototype.onBtnUnLoss = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("钻井扣款", function () {
      e.hide();
    });
  };
  _ctor.prototype.onClickbtnShare = function () {
    r_ShareSystem.ShareSystem.shareAppVideoMessage(function () {
      r_PlayerData.PlayerData.addCoin("分享获得金币", 1e5, r_ReportSystem.SystemKey.None);
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnShare")], _ctor.prototype, "btnShare", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.BitResultUI = exp_BitResultUI;