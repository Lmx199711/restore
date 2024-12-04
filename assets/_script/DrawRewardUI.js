var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_BagSystem = require("BagSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_RoleSystem = require("RoleSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_BagGoodsCfg = require("BagGoodsCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_DrawRewardUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.MysteryShop, r_UIDef.UIDef.Res.UI.DrawRewardUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DrawRewardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DrawRewardUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnGet.onClick(this.onClickGet, this);
    this.btnDouble.onClick(this.onClickDouble, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = this.data.rewardInfo.type - 1;
    r_ResSystem.ResSystem.loadBundleFguiImg(this.pic, "bundle2", "mysteryShop/drawGoods/" + this.data.rewardInfo.iconName);
    if (1 == this.data.rewardInfo.type || 2 == this.data.rewardInfo.type) {
      this.lbCount.text = "+" + r_UtilsSystem.UtilsSystem.numFormats(this.data.rewardInfo.count);
    } else {
      this.lbCount.text = this.data.rewardInfo.desc;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickClose = function () {
    this.hide();
  };
  _ctor.prototype.onClickGet = function () {
    if (this.data.rewardInfo.goodsId) {
      if (this.data.rewardInfo.goodsId == r_BagGoodsCfg.GoodsName.免广卡) {
        r_PlatformSystem.PlatformSystem.addFreeCard(1);
      } else {
        r_BagSystem.BagSystem.setPlayerGoodsInfoById(this.data.rewardInfo, 1);
      }
      r_UtilsSystem.UtilsSystem.showTip("恭喜获得 " + this.data.rewardInfo.name);
    } else {
      if (7 == this.data.rewardInfo.id) {
        r_PlayerData.PlayerData.data.mysteryShopMap.exchangeCardCount += 1;
        r_UtilsSystem.UtilsSystem.showTip("恭喜获得 " + this.data.rewardInfo.name);
      } else if (1 == this.data.rewardInfo.type) {
        r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.乡村神秘商店, this.data.rewardInfo.count);
      } else {
        r_PlayerData.PlayerData.addCoin("神秘商店", this.data.rewardInfo.count, r_ReportSystem.SystemKey.None, true, false);
      }
      r_PlayerData.PlayerData.saveData();
    }
    r_SoundMgr.SoundMgr.playSound("huodejinbi");
    this.onClickClose();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("神秘商店双倍领取", function () {
      if (e.data.rewardInfo.goodsId) {
        if (e.data.rewardInfo.goodsId == r_BagGoodsCfg.GoodsName.免广卡) {
          r_PlatformSystem.PlatformSystem.addFreeCard(2);
        } else {
          r_BagSystem.BagSystem.setPlayerGoodsInfoById(e.data.rewardInfo, 2);
        }
        r_UtilsSystem.UtilsSystem.showTip("恭喜获得 " + e.data.rewardInfo.name + " x2");
      } else {
        if (7 == e.data.rewardInfo.id) {
          r_PlayerData.PlayerData.data.mysteryShopMap.exchangeCardCount += 2;
          r_UtilsSystem.UtilsSystem.showTip("恭喜获得 " + e.data.rewardInfo.name + " x2");
        } else if (1 == e.data.rewardInfo.type) {
          r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.乡村神秘商店, 2 * e.data.rewardInfo.count);
        } else {
          r_PlayerData.PlayerData.addCoin("神秘商店", 2 * e.data.rewardInfo.count, r_ReportSystem.SystemKey.None, true, false);
        }
        r_PlayerData.PlayerData.saveData();
      }
      e.onClickClose();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("pic")], _ctor.prototype, "pic", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbCount")], _ctor.prototype, "lbCount", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_DrawRewardUI;