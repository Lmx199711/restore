var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_LampCfg = require("LampCfg");
var r_SoundMgr = require("SoundMgr");
var r_LampUI = require("LampUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_LampCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.hand = null;
    t.ladder = null;
    t.angleNode = null;
    t.sk = null;
    t.role = null;
    t.role2 = null;
    t.roleAnim = null;
    t.roleAnim1 = null;
    t.labName = null;
    t.labName2 = null;
    t.bubble0 = null;
    t.bubble1 = null;
    t.txt0 = null;
    t.txt1 = null;
    t.huaji0 = null;
    t.huaji1 = null;
    t.bubbles = [];
    t.m_isEnd = false;
    t.m_isSucc = false;
    t.m_addSpeed = 5;
    t.m_gravity = 6;
    t.m_tempSpeed = 0;
    t.m_tempAddSpeed = 0;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "isEnd", {
    get: function () {
      return this.m_isEnd;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "isSucc", {
    get: function () {
      return this.m_isSucc;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.start = function () {
    this.restart();
  };
  _ctor.prototype.restart = function () {
    var e = Math.random() < .5;
    this.angleNode.angle = e ? -10 : 10;
    this.m_tempSpeed = e ? -this.m_gravity : this.m_gravity;
    this.m_isEnd = false;
    this.m_isSucc = false;
    this.sk.setCompleteListener(this.onComplete.bind(this));
    this.role.active = this.role2.active = this.hand.node.active = r_LampUI.LampUI.instace.imgLamp.visible = true;
    this.roleAnim.node.active = false;
    this.roleAnim1.node.active = false;
    this.labName2.active = false;
    this.labName.getChildByName("labName").labelCom.string = r_LampUI.LampUI.instace.data || "";
    this.labName2.getChildByName("labName").labelCom.string = r_LampUI.LampUI.instace.data || "";
    this.bubble0.active = false;
    this.bubble1.active = false;
    this.sk.setAnimation(0, "daiji", false);
    r_TimeSystem.TimeSystem.schedule("intervalBubble1", 7, this.setInvBubble.bind(this, 1));
  };
  _ctor.prototype.rule = function (e) {
    return (e > 100 || e < -100) && (this.m_tempSpeed = 0, this.m_tempAddSpeed = 0, this.angleNode.angle = e >= 100 ? 100 : -100, "chengg" != this.sk.animation && this.sk.setAnimation(0, "shibai", false), r_SoundMgr.SoundMgr.playSound("lamp/梯子倒地"), !this.m_isEnd && !this.m_isSucc && this.setBubble(0, Math.random() < .5 ? 2 : 0, true), true);
  };
  _ctor.prototype.update = function (e) {
    e > .5 && (e = .17);
    this.countTempSpeed();
    if (!this.rule(this.angleNode.angle + this.m_tempSpeed * e)) {
      this.angleNode.angle += this.m_tempSpeed * e;
      this.setLight();
    }
  };
  _ctor.prototype.setLight = function () {
    var e = this.angleNode.angle;
    r_LampUI.LampUI.instace.setLight(e <= 10 && e >= -10);
  };
  _ctor.prototype.countTempSpeed = function () {
    this.m_tempSpeed += this.m_tempAddSpeed;
  };
  _ctor.prototype.onClickLeft = function () {
    this.m_isEnd || this.m_isSucc || 100 != this.angleNode.angle && (this.m_tempSpeed = 0, this.m_tempAddSpeed = this.m_addSpeed);
  };
  _ctor.prototype.onClickRight = function () {
    this.m_isEnd || this.m_isSucc || -100 != this.angleNode.angle && (this.m_tempSpeed = 0, this.m_tempAddSpeed = -this.m_addSpeed);
  };
  _ctor.prototype.end = function () {
    this.m_isEnd = true;
  };
  _ctor.prototype.onComplete = function () {
    "shibai" == this.sk.animation && this.sk.setAnimation(0, "daiji", true);
  };
  _ctor.prototype.gameSucc = function () {
    this.m_isSucc = true;
    this.role.active = this.role2.active = this.hand.node.active = r_LampUI.LampUI.instace.imgLamp.visible = false;
    this.roleAnim.node.active = true;
    this.roleAnim.setAnimation(0, "deng", true);
    this.roleAnim1.node.active = true;
    this.roleAnim1.setAnimation(0, "animation", true);
    this.labName2.active = true;
    this.sk.setAnimation(0, "chengg", false);
    r_TimeSystem.TimeSystem.scheduleClear("intervalBubble");
    r_TimeSystem.TimeSystem.scheduleClear("intervalBubble1");
    this.setSuccBubble(1);
    this.setSuccBubble(0);
    this.m_lastNode = null;
  };
  _ctor.prototype.gameOver = function () {
    this.end();
    r_TimeSystem.TimeSystem.scheduleClear("intervalBubble");
    r_TimeSystem.TimeSystem.scheduleClear("intervalBubble1");
    this.m_lastNode = null;
  };
  _ctor.prototype.dispose = function () {
    r_TimeSystem.TimeSystem.scheduleClear("intervalBubble");
    r_TimeSystem.TimeSystem.scheduleClear("intervalBubble1");
    this.m_lastNode = null;
    this.m_tween && this.m_tween.stop();
  };
  _ctor.prototype.setInvBubble = function (e) {
    var t = r_LampCfg.LampBubbleCfg[e].interval;
    var o = t[r_UtilsSystem.UtilsSystem.getRandomNum(0, t.length - 1)];
    this.setBubble(e, o.id, o.ishuaji);
  };
  _ctor.prototype.setSuccBubble = function (e) {
    var t = r_LampCfg.LampBubbleCfg[e].succ;
    var o = t[r_UtilsSystem.UtilsSystem.getRandomNum(0, t.length - 1)];
    this.setBubble(e, o.id, o.ishuaji);
  };
  _ctor.prototype.setBubble = function (e, t, o) {
    var i = this["bubble" + e];
    this.m_tween && this.m_lastNode == i && this.m_tween.stop();
    this["txt" + e].spriteFrame = this.bubbles[t];
    this["huaji" + e].active = o;
    this["bubble" + e].active = true;
    i.opacity = 0;
    this.m_lastNode = i;
    this.m_tween = cc.tween(i).to(.2, {
      opacity: 255
    }).delay(2.5).call(function () {
      i.active = false;
    }).start();
  };
  __decorate([_property(cc.Sprite)], _ctor.prototype, "hand", undefined);
  __decorate([_property(cc.Sprite)], _ctor.prototype, "ladder", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "angleNode", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "sk", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "role", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "role2", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "roleAnim", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "roleAnim1", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "labName", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "labName2", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "bubble0", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "bubble1", undefined);
  __decorate([_property(cc.Sprite)], _ctor.prototype, "txt0", undefined);
  __decorate([_property(cc.Sprite)], _ctor.prototype, "txt1", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "huaji0", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "huaji1", undefined);
  __decorate([_property([cc.SpriteFrame])], _ctor.prototype, "bubbles", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_LampCom;