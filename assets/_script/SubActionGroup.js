var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionType = exports.SubActionGroup = exports.removeAction = exports.addAction = exports.ActionClass = undefined;
var r_ActionBase = require("ActionBase");
var r_GameOverAction = require("GameOverAction");
var r_GameWinAction = require("GameWinAction");
var r_MoveAnimationAction = require("MoveAnimationAction");
var r_MoveNodesAction = require("MoveNodesAction");
var r_PlayAnimationAction = require("PlayAnimationAction");
var r_PlaySoundAction = require("PlaySoundAction");
var r_ScaleAction = require("ScaleAction");
var r_SetNodeOpacityAction = require("SetNodeOpacityAction");
var r_SetNodeShow = require("SetNodeShow");
var r_StartAction = require("StartAction");
var r_StopAnimationAction = require("StopAnimationAction");
var r_StopSoundAction = require("StopSoundAction");
var r_TriggerActions = require("TriggerActions");
var r_GameKeyMgr = require("GameKeyMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_StepFinishAction = require("StepFinishAction");
var r_RotateNodesAction = require("RotateNodesAction");
var r_TriggerByKey = require("TriggerByKey");
var r_SetKeyValue = require("SetKeyValue");
var r_ResetCleanCpt = require("ResetCleanCpt");
var r_SetNodesShowAndMove = require("SetNodesShowAndMove");
var r_AddKeyValue = require("AddKeyValue");
var r_ReviveAction = require("ReviveAction");
var r_SetLabelContent = require("SetLabelContent");
var r_RandomTriggerAction = require("RandomTriggerAction");
var r_LabelAddAnim = require("LabelAddAnim");
var r_SetBgSpeed = require("SetBgSpeed");
var r_AddProgressAction = require("AddProgressAction");
var r_PlayStopMusicAction = require("PlayStopMusicAction");
var r_SetNodesZOrder = require("SetNodesZOrder");
var r_CreateNodeAction = require("CreateNodeAction");
var r_TriggerByCondition = require("TriggerByCondition");
var r_LoopAction = require("LoopAction");
var r_ActionType = require("ActionType");
Object.defineProperty(exports, "ActionType", {
  enumerable: true,
  get: function () {
    return r_ActionType.ActionType;
  }
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var Y = _decorator.executeInEditMode;
exports.ActionClass = {};
exports.ActionClass[r_ActionType.ActionType.中转] = r_ActionBase.ActionBase;
exports.ActionClass[r_ActionType.ActionType.停止动画] = r_StopAnimationAction.StopAnimationAction;
exports.ActionClass[r_ActionType.ActionType.播放动画] = r_PlayAnimationAction.PlayAnimationAction;
exports.ActionClass[r_ActionType.ActionType.游戏失败] = r_GameOverAction.GameOverAction;
exports.ActionClass[r_ActionType.ActionType.游戏胜利] = r_GameWinAction.GameWinAction;
exports.ActionClass[r_ActionType.ActionType.节点缓动] = r_MoveAnimationAction.MoveAnimationAction;
exports.ActionClass[r_ActionType.ActionType.同时缓动多个节点角度] = r_RotateNodesAction.RotateNodesAction;
exports.ActionClass[r_ActionType.ActionType.同时缓动多个节点] = r_MoveNodesAction.MoveNodesAction;
exports.ActionClass[r_ActionType.ActionType.同时缓动多个节点的透明度] = r_SetNodeOpacityAction.SetNodeOpacityAction;
exports.ActionClass[r_ActionType.ActionType.播放音效] = r_PlaySoundAction.PlaySoundAction;
exports.ActionClass[r_ActionType.ActionType.播放或停止音乐] = r_PlayStopMusicAction.PlayStopMusicAction;
exports.ActionClass[r_ActionType.ActionType.缩放节点] = r_ScaleAction.ScaleAction;
exports.ActionClass[r_ActionType.ActionType.停止音效] = r_StopSoundAction.StopSoundAction;
exports.ActionClass[r_ActionType.ActionType.直接开始一个action] = r_StartAction.StartAction;
exports.ActionClass[r_ActionType.ActionType.复活时触发的action] = r_ReviveAction.ReviveAction;
exports.ActionClass[r_ActionType.ActionType.设置Key和Value] = r_SetKeyValue.SetKeyValue;
exports.ActionClass[r_ActionType.ActionType.增加Key的Value] = r_AddKeyValue.AddKeyValue;
exports.ActionClass[r_ActionType.ActionType.触发带值的action] = r_TriggerByKey.TriggerByKey;
exports.ActionClass[r_ActionType.ActionType.重置擦除节点] = r_ResetCleanCpt.ResetCleanCpt;
exports.ActionClass[r_ActionType.ActionType.触发多个action] = r_TriggerActions.TriggerActions;
exports.ActionClass[r_ActionType.ActionType.设置节点显示隐藏] = r_SetNodeShow.SetNodeShow;
exports.ActionClass[r_ActionType.ActionType.完成一个步骤] = r_StepFinishAction.StepFinishAction;
exports.ActionClass[r_ActionType.ActionType.设置多个节点显示隐藏并移动] = r_SetNodesShowAndMove.SetNodesShowAndMove;
exports.ActionClass[r_ActionType.ActionType.设置Label的内容] = r_SetLabelContent.SetLabelContent;
exports.ActionClass[r_ActionType.ActionType.随机触发action] = r_RandomTriggerAction.RandomTriggerAction;
exports.ActionClass[r_ActionType.ActionType.Label数值变化动画] = r_LabelAddAnim.LabelAddAnim;
exports.ActionClass[r_ActionType.ActionType.设置背景速度] = r_SetBgSpeed.SetBgSpeed;
exports.ActionClass[r_ActionType.ActionType.增加进度条] = r_AddProgressAction.AddProgressAction;
exports.ActionClass[r_ActionType.ActionType.设置层级] = r_SetNodesZOrder.SetNodesZOrder;
exports.ActionClass[r_ActionType.ActionType.创建节点] = r_CreateNodeAction.CreateNodeAction;
exports.ActionClass[r_ActionType.ActionType.判断条件触发action] = r_TriggerByCondition.TriggerByCondition;
exports.ActionClass[r_ActionType.ActionType.循环action] = r_LoopAction.LoopAction;
exports.addAction = function (e, t) {
  for (var i = 0; i < e.length; i++) {
    for (var n = i + 1; n < e.length; n++) {
      e[i].actionId == e[i].actionId && console.error("有重复的id", e[i].actionId);
    }
  }
  var a = exports.ActionClass[t];
  if (null == a) {
    console.error("添加action失败 type=", t);
  } else {
    e.unshift(new a());
  }
};
exports.removeAction = function (e, t) {
  var o = e.findIndex(function (e) {
    return e.actionId == t;
  });
  -1 != o && e.splice(o, 1);
};
var exp_SubActionGroup = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.originKey = [];
    t.addType = 0;
    t.add = false;
    t.removeActionId = "";
    t.remove = false;
    t.actionList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.update = function () {};
  _ctor.prototype.start = function () {
    for (var e = 0; e < this.originKey.length; e++) {
      r_GameKeyMgr.GameKeyMgr.add(this.originKey[e]);
    }
    for (e = 0; e < this.actionList.length; e++) {
      r_TriggerActionMgr.TriggerActionMgr.addAction(this.actionList[e]);
    }
  };
  _ctor.prototype.onDestroy = function () {
    for (var e = 0; e < this.actionList.length; e++) {
      this.actionList[e].destroy();
    }
  };
  __decorate([_property({
    type: [cc.String],
    displayName: "初始有用的key",
    serializable: true
  })], _ctor.prototype, "originKey", undefined);
  __decorate([_property({
    type: cc.Enum(r_ActionType.ActionType),
    displayName: "需要添加的行为"
  })], _ctor.prototype, "addType", undefined);
  __decorate([_property({
    displayName: "添加一个行为"
  })], _ctor.prototype, "add", undefined);
  __decorate([_property({
    displayName: "需要移除的actionId"
  })], _ctor.prototype, "removeActionId", undefined);
  __decorate([_property({
    displayName: "移除一个action"
  })], _ctor.prototype, "remove", undefined);
  __decorate([_property({
    type: [r_ActionBase.ActionBase],
    displayName: "行为",
    serializable: true
  })], _ctor.prototype, "actionList", undefined);
  return __decorate([_ccclass(), Y, _menu("Action/行为组")], _ctor);
}(cc.Component);
exports.SubActionGroup = exp_SubActionGroup;