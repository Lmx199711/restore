var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CatchDogEvent = undefined;
var s;
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_CatchDogCom = require("CatchDogCom");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_DogNetCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cathPos = null;
    t.mountPoint = null;
    t.anim = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.idle = function () {
    this.anim.setAnimation(0, s.待机, true);
  };
  _ctor.prototype.catch = function () {
    var e = this;
    this.anim.setAnimation(0, s.捕捉, false);
    this.anim.setCompleteListener(function () {
      if (e.anim.animation == s.捕捉) {
        r_CatchDogCom.default.instance.isMove = false;
        var t = {
          cathPos: e.cathPos.worldPosition,
          mountPoint: e.mountPoint.worldPosition,
          succCall: function () {
            e.anim.setAnimation(0, s.收网, true);
          },
          failCall: function () {
            e.anim.setAnimation(0, s.待机, true);
          }
        };
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(exp_CatchDogEvent.CATCH, t);
      }
    });
  };
  _ctor.prototype.rowei = function () {
    this.anim.setAnimation(0, s.放生, false);
  };
  _ctor.prototype.getMountPoint = function () {
    return this.mountPoint.worldPosition;
  };
  _ctor.prototype.clearScene = function () {};
  __decorate([_property(cc.Node)], _ctor.prototype, "cathPos", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "mountPoint", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "anim", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_DogNetCom;
(function (e) {
  e["捕捉"] = "shengwang";
  e["收网"] = "la";
  e["待机"] = "daiji";
  e["放生"] = "songwang";
})(s || (s = {}));
var exp_CatchDogEvent = function () {
  function _ctor() {}
  _ctor.CATCH = "CATCH";
  return _ctor;
}();
exports.CatchDogEvent = exp_CatchDogEvent;