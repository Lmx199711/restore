Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_ShowEffectBase = require("ShowEffectBase");
var r_EffectCom = require("EffectCom");
var exp_EffectSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    this.entity.showComponent && this.entity.showComponent.getComponent(r_ShowEffectBase.default) && this.entity.showComponent.getComponent(r_ShowEffectBase.default).handleArg({
      msg: e
    });
    this.entity.showMoreComs.forEach(function (t) {
      t.getComponent(r_ShowEffectBase.default) && t.getComponent(r_ShowEffectBase.default).handleArg({
        msg: e
      });
    });
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_EffectCom.EffectCom)], _ctor);
}();
exports.EffectSys = exp_EffectSys;