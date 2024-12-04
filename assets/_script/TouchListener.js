var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchListener = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_TouchListener = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isCanDrag = false;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.listener = function (e) {
    var t = e.getComponent(_ref__ctor);
    t || (t = e.addComponent(_ref__ctor));
    return t;
  };
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.node);
    this.node.on(r_TYEventType.TYEventType.CLICK, this.onClick, this);
    if (this.isCanDrag) {
      this.node.on(r_TYEventType.TYEventType.DRAG_BEGIN, this.onTouchBegin, this);
      this.node.on(r_TYEventType.TYEventType.DRAG_MOVE, this.onTouchMove, this);
      this.node.on(r_TYEventType.TYEventType.DRAG_END, this.onTouchEnd, this);
    }
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.node);
    this.node.off(r_TYEventType.TYEventType.CLICK, this.onClick, this);
    if (this.isCanDrag) {
      this.node.off(r_TYEventType.TYEventType.DRAG_BEGIN, this.onTouchBegin, this);
      this.node.off(r_TYEventType.TYEventType.DRAG_MOVE, this.onTouchMove, this);
      this.node.off(r_TYEventType.TYEventType.DRAG_END, this.onTouchEnd, this);
    }
  };
  _ctor.prototype.onClick = function () {};
  _ctor.prototype.onTouchBegin = function () {};
  _ctor.prototype.onTouchEnd = function () {};
  _ctor.prototype.onTouchMove = function () {};
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.TouchListener = exp_TouchListener;