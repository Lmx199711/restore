Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameOverSys = undefined;
var r_GameOverCom = require("GameOverCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_RelaxSystem = require("RelaxSystem");
var r_SoundMgr = require("SoundMgr");
var exp_GameOverSys = function () {
  function _ctor() {
    this.failNum = 0;
  }
  _ctor.prototype.trigger = function () {
    this.failNum--;
    if (this.failNum > 0) {
      if (this.entity.tipeNode) {
        var e = this.entity.tipeNode;
        e.active = true;
        e.scale = 0;
        r_SoundMgr.SoundMgr.playSound("fail1");
        cc.tween(e).to(.3, {
          scale: 1.1
        }).to(.2, {
          scale: .9
        }).to(.2, {
          scale: 1.1
        }).to(.2, {
          scale: 1
        }).delay(1).to(.3, {
          scale: 0
        }).call(function () {
          e.active = false;
        }).start();
      }
      console.log("错误一次");
    } else {
      r_RelaxSystem.RelaxSystem.lose();
      this.failNum = this.entity.failCount;
      console.log("游戏失败");
    }
  };
  _ctor.prototype.onStart = function () {
    this.failNum = this.entity.failCount;
  };
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_GameOverCom.GameOverCom)], _ctor);
}();
exports.GameOverSys = exp_GameOverSys;