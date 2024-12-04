var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZhazhaHuiMonster = undefined;
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_ZhazhaHuiSystem = require("ZhazhaHuiSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_ZhazhaHuiUI = require("ZhazhaHuiUI");
var exp_ZhazhaHuiMonster = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.m_dorpCount = 0;
    t.pos = cc.v2();
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
    this.blood = this.getChild("blood").asProgress;
    this.anim = this.getChild("anim");
    this.labPower = this.getChild("labPower").asTextField;
  };
  _ctor.prototype.init = function (e, t) {
    this.pos = t;
    this.m_actionData = r_ZhazhaHuiSystem.ZhazhaHuiSystem.getMonster(e);
    this.show();
  };
  _ctor.prototype.show = function () {
    this.anim.visible = true;
    this.showContent();
    this.idle();
  };
  _ctor.prototype.attack = function () {
    r_SoundMgr.SoundMgr.playSound("zhazhaHui/攻击");
    r_UtilsSystem.UtilsSystem.playAnim(this.anim, "gongji", false);
  };
  _ctor.prototype.onAttack = function (e) {
    var t = this;
    r_SoundMgr.SoundMgr.playSound("zhazhaHui/受击");
    r_UtilsSystem.UtilsSystem.playAnim(this.anim, "shouji", false);
    r_TimeSystem.TimeSystem.scheduleOnce("monstOnAttack", .4, function () {
      if (t.checkFightWin()) {
        t.die();
      } else {
        t.attack();
        t.blood.tweenValue(t.m_actionData.power - r_ZhazhaHuiSystem.ZhazhaHuiSystem.roleData.power, .5);
      }
      e && e();
    });
  };
  _ctor.prototype.die = function () {
    var e = this;
    this.blood.tweenValue(0, .5);
    this.anim.visible = false;
    r_TimeSystem.TimeSystem.scheduleOnce("revive", 1.5, function () {
      e.revive();
    });
    this.dropProp();
  };
  _ctor.prototype.revive = function () {
    this.show();
  };
  _ctor.prototype.idle = function () {
    r_UtilsSystem.UtilsSystem.playAnim(this.anim, "daiji", true);
  };
  _ctor.prototype.dropProp = function () {
    if (4 == r_UtilsSystem.UtilsSystem.randomPercentFromArray(this.actionData.dorp).propId) {
      var e = (i = this.actionData.dorpPos)[this.m_dorpCount % i.length];
      var t = cc.v2(e.x + this.x, e.y + this.y);
      var o = r_UtilsSystem.UtilsSystem.randomPercentFromArray(this.actionData.dorp).propId;
      r_ZhazhaHuiUI.default.Inst.onDropProp(o, t, cc.v2(this.x, this.y));
      return void this.m_dorpCount++;
    }
    if (r_ZhazhaHuiSystem.ZhazhaHuiSystem.getRandomChest()) {
      t = cc.v2(r_ZhazhaHuiUI.default.Inst.centerPos.x, r_ZhazhaHuiUI.default.Inst.centerPos.y);
      r_ZhazhaHuiUI.default.Inst.onDropProp(5, t, cc.v2(this.x, this.y));
      r_ZhazhaHuiSystem.ZhazhaHuiSystem.isHasChest = true;
    } else {
      e = (i = this.actionData.dorpPos)[this.m_dorpCount % i.length];
      t = cc.v2(e.x + this.x, e.y + this.y);
      var i;
      var n = r_UtilsSystem.UtilsSystem.randomPercentFromArray(this.actionData.dorp).propId;
      r_ZhazhaHuiUI.default.Inst.onDropProp(n, t, cc.v2(this.x, this.y));
      this.m_dorpCount++;
    }
  };
  _ctor.prototype.showContent = function () {
    this.blood.max = this.m_actionData.power;
    this.blood.value = this.m_actionData.power;
    this.labPower.text = this.m_actionData.power + "";
  };
  _ctor.prototype.checkFightWin = function () {
    return this.m_actionData.power <= r_ZhazhaHuiSystem.ZhazhaHuiSystem.roleData.power;
  };
  __decorate([r_DecorateFunction1.AutoFind("blood")], _ctor.prototype, "blood", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labPower")], _ctor.prototype, "labPower", undefined);
  return _ctor;
}(fgui.GComponent);
exports.ZhazhaHuiMonster = exp_ZhazhaHuiMonster;