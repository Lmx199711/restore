var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZhazhaHuiBoss = undefined;
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_ZhazhaHuiSystem = require("ZhazhaHuiSystem");
var r_SoundMgr = require("SoundMgr");
var r_ZhazhaHuiMonster = require("ZhazhaHuiMonster");
var exp_ZhazhaHuiBoss = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onAttack = function (e) {
    var t = this;
    r_SoundMgr.SoundMgr.playSound("zhazhaHui/受击");
    r_UtilsSystem.UtilsSystem.playAnim(this.anim, "shouji", false);
    r_TimeSystem.TimeSystem.scheduleOnce("monstOnAttack", .8, function () {
      if (t.checkFightWin()) {
        t.die();
      } else {
        t.attack();
        t.blood.tweenValue(t.m_actionData.power - r_ZhazhaHuiSystem.ZhazhaHuiSystem.roleData.power, .5);
      }
    });
    r_TimeSystem.TimeSystem.scheduleOnce("monstOnAttack1", 1.6, function () {
      e && e();
    });
  };
  _ctor.prototype.die = function () {
    this.blood.tweenValue(0, .5);
    this.anim.visible = false;
    this.dropProp();
  };
  return _ctor;
}(r_ZhazhaHuiMonster.ZhazhaHuiMonster);
exports.ZhazhaHuiBoss = exp_ZhazhaHuiBoss;