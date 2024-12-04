Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorComBase = undefined;
var r_ECSWorld = require("ECSWorld");
var r_ExecuteBehaviorInfoByKeys = require("ExecuteBehaviorInfoByKeys");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_BehaviorComBase = function () {
  function _ctor() {
    this.behaviorType = "";
    this.behaviorId = "";
    this.isDebug = false;
    this.log = "";
    this.saveKeys = "";
    this.delaySaveKeys = 0;
    this.removeKeys = "";
    this.delayRemoveKeys = 0;
    this.nextBehaviorInfo = [];
  }
  _ctor.prototype.onStart = function () {
    r_ECSWorld.ECSWorld.execute(this, "onStart");
  };
  _ctor.prototype.onDestroy = function () {
    r_ECSWorld.ECSWorld.execute(this, "onDestroy");
  };
  _ctor.prototype.trigger = function (e) {
    r_ECSWorld.ECSWorld.execute(this, "trigger", e);
  };
  __decorate([_property({
    displayName: "行为类型",
    readonly: true
  })], _ctor.prototype, "behaviorType", undefined);
  __decorate([_property({
    displayName: "行为id"
  })], _ctor.prototype, "behaviorId", undefined);
  __decorate([_property({
    displayName: "调试显示的日志"
  })], _ctor.prototype, "isDebug", undefined);
  __decorate([_property({
    displayName: "显示日志的内容",
    visible: function () {
      return this.isDebug;
    }
  })], _ctor.prototype, "log", undefined);
  __decorate([_property({
    displayName: "要保存的key",
    tooltip: "多个key用逗号隔开"
  })], _ctor.prototype, "saveKeys", undefined);
  __decorate([_property({
    displayName: "延迟保存key",
    tooltip: "多用于等级动画或者缓动完成之后保存key去触发其他行为",
    visible: function () {
      return this.saveKeys;
    }
  })], _ctor.prototype, "delaySaveKeys", undefined);
  __decorate([_property({
    displayName: "要移除的key",
    tooltip: "多个key用逗号隔开"
  })], _ctor.prototype, "removeKeys", undefined);
  __decorate([_property({
    displayName: "延迟删除key",
    tooltip: "多用于等待动画或者缓动完成之后移除key去触发其他行为",
    visible: function () {
      return this.removeKeys;
    }
  })], _ctor.prototype, "delayRemoveKeys", undefined);
  __decorate([_property({
    displayName: "执行信息",
    tooltip: "要执行的所有行为",
    type: r_ExecuteBehaviorInfoByKeys.ExecuteBehaviorInfoByKeys
  })], _ctor.prototype, "nextBehaviorInfo", undefined);
  return __decorate([_ccclass("BehaviorComBase")], _ctor);
}();
exports.BehaviorComBase = exp_BehaviorComBase;