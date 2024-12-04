var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_BagSystem = require("BagSystem");
var r_LuckBagSystem = require("LuckBagSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_LuckBagGetRewardUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.LuckBag, r_UIDef.UIDef.Res.UI.LuckBagGetRewardUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LuckBagGetRewardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LuckBagGetRewardUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnSure.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    var t = r_LuckBagSystem.LuckBagSystem.getLuckBagRewardInfoById(this.data.awardId);
    r_ResSystem.ResSystem.loadFguiImg(this.goodsItem.getChild("pic"), "ui/luckBag/reward/" + t.name);
    this.goodsItem.getChild("lbNum").text = "";
    this.goodsItem.getChild("lbName").text = t.name;
    this.showLuckBagGuang();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.data.callback && this.data.callback();
    if (28 == this.data.awardId) {
      r_BagSystem.BagSystem.setPlayerGoodsInfoById(45, 1);
      r_UtilsSystem.UtilsSystem.showTip("恭喜获得爱国福，请前往仓库查看");
    }
  };
  _ctor.prototype.showLuckBagGuang = function () {
    r_SoundMgr.SoundMgr.playSound("luckBag/开出生肖币");
    cc.tween(this.guang.node).repeatForever(cc.tween().by(.5, {
      angle: -100
    })).start();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnSure")], _ctor.prototype, "btnSure", undefined);
  __decorate([r_DecorateFunction1.AutoFind("goodsItem")], _ctor.prototype, "goodsItem", undefined);
  __decorate([r_DecorateFunction1.AutoFind("guang")], _ctor.prototype, "guang", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_LuckBagGetRewardUI;