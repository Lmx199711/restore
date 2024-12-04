Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChooseColorToCleanNodeToolSys = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var r_ChooseColorToCleanToolCom = require("ChooseColorToCleanToolCom");
var exp_ChooseColorToCleanNodeToolSys = function () {
  function _ctor() {
    this.hasChooseColor = false;
    this.chooseColorTime = 0;
    this.isFail = false;
    this.canCleanNode = true;
    this.curChooseColor = -1;
    this.choosingColor = -1;
  }
  _ctor.prototype.onCleanProgress = function () {};
  _ctor.prototype.onCleanSuccess = function () {};
  _ctor.prototype.onStart = function () {
    var e = this;
    this.reset();
    this.entity.cleanInfos.forEach(function (t) {
      t.init(e.entity.cleanPoint || e.entity.node, e);
    });
    this.entity.chooseColorInfo.forEach(function (e) {
      e.chooseColorOverNode.active = false;
    });
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
    if (this.hasChooseColor && this.canCleanNode) {
      if (this.canCleanNode && this.isFail) {
        this.canCleanNode = false;
        this.entity.failBehaviors.execute();
      } else {
        this.entity.cleanInfos[this.curChooseColor].clean();
      }
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    this.reset();
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
  _ctor.prototype.checkFail = function () {
    var e = 0;
    for (var t = 0; t < this.entity.cleanInfos.length && this.entity.cleanInfos[t].isFinished; t++) {
      e++;
    }
    this.isFail = this.curChooseColor != e;
  };
  _ctor.prototype.onUpdate = function (e) {
    for (var t = 0; t < this.entity.chooseColorInfo.length; t++) {
      var o = this.entity.chooseColorInfo[t];
      if (r_CommonFunc.checkNodeOverOtherNode(this.entity.cleanPoint, o.chooseColorNode)) {
        if (this.choosingColor == t) {
          this.chooseColorTime += e;
          if (this.chooseColorTime > this.entity.chooseColorMinTime && this.curChooseColor != t) {
            this.hasChooseColor = true;
            o.chooseColorBehaviors.execute();
            this.canCleanNode = true;
            this.chooseColor(t);
            this.checkFail();
          }
        } else {
          this.chooseColorTime = 0;
          this.choosingColor = t;
        }
        break;
      }
    }
  };
  _ctor.prototype.chooseColor = function (e) {
    for (var t = 0; t < this.entity.chooseColorInfo.length; t++) {
      this.entity.chooseColorInfo[t].chooseColorOverNode.active = e == t;
    }
    this.curChooseColor = e;
  };
  _ctor.prototype.reset = function () {
    this.canCleanNode = true;
    this.isFail = false;
    this.chooseColor(-1);
    this.hasChooseColor = 0 == this.entity.chooseColorInfo.length;
    this.chooseColorTime = 0;
    this.choosingColor = -1;
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_ChooseColorToCleanToolCom.ChooseColorToCleanToolCom)], _ctor);
}();
exports.ChooseColorToCleanNodeToolSys = exp_ChooseColorToCleanNodeToolSys;