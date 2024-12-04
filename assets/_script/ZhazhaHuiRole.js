var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZhazhaHuiRole = undefined;
var r_FguiResSystem = require("FguiResSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_ZhazhaHuiSystem = require("ZhazhaHuiSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_ZhazhaHuiTipUI = require("ZhazhaHuiTipUI");
var r_ZhazhaHuiUI = require("ZhazhaHuiUI");
var exp_ZhazhaHuiRole = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.initPos0 = cc.v2();
    t.initPos1 = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    this.blood = this.getChild("blood").asProgress;
    this.anim = this.getChild("anim");
    this.imgDie = this.getChild("imgDie").asImage;
    this.labPower = this.getChild("labPower").asTextField;
    this.bubble = this.getChild("bubble").asButton;
    this.animload = this.getChild("animload");
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("game4", "zhazhaHui/zhujue", cc.Prefab, function (t, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(r_ZhazhaHuiUI.default.Inst, o);
      var i = cc.instantiate(o);
      e.animload.node.addChild(i);
      e.animSp = i.getComponent(sp.Skeleton);
      e.init(e.initPos0, e.initPos1);
    });
  };
  _ctor.prototype.init = function (e, t) {
    this.initPos0 = e;
    this.initPos1 = t;
    if (this.animSp) {
      r_ZhazhaHuiSystem.ZhazhaHuiSystem.init();
      this.animload.visible = true;
      this.showContent();
      this.idle();
      this.bubble.alpha = 0;
      this.getTransition("init").play();
    }
  };
  _ctor.prototype.attack = function (e) {
    var t = this;
    r_ZhazhaHuiUI.default.isChanged = false;
    var o = e.actionData;
    this.move(e.pos, function () {
      t.animSp.setAnimation(0, "step_2_" + t.getActionId(), false);
      r_SoundMgr.SoundMgr.playSound("zhazhaHui/攻击");
      e.onAttack(function () {
        if (t.checkFightWin(o.power)) {
          t.move(t.getInitPos(), t.idle.bind(t));
        } else {
          t.die();
        }
      });
    });
  };
  _ctor.prototype.move = function (e, t) {
    r_ZhazhaHuiUI.default.isChanged = false;
    cc.Tween.stopAllByTarget(this);
    this.animSp.setAnimation(0, "step_4_" + this.getActionId(), true);
    cc.tween(this).to(.8, {
      x: e.x,
      y: e.y
    }).call(t).start();
  };
  _ctor.prototype.die = function () {
    r_SoundMgr.SoundMgr.playSound("zhazhaHui/受击");
    r_ZhazhaHuiUI.default.isChanged = false;
    this.blood.tweenValue(0, .5);
    this.animSp.setAnimation(0, "step_3_" + this.getActionId(), false);
    this.getTransition("die").play(function () {
      r_TimeSystem.TimeSystem.scheduleOnce("die", 2, function () {
        r_ZhazhaHuiTipUI.default.showUI({
          index: 1
        });
      });
    });
  };
  _ctor.prototype.idle = function () {
    r_ZhazhaHuiUI.default.isChanged = true;
    this.animSp.setAnimation(0, "step_1_" + this.getActionId(), true);
  };
  _ctor.prototype.useProp = function () {};
  _ctor.prototype.upLevel = function () {
    r_ZhazhaHuiSystem.ZhazhaHuiSystem.upLvel();
    r_SoundMgr.SoundMgr.playSound("zhazhaHui/强化成功");
    this.getTransition("succ").play();
    this.showContent();
  };
  _ctor.prototype.downLevel = function () {
    r_ZhazhaHuiSystem.ZhazhaHuiSystem.downLevel();
    r_SoundMgr.SoundMgr.playSound("zhazhaHui/强化失败");
    this.getTransition("lose").play();
    this.showContent();
  };
  _ctor.prototype.showContent = function () {
    this.blood.max = r_ZhazhaHuiSystem.ZhazhaHuiSystem.roleData.power;
    this.blood.value = r_ZhazhaHuiSystem.ZhazhaHuiSystem.roleData.power;
    this.animSp.setSkin(f[r_ZhazhaHuiSystem.ZhazhaHuiSystem.level]);
    this.imgDie.visible = false;
    this.labPower.text = r_ZhazhaHuiSystem.ZhazhaHuiSystem.roleData.power;
  };
  _ctor.prototype.getActionId = function () {
    if (7 == r_ZhazhaHuiSystem.ZhazhaHuiSystem.level) {
      return 2;
    } else {
      return 1;
    }
  };
  _ctor.prototype.getInitPos = function () {
    if (0 == r_ZhazhaHuiUI.default.Inst.mode) {
      return this.initPos0;
    } else {
      return this.initPos1;
    }
  };
  _ctor.prototype.checkFightWin = function (e) {
    return r_ZhazhaHuiSystem.ZhazhaHuiSystem.roleData.power >= e;
  };
  _ctor.prototype.setBubble = function (e) {
    this.bubble.alpha = 0;
    this.bubble.title = e;
    r_SoundMgr.SoundMgr.playSound("zhazhaHui/" + e);
    cc.tween(this.bubble).to(.5, {
      alpha: 1
    }).delay(2).to(.5, {
      alpha: 0
    }).start();
  };
  __decorate([r_DecorateFunction1.AutoFind("blood")], _ctor.prototype, "blood", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgDie")], _ctor.prototype, "imgDie", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labPower")], _ctor.prototype, "labPower", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble")], _ctor.prototype, "bubble", undefined);
  return _ctor;
}(fgui.GComponent);
exports.ZhazhaHuiRole = exp_ZhazhaHuiRole;
var f = {
  1: "1_mujian",
  2: "2_tiejian",
  3: "3_baojian",
  4: "4_dadao",
  5: "5_baodao",
  6: "6_jindao",
  7: "7_tulongdao"
};