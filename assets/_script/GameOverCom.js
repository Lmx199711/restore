var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameOverCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_GameOverCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.failCount = 1;
    t.tipeNode = null;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "容错次数"
  })], _ctor.prototype, "failCount", undefined);
  __decorate([_property({
    displayName: "错误提醒节点",
    type: cc.Node
  })], _ctor.prototype, "tipeNode", undefined);
  return __decorate([_ccclass("GameOverCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.GameOverCom = exp_GameOverCom;