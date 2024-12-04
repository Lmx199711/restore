Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerActionMgr = undefined;
var r_Config = require("Config");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_BehaviorMgr = require("BehaviorMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var r_SubActionGroup = require("SubActionGroup");
var exp_TriggerActionMgr = function () {
  function _ctor() {}
  _ctor.addAction = function (e) {
    e.actionId = e.actionId.trim();
    if ("" != e.actionId) {
      if (this.actions[e.actionId]) {
        console.error("有重复的action", e.actionId);
      } else {
        this.actions[e.actionId] = e;
      }
    } else {
      console.error("添加的actionId为空", e);
    }
  };
  _ctor.clear = function () {
    r_GameKeyMgr.GameKeyMgr.clear();
    r_GameKeyValueMgr.GameKeyValueMgr.clear();
    this.actions = {};
  };
  _ctor.trigger = function (e) {
    if ("" != e) {
      e = e.trim();
      r_Config.default.isDebug && console.log("尝试执行id", e);
      if (this.actions[e]) {
        this.actions[e].trigger();
      } else {
        r_BehaviorMgr.BehaviorMgr.trigger(e);
      }
    }
  };
  _ctor.stop = function (e) {
    if ("" != e) {
      e = e.trim();
      r_Config.default.isDebug && console.log("尝试停止id", e);
      this.actions[e] && this.actions[e].onStop();
    }
  };
  _ctor.stopByType = function (t) {
    if (!this.activeTypeMap) {
      this.activeTypeMap = {};
      for (var o in r_SubActionGroup.ActionClass) this.activeTypeMap[r_SubActionGroup.ActionClass[o].name] = o;
    }
    for (var i in _ctor.actions) {
      var n = _ctor.actions[i];
      this.activeTypeMap[n.constructor.name] == t && n.onStop();
    }
  };
  _ctor.start = function () {
    for (var t in _ctor.actions) _ctor.actions[t].start();
  };
  _ctor.onRevive = function () {
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.revive);
    for (var t in _ctor.actions) {
      var o = _ctor.actions[t];
      if (o.isReviveAction) {
        r_Config.default.isDebug && console.log("尝试执行id", t);
        o.trigger();
      }
    }
  };
  _ctor.activeTypeMap = null;
  _ctor.actions = {};
  return _ctor;
}();
exports.TriggerActionMgr = exp_TriggerActionMgr;