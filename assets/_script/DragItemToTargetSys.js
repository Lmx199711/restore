Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragItemToTargetSys = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_DragItemToTargetCom = require("DragItemToTargetCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_BehaviorDef = require("BehaviorDef");
var r_DragObject = require("DragObject");
var r_BehaviorMgr = require("BehaviorMgr");
var exp_DragItemToTargetSys = function () {
  function _ctor() {
    this.placed = false;
    this.canTriggerBegin = true;
  }
  _ctor.prototype.onStart = function () {
    this.dragObj = new r_DragObject.DragObject(this.entity.node, this.entity.targets);
  };
  _ctor.prototype.onDestroy = function () {
    this.dragObj = null;
  };
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
    this.startX = this.entity.node.x;
    this.startY = this.entity.node.y;
    this.canTriggerBegin && this.entity.isExpand && r_BehaviorMgr.BehaviorMgr.executeBehavior(this.entity.beginEvent);
  };
  _ctor.prototype.onTouchMove = function (e) {
    !this.placed && this.entity.canTouchInfo.canOperate() && this.dragObj && this.dragObj.move(e.getDeltaX(), e.getDeltaY());
  };
  _ctor.prototype.onTouchEnd = function (e) {
    var t = this;
    this.canTriggerBegin && this.entity.isExpand && r_BehaviorMgr.BehaviorMgr.executeBehavior(this.entity.endEvent);
    if (!this.placed && this.entity.canTouchInfo.canOperate() && this.entity.dragToTarget) {
      var o = this.dragObj.placed(e.getLocation(), false);
      if (o) {
        if (o.placeNode) {
          this.canTriggerBegin = false;
        } else {
          switch (this.entity.targetHideMode) {
            case 1:
              o.targetArea.active = false;
              break;
            case 2:
              o.targetArea.children.some(function (e) {
                if (e.name == t.entity.childNodeName) {
                  e.active = false;
                  return true;
                }
              });
          }
        }
        if (!(this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功后重置 && this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功失败重置)) {
          this.entity.node.x = this.startX;
          this.entity.node.y = this.startY;
        }
        this.placed = true;
      } else if (!(this.entity.resetMode != r_BehaviorDef.DragEndResetMode.失败后重置 && this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功失败重置)) {
        this.entity.node.x = this.startX;
        this.entity.node.y = this.startY;
      }
      if (o) {
        this.entity.node.emit(r_TYEventType.TYEventType.PLACE_ITEM_END, o.placeNode);
      } else {
        this.entity.node.emit(r_TYEventType.TYEventType.PLACE_ITEM_END, null);
      }
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_DragItemToTargetCom.DragItemToTargetCom)], _ctor);
}();
exports.DragItemToTargetSys = exp_DragItemToTargetSys;