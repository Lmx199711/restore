var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasGmaeKeyTrigger = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_EventComBase = require("EventComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_HasGmaeKeyTrigger = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.needPrecondition = false;
    t.needCheckKeys = "";
    t.triggerActionId = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "所有要检查的标记",
    tooltip: "多个key用逗号隔开,必须满足所有key都存在才执行"
  })], _ctor.prototype, "needCheckKeys", undefined);
  __decorate([_property({
    displayName: "所有key验证通过后执行",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "triggerActionId", undefined);
  return __decorate([_ccclass, _menu("新系统/玩家操作/检测特殊key发生变化")], _ctor);
}(r_EventComBase.EventComBase);
exports.HasGmaeKeyTrigger = exp_HasGmaeKeyTrigger;