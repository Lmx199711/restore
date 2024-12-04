var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerByKey = undefined;
var r_ActionBase = require("ActionBase");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TriggerByKey = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.actionName = "";
    t.keyName = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    var t = this.actionName + r_GameKeyValueMgr.GameKeyValueMgr.getValue(this.keyName);
    console.log("TriggerByKey actionId=", t);
    r_TriggerActionMgr.TriggerActionMgr.trigger(t);
    e.prototype.trigger.call(this);
  };
  __decorate([_property({
    displayName: "action名字前缀"
  })], _ctor.prototype, "actionName", undefined);
  __decorate([_property({
    displayName: "key名字"
  })], _ctor.prototype, "keyName", undefined);
  return __decorate([_ccclass("TriggerByKey")], _ctor);
}(r_ActionBase.ActionBase);
exports.TriggerByKey = exp_TriggerByKey;