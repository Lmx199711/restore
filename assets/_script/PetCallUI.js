var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetCallUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_PetCallAgainUI = require("PetCallAgainUI");
var r_PetCommon = require("PetCommon");
var r_PetCfg = require("PetCfg");
var r_PetData = require("PetData");
var r_PetBaseInfo = require("PetBaseInfo");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var exp_PetCallUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetCallUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetCallUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetCallUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnCall").onClick(function () {
      t.contentPane.getChild("btnCall").visible = false;
      t.startCall();
      r_PetCommon.PetCommon.showGuide(t.contentPane.getChild("guideCall"), true);
    }, this);
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("game3", "pet/petCall", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.contentPane.visible = true;
      var i = cc.instantiate(o);
      t.contentPane.getChild("center").node.addChild(i);
      t.callAnim = i.getComponent(sp.Skeleton);
      t.callAnim.setAnimation(0, "animation", false);
      t.callAnim.timeScale = 0;
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("btnCall").visible = true;
    if (this.callAnim) {
      this.callAnim.setAnimation(0, "animation", false);
      this.callAnim.timeScale = 0;
    }
    r_PetCommon.PetCommon.showGuide(this.contentPane.getChild("guideCall"));
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("petCall");
  };
  _ctor.prototype.startCall = function () {
    var e = this;
    this.callAnim.timeScale = 1;
    this.callAnim.setAnimation(0, "animation", false);
    r_SoundMgr.SoundMgr.playSound("pet/召唤魔法_01");
    r_TimeSystem.TimeSystem.scheduleOnce("petCall", 3.6, function () {
      var t = r_PetCfg.PetCfgs[r_PetCommon.PetCommon.randomInt(0, r_PetCfg.PetCfgs.length - 1)];
      var o = new r_PetBaseInfo.PetBaseInfo();
      o.id = t.id;
      o.type = t.type;
      o.name = t.name;
      o.prefab = t.prefab;
      o.level = 1;
      o.hp = r_PetCfg.PetGameCfg.initAttr.hp;
      o.speed = r_PetCfg.PetGameCfg.initAttr.speed;
      o.dexterity = r_PetCfg.PetGameCfg.initAttr.dexterity;
      o.strength = r_PetCfg.PetGameCfg.initAttr.strength;
      for (var i = 0; i < r_PetCfg.PetGameCfg.initAttr.randomAttr; i++) {
        var n = Math.random();
        if (n < 1 / 3) {
          o.speed++;
        } else if (n < 2 / 3) {
          o.dexterity++;
        } else {
          o.strength++;
        }
      }
      r_PetData.PetData.setPetBaseInfo(o);
      r_PetCallAgainUI.PetCallAgainUI.showUI(null, function () {
        setTimeout(function () {
          e.hide();
        }, 0);
      });
      r_SoundMgr.SoundMgr.stopSound("pet/召唤魔法_01");
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetCallUI = exp_PetCallUI;