var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var _menu = _decorator.menu;
var def_Ex_Trigger = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.handleArg = function (e, t) {
    t && r_BehaviorMgr.BehaviorMgr.trigger(t);
  };
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/执行action")], _ctor);
}(cc.Component);
exports.default = def_Ex_Trigger;