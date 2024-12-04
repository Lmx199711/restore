Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CleanFallToolSys = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_DecorateBehavior = require("DecorateBehavior");
var r_FallDown = require("FallDown");
var r_CleanFallToolCom = require("CleanFallToolCom");
var exp_CleanFallToolSys = function () {
  function _ctor() {}
  _ctor.prototype.onCleanProgress = function () {
    this.fallDownObj.create();
  };
  _ctor.prototype.onCleanSuccess = function () {};
  _ctor.prototype.onStart = function () {
    var e = this;
    this.entity.cleanInfos.forEach(function (t) {
      t.init(e.entity.cleanPoint, e);
    });
    this.fallDownObj = new r_FallDown.FallDownObject(this.entity.fallParent, this.entity.cleanPoint, this.entity.fallNode, this.entity.intervalTime, 0, this.entity.fallSpeed, this.entity.rotateRange);
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolsMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onTouchEnd, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_TRIGGER_ENTER, this.onToolCleanEnter, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolsMove, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onTouchEnd, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_TRIGGER_ENTER, this.onToolCleanEnter, this);
  };
  _ctor.prototype.onToolCleanEnter = function () {
    this.entity.cleanInfos.forEach(function (e) {
      e.cleanEnter();
    });
  };
  _ctor.prototype.onToolsMove = function () {
    this.entity.cleanInfos.forEach(function (e) {
      e.clean();
    });
  };
  _ctor.prototype.onTouchEnd = function () {
    var e = true;
    this.entity.cleanInfos.forEach(function (t) {
      e && (e = t.isCompleted);
      t.checkCleanCompleted();
      t.cleanEnd();
    });
    var t = true;
    for (var o = 0; o < this.entity.cleanInfos.length; o++) {
      if (!this.entity.cleanInfos[o].isFinished) {
        t = false;
        break;
      }
    }
    !e && t && this.entity.finishedBehaviors && this.entity.finishedBehaviors.execute();
  };
  _ctor.prototype.onUpdate = function (e) {
    this.fallDownObj.update(e);
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_CleanFallToolCom.CleanFallToolCom)], _ctor);
}();
exports.CleanFallToolSys = exp_CleanFallToolSys;