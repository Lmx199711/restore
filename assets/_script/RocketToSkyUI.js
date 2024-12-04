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
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_RoleCfg = require("RoleCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_EraseCom = require("EraseCom");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var U = 30;
var def_RocketToSkyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery2, r_UIDef.UIDef.Res.UI.RocketToSkyUI) || this;
    t.showAnimFlag = false;
    t.m_looteryNum = null;
    t.initRocketPos = cc.v2(0, 0);
    t.initFeiPos = cc.v2(0, 0);
    t.initGameRocketPos = cc.v2(0, 0);
    t.initBg1Pos = cc.v2(0, 0);
    t.initBg2Pos = cc.v2(0, 0);
    t.initBg3Pos = cc.v2(0, 0);
    t.moveCount = 0;
    t.gameStop = false;
    t.flyType = 0;
    t.gameTime = U;
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
    this.show(r_UIDef.UIDef.Urls.UI.RocketToSkyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RocketToSkyUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.initRocketPos = cc.v2(this.rocket.x, this.rocket.y);
    this.initFeiPos = cc.v2(this.fei.x, this.fei.y);
    this.contentPane.visible = false;
    this.bindBtnCallback(this.btnAgain);
    this.touch.onClick(function () {}, this);
    this.btnGet.onClick(this.onClickGetReward1, this);
    var o = function (e) {
      i.reward2.getChild("btn" + (e + 1)).onClick(function () {
        t.onClickReward2(e);
      }, i);
    };
    var i = this;
    for (var n = 0; n < 4; n++) {
      o(n);
    }
    this.BtnClose.onClick(this.hide, this);
    this.btnAgain.getChild("num").text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyRocketToSky);
    r_CaidanSystem.CaidanSystem.bindBtn("rocketToSky", this.btnTip, "rocketToSkyCaidanVideo");
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "lottery2/rocketSky/rocketSky", cc.Prefab, function (e, o) {
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
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "lottery2/rocketSky/rocket", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        var e;
        return __generator(this, function () {
          e = cc.instantiate(o);
          this.rocket.getChild("chi").node.addChild(e);
          this.rocket.getChild("chi").visible = false;
          return [2];
        });
      });
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "lottery2/rocketSky/rocket", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        var e;
        return __generator(this, function () {
          e = cc.instantiate(o);
          this.rocket.getChild("weiba").node.addChild(e);
          this.rocket.getChild("weiba").visible = false;
          return [2];
        });
      });
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "lottery2/rocketSky/rocket", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        var e;
        return __generator(this, function () {
          e = cc.instantiate(o);
          this.fei.getChild("fei2").node.addChild(e);
          return [2];
        });
      });
    });
    this.rocket_chi = this.rocket.getChild("chi");
    this.rocket_wei = this.rocket.getChild("weiba");
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "lottery2/rocketSky/game", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        var e;
        return __generator(this, function () {
          e = cc.instantiate(o);
          this.game.node.addChild(e);
          this.gameNode = this.game.node.getChildByName("anim");
          this.gameRocket = this.gameNode.getChildByName("rocket");
          this.initGameRocketPos.x = this.gameNode.getChildByName("rocket").x;
          this.initGameRocketPos.y = this.gameNode.getChildByName("rocket").y;
          this.initBg1Pos = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "bg1").getPosition();
          this.initBg2Pos = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "bg2").getPosition();
          this.initBg3Pos = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "bg3").getPosition();
          return [2];
        });
      });
    });
    this.btnAgain.visible = false;
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("feizi", this.fei, this.fei, this.rocket, this.feiToRocket.bind(this));
    this.fei.on(fgui.Event.TOUCH_BEGIN, function () {
      t.fei.getController("c1").selectedIndex = 1;
      t.showNodeSpine(t.fei.getChild("fei2").node.getChildByName("anim"), "step_1", true);
    }, this);
    this.fei.on(fgui.Event.TOUCH_END, function () {
      t.fei.getController("c1").selectedIndex = 0;
    }, this);
  };
  _ctor.prototype.onClickbtnAgain = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyRocketToSky)) {
      r_PlayerData.PlayerData.deleteCoin("一飞冲天彩票门票", r_LotteryTicketCfg.BuyRocketToSky, r_ReportSystem.SystemKey.彩票);
      this.btnAgain.visible = false;
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.cleanSuccess = function (e) {
    var t;
    if (4 != e) {
      if ((t = e >= 0 && e < 4 ? this.contentPane.getChild("item1_" + (e + 1)) : this.contentPane.getChild("item" + (e - 5))).isWin) {
        t.getChild("tip").visible = true;
        r_AnimSystem.AnimSystem.playCoinAnim(t.getChild("tip").node);
        r_PlayerData.PlayerData.addCoin("一飞冲天彩票中奖", t.coin, r_ReportSystem.SystemKey.彩票);
      } else {
        t.getChild("tip").visible = false;
      }
    }
  };
  _ctor.prototype.cleanAllSuccess = function () {
    this.btnAgain.visible = true;
    this.btnTip.visible = false;
    r_FguiGestureSys.FguiGestureSys.enableBiyId("feizi", false);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.eraseCom && this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistUpdate("moveBg");
  };
  _ctor.prototype.registerTouchWei = function () {
    var e = this;
    this.touchWei.on(fgui.Event.TOUCH_BEGIN, function (t) {
      e.touchWeiStartPos = t.pos;
      e.touchTime = r_TimeSystem.TimeSystem.getServerTime();
      t.captureTouch();
    }, this);
    this.touchWei.on(fgui.Event.TOUCH_MOVE, function (t) {
      var o = t.pos;
      var i = r_TimeSystem.TimeSystem.getServerTime();
      if (o.subtract(e.touchWeiStartPos).mag() > 5) {
        e.moveCount++;
        e.touchWeiStartPos = new cc.Vec2(o.x, o.y);
      }
      i - e.touchTime >= 1 && e.moveCount > 3 && e.rocketFire();
    }, this);
    this.touchWei.on(fgui.Event.TOUCH_END, function () {
      e.moveCount = 0;
    });
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = 0;
    this.btnAgain.visible = false;
    r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, [r_PlayerData.PlayerData.data.rocketToSkyCaidanNum], r_PlayerData.PlayerData.data.rocketToSkyCaidanVideo);
    this.setResult(0);
    if (r_Index.Platform.isDarenPlatform() || 0 == r_PlayerData.PlayerData.data.rocketToSkyCaidanNum) {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("feizi", true);
      this.registerTouchWei();
    } else {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("feizi", false);
      this.touchWei.off(fgui.Event.TOUCH_BEGIN);
      this.touchWei.off(fgui.Event.TOUCH_MOVE);
      this.touchWei.off(fgui.Event.TOUCH_END);
    }
    this.rocket_chi.visible = false;
    this.rocket_wei.visible = false;
    this.qipao.visible = false;
    this.fei.visible = true;
    this.moveCount = 0;
    this.fei.x = this.initFeiPos.x;
    this.fei.y = this.initFeiPos.y;
    this.rocket.x = this.initRocketPos.x;
    this.rocket.y = this.initRocketPos.y;
    this.gameTime = U;
  };
  _ctor.prototype.setResult = function (e) {
    this.eraseCom.startClean();
    this.m_looteryNum = r_UtilsSystem.UtilsSystem.getRandomNum(1, 98);
    this.labNum.text = this.m_looteryNum < 10 ? "0" + this.m_looteryNum : this.m_looteryNum.toString();
    for (var t = 0; t < 9; t++) {
      (s = this.contentPane.getChild("item" + t)).getChild("num").visible = true;
      var o = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
      s.getChild("tip").visible = false;
      var i = Math.random() < o.RocketToSkyCfg.numPr;
      1 == e && (i = true);
      2 == e && (i = true);
      var n = r_UtilsSystem.UtilsSystem.getRandomNum(1, 99);
      if (i) {
        n = this.m_looteryNum;
      } else {
        n == this.m_looteryNum && (n = this.m_looteryNum + 1);
      }
      n < 10 && (n = "0" + n);
      s.getChild("num").text = n + "";
      var a = 1 == e ? r_LotteryTicketCfg.LotteryTicketCfg.RocketToSkyCfg.caidanCoin : this.getNumAward(i);
      s.getChild("coin").text = r_UtilsSystem.UtilsSystem.numFormats(a);
      s.getChild("tip").visible = false;
      s.isWin = i;
      s.coin = a;
    }
    for (t = 1; t <= 4; t++) {
      var s = this.contentPane.getChild("item1_" + t);
      o = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
      i = Math.random() < o.RocketToSkyCfg.numPr2;
      1 == e && (i = true);
      2 == e && (i = true);
      n = r_UtilsSystem.UtilsSystem.getRandomNum(1, 99);
      if (i) {
        n = this.m_looteryNum;
        s.getChild("money").visible = true;
        s.getChild("num").visible = false;
      } else {
        n == this.m_looteryNum && (n = this.m_looteryNum + 1);
        s.getChild("money").visible = false;
        s.getChild("num").visible = true;
      }
      n < 10 && (n = "0" + n);
      s.getChild("num").text = n + "";
      a = 1 == e ? r_LotteryTicketCfg.LotteryTicketCfg.RocketToSkyCfg.caidanCoin : this.getNumAward1(i);
      s.getChild("money").text = r_UtilsSystem.UtilsSystem.numFormats(a);
      s.getChild("tip").visible = false;
      s.isWin = i;
      s.coin = a;
    }
  };
  _ctor.prototype.getNumAward = function (e) {
    var t = r_DebugSystem.DebugSystem.getLotteryTicketCfg();
    var o = e ? t.RocketToSkyCfg.numWinAward : t.RocketToSkyCfg.numLoseAward;
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(o).award;
  };
  _ctor.prototype.getNumAward1 = function () {
    var e = r_DebugSystem.DebugSystem.getLotteryTicketCfg().RocketToSkyCfg.numWinAward2;
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(e).award;
  };
  _ctor.prototype.feiToRocket = function () {
    var e = this;
    r_FguiGestureSys.FguiGestureSys.enableBiyId("feizi", false);
    this.fei.visible = false;
    this.rocket.getChild("chi").visible = true;
    this.showNodeSpine(this.rocket.getChild("chi").node.getChildByName("anim"), "step_2", true);
    this.flyType = 0;
    cc.tween(this.rocket).to(1.5, {
      y: -2e3
    }).call(function () {
      e.contentPane.getController("c1").selectedIndex = 1;
      e.startFly();
    }).start();
  };
  _ctor.prototype.rocketFire = function () {
    var e = this;
    this.touchWei.off(fgui.Event.TOUCH_BEGIN);
    this.touchWei.off(fgui.Event.TOUCH_MOVE);
    this.touchWei.off(fgui.Event.TOUCH_END);
    r_FguiGestureSys.FguiGestureSys.enableBiyId("feizi", false);
    this.rocket_wei.visible = true;
    this.showNodeSpine(this.rocket_wei.node.getChildByName("anim"), "step_4", false, function () {
      e.showNodeSpine(e.rocket_wei.node.getChildByName("anim"), "step_4_1", true);
    });
    this.qipao.visible = true;
    r_SoundMgr.SoundMgr.playSound("rocketToSky/火烧屁屁咯");
    this.flyType = 1;
    cc.tween(this.rocket).delay(1).call(function () {
      e.qipao.visible = false;
    }).to(1.5, {
      y: -2e3
    }).call(function () {
      e.contentPane.getController("c1").selectedIndex = 1;
      e.startFly();
    }).start();
  };
  _ctor.prototype.startFly = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playMusic("rocketToSky/火箭飞行");
    this.gameRocket.active = true;
    this.gameRocket.x = this.initGameRocketPos.x;
    this.gameRocket.y = this.initGameRocketPos.y;
    this.showNodeSpine(this.gameRocket.getChildByName("roc"), "step_0", true);
    var t = this.gameRocket.getChildByName("chibang");
    var o = this.gameRocket.getChildByName("weiba");
    var i = this.gameNode.getChildByName("rocketPos");
    var n = this.gameNode.getChildByName("rocketPos1");
    var a = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "宇航员");
    var s = false;
    var r = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "外星人");
    var c = false;
    r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "bg1").setPosition(this.initBg1Pos);
    r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "bg2").setPosition(this.initBg2Pos);
    r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "bg3").setPosition(this.initBg3Pos);
    this.gameNode.off(cc.Node.EventType.TOUCH_START);
    this.gameNode.off(cc.Node.EventType.TOUCH_MOVE);
    this.gameNode.off(cc.Node.EventType.TOUCH_END);
    this.gameNode.on(cc.Node.EventType.TOUCH_START, function (t) {
      var i = t.getLocation();
      if (e.flyType && r_PlayerData.PlayerData.data.rocketToSkyCaidanNum) {
        if (!s && r_UtilsSystem.UtilsSystem.touchInNode(a, i)) {
          s = true;
          e.gameStop = true;
          e.showNodeSpine(a, "step_2", false, function () {
            e.showNodeSpine(a, "step_1", true);
          });
          r_TimeSystem.TimeSystem.scheduleOnce("reward1", 1.5, function () {
            e.reward1.visible = true;
          });
        }
        if (!c && r_UtilsSystem.UtilsSystem.touchInNode(r, i)) {
          c = true;
          e.gameStop = true;
          r_SoundMgr.SoundMgr.playSound("rocketToSky/开抢射击");
          e.showNodeSpine(r, "step_2", false, function () {
            o.active = false;
            r_SoundMgr.SoundMgr.playSound("rocketToSky/火箭爆炸");
            e.showNodeSpine(e.gameRocket.getChildByName("roc"), "step_6", false);
            r_TimeSystem.TimeSystem.scheduleOnce("ufo", 1.5, function () {
              e.gameRocket.active = false;
            });
            e.showFlyError(2);
          });
        }
      }
    }, this);
    this.gameNode.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
      e.getLocation();
    }, this);
    this.gameNode.on(cc.Node.EventType.TOUCH_END, function (e) {
      e.getLocation();
    }, this);
    if (this.flyType) {
      t.active = false;
      o.active = true;
      this.showNodeSpine(o, "step_4_1", true);
      cc.tween(this.gameRocket).to(2, {
        y: n.y
      }).call(function () {
        e.moveBg();
        r_PlayerData.PlayerData.data.rocketToSkyCaidanNum = 1;
      }).start();
    } else {
      t.active = true;
      o.active = false;
      r_SoundMgr.SoundMgr.playSound("rocketToSky/煽动翅膀");
      this.showNodeSpine(t, "step_2", true);
      cc.tween(this.gameRocket).to(2, {
        y: i.y
      }).call(function () {
        e.showNodeSpine(t, "step_3", false);
      }).delay(.1).to(2, {
        y: -2e3
      }).call(function () {
        e.showFlyError();
      }).start();
      r_TimeSystem.TimeSystem.scheduleOnce("drop", 2.5, function () {
        r_SoundMgr.SoundMgr.playSound("rocketToSky/火箭爆炸");
        r_SoundMgr.SoundMgr.playMusic("bgm");
      });
    }
  };
  _ctor.prototype.showFlyError = function (e) {
    var t = this;
    undefined === e && (e = 1);
    r_SoundMgr.SoundMgr.playSound("rocketToSky/飞行失败");
    this.flyError.visible = true;
    r_TimeSystem.TimeSystem.scheduleOnce("flyError", e, function () {
      t.flyError.visible = false;
      t.contentPane.getController("c1").selectedIndex = 0;
      r_SoundMgr.SoundMgr.playMusic("bgm");
    });
  };
  _ctor.prototype.onClickGetReward1 = function () {
    this.gameStop = false;
    this.reward1.visible = false;
    r_PlayerData.PlayerData.addCoin("一飞冲天彩票中奖", r_LotteryTicketCfg.LotteryTicketCfg.RocketToSkyCfg.rewardCoin, r_ReportSystem.SystemKey.彩票);
  };
  _ctor.prototype.randomSecret = function () {
    var e = Object.keys(r_RoleCfg.SecretQualityCfg).map(function (e) {
      return Number(e);
    });
    var t = r_SecretUpSystem.SecretUpSystem.getSecretList();
    t = t.map(function (e) {
      return e.id;
    });
    var o = e.filter(function (e) {
      return !t.includes(e);
    });
    if (!(o.length <= 0)) {
      var i = o[r_UtilsSystem.UtilsSystem.getRandomNum(0, o.length - 1)];
      r_SecretUpSystem.SecretUpSystem.addSecret({
        id: i
      });
    }
  };
  _ctor.prototype.onClickReward2 = function (e) {
    var t = this;
    if (0 == e) {
      r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "label").getComponent(cc.Label).string = "痴心妄想,你的愿望被没收了";
    } else if (1 == e) {
      r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "label").getComponent(cc.Label).string = "我已经帮你解锁了一名美女秘书";
      this.randomSecret();
    } else if (2 == e) {
      r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "label").getComponent(cc.Label).string = "这十个亿拿去花吧";
      r_PlayerData.PlayerData.addCoin("一飞冲天彩票中奖", r_LotteryTicketCfg.LotteryTicketCfg.RocketToSkyCfg.reward2Coin, r_ReportSystem.SystemKey.彩票);
    } else if (3 == e) {
      r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "label").getComponent(cc.Label).string = "我已帮你解锁了未来世界的大门";
      r_PlayerData.PlayerData.data.futureSceneVideoCount = 3;
    }
    this.reward2.visible = false;
    r_PlayerData.PlayerData.saveData();
    r_TimeSystem.TimeSystem.scheduleOnce("back", 2, function () {
      t.contentPane.getController("c1").selectedIndex = 0;
      r_SoundMgr.SoundMgr.playMusic("bgm");
      t.setResult(1);
    });
  };
  _ctor.prototype.moveBg = function () {
    var e = this;
    var t = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "bg1");
    var o = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "bg2");
    var i = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "bg3");
    this.gameStop = false;
    var n = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "太阳");
    var a = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "太阳1");
    var s = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.gameNode, "女神");
    s.active = false;
    a.active = false;
    r_TimeSystem.TimeSystem.registUpdate("moveBg", function () {
      if (!e.gameStop) {
        t.y -= 4;
        o.y -= 4;
        i.y -= 4;
        if (i.y <= 0) {
          e.gameStop = true;
          a.active = true;
          r_SoundMgr.SoundMgr.playMusic("bgm");
          r_SoundMgr.SoundMgr.playSound("rocketToSky/女角色出场");
          e.showNodeSpine(n, "step_2", false, function () {
            e.showNodeSpine(n, "step_1", true);
            a.active = false;
          });
          e.showNodeSpine(a, "step_2", true);
          r_TimeSystem.TimeSystem.scheduleOnce("nvshen", 2, function () {
            e.gameRocket.active = false;
            s.active = true;
            e.reward2.visible = true;
            r_UtilsSystem.UtilsSystem.getDeepChildByName(e.gameNode, "label").getComponent(cc.Label).string = "有缘人，告诉我你想要什么？";
          });
        }
      }
    });
  };
  _ctor.prototype.showNodeSpine = function (e, t, o, i) {
    undefined === o && (o = true);
    if (e) {
      e.active = true;
      var n = e.getComponent(sp.Skeleton);
      var a = n.setAnimation(0, t, o);
      o || n.setTrackCompleteListener(a, function () {
        i && i();
      });
    }
  };
  _ctor.prototype.calcAngle = function (e, t) {
    return t.sub(e).normalize().signAngle(cc.v2(1, 0)) / Math.PI * 180;
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
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTip")], _ctor.prototype, "btnTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("BtnClose")], _ctor.prototype, "BtnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("fei")], _ctor.prototype, "fei", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNum")], _ctor.prototype, "labNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("rocket")], _ctor.prototype, "rocket", undefined);
  __decorate([r_DecorateFunction1.AutoFind("qipao")], _ctor.prototype, "qipao", undefined);
  __decorate([r_DecorateFunction1.AutoFind("touch")], _ctor.prototype, "touch", undefined);
  __decorate([r_DecorateFunction1.AutoFind("touchWei")], _ctor.prototype, "touchWei", undefined);
  __decorate([r_DecorateFunction1.AutoFind("game")], _ctor.prototype, "game", undefined);
  __decorate([r_DecorateFunction1.AutoFind("flyError")], _ctor.prototype, "flyError", undefined);
  __decorate([r_DecorateFunction1.AutoFind("reward1")], _ctor.prototype, "reward1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("reward1/btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("reward2")], _ctor.prototype, "reward2", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_RocketToSkyUI;