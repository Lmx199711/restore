var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleGirlUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_CoinSystem = require("CoinSystem");
var r_LimitSystem = require("LimitSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_RoleGirlSystem = require("RoleGirlSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_GameGuideUI = require("GameGuideUI");
var r_RoleGirlGetUI = require("RoleGirlGetUI");
var r_RoleGirlTranUI = require("RoleGirlTranUI");
var exp_RoleGirlUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.RoleGirl, r_UIDef.UIDef.Res.UI.RoleGirlUI) || this;
    t.showAnimFlag = true;
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
    this.show(r_UIDef.UIDef.Urls.UI.RoleGirlUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RoleGirlUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(function () {
      t.hide();
    }, this);
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.bindBtnCallback(this.btnGirlUp);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.refreshList();
    r_TimeSystem.TimeSystem.registSecondUpdate("RoleUI", function () {
      t.updateSecond();
    });
    this.updateSecond();
    this.data && this.data.opendCallback && setTimeout(function () {
      t.data.opendCallback();
      t.data.opendCallback = null;
    }, 300);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    r_RoleGirlSystem.RoleGirlSystem.checkPlayNewRoleAnim();
    r_TimeSystem.TimeSystem.unregistSecondUpdate("RoleUI");
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.checkDragonBall);
  };
  _ctor.prototype.refreshList = function () {
    this.list.numItems = r_RoleGirlSystem.RoleGirlSystem.roleIdList.length;
  };
  _ctor.prototype.updateSecond = function () {
    for (var e = 0; e < this.list._children.length; e++) {
      var t = this.list._children[e];
      var o = r_RoleGirlSystem.RoleGirlSystem.roleIdList[t.index - 1];
      r_RoleGirlSystem.RoleGirlSystem.roleIdList[t.index];
      var i = r_RoleGirlSystem.RoleGirlSystem.getRoleLevel(o);
      var n = r_RoleGirlSystem.RoleGirlSystem.getRoleLevelCfg(o, i);
      if (r_RoleGirlSystem.RoleGirlSystem.getRoleLevelCfg(o, i + 1) && r_RoleGirlSystem.RoleGirlSystem.canUnlock(o)) {
        var a = t.getChild("btnBuy");
        a.getController("state").selectedIndex = r_RoleGirlSystem.RoleGirlSystem.isBuyRole(o) ? 1 : 0;
        a.getChild("cost").text = r_UtilsSystem.UtilsSystem.getShowCoin(n.coin, 1);
        a.getChild("videoCost").text = r_UtilsSystem.UtilsSystem.getShowCoin(n.coin, 1);
        a.visible = true;
        if (r_PlayerData.PlayerData.isCoinEnough(n.coin)) {
          a.getController("video").selectedIndex = 0;
          a.getChild("redTip").visible = true;
        } else {
          a.getController("video").selectedIndex = 1;
          a.getChild("redTip").visible = false;
        }
      }
    }
    this.labRoleEarn.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_CoinSystem.CoinSystem.getAllAddCoinNoDouble().roleCoin);
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this;
    t.index = e + 1;
    var i = r_RoleGirlSystem.RoleGirlSystem.roleIdList[e];
    var n = r_RoleGirlSystem.RoleGirlSystem.roleIdList[e + 1];
    r_RoleGirlSystem.RoleGirlSystem.getRoleCfg(n);
    var a = r_RoleGirlSystem.RoleGirlSystem.getRoleLevel(i);
    var s = r_RoleGirlSystem.RoleGirlSystem.getRoleLevelCfg(i, a);
    var r = r_RoleGirlSystem.RoleGirlSystem.getRoleLevelCfg(i, a + 1);
    var c = r_RoleGirlSystem.RoleGirlSystem.getRoleCfg(i);
    var l = t.getChild("icon");
    t.getChild("bg");
    t.getChild("money").text = r_UtilsSystem.UtilsSystem.getShowCoin(s.earn, 1);
    t.getChild("imgFrame").url = "ui://RoleGirl/品质" + c.quality;
    t.getChild("lv").text = a + "级";
    if (t.roleAnim) {
      t.roleAnim.destroy();
      t.roleAnim = null;
    }
    var m = t.getChild("btnBuy").asButton;
    if (a || 0 == e || r_RoleGirlSystem.RoleGirlSystem.canUnlock(i)) {
      r_ResSystem.ResSystem.loadBundleFguiImg(l, "game5", "roleGirl/icon/icon" + i);
      t.getController("mode").selectedIndex = 1;
      if (r_RoleGirlSystem.RoleGirlSystem.isBuyRole(i)) {
        t.getChild("lbName").text = c.name;
      } else {
        t.getChild("lbName").text = "???";
      }
    } else {
      r_ResSystem.ResSystem.loadBundleFguiImg(l, "game5", "roleGirl/icon/icon" + i + "_1");
      t.getController("mode").selectedIndex = 0;
      t.getChild("lbName").text = "???";
    }
    m.enabled = true;
    t.getChild("Masklevel").visible = false;
    t.getChild("labLevel").text = "";
    if (!r_LimitSystem.LimitSystem.getCheckLevelLimit(c.Limit)) {
      t.getChild("lbName").text = "???";
      r_ResSystem.ResSystem.loadBundleFguiImg(l, "game5", "roleGirl/icon/icon" + i + "_1");
      t.getChild("labLevel").text = "主角" + c.Limit + "级时解锁";
      t.getChild("Masklevel").visible = true;
      m.enabled = false;
    }
    var v = t.getChild("condition");
    v.group.visible = false;
    t.getChild("max").visible = false;
    var C = r_RoleGirlSystem.RoleGirlSystem.roleIdList[e - 1];
    var b = r_RoleGirlSystem.RoleGirlSystem.getRoleCfg(C);
    t.getChild("btnGuide").clearClick();
    t.getChild("btnGuide").onClick(function () {
      r_GameGuideUI.default.finishStep(2);
    }, this);
    m.getController("state").selectedIndex = r_RoleGirlSystem.RoleGirlSystem.isBuyRole(i) ? 1 : 0;
    m.getChild("cost").text = r_UtilsSystem.UtilsSystem.getShowCoin(s.coin, 1);
    if (r && r_RoleGirlSystem.RoleGirlSystem.canUnlock(i)) {
      m.getChild("videoCost").text = r_UtilsSystem.UtilsSystem.getShowCoin(s.coin, 1);
      if (r_PlayerData.PlayerData.isCoinEnough(s.coin)) {
        m.getController("video").selectedIndex = 0;
        m.getChild("redTip").visible = true;
      } else {
        m.getController("video").selectedIndex = 1;
        m.getChild("redTip").visible = false;
      }
    } else {
      m.visible = false;
      m.getChild("redTip").visible = false;
      r || (t.getChild("max").visible = true);
      if (!r_RoleGirlSystem.RoleGirlSystem.canUnlock(i) && b) {
        v.group.visible = true;
        v.text = b.name + "10级时解锁";
      }
    }
    if (r_RoleGirlSystem.RoleGirlSystem.checkHasRoleGirl(i)) {
      r_ResSystem.ResSystem.loadBundleFguiImg(l, "game5", "roleGirl/icon/icon" + i);
      t.getChild("lbName").text = c.name;
      m.enabled = true;
    }
    console.log("RoleGirlSystem.getRoleCfg(roleId).signin:", r_RoleGirlSystem.RoleGirlSystem.getRoleCfg(i).signin, !r_RoleGirlSystem.RoleGirlSystem.checkHasRoleGirl(i));
    if (r_RoleGirlSystem.RoleGirlSystem.getRoleCfg(i).signin && !r_RoleGirlSystem.RoleGirlSystem.checkHasRoleGirl(i)) {
      r_ResSystem.ResSystem.loadBundleFguiImg(l, "game5", "roleGirl/icon/icon" + i + "_1");
      t.getController("mode").selectedIndex = 0;
      t.getChild("labLevel").text = "签到解锁";
      t.getChild("lbName").text = "???";
      t.getChild("Masklevel").visible = true;
      m.enabled = false;
    }
    m.clearClick();
    m.onClick(function () {
      if (r_RoleGirlSystem.RoleGirlSystem.canUnlock(i)) {
        if (!r_PlayerData.PlayerData.isCoinEnough(s.coin)) {
          return void r_PlatformSystem.PlatformSystem.showVideo("升级角色", function () {
            r_RoleGirlSystem.RoleGirlSystem.isBuyRole(i) || r_RoleGirlGetUI.default.showUI({
              roleGirlId: i
            });
            r_RoleGirlSystem.RoleGirlSystem.buyRole(i);
            o.refreshList();
            r_UtilsSystem.UtilsSystem.showTip("升级成功!");
            r_GameGuideUI.default.finishStep(2);
          });
        }
        r_RoleGirlSystem.RoleGirlSystem.isBuyRole(i) || r_RoleGirlGetUI.default.showUI({
          roleGirlId: i
        });
        r_RoleGirlSystem.RoleGirlSystem.buyRole(i);
        r_PlayerData.PlayerData.deleteCoin("购买角色", s.coin, r_ReportSystem.SystemKey.雇佣系统, true);
        r_PlatformSystem.PlatformSystem.report("Secretary1", {
          result: i
        });
        r_GameGuideUI.default.finishStep(2);
        o.refreshList();
      } else {
        b && r_UtilsSystem.UtilsSystem.showTip("请先将" + b.name + "升至10级");
      }
    }, this);
    this.updateSecond();
  };
  _ctor.prototype.getItemBtn = function (e) {
    return this.list.getChildAt(e).asCom.getChild("btnBuy");
  };
  _ctor.prototype.onClickbtnGirlUp = function () {
    if (r_LimitSystem.LimitSystem.getCheckSecretLimit(r_LimitSystem.LimiSecretType.培训秘书)) {
      r_RoleGirlTranUI.default.showUI();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("拥有" + r_LimitSystem.LimiSecretType.培训秘书 + "个秘书可解锁");
    }
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labRoleEarn")], _ctor.prototype, "labRoleEarn", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGirlUp")], _ctor.prototype, "btnGirlUp", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.RoleGirlUI = exp_RoleGirlUI;