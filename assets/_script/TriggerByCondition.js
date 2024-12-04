var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerByCondition = undefined;
var r_ActionBase = require("ActionBase");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TriggerByCondition = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.hasKey = [];
    t.successAction = "";
    t.failAction = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    e.prototype.trigger.call(this);
    if (r_CheckHasKeys.checkHasKeys(this.hasKey)) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successAction);
    } else {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.failAction);
    }
  };
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "条件列表"
  })], _ctor.prototype, "hasKey", undefined);
  __decorate([_property({
    type: cc.String,
    displayName: "满足条件的action"
  })], _ctor.prototype, "successAction", undefined);
  __decorate([_property({
    type: cc.String,
    displayName: "不满足条件的action"
  })], _ctor.prototype, "failAction", undefined);
  return __decorate([_ccclass("TriggerByCondition")], _ctor);
}(r_ActionBase.ActionBase);
exports.TriggerByCondition = exp_TriggerByCondition;