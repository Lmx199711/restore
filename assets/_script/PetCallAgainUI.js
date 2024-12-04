var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetCallAgainUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetInfoUI = require("PetInfoUI");
var r_PetCallUI = require("PetCallUI");
var r_PetData = require("PetData");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_PetCommon = require("PetCommon");
var r_PetStoryUI = require("PetStoryUI");
var r_FguiResSystem = require("FguiResSystem");
var exp_PetCallAgainUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetCallAgainUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetCallAgainUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetCallAgainUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnOK").onClick(function () {
      r_PetData.PetData.setData("callStatus", "ok");
      t.contentPane.touchable = false;
      r_PetInfoUI.PetInfoUI.showUI(null, function () {
        setTimeout(function () {
          r_PetData.PetData.addVitality(3);
          t.hide();
        }, 0);
      });
      r_PetStoryUI.PetStoryUI.showUI();
      r_PetCommon.PetCommon.showGuide(t.contentPane.getChild("guideCallOK"), true);
    }, this);
    this.contentPane.getChild("btnCall").onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("重新召唤", function () {
        t.contentPane.touchable = false;
        r_PetData.PetData.setData("callStatus", "call");
        r_PetCallUI.PetCallUI.showUI(null, function () {
          setTimeout(function () {
            t.hide();
          }, 0);
        });
      });
    }, this);
    this.contentPane.getChild("btnTip").onClick(function () {
      var e = t.contentPane.getChild("tip");
      e.visible = !e.visible;
    }, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    var o = r_PetData.PetData.getPetBaseInfo();
    this.petNode && this.petNode.name == o.prefab || r_ResSystem.ResSystem.loadBundleRes("game3", "pet/" + o.prefab, cc.Prefab, function (e, o) {
      var i;
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      null === (i = t.petNode) || undefined === i || i.destroy();
      var n = cc.instantiate(o);
      t.contentPane.getChild("pet").node.addChild(n);
      t.petNode = n;
      var a = n.getComponent(sp.Skeleton);
      a.setSkin("default");
      a.setAnimation(0, "daiji", true);
    });
    this.contentPane.getChild("tip").visible = false;
    this.contentPane.getChild("hp").asCom.getChild("num").text = o.hp.toString();
    this.contentPane.getChild("speed").asCom.getChild("num").text = o.speed.toString();
    this.contentPane.getChild("dexterity").asCom.getChild("num").text = o.dexterity.toString();
    this.contentPane.getChild("strength").asCom.getChild("num").text = o.strength.toString();
    var i = r_PlatformSystem.PlatformSystem.getNickName() || "我";
    this.contentPane.getChild("name").text = i + "的" + o.name;
    r_PetData.PetData.setData("callStatus", "again");
    this.contentPane.touchable = true;
    r_PetCommon.PetCommon.showGuide(this.contentPane.getChild("guideCallOK"));
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetCallAgainUI = exp_PetCallAgainUI;