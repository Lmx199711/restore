var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerResultUI = undefined;
var r_Tb = require("Tb");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_TowerSystem = require("TowerSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_TowerFightUI = require("TowerFightUI");
var r_TowerUI = require("TowerUI");
var exp_TowerResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Tower, r_UIDef.UIDef.Res.UI.TowerResultUI) || this;
    t.clicking = false;
    t.report = "爬塔获得所有奖励";
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
    this.show(r_UIDef.UIDef.Urls.UI.TowerResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TowerResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
    this.btnGet.onClick(this.onClickGet, this);
    this.btnJump.onClick(this.onClickJump, this);
    this.btnAgain.onClick(this.onClickAgain, this);
    this.iconClick.onClick(this.onClickIcon, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.data.report && (this.report = this.data.report);
    if (this.data.isWin) {
      var t = r_TowerSystem.TowerSystem.getDropCfg(this.data.towerCfg.drop);
      var o = [];
      for (var i = 0; i < t.items.length; i++) {
        o.push(t.items[i].rate);
      }
      var n = r_UtilsSystem.UtilsSystem.getWeight(o);
      var a = t.items[n];
      if (2 == a.type) {
        r_ResSystem.ResSystem.loadBundleFguiImg(this.itemIcon, "bdWeaponForge", "mat/small/灵石");
        this.content.text = "恭喜获得" + a.num + "个灵石";
        r_PlayerData.PlayerData.addStone("爬塔掉落", a.num, r_ReportSystem.SystemKey.爬塔);
      } else {
        var s = r_WeaponSystem.WeaponSystem.GetRecipeInfo(a.id);
        r_WeaponSystem.WeaponSystem.GetRecipe(a.id, a.num);
        this.content.text = "恭喜获得" + a.num + "个" + s.name;
        r_ResSystem.ResSystem.loadBundleFguiImg(this.itemIcon, "bdWeaponForge", "mat/small/" + s.name);
      }
      if (this.data.leftOpenNum) {
        this.contentPane.getController("mode").selectedIndex = 0;
      } else {
        this.contentPane.getController("mode").selectedIndex = 2;
      }
    } else {
      this.contentPane.getController("mode").selectedIndex = 1;
      r_SoundMgr.SoundMgr.playSound("tower/失败弹窗");
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickIcon = function () {
    var e = this;
    if (this.clicking) {
      r_TimeSystem.TimeSystem.scheduleClear("doubleClickOO");
      this.clicking = false;
      var t = r_Tb.Tb.FairyEvent.filter(function (t) {
        return 2 == t.time && Number(t.condition) == e.data.level;
      });
      if (t && t.length > 0) {
        var o = r_WeaponSystem.WeaponSystem.findEvent(t);
        var i = o.isFind;
        var n = o.info;
        if (i) {
          this.hide();
          r_TowerFightUI.TowerFightUI.hide();
          r_WeaponSystem.WeaponSystem.showEvent(n);
        }
      }
    } else {
      this.clicking = true;
      r_TimeSystem.TimeSystem.scheduleOnce("doubleClickOO", .5, function () {
        return e.clicking = false;
      });
    }
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
    r_TowerFightUI.TowerFightUI.hide();
    this.data.noFromTower || r_TowerUI.TowerUI.showUI();
    17 == this.data.towerCfg.id && r_TowerUI.TowerUI.Inst && r_TowerUI.TowerUI.Inst.showDefeatLevel17Reward();
  };
  _ctor.prototype.onClickGet = function () {
    var e = this;
    if (this.data.noFromTower) {
      r_TowerFightUI.TowerFightUI.hide();
      r_PlatformSystem.PlatformSystem.showVideo(this.report, function () {
        e.hide();
      });
    } else {
      r_PlatformSystem.PlatformSystem.showVideo(this.report, function () {
        e.hide();
      });
    }
  };
  _ctor.prototype.onClickJump = function () {
    this.hide();
    r_TowerFightUI.TowerFightUI.hide();
    this.data.noFromTower || r_TowerUI.TowerUI.showUI();
  };
  _ctor.prototype.onClickAgain = function () {
    this.hide();
    r_TowerFightUI.TowerFightUI.restart();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnJump")], _ctor.prototype, "btnJump", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("content")], _ctor.prototype, "content", undefined);
  __decorate([r_DecorateFunction1.AutoFind("itemIcon")], _ctor.prototype, "itemIcon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconClick")], _ctor.prototype, "iconClick", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.TowerResultUI = exp_TowerResultUI;