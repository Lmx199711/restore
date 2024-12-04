var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponStrongUI = undefined;
var r_Index = require("Index");
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_Tip2StateUI = require("Tip2StateUI");
var r_StoneVideoUI = require("StoneVideoUI");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_AFairyEvent = require("AFairyEvent");
var r_TYEvent = require("TYEvent");
var r_ReportSystem = require("ReportSystem");
var r_CommonEnterUI = require("CommonEnterUI");
var exp_WeaponStrongUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.PanelStrong) || this;
    t.spineNode = null;
    t.rateBuff = 0;
    t.weaponList = [];
    t.lastSelectIndex = -1;
    t.realRate = 0;
    t.canBegin = true;
    t.canBack = true;
    t.selectWpId = -1;
    t.gmResult = -1;
    t.isGmJumpLevel = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FairyLandStrongUI, e, t);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_TYEventDispatcher.TYEventDispatcher.on(r_AFairyEvent.AFairyEvent.FreshStrongUI, this.refreshAll, this, 1);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.stoneChange, this.strongBtnCanShowRedTip, this);
    r_PlayerData.PlayerData.addSystemUIShowCount(r_ReportSystem.SystemKey.武器强化);
    var o = r_WeaponSystem.WeaponSystem.GetWpPetInfo(r_PlayerData.PlayerData.data.weapon.pet[0].id).strongInfo;
    this.rateBuff = r_WeaponSystem.WeaponSystem.GetWpPetLvInfo(o).num[r_PlayerData.PlayerData.data.weapon.pet[0].lv] || 0;
    cc.log("宠物加成：" + this.rateBuff);
    this.refreshAll(1);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyLandStrongUI);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.scheduleClear("waitToShowRes");
    r_TimeSystem.TimeSystem.scheduleClear("activeBtnStrong");
    this.canBegin = true;
    r_TYEventDispatcher.TYEventDispatcher.off(r_AFairyEvent.AFairyEvent.FreshStrongUI, this.refreshAll, this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.stoneChange, this.strongBtnCanShowRedTip, this);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.listStrong.itemRenderer = this.onListRenderer.bind(this);
    this.btnBack.onClick(function () {
      t.canBack && t.hide();
    });
    this.btnStronger.onClick(function () {
      return t.beginStrong();
    });
    if (r_Index.Platform.isMiniPlatform()) {
      this.btnGmJump.clearClick();
      this.btnGm.clearClick();
      this.btnGm2.clearClick();
    } else {
      this.btnGm.onClick(function () {
        r_UtilsSystem.UtilsSystem.showTip("本次必成功");
        t.gmResult = 99;
      });
      this.btnGm2.onClick(function () {
        r_UtilsSystem.UtilsSystem.showTip("本次必失败");
        t.gmResult = 0;
      });
      this.btnGmJump.onClick(this.GmJumpLevel.bind(this));
    }
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "main/shengji", cc.Prefab, function (e, o) {
      t.spineNode = cc.instantiate(o);
      t.spineNode.active = false;
      t.spineNode.parent = t.hang.node;
      t.spineNode.x = 0;
      t.spineNode.y = 0;
    });
  };
  _ctor.prototype.refreshAll = function (e) {
    var t = this;
    undefined === e && (e = 0);
    this.weaponList = [];
    for (var o in r_PlayerData.PlayerData.data.weapon.weapons) this.weaponList.push({
      id: Number(o),
      point: r_WeaponSystem.WeaponSystem.GetWeaponPoint(o),
      level: r_PlayerData.PlayerData.data.weapon.weapons[o].sLevel || 0
    });
    this.weaponList.sort(function (e, t) {
      if (t.level == e.level) {
        return t.point - e.point;
      } else {
        return t.level - e.level;
      }
    });
    this.listStrong.numItems = this.weaponList.length;
    if (e && this.weaponList.length > 0) {
      this.setLastSelectIndex(-1);
      setTimeout(function () {
        return t.selectItem(0, t.weaponList[0].id);
      }, 100);
    } else {
      this.selectWpId > 0 && setTimeout(function () {
        return t.showStrongInfo(t.selectWpId);
      }, 100);
    }
    this.strongBtnCanShowRedTip();
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this.weaponList[e].id;
    var i = r_PlayerData.PlayerData.data.weapon.weapons[o].sLevel || 0;
    var n = Math.floor((i - 1 < 0 ? 0 : i - 1) / 5);
    t.getController("c1").selectedIndex = n > 3 ? 3 : n;
    var a = r_WeaponSystem.WeaponSystem.GetWeaponInfo(o);
    t.text = i ? a.name + "+" + i : a.name;
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "bdWeaponForge", "weapon/small/" + a.name);
    t.clearClick();
    t.onClick(this.selectItem.bind(this, e, o));
    var s = r_WeaponSystem.WeaponSystem.GetWeaponStrongInfo(i + 1);
    if (s && r_PlayerData.PlayerData.isStoneEnough(s.cost)) {
      t.getChild("redTip").visible = true;
    } else {
      t.getChild("redTip").visible = false;
    }
  };
  _ctor.prototype.setLastSelectIndex = function (e) {
    this.lastSelectIndex >= 0 && this.lastSelectIndex != e && this.lastSelectIndex < r_WeaponSystem.WeaponSystem.MyWeaponLen() && (this.listStrong.getChildAt(this.lastSelectIndex).asCom.getController("click").selectedIndex = 0);
    this.lastSelectIndex = e;
  };
  _ctor.prototype.selectItem = function (e, t) {
    this.listStrong.getChildAt(e).asCom.getController("click").selectedIndex = 1;
    this.showStrongInfo(t);
    this.setLastSelectIndex(e);
  };
  _ctor.prototype.showStrongInfo = function (e) {
    var t;
    this.selectWeapon = r_PlayerData.PlayerData.data.weapon.weapons[e];
    var o = (null === (t = this.selectWeapon) || undefined === t ? undefined : t.sLevel) || 0;
    this.nextLevelInfo = r_WeaponSystem.WeaponSystem.GetWeaponStrongInfo(o + 1);
    this.selectWpId = e;
    r_ResSystem.ResSystem.loadBundleFguiImg(this.contentPane.getChild("icon"), "bdWeaponForge", "weapon/big/" + r_WeaponSystem.WeaponSystem.GetWeaponInfo(e).name);
    this.contentPane.getChild("numCom").asCom.getChild("txtOld1").text = o;
    this.contentPane.getChild("numCom").asCom.getChild("txtOld2").text = r_WeaponSystem.WeaponSystem.GetAtk(e);
    this.contentPane.getChild("numCom").asCom.getChild("txtOld3").text = (this.selectWeapon.nowCrit || this.selectWeapon.pCrit) + "%";
    this.contentPane.getChild("numCom").asCom.getChild("txtOld4").text = (this.selectWeapon.nowFack || this.selectWeapon.pFack) + "%";
    this.txtSname.text = r_WeaponSystem.WeaponSystem.GetWeaponInfo(e).name;
    var i = Math.floor((o - 1 < 0 ? 0 : o - 1) / 5);
    this.contentPane.getController("c1").selectedIndex = i > 3 ? 3 : i;
    if (this.nextLevelInfo) {
      this.realRate = this.nextLevelInfo.succRate + this.rateBuff;
      this.realRate > 100 && (this.realRate = 100);
      this.bigCost = r_jsbi.default.BigInt(this.nextLevelInfo.cost);
      this.btnStronger.visible = true;
      this.contentPane.getChild("numCom").asCom.getChild("txtNew1").text = o + 1;
      this.contentPane.getChild("numCom").asCom.getChild("txtNew2").text = this.selectWeapon.pAtk + Math.floor(this.selectWeapon.pAtk * this.nextLevelInfo.sAtk / 100) + r_WeaponSystem.WeaponSystem.GetAtkBuff();
      this.contentPane.getChild("numCom").asCom.getChild("txtNew3").text = this.selectWeapon.pCrit + this.nextLevelInfo.sCrit + "%";
      this.contentPane.getChild("numCom").asCom.getChild("txtNew4").text = this.selectWeapon.pFack + this.nextLevelInfo.sFack + "%";
      if (r_PlayerData.PlayerData.data.weapon.strongerTime && r_PlayerData.PlayerData.data.weapon.strongerTime > 0) {
        this.contentPane.getChild("txtRate").text = "100%";
      } else {
        this.contentPane.getChild("txtRate").text = this.realRate + "%";
      }
      this.contentPane.getChild("txtPrice").text = this.nextLevelInfo.cost + "";
      this.contentPane.getController("full").selectedIndex = 0;
      this.contentPane.getChild("numCom").asCom.getController("full").selectedIndex = 0;
    } else {
      this.contentPane.getController("full").selectedIndex = 1;
      this.contentPane.getChild("numCom").asCom.getController("full").selectedIndex = 1;
    }
    this.strongBtnCanShowRedTip();
  };
  _ctor.prototype.GmJumpLevel = function () {
    this.nextLevelInfo = r_WeaponSystem.WeaponSystem.WeaponStrong[r_WeaponSystem.WeaponSystem.WeaponStrong.length - 2];
    r_UtilsSystem.UtilsSystem.showTip("下一次[等级]：" + this.nextLevelInfo.id);
    this.bigCost = r_jsbi.default.BigInt(this.nextLevelInfo.cost);
    this.gmResult = 99;
  };
  _ctor.prototype.beginStrong = function () {
    var e = this;
    if (this.canBegin) {
      var t = function () {
        r_PlayerData.PlayerData.deleteStone("武器强化", e.nextLevelInfo.cost, r_ReportSystem.SystemKey.武器强化);
        e.canBegin = false;
        e.canBack = false;
        var t = 100 * Math.random();
        e.spineNode.active = true;
        var o = e.spineNode.getComponent(sp.Skeleton);
        var i = 0;
        var n = null;
        var a = "error";
        var s = -1;
        try {
          a = r_WeaponSystem.WeaponSystem.GetWeaponInfo(e.selectWpId).name || "error";
          s = e.selectWeapon.sLevel || "0";
        } catch (d) {
          cc.warn("qianghua_click上报失败");
        }
        r_PlatformSystem.PlatformSystem.report("qianghua_click", {
          level: s,
          bingqi: a
        });
        var r = false;
        if (e.gmResult < 0) {
          cc.log("GM：未使用");
          r = t < e.realRate;
        } else {
          r = e.gmResult > 0;
        }
        if (r_PlayerData.PlayerData.data.weapon.strongerTime && r_PlayerData.PlayerData.data.weapon.strongerTime > 0) {
          r_UtilsSystem.UtilsSystem.showTip("消耗一次闪电之锤");
          r = true;
          r_PlayerData.PlayerData.data.weapon.strongerTime = r_PlayerData.PlayerData.data.weapon.strongerTime - 1;
        }
        if (r) {
          i = 1;
          n = null;
          o.setAnimation(0, "shengji", false);
          r_SoundMgr.SoundMgr.playSound("forge/succ");
          r_WeaponSystem.WeaponSystem.StrongWeapon(e.selectWpId, e.nextLevelInfo);
          var c = -1;
          try {
            c = e.nextLevelInfo.id;
          } catch (d) {
            cc.warn("qianghua_success上传失败");
          }
          r_PlatformSystem.PlatformSystem.report("qianghua_success", {
            level: c,
            bingqi: a
          });
        } else {
          i = 0;
          o.setAnimation(0, "shibai", false);
          r_SoundMgr.SoundMgr.playSound("forge/defeat");
          e.loseWeaponObj = JSON.parse(JSON.stringify(r_PlayerData.PlayerData.data.weapon.weapons[e.selectWpId]));
          var u = r_PlayerData.PlayerData.data.weapon.weapons[e.selectWpId].sLevel;
          r_WeaponSystem.WeaponSystem.LoseWeapon(e.selectWpId);
          n = function () {
            r_WeaponSystem.WeaponSystem.reparWeapon(e.selectWpId, u);
          };
        }
        e.gmResult = -1;
        r_PlayerData.PlayerData.saveData();
        r_TimeSystem.TimeSystem.scheduleOnce("waitToShowRes", 1.8, function () {
          r_Tip2StateUI.Tip2StateUI.showUI({
            result: i,
            id: e.selectWpId,
            level: e.nextLevelInfo.id,
            curLevel: r_PlayerData.PlayerData.data.weapon.weapons[e.selectWpId].sLevel,
            okCallback: n,
            closeCallback: function () {
              r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.newWeapon);
              if (r_WeaponSystem.WeaponSystem.MyWeaponLen() > 0) {
                e.refreshAll(i - 1);
              } else {
                e.hide();
              }
            }
          });
        });
        r_TimeSystem.TimeSystem.scheduleOnce("activeBtnStrong", 2, function () {
          e.activeBtn();
        });
      };
      if (r_PlayerData.PlayerData.isStoneEnough(this.nextLevelInfo.cost)) {
        t();
      } else {
        var o = r_jsbi.default.subtract(this.bigCost, r_PlayerData.PlayerData.bigStone);
        if (r_jsbi.default.GE(o, r_StoneVideoUI.StoneVideoUI.GetVideoStoneNum())) {
          cc.log("-一个视频不够啊");
          r_CommonEnterUI.CommonEnterUI.showUI({
            videoCallback: t,
            desc: "黄金门票强化武器"
          });
        } else {
          r_StoneVideoUI.StoneVideoUI.showUI();
        }
      }
    }
  };
  _ctor.prototype.activeBtn = function () {
    this.canBegin = true;
    this.canBack = true;
  };
  _ctor.prototype.strongBtnCanShowRedTip = function () {
    for (var e in r_PlayerData.PlayerData.data.weapon.weapons) {
      var t = r_PlayerData.PlayerData.data.weapon.weapons[e].sLevel || 0;
      var o = r_WeaponSystem.WeaponSystem.GetWeaponStrongInfo(t + 1);
      if (o && r_PlayerData.PlayerData.isStoneEnough(o.cost)) {
        this.btnStronger.getChild("redTip").visible = true;
        return true;
      }
    }
    this.btnStronger.getChild("redTip").visible = false;
    return false;
  };
  _ctor.data = null;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStronger")], _ctor.prototype, "btnStronger", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang")], _ctor.prototype, "hang", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtSname")], _ctor.prototype, "txtSname", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtRate")], _ctor.prototype, "txtRate", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtPrice")], _ctor.prototype, "txtPrice", undefined);
  __decorate([r_DecorateFunction1.AutoFind("listStrong")], _ctor.prototype, "listStrong", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGm")], _ctor.prototype, "btnGm", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGm2")], _ctor.prototype, "btnGm2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGmJump")], _ctor.prototype, "btnGmJump", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.WeaponStrongUI = exp_WeaponStrongUI;