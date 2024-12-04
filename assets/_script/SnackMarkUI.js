var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackMarkUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SnackRoomFullCfg = require("SnackRoomFullCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SnackPlacementUI = require("SnackPlacementUI");
var exp_SnackMarkUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackMarkUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackMarkUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackMarkUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.hide, this);
    this.btnMark.onClick(this.onClickMake, this);
    this.btnAddCount.onClick(this.onClickAddCount, this);
    this.list.itemRenderer = this.onItemRenderer.bind(this);
    this.list.setVirtual();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.refreshMakeBtnState();
    this.pic.asLoader.url = "ui://SnackRoomFull/lh" + this.data.index;
    this.title.asLoader.url = "ui://SnackRoomFull/title" + this.data.index;
    if (this.data.index <= 3) {
      r_PlayerData.PlayerData.data.snackRoomFull.giftGrade = this.data.index;
      this.curData = r_SnackRoomFullCfg.SnackGiftGameInfos[r_PlayerData.PlayerData.data.snackRoomFull.giftGrade - 1];
    } else {
      r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade = this.data.index - 3;
      this.curData = r_SnackRoomFullCfg.SnackHighGiftGameInfos[r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade - 1];
    }
    this.list.numItems = this.curData.snackType.length;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onItemRenderer = function (e, t) {
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("snackPic"), "game1", "snackRoomFull/icon/wp" + this.curData.snackType[e]);
  };
  _ctor.prototype.refreshMakeBtnState = function () {
    r_PlayerData.PlayerData.data.snackRoomFull.boxCreateTime && !r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.snackRoomFull.boxCreateTime) || (r_PlayerData.PlayerData.data.snackRoomFull.boxCreateCount = 0);
    var e = this.getBoxMakeRemainCount();
    if (e <= 0) {
      this.btnAddCount.visible = true;
      this.btnMark.visible = false;
    } else {
      this.btnAddCount.visible = false;
      this.btnMark.visible = true;
    }
    this.lbMakeCount.text = "可制作：<color=#ff0000>" + e + "</c>/" + r_SnackRoomFullCfg.SnackRoomFullCfg.dayPlayCount + "次";
  };
  _ctor.prototype.getBoxMakeRemainCount = function () {
    var e = r_SnackRoomFullCfg.SnackRoomFullCfg.dayPlayCount - r_PlayerData.PlayerData.data.snackRoomFull.boxCreateCount;
    e <= 0 && (e = 0);
    return e;
  };
  _ctor.prototype.onClickMake = function () {
    if (1 != this.data.index) {
      if (this.data.index <= 3) {
        if (!r_PlayerData.PlayerData.isCoinEnough(r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyBox)) {
          return void r_UtilsSystem.UtilsSystem.showTip("金币不足！");
        }
        r_PlayerData.PlayerData.deleteCoin("零食满屋", r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyBox, r_ReportSystem.SystemKey.零食满屋, false);
      } else {
        if (!r_PlayerData.PlayerData.isCoinEnough(r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyHighBox)) {
          return void r_UtilsSystem.UtilsSystem.showTip("金币不足！");
        }
        r_PlayerData.PlayerData.deleteCoin("零食满屋", r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyHighBox, r_ReportSystem.SystemKey.零食满屋, false);
      }
    }
    r_PlayerData.PlayerData.data.snackRoomFull.boxCreateCount += 1;
    r_PlayerData.PlayerData.data.snackRoomFull.boxCreateTime = r_TimeSystem.TimeSystem.getServerTime();
    if (this.data.index <= 3) {
      r_SnackPlacementUI.SnackPlacementUI.showUI({
        index: 1,
        snackType: []
      });
    } else {
      r_SnackPlacementUI.SnackPlacementUI.showUI({
        index: 2,
        snackType: []
      });
    }
    this.hide();
  };
  _ctor.prototype.onClickAddCount = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("零食满屋补充次数", function () {
      r_PlayerData.PlayerData.data.snackRoomFull.boxCreateCount = 0;
      e.refreshMakeBtnState();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnMark")], _ctor.prototype, "btnMark", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pic")], _ctor.prototype, "pic", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbMakeCount")], _ctor.prototype, "lbMakeCount", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAddCount")], _ctor.prototype, "btnAddCount", undefined);
  __decorate([r_DecorateFunction1.AutoFind("title")], _ctor.prototype, "title", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.SnackMarkUI = exp_SnackMarkUI;