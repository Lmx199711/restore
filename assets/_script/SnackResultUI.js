var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackResultUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_SnackRoomFullCfg = require("SnackRoomFullCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SnackPlacementUI = require("SnackPlacementUI");
var r_SnackRoomFullUI = require("SnackRoomFullUI");
var exp_SnackResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackResultUI) || this;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnOpenSell.onClick(this.onClickOpenSell, this);
    this.btnAgain.onClick(this.onClickAgain, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (1 == this.data.level) {
      this.curData = r_SnackRoomFullCfg.SnackGiftGameInfos[r_PlayerData.PlayerData.data.snackRoomFull.giftGrade - 1];
    } else {
      this.curData = r_SnackRoomFullCfg.SnackHighGiftGameInfos[r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade - 1];
    }
    this.setCurRewad();
    this.lbNum.text = this.data.boxCount + "/" + this.curData.boxCount;
    var t = (this.curMoney / 1e4).toFixed(2) + "万";
    this.lbMoney.text = t;
    this.lbScore.text = this.data.score + "";
    if (this.data.score < 60) {
      this.contentPane.getController("c1").selectedIndex = 0;
    } else {
      this.contentPane.getController("c1").selectedIndex = 1;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.setCurRewad = function () {
    var e = 1;
    var t = 0;
    if (this.data.score >= 60 && this.data.score < 80) {
      e += .5;
      t = 1;
    } else if (this.data.score >= 80 && this.data.score < 100) {
      e += 1;
      t = 2;
    } else if (this.data.score >= 100 && this.data.score < 200) {
      e += 3;
      t = 3;
    } else if (this.data.score >= 200) {
      e += 5;
      t = 3;
    }
    if (1 == this.data.level) {
      this.curMoney = Math.floor(this.data.boxCount * r_SnackRoomFullCfg.SnackRoomFullCfg.placeOneSnackMoney * e) * r_SnackRoomFullCfg.SnackRoomFullCfg.double;
      r_PlayerData.PlayerData.data.snackRoomFull.giftStar = t;
    } else {
      this.curMoney = Math.floor(this.data.boxCount * r_SnackRoomFullCfg.SnackRoomFullCfg.placeOneSnackMoney * e * [2, 3, 5][r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade - 1]) * r_SnackRoomFullCfg.SnackRoomFullCfg.double;
      r_PlayerData.PlayerData.data.snackRoomFull.highGiftStar = t;
    }
    r_PlayerData.PlayerData.data.snackRoomFull.score < this.data.score && (r_PlayerData.PlayerData.data.snackRoomFull.score = this.data.score);
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.getGiftInfoByIndex = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo.length; t++) {
      if (r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[t].id == e) {
        return r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[t];
      }
    }
    return r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[0];
  };
  _ctor.prototype.onClickOpenSell = function () {
    var e = 1;
    var t = 1;
    if (1 == this.data.level) {
      e = r_PlayerData.PlayerData.data.snackRoomFull.giftGrade;
      t = r_PlayerData.PlayerData.data.snackRoomFull.giftStar;
    } else {
      e = r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade + 3;
      t = r_PlayerData.PlayerData.data.snackRoomFull.highGiftStar;
    }
    this.getGiftInfoByIndex(e).time = r_TimeSystem.TimeSystem.getServerTime();
    this.getGiftInfoByIndex(e).rewardMoney = this.curMoney;
    t >= 3 && e <= 5 && (this.getGiftInfoByIndex(e + 1).lock = 1);
    this.getGiftInfoByIndex(e).star = t;
    r_PlayerData.PlayerData.saveData();
    r_SnackRoomFullUI.SnackRoomFullUI.Inst && r_SnackRoomFullUI.SnackRoomFullUI.Inst.refreshGiftState();
    r_SnackPlacementUI.SnackPlacementUI.hide();
    this.onClose();
  };
  _ctor.prototype.onClickAgain = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("零食满屋重新摆放", function () {
      e.onClose();
      r_SnackPlacementUI.SnackPlacementUI.Inst && r_SnackPlacementUI.SnackPlacementUI.Inst.reStartGame();
    });
  };
  _ctor.prototype.onClose = function () {
    _ref__ctor.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOpenSell")], _ctor.prototype, "btnOpenSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbNum")], _ctor.prototype, "lbNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbScore")], _ctor.prototype, "lbScore", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbMoney")], _ctor.prototype, "lbMoney", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.SnackResultUI = exp_SnackResultUI;