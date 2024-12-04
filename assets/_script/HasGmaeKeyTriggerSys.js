Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HasGmaeKeyTriggerSys = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_Index = require("Index");
var r_BehaviorMgr = require("BehaviorMgr");
var r_HasGmaeKeyTrigger = require("HasGmaeKeyTrigger");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var exp_HasGmaeKeyTriggerSys = function () {
  function _ctor() {}
  _ctor.prototype.onStart = function () {
    r_Index.App.inst.on(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.onDestroy = function () {
    r_Index.App.inst.off(r_GameKeyMgr.GameKeyMgr.EventType.ChangeKey, this.onCheck, this);
  };
  _ctor.prototype.onEnable = function () {};
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onCheck = function (e) {
    var t = r_CommonFunc.stringKeyToArr(this.entity.needCheckKeys);
    if (t && -1 != t.findIndex(function (t) {
      return t == e.data.key;
    })) {
      var o = true;
      for (var i = 0; i < t.length; i++) {
        var a = t[i];
        if (!r_GameKeyMgr.GameKeyMgr.has(a)) {
          o = false;
          break;
        }
      }
      o && r_BehaviorMgr.BehaviorMgr.executeBehavior(this.entity.triggerActionId);
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_HasGmaeKeyTrigger.HasGmaeKeyTrigger)], _ctor);
}();
exports.HasGmaeKeyTriggerSys = exp_HasGmaeKeyTriggerSys;