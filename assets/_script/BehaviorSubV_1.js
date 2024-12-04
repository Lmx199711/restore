var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorSubV_1 = undefined;
var s;
var r_BehaviorDef = require("BehaviorDef");
var r_BehaviorSub = require("BehaviorSub");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
(function (e) {
  e[e["停止spine动画"] = r_BehaviorDef.BehaviorType.停止spine动画] = "停止spine动画";
  e[e["播放音效"] = r_BehaviorDef.BehaviorType.播放音效] = "播放音效";
})(s || (s = {}));
var exp_BehaviorSubV_1 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.addType = 0;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "测试",
    type: cc.Enum(s)
  })], _ctor.prototype, "addType", undefined);
  return __decorate([_ccclass], _ctor);
}(r_BehaviorSub.BehaviorSub);
exports.BehaviorSubV_1 = exp_BehaviorSubV_1;