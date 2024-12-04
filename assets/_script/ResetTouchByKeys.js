var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetTouchByKeys = undefined;
var r_TouchTriggerBase = require("TouchTriggerBase");
var r_CheckHasKeys = require("CheckHasKeys");
var r_App = require("App");
var r_GameKeyMgr = require("GameKeyMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_ResetTouchByKeys = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.restKeys = [];
    t.canTouch = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    r_App.App.inst.on(r_GameKeyMgr.EventType.ChangeKey, this.onChangeKey, this);
  };
  _ctor.prototype.onDisable = function () {
    r_App.App.inst.off(r_GameKeyMgr.EventType.ChangeKey, this.onChangeKey, this);
  };
  _ctor.prototype.onDragStart = function (t) {
    if (!this.checkHasNotClickKey()) {
      e.prototype.onDragStart.call(this, t);
      this.trigger();
    }
  };
  _ctor.prototype.trigger = function () {
    if (this.canTouch) {
      e.prototype.trigger.call(this);
      this.canTouch = false;
    }
  };
  _ctor.prototype.onChangeKey = function (e) {
    -1 != this.restKeys.findIndex(function (t) {
      return t.key == e.data.key;
    }) && r_CheckHasKeys.checkHasKeys(this.restKeys) && (this.canTouch = true);
  };
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "检测的key",
    tooltip: "当有这些key发生变化时会触发按钮重置"
  })], _ctor.prototype, "restKeys", undefined);
  __decorate([_property({
    displayName: "是否可点击"
  })], _ctor.prototype, "canTouch", undefined);
  return __decorate([_ccclass, _menu("Action/事件/复位按钮")], _ctor);
}(r_TouchTriggerBase.default);
exports.ResetTouchByKeys = exp_ResetTouchByKeys;