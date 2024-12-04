var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepFinishAction = undefined;
var r_GamingUI = require("GamingUI");
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_StepFinishAction = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    console.log("步骤完成了,显示特效或者播放音效");
    r_GamingUI.GamingUI.Inst.showStepTip(true);
  };
  return __decorate([_ccclass("StepFinishAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.StepFinishAction = exp_StepFinishAction;