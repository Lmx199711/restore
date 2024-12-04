var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var _menu = _decorator.menu;
var def_Ex_ChangeVar = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.handleArg = function (e, t, o) {
    o && o[0] && o[1] && r_GameKeyValueMgr.GameKeyValueMgr.setValue(o[0], o[1]);
  };
  return __decorate([_ccclass, _menu("新系统/01机关/99追加/普通脚本/改变变量")], _ctor);
}(cc.Component);
exports.default = def_Ex_ChangeVar;