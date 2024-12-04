var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetLevelUpUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetCommon = require("PetCommon");
var r_PlayerData = require("PlayerData");
var r_RoleSystem = require("RoleSystem");
var r_PetData = require("PetData");
var exp_PetLevelUpUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetLevelUpUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetLevelUpUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetLevelUpUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnOK").onClick(function () {
      t.hide();
    }, this);
    this.attrList = this.contentPane.getChild("attrList").asList;
    this.propList = this.contentPane.getChild("propList").asList;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    var t = 0;
    var o = this.data.rewards.filter(function (e) {
      return e.isProp;
    });
    this.propList.numItems = o.length;
    for (var i = 0; i < o.length; i++) {
      (a = this.propList.getChildAt(i).asCom).getChild("num").text = "+" + o[i].val;
      a.getController("c1").selectedIndex = o[i].type;
      if (0 == o[i].type) {
        r_PlayerData.PlayerData.addCoin("宠物升级", o[i].val);
      } else if (1 == o[i].type) {
        r_PlayerData.PlayerData.addDiamond(r_RoleSystem.ExpType.其它, o[i].val);
      } else if (2 == o[i].type) {
        r_PetData.PetData.addBagProp(1, o[i].val);
      } else {
        3 == o[i].type && r_PetData.PetData.addVitality(o[i].val);
      }
    }
    var n = this.data.rewards.filter(function (e) {
      return !e.isProp;
    });
    this.attrList.numItems = n.length;
    for (i = 0; i < n.length; i++) {
      var a;
      (a = this.attrList.getChildAt(i).asCom).width = 262;
      a.getController("c1").setSelectedPage(n[i].type);
      a.getChild("num").text = "+" + n[i].val;
      t += 50 * n[i].val;
    }
    r_PetCommon.PetCommon.showBattleValTip(t);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetLevelUpUI = exp_PetLevelUpUI;