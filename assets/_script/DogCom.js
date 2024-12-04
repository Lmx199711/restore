var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s;
var r_CommonFunc = require("CommonFunc");
var r_TimeSystem = require("TimeSystem");
var r_Index = require("Index");
var r_SoundMgr = require("SoundMgr");
var r_CatchDogCom = require("CatchDogCom");
var r_CatchDogUI = require("CatchDogUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_DogCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.polygon = null;
    t.mountPoint = null;
    t.anim = null;
    t.blood = 1;
    t.passTime = 0;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "data", {
    get: function () {
      return this.m_data;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onLoad = function () {
    var e = this;
    this.polygon && r_Index.Platform.isDarenPlatform() && (this.polygon.getComponent(cc.PolygonCollider).points = [cc.v2(-75, -100), cc.v2(-75, 100), cc.v2(75, 100), cc.v2(75, -100)]);
    this.anim.setCompleteListener(function () {
      if (e.anim.animation == s.捉住2) {
        e.node.scaleX = 1;
        r_CatchDogCom.default.instance.isMove = true;
        e.run();
      }
    });
  };
  _ctor.prototype.move = function (e) {
    if (this.node) {
      if (this.node.x <= r_CatchDogCom.default.targetX) {
        this.moveOver();
      } else {
        this.passTime = this.passTime + e;
        if (this.passTime > 1) {
          this.passTime = 0;
          r_SoundMgr.SoundMgr.playSound("catchDog/狗跑步");
        }
        var t = this.m_data.speed * e;
        this.node.x -= t;
      }
    }
  };
  _ctor.prototype.moveOver = function () {
    r_CatchDogCom.default.instance.moveOver();
  };
  _ctor.prototype.setData = function (e) {
    this.m_data = e;
    this.blood = e.blood;
  };
  _ctor.prototype.getIsCatch = function (e) {
    return r_CommonFunc.checkTouchNode(e, this.polygon);
  };
  _ctor.prototype.run = function () {
    r_SoundMgr.SoundMgr.playSound("catchDog/狗跑步");
    this.anim.setAnimation(0, s.奔跑, true);
  };
  _ctor.prototype.taunt = function () {
    var e = this;
    r_CatchDogCom.default.instance.isMove = false;
    if (this.node.x < -7) {
      this.node.scaleX = -1;
    } else {
      this.node.scaleX = 1;
    }
    this.anim.setAnimation(0, s.嘲讽, true);
    r_SoundMgr.SoundMgr.playSound("catchDog/坏笑");
    r_TimeSystem.TimeSystem.scheduleOnce("taunt" + ++r_CatchDogUI.default.tauntId, 1.5, function () {
      if (e.node) {
        e.node.scaleX = 1;
        r_CatchDogCom.default.instance.isMove = true;
        e.run();
      }
    });
  };
  _ctor.prototype.getCaught = function () {
    r_SoundMgr.SoundMgr.playSound("catchDog/狗被抓住");
    this.anim.setAnimation(0, s.捉住, true);
  };
  _ctor.prototype.rowei = function () {
    r_SoundMgr.SoundMgr.playSound("catchDog/狗被带回家");
    this.anim.setAnimation(0, s.放生, true);
  };
  _ctor.prototype.getCaught2 = function () {
    if (!(!this.m_data || 3 != this.m_data.id && 7 != this.m_data.id)) {
      3 == this.m_data.id && r_SoundMgr.SoundMgr.playSound("catchDog/放屁");
      this.anim.setAnimation(0, s.捉住2, false);
    }
  };
  _ctor.prototype.getMountPoint = function () {
    return this.mountPoint.worldPosition;
  };
  _ctor.prototype.onDestroy = function () {
    this.anim.setCompleteListener(null);
    for (var e = 0; e <= r_CatchDogUI.default.tauntId; e++) {
      r_TimeSystem.TimeSystem.scheduleClear("taunt" + r_CatchDogUI.default.tauntId);
    }
  };
  __decorate([_property(cc.Node)], _ctor.prototype, "polygon", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "mountPoint", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "anim", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_DogCom;
(function (e) {
  e["奔跑"] = "yidong";
  e["嘲讽"] = "huaixiao";
  e["捉住"] = "zhengzha";
  e["捉住2"] = "zhengzha2";
  e["放生"] = "keai";
})(s || (s = {}));