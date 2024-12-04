var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetBattleResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetData = require("PetData");
var r_PetCommon = require("PetCommon");
var r_PetBattleUI = require("PetBattleUI");
var r_PetCfg = require("PetCfg");
var r_SoundMgr = require("SoundMgr");
var r_PlatformSystem = require("PlatformSystem");
var r_PetLevelUpUI = require("PetLevelUpUI");
var r_TimeSystem = require("TimeSystem");
var exp_PetBattleResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetBattleResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetBattleResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetBattleResultUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.showAnimFlag = true;
    this.contentPane.getChild("btnOK").onClick(function () {
      t.hide();
      r_PetBattleUI.PetBattleUI.hide();
      t.data.rewards.length > 0 && r_PetLevelUpUI.PetLevelUpUI.showUI({
        rewards: t.data.rewards
      });
    }, this);
    this.levelInfo = this.contentPane.getChild("levelInfo").asCom;
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = this.data.result;
    this.contentPane.getChild("exp").text = "+" + this.data.exp + "exp";
    var o = r_PetData.PetData.getPetBaseInfo();
    var i = r_PlatformSystem.PlatformSystem.getNickName() || "我";
    this.levelInfo.getChild("name").text = i + "的" + o.name;
    var n = this.data.oldLevel;
    var a = this.data.oldExp;
    var l = this.data.exp;
    var d = this.levelInfo.getChild("expPro").asProgress;
    var f = function () {
      t.levelInfo.getChild("level").text = n + "";
      if (n >= r_PetCfg.PetGameCfg.levelMax) {
        d.max = 0;
        d.value = 0;
      } else {
        var e = a - r_PetCommon.PetCommon.levelToExp(n);
        d.value = e;
        d.max = r_PetCommon.PetCommon.needAddExp(n + 1);
        var i = Math.min(l, d.max - d.value);
        r_TimeSystem.TimeSystem.timeMapUpdate("updateExp", 1.5 * (1 - d.value / d.max), function (t) {
          d.value = e + i * t;
          if (t >= 1 && o.level > n) {
            n++;
            l -= i;
            a += i;
            f();
          }
        });
      }
    };
    f();
    var m = r_PetCommon.PetCommon.getTierInfo(o.tier);
    var g = this.contentPane.getChild("tier").asCom;
    g.visible = true;
    g.getChild("icon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Pet + "/tier" + m.tier1;
    g.getChild("name").text = r_PetCfg.PetGameCfg.tier.name[m.tier1];
    var v = g.getChild("star").asCom;
    if (m.tier1 < 6) {
      g.getChild("name").text += 4 - m.tier2;
      v.getController("c1").selectedIndex = m.star;
      v.getController("c2").selectedIndex = r_PetCfg.PetGameCfg.tier.starNum[m.tier1] - 4;
    } else {
      v.getController("c1").selectedIndex = 1;
      v.getController("c2").selectedIndex = 3;
      v.getChild("num").text = "x" + m.star;
    }
    for (var C = 1; C <= 5; C++) {
      (S = v.getChild(C + "")).scaleX = 1;
      S.scaleY = 1;
      S.alpha = 1;
    }
    if (this.data.starOffset > 0) {
      if (m.star > 0) {
        (S = v.getChild(m.star + "")).scaleX = 0;
        S.scaleY = 0;
        cc.tween(S).delay(.5).to(.5, {
          scaleX: 3,
          scaleY: 3
        }).to(1, {
          scaleX: 1,
          scaleY: 1
        }).start();
      }
    } else if (this.data.starOffset < 0) {
      v.getController("c1").selectedIndex = m.star + 1;
      var S = v.getChild(m.star + 1 + "");
      cc.tween(S).delay(.5).to(1, {
        scaleX: 3,
        scaleY: 3,
        alpha: 0
      }).start();
    }
    var I = r_PetData.PetData.getData("tierSaveVal", 0);
    var b = this.contentPane.getChild("tierSaveVal").asCom;
    b.getChild("num").text = I;
    b.getController("c1").selectedIndex = Math.floor(I / 20);
    b.getChild("addNum").visible = I < 100;
    b.getChild("full").visible = I >= 100;
    var x = r_PetData.PetData.getData("battleCount", 0) + 1;
    r_PetData.PetData.setData("battleCount", x);
    if (0 == this.data.result) {
      this.contentPane.getChild("light").visible = true;
      this.contentPane.getTransition("t0").play();
      if (x > 3) {
        if (0 == r_PetData.PetData.getData("lastResult", 0)) {
          r_PetData.PetData.setData("successCount", r_PetData.PetData.getData("successCount", 0) + 1);
        } else {
          r_PetData.PetData.setData("successCount", 0);
        }
      }
      r_SoundMgr.SoundMgr.playSound("pet/战斗胜利_01");
    } else {
      this.contentPane.getChild("light").visible = false;
      r_SoundMgr.SoundMgr.playSound("pet/战斗失败_01");
    }
    r_PetData.PetData.setData("lastResult", this.data.result);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.stopAllSound();
    r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PetInfoUI).showInfo();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetBattleResultUI = exp_PetBattleResultUI;