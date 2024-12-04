var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_AnimSystem = require("AnimSystem");
var r_CaidanSystem = require("CaidanSystem");
var r_DebugSystem = require("DebugSystem");
var r_FguiGestureSys = require("FguiGestureSys");
var r_PlayerData = require("PlayerData");
var r_PoolSystem = require("PoolSystem");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_ShenronSystem = require("ShenronSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_EraseCom = require("EraseCom");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_ShenronUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery2, r_UIDef.UIDef.Res.UI.ShenronUI) || this;
    t.showAnimFlag = false;
    t.m_looteryNum = null;
    t.isTouch = false;
    t.continueNum = 0;
    t.m_timeId = 0;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ShenronUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ShenronUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.Qianqian, "ui://Lottery2/qianqian", 1, this.contentPane);
    this.contentPane.visible = false;
    this.bindBtnCallback(this.btnAgain);
    this.btnAgain.getChild("num").text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyShenronCoin);
    r_CaidanSystem.CaidanSystem.bindBtn("shenron", this.btnTip, "shenronCaidanVideo");
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/shenron", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.contentPane.visible = true;
      t.restart();
    });
    this.btnAgain.visible = false;
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("shulinsaniao", this.animJg, this.animJg, this.shulin, this.hitSucc0.bind(this));
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("maofangsaniao", this.animJg, this.animJg, this.maofang, this.hitSucc1.bind(this));
  };
  _ctor.prototype.onClickbtnAgain = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyShenronCoin)) {
      r_PlayerData.PlayerData.deleteCoin("神龙彩票门票", r_LotteryTicketCfg.BuyShenronCoin, r_ReportSystem.SystemKey.彩票);
      this.btnAgain.visible = false;
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.cleanSuccess = function (e) {
    var t = this.contentPane.getChild("item" + e);
    if (t.isWin) {
      t.getChild("tip").visible = true;
      r_AnimSystem.AnimSystem.playCoinAnim(t.getChild("tip").node);
      r_PlayerData.PlayerData.addCoin("神龙彩票中奖", t.coin, r_ReportSystem.SystemKey.彩票);
    } else {
      t.getChild("tip").visible = false;
    }
  };
  _ctor.prototype.cleanAllSuccess = function () {
    this.btnAgain.visible = true;
    this.btnTip.visible = false;
    r_FguiGestureSys.FguiGestureSys.enableBiyId("shulinsaniao", false);
    r_FguiGestureSys.FguiGestureSys.enableBiyId("maofangsaniao", false);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.eraseCom && this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("niaoniao");
    r_TimeSystem.TimeSystem.scheduleClear("maofangsaniao");
    r_TimeSystem.TimeSystem.scheduleClear("animhf0.1");
    r_TimeSystem.TimeSystem.scheduleClear("dorpFnish");
    r_TimeSystem.TimeSystem.scheduleClear("dorpHongbao");
  };
  _ctor.prototype.restart = function () {
    this.btnAgain.visible = false;
    r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, [r_PlayerData.PlayerData.data.shenronCaidanNum], r_PlayerData.PlayerData.data.shenronCaidanVideo);
    this.setResult(0);
    r_UtilsSystem.UtilsSystem.playAnim(this.animJg, "step_1", true);
    this.contentPane.getTransition("init").play();
    if (r_Index.Platform.isDarenPlatform() || 0 == r_PlayerData.PlayerData.data.shenronCaidanNum) {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("shulinsaniao", true);
      r_FguiGestureSys.FguiGestureSys.enableBiyId("maofangsaniao", true);
    } else {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("shulinsaniao", false);
      r_FguiGestureSys.FguiGestureSys.enableBiyId("maofangsaniao", false);
    }
    this.isTouch;
  };
  _ctor.prototype.setResult = function (e) {
    this.eraseCom.startClean();
    this.m_looteryNum = r_UtilsSystem.UtilsSystem.getRandomNum(1, 98);
    this.labNum.text = this.m_looteryNum < 10 ? "0" + this.m_looteryNum : this.m_looteryNum.toString();
    for (var t = 0; t < 20; t++) {
      var o = this.contentPane.getChild("item" + t);
      var i = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
      o.getChild("tip").visible = false;
      var n = Math.random() < i.ShenronCfg.numPr;
      1 == e && (n = true);
      2 == e && (n = false);
      var a = r_UtilsSystem.UtilsSystem.getRandomNum(1, 99);
      if (n) {
        a = this.m_looteryNum;
      } else {
        a == this.m_looteryNum && (a = this.m_looteryNum + 1);
      }
      a < 10 && (a = "0" + a);
      o.getChild("num").text = a + "";
      var s = 1 == e ? r_LotteryTicketCfg.LotteryTicketCfg.ShenronCfg.caidanCoin : r_ShenronSystem.ShenronSystem.getNumAward(n);
      o.getChild("coin").text = r_UtilsSystem.UtilsSystem.numFormats(s);
      o.getChild("tip").visible = false;
      o.isWin = n;
      o.coin = s;
    }
  };
  _ctor.prototype.hitSucc0 = function () {
    var e = this;
    this.contentPane.getTransition("shuohua").stop();
    r_FguiGestureSys.FguiGestureSys.enableBiyId("shulinsaniao", false);
    r_FguiGestureSys.FguiGestureSys.enableBiyId("maofangsaniao", false);
    r_SoundMgr.SoundMgr.playSound("shenron/失败上厕所");
    this.contentPane.getTransition("caidan0").play(function () {
      e.animJg.visible = false;
    });
    r_UtilsSystem.UtilsSystem.playAnim(this.animJg, "step_2", false);
    r_TimeSystem.TimeSystem.scheduleOnce("niaoniao", 1, function () {
      r_UtilsSystem.UtilsSystem.playAnim(e.animJg, "step_3", false);
    });
  };
  _ctor.prototype.hitSucc1 = function () {
    var e = this;
    r_PlayerData.PlayerData.data.shenronCaidanNum = 1;
    this.contentPane.getTransition("shuohua").stop();
    r_FguiGestureSys.FguiGestureSys.enableBiyId("shulinsaniao", false);
    r_FguiGestureSys.FguiGestureSys.enableBiyId("maofangsaniao", false);
    r_SoundMgr.SoundMgr.playSound("shenron/成功上厕所");
    this.contentPane.getTransition("caidan1").play(function () {
      e.animJg.visible = false;
      r_SoundMgr.SoundMgr.playSound("shenron/变身");
      e.contentPane.getController("c1").selectedIndex = 1;
      r_TimeSystem.TimeSystem.scheduleOnce("maofangsaniao", 2, function () {
        r_UtilsSystem.UtilsSystem.playAnim(e.animHf, "step_2", true);
        e.isTouch = true;
        e.contentPane.getTransition("shuohua2").play(function () {
          e.drop();
        });
      });
      e.animHf.alpha = 0;
      r_UtilsSystem.UtilsSystem.playAnim(e.animHf, "step_1", false);
      r_TimeSystem.TimeSystem.scheduleOnce("animhf0.1", .1, function () {
        e.animHf.alpha = 1;
      });
    });
  };
  _ctor.prototype.drop = function () {
    var e = this;
    r_TimeSystem.TimeSystem.schedule("dorpHongbao", .1, function () {
      var t = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.Qianqian);
      t.y = -t.height;
      t.x = r_UtilsSystem.UtilsSystem.getRandomNum(100, 650);
      t.visible = true;
      t.alpha = 1;
      t.clearClick();
      t.onceClick(function () {
        e.continueNum++;
        cc.Tween.stopAllByTarget(t);
        r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.Qianqian, t);
        var o = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
        var i = o.ShenronCfg.caidanCoinList[r_UtilsSystem.UtilsSystem.getRandomNum(0, o.ShenronCfg.caidanCoinList.length - 1)];
        r_PlayerData.PlayerData.addCoin("双12小红包彩蛋", i, r_ReportSystem.SystemKey.彩票);
      }, e);
      cc.Tween.stopAllByTarget(t);
      cc.tween(t).to(3, {
        y: cc.view.getCanvasSize().height / cc.view.getScaleY() + t.height
      }).call(function () {
        r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.Qianqian, t);
      }).start();
    }, 100);
    r_TimeSystem.TimeSystem.scheduleOnce("dorpFnish", 13, function () {
      e.contentPane.getController("c1").selectedIndex = 0;
      e.setResult(1);
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("labNum")], _ctor.prototype, "labNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTip")], _ctor.prototype, "btnTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animJg")], _ctor.prototype, "animJg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("shulin")], _ctor.prototype, "shulin", undefined);
  __decorate([r_DecorateFunction1.AutoFind("maofang")], _ctor.prototype, "maofang", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animHf")], _ctor.prototype, "animHf", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_ShenronUI;