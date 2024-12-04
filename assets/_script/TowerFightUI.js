var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerFightUI = undefined;
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_PoolSystem = require("PoolSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_TowerSystem = require("TowerSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_TowerResultUI = require("TowerResultUI");
var r_TowerUI = require("TowerUI");
var exp_TowerFightUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Tower, r_UIDef.UIDef.Res.UI.TowerFightUI) || this;
    t.levelTime = 60;
    t.leftTime = 0;
    t.leftHp = 0;
    t.isFinishGame = false;
    t.atkBuff = 0;
    t.dianji = null;
    t.shouji = null;
    t.guangxiao = null;
    t.curBoss = null;
    t.curWeapon = null;
    t.weaponCfg = null;
    t.weaponInfo = null;
    t.boxList = [];
    t.isPlayAnim = false;
    t.leftOpenNum = 0;
    t.startAnim = null;
    t.endAnim = null;
    t.timeout = 5;
    t.challengeTimeout = "challengeTimeout";
    t.poolKey = "TowerFightNumKey";
    t.poolCritKey = "TowerFightCritNumKey";
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
    this.show(r_UIDef.UIDef.Urls.UI.TowerFightUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TowerFightUI);
  };
  _ctor.restart = function () {
    this.Inst.startGame();
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickHide, this);
    for (var o = 1; o <= 3; o++) {
      this.boxList.push(this.contentPane.getChild("box" + o));
      this.registBoxTouch(this.boxList[o - 1], o);
    }
    this.registTouch();
    r_PoolSystem.PoolSystem.createUIObjPool(this.poolKey, "ui://" + r_UIDef.UIDef.Pack.MainHome + "/damageNum", 1, this.numRoot);
    setTimeout(function () {
      r_PoolSystem.PoolSystem.createUIObjPool(t.poolCritKey, "ui://" + r_UIDef.UIDef.Pack.Tower + "/critNum", 1, t.numRoot);
    }, 100);
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tower/jian", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      i.zIndex = 10;
      t.centerNode.node.addChild(i);
      i.y = -300;
      t.curWeapon = i.getComponent(sp.Skeleton);
      t.updateSkin();
      t.curWeapon.clearTracks();
    });
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tower/guangxiao", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.centerNode.node.addChild(i);
      t.guangxiao = i;
      t.guangxiao.active = false;
      t.guangxiao.zIndex = 10;
    });
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tower/dianji", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.centerNode.node.addChild(i);
      t.dianji = i;
      t.dianji.active = false;
      t.dianji.zIndex = 10;
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "challenge/KSTZ", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      i.zIndex = 20;
      t.centerNode.node.addChild(i);
      t.startAnim = i.getComponent(sp.Skeleton);
      i.active = false;
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "challenge/TZJS", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.animPos.node.addChild(i);
      t.endAnim = i.getComponent(sp.Skeleton);
      i.active = false;
    });
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tower/shouji", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.centerNode.node.addChild(i);
      t.shouji = i;
      t.shouji.x = 0;
      t.shouji.y = -200;
      t.shouji.zIndex = 9;
    });
  };
  _ctor.prototype.registBoxTouch = function (e) {
    var t = this;
    e.visible = false;
    e.node.startX = e.node.x;
    e.node.startY = e.node.y;
    e.clearClick();
    e.onClick(function () {
      t.isPlayAnim || 1 != e.getController("mode").selectedIndex && (t.guangxiao && (t.guangxiao.parent = e.node, t.guangxiao.x = 0, t.guangxiao.y = 0, t.guangxiao.active = true, t.guangxiao.getComponent(sp.Skeleton).setAnimation(0, "animation", false)), r_SoundMgr.SoundMgr.playSound("tower/打开宝箱"), t.isPlayAnim = true, e.getController("mode").selectedIndex = 1, cc.Tween.stopAllByTarget(e.node), e.node.scale = .8, r_TimeSystem.TimeSystem.scheduleOnce("FightWin", 1, function () {
        t.isPlayAnim = false;
        t.guangxiao && (t.guangxiao.active = false);
        t.leftOpenNum = t.leftOpenNum - 1;
        r_TowerResultUI.TowerResultUI.showUI({
          isWin: true,
          towerCfg: t.towerCfg,
          leftOpenNum: t.leftOpenNum
        });
      }));
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    var o = r_TowerSystem.TowerSystem.getCurWeapon();
    this.weaponCfg = r_WeaponSystem.WeaponSystem.GetWeaponInfo(o);
    this.weaponInfo = r_WeaponSystem.WeaponSystem.GetMyWeapon(this.weaponCfg.id);
    var i = r_TowerSystem.TowerSystem.getTowerCfg(this.data.index);
    var n = "tower/bg/1";
    i.icon1 && (n = i.icon1);
    r_ResSystem.ResSystem.loadBundleFguiImg(this.bg, "bdWeaponForge", n);
    var a = r_WeaponSystem.WeaponSystem.GetWpPetInfo(r_PlayerData.PlayerData.data.weapon.pet[0].id).atkBuffInfo;
    this.atkBuff = r_WeaponSystem.WeaponSystem.GetWpPetLvInfo(a).num[r_PlayerData.PlayerData.data.weapon.pet[0].lv] || 0;
    this.towerCfg = i;
    this.startGame();
    r_TimeSystem.TimeSystem.registSecondUpdate("towerFight", this.updateSecond.bind(this));
    r_SoundMgr.SoundMgr.playMusic("tower/战斗时背景音乐");
    r_PlatformSystem.PlatformSystem.report("tower_jinru", {
      num: i.id + ""
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.unregistSecondUpdate("towerFight");
    r_TimeSystem.TimeSystem.scheduleClear("towerDianji");
    r_SoundMgr.SoundMgr.playMusic("bgm");
  };
  _ctor.prototype.startGame = function () {
    var e = this;
    this.tipQuick.visible = false;
    var t = this.towerCfg;
    this.leftHp = t.hp;
    this.dropCfg = r_TowerSystem.TowerSystem.getDropCfg(t.drop);
    this.lbName.text = t.name;
    this.updateSkin();
    for (var o = 0; o < 3; o++) {
      this.boxList[o].visible = false;
    }
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tower/enemy/guaiwu_" + this.data.index, cc.Prefab, function (o, i) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, i);
      if (e.curBoss) {
        e.curBoss.destroy();
        e.curBoss = null;
      }
      var n = cc.instantiate(i);
      e.centerNode.node.addChild(n);
      e.curBoss = n;
      e.curBoss.y = t.fightY;
      e.curBoss.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
      e.curBoss.getChildByName("anim1") && e.curBoss.getChildByName("anim1").getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
    });
    this.tipBox.visible = false;
    this.isFinishGame = false;
    this.leftTime = this.levelTime;
    this.refreshTime();
    this.isPlayAnim = false;
    this.refreshProgress();
    this.startAnim && (this.startAnim.node.active = false);
    this.endAnim && (this.endAnim.node.active = false);
    this.showBossCome();
  };
  _ctor.prototype.onClickHide = function () {
    if (this.isPlayAnim) {
      r_UtilsSystem.UtilsSystem.showTip("播放动画中,请稍后");
    } else {
      17 == this.towerCfg.id && r_TowerUI.TowerUI.Inst && r_TowerUI.TowerUI.Inst.showDefeatLevel17Reward();
      this.hide();
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    var t = this.bg;
    var o = 0;
    t.off(fgui.Event.TOUCH_BEGIN);
    t.on(fgui.Event.TOUCH_BEGIN, function (t) {
      if (!(e.isPlayAnim || o > 0)) {
        o += 1;
        t.touchId;
        t.captureTouch();
        e.attack();
        console.log("点击");
      }
    }, this);
    t.off(fgui.Event.TOUCH_END);
    t.on(fgui.Event.TOUCH_END, function () {
      (o -= 1) < 0 && (o = 0);
    });
  };
  _ctor.prototype.updateSkin = function () {
    this.weaponCfg && this.curWeapon && this.curWeapon.setSkin(r_WeaponSystem.WeaponSystem.GetWeaponInfo(this.weaponCfg.name).skin);
  };
  _ctor.prototype.refreshProgress = function () {
    this.progress.value = this.leftHp / this.towerCfg.hp * 100;
    this.progressNum.text = this.leftHp + "/" + this.towerCfg.hp;
  };
  _ctor.prototype.attack = function () {
    var e = this;
    if (!this.isFinishGame) {
      var t = r_WeaponSystem.WeaponSystem.GetAtk(this.weaponCfg.id);
      var o = false;
      if (r_UtilsSystem.UtilsSystem.getRandomNum(1, 100) < this.weaponInfo.pCrit) {
        t += Math.floor(t * this.weaponInfo.pFack / 100);
        o = true;
      }
      this.showDamageNum(t, o);
      if (this.curBoss) {
        var i = r_UtilsSystem.UtilsSystem.getRandomNum(1, 2);
        var n = this.curBoss.getChildByName("anim1");
        if (n) {
          var a = n.getComponent(sp.Skeleton).setAnimation(0, "shouji_" + i, false);
          n.getComponent(sp.Skeleton).setTrackCompleteListener(a, function () {
            n.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
          });
        } else {
          a = this.curBoss.getComponent(sp.Skeleton).setAnimation(0, "shouji_" + i, false);
          this.curBoss.getComponent(sp.Skeleton).setTrackCompleteListener(a, function () {
            e.curBoss.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
          });
        }
      }
      if (this.curWeapon) {
        var s = r_UtilsSystem.UtilsSystem.getRandomNum(1, 2);
        this.curWeapon.setAnimation(0, "gongji_" + s, false);
        r_SoundMgr.SoundMgr.playSound("tower/武器挥砍音效" + s);
      }
      if (this.shouji) {
        var r = r_UtilsSystem.UtilsSystem.getRandomNum(1, 2);
        this.shouji.getComponent(sp.Skeleton).setAnimation(0, "shouji_" + r, false);
      }
      this.leftHp = this.leftHp - t;
      if (this.leftHp <= 0) {
        this.leftHp = 0;
        this.gameWin();
      }
      this.refreshProgress();
    }
  };
  _ctor.prototype.gameWin = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("tower/怪物死亡");
    this.isFinishGame = true;
    r_TowerSystem.TowerSystem.passTower(this.towerCfg);
    this.dianji && (this.dianji.active = false);
    if (this.data.noFromTower) {
      this.data.winCallback && this.data.winCallback();
      cc.tween(this.curBoss).to(1, {
        opacity: 0
      }).call(function () {
        r_TowerResultUI.TowerResultUI.showUI({
          isWin: true,
          towerCfg: e.towerCfg,
          noFromTower: e.data.noFromTower,
          report: e.data.report
        });
      }).start();
    } else {
      cc.tween(this.curBoss).to(1, {
        opacity: 0
      }).call(function () {
        var t = 2;
        r_UtilsSystem.UtilsSystem.getWeight([5, 5]) && (t = 3);
        e.leftOpenNum = t;
        e.tipBox.visible = true;
        r_SoundMgr.SoundMgr.playSound("tower/宝箱出现");
        e.isPlayAnim = true;
        var o = function (t) {
          e.boxList[t].visible = true;
          e.boxList[t].getController("mode").selectedIndex = 0;
          var o = e.boxList[t].node;
          o.x = e.centerNode.node.x;
          o.y = e.centerNode.node.y + 100;
          o.angle = 0;
          o.scale = .8;
          cc.tween(o).to(.5, {
            x: o.startX,
            y: o.startY,
            angle: 720
          }, {
            easing: null
          }).call(function () {
            e.isPlayAnim = false;
            var t = cc.tween().to(.5, {
              scale: 1
            }).to(.5, {
              scale: .8
            });
            cc.Tween.stopAllByTarget(o);
            cc.tween(o).repeatForever(t).start();
          }).start();
        };
        for (var i = 0; i < t; i++) {
          o(i);
        }
      }).start();
    }
  };
  _ctor.prototype.updateSecond = function () {
    if (!(this.isPlayAnim || this.isFinishGame)) {
      this.leftTime = this.leftTime - 1;
      if (this.leftTime <= 0) {
        this.leftTime = 0;
        this.isFinishGame = true;
        this.showEndAnim({
          isWin: false,
          level: this.data.index,
          noFromTower: this.data.noFromTower
        });
      }
      this.refreshTime();
    }
  };
  _ctor.prototype.refreshTime = function () {
    this.time.text = "剩余时间：" + this.leftTime + "秒";
  };
  _ctor.prototype.showBossCome = function () {
    var e = this;
    this.timeoutCom.visible = false;
    this.isPlayAnim = true;
    this.tipBoss.visible = true;
    cc.Tween.stopAllByTarget(this.tipBoss.node);
    cc.tween(this.tipBoss.node).delay(1).call(function () {
      e.tipBoss.visible = false;
      e.startTimeout();
    }).start();
  };
  _ctor.prototype.startTimeout = function () {
    this.timeoutCom.visible = true;
    this.timeout = 3;
    this.timeoutTxt.text = this.timeout.toString();
    this.timeoutCom.getController("state").selectedIndex = 0;
    r_TimeSystem.TimeSystem.registSecondUpdate(this.challengeTimeout, this.timeoutSecondUpdate.bind(this), 1);
  };
  _ctor.prototype.timeoutSecondUpdate = function () {
    this.timeout--;
    this.timeout <= 0 && this.showStartAnim();
    this.timeoutTxt.text = this.timeout.toString();
    this.timeoutTxt.scaleX = this.timeoutTxt.scaleY = 0;
    cc.tween(this.timeoutTxt).to(.3, {
      scaleX: 1,
      scaleY: 1
    }).start();
  };
  _ctor.prototype.showStartAnim = function () {
    var e = this;
    this.timeoutCom.visible = false;
    r_TimeSystem.TimeSystem.unregistSecondUpdate(this.challengeTimeout);
    if (this.startAnim) {
      r_SoundMgr.SoundMgr.playSound("tower/挑战开始音效");
      this.startAnim.node.active = true;
      this.startAnim.setTrackCompleteListener(this.startAnim.setAnimation(0, "animation", false), function () {
        e.startChallenge();
      });
    } else {
      this.startChallenge();
    }
  };
  _ctor.prototype.showEndAnim = function (e) {
    r_SoundMgr.SoundMgr.stopMusic();
    this.timeoutCom.visible = true;
    this.timeoutCom.getController("state").selectedIndex = 1;
    if (this.endAnim) {
      this.endAnim.node.active = true;
      this.endAnim.setTrackCompleteListener(this.endAnim.setAnimation(0, "animation", false), function () {
        r_TowerResultUI.TowerResultUI.showUI(e);
      });
    }
  };
  _ctor.prototype.startChallenge = function () {
    var e = this;
    this.isPlayAnim = false;
    r_TimeSystem.TimeSystem.scheduleOnce("towerDianji", .5, function () {
      if (!e.isFinishGame) {
        e.dianji && (e.dianji.active = true);
        e.tipQuick.visible = true;
        r_TimeSystem.TimeSystem.scheduleOnce("towerDianji", 3, function () {
          e.dianji && (e.dianji.active = false);
          e.tipQuick.visible = false;
        });
      }
    });
  };
  _ctor.prototype.showDamageNum = function (e, t) {
    var o = this.poolKey;
    t && (o = this.poolCritKey);
    var i = r_PoolSystem.PoolSystem.createObj(o);
    i.getChild("content").text = t ? "_" + e : "-" + e;
    i.x = 0;
    i.y = 0;
    i.alpha = 1;
    r_TimeSystem.TimeSystem.timeUpdate(1, function (e) {
      i.y = -200 * e;
      i.alpha = 1 - e;
      1 == e && r_PoolSystem.PoolSystem.revert(o, i);
    });
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("centerNode")], _ctor.prototype, "centerNode", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbName")], _ctor.prototype, "lbName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("time")], _ctor.prototype, "time", undefined);
  __decorate([r_DecorateFunction1.AutoFind("progress")], _ctor.prototype, "progress", undefined);
  __decorate([r_DecorateFunction1.AutoFind("progressNum")], _ctor.prototype, "progressNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bg")], _ctor.prototype, "bg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("tipBoss")], _ctor.prototype, "tipBoss", undefined);
  __decorate([r_DecorateFunction1.AutoFind("tipQuick")], _ctor.prototype, "tipQuick", undefined);
  __decorate([r_DecorateFunction1.AutoFind("tipBox")], _ctor.prototype, "tipBox", undefined);
  __decorate([r_DecorateFunction1.AutoFind("numRoot")], _ctor.prototype, "numRoot", undefined);
  __decorate([r_DecorateFunction1.AutoFind("timeoutCom")], _ctor.prototype, "timeoutCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("timeoutCom/timeout")], _ctor.prototype, "timeoutTxt", undefined);
  __decorate([r_DecorateFunction1.AutoFind("timeoutCom/animPos")], _ctor.prototype, "animPos", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.TowerFightUI = exp_TowerFightUI;