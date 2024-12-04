var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameKeyMgr = require("GameKeyMgr");
var r_CommonFunc = require("CommonFunc");
var r_GameLogicBase = require("GameLogicBase");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_GameLogicKeyHandle = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.succ = function () {};
  _ctor.prototype.fail = function () {};
  _ctor.prototype.handleArg = function () {};
  _ctor.prototype.AcFun = function (e, t, o) {
    var i = r_CommonFunc.stringKeyToArr(o);
    if (i) {
      for (var n = 0; n < i.length; n++) {
        if (i[n]) {
          if ("!" == i[n][0] || "！" == i[n][0]) {
            var a = i[n].substring(1);
            r_GameKeyMgr.GameKeyMgr.remove(a);
          } else {
            r_GameKeyMgr.GameKeyMgr.add(i[n]);
          }
        }
      }
    }
  };
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/大量行为/胜利失败/添加移除key")], _ctor);
}(r_GameLogicBase.default);
exports.default = def_GameLogicKeyHandle;