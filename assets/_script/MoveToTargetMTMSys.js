Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToTargetMTMSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TYEventType = require("TYEventType");
var r_CommonFunc = require("CommonFunc");
var r_MoveToTargetMTMCom = require("MoveToTargetMTMCom");
var r_BehaviorMgr = require("BehaviorMgr");
var exp_MoveToTargetMTMSys = function () {
  function _ctor() {
    this.curPickNodePos = new cc.Vec2();
    this.curPickIndex = -1;
    this.oldPickNodeParent = null;
    this.curPickNode = null;
    this.startPickX = 0;
    this.startPickY = 0;
    this.putIndex = -1;
  }
  _ctor.prototype.onDestroy = function () {
    this.entity.pickInfo.forEach(function (e) {
      cc.Tween.stopAllByTarget(e.pickOriginNode);
    });
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_START, this.onToolStart, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolMove, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onToolEnd, this);
  };
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_START, this.onToolStart, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onToolEnd, this);
  };
  _ctor.prototype.onStart = function () {
    this.curPickIndex = -1;
    this.curPickNode = null;
    this.oldPickNodeParent = null;
    this.entity.pickInfo.forEach(function (e) {
      e.putTargetShowNode && (e.putTargetShowNode.opacity = 0);
    });
  };
  _ctor.prototype.onToolStart = function () {
    this.checkPick();
  };
  _ctor.prototype.onToolMove = function () {
    this.checkPut();
  };
  _ctor.prototype.onToolEnd = function () {
    this.putNode();
    this.resetPick();
    this.checkFinish();
  };
  _ctor.prototype.checkPick = function () {
    if (!this.entity.isAllFinish) {
      for (var e = 0; e < this.entity.pickInfo.length; e++) {
        var t = this.entity.pickInfo[e];
        if (!t.pickCompleted && r_CommonFunc.checkTouchNode(r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.currTouchEventData.getLocation(), t.pickOriginNode)) {
          this.curPickIndex = e;
          this.startPickX = t.pickOriginNode.x;
          this.startPickY = t.pickOriginNode.y;
          this.curPickNode = t.pickOriginNode;
          this.oldPickNodeParent = t.pickOriginNode.parent;
          t.pickOriginNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curPickNodePos);
          r_CommonFunc.changNodeParentV2(t.pickOriginNode, this.entity.node, this.curPickNodePos);
          this.entity.pickBehavior && this.entity.pickBehavior.execute();
          break;
        }
      }
    }
  };
  _ctor.prototype.checkPut = function () {
    this.putIndex = -1;
    if (!this.entity.isAllFinish && -1 != this.curPickIndex && (null == this.entity.putArea || r_CommonFunc.checkNodeOverOtherNode(this.curPickNode, this.entity.putArea))) {
      var e = -1;
      if (this.entity.isSort) {
        (null != this.entity.putArea || r_CommonFunc.checkNodeOverOtherNode(this.curPickNode, this.entity.pickInfo[this.curPickIndex].putTargetNode)) && (e = this.curPickIndex);
      } else {
        var t = -1;
        for (var o = 0; o < this.entity.pickInfo.length; o++) {
          var i = this.entity.pickInfo[o];
          if (!i.putCompleted && (-1 == t && (t = o, null != this.entity.putArea && (e = o)), r_CommonFunc.checkNodeOverOtherNode(this.curPickNode, i.putTargetNode))) {
            e = o;
            break;
          }
        }
      }
      this.putIndex = e;
      this.curPickNode.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curPickNodePos);
    }
  };
  _ctor.prototype.putNode = function () {
    var e = this.putIndex;
    if (-1 != e) {
      var t = this.entity.pickInfo[e];
      if (this.entity.putScale) {
        r_CommonFunc.changNodeParentV2(this.curPickNode, t.putTargetNode, this.curPickNodePos);
        if (t.putTargetShowNode) {
          r_BehaviorMgr.BehaviorMgr.timeout(.3, function () {
            t.putTargetShowNode.opacity = 255;
          });
          cc.tween(this.entity.pickInfo[this.curPickIndex].pickOriginNode).to(.3, {
            scaleX: 0,
            scaleY: 0
          }).start();
        }
      } else {
        r_CommonFunc.changNodeParentV2(this.curPickNode, t.putTargetNode, null);
        if (t.putTargetShowNode) {
          t.putTargetShowNode.opacity = 255;
          this.curPickNode.active = false;
        }
      }
      this.entity.pickInfo[this.curPickIndex].pickCompleted = true;
      t.putCompleted = true;
      this.resetPick(true);
      this.entity.putBehavior && this.entity.putBehavior.execute();
    }
  };
  _ctor.prototype.checkFinish = function () {
    if (!this.entity.isAllFinish) {
      var e = true;
      this.entity.pickInfo.forEach(function (t) {
        return e && (e = t.putCompleted);
      });
      if (e) {
        this.entity.finishedBehaviors && this.entity.finishedBehaviors.execute();
        this.entity.isAllFinish = true;
      }
    }
  };
  _ctor.prototype.resetPick = function (e) {
    undefined === e && (e = false);
    if (-1 != this.curPickIndex) {
      if (!e) {
        r_CommonFunc.changNodeParentV2(this.curPickNode, this.oldPickNodeParent, null);
        this.curPickNode.x = this.startPickX;
        this.curPickNode.y = this.startPickY;
      }
      this.oldPickNodeParent = null;
      this.curPickNode = null;
      this.curPickIndex = -1;
      this.startPickX = 0;
      this.startPickY = 0;
      this.putIndex = -1;
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_MoveToTargetMTMCom.MoveToTargetMTMCom)], _ctor);
}();
exports.MoveToTargetMTMSys = exp_MoveToTargetMTMSys;