var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetTierRewardUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PetCfg = require("PetCfg");
var r_PetData = require("PetData");
var r_PetCommon = require("PetCommon");
var r_PlayerData = require("PlayerData");
var r_RoleSystem = require("RoleSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp_PetTierRewardUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetTierRewardUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetTierRewardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetTierRewardUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.list = this.contentPane.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.itemRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.list.numItems = r_PetCfg.PetTierReward.length;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.itemRenderer = function (e, t) {
    var o = Math.floor(e / 4);
    var i = e % 4;
    t.getChild("num").text = r_PetCfg.PetTierReward[e].toString();
    t.getChild("icon").asLoader.url = "ui://Pet/tier" + o;
    t.getChild("name").text = r_PetCfg.PetGameCfg.tier.name[o];
    o < 6 && (t.getChild("name").text += 4 - i);
    var n = r_PetData.PetData.getPetBaseInfo();
    var a = r_PetCommon.PetCommon.getTierInfo(n.tier);
    t.clearClick();
    if (r_PetData.PetData.getData("tierReward" + e)) {
      t.getController("c1").selectedIndex = 2;
    } else if (a.tier1 > o || a.tier1 == o && a.tier2 >= i) {
      t.getController("c1").selectedIndex = 1;
      t.onClick(function () {
        r_PetData.PetData.setData("tierReward" + e, true);
        r_PlayerData.PlayerData.addDiamond(r_RoleSystem.ExpType.其它, r_PetCfg.PetTierReward[e]);
        r_UtilsSystem.UtilsSystem.showTip("获取" + r_UtilsSystem.UtilsSystem.getShowCoin(r_PetCfg.PetTierReward[e]) + "钻石");
        t.getController("c1").selectedIndex = 2;
        t.clearClick();
      }, this);
    } else {
      t.getController("c1").selectedIndex = 0;
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetTierRewardUI = exp_PetTierRewardUI;