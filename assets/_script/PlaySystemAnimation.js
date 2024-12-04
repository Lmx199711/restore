var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySystemAnimation = undefined;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var r_ActionBase = require("ActionBase");
var exp_PlaySystemAnimation = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.aniName = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    e.prototype.trigger.call(this);
    var t = this.opNode.getComponent(cc.Animation);
    if (t) {
      this.opNode.active = true;
      t.enabled = true;
      t.play(this.aniName);
    } else {
      console.error("播放动画失败:", this.opNode.name);
    }
  };
  __decorate([_property({
    displayName: "需要播放的动画"
  })], _ctor.prototype, "aniName", undefined);
  return __decorate([_ccclass("PlaySystemAnimation")], _ctor);
}(r_ActionBase.ActionBase);
exports.PlaySystemAnimation = exp_PlaySystemAnimation;