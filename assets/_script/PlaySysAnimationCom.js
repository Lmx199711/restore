var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySysAnimationCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_PlaySysAnimationCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.aniName = "";
    t.node = null;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "需要播放的动画"
  })], _ctor.prototype, "aniName", undefined);
  __decorate([_property({
    displayName: "播放的动画节点",
    type: cc.Node
  })], _ctor.prototype, "node", undefined);
  return __decorate([_ccclass("PlaySysAnimationCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.PlaySysAnimationCom = exp_PlaySysAnimationCom;