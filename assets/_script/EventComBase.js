var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventComBase = undefined;
var r_TouchCanOperate = require("TouchCanOperate");
var r_ECSWorld = require("ECSWorld");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_EventComBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.needPrecondition = true;
    t.canTouchInfo = new r_TouchCanOperate.TouchCanOperate();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    r_ECSWorld.ECSWorld.execute(this, r_ECSWorld.EventFuncName.onStart);
  };
  _ctor.prototype.update = function (e) {
    r_ECSWorld.ECSWorld.execute(this, r_ECSWorld.EventFuncName.onUpdate, e);
  };
  _ctor.prototype.onDestroy = function () {
    r_ECSWorld.ECSWorld.execute(this, r_ECSWorld.EventFuncName.onDestroy);
  };
  _ctor.prototype.onDisable = function () {
    r_ECSWorld.ECSWorld.execute(this, r_ECSWorld.EventFuncName.onDisable);
  };
  _ctor.prototype.onEnable = function () {
    r_ECSWorld.ECSWorld.execute(this, r_ECSWorld.EventFuncName.onEnable);
  };
  __decorate([_property({
    displayName: "玩家操作条件",
    visible: function () {
      return this.needPrecondition;
    }
  })], _ctor.prototype, "canTouchInfo", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.EventComBase = exp_EventComBase;