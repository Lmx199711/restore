var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeNodeZIndexCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_ChangeNodeZIndexCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.target = null;
    t.zIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: cc.Node,
    displayName: "改变zIndex的节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property()], _ctor.prototype, "zIndex", undefined);
  return __decorate([_ccclass("ChangeNodeZIndexCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.ChangeNodeZIndexCom = exp_ChangeNodeZIndexCom;