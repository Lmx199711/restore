var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetBuyPropUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PetData = require("PetData");
var r_PetCfg = require("PetCfg");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var exp_PetBuyPropUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetBuyPropUI) || this;
    t.cost = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetBuyPropUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetBuyPropUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.contentPane.getChild("btnBuy").onClick(function () {
      if (r_PlayerData.PlayerData.deleteDiamond(t.cost)) {
        r_PetData.PetData.addBagProp(1, t.data.num);
        r_UtilsSystem.UtilsSystem.showTip("购买成功");
        t.hide();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("钻石不足");
      }
    }, this);
    this.contentPane.getChild("btnBuyAd").onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("购买强者之心", function () {
        r_PetData.PetData.addBagProp(1, t.data.num);
        r_UtilsSystem.UtilsSystem.showTip("购买成功");
        t.hide();
      });
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.bringToFront();
    this.contentPane.getChild("num").text = "x" + this.data.num;
    var t = r_PetCfg.PetProps.find(function (e) {
      return e.id = 1;
    });
    this.cost = t.cost * this.data.num;
    this.contentPane.getChild("cost").text = "消耗：" + this.cost;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.data.closeCallbalck && this.data.closeCallbalck();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetBuyPropUI = exp_PetBuyPropUI;