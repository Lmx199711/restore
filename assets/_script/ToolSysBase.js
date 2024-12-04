Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolSysBase = undefined;
var r_TYEventType = require("TYEventType");
var exp_ToolSysBase = function () {
  function _ctor() {}
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.onTouchBegin, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onDisable = function () {
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onMove);
  };
  _ctor.prototype.onMove = function () {};
  _ctor.prototype.onTouchBegin = function () {};
  _ctor.prototype.onTouchEnd = function () {};
  return _ctor;
}();
exports.ToolSysBase = exp_ToolSysBase;