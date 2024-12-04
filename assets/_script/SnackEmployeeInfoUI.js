var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackEmployeeInfoUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_SnackRoomFullCfg = require("SnackRoomFullCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SnackAdjustTimeUI = require("SnackAdjustTimeUI");
var exp_SnackEmployeeInfoUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackEmployeeInfoUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackEmployeeInfoUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackEmployeeInfoUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onClose, this);
    this.btnAdjustTime.onClick(this.onClickAdjustTime, this);
    this.btnGiveGift.onClick(this.onClickGiveGift, this);
    this.btnGetInfo.onClick(this.onClickGetInfo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.employeeInfo = r_SnackRoomFullCfg.SnackEmployeeCfg[r_PlayerData.PlayerData.data.snackRoomFull.employeeId - 1];
    this.refreshUi();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.onClickAdjustTime = function () {
    r_SnackAdjustTimeUI.SnackAdjustTimeUI.showUI();
  };
  _ctor.prototype.onClickGiveGift = function () {};
  _ctor.prototype.onClickGetInfo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("零食满屋获取店员信息", function () {
      r_PlayerData.PlayerData.data.snackRoomFull.employeeMap[r_PlayerData.PlayerData.data.snackRoomFull.employeeId - 1].getInfo = 1;
      r_PlayerData.PlayerData.saveData();
      e.refreshUi();
    });
  };
  _ctor.prototype.refreshUi = function () {
    this.refreshWorkTimeLb();
    if (r_PlayerData.PlayerData.data.snackRoomFull.employeeMap[r_PlayerData.PlayerData.data.snackRoomFull.employeeId - 1].getInfo) {
      this.btnGetInfo.visible = false;
      this.lbLove.text = this.employeeInfo.love;
      this.lbPhone.text = this.employeeInfo.phone;
    } else {
      this.btnGetInfo.visible = true;
      this.lbLove.text = "？？？";
      this.lbPhone.text = "？？？";
    }
    this.lbName.text = this.employeeInfo.name;
    this.lbAge.text = this.employeeInfo.age;
    this.refreshMoodProgress();
  };
  _ctor.prototype.refreshMoodProgress = function () {
    this.progress.getChild("curMood").text = r_PlayerData.PlayerData.data.snackRoomFull.employeeMap[r_PlayerData.PlayerData.data.snackRoomFull.employeeId - 1].curMood + "";
    this.progress.getChild("allMood").text = "100";
    var e = "bq" + (Math.floor(r_PlayerData.PlayerData.data.snackRoomFull.employeeMap[r_PlayerData.PlayerData.data.snackRoomFull.employeeId - 1].curMood / 20) + 1);
    100 == r_PlayerData.PlayerData.data.snackRoomFull.employeeMap[r_PlayerData.PlayerData.data.snackRoomFull.employeeId - 1].curMood && (e = "bq" + Math.floor(r_PlayerData.PlayerData.data.snackRoomFull.employeeMap[r_PlayerData.PlayerData.data.snackRoomFull.employeeId - 1].curMood / 20));
    this.progress.getChild("bq").asLoader.url = "ui://SnackRoomFull/" + e;
    this.progress.value = r_PlayerData.PlayerData.data.snackRoomFull.employeeMap[r_PlayerData.PlayerData.data.snackRoomFull.employeeId - 1].curMood / 100 * 100;
  };
  _ctor.prototype.refreshWorkTimeLb = function () {
    this.lbWorkTime.text = r_PlayerData.PlayerData.data.snackRoomFull.workTime[0] + "点- " + r_PlayerData.PlayerData.data.snackRoomFull.workTime[1] + "点";
  };
  _ctor.prototype.onClose = function () {
    _ctor.hide();
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAdjustTime")], _ctor.prototype, "btnAdjustTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGiveGift")], _ctor.prototype, "btnGiveGift", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGetInfo")], _ctor.prototype, "btnGetInfo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbName")], _ctor.prototype, "lbName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbAge")], _ctor.prototype, "lbAge", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbLove")], _ctor.prototype, "lbLove", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbPhone")], _ctor.prototype, "lbPhone", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbWorkTime")], _ctor.prototype, "lbWorkTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("progress")], _ctor.prototype, "progress", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.SnackEmployeeInfoUI = exp_SnackEmployeeInfoUI;