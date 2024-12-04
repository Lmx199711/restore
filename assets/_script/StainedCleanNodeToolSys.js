Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StainedCleanNodeToolSys = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_DecorateBehavior = require("DecorateBehavior");
var r_StainedCleanNodeToolCom = require("StainedCleanNodeToolCom");
var r_CommonFunc = require("CommonFunc");
var exp_StainedCleanNodeToolSys = function () {
  function _ctor() {
    this.isDraged = false;
  }
  _ctor.prototype.onCleanProgress = function () {};
  _ctor.prototype.onCleanSuccess = function () {};
  _ctor.prototype.onStart = function () {
    var e = this;
    this.entity.cleanInfos.forEach(function (t) {
      t.init(e.entity.cleanPoint, e);
    });
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onToolsStart, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolsMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolsMove, this);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onToolsStart = function () {
    this.isDraged = true;
  };
  _ctor.prototype.onToolsMove = function () {
    this.entity.cleanInfos.forEach(function (e) {
      e.clean();
    });
  };
  _ctor.prototype.onTouchEnd = function () {
    this.isDraged = false;
    var e = true;
    this.entity.cleanInfos.forEach(function (t) {
      e && (e = t.isCompleted);
      t.checkCleanCompleted();
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
    if (this.isDraged) {
      for (var t = 0; t < this.entity.stainedColorInfos.length; t++) {
        var o = this.entity.stainedColorInfos[t];
        if (r_CommonFunc.checkNodeOverOtherNode(this.entity.cleanPoint, o.colorNode)) {
          if (this.entity.stainedColorIndex == t) {
            this.entity.stainedCostTime += e;
            if (this.entity.stainedCostTime >= this.entity.stainedTime) {
              this.entity.stainedCostTime = 0;
              o.stainedBehavior.execute();
            }
          } else {
            this.entity.stainedColorIndex = t;
            this.entity.stainedCostTime = 0;
          }
        }
      }
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_StainedCleanNodeToolCom.StainedCleanNodeToolCom)], _ctor);
}();
exports.StainedCleanNodeToolSys = exp_StainedCleanNodeToolSys;