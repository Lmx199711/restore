var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerUI = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_TowerSystem = require("TowerSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_FairyLandUI = require("FairyLandUI");
var r_WpForgeResUI = require("WpForgeResUI");
var r_DialogueUI = require("DialogueUI");
var r_TowerBookUI = require("TowerBookUI");
var r_TowerBossUI = require("TowerBossUI");
var r_TowerWaitUI = require("TowerWaitUI");
var exp_TowerUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Tower, r_UIDef.UIDef.Res.UI.TowerUI) || this;
    t.uiType = "fullScreen";
    t.towerList = [];
    return t;
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
    this.show(r_UIDef.UIDef.Urls.UI.TowerUI, e, t);
    this.checkMainTask();
  };
  _ctor.checkMainTask = function () {};
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TowerUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.hide, this);
    this.btnGM.onClick(this.onClickGM, this);
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.list.numItems = 1;
    this.list.scrollItemToViewOnClick = false;
    this.list.scrollPane.scrollBottom(false);
    this.list.on(fgui.Event.SCROLL, this.onScroll, this);
    this.fightCom.getChild("btnChange").onClick(this.onClickChangeWeapon, this);
    r_ResSystem.ResSystem.loadBundleRes("bdWeaponForge", "tower/yun", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.contentPane.getChild("yun").node.addChild(i);
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.updateTowers();
    this.updateWeapon();
    r_PlayerData.PlayerData.addSystemUIShowCount(r_ReportSystem.SystemKey.爬塔);
    var o = r_WeaponSystem.WeaponSystem.GetFairySet("version_tower");
    o && (r_PlayerData.PlayerData.data.fairy.version_tower = o);
    this.btnGM.visible = !r_Index.Platform.isMiniPlatform();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_FairyLandUI.FairyLandUI.Inst && r_FairyLandUI.FairyLandUI.Inst.showTowerJuQing();
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = 83 + 323 * r_TowerSystem.TowerSystem.maxNum;
    t.height = o;
    this.towerList = [];
    for (var i = 0; i < r_TowerSystem.TowerSystem.maxNum; i++) {
      var n = fgui.UIPackage.createObjectFromURL("ui://Tower/tower").asCom;
      t.addChild(n);
      n.x = 379;
      n.y = o - 83 - 323 * i;
      this.towerList.push(n);
      this.registTouch(i + 1, n);
    }
  };
  _ctor.prototype.onScroll = function () {
    var e = this.list.scrollPane.scrollingPosY;
    var t = Math.ceil(e / 323);
    if (t < 2) {
      this.showTipHeadCom(false);
    } else {
      this.showTipHeadCom(true);
    }
    console.log("  onScrollEnd  ", t);
  };
  _ctor.prototype.registTouch = function (e, t) {
    t.clearClick();
    t.onClick(function () {
      console.log("点击塔:", e);
      r_SoundMgr.SoundMgr.playSound("click");
      if (e == r_TowerSystem.TowerSystem.maxNum) {
        r_TowerWaitUI.TowerWaitUI.showUI();
      } else if (e <= r_TowerSystem.TowerSystem.getCurTower()) {
        r_TowerBossUI.TowerBossUI.showUI({
          index: e
        });
      } else {
        r_UtilsSystem.UtilsSystem.showTip("挑战成功前面的楼层解锁");
      }
    }, this);
  };
  _ctor.prototype.updateTowers = function () {
    var e = r_TowerSystem.TowerSystem.getCurTower();
    for (var t = 1; t <= this.towerList.length; t++) {
      var o = this.towerList[t - 1];
      o.getChild("num").text = t + "";
      if (t == r_TowerSystem.TowerSystem.maxNum) {
        o.getController("open").selectedIndex = 2;
      } else {
        o.getController("open").selectedIndex = t < e ? 0 : t == e ? 1 : 2;
      }
      var i = r_TowerSystem.TowerSystem.getTowerCfg(t);
      if (17 == t) {
        if (r_PlayerData.PlayerData.data.towerMap.curTower < r_TowerSystem.TowerSystem.maxNum) {
          i.desc && (o.getChild("qipao").getChild("content").asTextField.text = i.desc);
          o.getController("desc").selectedIndex = 1;
        } else {
          o.getController("desc").selectedIndex = 0;
        }
      }
    }
  };
  _ctor.prototype.updateWeapon = function () {
    var e = r_TowerSystem.TowerSystem.getCurWeapon();
    if (e) {
      var t = r_WeaponSystem.WeaponSystem.GetWeaponInfo(e);
      var o = r_WeaponSystem.WeaponSystem.GetMyWeapon(t.id);
      this.fightCom.getController("equip").selectedIndex = 1;
      r_ResSystem.ResSystem.loadBundleFguiImg(this.fightCom.getChild("icon"), "bdWeaponForge", "weapon/big/" + t.name);
      var i = 0;
      null != o.nowAtk && (i = 10 * r_WeaponSystem.WeaponSystem.GetAtk(t.id) + 50 * o.nowCrit + 50 * o.nowFack);
      this.fightCom.getChild("lbFight").text = Math.floor(i) + "";
    } else {
      this.fightCom.getController("equip").selectedIndex = 0;
      this.fightCom.getChild("icon").icon = "";
    }
  };
  _ctor.prototype.onClickChangeWeapon = function () {
    r_TowerBookUI.TowerBookUI.showUI();
  };
  _ctor.prototype.showTipHeadCom = function (e) {
    undefined === e && (e = true);
    this.tipHeadCom.visible = e;
    e && this.contentPane.getTransition("t0").play(null, -1);
    r_PlayerData.PlayerData.data.towerMap.curTower >= r_TowerSystem.TowerSystem.maxNum && (this.tipHeadCom.visible = false);
  };
  _ctor.prototype.onClickGM = function () {
    if (r_PlayerData.PlayerData.data.towerMap.curTower < r_TowerSystem.TowerSystem.maxNum) {
      r_PlayerData.PlayerData.data.towerMap.curTower = r_PlayerData.PlayerData.data.towerMap.curTower + 1;
      r_UtilsSystem.UtilsSystem.showTip("通过 " + r_PlayerData.PlayerData.data.towerMap.curTower);
      this.updateTowers();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("已通过所有关卡");
    }
  };
  _ctor.prototype.showDefeatLevel17Reward = function () {
    if (r_PlayerData.PlayerData.data.towerMap.curTower == r_TowerSystem.TowerSystem.maxNum && r_PlayerData.PlayerData.getComeInSysCount("defeat17") < 1) {
      this.updateTowers();
      r_PlayerData.PlayerData.setComeInSysCount("defeat17");
      r_TimeSystem.TimeSystem.scheduleOnce("DialogueUI", .3, function () {
        r_DialogueUI.DialogueUI.showUI({
          id: 101,
          closeback: function () {
            r_WeaponSystem.WeaponSystem.GainWeapon(1201, false);
            r_WpForgeResUI.WpForgeResUI.showUI({
              id: 1201,
              playSpine: true
            });
          }
        });
      });
    }
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("fightCom")], _ctor.prototype, "fightCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("tipHeadCom")], _ctor.prototype, "tipHeadCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGM")], _ctor.prototype, "btnGM", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.TowerUI = exp_TowerUI;