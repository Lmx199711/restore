var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToCleanHasKey = undefined;
var r_CheckHasKeys = require("CheckHasKeys");
var r_MoveToClean = require("MoveToClean");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var _menu = _decorator.menu;
var exp_MoveToCleanHasKey = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.hitTest = function () {
    return r_CheckHasKeys.checkHasKeys(this.hasKey);
  };
  return __decorate([_ccclass, _menu("Action/事件/拖动物体去清理,满足条件时才可以拖动")], _ctor);
}(r_MoveToClean.MoveToClean);
exports.MoveToCleanHasKey = exp_MoveToCleanHasKey;