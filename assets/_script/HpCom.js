var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HpCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_HpCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.hpComponent = null;
    t.maxHp = 100;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "血量组件",
    type: cc.Node
  })], _ctor.prototype, "hpComponent", undefined);
  __decorate([_property({
    displayName: "最大血量"
  })], _ctor.prototype, "maxHp", undefined);
  return __decorate([_ccclass("HpCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.HpCom = exp_HpCom;