Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationToolSys = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_BehaviorMgr = require("BehaviorMgr");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var r_OperationToolCom = require("OperationToolCom");
var r_Index = require("Index");
var exp_OperationToolSys = function () {
  function _ctor() {
    this.isTrigger = false;
    this.canShowNextTools = false;
    this.oldzIndex = 0;
    this.oldSiblingIndex = 0;
    this.initNodeX = null;
    this.initNodeY = null;
    this.enterDieArea = false;
    this.isTriggerDie = false;
  }
  var t = _ctor;
  _ctor.prototype.onStart = function () {
    this.canShowNextTools = false;
    this.entity.nextToolsEnter.forEach(function (e) {
      e.isInit && e.target.setPosition(e.originPos);
    });
  };
  _ctor.prototype.onDestroy = function () {
    this.entity.nextToolsEnter.forEach(function (e) {
      cc.Tween.stopAllByTarget(e.target);
    });
  };
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    r_Index.App.inst.on(r_GameKeyMgr.EventType.ChangeKey, this.onChangeKey, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
    this.entity.node.on(r_TYEventType.TYEventType.DRAG_MOVE, this.onDragMove, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    r_Index.App.inst.off(r_GameKeyMgr.EventType.ChangeKey, this.onChangeKey, this);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
    this.entity.node.off(r_TYEventType.TYEventType.DRAG_MOVE, this.onDragMove, this);
  };
  _ctor.prototype.onChangeKey = function (e) {
    this.checkCanShowNextTools(e);
    var t = e.data.key;
    var o = r_CommonFunc.stringKeyToArr(this.entity.finishedKey);
    if (o && -1 != o.findIndex(function (e) {
      return e == t;
    })) {
      var i = true;
      for (var a = 0; a < o.length; a++) {
        var s = o[a];
        if (r_GameKeyMgr.GameKeyMgr.has(s)) {
          i = false;
          break;
        }
      }
      i && this.entity.behaviourWhenSuccess && r_BehaviorMgr.BehaviorMgr.executeBehavior(this.entity.behaviourWhenSuccess);
    }
  };
  _ctor.prototype.checkCanShowNextTools = function (e) {
    var t = e.data.key;
    var o = r_CommonFunc.stringKeyToArr(this.entity.showNextToolsKey);
    if (o && -1 != o.findIndex(function (e) {
      return e == t;
    })) {
      var i = true;
      for (var a = 0; a < o.length; a++) {
        var s = o[a];
        if (!r_GameKeyMgr.GameKeyMgr.has(s)) {
          i = false;
          break;
        }
      }
      i && (this.canShowNextTools = true);
      this.showNextTools();
    }
  };
  _ctor.prototype.getCheckPos = function (e) {
    undefined === e && (e = null);
    e || (e = cc.v2());
    if (this.entity.checkPos) {
      t.tempV2.x = 0;
      t.tempV2.y = 0;
      this.entity.checkPos.convertToWorldSpaceAR(t.tempV2, e);
    } else {
      t.tempV2.x = 0;
      t.tempV2.y = 0;
      this.entity.node.convertToWorldSpaceAR(t.tempV2, e);
    }
    return e;
  };
  _ctor.prototype.onTouchBegin = function () {
    this.isTriggerDie = false;
    if (this.entity.canTouchInfo.canOperate()) {
      this.initNodeX = this.entity.node.x;
      this.initNodeY = this.entity.node.y;
      this.isTrigger = false;
      this.enterDieArea = false;
      this.entity.touchChangeInfo.onStarTouch();
      var e = this.getCheckPos();
      r_CommonFunc.chekHasStringKeys(this.entity.canOperationKeys) && this.entity.node.emit(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_START, e);
      this.oldzIndex = this.entity.node.zIndex;
      this.entity.isTopFloor && (this.entity.node.zIndex = this.entity.node.parent.childrenCount);
      if (this.entity.isTopOfFloor) {
        this.oldSiblingIndex = this.entity.node.getSiblingIndex();
        this.entity.node.setSiblingIndex(this.entity.node.parent.childrenCount - 1);
      }
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    if (this.entity.canTouchInfo.canOperate() && null != this.initNodeX && null != this.initNodeY) {
      if (!this.entity.isFree) {
        this.entity.node.x = this.initNodeX;
        this.entity.node.y = this.initNodeY;
      }
      this.entity.touchChangeInfo.onEndTouch();
      var e = this.getCheckPos();
      r_CommonFunc.chekHasStringKeys(this.entity.canOperationKeys) && this.entity.node.emit(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, e, this.isTriggerDie);
      if (this.isTrigger) {
        this.isTrigger = false;
        this.entity.touchChangeInfo.onTriggerEixt();
        this.entity.node.emit(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_TRIGGER_EXIT, e);
      }
      this.showNextTools();
      this.entity.isTopFloor && (this.entity.node.zIndex = this.oldzIndex);
      this.entity.isTopOfFloor && this.entity.node.setSiblingIndex(this.oldSiblingIndex);
    }
  };
  _ctor.prototype.showNextTools = function () {
    if (this.canShowNextTools && !r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.isMouseDown) {
      this.entity.nextTools.forEach(function (e) {
        if (0 == e.delay) {
          e.node.active = e.isShow;
        } else {
          r_BehaviorMgr.BehaviorMgr.timeout(e.delay, function () {
            e.node.active = e.isShow;
          });
        }
      });
      this.entity.nextToolsEnter.forEach(function (e) {
        e.target.setPosition(e.originPos);
        if (0 == e.delay) {
          cc.tween(e.target).to(e.duration, {
            x: e.targetPos.x,
            y: e.targetPos.y
          }).start();
        } else {
          r_BehaviorMgr.BehaviorMgr.timeout(e.delay, function () {
            cc.tween(e.target).to(e.duration, {
              x: e.targetPos.x,
              y: e.targetPos.y
            }).start();
          });
        }
      });
      this.canShowNextTools = false;
    }
  };
  _ctor.prototype.onDragMove = function (e) {
    if (this.entity.canTouchInfo.canOperate() && null != this.initNodeX && null != this.initNodeY) {
      this.entity.node.x += e.getDeltaX();
      this.entity.node.y += e.getDeltaY();
      t.tempV2.x = 0;
      t.tempV2.y = 0;
      var o = this.getCheckPos();
      if (r_CommonFunc.chekHasStringKeys(this.entity.canOperationKeys)) {
        if (this.entity.operationArea) {
          if (r_CommonFunc.checkTouchNode(o, this.entity.operationArea)) {
            if (!this.isTrigger) {
              this.isTrigger = true;
              this.onTriggerEnter(o);
            }
            this.onTriggerStay(o);
          } else if (this.isTrigger) {
            this.isTrigger = false;
            this.onTriggerExit(o);
          }
        } else {
          this.entity.node.emit(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, o);
        }
      } else {
        var i = this.entity.dieArea;
        if (i && !this.isTriggerDie && r_CommonFunc.chekHasStringKeys(this.entity.failNeedKeys)) {
          if (r_CommonFunc.checkTouchNode(o, i)) {
            if (!this.enterDieArea) {
              this.enterDieArea = true;
              this.isTriggerDie = true;
              this.entity.behaviourWhenFail.execute();
            }
          } else {
            this.enterDieArea = false;
          }
        }
      }
    }
  };
  _ctor.prototype.onTriggerEnter = function (e) {
    this.entity.touchChangeInfo.onTriggerEnter();
    this.entity.node.emit(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_TRIGGER_ENTER, e);
  };
  _ctor.prototype.onTriggerExit = function (e) {
    this.entity.touchChangeInfo.onTriggerEixt();
    this.entity.node.emit(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_TRIGGER_EXIT, e);
  };
  _ctor.prototype.onTriggerStay = function (e) {
    this.entity.node.emit(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, e);
  };
  _ctor.tempV2 = cc.v2();
  return t = __decorate([r_DecorateBehavior.bindEventCom(r_OperationToolCom.OperationToolCom)], _ctor);
}();
exports.OperationToolSys = exp_OperationToolSys;