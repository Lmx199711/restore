var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_EffectCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.showComponent = null;
    t.showMoreComs = Array();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "效果组件",
    type: cc.Node
  })], _ctor.prototype, "showComponent", undefined);
  __decorate([_property({
    displayName: "更多效果组件",
    type: cc.Node
  })], _ctor.prototype, "showMoreComs", undefined);
  return __decorate([_ccclass("EffectCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.EffectCom = exp_EffectCom;