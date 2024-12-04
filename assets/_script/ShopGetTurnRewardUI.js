var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopGetTurnRewardUI = undefined;
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_ResSystem = require("ResSystem");
var r_BagGoodsCfg = require("BagGoodsCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_PlayerData = require("PlayerData");
var r_BagSystem = require("BagSystem");
var r_OpenDriftBottleUI = require("OpenDriftBottleUI");
var r_RoleSystem = require("RoleSystem");
var r_ShopTurntableUI = require("ShopTurntableUI");
var r_TimeSystem = require("TimeSystem");
var r_FguiResSystem = require("FguiResSystem");
var S = [2e4, 5e4, 1e5, 2e5, 5e5];
var I = [200, 500, 1e3, 2e3, 5e3];
var b = [1e4, 2e4, 5e4, 1e5, 2e5];
var x = [100, 200, 500, 1e3, 2e3];
var exp_ShopGetTurnRewardUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GoodsShop, r_UIDef.UIDef.Res.UI.ShopGetTurnRewardUI) || this;
    t.isRuning = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ShopGetTurnRewardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ShopGetTurnRewardUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnSell.onClick(this.onClickSell, this);
    this.btnOpen.onClick(this.onClickOpen, this);
    this.btnOpenFree.onClick(this.onClickOpenFree, this);
    this.btnGet.onClick(this.onClickGet, this);
    this.btnDouble.onClick(this.onClickDouble, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.isRuning = false;
    this.contentPane.getController("c1").selectedIndex = r_BagGoodsCfg.turntableRewardList[this.data.id - 1].type - 1;
    0 != this.contentPane.getController("c1").selectedIndex && r_ResSystem.ResSystem.loadBundleFguiImg(this.pic1, "bundle2", "goodsShop/turntable/" + r_BagGoodsCfg.turntableRewardList[this.data.id - 1].name);
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "goodsShop/漂流瓶", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.picOpen.node.addChild(i);
      t.picOpen.visible = false;
    });
    this.lbValue.text = "售价：" + r_UtilsSystem.UtilsSystem.numFormats(5e4);
    this.lbDesc.text = "" + r_BagGoodsCfg.turntableRewardList[this.data.id - 1].desc;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.isRuning = false;
    this.pic.visible = true;
    this.picOpen.node.removeAllChildren();
  };
  _ctor.prototype.onClickSell = function () {
    if (!this.isRuning) {
      r_PlayerData.PlayerData.addCoin("漂流瓶", 5e4);
      this.hide();
    }
  };
  _ctor.prototype.onClickOpen = function () {
    var e = this;
    this.isRuning || r_PlatformSystem.PlatformSystem.showVideo("漂流瓶打开", function () {
      e.picOpen.visible = true;
      e.pic.visible = false;
      if (e.picOpen.node.getChildByName("anim")) {
        var t = e.picOpen.node.getChildByName("anim").getComponent(sp.Skeleton);
        var o = t.setAnimation(0, "animation", false);
        e.isRuning = true;
        t.setTrackCompleteListener(o, function () {
          r_OpenDriftBottleUI.OpenDriftBottleUI.showUI({
            opendCallback: function () {
              e.hide();
            }
          });
          e.isRuning = false;
        });
      } else {
        r_OpenDriftBottleUI.OpenDriftBottleUI.showUI({
          opendCallback: function () {
            e.hide();
          }
        });
      }
    });
  };
  _ctor.prototype.onClickOpenFree = function () {
    if (2 == this.data.id) {
      r_PlayerData.PlayerData.addCoin("超级礼盒", r_UtilsSystem.UtilsSystem.getRandomFromArr(S));
      r_TimeSystem.TimeSystem.scheduleOnce("openfree", .5, function () {
        r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.小游戏, r_UtilsSystem.UtilsSystem.getRandomFromArr(I));
      });
    } else if (4 == this.data.id) {
      r_PlayerData.PlayerData.addCoin("神秘礼盒", r_UtilsSystem.UtilsSystem.getRandomFromArr(b));
      r_TimeSystem.TimeSystem.scheduleOnce("openfree", .5, function () {
        r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.小游戏, r_UtilsSystem.UtilsSystem.getRandomFromArr(x));
      });
    }
    this.hide();
  };
  _ctor.prototype.onClickGet = function () {
    if (1 == this.data.id) {
      r_BagSystem.BagSystem.setPlayerGoodsInfoById(44, 1);
    } else if (5 == this.data.id) {
      r_PlayerData.PlayerData.data.shopMap.trunCount += r_BagGoodsCfg.turntableRewardList[this.data.id].count;
      r_ShopTurntableUI.ShopTurntableUI.Inst && r_ShopTurntableUI.ShopTurntableUI.Inst.refreshBtnState();
    } else {
      6 == this.data.id && (r_PlayerData.PlayerData.data.shopMap.freeCount += 1);
    }
    r_PlayerData.PlayerData.saveData();
    this.hide();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("漂流瓶打开", function () {
      if (1 == e.data.id) {
        r_BagSystem.BagSystem.setPlayerGoodsInfoById(44, 2);
      } else if (5 == e.data.id) {
        r_PlayerData.PlayerData.data.shopMap.trunCount += 2 * r_BagGoodsCfg.turntableRewardList[e.data.id].count;
        r_ShopTurntableUI.ShopTurntableUI.Inst && r_ShopTurntableUI.ShopTurntableUI.Inst.refreshBtnState();
      } else {
        6 == e.data.id && (r_PlayerData.PlayerData.data.shopMap.freeCount += 2);
      }
      r_UtilsSystem.UtilsSystem.showTip("恭喜获得 " + r_BagGoodsCfg.turntableRewardList[e.data.id - 1].name + " x2");
      r_PlayerData.PlayerData.saveData();
      e.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnSell")], _ctor.prototype, "btnSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpenFree")], _ctor.prototype, "btnOpenFree", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbValue")], _ctor.prototype, "lbValue", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbDesc")], _ctor.prototype, "lbDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pic")], _ctor.prototype, "pic", undefined);
  __decorate([r_DecorateFunction1.AutoFind("picOpen")], _ctor.prototype, "picOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pic1")], _ctor.prototype, "pic1", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.ShopGetTurnRewardUI = exp_ShopGetTurnRewardUI;