var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_EffectsCom = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor, "instace", {
    get: function () {
      return this.m_instace;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onLoad = function () {
    _ref__ctor.m_instace = this;
    this.addCion.setCompleteListener(this.deft.bind(this));
    this.bianFu.setCompleteListener(this.deft.bind(this));
    var e = cc.find("GRoot");
    this.initPos = e.getPosition().clone();
    this.deft();
  };
  _ctor.prototype.play = function (e, t) {
    undefined === t && (t = false);
    switch (e) {
      case _ref__ctor.PLAY_ADD_COIN:
        this.addCion.node.active = true;
        this.addCion.setAnimation(0, "animation", t);
        break;
      case _ref__ctor.PLAY_Bian_FU:
        this.bianFu.node.active = true;
        this.bianFu.setAnimation(0, "animation", t);
    }
  };
  _ctor.prototype.deft = function () {
    this.addCion.node.active = false;
    this.bianFu.node.active = false;
  };
  _ctor.prototype.shake = function (e, t) {
    undefined === t && (t = 0);
    var o = cc.find("GRoot");
    this.shakeStop(o);
    if (0 == t) {
      o.anchorX = o.anchorY = .5;
      o.x = cc.winSize.width / 2;
      o.y = cc.winSize.height / 2;
    }
    cc.log(o.y);
    this["shakeAction" + t](o);
    r_TimeSystem.TimeSystem.scheduleOnce("shake", e, this.shakeStop.bind(this, o));
  };
  _ctor.prototype.shakeStop = function (e) {
    this.m_act && this.m_act.stop();
    e.angle = 0;
    e.anchorX = 0;
    e.anchorY = 1;
    e.setPosition(this.initPos);
  };
  _ctor.prototype.shakeAction0 = function (e) {
    var t = cc.tween().to(this.getRandomTime(1, 3, 10, 15), {
      angle: r_UtilsSystem.UtilsSystem.getRandomNum(1, 3)
    }).to(this.getRandomTime(1, 3, 10, 20), {
      angle: -r_UtilsSystem.UtilsSystem.getRandomNum(1, 3)
    });
    this.m_act = cc.tween(e).then(t).call(this.shakeAction0.bind(this, e), this).start();
  };
  _ctor.prototype.shakeAction1 = function (e) {
    var t = cc.tween().to(.1, {
      x: this.initPos.x - 8
    }).to(.1, {
      x: this.initPos.x + 8
    });
    this.m_act = cc.tween(e).then(t).call(this.shakeAction1.bind(this, e), this).start();
  };
  _ctor.prototype.getRandomTime = function (e, t, o, i) {
    return r_UtilsSystem.UtilsSystem.getRandomNum(e, t) / r_UtilsSystem.UtilsSystem.getRandomNum(o, i);
  };
  _ctor.PLAY_ADD_COIN = "PLAY_ADD_COIN";
  _ctor.PLAY_Bian_FU = "PLAY_Bian_FU";
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "addCion", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "bianFu", undefined);
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_EffectsCom;