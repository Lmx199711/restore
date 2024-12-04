var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ShowEffectBase = require("ShowEffectBase");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_ShowEffect001 = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.AcFun = function (e, t, o) {
    o && cc.tween(this.spriteCom).to(.5, {
      fillRange: 1
    }).start();
  };
  _ctor.prototype.onLoad = function () {
    this.spriteCom = this.node.getComponent(cc.Sprite);
    this.spriteCom.fillRange = 0;
  };
  _ctor.prototype.show = function () {};
  _ctor.prototype.handleArg = function (e) {
    e && cc.tween(this.spriteCom).to(.5, {
      fillRange: 1
    }).call(function () {
      e.callback && e.callback();
    }).start();
  };
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/大量行为/ShowEffect/sprite填充")], _ctor);
}(r_ShowEffectBase.default);
exports.default = def_ShowEffect001;