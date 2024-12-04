var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReturnListener = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var exp_ReturnListener = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.update = function () {};
  _ctor.prototype.onLoad = function () {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
  };
  _ctor.prototype.onDestroy = function () {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
  };
  _ctor.prototype.onKeyDown = function (e) {
    switch (e.keyCode) {
      case cc.macro.KEY.back:
        var t = r_GameKeyMgr.GameKeyMgr.inputKey.length;
        r_GameKeyMgr.GameKeyMgr.inputKey = r_GameKeyMgr.GameKeyMgr.inputKey.slice(t - 1, 1);
        break;
      case cc.macro.KEY.a:
        r_GameKeyMgr.GameKeyMgr.inputKey += "a";
        break;
      case cc.macro.KEY.b:
        r_GameKeyMgr.GameKeyMgr.inputKey += "b";
        break;
      case cc.macro.KEY.c:
        r_GameKeyMgr.GameKeyMgr.inputKey += "c";
        break;
      case cc.macro.KEY.d:
        r_GameKeyMgr.GameKeyMgr.inputKey += "d";
        break;
      case cc.macro.KEY.e:
        r_GameKeyMgr.GameKeyMgr.inputKey += "e";
        break;
      case cc.macro.KEY.f:
        r_GameKeyMgr.GameKeyMgr.inputKey += "f";
        break;
      case cc.macro.KEY.g:
        r_GameKeyMgr.GameKeyMgr.inputKey += "g";
        break;
      case cc.macro.KEY.h:
        r_GameKeyMgr.GameKeyMgr.inputKey += "h";
        break;
      case cc.macro.KEY.i:
        r_GameKeyMgr.GameKeyMgr.inputKey += "i";
        break;
      case cc.macro.KEY.j:
        r_GameKeyMgr.GameKeyMgr.inputKey += "j";
        break;
      case cc.macro.KEY.k:
        r_GameKeyMgr.GameKeyMgr.inputKey += "k";
        break;
      case cc.macro.KEY.l:
        r_GameKeyMgr.GameKeyMgr.inputKey += "l";
        break;
      case cc.macro.KEY.m:
        r_GameKeyMgr.GameKeyMgr.inputKey += "m";
        break;
      case cc.macro.KEY.n:
        r_GameKeyMgr.GameKeyMgr.inputKey += "n";
        break;
      case cc.macro.KEY.o:
        r_GameKeyMgr.GameKeyMgr.inputKey += "o";
        break;
      case cc.macro.KEY.p:
        r_GameKeyMgr.GameKeyMgr.inputKey += "p";
        break;
      case cc.macro.KEY.q:
        r_GameKeyMgr.GameKeyMgr.inputKey += "q";
        break;
      case cc.macro.KEY.r:
        r_GameKeyMgr.GameKeyMgr.inputKey += "r";
        break;
      case cc.macro.KEY.s:
        r_GameKeyMgr.GameKeyMgr.inputKey += "s";
        break;
      case cc.macro.KEY.t:
        r_GameKeyMgr.GameKeyMgr.inputKey += "t";
        break;
      case cc.macro.KEY.u:
        r_GameKeyMgr.GameKeyMgr.inputKey += "u";
        break;
      case cc.macro.KEY.v:
        r_GameKeyMgr.GameKeyMgr.inputKey += "v";
        break;
      case cc.macro.KEY.w:
        r_GameKeyMgr.GameKeyMgr.inputKey += "w";
        break;
      case cc.macro.KEY.x:
        r_GameKeyMgr.GameKeyMgr.inputKey += "x";
        break;
      case cc.macro.KEY.y:
        r_GameKeyMgr.GameKeyMgr.inputKey += "y";
        break;
      case cc.macro.KEY.z:
        r_GameKeyMgr.GameKeyMgr.inputKey += "z";
        break;
      case cc.macro.KEY.num1:
        r_GameKeyMgr.GameKeyMgr.inputKey += "1";
        break;
      case cc.macro.KEY.num2:
        r_GameKeyMgr.GameKeyMgr.inputKey += "2";
        break;
      case cc.macro.KEY.num3:
        r_GameKeyMgr.GameKeyMgr.inputKey += "3";
        break;
      case cc.macro.KEY.num4:
        r_GameKeyMgr.GameKeyMgr.inputKey += "4";
        break;
      case cc.macro.KEY.num5:
        r_GameKeyMgr.GameKeyMgr.inputKey += "5";
        break;
      case cc.macro.KEY.num6:
        r_GameKeyMgr.GameKeyMgr.inputKey += "6";
        break;
      case cc.macro.KEY.num7:
        r_GameKeyMgr.GameKeyMgr.inputKey += "7";
        break;
      case cc.macro.KEY.num8:
        r_GameKeyMgr.GameKeyMgr.inputKey += "8";
        break;
      case cc.macro.KEY.num9:
        r_GameKeyMgr.GameKeyMgr.inputKey += "9";
        break;
      case cc.macro.KEY.num0:
        r_GameKeyMgr.GameKeyMgr.inputKey += "0";
        break;
      case cc.macro.KEY.enter:
        cc.log("code you input:" + r_GameKeyMgr.GameKeyMgr.inputKey);
        r_GameKeyMgr.GameKeyMgr.clearInputKey();
    }
  };
  return __decorate([_ccclass()], _ctor);
}(cc.Component);
exports.ReturnListener = exp_ReturnListener;