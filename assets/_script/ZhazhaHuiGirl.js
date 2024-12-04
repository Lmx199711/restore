var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZhazhaHuiGirl = undefined;
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_ZhazhaHuiCfg = require("ZhazhaHuiCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_ZhazhaHuiUI = require("ZhazhaHuiUI");
var exp_ZhazhaHuiGirl = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.m_dorpCount = 0;
    t.pos = cc.v2();
    t.isDie = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "actionData", {
    get: function () {
      return this.m_actionData;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onConstruct = function () {
    this.anim = this.getChild("anim");
    this.imgDie = this.getChild("imgDie").asImage;
  };
  _ctor.prototype.init = function (e) {
    this.pos = e;
    this.m_actionData = r_ZhazhaHuiCfg.ZhazhaHuiActionCfg.nvren;
    this.imgDie.visible = false;
    this.show();
    this.isDie = false;
  };
  _ctor.prototype.show = function () {
    this.idle();
  };
  _ctor.prototype.onAttack = function (e) {
    var t = this;
    r_SoundMgr.SoundMgr.playSound("zhazhaHui/受击");
    this.isDie = true;
    r_UtilsSystem.UtilsSystem.playAnim(this.anim, "shouji", false);
    r_TimeSystem.TimeSystem.scheduleOnce("monstOnAttack", .4, function () {
      e && e();
      t.die();
    });
  };
  _ctor.prototype.die = function () {
    this.anim.visible = false;
    this.imgDie.visible = true;
    r_ZhazhaHuiUI.default.Inst.role.upLevel();
    r_ZhazhaHuiUI.default.Inst.role.setBubble("女人只会影响我出剑的速度");
  };
  _ctor.prototype.revive = function () {
    this.imgDie.visible = false;
    r_UtilsSystem.UtilsSystem.playAnim(this.anim, "fuhuo", false);
  };
  _ctor.prototype.idle = function () {
    r_UtilsSystem.UtilsSystem.playAnim(this.anim, "daiji", true);
  };
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgDie")], _ctor.prototype, "imgDie", undefined);
  return _ctor;
}(fgui.GComponent);
exports.ZhazhaHuiGirl = exp_ZhazhaHuiGirl;