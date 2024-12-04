var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackSelfSelectUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SnackPlacementUI = require("SnackPlacementUI");
var y = ["初级礼盒", "中级礼盒", "高级礼盒", "空心礼盒", "菱形礼盒", "爱心礼盒"];
var exp_SnackSelfSelectUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackSelfSelectUI) || this;
    t.curGift = 1;
    t.snackTypeList = [];
    t.curSelectGiftCount = 0;
    t.curSelectSnackCount = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackSelfSelectUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackSelfSelectUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.hide, this);
    this.btnMake.onClick(this.onClickMake, this);
    var o = function (e) {
      i.contentPane.getChild("selfBoxItem" + e).asCom.getChild("pic").asLoader.url = "ui://SnackRoomFull/lh" + e;
      i.contentPane.getChild("selfBoxItem" + e).asCom.getChild("labName").text = y[e - 1];
      i.contentPane.getChild("selfBoxItem" + e).clearClick();
      i.contentPane.getChild("selfBoxItem" + e).onClick(function () {
        t.selectBox(e);
      }, i);
    };
    var i = this;
    for (var n = 1; n <= 6; n++) {
      o(n);
    }
    var a = function (e) {
      r_ResSystem.ResSystem.loadBundleFguiImg(s.contentPane.getChild("seleSnackItem" + e).asCom.getChild("pic"), "game1", "snackRoomFull/icon/wp" + e);
      s.contentPane.getChild("seleSnackItem" + e).clearClick();
      s.contentPane.getChild("seleSnackItem" + e).onClick(function () {
        t.selectSnack(e);
      }, s);
    };
    var s = this;
    for (n = 1; n <= 15; n++) {
      a(n);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.curGift = 1;
    this.snackTypeList = [];
    this.curSelectGiftCount = 0;
    this.curSelectSnackCount = 0;
    this.initUI();
    if (r_PlayerData.PlayerData.data.snackRoomFull.isCandan) {
      this.btnMake.getController("video").selectedIndex = 1;
    } else {
      this.btnMake.getController("video").selectedIndex = 0;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.initUI = function () {
    for (var e = 1; e <= 6; e++) {
      this.contentPane.getChild("selfBoxItem" + e).asCom.getController("c1").selectedIndex = 0;
      if (this.getGiftInfoByIndex(e).lock) {
        this.contentPane.getChild("selfBoxItem" + e).asCom.getController("c2").selectedIndex = 1;
      } else {
        this.contentPane.getChild("selfBoxItem" + e).asCom.getController("c2").selectedIndex = 0;
      }
    }
    for (e = 1; e <= 15; e++) {
      this.contentPane.getChild("seleSnackItem" + e).asCom.getController("c1").selectedIndex = 0;
    }
    this.lbGiftCount.text = this.curSelectSnackCount + "/1";
    this.lbSnackCount.text = this.curSelectGiftCount + "/6";
  };
  _ctor.prototype.getGiftInfoByIndex = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo.length; t++) {
      if (r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[t].id == e) {
        return r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[t];
      }
    }
    return r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[0];
  };
  _ctor.prototype.setLockGift = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo.length; t++) {
      if (r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[t].id == e) {
        return r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[t].lock = 1;
      }
    }
  };
  _ctor.prototype.selectBox = function (e) {
    var t = this;
    if (this.getGiftInfoByIndex(e).lock) {
      if (this.getGiftInfoByIndex(e).rewardMoney > 0) {
        r_UtilsSystem.UtilsSystem.showTip("当前礼盒销售中，请先领取桌面礼盒奖励");
      } else {
        for (var o = 1; o <= 6; o++) {
          if (e == o) {
            if (1 == this.contentPane.getChild("selfBoxItem" + o).asCom.getController("c1").selectedIndex) {
              this.contentPane.getChild("selfBoxItem" + o).asCom.getController("c1").selectedIndex = 0;
              this.curSelectSnackCount = 0;
            } else {
              this.contentPane.getChild("selfBoxItem" + o).asCom.getController("c1").selectedIndex = 1;
              this.curSelectSnackCount = 1;
              this.curGift = e;
            }
          } else {
            this.contentPane.getChild("selfBoxItem" + o).asCom.getController("c1").selectedIndex = 0;
          }
        }
        this.lbGiftCount.text = this.curSelectSnackCount + "/1";
      }
    } else {
      r_UtilsSystem.UtilsSystem.showAlert("当前礼盒解锁，需前一个礼盒达到3星，确认是否解锁", 2, function () {
        t.setLockGift(e);
        t.contentPane.getChild("selfBoxItem" + e).asCom.getController("c2").selectedIndex = 1;
      }, this, "提示", "解锁", "取消");
    }
  };
  _ctor.prototype.selectSnack = function (e) {
    for (var t = 1; t <= 15; t++) {
      if (e == t) {
        if (1 == this.contentPane.getChild("seleSnackItem" + t).asCom.getController("c1").selectedIndex) {
          this.contentPane.getChild("seleSnackItem" + t).asCom.getController("c1").selectedIndex = 0;
          this.curSelectGiftCount -= 1;
          -1 != this.snackTypeList.indexOf(e) && this.snackTypeList.splice(this.snackTypeList.indexOf(e), 1);
        } else {
          if (this.curSelectGiftCount >= 6) {
            return void r_UtilsSystem.UtilsSystem.showTip("超过上限！");
          }
          this.contentPane.getChild("seleSnackItem" + t).asCom.getController("c1").selectedIndex = 1;
          this.curSelectGiftCount += 1;
          this.snackTypeList.push(e);
        }
      }
    }
    this.lbSnackCount.text = this.curSelectGiftCount + "/6";
  };
  _ctor.prototype.onClickMake = function () {
    var e = this;
    r_PlayerData.PlayerData.data.snackRoomFull.isCandan = 1;
    if (this.curSelectGiftCount <= 0) {
      r_UtilsSystem.UtilsSystem.showTip("请选择零食");
    } else if (this.curSelectSnackCount <= 0) {
      r_UtilsSystem.UtilsSystem.showTip("请选择礼盒");
    } else {
      var t = function () {
        e.hide();
        if (e.curGift <= 3) {
          r_PlayerData.PlayerData.data.snackRoomFull.giftGrade = e.curGift;
          r_SnackPlacementUI.SnackPlacementUI.showUI({
            index: 1,
            snackType: e.snackTypeList
          });
        } else {
          r_PlayerData.PlayerData.data.snackRoomFull.highGiftGrade = e.curGift - 3;
          r_SnackPlacementUI.SnackPlacementUI.showUI({
            index: 2,
            snackType: e.snackTypeList
          });
        }
      };
      if (1 == this.btnMake.getController("video").selectedIndex) {
        r_PlatformSystem.PlatformSystem.showVideo("零食满屋自定义", function () {
          t();
        });
      } else {
        t();
      }
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnMake")], _ctor.prototype, "btnMake", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbGiftCount")], _ctor.prototype, "lbGiftCount", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbSnackCount")], _ctor.prototype, "lbSnackCount", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.SnackSelfSelectUI = exp_SnackSelfSelectUI;