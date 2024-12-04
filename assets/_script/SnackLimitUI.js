var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackLimitUI = undefined;
var r_UIDef = require("UIDef");
var r_BagSystem = require("BagSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SnackRoomFullUI = require("SnackRoomFullUI");
var exp_SnackLimitUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackLimitUI) || this;
    t.videoCount = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackLimitUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackLimitUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onClose, this);
    this.btnComeIn.onClick(this.onClickComeIn, this);
    this.btnLock.onClick(this.onClickLock, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.videoCount = 0;
    this.btnLock.getChild("lbCount").text = this.videoCount + "/2";
    if (r_BagSystem.BagSystem.getPlayerGoodsInfoById(41)) {
      this.btnComeIn.enabled = true;
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      this.btnComeIn.enabled = false;
      this.contentPane.getController("c1").selectedIndex = 0;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickComeIn = function () {
    this.hide();
    r_BagSystem.BagSystem.setPlayerGoodsInfoById(41, -1);
    r_PlayerData.PlayerData.data.snackRoomFull.unLock = 1;
  };
  _ctor.prototype.onClickLock = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("零食满屋提前解锁", function () {
      e.videoCount++;
      e.btnLock.getChild("lbCount").text = e.videoCount + "/2";
      if (e.videoCount >= 2) {
        e.hide();
        r_PlayerData.PlayerData.data.snackRoomFull.unLock = 1;
        r_PlayerData.PlayerData.saveData();
      }
    });
  };
  _ctor.prototype.onClose = function () {
    this.hide();
    r_SnackRoomFullUI.SnackRoomFullUI.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnComeIn")], _ctor.prototype, "btnComeIn", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLock")], _ctor.prototype, "btnLock", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.SnackLimitUI = exp_SnackLimitUI;