var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HuntUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_ResSystem = require("ResSystem");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var r_HuntLogic = require("HuntLogic");
var r_HuntLimitUI = require("HuntLimitUI");
var r_TimeSystem = require("TimeSystem");
var r_MainUI = require("MainUI");
var b = {
  arrowCount: 10,
  videoAdd: 10,
  pay: 2e6,
  rewardMoneyList: [0, 5e5, 1e6, 3e6, 5e6, 1e7, 2e7],
  targetSpeed: 5,
  arrawSpeed: 20,
  bulletSpeed: 20,
  hp: 2,
  langSpeed: [3, 4, 5],
  tuziSpeed: 4,
  dayPlay: 1
};
var exp_HuntUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Hunt, r_UIDef.UIDef.Res.UI.HuntUI) || this;
    t.m_Init = false;
    t.m_rewardItemList = [];
    t.m_curWeaponType = 1;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HuntUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HuntUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
    this.btnPlay.onClick(this.onClickPlay, this);
    this.btnFree.onClick(this.onClickFree, this);
    for (var o = 0; o < 6; o++) {
      this.m_rewardItemList[o] = this.contentPane.getChild("rewardItem" + (o + 1));
      this.m_rewardItemList[o].getChild("lbCount").text = "x" + (o + 1);
      this.m_rewardItemList[o].getChild("lbMoney").text = r_UtilsSystem.UtilsSystem.numFormats(b.rewardMoneyList[o + 1]);
    }
    r_ResSystem.ResSystem.loadBundleRes("game5", "hunt/美女", cc.Prefab, function (e, o) {
      if (o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.role.node.addChild(i);
        i.getComponent(sp.Skeleton).setAnimation(0, "idle_2", true);
      }
    });
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.m_controller = this.contentPane.getController("c1");
    this.m_controller.selectedIndex = 0;
    this.m_curWeaponType = 1;
    this.m_Init = false;
    r_SoundMgr.SoundMgr.playMusic("hunt/猎场BGM");
    r_ResSystem.ResSystem.loadBundleRes("game5", "hunt/huntGame", cc.Prefab, function (e, o) {
      return __awaiter(t, undefined, undefined, function () {
        return __generator(this, function () {
          if (o) {
            r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
            this.prefab && this.prefab.destroy();
            this.prefab = cc.instantiate(o);
            this.contentPane.getChild("center").node.addChild(this.prefab);
            this.gameLogic = this.prefab.getComponent(r_HuntLogic.default);
            this.m_Init = true;
          }
          return [2];
        });
      });
    });
    if (r_PlayerData.PlayerData.data.huntMap.playTime && r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.huntMap.playTime)) {
      r_PlayerData.PlayerData.data.huntMap.playTime = 0;
      r_PlayerData.PlayerData.data.huntMap.dayPlay = 0;
      r_PlayerData.PlayerData.saveData();
    }
    this.updateDayPlayLabel();
    r_PlayerData.PlayerData.data.huntMap.unlock || r_TimeSystem.TimeSystem.scheduleOnce("huntLimit", .1, function () {
      r_HuntLimitUI.HuntLimitUI.showUI();
    });
    r_SoundMgr.SoundMgr.playSound("hunt/你也是来狩猎的吗");
  };
  _ctor.prototype.updateDayPlayLabel = function () {
    this.lbCount.text = "每日（" + r_PlayerData.PlayerData.data.huntMap.dayPlay + "/" + b.dayPlay + "）";
    if (r_PlayerData.PlayerData.data.huntMap.dayPlay >= b.dayPlay) {
      this.btnPlay.enabled = false;
    } else {
      this.btnPlay.enabled = true;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    _ref__ctor.Inst = false;
    r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.VillageScene && r_MainUI.MainUI.Inst.VillageScene.refreshBtn();
  };
  _ctor.prototype.onClickBack = function () {
    var e = this;
    if (1 == this.m_controller.selectedIndex) {
      this.m_controller.selectedIndex = 0;
      if (this.prefab) {
        this.prefab.destroy();
        this.prefab = null;
      }
      this.m_Init = false;
      r_ResSystem.ResSystem.loadBundleRes("game5", "hunt/huntGame", cc.Prefab, function (t, o) {
        return __awaiter(e, undefined, undefined, function () {
          return __generator(this, function () {
            if (o) {
              r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
              this.prefab && this.prefab.destroy();
              this.prefab = cc.instantiate(o);
              this.contentPane.getChild("center").node.addChild(this.prefab);
              this.gameLogic = this.prefab.getComponent(r_HuntLogic.default);
              this.m_Init = true;
            }
            return [2];
          });
        });
      });
    } else {
      this.hide();
    }
  };
  _ctor.prototype.onClickPlay = function () {
    if (this.m_Init) {
      if (r_PlayerData.PlayerData.isCoinEnough(b.pay)) {
        r_PlayerData.PlayerData.data.huntMap.playTime || (r_PlayerData.PlayerData.data.huntMap.playTime = r_TimeSystem.TimeSystem.getServerTime());
        r_PlayerData.PlayerData.data.huntMap.dayPlay += 1;
        this.updateDayPlayLabel();
        r_PlayerData.PlayerData.deleteCoin("狩猎", b.pay);
        this.m_curWeaponType = 1;
        this.m_controller.selectedIndex = 1;
        this.gameLogic.startGame(this.m_curWeaponType, b);
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    }
  };
  _ctor.prototype.onClickFree = function () {
    var e = this;
    this.m_Init && r_PlatformSystem.PlatformSystem.showVideo("狩猎免费开始", function () {
      e.m_curWeaponType = 2;
      e.m_controller.selectedIndex = 1;
      e.gameLogic.startGame(e.m_curWeaponType, b);
    });
  };
  _ctor.prototype.continueGame = function () {
    this.gameLogic.continueGame();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnPlay")], _ctor.prototype, "btnPlay", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFree")], _ctor.prototype, "btnFree", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbCount")], _ctor.prototype, "lbCount", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.HuntUI = exp_HuntUI;