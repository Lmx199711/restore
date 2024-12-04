var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerActions = undefined;
var r_ActionBase = require("ActionBase");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TriggerActions = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.actionIds = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    for (var t = 0; t < this.actionIds.length; t++) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.actionIds[t]);
    }
    e.prototype.trigger.call(this);
  };
  __decorate([_property({
    type: [cc.String],
    displayName: "要执行的所有action"
  })], _ctor.prototype, "actionIds", undefined);
  return __decorate([_ccclass("TriggerActions")], _ctor);
}(r_ActionBase.ActionBase);
exports.TriggerActions = exp_TriggerActions;