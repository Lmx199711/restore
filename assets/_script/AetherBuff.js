var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AetherBuffType = exports.AetherBuff = undefined;
var s;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_AetherBuff = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.buffData = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.init = function () {
    this.clearBuff();
  };
  _ctor.prototype.addBuff = function (e) {
    this.buffData = e;
    this.sp.setAnimation(0, e.id, true);
  };
  _ctor.prototype.updateTime = function (e) {
    if (this.buffData) {
      this.buffData.time -= e;
      this.buffData.time <= 0 && this.clearBuff();
    }
  };
  _ctor.prototype.clearBuff = function () {
    this.buffData = null;
    this.sp && this.sp.setAnimation(0, s.待机, true);
  };
  _ctor.prototype.hasBuff = function (e) {
    return !!this.buffData && this.buffData.id == e;
  };
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "sp", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.AetherBuff = exp_AetherBuff;
(function (e) {
  e["待机"] = "animation";
  e["加速"] = "animation2";
  e["护盾"] = "animation3";
  e["黑洞"] = "animation4";
  e["攻击"] = "animation5";
})(s = exports.AetherBuffType || (exports.AetherBuffType = {}));