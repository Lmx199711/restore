var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DismantleCom = undefined;
var r_TouchMoveTriggerBase = require("TouchMoveTriggerBase");
var r_CheckHasKeys = require("CheckHasKeys");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_GameKeyMgr = require("GameKeyMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_DismantleCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.moveDistance = 100;
    t.checkMoveKey = [];
    t.successSaveKey = "";
    t.downZOrder = 0;
    t.upZOrder = 10;
    t.showSuccessAnim = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.hitTest = function () {
    return r_CheckHasKeys.checkHasKeys(this.checkMoveKey);
  };
  _ctor.prototype._OnDragStart = function (t) {
    e.prototype._OnDragStart.call(this, t);
    this.node.zIndex = this.upZOrder;
  };
  _ctor.prototype._OnDragEnd = function (t) {
    this.node.zIndex = this.downZOrder;
    e.prototype._OnDragEnd.call(this, t);
    var o = t.getLocationX() - this.dragNodeOriginPosX;
    var i = t.getLocationY() - this.dragNodeOriginPosY;
    if (Math.abs(o) >= this.moveDistance || Math.abs(i) >= this.moveDistance) {
      var n = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var a = this.node.parent.convertToNodeSpaceAR(n);
      this.node.x = a.x;
      this.node.y = a.y;
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.successTriggerActionId);
      "" != this.successSaveKey && r_GameKeyMgr.GameKeyMgr.add(this.successSaveKey);
      this.showSuccessAnim;
    } else {
      this.node.x = this.dragNodeOriginPosX;
      this.node.y = this.dragNodeOriginPosY;
    }
  };
  _ctor.prototype.onDragMove = function (e) {
    if (!this.checkHasNotClickKey()) {
      this.node.x += e.getDeltaX();
      this.node.y += e.getDeltaY();
      this._OnDragMove(e);
    }
  };
  _ctor.prototype._OnDragMove = function (t) {
    e.prototype._OnDragMove.call(this, t);
  };
  __decorate([_property({
    displayName: "移动多少距离算成功"
  })], _ctor.prototype, "moveDistance", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "拆除移动的目标"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时,才能移动"
  })], _ctor.prototype, "checkMoveKey", undefined);
  __decorate([_property({
    displayName: "成功后存储的key"
  })], _ctor.prototype, "successSaveKey", undefined);
  __decorate([_property({
    displayName: "放下时层级"
  })], _ctor.prototype, "downZOrder", undefined);
  __decorate([_property({
    displayName: "抬起时层级"
  })], _ctor.prototype, "upZOrder", undefined);
  __decorate([_property({
    displayName: "显示步骤完成动画"
  })], _ctor.prototype, "showSuccessAnim", undefined);
  return __decorate([_ccclass, _menu("Action/事件/拆除")], _ctor);
}(r_TouchMoveTriggerBase.TouchMoveTriggerBase);
exports.DismantleCom = exp_DismantleCom;