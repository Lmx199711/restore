var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ShowEffectBase = require("ShowEffectBase");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_ShowEffectLabel = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.AcFun = function () {
    throw new Error("Method not implemented.");
  };
  _ctor.prototype.onLoad = function () {
    this.labelCom = this.node.getComponent(cc.Label);
  };
  _ctor.prototype.show = function () {};
  _ctor.prototype.handleArg = function (e) {
    e && (this.labelCom.string = e.msg || "");
  };
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/大量行为/ShowEffect/填写label")], _ctor);
}(r_ShowEffectBase.default);
exports.default = def_ShowEffectLabel;