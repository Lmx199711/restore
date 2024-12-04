var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYEventDispatcher = require("TYEventDispatcher");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_Ex_EventTransfer = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.AcFun = function (e, t, o) {
    if (o) {
      r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(o);
    } else {
      t && r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(t);
    }
  };
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/大量行为/胜利失败/触发事件")], _ctor);
}(cc.Component);
exports.default = def_Ex_EventTransfer;