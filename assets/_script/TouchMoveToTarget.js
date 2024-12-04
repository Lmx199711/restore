var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchMoveToTarget = undefined;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_CheckHasKeys = require("CheckHasKeys");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var r_GamingUI = require("GamingUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_TouchMoveToTarget = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.successResetPos = false;
    t.successSaveKey = "";
    t.checkFailKey = [];
    t.checkWinKey = [];
    t.changeZOrder = false;
    t.downZOrder = 0;
    t.upZOrder = 10;
    t.showSuccessAnim = false;
    t.putFailAction = "";
    t._triggerFail = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.hitTest = function () {
    return r_CheckHasKeys.checkHasKeys(this.hasKey);
  };
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
    this._triggerFail = false;
    this.changeZOrder && (this.node.zIndex = this.upZOrder);
  };
  _ctor.prototype._OnDragEnd = function (t) {
    this.changeZOrder && (this.node.zIndex = this.downZOrder);
    if (this._triggerFail) {
      this._triggerFail = false;
    } else {
      e.prototype._OnDragEnd.call(this, t);
      var o = t.getLocation();
      if (this.targetPolygon) {
        this.targetPolygon.node.convertToNodeSpaceAR(o, this._vec2_temp);
        if (cc.Intersection.pointInPolygon(this._vec2_temp, this.targetPolygon.points) && r_CheckHasKeys.checkHasKeys(this.checkWinKey)) {
          var i = this.targetPolygon.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
          var n = this.node.parent.convertToNodeSpaceAR(i);
          this.node.x = n.x;
          this.node.y = n.y;
          r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
          this.successResetPos && this.resetPos();
          "" != this.successSaveKey && r_GameKeyMgr.GameKeyMgr.add(this.successSaveKey);
          this.showSuccessAnim && r_GamingUI.GamingUI.Inst.showStepTip(true);
        } else if (this.errorPolygon) {
          this.errorPolygon.node.convertToNodeSpaceAR(o, this._vec2_temp);
          if (cc.Intersection.pointInPolygon(this._vec2_temp, this.errorPolygon.points)) {
            r_TriggerActionMgr.TriggerActionMgr.trigger(this.putFailAction);
            this.resetPos();
          } else {
            this.resetPos();
          }
        } else {
          r_TriggerActionMgr.TriggerActionMgr.trigger(this.putFailAction);
          this.resetPos();
        }
      }
    }
  };
  _ctor.prototype.onDragMove = function (t) {
    this._triggerFail || e.prototype.onDragMove.call(this, t);
  };
  _ctor.prototype._OnDragMove = function (t) {
    if (!this._triggerFail) {
      e.prototype._OnDragMove.call(this, t);
      var o = t.getLocation();
      if (this.targetPolygon && !r_CheckHasKeys.checkHasKeys(this.checkFailKey)) {
        this.targetPolygon.node.convertToNodeSpaceAR(o, this._vec2_temp);
        if (cc.Intersection.pointInPolygon(this._vec2_temp, this.targetPolygon.points)) {
          r_TriggerActionMgr.TriggerActionMgr.trigger(this.failTriggerActionId);
          this.resetPos();
          this._triggerFail = true;
        }
      }
    }
  };
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "拖动的目标区域"
  })], _ctor.prototype, "targetPolygon", undefined);
  __decorate([_property({
    displayName: "成功后是否重置位置"
  })], _ctor.prototype, "successResetPos", undefined);
  __decorate([_property({
    displayName: "成功后存储的key"
  })], _ctor.prototype, "successSaveKey", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时,检测失败"
  })], _ctor.prototype, "checkFailKey", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时,检测成功"
  })], _ctor.prototype, "checkWinKey", undefined);
  __decorate([_property({
    displayName: "移动是否修改层级"
  })], _ctor.prototype, "changeZOrder", undefined);
  __decorate([_property({
    type: Number,
    displayName: "放下时层级"
  })], _ctor.prototype, "downZOrder", undefined);
  __decorate([_property({
    type: Number,
    displayName: "抬起时层级"
  })], _ctor.prototype, "upZOrder", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  __decorate([_property({
    displayName: "放错后触发的action"
  })], _ctor.prototype, "putFailAction", undefined);
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "放错的目标区域"
  })], _ctor.prototype, "errorPolygon", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拖动物体移动到指定目标")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.TouchMoveToTarget = exp_TouchMoveToTarget;