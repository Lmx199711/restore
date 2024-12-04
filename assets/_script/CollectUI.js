var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectUI = undefined;
var r_UIDef = require("UIDef");
var r_FarmCfg = require("FarmCfg");
var r_BagSystem = require("BagSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_HarvestUI = require("HarvestUI");
var exp_CollectUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Res.UI.CollectUI) || this;
    t.isOpening = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CollectUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CollectUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(function () {
      t.hide();
    }, this);
    this.btnOpen.onClick(function () {
      if (t.hasAllMark()) {
        t.open();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("集齐神兽印记，可开启古帝印");
      }
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("anim").node.destroyAllChildren();
    this.isOpening = false;
    this.setMarkInfo();
  };
  _ctor.prototype.setMarkInfo = function () {
    for (var e = 0; e < r_FarmCfg.MarkCfg.length; e++) {
      var t = r_FarmCfg.MarkCfg[e];
      var o = this.contentPane.getChild("item" + (t.id - 1e3)).asCom;
      o.getChild("hl").visible = this.hasMark(t.id);
      o.getChild("icon").grayed = !this.hasMark(t.id);
    }
  };
  _ctor.prototype.open = function () {
    var e = this;
    if (!this.isOpening) {
      this.isOpening = true;
      r_ResSystem.ResSystem.loadBundleRes("game2", "farm/zh", cc.Prefab, function (t, o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        e.contentPane.getChild("itemRoot").visible = false;
        var i = cc.instantiate(o);
        e.contentPane.getChild("anim").node.addChild(i);
        i.x = 0;
        i.y = 0;
        var n = i.getComponent(sp.Skeleton);
        n.setAnimation(0, "animation", false);
        n.setCompleteListener(function () {
          e.contentPane.getChild("itemRoot").visible = true;
          e.isOpening = false;
          e.setMarkInfo();
          i.destroy();
          r_PlayerData.PlayerData.useFarmMark();
          r_HarvestUI.HarvestUI.showUI({
            id: 2001,
            call: function () {
              r_BagSystem.BagSystem.setPlayerGoodsInfoById(46, 1);
            }
          });
          e.hide();
        });
      });
    }
  };
  _ctor.prototype.hasMark = function (e) {
    return r_PlayerData.PlayerData.isFarmMark(e);
  };
  _ctor.prototype.hasAllMark = function () {
    for (var e = 0; e < r_FarmCfg.MarkCfg.length; e++) {
      var t = r_FarmCfg.MarkCfg[e];
      if (!this.hasMark(t.id)) {
        return false;
      }
    }
    return true;
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.CollectUI = exp_CollectUI;