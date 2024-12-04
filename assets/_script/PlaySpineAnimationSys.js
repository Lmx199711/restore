Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySpineAnimationSys = undefined;
var r_PlaySpineAnimationCom = require("PlaySpineAnimationCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var exp_PlaySpineAnimationSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    var t = this;
    this.entity.node.active || (this.entity.node.active = true);
    if (this.sk) {
      var o = this.entity.animationName;
      e && (o = "" + e);
      this.sk.setCompleteListener(function () {
        if (t.entity) {
          t.entity.finishBehavior.length > 0 && t.entity.finishBehavior.forEach(function (e) {
            return e.execute();
          });
          t.entity.node.active = !t.entity.hideWhenFinish;
        }
      });
      "" != this.entity.skinName && this.sk.setSkin(this.entity.skinName);
      if (this.entity.isResume) {
        this.sk.paused = !this.sk.paused;
      } else {
        "" != o && this.sk.setAnimation(0, o, this.entity.isLoop);
        this.sk.paused = false;
        0 == this.sk.timeScale && (this.sk.timeScale = 1);
      }
    }
  };
  _ctor.prototype.onStart = function () {
    this.sk = null;
    this.entity.node && (this.sk = this.entity.node.getComponent(sp.Skeleton));
    if (this.sk) {
      r_CommonFunc.playSpineAni(this.sk, this.entity.animationName, this.entity.isLoop, this.entity.skinName);
      this.sk.paused = true;
    }
  };
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_PlaySpineAnimationCom.PlaySpineAnimationCom)], _ctor);
}();
exports.PlaySpineAnimationSys = exp_PlaySpineAnimationSys;