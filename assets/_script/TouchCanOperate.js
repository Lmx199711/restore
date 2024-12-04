Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchCanOperate = undefined;
var r_BehaviorMgr = require("BehaviorMgr");
var r_CommonFunc = require("CommonFunc");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_TouchCanOperate = function () {
  function _ctor() {
    this.hasKeyCanotOp = false;
    this.dotnotKeysStr = "";
    this.needKeyCanOp = false;
    this.hasKeyStr = "";
    this.successTriggerActions = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    this.failTriggerActionId = "";
    this.onInNotKeyTriggerActionId = "";
  }
  _ctor.prototype.canOperate = function () {
    return !(this.hasKeyCanotOp && r_CommonFunc.chekHasStringKeys(this.dotnotKeysStr) || this.needKeyCanOp && !r_CommonFunc.chekHasStringKeys(this.hasKeyStr));
  };
  _ctor.prototype.trigger = function (e) {
    undefined === e && (e = null);
    if (this.hasKeyCanotOp && r_CommonFunc.chekHasStringKeys(this.dotnotKeysStr)) {
      this.onNotKeyTrigger();
    } else if (!this.needKeyCanOp || r_CommonFunc.chekHasStringKeys(this.hasKeyStr)) {
      this.onSuccessTrigger();
    } else {
      this.onFailTrigger();
    }
  };
  _ctor.prototype.onNotKeyTrigger = function () {
    this.callback && this.callback.onNotKeyTrigger && !this.callback.onNotKeyTrigger() || this.onInNotKeyTriggerActionId && r_BehaviorMgr.BehaviorMgr.trigger(this.onInNotKeyTriggerActionId);
  };
  _ctor.prototype.onSuccessTrigger = function () {
    this.callback && this.callback.onSuccessTrigger && !this.callback.onSuccessTrigger() || this.successTriggerActions && r_BehaviorMgr.BehaviorMgr.executeBehavior(this.successTriggerActions);
  };
  _ctor.prototype.onFailTrigger = function () {
    this.callback && this.callback.onFailTrigger && !this.callback.onFailTrigger() || r_BehaviorMgr.BehaviorMgr.trigger(this.failTriggerActionId);
  };
  _ctor.prototype.regCallback = function (e) {
    this.callback = e;
  };
  __decorate([_property({
    displayName: "有key后不能操作"
  })], _ctor.prototype, "hasKeyCanotOp", undefined);
  __decorate([_property({
    visible: function () {
      return this.hasKeyCanotOp;
    },
    displayName: "操作失效的key",
    tooltip: "有这些key的时候不能执行操作"
  })], _ctor.prototype, "dotnotKeysStr", undefined);
  __decorate([_property({
    displayName: "需要满足条件才能操作"
  })], _ctor.prototype, "needKeyCanOp", undefined);
  __decorate([_property({
    visible: function () {
      return this.needKeyCanOp;
    },
    displayName: "操作生效需要的key",
    tooltip: "有这些key的时候会执行的action"
  })], _ctor.prototype, "hasKeyStr", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "执行",
    tooltip: "所有key都满足的时候或者没有需要key的时候执行"
  })], _ctor.prototype, "successTriggerActions", undefined);
  __decorate([_property({
    visible: function () {
      return this.needKeyCanOp;
    },
    displayName: "操作没生效触发的行为",
    tooltip: "需要key能操作,并且没有key"
  })], _ctor.prototype, "failTriggerActionId", undefined);
  __decorate([_property({
    visible: function () {
      return this.hasKeyCanotOp;
    },
    displayName: "操作失效需要执行的行为",
    tooltip: "不能操作的key满足后执行的操作"
  })], _ctor.prototype, "onInNotKeyTriggerActionId", undefined);
  return __decorate([_ccclass("TouchCanOperate")], _ctor);
}();
exports.TouchCanOperate = exp_TouchCanOperate;