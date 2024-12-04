var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragonUI = undefined;
var r_UIDef = require("UIDef");
var r_TYIndex = require("TYIndex");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_ResSystem = require("ResSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_RoleSystem = require("RoleSystem");
var r_JumpFishUI = require("JumpFishUI");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var exp_DragonUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.JumpFish, r_UIDef.UIDef.Res.UI.DragonUI) || this;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DragonUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DragonUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnGetMoney.onClick(this.onClickGetMoney, this);
    this.btnGetSecret.onClick(this.onClickGetSecret, this);
    this.btnGetHelp.onClick(this.onClickGetHelp, this);
    this.btnPeace.onClick(this.onClickPeace, this);
    this.btnOK.onClick(this.onClickOK, this);
    this.btnOk.onClick(this.onClickOk, this);
    this.my_group = this.contentPane.getChild("group").asGroup;
    r_ResSystem.ResSystem.loadBundleRes("game1", "jumpFish/shenlong", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        t.dragon = cc.instantiate(o);
        t.dragon.parent = t.contentPane.getChild("icon").node;
        t.playDragon();
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.my_group.visible = false;
    this.dragon && this.playDragon();
    this.contentPane.getController("c1").selectedIndex = r_PlayerData.PlayerData.data.jumpFishEgg ? r_PlatformSystem.PlatformSystem.getIsWebPlatform() ? 0 : 1 : 0;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_JumpFishUI.JumpFishUI.hide();
  };
  _ctor.prototype.onClickGetMoney = function () {
    r_PlayerData.PlayerData.addCoin("神龙许愿", 5e8);
    this.toSure("我已经帮你实现了成为土豪的梦想");
  };
  _ctor.prototype.onClickGetSecret = function () {
    this.toSure("你已经新获得一名漂亮的秘书");
    r_UtilsSystem.UtilsSystem.showTip("恭喜主界面解锁新的秘书");
    r_SecretUpSystem.SecretUpSystem.addNoneSecret("asc");
  };
  _ctor.prototype.onClickGetHelp = function () {
    if (r_RoleSystem.RoleSystem.hasPendant()) {
      r_UtilsSystem.UtilsSystem.showTip("已拥有保镖，奖励更换成五亿金币");
      r_UtilsSystem.UtilsSystem.scheduleOnce(500, function () {
        r_PlayerData.PlayerData.addCoin("神龙许愿", 5e8);
      });
      this.toSure("你已经拥有了保镖，奖励更换成五亿金币");
    } else {
      r_UtilsSystem.UtilsSystem.showTip("恭喜主界面解锁强力保镖");
      r_RoleSystem.RoleSystem.addPendant(1);
      this.toSure("你现在已经拥有了一名强壮的保镖");
    }
  };
  _ctor.prototype.onClickPeace = function () {
    this.toSure("很不错的愿望，奖励你三张免广告卡");
    r_PlayerData.PlayerData.data.jumpFishEgg = true;
    r_PlatformSystem.PlatformSystem.addFreeCard(3);
  };
  _ctor.prototype.playDragon = function () {
    var e = this;
    var t = this.dragon.getComponent(sp.Skeleton);
    t.setAnimation(0, "chuchang", false);
    r_SoundMgr.SoundMgr.playSound("jumpFish/变身龙");
    t.setCompleteListener(function (o) {
      if ("chuchang" == o.animation.name) {
        e.my_group.visible = true;
        t.setAnimation(0, "daiji", true);
      }
    });
  };
  _ctor.prototype.onClickOK = function () {
    r_PlayerData.PlayerData.addCoin("神龙许愿", 1e8);
    this.hide();
  };
  _ctor.prototype.onClickOk = function () {
    this.hide();
  };
  _ctor.prototype.toSure = function (e) {
    r_PlayerData.PlayerData.data.jumpFishEgg = true;
    this.contentPane.getController("c1").selectedIndex = 2;
    this.contentPane.getChild("n5").text = e;
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnGetMoney")], _ctor.prototype, "btnGetMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGetSecret")], _ctor.prototype, "btnGetSecret", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGetHelp")], _ctor.prototype, "btnGetHelp", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnPeace")], _ctor.prototype, "btnPeace", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOK")], _ctor.prototype, "btnOK", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  return _ctor;
}(r_TYIndex.UIWind);
exports.DragonUI = exp_DragonUI;