Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HpSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_HpCom = require("HpCom");
var r_HpItemBase = require("HpItemBase");
var exp_HpSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    cc.log(":血量透传," + e);
    this.entity.hpComponent.getComponent(r_HpItemBase.default).handleArg({
      arg1: e
    });
  };
  _ctor.prototype.onStart = function () {
    this.entity.hpComponent.getComponent(r_HpItemBase.default).handleArg({
      arg2: this.entity.maxHp
    });
  };
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_HpCom.HpCom)], _ctor);
}();
exports.HpSys = exp_HpSys;