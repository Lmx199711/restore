Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandleCleanSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_HandleCleanCom = require("HandleCleanCom");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_HandleCleanSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function () {
    var e = this.entity.cleanTool.cleanInfos;
    if (e.length > 0) {
      for (var t = 0; t < e.length; t++) {
        e[t].resetToOriState(this.entity.cleanPoint);
      }
    }
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {
    this.entity = null;
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_HandleCleanCom.HandleCleanCom)], _ctor);
}();
exports.HandleCleanSys = exp_HandleCleanSys;