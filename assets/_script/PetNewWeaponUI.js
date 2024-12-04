var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetNewWeaponUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetCfg = require("PetCfg");
var r_PetWeaponUI = require("PetWeaponUI");
var r_PetCommon = require("PetCommon");
var exp_PetNewWeaponUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetNewWeaponUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetNewWeaponUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetNewWeaponUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.showAnimFlag = true;
    this.contentPane.getChild("btnOK").onClick(function () {
      t.hide();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    var o = "weapon" == this.data.type ? r_PetCfg.PetWeaponCfgs.find(function (e) {
      return e.id == t.data.id;
    }) : r_PetCfg.PetSkillCfgs.find(function (e) {
      return e.id == t.data.id;
    });
    this.contentPane.getChild("name").text = o.name;
    this.contentPane.getChild("iconItem").asCom.getController("quality").selectedIndex = o.quality;
    this.contentPane.getChild("iconItem").asCom.getChild("icon").asLoader.url = "ui://Pet/" + this.data.type + this.data.id;
    var i = this.contentPane.getChild("curDesc").asTextField;
    r_PetWeaponUI.PetWeaponUI.setDesc(i, o, 0);
    r_PetCommon.PetCommon.showBattleValTip(o.battleVal[0]);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.data.closeCallback && this.data.closeCallback();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetNewWeaponUI = exp_PetNewWeaponUI;