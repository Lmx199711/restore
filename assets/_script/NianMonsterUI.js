var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_AnimSystem = require("AnimSystem");
var r_CaidanSystem = require("CaidanSystem");
var r_DebugSystem = require("DebugSystem");
var r_FguiGestureSys = require("FguiGestureSys");
var r_FguiResSystem = require("FguiResSystem");
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
var T = 30;
var def_NianMonsterUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery2, r_UIDef.UIDef.Res.UI.NianMonsterUI) || this;
    t.showAnimFlag = false;
    t.m_looteryNum = null;
    t.initDengLongPos = null;
    t.initBianPaoPos = null;
    t.initBianPaoAnimPos = null;
    t.initBianPaoFirePos = null;
    t.initLabMoneyPos = null;
    t.huojianList = [];
    t.baozhaList = [];
    t.gameTime = T;
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
    this.show(r_UIDef.UIDef.Urls.UI.NianMonsterUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.NianMonsterUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.initDengLongPos = cc.v2(this.denglong.x, this.denglong.y);
    this.initBianPaoPos = cc.v2(this.bianpao.x, this.bianpao.y);
    this.initBianPaoAnimPos = cc.v2(this.bianpaoAnim.x, this.bianpaoAnim.y);
    this.initBianPaoFirePos = cc.v2(this.bianpaoFire.x, this.bianpaoFire.y);
    this.initLabMoneyPos = cc.v2(this.labMoney.x, this.labMoney.y);
    this.touch.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.YuanBao, "ui://Lottery2/yb", 1, this.contentPane);
    this.contentPane.visible = false;
    this.bindBtnCallback(this.btnAgain);
    this.btnBack.onClick(this.onClickBack, this);
    this.btnAgain.getChild("num").text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyNianMonster);
    r_CaidanSystem.CaidanSystem.bindBtn("nianMonster", this.btnTip, "nianMonsterCaidanVideo");
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "lottery2/nianMonster/nianMonster", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        return __generator(this, function () {
          r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
          this.prefab = cc.instantiate(o);
          this.prefab.active = true;
          this.contentPane.getChild("center").node.addChild(this.prefab);
          this.eraseCom = this.prefab.getComponent(r_EraseCom.default);
          this.eraseCom.cleanSuccessCallBack = this.cleanSuccess.bind(this);
          this.eraseCom.cleanAllSuccessCallBack = this.cleanAllSuccess.bind(this);
          this.contentPane.visible = true;
          this.restart();
          return [2];
        });
      });
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "lottery2/nianMonster/bianpao", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        var e;
        return __generator(this, function () {
          (e = cc.instantiate(o)).scale = 1;
          this.bianpaoAnim.node.addChild(e);
          return [2];
        });
      });
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "lottery2/nianMonster/bianpao", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        var e;
        return __generator(this, function () {
          (e = cc.instantiate(o)).scale = .6;
          this.bianpaoFire.node.addChild(e);
          return [2];
        });
      });
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "lottery2/nianMonster/monster", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        var e;
        return __generator(this, function () {
          e = cc.instantiate(o);
          this.monsterCom.getChild("nianMonster").node.addChild(e);
          this.showNodeSpine(this.monsterCom.getChild("nianMonster").node.getChildByName("anim"), "step_1");
          return [2];
        });
      });
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "lottery2/nianMonster/game", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        var e;
        return __generator(this, function () {
          e = cc.instantiate(o);
          this.game.node.addChild(e);
          this.gameNode = this.game.node.getChildByName("anim");
          this.huojianPrefab = this.gameNode.getChildByName("huojian");
          this.baozhaPrefab = this.gameNode.getChildByName("baozha");
          this.recketNode = this.gameNode.getChildByName("recket");
          return [2];
        });
      });
    });
    this.btnAgain.visible = false;
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("denglong", this.denglong, this.denglong, this.bianpao, this.bianpaofire.bind(this));
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("bianpao", this.bianpao, this.bianpao, this.monsterCom, this.hitFail.bind(this));
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("bianpaoHuo", this.bianpaoFire, this.bianpaoFire, this.monsterCom, this.hitSucc.bind(this));
  };
  _ctor.prototype.onClickbtnAgain = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyNianMonster)) {
      r_PlayerData.PlayerData.deleteCoin("财神彩票门票", r_LotteryTicketCfg.BuyNianMonster, r_ReportSystem.SystemKey.彩票);
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
    r_FguiGestureSys.FguiGestureSys.enableBiyId("denglong", false);
    r_FguiGestureSys.FguiGestureSys.enableBiyId("bianpao", false);
    r_FguiGestureSys.FguiGestureSys.enableBiyId("bianpaoHuo", false);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.eraseCom && this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistUpdate("playHit");
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = 0;
    this.btnAgain.visible = false;
    r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, [r_PlayerData.PlayerData.data.nianMonsterCaidanNum], r_PlayerData.PlayerData.data.nianMonsterCaidanVideo);
    this.setResult(0);
    if (r_Index.Platform.isDarenPlatform() || 0 == r_PlayerData.PlayerData.data.nianMonsterCaidanNum) {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("denglong", true);
      r_FguiGestureSys.FguiGestureSys.enableBiyId("bianpao", true);
      r_FguiGestureSys.FguiGestureSys.enableBiyId("bianpaoHuo", false);
    } else {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("denglong", false);
      r_FguiGestureSys.FguiGestureSys.enableBiyId("bianpao", false);
      r_FguiGestureSys.FguiGestureSys.enableBiyId("bianpaoHuo", false);
    }
    this.denglong.x = this.initDengLongPos.x;
    this.denglong.y = this.initDengLongPos.y;
    this.bianpao.asLoader.setPosition(this.initBianPaoPos.x, this.initBianPaoPos.y);
    this.bianpaoFire.asLoader.setPosition(this.initBianPaoFirePos.x, this.initBianPaoFirePos.y);
    this.bianpaoFire.visible = false;
    this.bianpaoAnim.visible = false;
    this.denglong.visible = true;
    this.bianpao.visible = true;
    this.gameTime = T;
    this.showNodeSpine(this.monsterCom.getChild("nianMonster").node.getChildByName("anim"), "step_1");
    this.bg1.visible = true;
    this.bg2.visible = false;
  };
  _ctor.prototype.onClickBack = function () {
    var e = this;
    r_UtilsSystem.UtilsSystem.showAlert("游戏尚未结束，是否退出？", 0, function () {
      e.contentPane.getController("c1").selectedIndex = 0;
      r_TimeSystem.TimeSystem.unregistUpdate("playHit");
      e.clearAllHuoJian();
      r_SoundMgr.SoundMgr.playMusic("bgm");
    }, this, "提示", "确定", "取消");
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
      var n = Math.random() < i.NianMonsterCfg.numPr;
      1 == e && (n = true);
      2 == e && (n = true);
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
      var s = 1 == e ? r_LotteryTicketCfg.LotteryTicketCfg.NianMonsterCfg.caidanCoin : this.getNumAward(n);
      2 == e && (s = r_LotteryTicketCfg.LotteryTicketCfg.NianMonsterCfg.loseCoin);
      o.getChild("coin").text = r_UtilsSystem.UtilsSystem.numFormats(s);
      o.getChild("tip").visible = false;
      o.isWin = n;
      o.coin = s;
    }
  };
  _ctor.prototype.getNumAward = function (e) {
    var t = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    var o = e ? t.NianMonsterCfg.numWinAward : t.NianMonsterCfg.numLoseAward;
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(o).award;
  };
  _ctor.prototype.bianpaofire = function () {
    r_FguiGestureSys.FguiGestureSys.enableBiyId("denglong", false);
    r_FguiGestureSys.FguiGestureSys.enableBiyId("bianpaoHuo", true);
    this.bianpao.visible = false;
    this.bianpaoFire.visible = true;
    this.denglong.visible = false;
    this.showNodeSpine(this.bianpaoFire.node.getChildByName("anim"), "step_3_2");
  };
  _ctor.prototype.showNodeSpine = function (e, t, o, i) {
    undefined === o && (o = true);
    if (e) {
      var n = e.getComponent(sp.Skeleton);
      var a = n.setAnimation(0, t, o);
      o || n.setTrackCompleteListener(a, function () {
        i && i();
      });
    }
  };
  _ctor.prototype.hitSucc = function () {
    var e = this;
    r_FguiGestureSys.FguiGestureSys.enableBiyId("bianpaoHuo", false);
    this.bianpao.visible = false;
    this.bianpaoFire.visible = false;
    this.bianpaoAnim.visible = true;
    this.showNodeSpine(this.bianpaoAnim.node.getChildByName("anim"), "step_3_3", false, function () {});
    r_TimeSystem.TimeSystem.scheduleOnce("nianHitSucc", 2.8, function () {
      e.bianpaoAnim.visible = false;
      e.showNodeSpine(e.monsterCom.getChild("nianMonster").node.getChildByName("anim"), "step_3", true);
      r_PlayerData.PlayerData.data.nianMonsterCaidanNum = 1;
      e.contentPane.getController("c1").selectedIndex = 1;
      e.setResult(1);
      e.playHitNianMonster();
      e.bg1.visible = false;
      e.bg2.visible = true;
      r_SoundMgr.SoundMgr.playMusic("nianMonster/游戏BGM");
    });
    this.showNodeSpine(this.monsterCom.getChild("nianMonster").node.getChildByName("anim"), "step_2_1", false);
  };
  _ctor.prototype.hitFail = function () {
    var e = this;
    r_FguiGestureSys.FguiGestureSys.enableBiyId("bianpao", false);
    this.bianpao.visible = false;
    this.bianpaoAnim.visible = true;
    this.showNodeSpine(this.bianpaoAnim.node.getChildByName("anim"), "step_2", false, function () {
      e.bianpaoAnim.visible = false;
    });
    this.showNodeSpine(this.monsterCom.getChild("nianMonster").node.getChildByName("anim"), "step_2_1", false);
    this.setResult(2);
  };
  _ctor.prototype.calcAngle = function (e, t) {
    return t.sub(e).normalize().signAngle(cc.v2(1, 0)) / Math.PI * 180;
  };
  _ctor.prototype.showHitTips = function (e) {
    var t = this;
    undefined === e && (e = true);
    this.hitTips.visible = e;
    cc.Tween.stopAllByTarget(this.hitTips.node);
    e && cc.tween(this.hitTips.node).repeat(5, cc.tween().to(.25, {
      scale: 1.2
    }).to(.25, {
      scale: 1
    })).call(function () {
      t.hitTips.visible = false;
    }).start();
  };
  _ctor.prototype.showCoinTip = function (e) {
    var t = this;
    this.labMoney.visible = true;
    this.labMoney.x = this.initLabMoneyPos.x;
    this.labMoney.y = this.initLabMoneyPos.y;
    this.labMoney.asTextField.text = "+" + r_UtilsSystem.UtilsSystem.numFormats(e);
    cc.Tween.stopAllByTarget(this.labMoney);
    cc.tween(this.labMoney).to(.5, {
      y: this.initLabMoneyPos.y - 50
    }).call(function () {
      t.labMoney.visible = false;
    }).start();
  };
  _ctor.prototype.clearAllHuoJian = function () {
    for (var e = 0; e < this.huojianList.length; e++) {
      if (!this.huojianList[e].isFinish) {
        cc.Tween.stopAllByTarget(this.huojianList[e].node);
        this.huojianList[e].isFinish = true;
        this.huojianList[e].node.destroy();
      }
    }
  };
  _ctor.prototype.createHuoJian = function (e) {
    var t = cc.instantiate(this.huojianPrefab);
    t.setAnchorPoint(.5, 0);
    t.parent = this.gameNode;
    t.setPosition(this.recketNode.getPosition());
    var o = this.gameNode.convertToNodeSpaceAR(e);
    var i = this.calcAngle(this.recketNode.getPosition(), o);
    t.angle = 90 - i + 180;
    this.recketNode.angle = 90 - i + 180;
    var n = o.sub(this.recketNode.getPosition()).normalizeSelf();
    var a = {
      node: t,
      isFinish: false
    };
    this.huojianList.push(a);
    cc.tween(t).to(1, {
      x: 2e3 * n.x,
      y: 2e3 * n.y
    }).call(function () {
      a.isFinish = true;
      a.node.destroy();
    }).start();
    cc.Tween.stopAllByTarget(this.recketNode);
    cc.tween(this.recketNode).to(.1, {
      scale: 1.1
    }).to(.1, {
      scale: 1
    }).start();
  };
  _ctor.prototype.createBaozhan = function (e) {
    var t = cc.instantiate(this.baozhaPrefab);
    t.setAnchorPoint(.5, 0);
    t.parent = this.gameNode;
    t.setPosition(e.x, e.y + 100);
    this.showNodeSpine(t, "animation", false, function () {
      t.destroy();
    });
  };
  _ctor.prototype.checkPolygonInPolygon = function (e, t) {
    var o = e.getComponent(cc.PolygonCollider);
    var i = [];
    for (var n = 0; n < o.points.length; n++) {
      i[n] = new cc.Vec2(0, 0);
      i[n].x = o.points[n].x;
      i[n].y = o.points[n].y;
    }
    var a = e.convertToWorldSpaceAR(cc.Vec2.ZERO);
    for (n = 0; n < i.length; n++) {
      i[n].x += a.x;
      i[n].y += a.y;
    }
    var s = t.getComponent(cc.PolygonCollider);
    var r = [];
    for (n = 0; n < s.points.length; n++) {
      r[n] = new cc.Vec2(0, 0);
      r[n].x = s.points[n].x;
      r[n].y = s.points[n].y;
    }
    var c = t.convertToWorldSpaceAR(cc.Vec2.ZERO);
    for (n = 0; n < r.length; n++) {
      r[n].x += c.x;
      r[n].y += c.y;
    }
    var l = cc.Intersection.polygonPolygon(i, r);
    e.getBoundingBoxToWorld();
    t.getBoundingBoxToWorld();
    return l;
  };
  _ctor.prototype.playHitNianMonster = function () {
    var e = this;
    this.showHitTips(true);
    var t = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode.getChildByName("monster"), "hitArea");
    this.gameNode.getChildByName("monster").getComponent(sp.Skeleton).setBonesToSetupPose();
    this.showNodeSpine(this.gameNode.getChildByName("monster"), "step_4", false);
    this.gameNode.off(cc.Node.EventType.TOUCH_START);
    this.gameNode.off(cc.Node.EventType.TOUCH_MOVE);
    this.gameNode.off(cc.Node.EventType.TOUCH_END);
    this.gameNode.on(cc.Node.EventType.TOUCH_START, function (t) {
      var o = t.getLocation();
      e.showHitTips(false);
      e.createHuoJian(o);
    }, this);
    this.gameNode.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
      e.getLocation();
    }, this);
    this.gameNode.on(cc.Node.EventType.TOUCH_END, function (e) {
      e.getLocation();
    }, this);
    var o = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    this.labTime.text = Math.floor(this.gameTime) + "";
    r_TimeSystem.TimeSystem.registUpdate("playHit", function (i) {
      e.gameTime -= i;
      e.labTime.text = Math.floor(e.gameTime) + "";
      if (e.gameTime <= 0) {
        r_SoundMgr.SoundMgr.playMusic("bgm");
        r_TimeSystem.TimeSystem.unregistUpdate("playHit");
        e.gameTime = 0;
        e.contentPane.getController("c1").selectedIndex = 0;
        return void e.clearAllHuoJian();
      }
      for (var n = 0; n < e.huojianList.length; n++) {
        e.huojianList[n].isFinish || e.checkPolygonInPolygon(t, e.huojianList[n].node) && (e.createBaozhan(e.huojianList[n].node.getPosition()), cc.Tween.stopAllByTarget(e.huojianList[n].node), e.huojianList[n].isFinish = true, e.huojianList[n].node.destroy(), r_SoundMgr.SoundMgr.playSound("nianMonster/烟花爆炸"), e.showCoinTip(o.NianMonsterCfg.hitMonsterCoin), r_PlayerData.PlayerData.addCoin("打年兽", o.NianMonsterCfg.hitMonsterCoin, r_ReportSystem.SystemKey.彩票, false, false));
      }
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTip")], _ctor.prototype, "btnTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("denglong")], _ctor.prototype, "denglong", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bianpao")], _ctor.prototype, "bianpao", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bianpaoAnim")], _ctor.prototype, "bianpaoAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bianpaoFire")], _ctor.prototype, "bianpaoFire", undefined);
  __decorate([r_DecorateFunction1.AutoFind("monsterCom")], _ctor.prototype, "monsterCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("touch")], _ctor.prototype, "touch", undefined);
  __decorate([r_DecorateFunction1.AutoFind("game")], _ctor.prototype, "game", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labMoney")], _ctor.prototype, "labMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labTime")], _ctor.prototype, "labTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hitTips")], _ctor.prototype, "hitTips", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bg1")], _ctor.prototype, "bg1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bg2")], _ctor.prototype, "bg2", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_NianMonsterUI;