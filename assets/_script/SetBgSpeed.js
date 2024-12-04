var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetBgSpeed = undefined;
var r_ActionBase = require("ActionBase");
var r_MoveBgCom = require("MoveBgCom");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_SetBgSpeed = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.speed = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    this.bgCom.speed = this.speed;
  };
  _ctor.index = 0;
  __decorate([_property({
    type: r_MoveBgCom.default,
    displayName: "背景移动组件"
  })], _ctor.prototype, "bgCom", undefined);
  __decorate([_property({
    type: Number,
    displayName: "速度"
  })], _ctor.prototype, "speed", undefined);
  return __decorate([_ccclass("SetBgSpeed")], _ctor);
}(r_ActionBase.ActionBase);
exports.SetBgSpeed = exp_SetBgSpeed;