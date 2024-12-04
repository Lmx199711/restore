var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_BottleCfg = require("BottleCfg");
var r_SoundMgr = require("SoundMgr");
var r_Joystick = require("Joystick");
var r_BottleIcon = require("BottleIcon");
var r_BottleResultUI = require("BottleResultUI");
var r_BottleUI = require("BottleUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_BottleCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bottleIcons = [];
    t.arrow = null;
    t.joystick = null;
    t.pro = null;
    t.textNode = null;
    t.initPonts = [];
    t.m_targetAngle = 0;
    t.m_tempAngle = 0;
    t.maxSpeed = 20;
    t.initSpeed = 0;
    t.addSpeed = .1;
    t.maxTime = 5;
    t.minPower = .2;
    t.effect = null;
    t.m_tempTime = 0;
    t.m_tick = null;
    t.m_isGame = false;
    t.m_isEffectTime = false;
    t.m_initSpeeds = [];
    t.m_angles = [0, -12, 12, -24, 24];
    t.m_isGunDong = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    var e = this;
    this.joystick.node.on(r_Joystick.default.START, function () {
      e.m_isGame && (e.m_isGunDong || (e.m_tick = Date.now(), e.arrow.active = true));
    });
    this.joystick.node.on(r_Joystick.default.MOVE, function (t) {
      e.m_isGame && (e.m_isGunDong || (e.m_targetAngle = t - 90));
    });
    this.joystick.node.on(r_Joystick.default.END, function () {
      if (e.m_isGame && !e.m_isGunDong) {
        if (e.pro.progress <= e.minPower) {
          e.ready();
        } else {
          e.m_tempTime = Date.now() - e.m_tick;
          e.joystick.stop();
          if (r_BottleUI.default.instance.roundNum % 3 != 0) {
            e.gunDong();
            return void e.initData();
          }
          r_SoundMgr.SoundMgr.playSound("bottle/huoshao");
          e.effect.node.active = true;
          e.effect.setAnimation(0, "animation", false);
          e.m_isEffectTime = true;
          e.effect.setCompleteListener(function () {
            e.effect.node.active = false;
            e.gunDong();
            e.initData();
            e.m_isEffectTime = false;
          });
        }
      }
    });
    this.node.getChildByName("list").children.forEach(function (e, t) {
      e.children[0].getComponent(cc.Label).string = r_UtilsSystem.UtilsSystem.numFormats(r_BottleCfg.BottleReward[t], 0);
    });
    this.bottleIcons.forEach(function (t) {
      e.initPonts.push(t.node.getPosition());
      t.node.active = false;
    });
    this.m_isGame = false;
    this.pro.node.active = false;
    this.textNode.active = false;
    this.effect.node.active = false;
  };
  _ctor.prototype.initData = function () {
    this.arrow.active = false;
    this.m_targetAngle = 0;
    this.arrow.angle = 0;
  };
  _ctor.prototype.ready = function () {
    var e = this;
    this.bottleIcons.forEach(function (t, o) {
      t.node.setPosition(e.initPonts[o]);
      t.node.angle = 0;
      t.node.active = false;
      t.node.getComponent(r_BottleIcon.default).init();
      t.setAnimation(0, "animation", true);
      t.timeScale = 0;
      e.arrow.children[o].active = false;
      if (!(r_BottleUI.default.instance.roundNum % 3 != 0 && o > 0)) {
        e.arrow.children[o].active = true;
        t.node.active = true;
      }
    });
    this.textNode.active = true;
    this.initData();
    this.joystick.startTake();
    this.pro.progress = 0;
    cc.director.getCollisionManager().enabled = false;
    this.m_tick = null;
    this.m_isGame = true;
    this.m_isGunDong = false;
    this.pro.node.active = true;
    this.effect.node.active = false;
    this.m_isEffectTime = false;
  };
  _ctor.prototype.lateUpdate = function (e) {
    var t = this;
    e > .1 && (e = .0166);
    this.arrow.angle = this.m_targetAngle;
    if (!this.m_isEffectTime) {
      if (null != this.m_tick) {
        this.m_tempTime = Date.now() - this.m_tick;
        this.pro.progress = this.m_tempTime % (1e3 * this.maxTime) / (1e3 * this.maxTime);
      }
      this.m_isGunDong && this.m_initSpeeds[0] > 0 && this.bottleIcons.forEach(function (e, o) {
        r_BottleUI.default.instance.roundNum % 3 != 0 && o > 0 || t.move(e, o);
      });
    }
  };
  _ctor.prototype.move = function (e, t) {
    var o = this.m_tempAngle + this.m_angles[t];
    var i = this.m_initSpeeds[t] - this.addSpeed;
    if (i <= 0) {
      this.m_initSpeeds[t] = 0;
      this.m_isGunDong = false;
      e.timeScale = 0;
      cc.director.getCollisionManager().enabled = true;
      return void r_TimeSystem.TimeSystem.scheduleOnce("isHit", .1, this.collisionEnter.bind(this));
    }
    this.m_initSpeeds[t] = i;
    var n = cc.misc.degreesToRadians(o);
    var a = cc.v2(0, i).rotate(-n);
    var r = cc.v2(e.node.getPosition().x - a.x, e.node.getPosition().y + a.y);
    e.timeScale = i / this.maxSpeed;
    e.node.setPosition(r);
  };
  _ctor.prototype.gunDong = function () {
    var e = this;
    var t = 1e3 * this.maxTime - this.m_tempTime % (1e3 * this.maxTime);
    var o = this.m_tempTime;
    t < 150 || (o += r_UtilsSystem.UtilsSystem.getRandomNum(-150, 150));
    this.initSpeed = o % (1e3 * this.maxTime) / (1e3 * this.maxTime) * this.maxSpeed;
    this.m_initSpeeds = [];
    for (var i = 0; i < 5; i++) {
      this.m_initSpeeds.push(this.initSpeed);
    }
    this.m_tick = null;
    this.bottleIcons.forEach(function (t, o) {
      t.node.angle = e.m_targetAngle + e.m_angles[o];
    });
    this.m_tempAngle = this.m_targetAngle;
    this.m_isGunDong = true;
    this.textNode.active = false;
    r_SoundMgr.SoundMgr.playSound("bottle/pingzigundong");
  };
  _ctor.prototype.collisionEnter = function () {
    var e = [];
    this.bottleIcons.forEach(function (t) {
      var o = t.node.getComponent(r_BottleIcon.default).isHit();
      e = e.concat(o);
    });
    var t = this.node.getChildByName("list");
    if (e.length > 0) {
      var o = [];
      e.forEach(function (e) {
        o.push(t.children.indexOf(e));
      });
      var i = 0;
      o.forEach(function (e) {
        i += r_BottleCfg.BottleReward[e];
      });
      r_BottleResultUI.default.showUI(i);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("好可惜，就差一点");
    }
    this.end();
  };
  _ctor.prototype.end = function () {
    this.joystick.stop();
    r_BottleUI.default.instance.showBtnPlay(true);
    this.m_isGame = false;
    this.pro.node.active = false;
    this.textNode.active = false;
    r_SoundMgr.SoundMgr.stopSound("bottle/pingzigundong");
    r_SoundMgr.SoundMgr.playSound("salvage/dalaobaowu");
  };
  _ctor.prototype.onDestroy = function () {};
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "bottleIcons", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "arrow", undefined);
  __decorate([_property(r_Joystick.default)], _ctor.prototype, "joystick", undefined);
  __decorate([_property(cc.ProgressBar)], _ctor.prototype, "pro", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "textNode", undefined);
  __decorate([_property(Number)], _ctor.prototype, "maxSpeed", undefined);
  __decorate([_property(Number)], _ctor.prototype, "addSpeed", undefined);
  __decorate([_property(Number)], _ctor.prototype, "maxTime", undefined);
  __decorate([_property(Number)], _ctor.prototype, "minPower", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "effect", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_BottleCom;