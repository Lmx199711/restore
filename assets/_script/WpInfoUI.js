var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WpInfoUI = undefined;
var r_Index = require("Index");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_BaseLayer = require("BaseLayer");
var r_WpRecFactUI = require("WpRecFactUI");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_TYEvent = require("TYEvent");
var r_DecorateFunction1 = require("DecorateFunction1");
var exp_WpInfoUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.WpInfo) || this;
    t.atkBuff = 0;
    t.lockVideo = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.WpInfoUI, e, t);
  };
  _ctor.prototype.onShown = function () {
    this.btnGm.visible = false;
    var e = r_WeaponSystem.WeaponSystem.GetWpPetInfo(r_PlayerData.PlayerData.data.weapon.pet[0].id).atkBuffInfo;
    this.atkBuff = r_WeaponSystem.WeaponSystem.GetWpPetLvInfo(e).num[r_PlayerData.PlayerData.data.weapon.pet[0].lv] || 0;
    this.refreshAll();
  };
  _ctor.prototype.refreshAll = function () {
    var e = this;
    this.lockVideo = true;
    var t = r_WeaponSystem.WeaponSystem.GetWeaponInfoDyn(this.data.info.id);
    var o = t.info;
    var i = o.name;
    var n = o.bornAtk;
    var a = o.bornCrit;
    var r = o.bornFack;
    var c = o.desc;
    r_ResSystem.ResSystem.loadBundleFguiImg(this.iconWeapon, "bdWeaponForge", "weapon/big/" + i, function () {
      e.iconWeapon.alpha = 1;
    });
    this.txtName.text = i;
    this.txtDesc.text = c;
    this.btnVideo.clearClick();
    if (t.own) {
      this.btnGm.visible = false;
      this.iconWeapon.color = cc.Color.WHITE;
      this.txtAtk.text = n;
      this.txtCrit.text = a + "%";
      this.txtFack.text = r + 100 + "%";
    } else {
      this.iconWeapon.color = new cc.Color(71, 54, 38);
      this.txtAtk.text = "  ？？";
      this.txtCrit.text = "  ？？";
      this.txtFack.text = "  ？？";
      r_Index.Platform.isMiniPlatform() || (this.btnGm.visible = true);
    }
    if (r_WeaponSystem.WeaponSystem.LookedWeaponFactor(this.data.info.id)) {
      this.lockVideo = false;
      this.btnVideo.getController("video").selectedIndex = 1;
    } else {
      this.lockVideo = true;
      this.btnVideo.getController("video").selectedIndex = 0;
    }
    this.btnVideo.onClick(function () {
      return e.onClickWpFact();
    });
  };
  _ctor.prototype.onHide = function () {
    this.iconWeapon.alpha = 0;
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.freshBook);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WpInfoUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(function () {
      return t.hide();
    });
    this.btnGm.onClick(function () {
      return t.onClickGm();
    });
  };
  _ctor.prototype.onClickWpFact = function () {
    var e = this;
    if (this.lockVideo) {
      r_PlatformSystem.PlatformSystem.showVideo("武器合成公式", function () {
        r_WpRecFactUI.WpRecFactUI.showUI({
          id: e.data.info.id
        });
        e.btnVideo.getController("video").selectedIndex = 1;
        r_PlayerData.PlayerData.data.weapon.lookedFactor[e.data.info.id] = true;
        e.lockVideo = false;
        r_PlayerData.PlayerData.saveData();
      });
    } else {
      r_WpRecFactUI.WpRecFactUI.showUI({
        id: this.data.info.id
      });
      this.btnVideo.getController("video").selectedIndex = 1;
    }
  };
  _ctor.prototype.onClickGm = function () {
    r_WeaponSystem.WeaponSystem.GainWeapon(this.data.info.id);
    r_PlayerData.PlayerData.saveData();
    this.refreshAll();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtName")], _ctor.prototype, "txtName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtAtk")], _ctor.prototype, "txtAtk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtCrit")], _ctor.prototype, "txtCrit", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtFack")], _ctor.prototype, "txtFack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGm")], _ctor.prototype, "btnGm", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconWeapon")], _ctor.prototype, "iconWeapon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.WpInfoUI = exp_WpInfoUI;