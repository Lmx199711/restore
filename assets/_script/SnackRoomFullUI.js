var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnackRoomFullUI = undefined;
var s;
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SnackRoomFullCfg = require("SnackRoomFullCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_SnackLimitUI = require("SnackLimitUI");
var r_SnackMarkUI = require("SnackMarkUI");
var r_SnackRuleUI = require("SnackRuleUI");
var r_SnackSelfSelectUI = require("SnackSelfSelectUI");
(function (e) {
  e[e["未解锁"] = 0] = "未解锁";
  e[e["可以制作"] = 1] = "可以制作";
  e[e["销售中"] = 2] = "销售中";
  e[e["可以销售"] = 3] = "可以销售";
})(s || (s = {}));
var exp_SnackRoomFullUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SnackRoomFull, r_UIDef.UIDef.Res.UI.SnackRoomFullUI) || this;
    t.curBubble = 0;
    t.giftItemList = [];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SnackRoomFullUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SnackRoomFullUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClose, this);
    this.btnRule.onClick(this.onClickRule, this);
    this.btnSelfGift.onClick(this.onClickSelfGift, this);
    var o = function (e) {
      i.giftItemList.push(i.contentPane.getChild("giftItem" + e));
      i.contentPane.getChild("giftItem" + e).clearClick();
      i.contentPane.getChild("giftItem" + e).onClick(function () {
        t.onClickGift(e);
      }, i);
    };
    var i = this;
    for (var n = 1; n <= 6; n++) {
      o(n);
    }
    this.initRolePos = new cc.Vec2(this.role.x, this.role.y);
    r_ResSystem.ResSystem.loadBundleRes("game1", "snackRoomFull/gamePrefab", cc.Prefab, function () {});
    r_ResSystem.ResSystem.loadBundleRes("game1", "snackRoomFull/employeeAnim", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.role.node.addChild(i);
      t.role.node.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "animation", true);
    });
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.bubble.node.scale = 0;
    this.role.node.opacity = 255;
    this.initData();
    if (r_PlayerData.PlayerData.data.snackRoomFull.unLock) {
      this.showBubble();
    } else {
      r_TimeSystem.TimeSystem.scheduleOnce("SnackLimitUI", .2, function () {
        r_SnackLimitUI.SnackLimitUI.showUI();
      });
    }
    this.refreshGiftState();
    this.registRoleTouch();
    r_TimeSystem.TimeSystem.unregistSecondUpdate("SnackRoomFullUI");
    r_TimeSystem.TimeSystem.registSecondUpdate("SnackRoomFullUI", function () {
      t.refreshGiftState();
    });
  };
  _ctor.prototype.initData = function () {
    if (r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo.length <= 0) {
      for (var e = 1; e <= 6; e++) {
        var t = {};
        t.id = e;
        t.time = 0;
        t.rewardMoney = 0;
        t.lock = 0;
        t.star = 0;
        t.state = 0;
        if (1 == e) {
          t.lock = 1;
          t.state = 1;
        }
        r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo.push(t);
      }
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("SnackRoomFullUI");
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.showBubble = function () {
    this.showRoleAnim();
    this.showSayCom("欢迎光临~");
  };
  _ctor.prototype.refreshGiftState = function () {
    for (var e = 0; e < r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo.length; e++) {
      if (r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[e].lock) {
        this.giftItemList[e].getController("c2").selectedIndex = 1;
        if (r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[e].rewardMoney > 0) {
          var t = r_SnackRoomFullCfg.SnackRoomFullCfg.sellTime - (r_TimeSystem.TimeSystem.getServerTime() - r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[e].time);
          if (t <= 0) {
            r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[e].state = s.可以销售;
            this.giftItemList[e].getController("c1").selectedIndex = 2;
          } else {
            this.giftItemList[e].getController("c1").selectedIndex = 1;
            r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[e].state = s.销售中;
            this.giftItemList[e].getChild("green").asImage.fillAmount = t / r_SnackRoomFullCfg.SnackRoomFullCfg.sellTime;
          }
          this.giftItemList[e].getChild("labMoney").asTextField.text = r_UtilsSystem.UtilsSystem.numFormats(r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[e].rewardMoney, 1);
          this.giftItemList[e].getChild("labTime").asTextField.text = r_UtilsSystem.UtilsSystem.getTime(t);
        } else {
          this.giftItemList[e].getController("c1").selectedIndex = 0 == e ? 3 : 0;
          if (r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[e].id <= 3) {
            this.giftItemList[e].getChild("labPay").asTextField.text = r_UtilsSystem.UtilsSystem.numFormats(r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyBox, 1);
          } else {
            this.giftItemList[e].getChild("labPay").asTextField.text = r_UtilsSystem.UtilsSystem.numFormats(r_SnackRoomFullCfg.SnackRoomFullCfg.payMoneyHighBox, 1);
          }
          r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[e].state = s.可以制作;
        }
      } else {
        this.giftItemList[e].getController("c2").selectedIndex = 0;
      }
      this.giftItemList[e].getChild("star").getController("c1").selectedIndex = r_PlayerData.PlayerData.data.snackRoomFull.boxCreateInfo[e].star;
      this.giftItemList[e].getChild("picItem").asLoader.url = "ui://SnackRoomFull/lh" + (e + 1);
    }
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
  _ctor.prototype.onClickGift = function (e) {
    var t = this;
    var o = this.getGiftInfoByIndex(e);
    if (o.state == s.未解锁) {
      r_UtilsSystem.UtilsSystem.showAlert("当前礼盒解锁，需前一个礼盒达到3星，确认是否解锁", 2, function () {
        t.setLockGift(e);
        t.refreshGiftState();
      }, this, "提示", "解锁", "取消");
    } else if (o.state == s.可以制作) {
      r_SnackMarkUI.SnackMarkUI.showUI({
        index: e
      });
    } else if (o.state == s.销售中) {
      r_UtilsSystem.UtilsSystem.showAlert("是否加速销售？", 2, function () {
        t.getGiftInfoByIndex(e).time -= r_SnackRoomFullCfg.SnackRoomFullCfg.sellTime;
        r_PlayerData.PlayerData.saveData();
        t.refreshGiftState();
      }, this, "提示", "是", "否");
    } else if (o.state == s.可以销售) {
      r_PlayerData.PlayerData.addCoin("零食满屋", o.rewardMoney);
      this.getGiftInfoByIndex(e).time = 0;
      this.getGiftInfoByIndex(e).rewardMoney = 0;
      this.getGiftInfoByIndex(e).state = 1;
      r_PlayerData.PlayerData.saveData();
      this.refreshGiftState();
    }
  };
  _ctor.prototype.registRoleTouch = function () {
    var e = this;
    this.role.x = this.initRolePos.x;
    var t = null;
    this.role.off(fgui.Event.TOUCH_BEGIN);
    this.role.on(fgui.Event.TOUCH_BEGIN, function (e) {
      t = e.pos;
      e.captureTouch();
    }, this);
    this.role.off(fgui.Event.TOUCH_MOVE);
    this.role.on(fgui.Event.TOUCH_MOVE, function (o) {
      var i = o.pos.subtract(t);
      var n = t.add(i);
      var a = e.contentPane.globalToLocal(n.x, n.y);
      e.role.x = a.x;
    }, this);
    this.role.off(fgui.Event.TOUCH_END);
    this.role.on(fgui.Event.TOUCH_END, function () {
      if (Math.sqrt(Math.pow(e.role.x - e.initRolePos.x, 2) + Math.pow(e.role.y - e.initRolePos.y, 2)) > 200) {
        e.role.off(fgui.Event.TOUCH_BEGIN);
        e.role.off(fgui.Event.TOUCH_MOVE);
        e.role.off(fgui.Event.TOUCH_END);
      } else {
        cc.tween(e.role).to(.1, {
          x: e.initRolePos.x
        }).start();
      }
    }, this);
  };
  _ctor.prototype.onClickRule = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    r_SnackRuleUI.SnackRuleUI.showUI();
  };
  _ctor.prototype.onClickSelfGift = function () {
    r_SnackSelfSelectUI.SnackSelfSelectUI.showUI();
  };
  _ctor.prototype.showSayCom = function (e) {
    if ("" != e) {
      this.bubble.visible = true;
      cc.Tween.stopAllByTarget(this.bubble.node);
      this.bubble.getChild("content").text = e;
      this.bubble.node.scale = 1;
      cc.tween(this.bubble.node).delay(3).to(.5, {
        scale: 0
      }).start();
    }
  };
  _ctor.prototype.showRoleAnim = function () {
    this.role.node.getChildByName("anim") && this.role.node.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "animation", true);
  };
  _ctor.prototype.onClose = function () {
    _ref__ctor.hide();
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRule")], _ctor.prototype, "btnRule", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble")], _ctor.prototype, "bubble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSelfGift")], _ctor.prototype, "btnSelfGift", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.SnackRoomFullUI = exp_SnackRoomFullUI;