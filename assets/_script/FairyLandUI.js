var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyLandUI = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_TowerSystem = require("TowerSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_TowerUI = require("TowerUI");
var r_FairyLandTgUI = require("FairyLandTgUI");
var r_FairyLandShopUI = require("FairyLandShopUI");
var r_FairyTreeUI = require("FairyTreeUI");
var r_FairyTreeCfg = require("FairyTreeCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_FairyLandGuide = require("FairyLandGuide");
var r_TimeSystem = require("TimeSystem");
var r_ResSystem = require("ResSystem");
var r_jsbi = require("jsbi");
var r_PlatformSystem = require("PlatformSystem");
var r_CommonFunc = require("CommonFunc");
var r_ReportSystem = require("ReportSystem");
var r_DialogueUI = require("DialogueUI");
var r_CommonTipUI = require("CommonTipUI");
var r_SignIn2UI = require("SignIn2UI");
var exp_FairyLandUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLand, r_UIDef.UIDef.Res.UI.FairyLandUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FairyLandUI, e, t);
    r_WeaponSystem.WeaponSystem.ClearRecipe();
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyLandUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(function () {
      return t.hide();
    });
    this.btnWeapon.onClick(this.onClickWeapon.bind(this));
    this.btnTg.onClick(this.onClickTg.bind(this));
    this.btnTree.onClick(this.onClickTree.bind(this));
    this.btnTower.onClick(this.onClickTower.bind(this));
    this.btnSignIn.onClick(this.onClickSignIn, this);
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tower/tongtianta", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.btnTower.node.addChild(i);
      t.btnTowerSpine = i.getComponent(sp.Skeleton);
      t.btnTower.node.getChildByName("anim").active = false;
      r_PlayerData.PlayerData.getComeInSysCount("fLGuide") >= 1 && t.btnTowerSpine && t.showTowerJuQing();
    });
    this.jianling1Pos = cc.v2(this.jianling1.node.x, this.jianling1.node.y);
    this.jianling2Pos = cc.v2(this.jianling2.node.x, this.jianling2.node.y);
    r_TowerSystem.TowerSystem.init();
    this.checkData();
  };
  _ctor.prototype.checkData = function () {
    r_PlayerData.PlayerData.data.weapon || (r_PlayerData.PlayerData.data.weapon = {});
    r_PlayerData.PlayerData.data.weapon.weapons || (r_PlayerData.PlayerData.data.weapon.weapons = {});
    r_PlayerData.PlayerData.data.weapon.weapons2 || (r_PlayerData.PlayerData.data.weapon.weapons2 = {});
    r_PlayerData.PlayerData.data.weapon.event || (r_PlayerData.PlayerData.data.weapon.event = {});
    r_PlayerData.PlayerData.data.weapon.pet || (r_PlayerData.PlayerData.data.weapon.pet = [{
      id: 1,
      lv: 0,
      exp: 0
    }]);
    for (var e in r_PlayerData.PlayerData.data.weapon.weapons) {
      null != r_PlayerData.PlayerData.data.weapon.weapons[e].pAtk && null == r_PlayerData.PlayerData.data.weapon.weapons[e].nowAtk && (r_PlayerData.PlayerData.data.weapon.weapons[e].nowAtk = r_PlayerData.PlayerData.data.weapon.weapons[e].pAtk);
      null != r_PlayerData.PlayerData.data.weapon.weapons[e].pCrit && null == r_PlayerData.PlayerData.data.weapon.weapons[e].nowCrit && (r_PlayerData.PlayerData.data.weapon.weapons[e].nowCrit = r_PlayerData.PlayerData.data.weapon.weapons[e].pCrit);
      null != r_PlayerData.PlayerData.data.weapon.weapons[e].pFack && null == r_PlayerData.PlayerData.data.weapon.weapons[e].nowFack && (r_PlayerData.PlayerData.data.weapon.weapons[e].nowFack = r_PlayerData.PlayerData.data.weapon.weapons[e].pFack);
    }
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.btnMax.visible = false;
    r_PlayerData.PlayerData.getComeInSysCount("fLGuide") < 1 && 2 == r_PlatformSystem.PlatformSystem.checkGetTestGroup() && r_PlayerData.PlayerData.setComeInSysCount("fLGuide");
    this.CheckVersion();
    r_WeaponSystem.WeaponSystem.checkInitDraw();
    r_TowerSystem.TowerSystem.init();
    if (this.data && this.data.opendCallback) {
      setTimeout(function () {
        o.data.opendCallback();
        o.data = null;
      }, 300);
    } else if (r_PlayerData.PlayerData.getComeInSysCount("fLGuide") < 1 && r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) < 1) {
      r_WeaponSystem.WeaponSystem.GetRecipe(1, 1);
      r_WeaponSystem.WeaponSystem.GetRecipe(2, 1);
      r_WeaponSystem.WeaponSystem.GetRecipe(3, 1);
      r_PlayerData.PlayerData.saveData();
      r_PlayerData.PlayerData.isStoneEnough(100) || r_PlayerData.PlayerData.addStone("加灵石", 100, r_ReportSystem.SystemKey.None, false);
      this.btnMax.visible = true;
      r_TimeSystem.TimeSystem.scheduleOnce("DialogueUI", .3, function () {
        r_DialogueUI.DialogueUI.showUI({
          id: 102,
          closeback: function () {
            o.btnMax.visible = false;
          }
        });
      });
    } else {
      r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) >= 1 && r_PlayerData.PlayerData.getComeInSysCount("fLGuide");
    }
    r_PlayerData.PlayerData.getComeInSysCount("fLGuide") >= 1 && this.btnTowerSpine && this.showTowerJuQing();
    this.updateBtnRedTip();
    r_TimeSystem.TimeSystem.registSecondUpdate("FairyLandupdate", this.updateBtnRedTip.bind(this));
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("fETowerSay");
    r_TimeSystem.TimeSystem.unregistSecondUpdate("FairyLandupdate");
    _ctor.Inst = null;
  };
  _ctor.prototype.onClickWeapon = function () {
    r_FairyLandGuide.FairyLandGuide.Inst && r_FairyLandGuide.FairyLandGuide.Inst.hide();
    r_FairyLandShopUI.FairyLandShopUI.showUI();
    r_TimeSystem.TimeSystem.scheduleClear("fETowerSay");
  };
  _ctor.prototype.onClickTg = function () {
    if (!r_WeaponSystem.WeaponSystem.IsTgUsable() && r_PlayerData.PlayerData.getPlayTypeUnlockedCount(r_CommonTipUI.UnlockPlayType.Tg) < r_CommonTipUI.CommonTipUI.UnlockPlayTypeMax) {
      r_CommonTipUI.CommonTipUI.showUI({
        desc: "请先去兵器铺锻造3把武器",
        unlockPlayType: r_CommonTipUI.UnlockPlayType.Tg,
        doneThing: function () {
          r_FairyLandTgUI.FairyLandTgUI.showUI();
        }
      });
    } else {
      r_TimeSystem.TimeSystem.scheduleClear("fETowerSay");
      r_FairyLandTgUI.FairyLandTgUI.showUI();
    }
  };
  _ctor.prototype.onClickTree = function () {
    if (r_WeaponSystem.WeaponSystem.isWeaponExist(1)) {
      if (r_PlayerData.PlayerData.data.fairy.tree.done >= r_FairyTreeCfg.FairyTreeSet.treeCount) {
        r_UtilsSystem.UtilsSystem.showTip("瑶池的奖励已获取");
      } else {
        r_SoundMgr.SoundMgr.playSound("click");
        r_TimeSystem.TimeSystem.scheduleClear("fETowerSay");
        r_FairyTreeUI.FairyTreeUI.showUI();
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("请先去兵器铺锻造1把武器");
    }
  };
  _ctor.prototype.onClickTower = function () {
    if (!r_TowerSystem.TowerSystem.canEnter() && r_PlayerData.PlayerData.getPlayTypeUnlockedCount(r_CommonTipUI.UnlockPlayType.Tower) < r_CommonTipUI.CommonTipUI.UnlockPlayTypeMax) {
      r_CommonTipUI.CommonTipUI.showUI({
        desc: "请先去兵器铺锻造1把武器",
        unlockPlayType: r_CommonTipUI.UnlockPlayType.Tower,
        doneThing: function () {
          r_TowerUI.TowerUI.showUI();
        }
      });
    } else {
      this.contentPane.getController("guide").selectedIndex = 0;
      this.btnTower.getChild("icon").visible = true;
      this.btnTower.node.getChildByName("anim").active = false;
      r_TimeSystem.TimeSystem.scheduleClear("fETowerSay");
      r_TowerUI.TowerUI.showUI();
    }
  };
  _ctor.prototype.CheckVersion = function () {
    var e = false;
    if (!r_PlayerData.PlayerData.data.fairy) {
      r_PlayerData.PlayerData.data.fairy = {};
      e = true;
    }
    if (!r_PlayerData.PlayerData.data.fairy.tree) {
      r_PlayerData.PlayerData.data.fairy.tree = {
        done: 0,
        rest: r_FairyTreeCfg.FairyTreeSet.max
      };
      e = true;
    }
    e && r_PlayerData.PlayerData.saveData();
    var t = 0;
    for (var o = ["tower", "tg", "shop"]; t < o.length; t++) {
      var i = o[t];
      var n = r_WeaponSystem.WeaponSystem.GetFairySet("version_" + i);
      var a = 0;
      n && (r_PlayerData.PlayerData.data.fairy["version_" + i] && r_PlayerData.PlayerData.data.fairy["version_" + i] == n || (a = 1));
      this.contentPane.getController(i).selectedIndex = a;
    }
  };
  _ctor.prototype.showTowerAnim = function (e) {
    var t = this;
    this.btnTower.node.getChildByName("anim").active = true;
    this.btnTower.getChild("icon").visible = false;
    var o = this.btnTowerSpine.setAnimation(0, "step_1", false);
    this.btnTowerSpine.setTrackCompleteListener(o, function () {
      t.btnTowerSpine.setAnimation(0, "step_2", true);
      e && e();
    });
  };
  _ctor.prototype.showTowerJuQing = function () {
    var e = this;
    if (!(r_PlatformSystem.PlatformSystem.checkGetTestGroup() && r_PlatformSystem.PlatformSystem.checkGetTestGroup() > 1)) {
      if (r_PlayerData.PlayerData.getComeInSysCount("fETowerSay") < 1) {
        this.showTowerAnim(function () {});
        this.btnMax.visible = true;
        r_TimeSystem.TimeSystem.scheduleOnce("fETowerSay", 2, function () {
          r_PlayerData.PlayerData.setComeInSysCount("fETowerSay");
          r_DialogueUI.DialogueUI.showUI({
            id: 104,
            closeback: function () {
              e.contentPane.getController("guide").selectedIndex = 1;
              e.showJianlingAnim();
              e.btnMax.visible = false;
            }
          });
        });
      } else if (r_PlayerData.PlayerData.data.towerMap.curTower != r_TowerSystem.TowerSystem.maxNum) {
        this.contentPane.getController("guide").selectedIndex = 1;
        this.showJianlingAnim();
        this.btnTower.getChild("icon").visible = false;
        this.btnTower.node.getChildByName("anim").active = true;
        this.btnTowerSpine.setAnimation(0, "step_2", true);
      }
    }
  };
  _ctor.prototype.showJianlingAnim = function () {
    if (this.jianling1Pos && cc.isValid(this.jianling1.node)) {
      cc.Tween.stopAllByTarget(this.jianling1.node);
      cc.Tween.stopAllByTarget(this.jianling2.node);
      this.jianling1.node.x = this.jianling1Pos.x;
      this.jianling1.node.y = this.jianling1Pos.y;
      cc.tween(this.jianling1.node).repeatForever(cc.tween().to(1, {
        y: this.jianling1.node.y + 30
      }).to(1, {
        y: this.jianling1.node.y
      })).start();
      this.jianling2.node.x = this.jianling2Pos.x;
      this.jianling2.node.y = this.jianling2Pos.y;
      cc.tween(this.jianling2.node).repeatForever(cc.tween().to(1, {
        y: this.jianling2.node.y + 30
      }).to(1, {
        y: this.jianling2.node.y
      })).start();
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
    var e = false;
    this.strongBtnCanShowRedTip() && (e = true);
    this.drawBtnCanShowRedTip() && (e = true);
    this.washBtnCanShowRedTip() && (e = true);
    this.btnWeapon.getChild("redTip").visible = !!e;
    this.refreshSignBtn();
  };
  _ctor.prototype.onClickSignIn = function () {
    r_SignIn2UI.SignIn2UI.showUI();
  };
  _ctor.prototype.refreshSignBtn = function () {
    var e = r_PlayerData.PlayerData.data.SignInStamp2;
    var t = Date.now();
    var o = Math.min(Math.floor((t - e) / r_SignIn2UI.SignIn2UI.onDayMilSec), 6);
    this.btnSignIn.getChild("redTip").visible = o >= r_PlayerData.PlayerData.data.curSignIndex2;
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTower")], _ctor.prototype, "btnTower", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTg")], _ctor.prototype, "btnTg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTree")], _ctor.prototype, "btnTree", undefined);
  __decorate([r_DecorateFunction1.AutoFind("jianling1")], _ctor.prototype, "jianling1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("jianling2")], _ctor.prototype, "jianling2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnWeapon")], _ctor.prototype, "btnWeapon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSign")], _ctor.prototype, "btnSignIn", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnMax")], _ctor.prototype, "btnMax", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyLandUI = exp_FairyLandUI;