var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WoodenPeopleUI = undefined;
var r_UIDef = require("UIDef");
var r_DebugSystem = require("DebugSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_PreloadSystem = require("PreloadSystem");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SoundMgr = require("SoundMgr");
var r_WoodenPeopleLogic = require("WoodenPeopleLogic");
var exp_WoodenPeopleUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.WoodenPeople, r_UIDef.UIDef.Res.UI.WoodenPeopleUI) || this;
    t.prefab = null;
    t.gameLogic = null;
    t.isGameing = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    var o = this;
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.WoodenPeople
    }, function () {
      r_ResSystem.ResSystem.loadBundleRes("game1", "woodenPeople/woodenPeople", cc.Prefab, function () {
        r_UtilsSystem.UtilsSystem.showLoading(false);
        o.show(r_UIDef.UIDef.Urls.UI.WoodenPeopleUI, e, t);
      });
    });
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WoodenPeopleUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickBack, this);
    this.btnStart.onClick(this.onClickStart, this);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    this.checkInit();
    r_SoundMgr.SoundMgr.stopMusic();
    this.diamondCom.visible = false;
    this.coinCom.visible = false;
    _ctor.Inst = this;
    if (r_PlayerData.PlayerData.data.woodenPeopleMap.isFirst) {
      this.btnStart.getController("video").selectedIndex = 0;
    } else {
      this.btnStart.getController("video").selectedIndex = 1;
    }
    this.contentPane.getController("c1").selectedIndex = 0;
    this.isGameing = true;
    r_ResSystem.ResSystem.loadBundleRes("game1", "woodenPeople/woodenPeople", cc.Prefab, function (e, t) {
      return __awaiter(o, undefined, undefined, function () {
        return __generator(this, function (e) {
          switch (e.label) {
            case 0:
              if (t) {
                r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, t);
                this.prefab && this.prefab.destroy();
                this.prefab = cc.instantiate(t);
                this.contentPane.getChild("center").node.addChild(this.prefab);
                this.gameLogic = this.prefab.getComponent(r_WoodenPeopleLogic.default);
                return [4, this.gameLogic.loadPreload()];
              } else {
                return [3, 2];
              }
            case 1:
              e.sent();
              e.label = 2;
            case 2:
              return [2];
          }
        });
      });
    });
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
  };
  _ctor.prototype.checkInit = function () {
    if (!r_PlayerData.PlayerData.data.woodenPeopleMap) {
      r_PlayerData.PlayerData.data.woodenPeopleMap = {};
      r_PlayerData.PlayerData.data.woodenPeopleMap.isFirst = 0;
      r_PlayerData.PlayerData.data.woodenPeopleMap.isGuide = 0;
      r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan = 0;
      r_PlayerData.PlayerData.data.woodenPeopleMap.getNick = 0;
    }
    r_PlayerData.PlayerData.data.woodenPeopleMap.isFirst || (r_PlayerData.PlayerData.data.woodenPeopleMap.isFirst = 0);
    r_PlayerData.PlayerData.data.woodenPeopleMap.isGuide || (r_PlayerData.PlayerData.data.woodenPeopleMap.isGuide = 0);
    r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan || (r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan = 0);
    r_PlayerData.PlayerData.data.woodenPeopleMap.getNick || (r_PlayerData.PlayerData.data.woodenPeopleMap.getNick = 0);
    if (r_PlatformSystem.PlatformSystem.getIsWebPlatform() && r_DebugSystem.DebugSystem.woodenPeopleType == r_DebugSystem.DebugTypeWoodenPeople.chongzhi) {
      r_PlayerData.PlayerData.data.woodenPeopleMap.getNick = 0;
      r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan = 0;
      r_DebugSystem.DebugSystem.woodenPeopleType = r_DebugSystem.DebugTypeWoodenPeople.normal;
    }
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_TimeSystem.TimeSystem.unregistSecondUpdate("xigua_CountDwon");
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    _ctor.Inst = null;
  };
  _ctor.prototype.onClickStart = function () {
    var e = this;
    if (1 == this.btnStart.getController("video").selectedIndex) {
      this.contentPane.getController("c1").selectedIndex = 1;
      this.gameLogic && this.gameLogic.startGame();
      this.btnStart.getController("video").selectedIndex = 0;
      r_PlayerData.PlayerData.data.woodenPeopleMap.isFirst = 1;
      r_PlayerData.PlayerData.saveData();
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("热梗合集开始游戏", function () {
        e.contentPane.getController("c1").selectedIndex = 1;
        e.gameLogic && e.gameLogic.startGame();
      });
    }
  };
  _ctor.prototype.againStartGame = function () {
    var e = this;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    r_ResSystem.ResSystem.loadBundleRes("game1", "woodenPeople/woodenPeople", cc.Prefab, function (t, o) {
      return __awaiter(e, undefined, undefined, function () {
        var e = this;
        return __generator(this, function (t) {
          switch (t.label) {
            case 0:
              if (o) {
                r_FguiResSystem.FguiResSystem.addAutoReleaseRes(this, o);
                this.prefab && this.prefab.destroy();
                this.prefab = cc.instantiate(o);
                this.contentPane.getChild("center").node.addChild(this.prefab);
                this.gameLogic = this.prefab.getComponent(r_WoodenPeopleLogic.default);
                return [4, this.gameLogic.loadPreload()];
              } else {
                return [3, 2];
              }
            case 1:
              t.sent();
              this.gameLogic && setTimeout(function () {
                e.gameLogic.startGame();
              }, 200);
              t.label = 2;
            case 2:
              return [2];
          }
        });
      });
    });
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.showBackVisible = function (e) {
    undefined === e && (e = true);
    this.diamondCom.visible = false;
    this.coinCom.visible = false;
    this.btnBack.visible = e;
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("coinCom")], _ctor.prototype, "coinCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("diamondCom")], _ctor.prototype, "diamondCom", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.WoodenPeopleUI = exp_WoodenPeopleUI;