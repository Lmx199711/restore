var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenCardUI = undefined;
var r_UIDef = require("UIDef");
var r_FarmCfg = require("FarmCfg");
var r_DebugSystem = require("DebugSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_ShopUI = require("ShopUI");
var exp_OpenCardUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Res.UI.OpenCardUI) || this;
    t.maxCount = 5;
    t.cardCount = 0;
    t.isOpening = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.OpenCardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.OpenCardUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    _ctor.Inst = this;
    this.btnClose.onClick(function () {
      o.hide();
    }, this);
    this.btnFive.onClick(function () {
      o.seedAnim && !o.isOpening && r_PlatformSystem.PlatformSystem.showVideo("农场五连抽", function () {
        o.openCard(5);
      });
    }, this);
    this.btnOne.onClick(function () {
      if (o.seedAnim && !o.isOpening) {
        if (r_PlayerData.PlayerData.data.farmCardCount <= 0) {
          r_UtilsSystem.UtilsSystem.showTip("次数不足哦");
        } else if (r_PlayerData.PlayerData.isCoinEnough(r_FarmCfg.OpenCardCost)) {
          r_PlayerData.PlayerData.deleteCoin("农场抽一次", r_FarmCfg.OpenCardCost, r_ReportSystem.SystemKey.农场);
          r_PlayerData.PlayerData.data.farmCardCount >= o.maxCount && (r_PlayerData.PlayerData.data.farmCardNextTime = r_TimeSystem.TimeSystem.getServerTime() + r_FarmCfg.OpenCardInterval);
          r_PlayerData.PlayerData.data.farmCardCount--;
          r_PlayerData.PlayerData.saveData();
          r_ShopUI.ShopUI.Inst.showSSRTip();
          o.openCard(1);
        } else {
          r_UtilsSystem.UtilsSystem.showTip("金币不足哦");
        }
      }
    }, this);
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("game2", "farm/seedAnim", cc.Prefab, function (e, t) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(o, t);
      o.contentPane.visible = true;
      var i = cc.instantiate(t);
      o.contentPane.getChild("anim").node.addChild(i);
      i.x = 0;
      i.y = 0;
      i.scale = .9;
      o.seedAnim = i.getComponent(sp.Skeleton);
      o.openCard(o.cardCount);
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("cost").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_FarmCfg.OpenCardCost);
    this.cardCount = this.data.count;
    this.isOpening = false;
    r_ShopUI.ShopUI.Inst.showSSRTip();
    this.openCard(this.cardCount);
  };
  _ctor.prototype.onHide = function () {};
  _ctor.prototype.openCard = function (e) {
    var t = this;
    if (!(!this.seedAnim || this.isOpening || e <= 0)) {
      this.isOpening = true;
      this.cardCount = e;
      var o = this.contentPane.getChild("anim").node.getChildByName("root");
      if (!o) {
        o = new cc.Node("root");
        this.contentPane.getChild("anim").node.addChild(o);
      }
      o.removeAllChildren();
      if (1 == this.cardCount) {
        this.seedAnim.setAnimation(0, "fudai", false);
      } else {
        this.seedAnim.setAnimation(0, "fudai2", false);
      }
      this.seedAnim.setCompleteListener(function () {
        var e = Math.floor(Math.random() * t.cardCount) + 1;
        for (var i = 1; i <= t.cardCount; i++) {
          var n = fgui.UIPackage.createObject(r_UIDef.UIDef.Pack.Farm, "btnItem").asCom;
          o.addChild(n.node);
          var a = t.seedAnim.node.getChildByName("p" + i);
          n.node.x = a.x * t.seedAnim.node.scaleX;
          n.node.y = a.y * t.seedAnim.node.scaleY;
          n.node.scale = 0;
          n.node.opacity = 0;
          cc.tween(n.node).to(.1, {
            scale: 1,
            opacity: 255
          }).call(function () {
            t.isOpening = false;
          }).start();
          var l = t.randOneCard();
          if (i == e && r_DebugSystem.DebugSystem.farmType == r_DebugSystem.GMToolTypeFarm.bizhongSSR) {
            var u = r_FarmCfg.FarmCfg.filter(function (e) {
              return "SSR" == e.lv;
            });
            l = u[Math.floor(Math.random() * u.length)];
          }
          r_ResSystem.ResSystem.loadBundleFguiImg(n.getChild("icon"), "game2", "farm/item/item" + l.id);
          n.getChild("name").text = l.name;
          n.getChild("num").text = r_FarmCfg.OpenCardSeedNum + "";
          n.getController("c1").setSelectedPage(l.lv);
          n.getController("c2").selectedIndex = 1;
          r_PlayerData.PlayerData.setFarmSeed(l.id, r_FarmCfg.OpenCardSeedNum);
        }
        r_PlayerData.PlayerData.saveData();
        r_ShopUI.ShopUI.Inst.showSSRTip();
      });
    }
  };
  _ctor.prototype.randOneCard = function () {
    r_PlayerData.PlayerData.data.farmCardOpenCount || (r_PlayerData.PlayerData.data.farmCardOpenCount = 0);
    r_PlayerData.PlayerData.data.farmCardOpenCount++;
    if (r_PlayerData.PlayerData.data.farmCardOpenCount >= r_FarmCfg.OpenCardCountSSR) {
      r_PlayerData.PlayerData.data.farmCardOpenCount = 0;
      var e = r_FarmCfg.FarmCfg.filter(function (e) {
        return "SSR" == e.lv;
      });
      return e[Math.floor(Math.random() * e.length)];
    }
    var t = Math.random();
    var o = 0;
    for (var i = 0; i < r_FarmCfg.FarmCfg.length; i++) {
      var n = r_FarmCfg.FarmCfg[i];
      if (t < (o += n.rate / 100)) {
        "SSR" == n.lv && (r_PlayerData.PlayerData.data.farmCardOpenCount = 0);
        return n;
      }
    }
  };
  _ctor.prototype.updateDownTime = function (e) {
    this.btnOne.getChild("num").text = "(" + r_PlayerData.PlayerData.data.farmCardCount + "/" + this.maxCount + ")";
    var t = this.contentPane.getChild("downTime");
    t.visible = r_PlayerData.PlayerData.data.farmCardCount < this.maxCount;
    e && t.asTextField.setVar("num", e).flushVars();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOne")], _ctor.prototype, "btnOne", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFive")], _ctor.prototype, "btnFive", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.OpenCardUI = exp_OpenCardUI;