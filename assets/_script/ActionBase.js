Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionBase = undefined;
var r_SoundMgr = require("SoundMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_ActionType = require("ActionType");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var h = false;
var exp_ActionBase = function () {
  function _ctor() {
    this.actionId = "";
    this.desc = "";
    this._isDebug = false;
    this.log = "";
    this.nextActionId = "";
    this.delay = 0;
    this.saveKey = "";
    this.deleteKey = "";
    this.soundName = "";
    this.stopActionName = "";
    this.stopAllSound = false;
    this.actionList = [];
    this.stopTypeAction = r_ActionType.ActionType.无;
    this.timeoutIndex = [];
  }
  Object.defineProperty(_ctor.prototype, "isDebug", {
    get: function () {
      return this._isDebug;
    },
    set: function (e) {
      h = e;
      this._isDebug = e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "target", {
    get: function () {
      return this.opNode;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.start = function () {};
  _ctor.prototype.trigger = function () {
    this.stopTypeAction != r_ActionType.ActionType.无 && r_TriggerActionMgr.TriggerActionMgr.stopByType(this.stopTypeAction);
    this.stopAllSound && r_SoundMgr.SoundMgr.stopAllSound();
    "" != this.soundName && r_SoundMgr.SoundMgr.playSound(this.soundName);
    "" != this.stopActionName && r_TriggerActionMgr.TriggerActionMgr.stop(this.stopActionName);
    this.onTrigger();
    this.onFinished();
    for (var e = 0; e < this.actionList.length; e++) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.actionList[e]);
    }
    this.isDebug && cc.log(this.log);
  };
  _ctor.prototype.onTrigger = function () {};
  _ctor.prototype.onStop = function () {};
  _ctor.prototype.clearTimeOut = function () {
    for (var e = 0; e < this.timeoutIndex.length; e++) {
      clearTimeout(this.timeoutIndex[e]);
    }
    this.timeoutIndex.length = 0;
  };
  _ctor.prototype.destroy = function () {
    for (var e = 0; e < this.timeoutIndex.length; e++) {
      clearTimeout(this.timeoutIndex[e]);
    }
    this.timeoutIndex.length = 0;
  };
  _ctor.prototype.onFinished = function () {
    var e = this;
    var t = setTimeout(function () {
      "" != e.saveKey && r_GameKeyMgr.GameKeyMgr.add(e.saveKey);
      "" != e.deleteKey && r_GameKeyMgr.GameKeyMgr.remove(e.deleteKey);
      r_TriggerActionMgr.TriggerActionMgr.trigger(e.nextActionId);
    }, 1e3 * this.delay);
    this.timeoutIndex.push(t);
  };
  __decorate([_property({
    displayName: "action的唯一id"
  })], _ctor.prototype, "actionId", undefined);
  __decorate([_property({
    displayName: "在这里写这个组件的功能描述"
  })], _ctor.prototype, "desc", undefined);
  __decorate([_property({
    serializable: true
  })], _ctor.prototype, "_isDebug", undefined);
  __decorate([_property({
    type: cc.Boolean,
    displayName: "调试显示的日志"
  })], _ctor.prototype, "isDebug", null);
  __decorate([_property({
    displayName: "显示日志的内容",
    visible: function () {
      return h;
    }
  })], _ctor.prototype, "log", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "要操作的对象"
  })], _ctor.prototype, "opNode", undefined);
  __decorate([_property({
    displayName: "当前动作结束之后的下一个action"
  })], _ctor.prototype, "nextActionId", undefined);
  __decorate([_property({
    displayName: "执行下一步的时间"
  })], _ctor.prototype, "delay", undefined);
  __decorate([_property({
    displayName: "储存一个标记"
  })], _ctor.prototype, "saveKey", undefined);
  __decorate([_property({
    displayName: "删除一个标记"
  })], _ctor.prototype, "deleteKey", undefined);
  __decorate([_property({
    displayName: "播放一个音效"
  })], _ctor.prototype, "soundName", undefined);
  __decorate([_property({
    displayName: "停止action的名称"
  })], _ctor.prototype, "stopActionName", undefined);
  __decorate([_property({
    displayName: "停止所有音效"
  })], _ctor.prototype, "stopAllSound", undefined);
  __decorate([_property({
    type: [String],
    displayName: "执行action列表"
  })], _ctor.prototype, "actionList", undefined);
  __decorate([_property({
    type: cc.Enum(r_ActionType.ActionType),
    displayName: "停止这类型所有action"
  })], _ctor.prototype, "stopTypeAction", undefined);
  return __decorate([_ccclass("ActionBase")], _ctor);
}();
exports.ActionBase = exp_ActionBase;