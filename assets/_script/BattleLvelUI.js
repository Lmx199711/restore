var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_GroupSystem = require("GroupSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_RoleSystem = require("RoleSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_RoleCfg = require("RoleCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_MainHomeEffect = require("MainHomeEffect");
var r_NewGuideResultUI = require("NewGuideResultUI");
var r_BattleResultUI = require("BattleResultUI");
var r_BattleUpUI = require("BattleUpUI");
var def_BattleLvelUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Battle, r_UIDef.UIDef.Res.UI.BattleLvelUI) || this;
    t.uiType = "fullScreen";
    t.rivalAnim = null;
    t.meAnim = null;
    t.mishus = [];
    t.m_meValue = 0;
    t.m_rivalValue = 0;
    t.m_loadNum = 0;
    t.m_isEnd = false;
    t.isCreateRole = false;
    t.isCreateRole1 = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "meValue", {
    set: function (e) {
      var t = e - this.m_meValue;
      this.meProTXt.getChild("labAdd").text = t > 0 ? "+" + r_UtilsSystem.UtilsSystem.numFormats(t) : "";
      this.meProTXt.getTransition("t0").play();
      this.m_meValue = e;
      this.proMe.selfValue = e;
      this.meProTXt.getChild("labValue").text = r_UtilsSystem.UtilsSystem.numFormats(e) + "/" + r_UtilsSystem.UtilsSystem.numFormats(this.proMe.maxValue);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "rivalValue", {
    set: function (e) {
      var t = e - this.m_rivalValue;
      this.rivalProTXt.getChild("labAdd").text = t > 0 ? "+" + r_UtilsSystem.UtilsSystem.numFormats(t) : "";
      this.rivalProTXt.getTransition("t0").play();
      this.m_rivalValue = e;
      this.proMe.otherValue = e;
      this.rivalProTXt.getChild("labValue").text = r_UtilsSystem.UtilsSystem.numFormats(e) + "/" + r_UtilsSystem.UtilsSystem.numFormats(this.proMe.maxValue);
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BattleLvelUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BattleLvelUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnStart, this.meTouch);
    for (var t = 1; t <= 10; t++) {
      var o = this.contentPane.getChild("mishu" + t).asLoader;
      this.mishus.push(o);
    }
    r_MainHomeEffect.MianHomeEffect.addPool(this.contentPane);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_RoleSystem.RoleSystem.isPause = true;
    this.restart();
    r_SoundMgr.SoundMgr.playMusic("battle/挑战bgm");
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_PlayerData.PlayerData.isGame = false;
    r_RoleSystem.RoleSystem.isPause = false;
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_TimeSystem.TimeSystem.scheduleClear("battleUpdate");
    r_TimeSystem.TimeSystem.scheduleClear("upLvel0");
    r_TimeSystem.TimeSystem.scheduleClear("upLvel1");
    r_TimeSystem.TimeSystem.scheduleClear("upLvel2");
  };
  _ctor.prototype.restart = function () {
    this.proMe.init();
    var e = this.getInfo();
    this.proMe.maxValue = e.upExp;
    this.contentPane.getController("c1").selectedIndex = 0;
    this.meValue = 0;
    this.rivalValue = 0;
    this.m_loadNum = 0;
    this.m_isEnd = false;
    this.btnStart.visible = false;
    this.preloadRole(r_RoleSystem.RoleSystem.getRoleLevel());
    this.preloadRival(this.data || r_RoleSystem.RoleSystem.getRoleLevel());
    this.proMe.setOtherHead(this.data || r_RoleSystem.RoleSystem.getRoleLevel());
    this.showSecret();
    this.showPendant();
  };
  _ctor.prototype.getInfo = function () {
    if (null == this.data) {
      return r_RoleSystem.RoleSystem.getCurRoleLevelInfo();
    } else {
      return r_GroupSystem.GroupSystem.getRoleCfg()[this.data];
    }
  };
  _ctor.prototype.onClickbtnStart = function () {
    this.contentPane.getController("c1").selectedIndex = 1;
    this.refreshAutoTouch();
    r_TimeSystem.TimeSystem.schedule("battleUpdate", 1, this.onUpdateTime.bind(this));
    this.rivalAnim.setAnimation(0, "gz", true);
  };
  _ctor.prototype.onClickmeTouch = function () {
    if (!this.m_isEnd) {
      this.meAnim.setAnimation(0, "gz", r_RoleSystem.RoleSystem.getExpNum(r_RoleSystem.ExpType.自动) > 0);
      this.meValue = r_RoleSystem.RoleSystem.getExpNum(r_RoleSystem.ExpType.点击) + this.m_meValue;
      r_MainHomeEffect.MianHomeEffect.playAddExpAnim2("+" + r_RoleSystem.RoleSystem.getExpNum(r_RoleSystem.ExpType.点击), cc.v2(this.me.x, this.me.y - 100));
      if (-1 != this.checkReulst()) {
        if (1 == this.checkReulst()) {
          this.win();
        } else {
          this.lose();
        }
      }
    }
  };
  _ctor.prototype.preloadRole = function (e) {
    var t = this;
    if (!this.isCreateRole) {
      this.isCreateRole = true;
      r_ResSystem.ResSystem.loadBundleRes("game2", "mainHome/role/role" + e, cc.Prefab, function (o, i) {
        t.isCreateRole = false;
        if (o) {
          console.error("加载失败: ", o);
        } else {
          var n = cc.instantiate(i);
          t.me.node && t.me.node.destroyAllChildren();
          t.me.node.addChild(n);
          n.scale = 7 == e ? .5 : .7;
          n.name = "role";
          t.meAnim = n.getComponent(sp.Skeleton);
          t.meAnim.setAnimation(0, "dj", true);
          t.meAnim.setCompleteListener(t.onRoleAnimComplete.bind(t));
          t.m_loadNum++;
          t.m_loadNum >= 2 && (t.btnStart.visible = true);
        }
      });
    }
  };
  _ctor.prototype.showSecret = function () {
    var e = this;
    var t = r_SecretUpSystem.SecretUpSystem.getSecretBattleList();
    this.mishus.forEach(function (e) {
      e.node && e.node.destroyAllChildren();
    });
    t.forEach(function (t, o) {
      return __awaiter(e, undefined, undefined, function () {
        var e;
        var i;
        var n;
        return __generator(this, function (a) {
          switch (a.label) {
            case 0:
              e = this.mishus[o];
              return [4, this.loadMishu(t.id)];
            case 1:
              if ((i = a.sent()) && e) {
                (n = cc.instantiate(i)).name = "mishu";
                e.node.addChild(n);
                n.getComponent(sp.Skeleton).setAnimation(0, "idel" + r_SecretUpSystem.SecretUpSystem.getSkinId(t.id), true);
                n.scale = .3;
                return [2];
              } else {
                return [2];
              }
          }
        });
      });
    });
  };
  _ctor.prototype.showPendant = function () {
    var e = this;
    if (r_RoleSystem.RoleSystem.hasPendant()) {
      var t = r_RoleSystem.RoleSystem.getPendantId();
      var o = r_RoleCfg.PendantCfg[t];
      o && r_ResSystem.ResSystem.loadBundleRes("game2", "mainHome/pendant/pendant" + o.id, cc.Prefab, function (t, o) {
        if (t) {
          console.error("加载失败: ", t);
        } else {
          e.pendant.node.destroyAllChildren();
          var i = cc.instantiate(o);
          e.pendant.node.addChild(i);
          i.active = true;
          e.pendantAnim = i.getComponent(sp.Skeleton);
          e.pendantAnim.setAnimation(0, "animation", true);
        }
      });
    }
  };
  _ctor.prototype.refreshPendant = function () {
    if (r_RoleSystem.RoleSystem.hasPendant() && this.pendantAnim) {
      var e = cc.v2(this.pendant.x, this.pendant.y - 100);
      var t = r_RoleSystem.RoleSystem.getPendantExpOnce() * r_RoleSystem.RoleSystem.getEarnInfo().coeff;
      this.meValue = t + this.m_meValue;
      r_MainHomeEffect.MianHomeEffect.playAutoAddExpAnim2("+" + t, e);
    }
  };
  _ctor.prototype.loadMishu = function (e) {
    return new Promise(function (t) {
      r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + e, cc.Prefab, function (e, o) {
        if (e) {
          console.error("加载失败: ", e);
          t(null);
        }
        t(o);
      });
    });
  };
  _ctor.prototype.preloadRival = function (e) {
    var t = this;
    if (!this.isCreateRole1) {
      this.isCreateRole1 = true;
      r_ResSystem.ResSystem.loadBundleRes("game2", "mainHome/rival/rival" + e, cc.Prefab, function (o, i) {
        t.isCreateRole1 = false;
        if (o) {
          console.error("加载失败: ", o);
        } else {
          var n = cc.instantiate(i);
          t.rival.node && t.rival.node.destroyAllChildren();
          n.scale = 7 == e ? .5 : .7;
          n.name = "rival";
          t.rival.node.addChild(n);
          t.rivalAnim = n.getComponent(sp.Skeleton);
          t.rivalAnim.setAnimation(0, "dj", true);
          t.m_loadNum++;
          t.m_loadNum >= 2 && (t.btnStart.visible = true);
        }
      });
    }
  };
  _ctor.prototype.onRoleAnimComplete = function () {
    "gz" == this.meAnim.animation && r_RoleSystem.RoleSystem.getAutoExpNum() <= 0 && this.meAnim.setAnimation(0, "dj", true);
  };
  _ctor.prototype.onUpdateTime = function () {
    this.refreshAutoTouch();
    this.mishuAddExp();
    this.refreshPendant();
    if (-1 != this.checkReulst()) {
      if (1 == this.checkReulst()) {
        this.win();
      } else {
        this.lose();
      }
    }
  };
  _ctor.prototype.checkReulst = function () {
    if (this.proMe.selfValue >= this.proMe.maxValue) {
      return 1;
    } else if (this.proMe.otherValue >= this.proMe.maxValue) {
      return 0;
    } else {
      return -1;
    }
  };
  _ctor.prototype.mishuAddExp = function () {
    var e = this;
    r_SecretUpSystem.SecretUpSystem.getSecretBattleList().forEach(function (t, o) {
      return __awaiter(e, undefined, undefined, function () {
        var e;
        var i;
        return __generator(this, function () {
          e = this.mishus[o];
          i = r_RoleSystem.RoleSystem.getSecretLevelExpById(t.id) * r_RoleSystem.RoleSystem.getEarnInfo().coeff;
          this.meValue = i + this.m_meValue;
          r_MainHomeEffect.MianHomeEffect.playAutoAddExpAnim2("+" + i, cc.v2(e.x, e.y - 80));
          return [2];
        });
      });
    });
  };
  _ctor.prototype.refreshAutoTouch = function () {
    var e = this.getInfo();
    this.rivalValue = this.m_rivalValue + e.rivalSpeed;
    r_MainHomeEffect.MianHomeEffect.playAutoAddExpAnim2("+" + e.rivalSpeed, cc.v2(this.rival.x, this.rival.y));
    if (!(r_RoleSystem.RoleSystem.getAutoExpNum() <= 0)) {
      "dj" == this.meAnim.animation && this.meAnim.setAnimation(0, "gz", true);
      this.meValue = r_RoleSystem.RoleSystem.getExpNum(r_RoleSystem.ExpType.自动) + this.m_meValue;
      r_MainHomeEffect.MianHomeEffect.playAutoAddExpAnim2("+" + r_RoleSystem.RoleSystem.getExpNum(r_RoleSystem.ExpType.自动), cc.v2(this.me.x, this.me.y - 200));
    }
  };
  _ctor.prototype.win = function () {
    var e = this;
    this.end();
    r_SoundMgr.SoundMgr.playSound("win");
    this.contentPane.getController("c1").selectedIndex = 2;
    this.imgTitle.url = "ui://MainHome/" + r_RoleSystem.RoleSystem.getTitleByLevel(r_RoleSystem.RoleSystem.getRoleLevel());
    this.winAnim.loop = false;
    this.winAnim.animationName = "animation";
    this.winAnim.playing = true;
    this.firee.visible = false;
    r_TimeSystem.TimeSystem.scheduleOnce("upLvel0", 1.5, function () {
      e.winAnim.playing = false;
      e.winAnim.loop = true;
      e.winAnim.animationName = "animation2";
      e.winAnim.playing = true;
      e.firee.visible = true;
      e.firee.loop = false;
      e.firee.animationName = "animation";
      e.firee.playing = true;
    });
    r_TimeSystem.TimeSystem.scheduleOnce("upLvel1", 2.5, function () {
      if (null == e.data) {
        r_ReportSystem.ReportSystem.reportBattleUp(r_PlayerData.PlayerData.data.battleLevel);
        r_RoleSystem.RoleSystem.upLevel();
      } else {
        99 != e.data && 999 != e.data || r_RoleSystem.RoleSystem.battleSucc();
      }
      e.imgTitle.url = "ui://MainHome/" + r_RoleSystem.RoleSystem.getTitleByLevel(r_RoleSystem.RoleSystem.getRoleLevel());
    });
    r_TimeSystem.TimeSystem.scheduleOnce("upLvel2", 3.5, function () {
      if (!(99 != e.data && 999 != e.data)) {
        e.hide();
        r_BattleUpUI.default.instace && r_BattleUpUI.default.instace.hide();
        r_NewGuideResultUI.default.showUI(0);
      }
      r_BattleResultUI.default.showUI({
        awardCompleteFun: function () {
          e.hide();
          r_BattleUpUI.default.instace && r_BattleUpUI.default.instace.hide();
        }
      });
    });
  };
  _ctor.prototype.lose = function () {
    var e = this;
    this.end();
    r_SoundMgr.SoundMgr.playSound("fail");
    this.contentPane.getController("c1").selectedIndex = 3;
    this.loseAnim.loop = false;
    this.loseAnim.animationName = "animation";
    this.loseAnim.playing = true;
    r_TimeSystem.TimeSystem.scheduleOnce("uplose", 3, function () {
      e.hide();
      r_BattleUpUI.default.instace && r_BattleUpUI.default.instace.hide();
    });
  };
  _ctor.prototype.end = function () {
    this.rivalAnim.setAnimation(0, "dj", true);
    this.meAnim.setAnimation(0, "dj", true);
    r_TimeSystem.TimeSystem.scheduleClear("battleUpdate");
    this.m_isEnd = true;
  };
  __decorate([r_DecorateFunction1.AutoFind("rival")], _ctor.prototype, "rival", undefined);
  __decorate([r_DecorateFunction1.AutoFind("me")], _ctor.prototype, "me", undefined);
  __decorate([r_DecorateFunction1.AutoFind("proMe")], _ctor.prototype, "proMe", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("meTouch")], _ctor.prototype, "meTouch", undefined);
  __decorate([r_DecorateFunction1.AutoFind("win")], _ctor.prototype, "winAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("firee")], _ctor.prototype, "firee", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgTitle")], _ctor.prototype, "imgTitle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lose")], _ctor.prototype, "loseAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("meProTXt")], _ctor.prototype, "meProTXt", undefined);
  __decorate([r_DecorateFunction1.AutoFind("rivalProTXt")], _ctor.prototype, "rivalProTXt", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pendant")], _ctor.prototype, "pendant", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BattleLvelUI;