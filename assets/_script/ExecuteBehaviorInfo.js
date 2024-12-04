Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecuteBehaviorInfo = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_ExecuteBehaviorInfoByKeys = require("ExecuteBehaviorInfoByKeys");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_ExecuteBehaviorInfo = function () {
  function _ctor() {
    this.addKey = "";
    this.delayAddKey = 0;
    this.removeKey = "";
    this.delayRemoveKey = 0;
    this.executeBehaviorInfo = [];
  }
  _ctor.prototype.execute = function () {
    var e = this;
    if (this.addKey) {
      if (this.delayAddKey > 0) {
        r_BehaviorMgr.BehaviorMgr.timeout(this.delayAddKey, function () {
          r_GameKeyMgr.GameKeyMgr.add(e.addKey);
        });
      } else {
        r_GameKeyMgr.GameKeyMgr.add(this.addKey);
      }
    }
    if (this.removeKey) {
      if (this.delayRemoveKey > 0) {
        r_BehaviorMgr.BehaviorMgr.timeout(this.delayRemoveKey, function () {
          r_GameKeyMgr.GameKeyMgr.remove(e.removeKey);
        });
      } else {
        r_GameKeyMgr.GameKeyMgr.remove(this.removeKey);
      }
    }
    this.executeBehaviorInfo.forEach(function (e) {
      e.execute();
    });
  };
  __decorate([_property({
    displayName: "保存key",
    tooltip: "多个key可以用逗号隔开"
  })], _ctor.prototype, "addKey", undefined);
  __decorate([_property({
    displayName: "延迟保存key",
    tooltip: "多用于等级动画或者缓动完成之后保存key去触发其他行为",
    visible: function () {
      return this.addKey;
    }
  })], _ctor.prototype, "delayAddKey", undefined);
  __decorate([_property({
    displayName: "移除key",
    tooltip: "多个key可以用逗号隔开"
  })], _ctor.prototype, "removeKey", undefined);
  __decorate([_property({
    displayName: "延迟移除key",
    tooltip: "多用于等待动画或者缓动完成之后移除key去触发其他行为",
    visible: function () {
      return this.removeKey;
    }
  })], _ctor.prototype, "delayRemoveKey", undefined);
  __decorate([_property({
    displayName: "执行信息",
    tooltip: "要执行的所有行为",
    type: r_ExecuteBehaviorInfoByKeys.ExecuteBehaviorInfoByKeys
  })], _ctor.prototype, "executeBehaviorInfo", undefined);
  return __decorate([_ccclass("ExecuteBehaviorInfo")], _ctor);
}();
exports.ExecuteBehaviorInfo = exp_ExecuteBehaviorInfo;