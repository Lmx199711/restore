Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySpineAnimationByParamSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_PlaySpineAnimationByParamCom = require("PlaySpineAnimationByParamCom");
var exp_PlaySpineAnimationByParamSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    var t = e.split("|");
    this.entity.skNode.node.active || (this.entity.skNode.node.active = true);
    t[2] && this.entity.skNode.setSkin(t[2]);
    var o = "1" == t[1];
    var i = this.entity.defaultAnimationName;
    t[0] && (i = t[0]);
    this.entity.skNode.setAnimation(0, i, o);
    if (t[3]) {
      this.entity.skNode.timeScale = +t[3];
    } else {
      this.entity.skNode.timeScale = 1;
    }
  };
  _ctor.prototype.onStart = function () {
    if (this.entity.skNode.node.active) {
      this.entity.skNode.setAnimation(0, this.entity.defaultAnimationName, this.entity.isDefaultLoop);
      this.entity.skNode.timeScale = 0;
    }
  };
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_PlaySpineAnimationByParamCom.PlaySpineAnimationByParamCom)], _ctor);
}();
exports.PlaySpineAnimationByParamSys = exp_PlaySpineAnimationByParamSys;