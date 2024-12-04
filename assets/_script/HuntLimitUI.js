var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HuntLimitUI = undefined;
var r_UIDef = require("UIDef");
var r_BagSystem = require("BagSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_BagGoodsCfg = require("BagGoodsCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_HuntUI = require("HuntUI");
var exp_HuntLimitUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Hunt, r_UIDef.UIDef.Res.UI.HuntLimitUI) || this;
    t.videoCount = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HuntLimitUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HuntLimitUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onClose, this);
    this.btnComeIn.onClick(this.onClickComeIn, this);
    this.btnLock.onClick(this.onClickLock, this);
    r_ResSystem.ResSystem.loadBundleRes("game5", "hunt/美女", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.role.node.addChild(i);
      i.getComponent(sp.Skeleton).setAnimation(0, "idle_2", true);
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.videoCount = 0;
    this.btnLock.getChild("lbCount").text = this.videoCount + "/2";
    if (r_BagSystem.BagSystem.getPlayerGoodsInfoById(r_BagGoodsCfg.GoodsName.狩猎证)) {
      this.btnComeIn.enabled = true;
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      this.btnComeIn.enabled = false;
      this.contentPane.getController("c1").selectedIndex = 0;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickComeIn = function () {
    this.hide();
    r_BagSystem.BagSystem.setPlayerGoodsInfoById(r_BagGoodsCfg.GoodsName.狩猎证, -1);
    r_PlayerData.PlayerData.data.huntMap.unlock = 1;
  };
  _ctor.prototype.onClickLock = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("狩猎提前解锁", function () {
      e.videoCount++;
      e.btnLock.getChild("lbCount").text = e.videoCount + "/2";
      if (e.videoCount >= 2) {
        e.hide();
        r_PlayerData.PlayerData.data.huntMap.unlock = 1;
        r_PlayerData.PlayerData.saveData();
      }
    });
  };
  _ctor.prototype.onClose = function () {
    this.hide();
    r_HuntUI.HuntUI.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnComeIn")], _ctor.prototype, "btnComeIn", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLock")], _ctor.prototype, "btnLock", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.HuntLimitUI = exp_HuntLimitUI;