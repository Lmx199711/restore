var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WpRecFactUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_WpRecWayUI = require("WpRecWayUI");
var exp_WpRecFactUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.WpRecFact) || this;
    t.lockVideo = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.WpRecFactUI, e, t);
  };
  _ctor.prototype.onShown = function () {
    this.refreshAll();
  };
  _ctor.prototype.refreshAll = function () {
    var e = r_WeaponSystem.WeaponSystem.GetWeaponInfo(this.data.id);
    switch (e.type) {
      case 2:
        this.btnVideo.visible = true;
        var t = r_WeaponSystem.WeaponSystem.GetWeaponRecName(this.data.id);
        var o = "" + t[0];
        for (var i = 1; i < t.length; i++) {
          o += "+" + t[i];
        }
        this.txtName.text = o;
        if (r_WeaponSystem.WeaponSystem.LookedWeaponRecWay(this.data.id)) {
          this.lockVideo = false;
          this.btnVideo.getController("video").selectedIndex = 1;
        } else {
          this.lockVideo = true;
          this.btnVideo.getController("video").selectedIndex = 0;
        }
        break;
      case 3:
        this.txtName.text = r_WeaponSystem.WeaponSystem.GetTgInfo(e.name).way + "";
        this.btnVideo.visible = false;
        break;
      default:
        this.txtName.text = e.factDesc || "<傲娇的它没有合成方法>";
        this.btnVideo.visible = false;
    }
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WpRecFactUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(function () {
      return t.hide();
    });
    this.btnVideo.onClick(function () {
      return t.onClickWay();
    });
  };
  _ctor.prototype.onClickWay = function () {
    var e = this;
    if (this.lockVideo) {
      r_PlatformSystem.PlatformSystem.showVideo("武器材料来源", function () {
        r_WpRecWayUI.WpRecWayUI.showUI({
          id: e.data.id
        });
        e.btnVideo.getController("video").selectedIndex = 1;
        r_PlayerData.PlayerData.data.weapon.lookedRecWay[e.data.id] = true;
        r_PlayerData.PlayerData.saveData();
      });
    } else {
      r_WpRecWayUI.WpRecWayUI.showUI({
        id: this.data.id
      });
      this.btnVideo.getController("video").selectedIndex = 1;
    }
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtName")], _ctor.prototype, "txtName", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.WpRecFactUI = exp_WpRecFactUI;