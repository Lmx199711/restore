var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WpForgeResUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_FairyTreeCfg = require("FairyTreeCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_AFairyEvent = require("AFairyEvent");
var exp_WpForgeResUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.WpForgeResUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.WpForgeResUI, e, t);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data && !this.data.info && this.data.id) {
      cc.log("传入了id，没有info");
      this.data.info = r_WeaponSystem.WeaponSystem.GetWeaponInfo(Number(this.data.id));
    }
    if (this.data.playSpine) {
      this.state.selectedIndex = 1;
      this.playSpine();
    }
    this.refreshAll();
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WpForgeResUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnGet.onClick(function () {
      return t.getIt();
    });
    this.btnBack.onClick(function () {
      return t.getIt();
    });
    this.btnAd.onClick(function () {
      return t.wantIt();
    });
    this.state = this.contentPane.getController("state");
  };
  _ctor.prototype.wantIt = function () {
    var e;
    var t;
    var o = this;
    var i = (null === (t = null === (e = this.data) || undefined === e ? undefined : e.info) || undefined === t ? undefined : t.name) || "暂存武器";
    var n = this.data.info.id;
    var a = r_PlayerData.PlayerData.data.weapon.stash[n] || 0;
    r_PlayerData.PlayerData.data.weapon.stash || (r_PlayerData.PlayerData.data.weapon.stash = {});
    r_PlatformSystem.PlatformSystem.showVideo("获取" + i, function () {
      r_PlayerData.PlayerData.data.weapon.stash[n] = a + 1;
      r_PlayerData.PlayerData.saveData();
      o.refreshAll();
    });
  };
  _ctor.prototype.getIt = function () {
    this.data.okCallback && this.data.okCallback();
    this.hide();
  };
  _ctor.prototype.refreshAll = function () {
    this.comFlash.getTransition("t1").play();
    if (this.data.info) {
      var e = r_WeaponSystem.WeaponSystem.GetWeaponInfoDyn(this.data.info.id);
      var t = e.info;
      var o = t.name;
      var i = t.bornAtk;
      var n = t.bornCrit;
      var a = t.bornFack;
      var s = t.desc;
      if (e.own) {
        this.contentPane.getController("stash").selectedIndex = 0;
      } else {
        var c = r_PlayerData.PlayerData.data.weapon.stash[this.data.info.id] || 0;
        var l = r_FairyTreeCfg.SpecialWeaponLock[this.data.info.id];
        if (c >= l) {
          this.contentPane.getController("stash").selectedIndex = 0;
          r_WeaponSystem.WeaponSystem.GainStashWeapon(this.data.info.id);
          r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_AFairyEvent.AFairyEvent.CheckGetStashWp);
          this.hide();
        } else {
          this.contentPane.getController("stash").selectedIndex = 1;
          this.btnAd.title = "(" + c + "/" + l + ")";
        }
      }
      r_ResSystem.ResSystem.loadBundleFguiImg(this.iconWeapon, "bdWeaponForge", "weapon/big/" + o);
      this.txtName.text = o;
      this.txtDesc.text = s;
      this.txtAtk.text = i;
      this.txtCrit.text = n + "%";
      this.txtFack.text = a + 100 + "%";
      var y = r_WeaponSystem.WeaponSystem.GetWeaponPoint(this.data.info.id);
      this.txtNum.text = "战斗力：" + (y > 0 ? y : "??");
    }
  };
  _ctor.prototype.playSpine = function () {
    var e = this;
    if (this.data.info.effectPath) {
      this.spineLoader.node.destroyAllChildren();
      r_ResSystem.ResSystem.loadBundleRes(this.data.info.effectBundle || "bdWeaponForge", this.data.info.effectPath, cc.Prefab, function (t, o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        var i = cc.instantiate(o);
        var n = i.getComponent(sp.Skeleton);
        e.spineLoader.node.addChild(i);
        i.x = i.y = 0;
        n.setTrackCompleteListener(n.setAnimation(0, "animation", false), function () {
          e.state.selectedIndex = 0;
          e.spineLoader.node.destroyAllChildren();
        });
      });
    }
  };
  _ctor.data = null;
  __decorate([r_DecorateFunction1.AutoFind("comFlash")], _ctor.prototype, "comFlash", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAd")], _ctor.prototype, "btnAd", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconWeapon")], _ctor.prototype, "iconWeapon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("spineLoader")], _ctor.prototype, "spineLoader", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtName")], _ctor.prototype, "txtName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtNum")], _ctor.prototype, "txtNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtAtk")], _ctor.prototype, "txtAtk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtCrit")], _ctor.prototype, "txtCrit", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtFack")], _ctor.prototype, "txtFack", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.WpForgeResUI = exp_WpForgeResUI;