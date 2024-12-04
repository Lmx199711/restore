Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MakeDumplingsSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TYEventType = require("TYEventType");
var r_CommonFunc = require("CommonFunc");
var r_MakeDumplingsCom = require("MakeDumplingsCom");
var r_BehaviorMgr = require("BehaviorMgr");
var r_SoundMgr = require("SoundMgr");
var exp_MakeDumplingsSys = function () {
  function _ctor() {
    this.curStep = 0;
    this.curIndex = 0;
    this.curMovePos = new cc.Vec2();
    this.oldIndex = 0;
    this.oldParent = null;
    this.oldPos = new cc.Vec2();
    this.curPickDumplingsWrapper = null;
    this.curPickDumplingsFilling = null;
    this.dumplingFillingOldIndex = 0;
    this.dumplingsFillingOldPos = new cc.Vec2();
    this.dumplingsFillingOldParent = null;
    this.curMoveToTargetDumpling = null;
  }
  _ctor.prototype.onDestroy = function () {
    cc.Tween.stopAllByTarget(this.curMoveToTargetDumpling);
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
    this.entity.dumplingsWrapperTarget.forEach(function (e) {
      e.active = false;
    });
    this.entity.dumplingsFillingTarget.forEach(function (e) {
      e.active = false;
    });
    this.entity.dumplingsAniNodeTarget.forEach(function (e) {
      e.active = false;
    });
    this.entity.dumplingsAniNode.forEach(function (e) {
      e.active = false;
    });
  };
  _ctor.prototype.onToolStart = function () {
    var e = r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.currTouchEventData.getLocation();
    this.checkPickDumplingsWrapper(e);
    this.checkPickSpoon(e);
  };
  _ctor.prototype.onToolMove = function () {
    this.checkPickDumplingsFilling();
    this.checkPutDumplingsFilling();
    this.curPickDumplingsWrapper && this.curPickDumplingsWrapper.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curMovePos);
  };
  _ctor.prototype.onToolEnd = function () {
    this.checkPlayMakeDumplingAnimation();
    this.checkPutDumplingsWrapper();
    this.resetPos();
  };
  _ctor.prototype.checkPickDumplingsWrapper = function (e) {
    if (0 == this.curStep) {
      var t = this.entity.dumplingsWrapper[this.curIndex];
      if (r_CommonFunc.checkTouchNode(e, t)) {
        this.curPickDumplingsWrapper = t;
        this.oldIndex = this.curPickDumplingsWrapper.zIndex;
        this.oldPos.x = this.curPickDumplingsWrapper.x;
        this.oldPos.y = this.curPickDumplingsWrapper.y;
        this.oldParent = this.curPickDumplingsWrapper.parent;
        var o = this.curPickDumplingsWrapper.convertToWorldSpaceAR(cc.Vec2.ZERO);
        r_CommonFunc.changNodeParentV2(this.curPickDumplingsWrapper, this.entity.node, o);
        this.curPickDumplingsWrapper.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curMovePos);
        this.curStep = 1;
        this.entity.pickDumplingsWrapperSound && r_SoundMgr.SoundMgr.playSound(this.entity.pickDumplingsWrapperSound);
      }
    }
  };
  _ctor.prototype.checkPutDumplingsWrapper = function () {
    if (1 == this.curStep && r_CommonFunc.checkTouchNode(this.curMovePos, this.entity.putArea)) {
      this.entity.dumplingsWrapperTarget[this.curIndex].active = true;
      this.curPickDumplingsWrapper.active = false;
      this.resetWrapperPos();
      this.curStep = 2;
      this.entity.putDumplingsWrapperSound && r_SoundMgr.SoundMgr.playSound(this.entity.putDumplingsWrapperSound);
    }
  };
  _ctor.prototype.checkPickSpoon = function (e) {
    if (2 == this.curStep && r_CommonFunc.checkTouchNode(e, this.entity.spoon)) {
      var t = this.entity.spoon.convertToWorldSpaceAR(cc.Vec2.ZERO);
      this.oldIndex = this.entity.spoon.zIndex;
      this.oldPos.x = this.entity.spoon.x;
      this.oldPos.y = this.entity.spoon.y;
      this.oldParent = this.entity.spoon.parent;
      r_CommonFunc.changNodeParentV2(this.entity.spoon, this.entity.node, t);
      this.curStep = 3;
    }
  };
  _ctor.prototype.checkPickDumplingsFilling = function () {
    if (3 == this.curStep && r_CommonFunc.checkNodeOverOtherNode(this.entity.spoonPickPoint, this.entity.dumplingsFilling[this.curIndex])) {
      this.curPickDumplingsFilling = this.entity.dumplingsFilling[this.curIndex];
      this.dumplingsFillingOldPos.x = this.curPickDumplingsFilling.x;
      this.dumplingsFillingOldPos.y = this.curPickDumplingsFilling.y;
      this.dumplingsFillingOldParent = this.curPickDumplingsFilling.parent;
      this.dumplingFillingOldIndex = this.curPickDumplingsFilling.zIndex;
      r_CommonFunc.changNodeParentV2(this.curPickDumplingsFilling, this.entity.spoonPickPoint, null);
      this.curStep = 4;
      this.entity.pickDumplingsFillingSound && r_SoundMgr.SoundMgr.playSound(this.entity.pickDumplingsFillingSound);
    }
  };
  _ctor.prototype.checkPutDumplingsFilling = function () {
    if (4 == this.curStep && r_CommonFunc.checkNodeOverOtherNode(this.curPickDumplingsFilling, this.entity.putArea)) {
      this.entity.dumplingsFillingTarget[this.curIndex].active = true;
      this.resetFillingPos();
      this.curStep = 5;
      this.entity.putDumplingsFillingSound && r_SoundMgr.SoundMgr.playSound(this.entity.putDumplingsFillingSound);
    }
  };
  _ctor.prototype.checkPlayMakeDumplingAnimation = function () {
    var e = this;
    if (5 == this.curStep) {
      this.entity.dumplingsWrapperTarget[this.curIndex].active = false;
      this.entity.dumplingsFillingTarget[this.curIndex].active = false;
      this.entity.dumplingsAniNode[this.curIndex].active = true;
      this.curStep = 6;
      r_BehaviorMgr.BehaviorMgr.timeout(this.entity.delayAniTime[this.curIndex], function () {
        e.checkDumplingMoveToTargetPos();
      });
      this.entity.makeDumplingsSound && r_SoundMgr.SoundMgr.playSound(this.entity.makeDumplingsSound);
    }
  };
  _ctor.prototype.checkDumplingMoveToTargetPos = function () {
    var e = this;
    if (6 == this.curStep) {
      this.curMoveToTargetDumpling = this.entity.dumplingsAniNode[this.curIndex];
      var t = this.entity.dumplingsAniNodeTarget[this.curIndex].convertToWorldSpaceAR(cc.Vec2.ZERO);
      this.curMoveToTargetDumpling.parent.convertToNodeSpaceAR(t, t);
      cc.tween(this.curMoveToTargetDumpling).to(1, {
        x: t.x,
        y: t.y
      }).start();
      r_BehaviorMgr.BehaviorMgr.timeout(1, function () {
        e.curMoveToTargetDumpling.active = false;
        e.entity.dumplingsAniNodeTarget[e.curIndex].active = true;
        e.curIndex++;
        if (e.curIndex >= e.entity.dumplingsWrapper.length) {
          e.entity.isAllFinish = true;
          e.entity.finishedBehaviors.execute();
        } else {
          e.curStep = 0;
        }
      });
    }
  };
  _ctor.prototype.resetPos = function () {
    if (1 == this.curStep) {
      this.resetWrapperPos();
      this.curStep = 0;
    }
    if (3 == this.curStep) {
      this.resetSpoonPos();
      this.curStep = 2;
    }
    if (4 == this.curStep) {
      this.resetSpoonPos();
      this.resetFillingPos();
      this.curStep = 2;
    }
    6 == this.curStep && this.resetSpoonPos();
  };
  _ctor.prototype.resetSpoonPos = function () {
    if (this.oldParent) {
      r_CommonFunc.changNodeParentV2(this.entity.spoon, this.oldParent, null);
      this.entity.spoon.x = this.oldPos.x;
      this.entity.spoon.y = this.oldPos.y;
      this.entity.spoon.zIndex = this.oldIndex;
      this.oldParent = null;
    }
  };
  _ctor.prototype.resetWrapperPos = function () {
    if (this.curPickDumplingsWrapper) {
      r_CommonFunc.changNodeParentV2(this.curPickDumplingsWrapper, this.oldParent, null);
      this.curPickDumplingsWrapper.x = this.oldPos.x;
      this.curPickDumplingsWrapper.y = this.oldPos.y;
      this.curPickDumplingsWrapper.zIndex = this.oldIndex;
      this.curPickDumplingsWrapper = null;
    }
  };
  _ctor.prototype.resetFillingPos = function () {
    if (this.curPickDumplingsFilling) {
      r_CommonFunc.changNodeParentV2(this.curPickDumplingsFilling, this.dumplingsFillingOldParent, null);
      this.curPickDumplingsFilling.x = this.dumplingsFillingOldPos.x;
      this.curPickDumplingsFilling.y = this.dumplingsFillingOldPos.y;
      this.curPickDumplingsFilling.zIndex = this.dumplingFillingOldIndex;
      this.curPickDumplingsFilling = null;
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_MakeDumplingsCom.MakeDumplingsCom)], _ctor);
}();
exports.MakeDumplingsSys = exp_MakeDumplingsSys;