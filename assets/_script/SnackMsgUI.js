var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackMsgUI = undefined;
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SnackRoomFullUI = require("SnackRoomFullUI");
var exp_SnackMsgUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackMsgUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackMsgUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackMsgUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onClose1, this);
    this.btnBack.onClick(this.onClose, this);
    this.btnMsgOpen.onClick(this.onClickOpen, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = 0;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickOpen = function () {
    this.contentPane.getController("c1").selectedIndex = 1;
  };
  _ctor.prototype.onClose1 = function () {
    this.contentPane.getController("c1").selectedIndex = 0;
    _ctor.hide();
  };
  _ctor.prototype.onClose = function () {
    r_SnackRoomFullUI.SnackRoomFullUI.hide();
    _ctor.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnMsgOpen")], _ctor.prototype, "btnMsgOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.SnackMsgUI = exp_SnackMsgUI;