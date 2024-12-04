var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_LuckBagSystem = require("LuckBagSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_LuckBagGetRewardUI = require("LuckBagGetRewardUI");
var def_LuckBagCollectUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.LuckBag, r_UIDef.UIDef.Res.UI.LuckBagCollectUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LuckBagCollectUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LuckBagCollectUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnStart.onClick(this.onClickStart, this);
    this.btnStart.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/luckBag/bagAnim", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.animNode.node.addChild(i);
      t.btnStart.visible = true;
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("c1").selectedIndex = 0;
    for (var t = 1; t <= 12; t++) {
      this.contentPane.getChild("item" + t).visible = false;
    }
    for (t = 0; t < r_PlayerData.PlayerData.data.luckBagMap.animalSignList.length; t++) {
      r_PlayerData.PlayerData.data.luckBagMap.animalSignList[t].num > 0 && (this.contentPane.getChild("item" + r_PlayerData.PlayerData.data.luckBagMap.animalSignList[t].id).visible = true);
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.data.callback && this.data.callback();
  };
  _ctor.prototype.showLuckBagGuang = function () {
    var e = this;
    this.contentPane.getController("c1").selectedIndex = 1;
    if (this.animNode.node.getChildByName("anim")) {
      var t = this.animNode.node.getChildByName("anim").getComponent(sp.Skeleton);
      var o = t.setAnimation(0, "luopan", false);
      t.setTrackCompleteListener(o, function () {
        r_LuckBagGetRewardUI.default.showUI({
          awardId: 28,
          callback: function () {
            e.hide();
          }
        });
      });
    }
  };
  _ctor.prototype.onClickStart = function () {
    if (r_PlayerData.PlayerData.data.luckBagMap.animalSignList.length < 12) {
      r_UtilsSystem.UtilsSystem.showTip("生肖勋章不足");
    } else {
      r_LuckBagSystem.LuckBagSystem.deleteAnimalSgin();
      this.showLuckBagGuang();
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animNode")], _ctor.prototype, "animNode", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_LuckBagCollectUI;