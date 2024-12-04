var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyLandShopUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_jsbi = require("jsbi");
var r_CommonFunc = require("CommonFunc");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_TowerSystem = require("TowerSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponRankSystem = require("WeaponRankSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_DialogueUI = require("DialogueUI");
var r_Tip2BtnUI = require("Tip2BtnUI");
var r_StoneVideoUI = require("StoneVideoUI");
var r_TowerBookUI = require("TowerBookUI");
var r_WeaponRankUI = require("WeaponRankUI");
var r_FairyLandAdviceUI = require("FairyLandAdviceUI");
var r_FairyLandDrawUI = require("FairyLandDrawUI");
var r_FairyLandGuide = require("FairyLandGuide");
var r_FairyLandUI = require("FairyLandUI");
var r_FairyLandWashUI = require("FairyLandWashUI");
var r_FairyShopPetUI = require("FairyShopPetUI");
var r_WeaponStrongUI = require("WeaponStrongUI");
var r_WpForgeUI = require("WpForgeUI");
var exp_FairyLandShopUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.FairyLandShopUI) || this;
    t.uiType = "fullScreen";
    t.selectRecList = [];
    t.isOpenRank = false;
    t.aPart = [];
    t.bPart = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.copyedRecipes = null;
    this.selectRecList = [];
    this.btnRecBegin.text = r_WeaponSystem.WeaponSystem.GetFairySet("forgeCost") + "";
    this.refreshList();
    this.freshHighWeapon();
    r_WeaponRankSystem.WeaponRankSystem.UpWeapon2Rank();
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.newWeapon, this.freshHighWeapon, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.stoneChange, this.updateBtnRedTip, this);
    var o = r_WeaponSystem.WeaponSystem.GetFairySet("version_shop");
    o && (r_PlayerData.PlayerData.data.fairy.version_shop = o);
    r_PlayerData.PlayerData.getComeInSysCount("fLGuide") < 1 && r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) < 1 && r_TimeSystem.TimeSystem.scheduleOnce("DialogueUI", .3, function () {
      r_DialogueUI.DialogueUI.showUI({
        id: 103
      });
    });
    this.updateBtnRedTip();
    r_TimeSystem.TimeSystem.registSecondUpdate("FairyLandShopUpdate", this.updateBtnRedTip.bind(this));
    if (r_PlayerData.PlayerData.data.isFairyDrawGuide) {
      this.finger.visible = false;
    } else {
      this.finger.visible = true;
    }
  };
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FairyLandShopUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyLandShopUI);
  };
  _ctor.prototype.onHide = function () {
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.newWeapon, this.freshHighWeapon, this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("FairyLandShopUpdate");
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.stoneChange, this.updateBtnRedTip, this);
    _ctor.Inst = null;
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.turnBack.bind(this));
    this.btnForge.onClick(this.onClickForge.bind(this));
    this.btnDraw.onClick(this.onClickDraw.bind(this));
    this.btnRecClose.onClick(this.RecClose.bind(this));
    this.btnRecBegin.onClick(this.RecBegin.bind(this));
    this.btnBook.onClick(this.onClickBook.bind(this));
    this.btnStrong.onClick(this.onClickStrong.bind(this));
    this.isOpenRank = true;
    this.btnRank.grayed = false;
    this.btnRank.onClick(this.onClickRank.bind(this));
    this.btnWash.onClick(this.onClickWash.bind(this));
    this.btnBB.onClick(this.onClickPet.bind(this));
    this.state = this.contentPane.getController("state");
    this.list1.itemRenderer = this.list1Render.bind(this);
    this.list2.itemRenderer = this.list2Render.bind(this);
    this.initAnim();
  };
  _ctor.prototype.initAnim = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "main/chouka", cc.Prefab, function (t, o) {
      e.chouka = cc.instantiate(o);
      e.chouka.active = true;
      e.btnDraw.getChild("icon").node.addChild(e.chouka);
      e.btnDraw.icon = "";
    });
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "main/jingzi", cc.Prefab, function (t, o) {
      e.jingzi = cc.instantiate(o);
      e.jingzi.active = true;
      e.iconJz.node.addChild(e.jingzi);
    });
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "main/luzi", cc.Prefab, function (t, o) {
      e.luzi = cc.instantiate(o);
      e.luzi.active = true;
      e.btnForge.getChild("icon").node.addChild(e.luzi);
    });
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "main/tujian", cc.Prefab, function (t, o) {
      e.tujian = cc.instantiate(o);
      e.tujian.active = true;
      e.btnBook.getChild("icon").node.addChild(e.tujian);
      e.btnBook.icon = "";
    });
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "main/qianghua", cc.Prefab, function (t, o) {
      e.qianghua = cc.instantiate(o);
      e.qianghua.active = true;
      e.btnStrong.getChild("icon").node.addChild(e.qianghua);
      e.btnStrong.icon = "";
    });
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "main/xilian", cc.Prefab, function (t, o) {
      e.xilian = cc.instantiate(o);
      e.xilian.active = true;
      e.btnWash.getChild("icon").node.addChild(e.xilian);
      e.btnWash.icon = "";
    });
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "main/qiwuhun", cc.Prefab, function (t, o) {
      e.qiwuhun = cc.instantiate(o);
      e.qiwuhun.active = true;
      e.btnBB.visible = true;
      e.btnBB.getChild("icon").node.addChild(e.qiwuhun);
    });
    this.isOpenRank && r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "main/paihangbang", cc.Prefab, function (t, o) {
      e.paihangbang = cc.instantiate(o);
      e.paihangbang.active = true;
      e.btnRank.icon = "";
      e.btnRank.getChild("icon").node.addChild(e.paihangbang);
      e.btnRank.icon = "";
    });
  };
  _ctor.prototype.onClickWash = function () {
    if (r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) < 1) {
      r_UtilsSystem.UtilsSystem.showTip("请先拥有一把武器");
    } else {
      r_FairyLandWashUI.FairyLandWashUI.showUI();
    }
  };
  _ctor.prototype.onClickPet = function () {
    if (r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) < 1) {
      r_UtilsSystem.UtilsSystem.showTip("请先拥有一把武器");
    } else {
      r_FairyShopPetUI.FairyShopPetUI.showUI();
    }
  };
  _ctor.prototype.onClickNone = function () {
    r_UtilsSystem.UtilsSystem.showTip("暂未开放，敬请期待");
  };
  _ctor.prototype.turnBack = function () {
    if (0 != this.state.selectedIndex) {
      this.state.selectedIndex = 0;
    } else {
      this.hide();
      r_FairyLandUI.FairyLandUI.Inst && r_FairyLandUI.FairyLandUI.Inst.showTowerJuQing();
    }
  };
  _ctor.prototype.onClickRank = function () {
    r_WeaponRankUI.WeaponRankUI.showUI();
  };
  _ctor.prototype.onClickStrong = function () {
    if (r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) < 1) {
      r_UtilsSystem.UtilsSystem.showTip("请先拥有一把武器");
    } else {
      r_WeaponStrongUI.WeaponStrongUI.showUI();
    }
  };
  _ctor.prototype.onClickBook = function () {
    r_TowerBookUI.TowerBookUI.showUI({
      isClickInfo: true
    });
  };
  _ctor.prototype.onClickDraw = function () {
    r_FairyLandDrawUI.FairyLandDrawUI.showUI();
  };
  _ctor.prototype.onClickForge = function () {
    this.state.setSelectedPage("forge");
    this.copyedRecipes = null;
    this.refreshList();
    r_PlayerData.PlayerData.getComeInSysCount("fLGuide") < 1 && r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) < 1 && r_FairyLandGuide.FairyLandGuide.finishStep(2);
  };
  _ctor.prototype.freshStrong = function () {};
  _ctor.prototype.refreshList = function () {
    this.sore2Part();
    var e = r_WeaponSystem.WeaponSystem.GetRecipesLen();
    this.list1.numItems = e;
    this.list2.numItems = 3;
  };
  _ctor.prototype.freshHighWeapon = function () {
    var e = r_WeaponSystem.WeaponSystem.MyHighestWeapon().id;
    if (e) {
      this.iconShow.url = "";
      var t = r_WeaponSystem.WeaponSystem.GetWeaponInfo(e);
      r_ResSystem.ResSystem.loadBundleFguiImg(this.iconShow, "bdWeaponForge", "weapon/big/" + t.name);
      this.iconLabel.url = "ui://FairyLandShop/label" + e;
    } else {
      cc.log("没有最高武器");
      this.iconLabel.url = "";
      this.iconShow.url = "";
    }
    r_TowerSystem.TowerSystem.getCurWeapon() || r_TowerSystem.TowerSystem.equipWeapon(e);
  };
  _ctor.prototype.list1Render = function (e, t) {
    var o = "";
    t.clearClick();
    if (e < this.aPart.length) {
      o = this.aPart[e];
      t.getController("state").selectedIndex = 0;
      t.onClick(this.selectRecipe.bind(this, r_WeaponSystem.WeaponSystem.GetRecipeInfo(o)));
    } else {
      var i = e - this.aPart.length;
      o = this.bPart[i];
      t.getController("state").selectedIndex = 1;
    }
    var n = this.copyedRecipes[o];
    var a = r_WeaponSystem.WeaponSystem.GetRecipeInfo(o);
    t.getChild("txtNum").text = n + "";
    t.icon = a.url;
    t.getController("type").selectedIndex = a.type - 1;
  };
  _ctor.prototype._reduceRecipes = function (e, t) {
    undefined === t && (t = -1);
    if (this.copyedRecipes) {
      for (var o in this.copyedRecipes) if (e == Number(o)) {
        this.copyedRecipes[o] = this.copyedRecipes[o] + t;
        break;
      }
    }
  };
  _ctor.prototype.sore2Part = function () {
    var e = [];
    this.selectRecList.forEach(function (t) {
      return e.push(t.id);
    });
    this.copyedRecipes || (this.copyedRecipes = JSON.parse(JSON.stringify(r_PlayerData.PlayerData.data.weapon.recipes)));
    if (this.copyedRecipes) {
      this.aPart = [];
      this.bPart = [];
      var t = r_WeaponSystem.WeaponSystem.Weapons;
      for (var o in this.copyedRecipes) if (3 != this.selectRecList.length) {
        var i = true;
        var n = 0;
        for (var a = t; n < a.length; n++) {
          var s = a[n].res;
          if (r_CommonFunc.IsValueInWipeArea(s, e, Number(o))) {
            i = false;
            break;
          }
        }
        if (i) {
          this.bPart.push(o);
        } else {
          this.aPart.push(o);
        }
      } else {
        this.bPart.push(o);
      }
    }
  };
  _ctor.prototype.selectRecipe = function (e) {
    if (this.selectRecList.length < 3) {
      this.selectRecList.push(e);
      this._reduceRecipes(e.id);
      r_SoundMgr.SoundMgr.playSound("click");
      this.refreshList();
      r_PlayerData.PlayerData.getComeInSysCount("fLGuide") < 1 && r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) < 1 && this.selectRecList.length >= 3 && r_FairyLandGuide.FairyLandGuide.finishStep(3);
    }
  };
  _ctor.prototype.list2Render = function (e, t) {
    var o = this;
    t.clearClick();
    if (e < this.selectRecList.length) {
      var i = this.selectRecList[e];
      t.text = i.name;
      t.icon = i.url;
      t.getChild("txtNum").text = "1";
      t.onClick(function () {
        o.selectRecList.splice(e, 1);
        o._reduceRecipes(i.id, 1);
        o.refreshList();
      });
    } else {
      t.icon = "";
      t.text = "";
      t.getChild("txtNum").text = "";
    }
  };
  _ctor.prototype.RecClose = function () {
    this.state.selectedIndex = 0;
    this.selectRecList = [];
  };
  _ctor.prototype.RecBegin = function () {
    var e = this;
    if (this.copyedRecipes && 3 == this.selectRecList.length) {
      if (!r_PlayerData.PlayerData.isStoneEnough(r_WeaponSystem.WeaponSystem.GetFairySet("forgeCost"))) {
        return void r_StoneVideoUI.StoneVideoUI.showUI();
      }
      var t = [];
      this.selectRecList.forEach(function (e) {
        return t.push(e.id);
      });
      var o;
      var i = 0;
      for (var n = r_WeaponSystem.WeaponSystem.Weapons; i < n.length; i++) {
        var a = n[i];
        var s = a.res;
        if (r_CommonFunc.IsValueInWipeArea(s, t)) {
          o = a;
          break;
        }
      }
      o || cc.warn("逗我呢，找不到合成的目标武器？");
      if (r_PlayerData.PlayerData.data.weapon.weapons && r_PlayerData.PlayerData.data.weapon.weapons[o.id]) {
        r_Tip2BtnUI.Tip2BtnUI.showUI({
          closeCallback: function () {},
          okCallback: function () {
            e.beginToForging(o);
          }
        });
      } else {
        this.beginToForging(o);
      }
      if (r_PlayerData.PlayerData.getComeInSysCount("fLGuide") < 1 && r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) < 1) {
        r_PlayerData.PlayerData.setComeInSysCount("fLGuide");
        r_FairyLandGuide.FairyLandGuide.finishStep(4);
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("还没有选完材料");
    }
  };
  _ctor.prototype.beginToForging = function (e) {
    var t = this;
    if (e) {
      r_SoundMgr.SoundMgr.playSound("forge/datie");
      r_FairyLandAdviceUI.FairyLandAdviceUI.showUI({
        closeCallback: function () {
          r_PlayerData.PlayerData.deleteStone("锻造", r_WeaponSystem.WeaponSystem.GetFairySet("forgeCost"), r_ReportSystem.SystemKey.武器开炼);
          r_WpForgeUI.WpForgeUI.showUI({
            info: e
          });
          r_WeaponSystem.WeaponSystem.LoseRecipe([t.selectRecList[0].id, t.selectRecList[1].id, t.selectRecList[2].id]);
          t.RecClose();
        },
        videoCallback: function () {
          r_PlayerData.PlayerData.deleteStone("锻造", r_WeaponSystem.WeaponSystem.GetFairySet("forgeCost"), r_ReportSystem.SystemKey.武器开炼);
          r_WeaponSystem.WeaponSystem.LoseRecipe([t.selectRecList[0].id, t.selectRecList[1].id, t.selectRecList[2].id]);
          t.RecClose();
          r_WpForgeUI.WpForgeUI.showUI({
            info: e,
            begin: 3
          });
        }
      });
    } else {
      cc.warn("逗我呢，找不到合成的目标武器？");
    }
  };
  _ctor.prototype.strongBtnCanShowRedTip = function () {
    for (var e in r_PlayerData.PlayerData.data.weapon.weapons) {
      var t = r_PlayerData.PlayerData.data.weapon.weapons[e].sLevel || 0;
      var o = r_WeaponSystem.WeaponSystem.GetWeaponStrongInfo(t + 1);
      if (o && r_PlayerData.PlayerData.isStoneEnough(o.cost)) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.drawBtnCanShowRedTip = function () {
    var e = r_WeaponSystem.WeaponSystem.GetWpRecPool(1);
    var t = e.cost;
    e.count;
    e.type;
    e.weight;
    e.desc;
    var o = e.drawTime;
    e.drawCool;
    return !!(r_PlayerData.PlayerData.data.draw[1].use < o && r_PlayerData.PlayerData.isStoneEnough(t));
  };
  _ctor.prototype.washBtnCanShowRedTip = function () {
    if (r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) >= 1) {
      for (var e in r_PlayerData.PlayerData.data.weapon.weapons) {
        r_PlayerData.PlayerData.data.weapon.weapons[e];
        var t = r_WeaponSystem.WeaponSystem.GetWeaponInfo(Number(e));
        if (1 != r_CommonFunc.GetLR(t.bornAtk).length) {
          var o = Number(r_WeaponSystem.WeaponSystem.GetFairySet("washCost")) || 0;
          var i = r_jsbi.default.BigInt(o);
          if (r_PlayerData.PlayerData.isStoneEnough(i)) {
            return true;
          }
        }
      }
    }
    return false;
  };
  _ctor.prototype.updateBtnRedTip = function () {
    if (this.strongBtnCanShowRedTip()) {
      this.btnStrong.getChild("redTip").visible = true;
    } else {
      this.btnStrong.getChild("redTip").visible = false;
    }
    if (this.drawBtnCanShowRedTip()) {
      this.btnDraw.getChild("redTip").visible = true;
    } else {
      this.btnDraw.getChild("redTip").visible = false;
    }
    if (this.washBtnCanShowRedTip()) {
      this.btnWash.getChild("redTip").visible = true;
    } else {
      this.btnWash.getChild("redTip").visible = false;
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("iconJz")], _ctor.prototype, "iconJz", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconLabel")], _ctor.prototype, "iconLabel", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconShow")], _ctor.prototype, "iconShow", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnForge")], _ctor.prototype, "btnForge", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStrong")], _ctor.prototype, "btnStrong", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnWash")], _ctor.prototype, "btnWash", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBB")], _ctor.prototype, "btnBB", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRank")], _ctor.prototype, "btnRank", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDraw")], _ctor.prototype, "btnDraw", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRecClose")], _ctor.prototype, "btnRecClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRecBegin")], _ctor.prototype, "btnRecBegin", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBook")], _ctor.prototype, "btnBook", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list1")], _ctor.prototype, "list1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list2")], _ctor.prototype, "list2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("finger")], _ctor.prototype, "finger", undefined);
  __decorate([r_DecorateFunction1.AutoFind("guideArea")], _ctor.prototype, "guideArea", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyLandShopUI = exp_FairyLandShopUI;