var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HuntCaidanResult = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_ResSystem = require("ResSystem");
var r_SoundMgr = require("SoundMgr");
var r_TimeSystem = require("TimeSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_HuntCaidanUI = require("HuntCaidanUI");
var r_MainUI = require("MainUI");
var exp_HuntCaidanResult = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Hunt, r_UIDef.UIDef.Res.UI.HuntCaidanResult) || this;
    t.isGet = false;
    t.useCoin = 0;
    t.m_clickCount = 0;
    t.m_time = 0;
    t.m_roleSpine = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HuntCaidanResult, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HuntCaidanResult);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnPay.onClick(this.onClickPay, this);
    this.btnFree.onClick(this.onClickFree, this);
    this.btnGet.onClick(this.onClickGet, this);
    this.btnDouble.onClick(this.onClickDouble, this);
    this.btnGetMoney.onClick(this.onClickGetMoney, this);
    this.btnTakeAway.onClick(this.onClickTakeAway, this);
    this.btnAll.onClick(this.onClickAll, this);
    r_ResSystem.ResSystem.loadBundleRes("game5", "hunt/美女", cc.Prefab, function (e, o) {
      if (o) {
        t.role.node.removeAllChildren();
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.role.node.addChild(i);
        i.getComponent(sp.Skeleton).setAnimation(0, "idle_8", true);
        t.m_roleSpine = i.getComponent(sp.Skeleton);
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.isGet = false;
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    if (this.data && this.data.mode) {
      this.contentPane.getController("c1").selectedIndex = 1;
      this.m_roleSpine && this.m_roleSpine.setAnimation(0, "idle_8", true);
      this.showQipaoContent(this.qipao, "谢谢你救了我，这1亿作为答谢");
      r_SoundMgr.SoundMgr.playSound("hunt/谢谢你救了我");
      this.registHairTouch();
      if (r_TYIndex.Platform.isMiniPlatform()) {
        r_PlayerData.PlayerData.data.huntMap.caidan1 = 1;
        r_PlayerData.PlayerData.saveData();
      }
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
      if (r_PlayerData.PlayerData.isCoinEnough(5e7)) {
        this.useCoin = 5e7;
        r_PlayerData.PlayerData.deleteCoin("狩猎", this.useCoin, r_ReportSystem.SystemKey.None, true);
      } else {
        this.useCoin = r_PlayerData.PlayerData.bigCoin;
        r_PlayerData.PlayerData.deleteCoin("狩猎", this.useCoin, r_ReportSystem.SystemKey.None, true);
      }
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.registHairTouch = function () {
    var e = this;
    var t = null;
    this.role.off(fgui.Event.TOUCH_BEGIN);
    this.role.on(fgui.Event.TOUCH_BEGIN, function (o) {
      t = o.pos;
      o.captureTouch();
      e.m_clickCount += 1;
      var i = new Date().getTime();
      e.m_time || (e.m_time = i);
      if (i - e.m_time > 1e3) {
        e.m_clickCount = 0;
        e.m_time = i;
      } else if (e.m_clickCount >= 5) {
        e.role.off(fgui.Event.TOUCH_BEGIN);
        e.role.off(fgui.Event.TOUCH_MOVE);
        e.role.off(fgui.Event.TOUCH_END);
        e.contentPane.getController("c1").selectedIndex = 2;
        e.m_roleSpine.setAnimation(0, "idle_8_1", true);
        e.showQipaoContent(e.qipao, "你这样是要我以身相许吗");
        r_SoundMgr.SoundMgr.playSound("hunt/那只好以身相许啦");
      }
    }, this);
    this.role.off(fgui.Event.TOUCH_MOVE);
    this.role.on(fgui.Event.TOUCH_MOVE, function (e) {
      var o = e.pos.subtract(t);
      t.add(o);
    }, this);
    this.role.off(fgui.Event.TOUCH_END);
    this.role.on(fgui.Event.TOUCH_END, function () {}, this);
    if (r_PlayerData.PlayerData.data.huntMap.caidan1) {
      this.role.off(fgui.Event.TOUCH_BEGIN);
      this.role.off(fgui.Event.TOUCH_MOVE);
      this.role.off(fgui.Event.TOUCH_END);
    }
  };
  _ctor.prototype.onClickClose = function () {
    this.hide();
    r_HuntCaidanUI.HuntCaidanUI.Inst && r_HuntCaidanUI.HuntCaidanUI.Inst.onClickBack();
  };
  _ctor.prototype.onClickPay = function () {
    r_UtilsSystem.UtilsSystem.showTip("使用金币:" + r_UtilsSystem.UtilsSystem.getShowCoin(this.useCoin));
    this.onClickClose();
  };
  _ctor.prototype.onClickFree = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("狩猎免罚", function () {
      r_PlayerData.PlayerData.addCoin("狩猎", e.useCoin, r_ReportSystem.SystemKey.None, false);
      r_UtilsSystem.UtilsSystem.showTip("免除此次处罚");
      e.onClickClose();
    });
  };
  _ctor.prototype.onClickGet = function () {
    var e = this;
    if (!this.isGet) {
      this.isGet = true;
      r_PlayerData.PlayerData.addCoin("狩猎", 1e8, r_ReportSystem.SystemKey.None, true, true);
      r_TimeSystem.TimeSystem.scheduleOnce("huodejinbiSound", .2, function () {
        e.hide();
        r_HuntCaidanUI.HuntCaidanUI.hide();
        r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.VillageScene && r_MainUI.MainUI.Inst.VillageScene.refreshBtn();
      });
    }
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    this.isGet || r_PlatformSystem.PlatformSystem.showVideo("狩猎彩蛋双倍领取", function () {
      e.isGet = true;
      r_PlayerData.PlayerData.addCoin("狩猎", 2e8, r_ReportSystem.SystemKey.None, true, true);
      r_TimeSystem.TimeSystem.scheduleOnce("huodejinbiSound", .2, function () {
        e.hide();
        r_HuntCaidanUI.HuntCaidanUI.hide();
        r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.VillageScene && r_MainUI.MainUI.Inst.VillageScene.refreshBtn();
      });
    });
  };
  _ctor.prototype.onClickGetMoney = function () {
    r_PlayerData.PlayerData.addCoin("狩猎彩蛋", 1e8);
    this.hide();
    r_HuntCaidanUI.HuntCaidanUI.hide();
    r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.VillageScene && r_MainUI.MainUI.Inst.VillageScene.refreshBtn();
  };
  _ctor.prototype.onClickTakeAway = function () {
    -1 == r_PlayerData.PlayerData.data.baomuList.indexOf(4) && r_PlayerData.PlayerData.data.baomuList.push(4);
    r_TimeSystem.TimeSystem.scheduleOnce("caidanReward", 1, function () {
      r_UtilsSystem.UtilsSystem.showTip("恭喜你招聘老板娘，请前往卧室查看");
    });
    this.hide();
    r_HuntCaidanUI.HuntCaidanUI.hide();
    r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.VillageScene && r_MainUI.MainUI.Inst.VillageScene.refreshBtn();
  };
  _ctor.prototype.onClickAll = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("狩猎彩蛋全都要", function () {
      r_PlayerData.PlayerData.addCoin("狩猎彩蛋", 1e8);
      -1 == r_PlayerData.PlayerData.data.baomuList.indexOf(4) && r_PlayerData.PlayerData.data.baomuList.push(4);
      r_TimeSystem.TimeSystem.scheduleOnce("caidanReward", 1, function () {
        r_UtilsSystem.UtilsSystem.showTip("恭喜你招聘老板娘，请前往卧室查看");
      });
      e.hide();
      r_HuntCaidanUI.HuntCaidanUI.hide();
      r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.VillageScene && r_MainUI.MainUI.Inst.VillageScene.refreshBtn();
    });
  };
  _ctor.prototype.showQipaoContent = function (e, t) {
    e.visible = true;
    e.getChild("content").text = t;
  };
  __decorate([r_DecorateFunction1.AutoFind("btnPay")], _ctor.prototype, "btnPay", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFree")], _ctor.prototype, "btnFree", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGetMoney")], _ctor.prototype, "btnGetMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTakeAway")], _ctor.prototype, "btnTakeAway", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAll")], _ctor.prototype, "btnAll", undefined);
  __decorate([r_DecorateFunction1.AutoFind("loseImage")], _ctor.prototype, "loseImage", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  __decorate([r_DecorateFunction1.AutoFind("qipao")], _ctor.prototype, "qipao", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.HuntCaidanResult = exp_HuntCaidanResult;