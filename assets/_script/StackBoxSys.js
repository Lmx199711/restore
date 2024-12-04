Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StackBoxSys = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_BehaviorMgr = require("BehaviorMgr");
var r_StackBoxCom = require("StackBoxCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_StackBoxSys = function () {
  function _ctor() {}
  _ctor.prototype.onSuccessTrigger = function () {
    var e = this;
    if (this.entity.stackInfos.length > 0) {
      var t = this.entity.stackInfos[this.entity.stackInfos.length - 1];
      t.node.active = true;
      t.hideNode && (t.hideNode.active = false);
      if (this.entity.dragItem) {
        if (t.showToTouchPos) {
          var o = r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.currTouchEventData.getLocation();
          var i = t.node.parent.convertToNodeSpaceAR(o);
          i.x += t.placeOffsetX;
          i.y += t.placeOffsetY;
          t.node.x = i.x;
          t.node.y = i.y;
        }
        t.node.once(r_TYEventType.TYEventType.PLACE_ITEM_END, function (o) {
          if (o) {
            e.stackFinished();
          } else {
            t.node.active = false;
            t.hideNode && (t.hideNode.active = true);
          }
        }, this);
        r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.stopDrag();
        r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.startDrag(t.node, r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.currTouchEventData);
      } else {
        this.stackFinished();
      }
    }
    return true;
  };
  _ctor.prototype.onStart = function () {
    this.entity.canTouchInfo.regCallback(this);
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.CLICK, this.onClick, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.CLICK, this.onClick, this);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
  };
  _ctor.prototype.stackFinished = function () {
    this.entity.stackInfos.splice(this.entity.stackInfos.length - 1, 1);
    if (this.entity.stackInfos.length <= 0) {
      this.entity.allFinishedActionId && r_BehaviorMgr.BehaviorMgr.trigger(this.entity.allFinishedActionId);
      this.entity.allHide && (this.entity.node.active = false);
    }
  };
  _ctor.prototype.onClick = function () {
    this.entity.dragItem || this.entity.canTouchInfo.trigger();
  };
  _ctor.prototype.onTouchBegin = function () {
    this.entity.dragItem && this.entity.canTouchInfo.trigger();
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_StackBoxCom.StackBoxCom)], _ctor);
}();
exports.StackBoxSys = exp_StackBoxSys;