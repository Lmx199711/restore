var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TheRobotic = undefined;
var r_ECSWorld = require("ECSWorld");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
_decorator.requireComponent;
var exp_TheRobotic = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
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
  _ctor.tempV2 = cc.v2();
  return _ctor;
}(cc.Component);
exports.TheRobotic = exp_TheRobotic;