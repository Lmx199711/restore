Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeNodeZIndexSys = undefined;
var r_ChangeNodeZIndexCom = require("ChangeNodeZIndexCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_ChangeNodeZIndexSys = function () {
  function _ctor() {}
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.trigger = function (e) {
    this.entity.target.zIndex = e || this.entity.zIndex;
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_ChangeNodeZIndexCom.ChangeNodeZIndexCom)], _ctor);
}();
exports.ChangeNodeZIndexSys = exp_ChangeNodeZIndexSys;