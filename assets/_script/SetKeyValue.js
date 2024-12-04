var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetKeyValue = undefined;
var r_ActionBase = require("ActionBase");
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_SetKeyValue = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.keyName = "";
    t.value = "";
    t.copyKey = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    if ("" != this.copyKey) {
      r_GameKeyValueMgr.GameKeyValueMgr.setValue(this.keyName, r_GameKeyValueMgr.GameKeyValueMgr.getValue(this.copyKey));
    } else {
      r_GameKeyValueMgr.GameKeyValueMgr.setValue(this.keyName, this.value);
    }
    e.prototype.trigger.call(this);
  };
  __decorate([_property({
    displayName: "key"
  })], _ctor.prototype, "keyName", undefined);
  __decorate([_property({
    displayName: "value"
  })], _ctor.prototype, "value", undefined);
  __decorate([_property({
    displayName: "从这个key拷贝过来"
  })], _ctor.prototype, "copyKey", undefined);
  return __decorate([_ccclass("SetKeyValue")], _ctor);
}(r_ActionBase.ActionBase);
exports.SetKeyValue = exp_SetKeyValue;