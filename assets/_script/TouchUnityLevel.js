var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchUnityLevel = undefined;
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_TouchUnityLevel = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.coolTime = 0;
    t.levelNode = null;
    t.loopKey = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.levelNode = this.node;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.levelNode);
    if (this.coolTime > 0) {
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.setBrTouchTimeIn(this.coolTime);
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.setBrTouchTimeEnd(this.coolTime);
    }
    this.loopKey = true;
  };
  _ctor.prototype.update = function (e) {
    this.loopKey && r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
  };
  _ctor.prototype.onDestroy = function () {};
  __decorate([_property({
    displayName: "点击间隔"
  })], _ctor.prototype, "coolTime", undefined);
  return __decorate([_ccclass(), _menu("新系统/02快捷脚本/关卡唯一/统一点击")], _ctor);
}(cc.Component);
exports.TouchUnityLevel = exp_TouchUnityLevel;