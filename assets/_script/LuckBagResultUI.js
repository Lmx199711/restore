var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_LuckBagSystem = require("LuckBagSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_LuckBagOpenUI = require("LuckBagOpenUI");
var r_LuckBagUI = require("LuckBagUI");
var def_LuckBagResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.LuckBag, r_UIDef.UIDef.Res.UI.LuckBagResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LuckBagResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LuckBagResultUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnSell.onClick(this.onClickSell, this);
    this.btnDouble.onClick(this.onClickDouble, this);
    this.btnNoSell.onClick(this.onClickbNoSell, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/luckBag/bagAnim", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.bagPic.node.addChild(i);
      t.showLuckBagGuang();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.btnNoSell.visible = false;
    this.refreshGoodsItem();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.refreshGoodsItem = function () {
    var e;
    var t = r_LuckBagSystem.LuckBagSystem.getLuckBagRewardInfoById(this.data.luckBagData.awardId1);
    r_ResSystem.ResSystem.loadFguiImg(this.goodsItem1.getChild("pic"), "ui/luckBag/reward/" + t.name);
    this.goodsItem1.getChild("lbNum").text = "x1";
    this.goodsItem1.getChild("lbName").text = t.name;
    2 != t.type || r_LuckBagSystem.LuckBagSystem.IsExistAnimalSign(t.id) || (this.btnNoSell.visible = true);
    var o = r_LuckBagSystem.LuckBagSystem.getLuckBagRewardInfoById(this.data.luckBagData.awardId2);
    r_ResSystem.ResSystem.loadFguiImg(this.goodsItem2.getChild("pic"), "ui/luckBag/reward/" + o.name);
    this.goodsItem2.getChild("lbNum").text = "x1";
    this.goodsItem2.getChild("lbName").text = o.name;
    2 != o.type || r_LuckBagSystem.LuckBagSystem.IsExistAnimalSign(o.id) || (this.btnNoSell.visible = true);
    if ((e = this.data.luckBagData.coin1 + this.data.luckBagData.coin2) >= this.data.luckBagData.coin) {
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
    }
    this.lbValue.text = r_UtilsSystem.UtilsSystem.numFormats(e);
    this.showLuckBagGuang();
  };
  _ctor.prototype.showLuckBagGuang = function () {
    if (this.bagPic.node.getChildByName("anim")) {
      var e = r_LuckBagSystem.LuckBagSystem.getLuckBagInfoById(this.data.luckBagData.id);
      var t = this.bagPic.node.getChildByName("anim").getComponent(sp.Skeleton);
      t.loop = true;
      if (r_LuckBagOpenUI.LuckBagOpenUI.Inst && r_LuckBagOpenUI.LuckBagOpenUI.Inst.isCaidanShow) {
        t.setSkin("fd_13");
      } else {
        t.setSkin(e.skinName);
      }
      t.setAnimation(0, "fudai_Guang", true);
    }
  };
  _ctor.prototype.onClickSell = function () {
    r_PlayerData.PlayerData.addCoin("福袋", this.data.luckBagData.coin1 + this.data.luckBagData.coin2);
    this.hide();
    r_LuckBagOpenUI.LuckBagOpenUI.hide();
    r_LuckBagUI.default.showUI();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("福袋双倍", function () {
      r_PlayerData.PlayerData.addCoin("福袋", 2 * (e.data.luckBagData.coin1 + e.data.luckBagData.coin2));
      e.hide();
      r_LuckBagOpenUI.LuckBagOpenUI.hide();
      r_LuckBagUI.default.showUI();
    });
  };
  _ctor.prototype.onClickbNoSell = function () {
    var e = 0;
    var t = r_LuckBagSystem.LuckBagSystem.getLuckBagRewardInfoById(this.data.luckBagData.awardId1);
    if (2 == t.type) {
      r_LuckBagSystem.LuckBagSystem.addAnimalSign(t.id);
    } else {
      e += this.data.luckBagData.coin1;
    }
    var o = r_LuckBagSystem.LuckBagSystem.getLuckBagRewardInfoById(this.data.luckBagData.awardId2);
    if (2 == o.type) {
      if (t.id == o.id) {
        e += this.data.luckBagData.coin2;
      } else {
        r_LuckBagSystem.LuckBagSystem.addAnimalSign(o.id);
      }
    } else {
      e += this.data.luckBagData.coin2;
    }
    r_PlayerData.PlayerData.addCoin("福袋", e);
    this.hide();
    r_LuckBagOpenUI.LuckBagOpenUI.hide();
    r_LuckBagUI.default.showUI();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnSell")], _ctor.prototype, "btnSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnNoSell")], _ctor.prototype, "btnNoSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("goodsItem1")], _ctor.prototype, "goodsItem1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("goodsItem2")], _ctor.prototype, "goodsItem2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbValue")], _ctor.prototype, "lbValue", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bagPic")], _ctor.prototype, "bagPic", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_LuckBagResultUI;