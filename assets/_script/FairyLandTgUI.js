var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyLandTgUI = undefined;
var s;
var r_Index = require("Index");
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var r_UtilsSystem = require("UtilsSystem");
var r_FairyLandEvent = require("FairyLandEvent");
var r_ReportSystem = require("ReportSystem");
var r_BehaviorMgr = require("BehaviorMgr");
(function (e) {
  e[e.Enter = 0] = "Enter";
  e[e.ActiveAnim = 1] = "ActiveAnim";
  e[e.Clean = 2] = "Clean";
  e[e.Show = 3] = "Show";
  e[e.Finish = 4] = "Finish";
})(s || (s = {}));
var b = s.Enter;
var exp_FairyLandTgUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLandTg, r_UIDef.UIDef.Res.UI.TgForge) || this;
    t.uiType = "fullScreen";
    t.hasInit = false;
    t.loadPrefab = null;
    t.luziNode = null;
    t.luziSpine = null;
    t.firstTime = false;
    t.needHandleGm = false;
    t.curTgItem = null;
    t.isBookItem = false;
    t.canActive = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.initAll();
    var t = r_WeaponSystem.WeaponSystem.GetFairySet("version_tg");
    t && (r_PlayerData.PlayerData.data.fairy.version_tg = t);
  };
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FairyLandTgUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyLandTgUI);
    r_TimeSystem.TimeSystem.scheduleClear(r_FairyLandEvent.FairylandEvent.TgAvoidDoubleClick);
    r_TimeSystem.TimeSystem.scheduleClear(r_FairyLandEvent.FairylandEvent.TgAnim);
    r_TimeSystem.TimeSystem.scheduleClear(r_FairyLandEvent.FairylandEvent.TgAnimWait);
    r_TimeSystem.TimeSystem.scheduleClear(r_FairyLandEvent.FairylandEvent.TgRefreshAgain);
  };
  _ctor.prototype.clickBack = function () {
    b != s.ActiveAnim && this.hide();
  };
  _ctor.prototype.onHide = function () {
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.finishCarThing, this.finishCleanThing, this);
    this.clearPanelData();
    cc.Tween.stopAllByTarget(this.iconWp);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(function () {
      return t.clickBack();
    });
    this.btnActive.onClick(function () {
      t.clickActive();
    });
    this.btnAdActive.onClick(function () {
      t.clickActive();
    });
    this.btnZhuanMai.onClick(this.clickZhuanMai.bind(this), this);
    this.btnRight.onClick(this.clickRight.bind(this), this);
    this.stateContr = this.contentPane.getController("state");
    this.rareContr = this.contentPane.getController("isRare");
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tgForge/luzi", cc.Prefab, function (e, o) {
      t.luziNode = cc.instantiate(o);
      t.luziNode.parent = t.luzi.node;
      t.luziSpine = t.luziNode.getComponent(sp.Skeleton);
      t.luziSpine.setAnimation(0, "daiji", true);
      t.hasInit = true;
    });
  };
  _ctor.prototype.initAll = function () {
    var e = this;
    if (r_Index.Platform.isMiniPlatform()) {
      this.inputGm.visible = false;
      this.needHandleGm = false;
    } else {
      this.inputGm.visible = true;
      this.needHandleGm = true;
    }
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tgForge/tc", cc.Prefab, function (t, o) {
      e.loadPrefab = cc.instantiate(o);
      e.loadPrefab.parent = e.hang.node;
      e.hasInit = true;
    });
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.finishCarThing, this.finishCleanThing, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.finishCarThing, this.finishCleanThing, this);
    if (r_PlayerData.PlayerData.data.tgForge && r_PlayerData.PlayerData.data.tgForge.doneFirst) {
      this.firstTime = false;
    } else {
      this.firstTime = true;
    }
    b = s.Enter;
    this.refreshScene();
  };
  _ctor.prototype.clickActive = function () {
    var e = this;
    if (this.canActive) {
      this.canActive = false;
      r_TimeSystem.TimeSystem.schedule(r_FairyLandEvent.FairylandEvent.TgAvoidDoubleClick, .2, function () {
        return e.canActive = true;
      }, 200);
      if ("" == this.inputGm.text) {
        this.inputGm.visible = false;
        if (!this.curTgItem) {
          var t = 0;
          var o = r_WeaponSystem.WeaponSystem.TgTable;
          if (this.firstTime) {
            r_PlayerData.PlayerData.data.tgForge = {};
            r_PlayerData.PlayerData.data.tgForge.doneFirst = true;
            r_PlayerData.PlayerData.saveData();
            o = r_WeaponSystem.WeaponSystem.GetRarelyTgList();
            t = Math.floor(Math.random() * o.length);
          } else {
            t = r_WeaponSystem.WeaponSystem.GetRandomTg();
          }
          this.curTgItem = o[t];
        }
        if (r_WeaponSystem.WeaponSystem.GetWeaponInfo(this.curTgItem.name)) {
          this.isBookItem = true;
        } else {
          this.isBookItem = false;
        }
        this.btnRight.icon = this.isBookItem ? "ui://FairyLandTg/激活神器" : "ui://FairyLandTg/双倍转卖";
        this.iconWp.alpha = 0;
        r_ResSystem.ResSystem.loadBundleFguiImg(this.iconWp, "bdWeaponForge", "tgForge/tgWeapon/" + this.curTgItem.name);
        if (this.curTgItem.scale) {
          this.iconWp.scaleX = Number(this.curTgItem.scale) || 1;
          this.iconWp.scaleY = Number(this.curTgItem.scale) || 1;
        } else {
          this.iconWp.scaleX = 1;
          this.iconWp.scaleY = 1;
        }
        this.iconWp.rotation = this.curTgItem.rotate || 0;
        if (this.firstTime) {
          b = s.ActiveAnim;
          this.refreshScene();
        } else {
          r_PlatformSystem.PlatformSystem.showVideo("天工熔炼", function () {
            b = s.ActiveAnim;
            e.refreshScene();
          });
        }
      } else {
        var i = r_WeaponSystem.WeaponSystem.GetTgInfo(Number(this.inputGm.text));
        if (i) {
          this.curTgItem = i;
          r_UtilsSystem.UtilsSystem.showTip("输入有效:" + this.curTgItem.name);
          this.inputGm.text = "";
          this.inputGm.visible = false;
        } else {
          r_UtilsSystem.UtilsSystem.showTip("不存在该武器!!");
        }
      }
    }
  };
  _ctor.prototype.clickZhuanMai = function () {
    r_PlayerData.PlayerData.addStone("天工熔炼", this.curTgItem.price, r_ReportSystem.SystemKey.天工神兵);
    b = s.Finish;
    this.refreshScene();
  };
  _ctor.prototype.clickRight = function () {
    var e = this;
    if (this.isBookItem) {
      r_PlatformSystem.PlatformSystem.showVideo("天工收入图鉴", function () {
        r_WeaponSystem.WeaponSystem.GainWeapon(r_WeaponSystem.WeaponSystem.GetWeaponInfo(e.curTgItem.name).id);
        r_UtilsSystem.UtilsSystem.showTip("已成功收入，前往兵器铺可查看");
        b = s.Finish;
        e.refreshScene();
      });
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("天工双倍卖出", function () {
        r_PlayerData.PlayerData.addStone("天工熔炼", 2 * e.curTgItem.price, r_ReportSystem.SystemKey.天工神兵);
        b = s.Finish;
        e.refreshScene();
      });
    }
  };
  _ctor.prototype.refreshScene = function () {
    var e;
    var t;
    var o = this;
    switch (b) {
      case s.Enter:
        this.stateContr.selectedIndex = 0;
        if (this.firstTime) {
          this.btnActive.visible = true;
          this.btnAdActive.visible = false;
        } else {
          this.btnActive.visible = false;
          this.btnAdActive.visible = true;
        }
        break;
      case s.ActiveAnim:
        this.stateContr.selectedIndex = 1;
        this.luziSpine.setAnimation(0, "ranshao", true);
        r_TimeSystem.TimeSystem.scheduleOnce(r_FairyLandEvent.FairylandEvent.TgAnim, 2, function () {
          cc.log("动画结束");
          o.luziSpine.setAnimation(0, "jieshu", false);
        });
        r_TimeSystem.TimeSystem.scheduleOnce(r_FairyLandEvent.FairylandEvent.TgAnimWait, 3, function () {
          b = s.Clean;
          o.refreshScene();
        });
        break;
      case s.Clean:
        this.stateContr.selectedIndex = 2;
        r_BehaviorMgr.BehaviorMgr.trigger("扫把进场");
        r_BehaviorMgr.BehaviorMgr.trigger("showSlag");
        r_BehaviorMgr.BehaviorMgr.trigger("resetMask");
        cc.tween(this.iconWp).delay(1).to(.1, {
          alpha: 255
        }).start();
        break;
      case s.Show:
        this.stateContr.selectedIndex = 3;
        cc.tween(this.iconWp).to(.2, {
          alpha: 255
        }).start();
        this.txtDesc.text = null === (e = this.curTgItem) || undefined === e ? undefined : e.desc;
        this.txtName.text = null === (t = this.curTgItem) || undefined === t ? undefined : t.name;
        this.btnZhuanMai.getChild("txtPrice").text = this.curTgItem.price + "";
        if (this.isBookItem) {
          this.rareContr.selectedIndex = 1;
        } else {
          this.rareContr.selectedIndex = 0;
        }
        break;
      case s.Finish:
        this.revertAll();
        this.stateContr.selectedIndex = 4;
    }
  };
  _ctor.prototype.revertAll = function () {
    var e = this;
    this.clearPanelData();
    r_TimeSystem.TimeSystem.scheduleOnce(r_FairyLandEvent.FairylandEvent.TgRefreshAgain, .5, function () {
      return e.initAll();
    });
  };
  _ctor.prototype.clearPanelData = function () {
    this.inputGm.text = "";
    this.btnActive.visible = false;
    this.btnAdActive.visible = false;
    this.iconWp.alpha = 0;
    if (this.loadPrefab) {
      cc.log("--clear");
      this.loadPrefab.destroy();
      this.loadPrefab = null;
    }
    this.curTgItem = null;
  };
  _ctor.prototype.finishCleanThing = function () {
    var e = this;
    var t = null;
    if (this.curTgItem.showAnim) {
      r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", this.curTgItem.showAnim, cc.Prefab, function (o, i) {
        (t = cc.instantiate(i)).active = false;
        t.name = "hhh";
        t.parent = e.loadPrefab;
        t.x = 0;
        t.y = 0;
        cc.tween(e.iconWp).to(.2, {
          alpha: 0
        }).start();
        r_TimeSystem.TimeSystem.scheduleClear("loadOverToShow");
        r_TimeSystem.TimeSystem.scheduleOnce("loadOverToShow", .5, function () {
          if (t && cc.isValid(t)) {
            var o = t.getComponent(sp.Skeleton);
            t.active = true;
            o.setCompleteListener(function () {
              b = s.Show;
              e.refreshScene();
              t.destroy();
            });
            o.setAnimation(0, "animation", false);
          }
        });
      });
    } else {
      b = s.Show;
      this.refreshScene();
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnActive")], _ctor.prototype, "btnActive", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAdActive")], _ctor.prototype, "btnAdActive", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnZhuanMai")], _ctor.prototype, "btnZhuanMai", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRight")], _ctor.prototype, "btnRight", undefined);
  __decorate([r_DecorateFunction1.AutoFind("inputGm")], _ctor.prototype, "inputGm", undefined);
  __decorate([r_DecorateFunction1.AutoFind("hang")], _ctor.prototype, "hang", undefined);
  __decorate([r_DecorateFunction1.AutoFind("luzi")], _ctor.prototype, "luzi", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconWp")], _ctor.prototype, "iconWp", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtName")], _ctor.prototype, "txtName", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyLandTgUI = exp_FairyLandTgUI;