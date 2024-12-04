Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySysAnimationSys = undefined;
var r_PlaySysAnimationCom = require("PlaySysAnimationCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_PlaySysAnimationSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function () {
    var e = this.entity.node.getComponent(cc.Animation);
    if (e) {
      this.entity.node.active = true;
      e.enabled = true;
      e.play(this.entity.aniName);
    } else {
      console.error("播放动画失败:", this.entity.aniName);
    }
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_PlaySysAnimationCom.PlaySysAnimationCom)], _ctor);
}();
exports.PlaySysAnimationSys = exp_PlaySysAnimationSys;