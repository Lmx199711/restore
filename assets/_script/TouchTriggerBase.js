var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CheckHasKeys = require("CheckHasKeys");
var r_TouchBase = require("TouchBase");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var def_TouchTriggerBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.successTriggerActionId = "";
    t.failTriggerActionId = "";
    t.hasKey = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    if (r_CheckHasKeys.checkHasKeys(this.hasKey)) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
    } else {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
    }
  };
  _ctor.prototype.hitTest = function () {
    return true;
  };
  __decorate([_property({
    displayName: "所有key检查通过时触发的action"
  })], _ctor.prototype, "successTriggerActionId", undefined);
  __decorate([_property({
    displayName: "没有这些key时触发的action"
  })], _ctor.prototype, "failTriggerActionId", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时,点击或者拖动执行成功action"
  })], _ctor.prototype, "hasKey", undefined);
  return __decorate([_ccclass], _ctor);
}(r_TouchBase.default);
exports.default = def_TouchTriggerBase;