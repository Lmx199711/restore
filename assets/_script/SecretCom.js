var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RoleSystem = require("RoleSystem");
var r_MainHomeEffect = require("MainHomeEffect");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_SecretCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.id = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {};
  _ctor.prototype.setStart = function () {
    var e = this;
    this.scheduleOnce(function () {
      e.schedule(e.updateTime.bind(e), 1);
    }, Math.random());
  };
  _ctor.prototype.updateTime = function () {
    if (this.node) {
      if (!r_RoleSystem.RoleSystem.isPause) {
        r_RoleSystem.RoleSystem.addExp(r_RoleSystem.ExpType.秘书, this.id);
        var e = r_RoleSystem.RoleSystem.getSecretLevelExpById(this.id) * r_RoleSystem.RoleSystem.getEarnInfo().coeff;
        r_MainHomeEffect.MianHomeEffect.playAddExpAnimByNode("+" + e, this.node.worldPosition.clone());
      }
    } else {
      this.unscheduleAllCallbacks();
    }
  };
  _ctor.prototype.onDestroy = function () {
    this.unscheduleAllCallbacks();
  };
  __decorate([_property(Number)], _ctor.prototype, "id", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_SecretCom;