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
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_EraseCom = require("EraseCom");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_CaishenUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery2, r_UIDef.UIDef.Res.UI.CaishenUI) || this;
    t.showAnimFlag = false;
    t.m_looteryNum = null;
    t.startPos = null;
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
    this.show(r_UIDef.UIDef.Urls.UI.CaishenUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CaishenUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.startPos = cc.v2(this.fu.x, this.fu.y);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.YuanBao, "ui://Lottery2/yb", 1, this.contentPane);
    this.contentPane.visible = false;
    this.bindBtnCallback(this.btnAgain);
    this.btnAgain.getChild("num").text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyCaiShen);
    r_CaidanSystem.CaidanSystem.bindBtn("caishen", this.btnTip, "caishenCaidanVideo");
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/caishen", cc.Prefab, function (e, o) {
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
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("zainan", this.fu, this.fu, this.zhainan, this.hitSucc.bind(this));
  };
  _ctor.prototype.onClickbtnAgain = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyCaiShen)) {
      r_PlayerData.PlayerData.deleteCoin("财神彩票门票", r_LotteryTicketCfg.BuyCaiShen, r_ReportSystem.SystemKey.彩票);
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
      r_PlayerData.PlayerData.addCoin("财神彩票中奖", t.coin, r_ReportSystem.SystemKey.彩票);
    } else {
      t.getChild("tip").visible = false;
    }
  };
  _ctor.prototype.cleanAllSuccess = function () {
    this.btnAgain.visible = true;
    this.btnTip.visible = false;
    r_FguiGestureSys.FguiGestureSys.enableBiyId("zainan", false);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.eraseCom && this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistUpdate("testGetYuanBao");
    r_TimeSystem.TimeSystem.scheduleClear("dorpYuanbao");
    r_TimeSystem.TimeSystem.scheduleClear("dorpFnish");
    r_TimeSystem.TimeSystem.scheduleClear("dorpHongbao");
  };
  _ctor.prototype.restart = function () {
    this.zhainan.visible = true;
    this.zhainan.node.opacity = 255;
    this.caishen.visible = false;
    this.caishen.node.opacity = 0;
    this.contentPane.getController("c1").selectedIndex = 0;
    this.contentPane.getController("c2").selectedIndex = 0;
    this.btnAgain.visible = false;
    r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, [r_PlayerData.PlayerData.data.caishenCaidanNum], r_PlayerData.PlayerData.data.caishenCaidanVideo);
    this.setResult(0);
    this.contentPane.getTransition("init").play();
    if (r_Index.Platform.isDarenPlatform() || 0 == r_PlayerData.PlayerData.data.caishenCaidanNum) {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("zainan", true);
    } else {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("zainan", false);
    }
  };
  _ctor.prototype.setResult = function (e) {
    this.eraseCom.startClean();
    this.m_looteryNum = r_UtilsSystem.UtilsSystem.getRandomNum(1, 98);
    for (var t = 0; t < 16; t++) {
      var o = this.contentPane.getChild("item" + t);
      o.getChild("num").visible = true;
      o.getChild("head").visible = false;
      var i = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
      o.getChild("tip").visible = false;
      var n = Math.random() < i.CaishenCfg.numPr;
      1 == e && (n = true);
      2 == e && (n = false);
      var a = r_UtilsSystem.UtilsSystem.getRandomNum(1, 99);
      if (n) {
        a = this.m_looteryNum;
        o.getChild("num").visible = false;
        o.getChild("head").visible = true;
      } else {
        a == this.m_looteryNum && (a = this.m_looteryNum + 1);
      }
      a < 10 && (a = "0" + a);
      o.getChild("num").text = a + "";
      var s = 1 == e ? r_LotteryTicketCfg.LotteryTicketCfg.CaishenCfg.caidanCoin : this.getNumAward(n);
      o.getChild("coin").text = r_UtilsSystem.UtilsSystem.numFormats(s);
      o.getChild("tip").visible = false;
      o.isWin = n;
      o.coin = s;
    }
  };
  _ctor.prototype.getNumAward = function (e) {
    var t = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    var o = e ? t.CaishenCfg.numWinAward : t.CaishenCfg.numLoseAward;
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(o).award;
  };
  _ctor.prototype.hitSucc = function () {
    var e = this;
    r_PlayerData.PlayerData.data.caishenCaidanNum = 1;
    r_FguiGestureSys.FguiGestureSys.enableBiyId("zainan", false);
    this.contentPane.getController("c2").selectedIndex = 1;
    cc.Tween.stopAllByTarget(this.caishen.node);
    this.caishen.visible = true;
    this.caishen.node.opacity = 0;
    cc.tween(this.caishen.node).to(1, {
      opacity: 255
    }).call(function () {
      e.contentPane.getController("c1").selectedIndex = 1;
      e.drop();
    }).start();
    cc.Tween.stopAllByTarget(this.zhainan.node);
    cc.tween(this.zhainan.node).to(1, {
      opacity: 0
    }).call(function () {
      e.zhainan.visible = false;
    }).start();
  };
  _ctor.prototype.drop = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("caishen/跳舞");
    this.fu.x = this.startPos.x;
    this.fu.y = this.startPos.y;
    var t = [];
    var o = 0;
    var i = false;
    var n = 0;
    this.btnJuBao.getController("c1").selectedIndex = 0;
    this.touch.node.on(cc.Node.EventType.TOUCH_START, function (t) {
      var n = t.getLocation();
      r_UtilsSystem.UtilsSystem.touchInNode(e.btnJuBao.node, n) && (i = true);
      o = n.x;
    }, this);
    this.touch.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
      var n = t.getLocation();
      if (i) {
        e.btnJuBao.x += n.x - o;
        e.btnJuBao.x > cc.view.getCanvasSize().width / cc.view.getScaleX() - e.btnJuBao.width / 2 && (e.btnJuBao.x = cc.view.getCanvasSize().width / cc.view.getScaleX() - e.btnJuBao.width / 2);
        e.btnJuBao.x < e.btnJuBao.width / 2 && (e.btnJuBao.x = e.btnJuBao.width / 2);
        o = n.x;
      }
    }, this);
    this.touch.node.on(cc.Node.EventType.TOUCH_END, function () {
      i = false;
    }, this);
    this.touch.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
      i = false;
    }, this);
    r_TimeSystem.TimeSystem.registUpdate("testGetYuanBao", function () {
      for (var o = 0; o < t.length;) {
        var i = t[o].node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        if (r_UtilsSystem.UtilsSystem.touchInNode(e.btnJuBao.node, i)) {
          var a = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
          r_PlayerData.PlayerData.addCoin("接元宝", a.CaishenCfg.yuanbaoCoin, r_ReportSystem.SystemKey.彩票);
          cc.Tween.stopAllByTarget(t[o]);
          n++;
          r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.YuanBao, t[o]);
          t.splice(o, 1);
          10 == n && 1 != e.btnJuBao.getController("c1").selectedIndex && (e.btnJuBao.getController("c1").selectedIndex = 1);
          30 == n && 2 != e.btnJuBao.getController("c1").selectedIndex && (e.btnJuBao.getController("c1").selectedIndex = 2);
          60 == n && 3 != e.btnJuBao.getController("c1").selectedIndex && (e.btnJuBao.getController("c1").selectedIndex = 3);
        } else {
          o++;
        }
      }
    });
    r_TimeSystem.TimeSystem.schedule("dorpYuanbao", .1, function () {
      var e = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.YuanBao);
      e.y = -e.height;
      e.x = r_UtilsSystem.UtilsSystem.getRandomNum(100, 650);
      e.visible = true;
      e.node.angle = r_UtilsSystem.UtilsSystem.getRandomNum(-80, 80);
      e.node.scale = r_UtilsSystem.UtilsSystem.getRandomNum(.8, 1.1);
      t.push(e);
      cc.Tween.stopAllByTarget(e);
      cc.tween(e).to(2, {
        y: cc.view.getCanvasSize().height / cc.view.getScaleY() + e.height
      }).call(function () {
        r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.YuanBao, e);
        for (var o = 0; o < t.length; o++) {
          if (t[o] == e) {
            t.splice(o, 1);
            break;
          }
        }
      }).start();
    }, 100);
    r_TimeSystem.TimeSystem.scheduleOnce("dorpFnish", 13, function () {
      e.contentPane.getController("c1").selectedIndex = 0;
      e.setResult(1);
      r_TimeSystem.TimeSystem.unregistUpdate("testGetYuanBao");
      e.touch.node.off(cc.Node.EventType.TOUCH_START);
      e.touch.node.off(cc.Node.EventType.TOUCH_MOVE);
      e.touch.node.off(cc.Node.EventType.TOUCH_CANCEL);
      e.touch.node.off(cc.Node.EventType.TOUCH_END);
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTip")], _ctor.prototype, "btnTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("fu")], _ctor.prototype, "fu", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnJuBao")], _ctor.prototype, "btnJuBao", undefined);
  __decorate([r_DecorateFunction1.AutoFind("zhainan")], _ctor.prototype, "zhainan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("caishen")], _ctor.prototype, "caishen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("touch")], _ctor.prototype, "touch", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_CaishenUI;