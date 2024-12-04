var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackMakeSelectUI = undefined;
var r_UIDef = require("UIDef");
var r_DaySystem = require("DaySystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SnackRoomFullCfg = require("SnackRoomFullCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_SnackGuideUI = require("SnackGuideUI");
var r_SnackPlacementUI = require("SnackPlacementUI");
var r_SnackRoomFullUI = require("SnackRoomFullUI");
var C = ["初级礼盒", "中级礼盒", "高级礼盒"];
var exp_SnackMakeSelectUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackMakeSelectUI) || this;
    t.sellGiftTime = 0;
    t.sellHighGiftTime = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackMakeSelectUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackMakeSelectUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onClose, this);
    this.btnUpGift.onClick(this.onClickUpGift, this);
    this.btnStartMake.onClick(this.onClickStartMake, this);
    this.btnAddSpeed.onClick(this.onClickAddSpeed, this);
    this.btnGet.onClick(this.onClickGet, this);
    this.btnWaitSell.onClick(this.onClicWaitSell, this);
    this.btnAddCount.onClick(this.onClicAddCount, this);
    this.btnAddCount.getController("c1").selectedIndex = 1;
    this.btnHighUpGift.onClick(this.onClickHighUpGift, this);
    this.btnHighStartMake.onClick(this.onClickHighStartMake, this);
    this.btnHighAddSpeed.onClick(this.onClickHighAddSpeed, this);
    this.btnHighGet.onClick(this.onClickHighGet, this);
    this.btnHighWaitSell.onClick(this.onClickHighWaitSell, this);
    this.btnHightAddCount.onClick(this.onClickHighAddCount, this);
    this.btnHightAddCount.getController("c1").selectedIndex = 1;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_PlayerData.PlayerData.data.snackRoomFull.isGuide || r_SnackGuideUI.SnackGuideUI.Inst && r_SnackGuideUI.SnackGuideUI.Inst.finishStep(1);
    this.highGiftInfo.asCom.getController("c1").selectedIndex = 1;
    this.refreshUseTime();
    this.refreshUi();
    this.showCountDown();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    if (r_PlayerData.PlayerData.data.comeInSysCount[r_ReportSystem.SystemKey.零食满屋] && 1 == r_PlayerData.PlayerData.data.comeInSysCount[r_ReportSystem.SystemKey.零食满屋].count) {
      r_PlayerData.PlayerData.data.snackRoomFull.startSellTime > 0 && (r_PlayerData.PlayerData.data.snackRoomFull.startSellTime = r_PlayerData.PlayerData.data.time);
      r_PlayerData.PlayerData.data.snackRoomFull.highStartSellTime > 0 && (r_PlayerData.PlayerData.data.snackRoomFull.highStartSellTime = r_PlayerData.PlayerData.data.time);
    }
    r_SnackRoomFullUI.SnackRoomFullUI.Inst && r_SnackRoomFullUI.SnackRoomFullUI.Inst.showBubble();
    r_TimeSystem.TimeSystem.unregistSecondUpdate("SnackMakeSelectUI");
    _ctor.Inst = null;
  };
  _ctor.prototype.showCountDown = function () {
    var e = this;
    r_TimeSystem.TimeSystem.unregistSecondUpdate("SnackMakeSelectUI");
    r_TimeSystem.TimeSystem.registSecondUpdate("SnackMakeSelectUI", function () {
      if (!r_DaySystem.DaySystem.isPause) {
        e.sellGiftTime -= 1;
        e.sellHighGiftTime -= 1;
        e.sellGiftTime <= 0 && (e.sellGiftTime = 0);
        e.sellHighGiftTime <= 0 && (e.sellHighGiftTime = 0);
        e.refreshUi();
      }
    });
  };
  _ctor.prototype.refreshUi = function () {
    this.setGiftInfo();
    this.setHighGiftInfo();
  };
  _ctor.prototype.isWorking = function () {
    return true;
  };
  _ctor.prototype.getGiftExpectCoin = function () {
    if (r_PlayerData.PlayerData.data.snackRoomFull.rewardMoney > 0) {
      return r_PlayerData.PlayerData.data.snackRoomFull.rewardMoney;
    } else {
      return r_SnackRoomFullCfg.SnackGiftGameInfos[r_PlayerData.PlayerData.data.snackRoomFull.giftGrade - 1].boxCount * r_SnackRoomFullCfg.SnackRoomFullCfg.placeOneSnackMoney * (r_SnackRoomFullCfg.SnackGiftGameInfos[r_PlayerData.PlayerData.data.snackRoomFull.giftGrade - 1].double + 3) * r_SnackRoomFullCfg.SnackRoomFullCfg.double;
    }
  };
  _ctor.prototype.getHighGiftExpectCoin = function () {
    if (r_PlayerData.PlayerData.data.snackRoomFull.highRewardMoney > 0) {
      return r_PlayerData.PlayerData.data.snackRoomFull.highRewardMoney;
    } else {
      return r_SnackRoomFullCfg.SnackHighGiftGameInfos[r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade - 1].boxCount * r_SnackRoomFullCfg.SnackRoomFullCfg.placeOneSnackMoney * 4 * r_SnackRoomFullCfg.SnackHighGiftGameInfos[r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade - 1].double * r_SnackRoomFullCfg.SnackRoomFullCfg.double;
    }
  };
  _ctor.prototype.setGiftInfo = function () {
    this.giftInfo.getChild("name").text = C[r_PlayerData.PlayerData.data.snackRoomFull.giftGrade - 1];
    this.giftInfo.getChild("giftIcon").asLoader.url = "ui://SnackRoomFull/lh" + r_PlayerData.PlayerData.data.snackRoomFull.giftGrade;
    this.giftInfo.getChild("start").asCom.getController("c1").selectedIndex = r_PlayerData.PlayerData.data.snackRoomFull.giftStar;
    this.giftInfo.getChild("money").text = r_UtilsSystem.UtilsSystem.getShowCoin(this.getGiftExpectCoin()).replace("元", "");
    if (this.sellGiftTime > 0) {
      if (r_PlayerData.PlayerData.data.snackRoomFull.isCanSell) {
        this.giftInfo.getChild("lbSellTime").text = "";
      } else {
        this.giftInfo.getChild("lbSellTime").text = "销售时间 " + r_UtilsSystem.UtilsSystem.getTime(this.sellGiftTime);
      }
    } else {
      this.giftInfo.getChild("lbSellTime").text = "";
    }
    r_PlayerData.PlayerData.data.snackRoomFull.startSellTime && this.onClickGet();
    if (r_PlayerData.PlayerData.data.snackRoomFull.startSellTime) {
      if (this.sellGiftTime > 0) {
        this.giftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 1;
        r_PlayerData.PlayerData.data.snackRoomFull.isCanSell && (this.giftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 2);
      } else {
        this.giftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 2;
      }
    } else {
      this.giftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 0;
    }
    if (!this.isWorking()) {
      if (r_PlayerData.PlayerData.data.snackRoomFull.startSellTime) {
        this.giftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 3;
        this.giftInfo.getChild("lbSellTime").text = "本店已打烊，请在营业时间售卖";
      } else {
        this.giftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 0;
        this.giftInfo.getChild("lbSellTime").text = "";
      }
    }
    var e = this.getBoxMakeRemainCount();
    e <= 0 && (this.giftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 4);
    this.giftInfo.getChild("lbMakeCount").text = "可制作：<color=#ff0000>" + e + "</c>/" + r_SnackRoomFullCfg.SnackRoomFullCfg.dayPlayCount + "次";
    this.btnStartMake.getChild("money").text = "" + r_UtilsSystem.UtilsSystem.getShowCoin(r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyBox).replace("元", "");
    this.btnStartMake.getController("c1").selectedIndex = 0;
    !r_PlayerData.PlayerData.isCoinEnough(r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyBox) && r_PlayerData.PlayerData.data.snackRoomFull.isGuide && (this.btnStartMake.getController("c1").selectedIndex = 1);
  };
  _ctor.prototype.setHighGiftInfo = function () {
    this.highGiftInfo.getChild("name").text = C[r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade - 1];
    this.highGiftInfo.getChild("giftIcon").asLoader.url = "ui://SnackRoomFull/lh" + (3 + r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade);
    this.highGiftInfo.getChild("start").asCom.getController("c1").selectedIndex = r_PlayerData.PlayerData.data.snackRoomFull.highGiftStar;
    this.highGiftInfo.getChild("money").text = r_UtilsSystem.UtilsSystem.getShowCoin(this.getHighGiftExpectCoin()).replace("元", "");
    if (this.sellHighGiftTime > 0) {
      if (r_PlayerData.PlayerData.data.snackRoomFull.isHighCanSell) {
        this.highGiftInfo.getChild("lbSellTime").text = "";
      } else {
        this.highGiftInfo.getChild("lbSellTime").text = "销售时间 " + r_UtilsSystem.UtilsSystem.getTime(this.sellHighGiftTime);
      }
    } else {
      this.highGiftInfo.getChild("lbSellTime").text = "";
    }
    this.highGiftInfo.getChild("tips").visible = false;
    r_PlayerData.PlayerData.data.snackRoomFull.highStartSellTime && this.onClickHighGet();
    if (r_PlayerData.PlayerData.data.snackRoomFull.highStartSellTime) {
      if (this.sellHighGiftTime > 0) {
        this.highGiftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 1;
        r_PlayerData.PlayerData.data.snackRoomFull.isHighCanSell && (this.highGiftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 2);
      } else {
        this.highGiftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 2;
      }
    } else {
      this.highGiftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 0;
      if (3 == r_PlayerData.PlayerData.data.snackRoomFull.giftGrade && 3 == r_PlayerData.PlayerData.data.snackRoomFull.giftStar) {
        this.btnHighStartMake.getController("c1").selectedIndex = 0;
        this.btnHighStartMake.getChild("money").text = "" + r_UtilsSystem.UtilsSystem.getShowCoin(r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyHighBox).replace("元", "");
        this.highGiftInfo.getChild("tips").visible = false;
        r_PlayerData.PlayerData.isCoinEnough(r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyHighBox) || (this.btnHighStartMake.getController("c1").selectedIndex = 1);
      } else {
        this.btnHighStartMake.getController("c1").selectedIndex = 1;
        this.highGiftInfo.getChild("tips").visible = true;
      }
    }
    if (!this.isWorking()) {
      if (r_PlayerData.PlayerData.data.snackRoomFull.highStartSellTime) {
        this.highGiftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 3;
        this.highGiftInfo.getChild("lbSellTime").text = "本店已打烊，请在营业时间售卖";
      } else {
        this.highGiftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 0;
        this.highGiftInfo.getChild("lbSellTime").text = "";
      }
    }
    var e = this.getHighBoxMakeRemainCount();
    e <= 0 && (this.highGiftInfo.getChild("btnGroup").asCom.getController("c1").selectedIndex = 4);
    this.highGiftInfo.getChild("lbMakeCount").text = "可制作：<color=#ff0000>" + e + "</c>/" + r_SnackRoomFullCfg.SnackRoomFullCfg.dayPlayCount + "次";
    this.highGiftInfo.getChild("lbMakeCount").visible = !this.highGiftInfo.getChild("tips").visible;
  };
  _ctor.prototype.onClickUpGift = function () {
    if (r_PlayerData.PlayerData.data.snackRoomFull.giftStar >= 3) {
      r_PlayerData.PlayerData.data.snackRoomFull.giftGrade += 1;
      if (r_PlayerData.PlayerData.data.snackRoomFull.giftGrade > 3) {
        r_PlayerData.PlayerData.data.snackRoomFull.giftGrade = 3;
        r_UtilsSystem.UtilsSystem.showTip("礼盒已满级");
      } else {
        r_PlayerData.PlayerData.data.snackRoomFull.giftStar = 0;
        this.setGiftInfo();
      }
      r_PlayerData.PlayerData.saveData();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("需要达到三星才可以升级礼盒");
    }
  };
  _ctor.prototype.onClickStartMake = function () {
    if (r_PlayerData.PlayerData.data.snackRoomFull.isGuide) {
      if (r_PlayerData.PlayerData.isCoinEnough(r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyBox)) {
        r_PlayerData.PlayerData.deleteCoin("零食满屋", r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyBox, r_ReportSystem.SystemKey.零食满屋, false);
        r_SnackPlacementUI.SnackPlacementUI.showUI(1);
        r_PlayerData.PlayerData.data.snackRoomFull.boxCreateCount += 1;
        r_PlayerData.PlayerData.data.snackRoomFull.boxCreateTime = r_TimeSystem.TimeSystem.getServerTime();
        r_PlayerData.PlayerData.saveData();
      } else {
        r_PlatformSystem.PlatformSystem.showVideo("零食满屋普通礼盒", function () {
          r_SnackPlacementUI.SnackPlacementUI.showUI(1);
          r_PlayerData.PlayerData.data.snackRoomFull.boxCreateCount += 1;
          r_PlayerData.PlayerData.data.snackRoomFull.boxCreateTime = r_TimeSystem.TimeSystem.getServerTime();
          r_PlayerData.PlayerData.saveData();
        });
      }
    } else {
      r_SnackGuideUI.SnackGuideUI.Inst && r_SnackGuideUI.SnackGuideUI.Inst.finishStep(2);
      r_SnackPlacementUI.SnackPlacementUI.showUI(1);
    }
  };
  _ctor.prototype.onClickAddSpeed = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("零食满屋加速销售", function () {
      r_PlayerData.PlayerData.data.snackRoomFull.isCanSell = 1;
      e.setGiftInfo();
      r_PlayerData.PlayerData.saveData();
    });
  };
  _ctor.prototype.onClickGet = function () {
    var e = r_PlayerData.PlayerData.data.snackRoomFull.rewardMoney;
    r_PlayerData.PlayerData.data.snackRoomFull.isCanSell = 0;
    r_PlayerData.PlayerData.data.snackRoomFull.startSellTime = 0;
    r_PlayerData.PlayerData.data.snackRoomFull.expendTime = 0;
    r_PlayerData.PlayerData.data.snackRoomFull.rewardMoney = 0;
    r_PlayerData.PlayerData.addCoin("零食满屋", e, r_ReportSystem.SystemKey.零食满屋, false);
  };
  _ctor.prototype.onClicWaitSell = function () {
    r_PlatformSystem.PlatformSystem.showVideo("零食满屋直接卖出", function () {
      var e = r_PlayerData.PlayerData.data.snackRoomFull.rewardMoney;
      r_PlayerData.PlayerData.data.snackRoomFull.isCanSell = 0;
      r_PlayerData.PlayerData.data.snackRoomFull.startSellTime = 0;
      r_PlayerData.PlayerData.data.snackRoomFull.expendTime = 0;
      r_PlayerData.PlayerData.data.snackRoomFull.rewardMoney = 0;
      r_PlayerData.PlayerData.addCoin("零食满屋", e, r_ReportSystem.SystemKey.零食满屋, false);
    });
  };
  _ctor.prototype.onClicAddCount = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("零食满屋补充次数", function () {
      r_PlayerData.PlayerData.data.snackRoomFull.boxCreateCount = 0;
      r_PlayerData.PlayerData.saveData();
      e.refreshUi();
    });
  };
  _ctor.prototype.onClickHighUpGift = function () {
    if (r_PlayerData.PlayerData.data.snackRoomFull.highGiftStar >= 3) {
      r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade += 1;
      if (r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade > 3) {
        r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade = 3;
        r_UtilsSystem.UtilsSystem.showTip("礼盒已满级");
      } else {
        r_PlayerData.PlayerData.data.snackRoomFull.highGiftStar = 0;
        this.setHighGiftInfo();
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("需要达到三星才可以升级礼盒");
    }
  };
  _ctor.prototype.onClickHighStartMake = function () {
    if (3 == r_PlayerData.PlayerData.data.snackRoomFull.giftGrade && 3 == r_PlayerData.PlayerData.data.snackRoomFull.giftStar && r_PlayerData.PlayerData.isCoinEnough(r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyHighBox)) {
      r_PlayerData.PlayerData.deleteCoin("零食满屋", r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyHighBox, r_ReportSystem.SystemKey.零食满屋, false);
      r_SnackPlacementUI.SnackPlacementUI.showUI(2);
      r_PlayerData.PlayerData.data.snackRoomFull.highBoxCreateCount += 1;
      r_PlayerData.PlayerData.data.snackRoomFull.highBoxCreateTime = r_TimeSystem.TimeSystem.getServerTime();
      r_PlayerData.PlayerData.saveData();
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("零食满屋定制礼盒", function () {
        r_SnackPlacementUI.SnackPlacementUI.showUI(2);
      });
    }
  };
  _ctor.prototype.onClickHighAddSpeed = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("零食满屋加速销售", function () {
      r_PlayerData.PlayerData.data.snackRoomFull.isHighCanSell = 1;
      e.setHighGiftInfo();
      r_PlayerData.PlayerData.saveData();
    });
  };
  _ctor.prototype.onClickHighGet = function () {
    var e = r_PlayerData.PlayerData.data.snackRoomFull.highRewardMoney;
    r_PlayerData.PlayerData.data.snackRoomFull.isHighCanSell = 0;
    r_PlayerData.PlayerData.data.snackRoomFull.highStartSellTime = 0;
    r_PlayerData.PlayerData.data.snackRoomFull.highExpendTime = 0;
    r_PlayerData.PlayerData.data.snackRoomFull.highRewardMoney = 0;
    r_PlayerData.PlayerData.addCoin("零食满屋", e, r_ReportSystem.SystemKey.零食满屋, false);
  };
  _ctor.prototype.onClickHighWaitSell = function () {
    r_PlatformSystem.PlatformSystem.showVideo("零食满屋直接卖出", function () {
      var e = r_PlayerData.PlayerData.data.snackRoomFull.highRewardMoney;
      r_PlayerData.PlayerData.data.snackRoomFull.isHighCanSell = 0;
      r_PlayerData.PlayerData.data.snackRoomFull.highStartSellTime = 0;
      r_PlayerData.PlayerData.data.snackRoomFull.highExpendTime = 0;
      r_PlayerData.PlayerData.data.snackRoomFull.highRewardMoney = 0;
      r_PlayerData.PlayerData.addCoin("零食满屋", e, r_ReportSystem.SystemKey.零食满屋, false);
    });
  };
  _ctor.prototype.onClickHighAddCount = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("零食满屋补充次数", function () {
      r_PlayerData.PlayerData.data.snackRoomFull.highBoxCreateCount = 0;
      r_PlayerData.PlayerData.saveData();
      e.refreshUi();
    });
  };
  _ctor.prototype.getBoxMakeRemainCount = function () {
    var e = r_SnackRoomFullCfg.SnackRoomFullCfg.dayPlayCount - r_PlayerData.PlayerData.data.snackRoomFull.boxCreateCount;
    e <= 0 && (e = 0);
    return e;
  };
  _ctor.prototype.getHighBoxMakeRemainCount = function () {
    var e = r_SnackRoomFullCfg.SnackRoomFullCfg.dayPlayCount - r_PlayerData.PlayerData.data.snackRoomFull.highBoxCreateCount;
    e <= 0 && (e = 0);
    return e;
  };
  _ctor.prototype.refreshUseTime = function () {
    if (r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.snackRoomFull.boxCreateTime)) {
      r_PlayerData.PlayerData.data.snackRoomFull.boxCreateCount = 0;
      r_PlayerData.PlayerData.data.snackRoomFull.boxCreateTime = 0;
    }
    if (r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.snackRoomFull.highBoxCreateTime)) {
      r_PlayerData.PlayerData.data.snackRoomFull.highBoxCreateCount = 0;
      r_PlayerData.PlayerData.data.snackRoomFull.highBoxCreateTime = 0;
    }
  };
  _ctor.prototype.onClose = function () {
    _ctor.hide();
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("giftInfo")], _ctor.prototype, "giftInfo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("giftInfo/btnUpGift")], _ctor.prototype, "btnUpGift", undefined);
  __decorate([r_DecorateFunction1.AutoFind("giftInfo/btnGroup/btnStartMake")], _ctor.prototype, "btnStartMake", undefined);
  __decorate([r_DecorateFunction1.AutoFind("giftInfo/btnGroup/btnAddSpeed")], _ctor.prototype, "btnAddSpeed", undefined);
  __decorate([r_DecorateFunction1.AutoFind("giftInfo/btnGroup/btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("giftInfo/btnGroup/btnWaitSell")], _ctor.prototype, "btnWaitSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("giftInfo/btnGroup/btnAddCount")], _ctor.prototype, "btnAddCount", undefined);
  __decorate([r_DecorateFunction1.AutoFind("highGiftInfo")], _ctor.prototype, "highGiftInfo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("highGiftInfo/btnUpGift")], _ctor.prototype, "btnHighUpGift", undefined);
  __decorate([r_DecorateFunction1.AutoFind("highGiftInfo/btnGroup/btnStartMake")], _ctor.prototype, "btnHighStartMake", undefined);
  __decorate([r_DecorateFunction1.AutoFind("highGiftInfo/btnGroup/btnAddSpeed")], _ctor.prototype, "btnHighAddSpeed", undefined);
  __decorate([r_DecorateFunction1.AutoFind("highGiftInfo/btnGroup/btnGet")], _ctor.prototype, "btnHighGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("highGiftInfo/btnGroup/btnWaitSell")], _ctor.prototype, "btnHighWaitSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("highGiftInfo/btnGroup/btnAddCount")], _ctor.prototype, "btnHightAddCount", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.SnackMakeSelectUI = exp_SnackMakeSelectUI;