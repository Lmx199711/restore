var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var _menu = _decorator.menu;
var def_Ex_ChangeBgm = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.logIt = function () {
    cc.warn(":::::固定打印内容");
  };
  _ctor.prototype.handleArg = function (e, t, o) {
    if (o) {
      cc.log(o);
      r_SoundMgr.SoundMgr.playMusic(o);
    } else {
      t && cc.log(t);
    }
  };
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/切bgm")], _ctor);
}(cc.Component);
exports.default = def_Ex_ChangeBgm;