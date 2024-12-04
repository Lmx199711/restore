var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeTriggerInfo = undefined;
var r_BehaviorMgr = require("BehaviorMgr");
var r_ValueTrigger = require("ValueTrigger");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_TimeTriggerInfo = function () {
  function _ctor() {
    this.value = 0;
    this.triggerId = "";
  }
  __decorate([_property({
    displayName: "数值"
  })], _ctor.prototype, "value", undefined);
  __decorate([_property({
    displayName: "执行行为"
  })], _ctor.prototype, "triggerId", undefined);
  return __decorate([_ccclass("TimeTriggerInfo")], _ctor);
}();
exports.TimeTriggerInfo = exp_TimeTriggerInfo;
var def_Score_ExTimeTrigger = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.infos = Array();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.valueMatch = function (e) {
    var t = e.value;
    this.infos.forEach(function (e) {
      if (t == e.value && e.triggerId) {
        cc.log(e.value + "-->执行-->" + e.triggerId);
        r_BehaviorMgr.BehaviorMgr.triggerActions(e.triggerId);
      }
    });
  };
  __decorate([_property([exp_TimeTriggerInfo])], _ctor.prototype, "infos", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/大量行为/追加/次数执行")], _ctor);
}(r_ValueTrigger.ValueTrigger);
exports.default = def_Score_ExTimeTrigger;