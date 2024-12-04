var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackAdjustTimeUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SnackEmployeeInfoUI = require("SnackEmployeeInfoUI");
var r_SnackRoomFullUI = require("SnackRoomFullUI");
var exp_SnackAdjustTimeUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackAdjustTimeUI) || this;
    t.listData = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    t.itemHeight = 93;
    t.curScrollNum = 0;
    t.curScrollNum1 = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackAdjustTimeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackAdjustTimeUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onClose, this);
    this.btnSure.onClick(this.onClickSure, this);
    this.list.setVirtual();
    this.list.itemRenderer = this.itemRenderer.bind(this);
    this.list.on(fgui.Event.SCROLL_END, this.onScrollEnd, this);
    this.list1.setVirtual();
    this.list1.itemRenderer = this.itemRenderer1.bind(this);
    this.list1.on(fgui.Event.SCROLL_END, this.onScrollEnd1, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.list.numItems = this.listData.length;
    this.list1.numItems = this.listData.length;
    this.curScrollNum = r_PlayerData.PlayerData.data.snackRoomFull.workTime[0];
    this.curScrollNum1 = r_PlayerData.PlayerData.data.snackRoomFull.workTime[1];
    this.list.scrollToView(r_PlayerData.PlayerData.data.snackRoomFull.workTime[0] + 1);
    this.list1.scrollToView(r_PlayerData.PlayerData.data.snackRoomFull.workTime[1] + 1);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.itemRenderer = function (e, t) {
    t.getChild("lbHour").text = "" + this.listData[e];
    if (0 == e || 26 == e) {
      t.getChild("lbHour").text = "";
      t.getChild("lbMinute").text = "";
    } else {
      t.getChild("lbMinute").text = "00";
    }
  };
  _ctor.prototype.itemRenderer1 = function (e, t) {
    t.getChild("lbHour").text = "" + this.listData[e];
    if (0 == e || 26 == e) {
      t.getChild("lbHour").text = "";
      t.getChild("lbMinute").text = "";
    } else {
      t.getChild("lbMinute").text = "00";
    }
  };
  _ctor.prototype.onClickSure = function () {
    var e = this;
    if (this.listData[this.curScrollNum + 1] >= this.listData[this.curScrollNum1 + 1]) {
      r_UtilsSystem.UtilsSystem.showTip("请调整正确的营业时间");
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("零食满屋调整时间奖励", function () {
        r_PlayerData.PlayerData.data.snackRoomFull.workTime[0] = e.listData[e.curScrollNum + 1];
        r_PlayerData.PlayerData.data.snackRoomFull.workTime[1] = e.listData[e.curScrollNum1 + 1];
        r_PlayerData.PlayerData.saveData();
        r_UtilsSystem.UtilsSystem.showTip("调整营业时间为" + e.listData[e.curScrollNum + 1] + "点-" + e.listData[e.curScrollNum1 + 1]);
        e.onClose();
        r_SnackEmployeeInfoUI.SnackEmployeeInfoUI.Inst && r_SnackEmployeeInfoUI.SnackEmployeeInfoUI.Inst.refreshWorkTimeLb();
        r_SnackRoomFullUI.SnackRoomFullUI.Inst && r_SnackRoomFullUI.SnackRoomFullUI.Inst.refreshWorkTimeLb();
      });
    }
  };
  _ctor.prototype.onScrollEnd = function () {
    this.scrollingPosY = this.list.scrollPane.scrollingPosY;
    this.curScrollNum = Math.ceil(this.scrollingPosY / this.itemHeight);
  };
  _ctor.prototype.onScrollEnd1 = function () {
    this.scrollingPosY1 = this.list1.scrollPane.scrollingPosY;
    this.curScrollNum1 = Math.ceil(this.scrollingPosY1 / this.itemHeight);
  };
  _ctor.prototype.onClose = function () {
    _ctor.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSure")], _ctor.prototype, "btnSure", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list1")], _ctor.prototype, "list1", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.SnackAdjustTimeUI = exp_SnackAdjustTimeUI;