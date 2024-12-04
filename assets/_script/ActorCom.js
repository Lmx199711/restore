var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorCom = undefined;
var r_FsmActionCom = require("FsmActionCom");
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_ActorCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bubNode = null;
    t.bubStr = "";
    t.isHideBub = false;
    t.audioName = "";
    t.spineNode = null;
    t.spineClipName = "";
    t.defaultClipName = "daiji";
    t.isUseFsm2Spine = false;
    t.triggerFsmInfo = Array();
    t.idleFsmInfo = Array();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "气泡节点",
    type: cc.Node
  })], _ctor.prototype, "bubNode", undefined);
  __decorate([_property({
    displayName: "气泡文字"
  })], _ctor.prototype, "bubStr", undefined);
  __decorate([_property({
    displayName: "音效结束是否隐藏气泡"
  })], _ctor.prototype, "isHideBub", undefined);
  __decorate([_property({
    displayName: "播放音效名称"
  })], _ctor.prototype, "audioName", undefined);
  __decorate([_property({
    displayName: "spine节点",
    type: cc.Node
  })], _ctor.prototype, "spineNode", undefined);
  __decorate([_property({
    displayName: "spine片段名"
  })], _ctor.prototype, "spineClipName", undefined);
  __decorate([_property({
    displayName: "spine待机片段名"
  })], _ctor.prototype, "defaultClipName", undefined);
  __decorate([_property({
    displayName: "使用状态机编辑spine"
  })], _ctor.prototype, "isUseFsm2Spine", undefined);
  __decorate([_property({
    displayName: "触发-状态机",
    type: r_FsmActionCom.FsmActionInfo,
    visible: function () {
      return this.isUseFsm2Spine;
    }
  })], _ctor.prototype, "triggerFsmInfo", undefined);
  __decorate([_property({
    displayName: "待机-状态机",
    type: r_FsmActionCom.FsmActionInfo,
    visible: function () {
      return this.isUseFsm2Spine;
    }
  })], _ctor.prototype, "idleFsmInfo", undefined);
  return __decorate([_ccclass("ActorCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.ActorCom = exp_ActorCom;