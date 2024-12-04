Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddPicToolSys = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_DecorateBehavior = require("DecorateBehavior");
var r_AddPicToolCom = require("AddPicToolCom");
var exp_AddPicToolSys = function () {
  function _ctor() {}
  _ctor.prototype.onAddPicProgress = function () {};
  _ctor.prototype.onAddPicSuccess = function () {};
  _ctor.prototype.onStart = function () {
    var e = this;
    this.entity.cleanInfos.forEach(function (t) {
      t.init(e.entity.addPicPoint || e.entity.node, e);
    });
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolsMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_TRIGGER_ENTER, this.onToolCleanEnter, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolsMove, this);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
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
  return __decorate([r_DecorateBehavior.bindEventCom(r_AddPicToolCom.AddPicToolCom)], _ctor);
}();
exports.AddPicToolSys = exp_AddPicToolSys;