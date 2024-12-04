var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AetherGameCom = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_EffectsCom = require("EffectsCom");
var r_BitFuel = require("BitFuel");
var r_AetherLimitRule = require("AetherLimitRule");
var r_BitResultData = require("BitResultData");
var r_Joystick = require("Joystick");
var r_AetherCamera = require("AetherCamera");
var r_AetherCfg = require("AetherCfg");
var r_AetherPropMgr = require("AetherPropMgr");
var r_AetherTipUI = require("AetherTipUI");
var r_AetherProgressBar = require("AetherProgressBar");
var r_AetherBuff = require("AetherBuff");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_AetherGameCom = function (e) {
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
    t.endPoint = null;
    t.buff = null;
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
    t.m_isProtect = false;
    t.m_initPos = cc.v2();
    t.m_maps = [];
    t.m_planetId = 0;
    t.m_currTime = -1;
    t.isZhengxu = true;
    t.pathPoints = [];
    t.m_tempPathList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.AetherLimitRule = new r_AetherLimitRule.default(this.bitIcon, this.mapBottom);
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
    this.bitIcon.getPosition(this.m_initPos);
  };
  _ctor.prototype.start = function () {
    this.gameReady();
  };
  _ctor.prototype.gameReady = function () {
    this.grapbg.clear();
    this.grapCom.clear();
    this.grapbg.moveTo(this.m_initPos.x, this.m_initPos.y);
    this.grapCom.moveTo();
    this.grapRanliao.clear();
    this.bitIcon.angle = 0;
    this.bitIcon.setPosition(this.m_initPos);
    this.m_targetAngle = 0;
    this.stepAngle = null;
    this.fuel.init();
    this.pathPoints = [];
    this.camera.init();
    this.bitIcon.active = false;
    r_BitResultData.BitResultData.init();
    this.bitPropMgr.init();
    this.randomMap();
    this.buff.init();
    this.bitPro.value = 0;
    this.bitPro.node.active = false;
    this.m_isSubSpeed = false;
    this.m_isAddSpeed = false;
    this.m_isGame = false;
  };
  _ctor.prototype.randomMap = function () {
    var e = this;
    if (this.m_maps.length < 20) {
      for (var t = 0; t < 20; t++) {
        r_ResSystem.ResSystem.loadBundleRes("game4", "aether/bitMap" + t, cc.Prefab, function (t, o) {
          e.m_maps.push(o);
          e.addMap();
        });
      }
    } else {
      this.addMap();
    }
    console.log("this.m_maps: ", this.m_maps);
    this.setPlanetCfg();
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
  _ctor.prototype.setPlanetCfg = function () {
    var e = this;
    var t = r_UtilsSystem.UtilsSystem.getRandomNum(0, r_AetherCfg.AetherPlanetCfg.length - 1);
    this.m_planetId = r_AetherCfg.AetherPlanetCfg[t];
    r_ResSystem.ResSystem.loadBundleRes("game4", "aether/plane_" + this.m_planetId, cc.Prefab, function (t, o) {
      var i = cc.instantiate(o);
      e.endPoint.destroyAllChildren();
      e.endPoint.addChild(i);
      e.bitPropMgr.pushProp(i);
    });
  };
  _ctor.prototype.setBitAction = function (e) {
    this.bitIcon.active = e;
  };
  _ctor.prototype.gameStart = function () {
    var e = this;
    this.camera.setScale(.9);
    this.bitIcon.active = true;
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
    this.bitPro.value = 0;
    this.m_isEnd = false;
    this.m_moveSpeed = r_AetherCfg.AetherLeveMoveSpeed[r_PlayerData.PlayerData.data.aetherLeveMoveSpeed].moveSpeed;
    this.fuel.subNum = r_AetherCfg.AetherLeveOilLoss[r_PlayerData.PlayerData.data.aetherLeveOilLoss].oilLoss;
    this.joystick.startTake();
  };
  _ctor.prototype.lateUpdate = function (e) {
    if (!this.m_isEnd && this.m_isGame && !this.m_isPause) {
      if (this.fuel.fuel <= 0) {
        console.log("打开没油了界面: ", this.fuel.fuel, this.fuel.fuel <= 0);
        return void this.openUI(r_AetherTipUI.AetherTipUI, r_AetherCfg.AetherPropCfg[999]);
      }
      var t = Date.now();
      -1 == this.m_currTime && (this.m_currTime = t);
      var o = e * this.m_moveSpeed;
      this.m_isSubSpeed && !this.m_isProtect && (o = e * (this.m_moveSpeed - this.m_subSpeed));
      this.m_isAddSpeed && (o = e * (this.m_moveSpeed + this.m_addSpeed));
      var i = this.bitIcon.angle;
      var n = this.m_angleSeed * e;
      var a = this.minAngle(this.bitIcon.angle, this.m_targetAngle);
      null == this.stepAngle && (this.stepAngle = a.co ? -n : n);
      i = Math.abs(a.dif) > Math.abs(this.stepAngle) + 1 ? this.stepAngle + this.bitIcon.angle : this.m_targetAngle;
      this.isMove && this.bitPropMgr.checkMove(this.bitIcon.getChildByName("point")) && this.move(i, o, this.bitIcon);
      if (this.bitPropMgr.checkMove(this.bitIcon.getChildByName("point"))) {
        if (this.buff.hasBuff(r_AetherBuff.AetherBuffType.攻击)) {
          this.buff.clearBuff();
          r_SoundMgr.SoundMgr.stopSound("aether/开采石头");
        }
      } else if (!this.buff.hasBuff(r_AetherBuff.AetherBuffType.攻击)) {
        this.buff.addBuff({
          id: r_AetherBuff.AetherBuffType.攻击,
          time: 999
        });
        r_SoundMgr.SoundMgr.playSound("aether/开采石头", true);
      }
      this.bitPro.value = 1 - (this.bitIcon.y - this.m_initPos.y) / this.node.getChildByName("bg").height;
      r_BitResultData.BitResultData.dis = this.bitPro.dis;
      this.showFuel(e);
      this.bitIcon.angle = i;
      this.bitPropMgr.clickHit(this.bitIcon.getChildByName("point"));
      this.bitPropMgr.showProp(this.bitIcon);
      this.buff.updateTime(e);
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
    var i = Date.now();
    var n = cc.misc.degreesToRadians(e);
    var a = cc.v2(0, t).rotate(-n);
    var s = cc.v2(o.getPosition().x - a.x, o.getPosition().y + a.y);
    if (this.AetherLimitRule.checkLimit(s, -a.x, a.y)) {
      this.pathPoints.push(s);
      this.draw(o.getPosition(), s, this.grapCom);
      this.draw(o.getPosition(), s, this.grapbg);
      o.setPosition(s);
      if (i - this.m_currTime >= 100) {
        this.camera.pushPathList(s);
        this.m_currTime = i;
      }
      this.camera.move(s);
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
            o.openUI(r_AetherTipUI.AetherTipUI, t.data);
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
  };
  _ctor.prototype.setEvent_1 = function (e) {
    var t = this;
    if (!this.m_isProtect) {
      this.m_isSubSpeed = true;
      this.m_subSpeed = e.data.count;
      this.scheduleOnce(function () {
        t.m_isSubSpeed = false;
      }, e.data.time);
    }
  };
  _ctor.prototype.setEvent_2 = function () {
    this.gameStop();
  };
  _ctor.prototype.setEvent_4 = function () {};
  _ctor.prototype.setEvent_5 = function () {};
  _ctor.prototype.setEvent_6 = function (e) {
    var t = this;
    this.isMove = false;
    this.scheduleOnce(function () {
      t.isMove = true;
    }, e.data.time);
    this.buff.addBuff({
      id: r_AetherBuff.AetherBuffType.黑洞,
      time: e.data.time
    });
  };
  _ctor.prototype.setEvent_7 = function (e) {
    r_EffectsCom.default.instace.play(r_EffectsCom.default.PLAY_Bian_FU, true);
    this.scheduleOnce(function () {
      r_EffectsCom.default.instace.deft();
    }, e.data.time);
  };
  _ctor.prototype.setEvent_8 = function (e) {
    var t = this;
    this.m_isAddSpeed = true;
    this.m_addSpeed = e.data.count;
    this.walitFunction = function () {
      t.scheduleOnce(function () {
        t.m_isAddSpeed = false;
      }, e.data.time);
    };
    this.buff.addBuff({
      id: r_AetherBuff.AetherBuffType.加速,
      time: e.data.time
    });
  };
  _ctor.prototype.setEvent_9 = function (e) {
    var t = this;
    this.m_isProtect = true;
    this.walitFunction = function () {
      t.scheduleOnce(function () {
        t.m_isProtect = false;
      }, e.data.time);
    };
    this.buff.addBuff({
      id: r_AetherBuff.AetherBuffType.护盾,
      time: e.data.time
    });
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
    r_SoundMgr.SoundMgr.stopSound("aether/开采石头");
  };
  _ctor.prototype.resumeGame = function () {
    this.m_isPause = false;
    console.log("恢复暂停：", this.fuel.fuel);
    if (this.walitFunction) {
      this.walitFunction.call(this);
      this.walitFunction = null;
    }
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
    r_SoundMgr.SoundMgr.stopSound("aether/开采石头");
    this.joystick.stop();
  };
  __decorate([_property(cc.Node)], _ctor.prototype, "bitIcon", undefined);
  __decorate([_property(cc.Graphics)], _ctor.prototype, "grapbg", undefined);
  __decorate([_property(cc.Graphics)], _ctor.prototype, "grapCom", undefined);
  __decorate([_property(cc.Graphics)], _ctor.prototype, "grapRanliao", undefined);
  __decorate([_property(r_AetherCamera.default)], _ctor.prototype, "camera", undefined);
  __decorate([_property(r_Joystick.default)], _ctor.prototype, "joystick", undefined);
  __decorate([_property(r_AetherPropMgr.default)], _ctor.prototype, "bitPropMgr", undefined);
  __decorate([_property(r_AetherProgressBar.default)], _ctor.prototype, "bitPro", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "mapBottom", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "endPoint", undefined);
  __decorate([_property(r_AetherBuff.AetherBuff)], _ctor.prototype, "buff", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.AetherGameCom = exp_AetherGameCom;