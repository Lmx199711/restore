Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragDirectionComSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_BehaviorDef = require("BehaviorDef");
var r_BehaviorMgr = require("BehaviorMgr");
var r_DragDirectionCom = require("DragDirectionCom");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TYEventType = require("TYEventType");
var exp_DragDirectionComSys = function () {
  function _ctor() {
    this.worldScale = new cc.Vec2(0, 0);
    this.rubTime = 0;
    this.rubFinish = false;
    this.dragItemPos = new cc.Vec2();
  }
  _ctor.prototype.onStart = function () {
    this.entity.node.getWorldScale(this.worldScale);
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.DRAG_BEGIN, this.onTouchBegin, this);
    this.entity.node.on(r_TYEventType.TYEventType.DRAG_MOVE, this.onTouchMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.DRAG_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
  };
  _ctor.prototype.onTouchBegin = function () {
    if (this.entity.canTouchInfo.canOperate()) {
      this.startX = this.entity.node.x;
      this.startY = this.entity.node.y;
      this.dragItemPos.x = this.entity.node.x;
      this.dragItemPos.y = this.entity.node.y;
      r_BehaviorMgr.BehaviorMgr.executeBehavior(this.entity.beginEvent);
      this.rubTime = 0;
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.entity.canTouchInfo.canOperate()) {
      var t = e.getDeltaX() / this.worldScale.x;
      var o = e.getDeltaY() / this.worldScale.y;
      this.dragItemPos.x += t;
      this.dragItemPos.y += o;
      (!this.entity.moveRight && this.dragItemPos.x > this.startX || !this.entity.moveLeft && this.dragItemPos.x < this.startX) && (this.dragItemPos.x = this.startX);
      (!this.entity.moveDown && this.dragItemPos.y < this.startY || !this.entity.moveUp && this.dragItemPos.y > this.startY) && (this.dragItemPos.y = this.startY);
      if (this.entity.isDragItem) {
        this.entity.node.x = this.dragItemPos.x;
        this.entity.node.y = this.dragItemPos.y;
      }
      if (this.entity.needRubTime > 0 && !this.rubFinish) {
        this.rubTime += 1 / cc.game.getFrameRate();
        if (this.rubTime > this.entity.needRubTime) {
          this.rubFinish = true;
          this.successFun();
        }
      }
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    if (this.entity.canTouchInfo.canOperate() && (r_BehaviorMgr.BehaviorMgr.executeBehavior(this.entity.endEvent), !(this.entity.needRubTime > 0))) {
      var e = this.dragItemPos.x - this.startX;
      var t = this.dragItemPos.y - this.startY;
      if (e * e + t * t > this.entity.moveDis * this.entity.moveDis && this.checkMoveDirection(e, t)) {
        this.successFun();
      } else {
        this.entity.resetMode != r_BehaviorDef.DragEndResetMode.失败后重置 && this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功失败重置 || this.resetPos();
      }
    }
  };
  _ctor.prototype.successFun = function () {
    this.entity.canTouchInfo.trigger();
    r_BehaviorMgr.BehaviorMgr.executeBehavior(this.entity.successEvent);
    this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功后重置 && this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功失败重置 || this.resetPos();
    this.entity.targetHideMode && (this.entity.node.active = false);
    this.entity.isDisableTouch && r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
  };
  _ctor.prototype.resetPos = function () {
    this.entity.node.x = this.startX;
    this.entity.node.y = this.startY;
  };
  _ctor.prototype.checkMoveDirection = function (e, t) {
    return !!(this.entity.moveDown && this.entity.moveUp && this.entity.moveLeft && this.entity.moveRight) || 0 == this.entity.dirAngle || 90 == this.entity.dirAngle || (this.entity.moveUp && t > 0 || this.entity.moveDown && t < 0) && Math.abs(e) / Math.abs(t) < Math.tan(30 * Math.PI / 180) || (this.entity.moveLeft && e < 0 || this.entity.moveRight && e > 0) && Math.abs(t) / Math.abs(e) < Math.tan(30 * Math.PI / 180);
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_DragDirectionCom.DragDirectionCom)], _ctor);
}();
exports.DragDirectionComSys = exp_DragDirectionComSys;