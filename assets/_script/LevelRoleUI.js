var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelRoleUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_jsbi = require("jsbi");
var r_BusinessSystem = require("BusinessSystem");
var r_CoinSystem = require("CoinSystem");
var r_GroupSystem = require("GroupSystem");
var r_LevelRoleSystem = require("LevelRoleSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_RoleGirlSystem = require("RoleGirlSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_BusinessCfg = require("BusinessCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_GameGuideUI = require("GameGuideUI");
var r_LevelRolePropUI = require("LevelRolePropUI");
var exp_LevelRoleUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.LevelRole, r_UIDef.UIDef.Res.UI.LevelRoleUI) || this;
    t.showAnimFlag = true;
    t.clickNum = 10;
    t.curRoleIdList = [];
    t.curBusinessCfgList = [];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LevelRoleUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LevelRoleUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    var i = r_GroupSystem.GroupSystem.getLevelUpCfg();
    _ref__ctor.Inst = this;
    this.btnClose.onClick(function () {
      t.hide();
      r_GameGuideUI.default.finishStep(4);
    }, this);
    this.btnUp.onClick(function () {
      r_GameGuideUI.default.finishStep(3);
      var e = i[r_PlayerData.PlayerData.data.level];
      if (e) {
        var o = t.upLevelNum();
        var n = r_Index.Platform.isDarenPlatform() ? 100 : 1;
        if (r_PlayerData.PlayerData.isCoinEnough(e.coin)) {
          r_SoundMgr.SoundMgr.playSound("升级成功音效");
          var a = 0;
          for (var s = 0; s < o && (e = i[r_PlayerData.PlayerData.data.level]); s++) {
            r_LevelRoleSystem.LevelRoleSystem.upLevel(n);
            r_PlayerData.PlayerData.deleteCoin("升级自己", e.coin, r_ReportSystem.SystemKey.升级系统, true);
            a += Number(e.coin);
            var l = r_LevelRoleSystem.LevelRoleSystem.getTitleLevel(r_PlayerData.PlayerData.data.level);
            null != l && r_LevelRolePropUI.default.showUI({
              levelRoleId: l
            });
            r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.upgrade);
          }
          t.checkChallengeUnlock();
          console.log("sum------------->", a);
          t.refreshInfo();
          t.clickNum--;
          t.clickNum < 1 && (t.clickNum = 1);
        } else {
          r_PlatformSystem.PlatformSystem.showVideo("升级自己", function () {
            r_LevelRoleSystem.LevelRoleSystem.upLevel(n);
            r_SoundMgr.SoundMgr.playSound("升级成功音效");
            t.refreshInfo();
            r_UtilsSystem.UtilsSystem.showTip("升级成功!");
            t.checkChallengeUnlock();
            r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.upgrade);
            var e = r_LevelRoleSystem.LevelRoleSystem.getTitleLevel(r_PlayerData.PlayerData.data.level);
            null != e && r_LevelRolePropUI.default.showUI({
              levelRoleId: e
            });
          });
        }
      } else {
        t.btnUp.visible = false;
      }
    }, this);
    this.max.onClick(function () {
      r_GameGuideUI.default.finishStep(3);
    }, this);
    this.list1.setVirtual();
    this.list1.itemRenderer = this.onListRenderer1.bind(this);
    this.list2.setVirtual();
    this.list2.itemRenderer = this.onListRenderer2.bind(this);
  };
  _ctor.prototype.upLevelNum = function () {
    return 1;
  };
  _ctor.prototype.upLevelCoin = function () {
    var e = r_jsbi.default.BigInt(0);
    var t = r_GroupSystem.GroupSystem.getLevelUpCfg();
    for (var o = 0; o < this.upLevelNum(); o++) {
      var i = t[r_PlayerData.PlayerData.data.level + o];
      i && (e = r_jsbi.default.add(e, r_jsbi.default.BigInt(i.coin)));
    }
    return e;
  };
  _ctor.prototype.checkChallengeUnlock = function () {
    r_PlayerData.PlayerData.data.level;
  };
  _ctor.prototype.levelUpNum = function () {
    var e = r_GroupSystem.GroupSystem.getLevelUpCfg();
    var t = 0;
    var o = r_PlayerData.PlayerData.data.level;
    var i = r_PlayerData.PlayerData.bigCoin;
    var n = e[o];
    if (!n) {
      return 0;
    }
    for (var a = r_jsbi.default.BigInt(n.coin); r_jsbi.default.GE(i, a) && (t++, n = e[++o]);) {
      a = r_jsbi.default.add(a, r_jsbi.default.BigInt(n.coin));
    }
    return t;
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.refreshHead();
    this.clickNum = 10;
    this.curRoleIdList = [];
    for (var o in r_RoleGirlSystem.RoleGirlSystem.roleCfgMap) this.curRoleIdList.push(r_RoleGirlSystem.RoleGirlSystem.roleCfgMap[o].id);
    this.curRoleIdList.sort(function (e, t) {
      var o = 0;
      r_RoleGirlSystem.RoleGirlSystem.getSecretById(e) && (o = r_RoleGirlSystem.RoleGirlSystem.getLevel(e));
      var i = r_CoinSystem.CoinSystem.getLevelAddInfo("role", e);
      var n = 0;
      r_RoleGirlSystem.RoleGirlSystem.getSecretById(t) && (n = r_RoleGirlSystem.RoleGirlSystem.getLevel(t));
      var a = r_CoinSystem.CoinSystem.getLevelAddInfo("role", t);
      if (o < i.unlock && n >= a.unlock) {
        return 1;
      } else if (o >= i.unlock && n < a.unlock) {
        return -1;
      } else {
        return i.add - a.add;
      }
    });
    this.list1.numItems = this.curRoleIdList.length;
    this.curBusinessCfgList = [];
    for (o = 0; o < r_BusinessCfg.BusinessCfg.length; o++) {
      this.curBusinessCfgList.push(r_BusinessCfg.BusinessCfg[o]);
    }
    this.curBusinessCfgList.sort(function (e, t) {
      var o = r_BusinessSystem.BusinessSystem.isBuyBusiness(e.id);
      var i = r_BusinessSystem.BusinessSystem.isBuyBusiness(t.id);
      if (!o && i) {
        return 1;
      } else if (o && !i) {
        return -1;
      } else {
        return e.id - t.id;
      }
    });
    this.list2.numItems = this.curBusinessCfgList.length;
    this.list1.scrollToView(0);
    this.list2.scrollToView(0);
    this.refreshInfo();
    r_TimeSystem.TimeSystem.registSecondUpdate("LevelUpUI", function () {
      t.refreshInfo();
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("LevelUpUI");
  };
  _ctor.prototype.refreshInfo = function () {
    var e = r_GroupSystem.GroupSystem.getLevelUpCfg()[r_PlayerData.PlayerData.data.level + this.upLevelNum()];
    if (e) {
      this.btnUp.visible = true;
      if (r_PlayerData.PlayerData.isCoinEnough(e.coin)) {
        this.btnUp.getController("video").selectedIndex = 0;
        this.btnUp.getChild("redTip").visible = true;
      } else {
        this.btnUp.getController("video").selectedIndex = 1;
        this.btnUp.getChild("redTip").visible = false;
      }
      this.contentPane.getChild("max").visible = false;
    } else {
      this.btnUp.visible = false;
      this.contentPane.getChild("max").visible = true;
    }
    this.contentPane.getChild("lbGet").text = "当前点击收益：       " + r_UtilsSystem.UtilsSystem.getShowCoin(r_CoinSystem.CoinSystem.getClickCoin());
    this.contentPane.getChild("lbAdd1").text = 100 * r_CoinSystem.CoinSystem.getRoleAddClickRate() + "%";
    this.contentPane.getChild("lbAdd2").text = 100 * r_CoinSystem.CoinSystem.getBusinessAddClickRate() + "%";
    this.contentPane.getChild("lbLevel").text = "Lv." + r_PlayerData.PlayerData.data.level;
    this.lbPrice.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.upLevelCoin());
    this.lbName.text = r_LevelRoleSystem.LevelRoleSystem.getLevelTitle(r_PlayerData.PlayerData.data.level).name;
  };
  _ctor.prototype.onListRenderer1 = function (e, t) {
    var o = this.curRoleIdList[e];
    var i = r_RoleGirlSystem.RoleGirlSystem.getSecretById(o);
    var n = null == i ? 0 : r_RoleGirlSystem.RoleGirlSystem.getLevel(i.id);
    var a = r_RoleGirlSystem.RoleGirlSystem.getRoleCfg(o);
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game3", "secretUp/icon/icon" + o);
    t.getChild("lbName").text = a.name;
    var s = r_CoinSystem.CoinSystem.getLevelAddInfo("role", o);
    t.getChild("lbAdd").text = "+" + 100 * s.add + "%";
    if (n >= s.unlock) {
      t.getChild("icon").grayed = false;
      t.getChild("lbName").grayed = false;
      t.getChild("lbAdd").grayed = false;
      t.getChild("bg").grayed = false;
    } else {
      t.getChild("icon").grayed = true;
      t.getChild("lbName").grayed = true;
      t.getChild("lbAdd").grayed = true;
      t.getChild("bg").grayed = true;
    }
  };
  _ctor.prototype.onListRenderer2 = function (e, t) {
    var o = this.curBusinessCfgList[e];
    t.getChild("lbName").text = o.name;
    r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("icon"), "game4", "business/" + o.icon);
    var i = r_CoinSystem.CoinSystem.getLevelAddInfo("business", o.id);
    t.getChild("lbAdd").text = "+" + 100 * i.add + "%";
    if (r_BusinessSystem.BusinessSystem.isBuyBusiness(o.id)) {
      t.getChild("icon").grayed = false;
      t.getChild("lbName").grayed = false;
      t.getChild("lbAdd").grayed = false;
      t.getChild("bg").grayed = false;
    } else {
      t.getChild("icon").grayed = true;
      t.getChild("lbName").grayed = true;
      t.getChild("lbAdd").grayed = true;
      t.getChild("bg").grayed = true;
    }
  };
  _ctor.needShowRedTip = function () {
    var e = r_GroupSystem.GroupSystem.getLevelUpCfg()[r_PlayerData.PlayerData.data.level + 1];
    return !!e && !!r_PlayerData.PlayerData.isCoinEnough(e.coin);
  };
  _ctor.prototype.refreshHead = function () {
    r_ResSystem.ResSystem.loadHeadImg(this.iconBg.getChild("icon"), r_PlayerData.PlayerData.data.curHead);
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnUp")], _ctor.prototype, "btnUp", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list1")], _ctor.prototype, "list1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list2")], _ctor.prototype, "list2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconBg")], _ctor.prototype, "iconBg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbName")], _ctor.prototype, "lbName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbPrice")], _ctor.prototype, "lbPrice", undefined);
  __decorate([r_DecorateFunction1.AutoFind("max")], _ctor.prototype, "max", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.LevelRoleUI = exp_LevelRoleUI;