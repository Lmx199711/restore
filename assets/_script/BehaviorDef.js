var exp_BehaviorComClass;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorComClass = exports.BehaviorType = exports.DragEndResetMode = exports.DragEndTargetHide = exports.COMPONENT_TYPE = exports.PROPERTY_TYPE = exports.DragJudgeMode = exports.TargetAmountMode = exports.HandleData = exports.ARGS = undefined;
var n;
var r_ExecuteBehaviorCom = require("ExecuteBehaviorCom");
var r_GameOverCom = require("GameOverCom");
var r_GameWinCom = require("GameWinCom");
var r_PlayAudioCom = require("PlayAudioCom");
var r_PlaySpineAnimationCom = require("PlaySpineAnimationCom");
var r_PlaySysAnimationCom = require("PlaySysAnimationCom");
var r_ShowNodesCom = require("ShowNodesCom");
var r_StepFinishCom = require("StepFinishCom");
var r_StopSoundCom = require("StopSoundCom");
var r_StopSpineAnimationCom = require("StopSpineAnimationCom");
var r_TouchDisabledCom = require("TouchDisabledCom");
var r_TweenOpacityCom = require("TweenOpacityCom");
var r_TweenPosCom = require("TweenPosCom");
var r_TweenScaleCom = require("TweenScaleCom");
var r_TweenXYCom = require("TweenXYCom");
var r_StartBehaviorCom = require("StartBehaviorCom");
var r_TweenAngleCom = require("TweenAngleCom");
var r_PlaySoundByParamCom = require("PlaySoundByParamCom");
var r_StopSoundByParamCom = require("StopSoundByParamCom");
var r_PlaySpineAnimationByParamCom = require("PlaySpineAnimationByParamCom");
var r_ShieldTouchTimeCom = require("ShieldTouchTimeCom");
var r_ChangeSizeXYCom = require("ChangeSizeXYCom");
var r_ToolOrderCom = require("ToolOrderCom");
var r_TweenPropCom = require("TweenPropCom");
var r_HandleCleanCom = require("HandleCleanCom");
var r_ChangeNodeZIndexCom = require("ChangeNodeZIndexCom");
var r_ActiveComponentCom = require("ActiveComponentCom");
var r_CalculateValueCom = require("CalculateValueCom");
var r_ActorCom = require("ActorCom");
var r_HpCom = require("HpCom");
var r_EffectCom = require("EffectCom");
var r_AppointedItemCom = require("AppointedItemCom");
var r_TriggerFunctionCom = require("TriggerFunctionCom");
var r_ColorModifyCom = require("ColorModifyCom");
var r_TimerCom = require("TimerCom");
var r_PositionSetCom = require("PositionSetCom");
exports.ARGS = {
  childSelf: "childSelf=",
  childAdd: "childAdd=",
  childAll: "=childAll",
  back: "back",
  childPP: "child++",
  now: "now=",
  args: "args=",
  over: "over"
};
exports.HandleData = function (e) {
  var t = "";
  var i = [];
  if (e && e.length > 0) {
    var n = e.replace(/\s*/g, "");
    for (var a in exports.ARGS) if (n.indexOf(exports.ARGS[a]) > -1) {
      t = exports.ARGS[a];
      var s = n.indexOf(exports.ARGS[a]);
      i = n.substring(s + exports.ARGS[a].length).split("|");
      break;
    }
  }
  return [t, i];
};
(function (e) {
  e[e["单个"] = 0] = "单个";
  e[e["多个"] = 1] = "多个";
})(exports.TargetAmountMode || (exports.TargetAmountMode = {}));
(function (e) {
  e[e["抬起时检测"] = 0] = "抬起时检测";
  e[e["移到位置时检测"] = 1] = "移到位置时检测";
})(exports.DragJudgeMode || (exports.DragJudgeMode = {}));
(function (e) {
  e[e.Position = 0] = "Position";
  e[e.Rotation = 1] = "Rotation";
  e[e.Scale = 2] = "Scale";
  e[e.Anchor = 3] = "Anchor";
  e[e.Size = 4] = "Size";
  e[e.Color = 5] = "Color";
  e[e.Opacity = 6] = "Opacity";
  e[e.Skew = 7] = "Skew";
  e[e.Active = 8] = "Active";
  e[e.Mask = 9] = "Mask";
})(exports.PROPERTY_TYPE || (exports.PROPERTY_TYPE = {}));
(function (e) {
  e[e.Mask = 0] = "Mask";
  e[e.Sprite = 1] = "Sprite";
})(exports.COMPONENT_TYPE || (exports.COMPONENT_TYPE = {}));
(function (e) {
  e[e["不隐藏"] = 0] = "不隐藏";
  e[e["隐藏父节点"] = 1] = "隐藏父节点";
  e[e["隐藏子节点"] = 2] = "隐藏子节点";
  e[e["隐藏工具自身"] = 3] = "隐藏工具自身";
})(exports.DragEndTargetHide || (exports.DragEndTargetHide = {}));
(function (e) {
  e[e["拖拽后永不重置"] = 0] = "拖拽后永不重置";
  e[e["成功后重置"] = 1] = "成功后重置";
  e[e["失败后重置"] = 2] = "失败后重置";
  e[e["成功失败重置"] = 3] = "成功失败重置";
})(exports.DragEndResetMode || (exports.DragEndResetMode = {}));
(function (e) {
  e[e["无"] = 0] = "无";
  e[e["直接触发一个行为"] = 1] = "直接触发一个行为";
  e[e["执行一个行为"] = 2] = "执行一个行为";
  e[e["显示隐藏节点"] = 3] = "显示隐藏节点";
  e[e["禁用启用组件"] = 4] = "禁用启用组件";
  e[e["播放系统动画"] = 5] = "播放系统动画";
  e[e["播放Spine动画"] = 6] = "播放Spine动画";
  e[e["播放Spine动画通过传入参数"] = 7] = "播放Spine动画通过传入参数";
  e[e["播放音效通过传参完成"] = 8] = "播放音效通过传参完成";
  e[e["停止音效通过传参完成"] = 9] = "停止音效通过传参完成";
  e[e["移动位置到指定位置"] = 10] = "移动位置到指定位置";
  e[e["闪现"] = 11] = "闪现";
  e[e["缓动节点属性"] = 12] = "缓动节点属性";
  e[e["改变节点的XY"] = 13] = "改变节点的XY";
  e[e["停止音效"] = 14] = "停止音效";
  e[e["播放音效"] = 15] = "播放音效";
  e[e["游戏结束"] = 16] = "游戏结束";
  e[e["游戏胜利"] = 17] = "游戏胜利";
  e[e["步骤完成"] = 18] = "步骤完成";
  e[e["停止spine动画"] = 19] = "停止spine动画";
  e[e["缩放节点"] = 20] = "缩放节点";
  e[e["设置透明度"] = 21] = "设置透明度";
  e[e["色值"] = 22] = "色值";
  e[e["禁用所有点击"] = 23] = "禁用所有点击";
  e[e["旋转节点角度"] = 24] = "旋转节点角度";
  e[e["禁用用户操作"] = 25] = "禁用用户操作";
  e[e["改变Size属性"] = 26] = "改变Size属性";
  e[e["工具流"] = 27] = "工具流";
  e[e["重置清理点"] = 28] = "重置清理点";
  e[e["改变节点zIndex"] = 29] = "改变节点zIndex";
  e[e["定义变量"] = 30] = "定义变量";
  e[e["角色说话"] = 31] = "角色说话";
  e[e["血量组件"] = 32] = "血量组件";
  e[e["效果组件"] = 33] = "效果组件";
  e[e["记录当前选中节点"] = 34] = "记录当前选中节点";
  e[e["触发方法"] = 35] = "触发方法";
  e[e["计时器"] = 36] = "计时器";
})(n = exports.BehaviorType || (exports.BehaviorType = {}));
(exp_BehaviorComClass = {})["" + n.直接触发一个行为] = r_StartBehaviorCom.StartBehaviorCom;
exp_BehaviorComClass["" + n.执行一个行为] = r_ExecuteBehaviorCom.ExecuteBehaviorCom;
exp_BehaviorComClass["" + n.显示隐藏节点] = r_ShowNodesCom.ShowNodesCom;
exp_BehaviorComClass["" + n.禁用启用组件] = r_ActiveComponentCom.ActiveComponentCom;
exp_BehaviorComClass["" + n.播放系统动画] = r_PlaySysAnimationCom.PlaySysAnimationCom;
exp_BehaviorComClass["" + n.播放Spine动画] = r_PlaySpineAnimationCom.PlaySpineAnimationCom;
exp_BehaviorComClass["" + n.闪现] = r_PositionSetCom.PositionSetCom;
exp_BehaviorComClass["" + n.移动位置到指定位置] = r_TweenPosCom.TweenPosCom;
exp_BehaviorComClass["" + n.改变节点的XY] = r_TweenXYCom.TweenXYCom;
exp_BehaviorComClass["" + n.缓动节点属性] = r_TweenPropCom.TweenPropCom;
exp_BehaviorComClass["" + n.播放音效] = r_PlayAudioCom.PlayAudioCom;
exp_BehaviorComClass["" + n.游戏结束] = r_GameOverCom.GameOverCom;
exp_BehaviorComClass["" + n.停止音效] = r_StopSoundCom.StopSoundCom;
exp_BehaviorComClass["" + n.步骤完成] = r_StepFinishCom.StepFinishCom;
exp_BehaviorComClass["" + n.停止spine动画] = r_StopSpineAnimationCom.StopSpineAnimationCom;
exp_BehaviorComClass["" + n.游戏胜利] = r_GameWinCom.GameWinCom;
exp_BehaviorComClass["" + n.缩放节点] = r_TweenScaleCom.TweenScaleCom;
exp_BehaviorComClass["" + n.设置透明度] = r_TweenOpacityCom.TweenOpacityCom;
exp_BehaviorComClass["" + n.色值] = r_ColorModifyCom.ColorModifyCom;
exp_BehaviorComClass["" + n.禁用所有点击] = r_TouchDisabledCom.TouchDisabledCom;
exp_BehaviorComClass["" + n.旋转节点角度] = r_TweenAngleCom.TweenAngleCom;
exp_BehaviorComClass["" + n.播放音效通过传参完成] = r_PlaySoundByParamCom.PlaySoundByParamCom;
exp_BehaviorComClass["" + n.停止音效通过传参完成] = r_StopSoundByParamCom.StopSoundByParamCom;
exp_BehaviorComClass["" + n.播放Spine动画通过传入参数] = r_PlaySpineAnimationByParamCom.PlaySpineAnimationByParamCom;
exp_BehaviorComClass["" + n.禁用用户操作] = r_ShieldTouchTimeCom.ShieldTouchTimeCom;
exp_BehaviorComClass["" + n.改变Size属性] = r_ChangeSizeXYCom.ChangeSizeXYCom;
exp_BehaviorComClass["" + n.工具流] = r_ToolOrderCom.ToolOrderCom;
exp_BehaviorComClass["" + n.重置清理点] = r_HandleCleanCom.HandleCleanCom;
exp_BehaviorComClass["" + n.改变节点zIndex] = r_ChangeNodeZIndexCom.ChangeNodeZIndexCom;
exp_BehaviorComClass["" + n.定义变量] = r_CalculateValueCom.CalculateValueCom;
exp_BehaviorComClass["" + n.角色说话] = r_ActorCom.ActorCom;
exp_BehaviorComClass["" + n.血量组件] = r_HpCom.HpCom;
exp_BehaviorComClass["" + n.效果组件] = r_EffectCom.EffectCom;
exp_BehaviorComClass["" + n.记录当前选中节点] = r_AppointedItemCom.AppointItemCom;
exp_BehaviorComClass["" + n.触发方法] = r_TriggerFunctionCom.TriggerFunctionCom;
exp_BehaviorComClass["" + n.计时器] = r_TimerCom.TimerCom;
exports.BehaviorComClass = exp_BehaviorComClass;