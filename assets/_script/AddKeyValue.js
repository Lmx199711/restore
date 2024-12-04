var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddKeyValue = undefined;
var r_ActionBase = require("ActionBase");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_AddKeyValue = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.keyName = "";
    t.value = 0;
    t.actionName = "";
    t.minString = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    var t = r_GameKeyValueMgr.GameKeyValueMgr.getValue(this.keyName);
    undefined === t && (t = 0);
    var o = parseInt(t);
    o += this.value;
    if ("" != this.minString) {
      var i = parseInt(this.minString);
      o < i && (o = i);
    }
    r_GameKeyValueMgr.GameKeyValueMgr.setValue(this.keyName, o);
    e.prototype.trigger.call(this);
    if ("" != this.actionName) {
      var n = this.actionName + r_GameKeyValueMgr.GameKeyValueMgr.getValue(this.keyName);
      console.log("AddKeyValue actionId=", n);
      r_TriggerActionMgr.TriggerActionMgr.trigger(n);
    }
  };
  __decorate([_property({
    displayName: "key"
  })], _ctor.prototype, "keyName", undefined);
  __decorate([_property({
    type: Number,
    displayName: "增加的数量"
  })], _ctor.prototype, "value", undefined);
  __decorate([_property({
    displayName: "触发action名字前缀"
  })], _ctor.prototype, "actionName", undefined);
  __decorate([_property({
    displayName: "最小值"
  })], _ctor.prototype, "minString", undefined);
  return __decorate([_ccclass("AddKeyValue")], _ctor);
}(r_ActionBase.ActionBase);
exports.AddKeyValue = exp_AddKeyValue;