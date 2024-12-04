Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorModifySys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_ColorModifyCom = require("ColorModifyCom");
var exp_ColorModifySys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function () {
    this.modifyAllNode();
  };
  _ctor.prototype.modifyAllNode = function () {
    for (var e = 0; e < this.entity.infos.length; e++) {
      var t = this.entity.infos[e];
      t.node.color = t.color2;
      t.node.opacity = t.color2.a;
    }
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_ColorModifyCom.ColorModifyCom)], _ctor);
}();
exports.ColorModifySys = exp_ColorModifySys;