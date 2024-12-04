var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYEventDispatcher = require("TYEventDispatcher");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var _menu = _decorator.menu;
var def_Ex_SendEvent = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.handleArg = function (e, t, o) {
    o && r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(o);
  };
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/发送一个消息")], _ctor);
}(cc.Component);
exports.default = def_Ex_SendEvent;