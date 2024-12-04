var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitLogic = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_BitCfg = require("BitCfg");
var r_SoundMgr = require("SoundMgr");
var r_EffectsCom = require("EffectsCom");
var r_BitCamera = require("BitCamera");
var r_BitFuel = require("BitFuel");
var r_BitLimitRule = require("BitLimitRule");
var r_BitProgressBar = require("BitProgressBar");
var r_BitPropMgr = require("BitPropMgr");
var r_BitResultData = require("BitResultData");
var r_BitTipUI = require("BitTipUI");
var r_Joystick = require("Joystick");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_BitLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bitIcon = null;
    t.grapbg = null;
    t.grapCom = null;
    t.grapRanliao = null;
    t.joystick = null;
    t.bitPropMgr = null;
    t.bitPro = null;
    t.mapBottom = null;
    t.endPro = null;
    t.endPoint = null;
    t.mapSp = null;
    t.mapSf = [];
    t.m_moveSpeed = 80;
    t.m_angleSeed = 270;
    t.m_targetAngle = 0;
    t.stepAngle = null;
    t.fuel = new r_BitFuel.default();
    t.isMove = true;
    t.m_isGame = false;
    t.m_isSubSpeed = false;
    t.m_subSpeed = 100;
    t.m_isAddSpeed = false;
    t.m_addSpeed = 100;
    t.m_isEnd = false;
    t.m_isPause = false;
    t.m_maps = [];
    t.m_currTime = -1;
    t.isZhengxu = true;
    t.pathPoints = [];
    t.m_tempPathList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.bitLimitRule = new r_BitLimitRule.default(this.bitIcon, this.mapBottom);
  };
  _ctor.prototype.onEnable = function () {
    var e = this;
    this.joystick.node.on(r_Joystick.default.START, function () {
      console.log("触摸开始");
    });
    this.joystick.node.on(r_Joystick.default.MOVE, function (t) {
      e.m_targetAngle = t - 90;
      e.stepAngle = null;
    });
    this.joystick.node.on(r_Joystick.default.END, function () {
      console.log("触摸结束");
    });
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.bitPropHit, this.onHitProp, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.bitFighting, this.onBitFighting, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.bitPause, this.onBitPause, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.bitAgain, this.onBitAgain, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.bitGameOver, this.gameStop, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.bitChangeHead, this.onBitChangeHead, this);
  };
  _ctor.prototype.onDisable = function () {
    this.joystick.node.off(r_Joystick.default.START);
    this.joystick.node.off(r_Joystick.default.MOVE);
    this.joystick.node.off(r_Joystick.default.END);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.bitPropHit, this.onHitProp, this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.bitFighting, this.onBitFighting, this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.bitPause, this.onBitPause, this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.bitAgain, this.onBitAgain, this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.bitGameOver, this.gameStop, this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.bitChangeHead, this.onBitChangeHead, this);
    this.joystick.stop();
  };
  _ctor.prototype.start = function () {
    this.gameReady();
  };
  _ctor.prototype.gameReady = function () {
    this.grapbg.clear();
    this.grapCom.clear();
    this.grapbg.moveTo(0, 0);
    this.grapCom.moveTo();
    this.grapRanliao.clear();
    this.bitIcon.angle = -180;
    this.bitIcon.setPosition(0, -80);
    this.m_targetAngle = -180;
    this.stepAngle = null;
    this.fuel.init();
    this.pathPoints = [];
    this.camera.init();
    r_BitResultData.BitResultData.init();
    this.bitPropMgr.init();
    this.randomMap();
    this.bitPro.value = 1;
    this.bitPro.node.active = false;
    this.m_isSubSpeed = false;
    this.m_isAddSpeed = false;
    var e = r_UtilsSystem.UtilsSystem.getRandomNum(101, 104);
    this.m_doorData = r_BitCfg.BitPropConfig[e];
    this.mapSp.spriteFrame = this.mapSf[e - 101];
    this.doorAnim.setAnimation(0, "animation", false);
    this.doorAnim.timeScale = 0;
    this.endPro.progress = 1;
    this.bitIcon.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
    this.onBitChangeHead();
  };
  _ctor.prototype.randomMap = function () {
    var e = this;
    if (this.m_maps.length < 20) {
      for (var t = 0; t < 20; t++) {
        r_ResSystem.ResSystem.loadBundleRes("game1", "bit/bitMap" + t, cc.Prefab, function (t, o) {
          e.m_maps.push(o);
          e.addMap();
        });
      }
    } else {
      this.addMap();
    }
  };
  _ctor.prototype.addMap = function () {
    if (20 == this.m_maps.length) {
      this.m_maps.sort(function () {
        return Math.random() - .5;
      });
      for (var e = 0; e < 8; e++) {
        var t = this.m_maps[e];
        var o = cc.instantiate(t);
        this.bitPropMgr.addPrefab(o);
      }
    }
  };
  _ctor.prototype.gameStart = function () {
    var e = this;
    this.camera.setScale(.9);
    r_SoundMgr.SoundMgr.playMusic("bit/bitBgm");
    this.scheduleOnce(function () {
      e.gameInit();
    }, .7);
  };
  _ctor.prototype.gameInit = function () {
    this.fuel.isLoss = true;
    this.m_isGame = true;
    this.m_isPause = false;
    this.bitPro.node.active = true;
    this.bitPro.value = 1;
    this.m_isEnd = false;
    this.m_moveSpeed = r_BitCfg.BitLeveMoveSpeed[r_PlayerData.PlayerData.data.bitLeveMoveSpeed].moveSpeed;
    this.fuel.subNum = r_BitCfg.BitLeveOilLoss[r_PlayerData.PlayerData.data.bitLeveOilLoss].oilLoss;
    this.joystick.startTake();
  };
  _ctor.prototype.onBitChangeHead = function () {
    this.bitIcon.getComponent(sp.Skeleton).setSkin(r_PlayerData.PlayerData.data.bitHead + "");
  };
  _ctor.prototype.lateUpdate = function (e) {
    if (!this.m_isEnd && this.m_isGame && !this.m_isPause) {
      if (this.fuel.fuel <= 0) {
        console.log("打开没油了界面: ", this.fuel.fuel, this.fuel.fuel <= 0);
        return void this.openUI(r_BitTipUI.BitTipUI, r_BitCfg.BitPropConfig[999]);
      }
      var t = Date.now();
      -1 == this.m_currTime && (this.m_currTime = t);
      var o = e * this.m_moveSpeed;
      this.m_isSubSpeed && 2 == r_PlayerData.PlayerData.data.bitHead && (o = e * (this.m_moveSpeed - this.m_subSpeed));
      this.m_isAddSpeed && (o = e * (this.m_moveSpeed + this.m_addSpeed));
      var i = this.bitIcon.angle;
      var n = this.m_angleSeed * e;
      var a = this.minAngle(this.bitIcon.angle, this.m_targetAngle);
      null == this.stepAngle && (this.stepAngle = a.co ? -n : n);
      i = Math.abs(a.dif) > Math.abs(this.stepAngle) + 1 ? this.stepAngle + this.bitIcon.angle : this.m_targetAngle;
      this.isMove && this.move(i, o, this.bitIcon);
      this.bitPro.value = -this.bitIcon.y / this.node.getChildByName("bg").height;
      r_BitResultData.BitResultData.dis = this.bitPro.dis;
      this.showFuel(e);
      this.bitIcon.angle = i;
      this.bitPropMgr.clickHit(this.bitIcon.getChildByName("point"));
      this.bitPropMgr.showProp(this.bitIcon);
    }
  };
  _ctor.prototype.minAngle = function (e, t) {
    var o = this.change360(this.change180(e));
    var i = this.change360(this.change180(t)) - o;
    var n = true;
    if (i > 180) {
      i = 360 - i;
      n = false;
    } else if (i < -180) {
      i = 360 + i;
      n = true;
    } else {
      n = i >= 0;
    }
    return {
      co: n,
      dif: i
    };
  };
  _ctor.prototype.change180 = function (e) {
    return e + 90;
  };
  _ctor.prototype.change360 = function (e) {
    if (e < 0) {
      e = -e;
    } else {
      e > 0 && (e = 360 - e);
    }
    return e % 360;
  };
  _ctor.prototype.quat = function (e) {
    if (e < 0 && e >= -90) {
      return 1;
    } else if (e < -90 && e >= -180) {
      return 2;
    } else if (e < -180 && e >= -270) {
      return 3;
    } else if (e <= 90 && e >= 0) {
      return 4;
    } else {
      return undefined;
    }
  };
  _ctor.prototype.move = function (e, t, o) {
    var i = this;
    var n = Date.now();
    var a = cc.misc.degreesToRadians(e);
    var s = cc.v2(0, t).rotate(-a);
    var r = cc.v2(o.getPosition().x - s.x, o.getPosition().y + s.y);
    if (this.bitLimitRule.checkLimit(r, -s.x, s.y)) {
      if (this.bitLimitRule.checkHitDoor(cc.v2(-s.x, s.y), this.endPoint)) {
        if (this.endPro.progress <= 0) {
          this.gameStop();
          this.doorAnim.timeScale = 1;
          this.doorAnim.setAnimation(0, "animation", false);
          this.camera.lookAni();
          r_SoundMgr.SoundMgr.stopSound("bit/开始钻头");
          this.bitIcon.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
          return void this.scheduleOnce(function () {
            i.openUI(r_BitTipUI.BitTipUI, i.m_doorData);
          }, 2.2);
        } else {
          if ("gongji" != this.bitIcon.getComponent(sp.Skeleton).animation) {
            this.bitIcon.getComponent(sp.Skeleton).setAnimation(0, "gongji", true);
            r_SoundMgr.SoundMgr.playSound("bit/开始钻头", true);
          }
          return void (this.endPro.progress -= .003);
        }
      }
      if ("daiji" != this.bitIcon.getComponent(sp.Skeleton).animation) {
        this.bitIcon.getComponent(sp.Skeleton).setAnimation(0, "daiji", true);
        r_SoundMgr.SoundMgr.stopSound("bit/开始钻头");
      }
      this.pathPoints.push(r);
      this.draw(o.getPosition(), r, this.grapCom);
      this.draw(o.getPosition(), r, this.grapbg);
      o.setPosition(r);
      if (n - this.m_currTime >= 100) {
        this.camera.pushPathList(r);
        this.m_currTime = n;
      }
      this.camera.move(r);
    }
  };
  _ctor.prototype.draw = function (e, t, o) {
    o.moveTo(e.x, e.y);
    o.lineTo(t.x, t.y);
    o.stroke();
  };
  _ctor.prototype.showFuel = function (e) {
    e > .1 && (e = .0165);
    this.m_tempPathList = [];
    var t = 0;
    for (var o = this.pathPoints.length - 1; o >= 1; o--) {
      if (!((t += cc.Vec2.distance(this.pathPoints[o], this.pathPoints[o - 1])) <= this.fuel.len)) {
        this.draw2(this.m_tempPathList);
        return void this.fuel.subFuel(e);
      }
      this.m_tempPathList.push(this.pathPoints[o]);
    }
    this.draw2(this.m_tempPathList);
    this.fuel.subFuel(e);
  };
  _ctor.prototype.draw2 = function () {
    this.grapRanliao.clear();
    if (0 != this.m_tempPathList.length) {
      var e = this.m_tempPathList.length;
      this.grapRanliao.moveTo(this.m_tempPathList[e - 1].x, this.m_tempPathList[e - 1].y);
      for (var t = e - 2; t >= 0; t--) {
        var o = this.m_tempPathList[t];
        this.grapRanliao.lineTo(o.x, o.y);
        this.grapRanliao.stroke();
      }
    }
  };
  _ctor.prototype.onHitProp = function (e) {
    return __awaiter(this, undefined, undefined, function () {
      var t;
      var o = this;
      return __generator(this, function () {
        if (this.fuel.fuel <= 0) {
          return [2];
        } else if (this.isMove) {
          this["setEvent_" + (t = e.data).data.type](t);
          t.data.shoot && this.scheduleOnce(function () {
            o.openUI(r_BitTipUI.BitTipUI, t.data);
          }, t.data.waitTime);
          return [2];
        } else {
          return [2];
        }
      });
    });
  };
  _ctor.prototype.setEvent_0 = function (e) {
    var t = this.fuel.fuel + e.data.count;
    cc.tween(this.fuel).to(.4, {
      m_fuel: t
    }).start();
    e.node.getComponent(sp.Skeleton).setAnimation(0, "xiaoshi", false);
    e.node.getComponent(sp.Skeleton).timeScale = 1;
  };
  _ctor.prototype.setEvent_1 = function (e) {
    var t = this;
    if (e.node.getComponent(sp.Skeleton)) {
      e.node.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
      e.node.getComponent(sp.Skeleton).timeScale = 1;
      e.node.getComponent(sp.Skeleton).setCompleteListener(function () {
        e.node.active = false;
      });
    } else {
      e.node.active = false;
    }
    this.m_isSubSpeed = true;
    this.m_subSpeed = e.data.count;
    this.scheduleOnce(function () {
      t.m_isSubSpeed = false;
    }, e.data.time);
  };
  _ctor.prototype.setEvent_2 = function (e) {
    this.gameStop();
    var t = e.node;
    t.children[0].getComponent(sp.Skeleton).setAnimation(0, "animation", false);
    r_SoundMgr.SoundMgr.playSound("bit/爆炸");
    this.scheduleOnce(function () {
      t.active = false;
    }, .5);
  };
  _ctor.prototype.setEvent_4 = function (e) {
    if (e.node.getComponent(sp.Skeleton)) {
      e.node.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
      e.node.getComponent(sp.Skeleton).timeScale = 1;
      e.node.getComponent(sp.Skeleton).setCompleteListener(function () {
        e.node.active = false;
      });
    } else if (5002 == e.data.id) {
      e.node.getComponent(cc.Sprite).spriteFrame = this.laji;
      this.scheduleOnce(function () {
        e.node.active = false;
      }, 1);
    } else {
      e.node.active = false;
    }
    5001 == e.data.id && r_SoundMgr.SoundMgr.playSound("bit/水管破损");
  };
  _ctor.prototype.setEvent_5 = function (e) {
    e.node.active = false;
  };
  _ctor.prototype.setEvent_6 = function (e) {
    var t = this;
    e.node.active = false;
    this.isMove = false;
    this.bitIcon.getComponent(sp.Skeleton).setAnimation(0, "she", true);
    this.scheduleOnce(function () {
      t.isMove = true;
    }, e.data.time);
  };
  _ctor.prototype.setEvent_7 = function (e) {
    e.node.active = false;
    r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_Bian_FU, true);
    this.scheduleOnce(function () {
      r_EffectsCom.default.instace.deft();
    }, e.data.time);
  };
  _ctor.prototype.setEvent_8 = function (e) {
    var t = this;
    e.node.active = false;
    this.m_isAddSpeed = true;
    this.m_addSpeed = e.data.count;
    this.walitFunction = function () {
      t.scheduleOnce(function () {
        t.m_isAddSpeed = false;
      }, e.data.time);
    };
  };
  _ctor.prototype.setEvent_9 = function (e) {
    var t = this;
    e.node.active = false;
    this.fuel.subNum = 0;
    this.walitFunction = function () {
      t.scheduleOnce(function () {
        t.fuel.subNum = r_BitCfg.BitLeveOilLoss[r_PlayerData.PlayerData.data.bitLeveOilLoss].oilLoss;
      }, e.data.time);
    };
  };
  _ctor.prototype.onBitFighting = function () {
    this.fuel.fuel = 100;
    console.log("加油");
  };
  _ctor.prototype.onBitPause = function () {
    this.resumeGame();
  };
  _ctor.prototype.onBitAgain = function () {
    this.camera.endAni();
    this.gameReady();
  };
  _ctor.prototype.gameStop = function () {
    this.m_isEnd = true;
    this.m_isGame = false;
    this.joystick.stop();
  };
  _ctor.prototype.openUI = function (e, t) {
    e.showUI(t);
    this.m_isPause = true;
    this.pauseGame();
    2 == t.shootType && r_SoundMgr.SoundMgr.playSound("bit/失败界面弹出");
    0 == t.shootType && r_SoundMgr.SoundMgr.playSound("bit/奖励弹窗弹出");
  };
  _ctor.prototype.pauseGame = function () {
    this.m_isPause = true;
  };
  _ctor.prototype.resumeGame = function () {
    this.m_isPause = false;
    console.log("恢复暂停：", this.fuel.fuel);
    if (this.walitFunction) {
      this.walitFunction.call(this);
      this.walitFunction = null;
    }
  };
  _ctor.prototype.onDestroy = function () {};
  __decorate([_property(cc.Node)], _ctor.prototype, "bitIcon", undefined);
  __decorate([_property(cc.Graphics)], _ctor.prototype, "grapbg", undefined);
  __decorate([_property(cc.Graphics)], _ctor.prototype, "grapCom", undefined);
  __decorate([_property(cc.Graphics)], _ctor.prototype, "grapRanliao", undefined);
  __decorate([_property(r_BitCamera.default)], _ctor.prototype, "camera", undefined);
  __decorate([_property(r_Joystick.default)], _ctor.prototype, "joystick", undefined);
  __decorate([_property(r_BitPropMgr.default)], _ctor.prototype, "bitPropMgr", undefined);
  __decorate([_property(r_BitProgressBar.default)], _ctor.prototype, "bitPro", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "mapBottom", undefined);
  __decorate([_property(cc.ProgressBar)], _ctor.prototype, "endPro", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "endPoint", undefined);
  __decorate([_property(cc.Sprite)], _ctor.prototype, "mapSp", undefined);
  __decorate([_property([cc.SpriteFrame])], _ctor.prototype, "mapSf", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "doorAnim", undefined);
  __decorate([_property(cc.SpriteFrame)], _ctor.prototype, "laji", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.BitLogic = exp_BitLogic;