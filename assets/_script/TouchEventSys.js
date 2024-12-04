Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchEventSys = undefined;
var r_TYEventType = require("TYEventType");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TouchEventCom = require("TouchEventCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_TouchEventSys = function () {
  function _ctor() {}
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_BEGIN, this.touchBegin, this);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.touchEnd, this);
    this.entity.node.on(r_TYEventType.TYEventType.CLICK, this.onClick, this);
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_BEGIN, this.touchBegin, this);
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_END, this.touchEnd, this);
    this.entity.node.off(r_TYEventType.TYEventType.CLICK, this.onClick, this);
  };
  _ctor.prototype.onUpdate = function () {};
  _ctor.prototype.touchBegin = function () {
    if (this.entity.canTouchInfo.canOperate()) {
      this.entity.startTouchNodes.forEach(function (e) {
        e.target.active = e.isShow;
      });
      this.entity.startTouchActionId.execute();
    }
  };
  _ctor.prototype.touchEnd = function () {
    if (this.entity.canTouchInfo.canOperate()) {
      this.entity.endTouchNodes.forEach(function (e) {
        e.target.active = e.isShow;
      });
      this.entity.endTouchActionId.execute();
    }
  };
  _ctor.prototype.onClick = function () {
    this.entity.canTouchInfo.canOperate() && this.entity.clickActions.execute();
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_TouchEventCom.TouchEventCom)], _ctor);
}();
exports.TouchEventSys = exp_TouchEventSys;