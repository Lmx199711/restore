Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerTargetToolSys = undefined;
var r_TYEventType = require("TYEventType");
var r_BlenderToolCom = require("BlenderToolCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TimeSystem = require("TimeSystem");
var exp_TriggerTargetToolSys = function () {
  function _ctor() {
    this.isMoving = [];
    this.isFinishEvent = [];
    this.moveTime = [];
    this.tempPos = [];
    this.allPos = [];
    this.pos = [];
  }
  _ctor.prototype.onStart = function () {
    for (var e = 0; e < this.entity.nodeArr.length; e++) {
      var t = this.entity.nodeArr[e];
      this.isMoving[e] = false;
      this.isFinishEvent[e] = false;
      this.allPos[e] = 0;
      this.moveTime[e] = this.entity.nodeArr[e].moveTime > 0 ? this.entity.nodeArr[e].moveTime : 1;
      this.tempPos[e] = 0;
      this.pos[e] = [];
      var o = t.obj.children.length;
      for (var i = 0; i < o; i++) {
        var n = t.obj.children[i].x;
        var a = t.obj.children[i].y;
        this.pos[e][i] = {
          x: n,
          y: a,
          z: 0
        };
      }
    }
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_START, this.onDragBegin, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onAreaStaying, this);
    this.entity.node.on(r_TYEventType.TYEventType.DRAG_MOVE, this.onTouchMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onDragEnd, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
  };
  _ctor.prototype.onAreaStaying = function (e) {
    var t = this;
    this.lastX = e.x;
    this.lastY = e.y;
    var o = function (e) {
      if (!i.isMoving[e]) {
        for (var o = 0; o < i.pos[e].length; o++) {
          var n = o;
          var a = n + i.tempPos[e] + 1;
          a >= i.pos[e].length && (a -= i.pos[e].length);
          i.entity.nodeArr[e].obj.children[n].runAction(cc.moveTo(i.moveTime[e], i.pos[e][a]));
        }
        i.allPos[e] === i.entity.nodeArr[e].blendTime && (i.isFinishEvent[e] || (i.entity.nodeArr[e].nextBehaviorInfo.forEach(function (e) {
          return e.execute();
        }), i.isFinishEvent[e] = true));
        r_TimeSystem.TimeSystem.scheduleOnce("blending" + e, i.moveTime[e] + .001, function () {
          t.allPos[e]++;
          t.tempPos[e]++;
          t.isMoving[e] = false;
          t.tempPos[e] >= t.pos[e].length && (t.tempPos[e] = 0);
        });
        i.isMoving[e] = true;
      }
    };
    var i = this;
    for (var n = 0; n < this.pos.length; n++) {
      o(n);
    }
  };
  _ctor.prototype.onDragBegin = function () {
    this.startX = this.entity.node.x;
    this.startY = this.entity.node.y;
  };
  _ctor.prototype.onTouchMove = function () {};
  _ctor.prototype.onCheck = function () {};
  _ctor.prototype.onDragEnd = function () {};
  _ctor.prototype.doTrigger = function () {};
  return __decorate([r_DecorateBehavior.bindEventCom(r_BlenderToolCom.BlenderToolCom)], _ctor);
}();
exports.TriggerTargetToolSys = exp_TriggerTargetToolSys;