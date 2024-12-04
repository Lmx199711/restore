Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayEffectSys = undefined;
var r_PlayEffectCom = require("PlayEffectCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_PlayEffectSys = function () {
  function _ctor() {}
  _ctor.prototype.onStart = function () {
    this.effectCom = this.entity.node.getComponent(cc.ParticleSystem);
    this.time = 0;
    this.originRate = this.effectCom.emissionRate;
  };
  _ctor.prototype.onEnable = function () {};
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onUpdate = function (e) {
    if (this.time >= this.entity.deltaTime) {
      if (this.time >= this.entity.deltaTime + this.entity.playTime) {
        this.time = 0;
      } else {
        this.time += e;
      }
      this.effectCom.emissionRate = this.originRate;
    } else {
      this.time += e;
      this.effectCom.emissionRate = 0;
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_PlayEffectCom.PlayEffectCom)], _ctor);
}();
exports.PlayEffectSys = exp_PlayEffectSys;