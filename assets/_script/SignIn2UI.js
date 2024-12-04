var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignIn2UI = undefined;
var s;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_BaseWin = require("BaseWin");
var r_WpForgeResUI = require("WpForgeResUI");
var r_SignGetUI = require("SignGetUI");
(function (e) {
  e.coin = "金钱";
  e.stone = "灵石";
  e.mat = "材料";
  e.weapon = "武器";
})(s || (s = {}));
var exp_SignIn2UI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SignIn2, r_UIDef.UIDef.Res.UI.SignIn2UI) || this;
    t.showAnimFlag = true;
    t.signCfgs = [{
      num: 2e5,
      type: s.coin,
      iconPath: "ui://" + r_UIDef.UIDef.Pack.SignIn2 + "/bigmoney",
      getDesc: "恭喜获得20万元"
    }, {
      num: 2e3,
      type: s.stone,
      iconPath: "ui://" + r_UIDef.UIDef.Pack.SignIn2 + "/bigstone",
      getDesc: "恭喜获得2000灵石"
    }, {
      num: 1,
      type: s.weapon,
      spine: "luobodao",
      rewardId: 1001,
      iconBundle: "bdWeaponForge",
      iconPath: "weapon/big/萝卜刀",
      getDesc: "恭喜获得兵器-萝卜刀"
    }, {
      num: 1e4,
      type: s.stone,
      iconPath: "ui://" + r_UIDef.UIDef.Pack.SignIn2 + "/bigstone",
      getDesc: "恭喜获得10000灵石"
    }, {
      num: 1,
      type: s.mat,
      rewardId: 3001,
      iconBundle: "bdWeaponForge",
      iconPath: "mat/big/炼仙壶",
      getDesc: "恭喜获得SR材料-炼仙壶"
    }, {
      num: 1,
      type: s.mat,
      rewardId: 16,
      iconBundle: "bdWeaponForge",
      iconPath: "mat/big/青龙真元",
      getDesc: "恭喜获得SSR材料-青龙真元"
    }, {
      num: 1,
      type: s.weapon,
      spine: "jiyanzhiren",
      rewardId: 1002,
      iconBundle: "bdWeaponForge",
      iconPath: "weapon/big/机炎之刃",
      getDesc: "恭喜烈火神兵-机炎之刃"
    }];
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
    this.show(r_UIDef.UIDef.Urls.UI.SignIn2UI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SignIn2UI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.signState = this.contentPane.getController("signState");
    if (!r_PlayerData.PlayerData.data.SignInStamp2) {
      r_PlayerData.PlayerData.data.SignInStamp2 = new Date(new Date().toDateString()).getTime();
      r_PlayerData.PlayerData.saveData();
    }
    this.btnBack.onClick(this.hide, this);
    this.list.numItems = 6;
    this.btnGet.onClick(this.onClickGet, this);
    this.btnVideoGet.onClick(this.onClickVideoGet, this);
    this.updateDesc();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.spineCom.visible = false;
    var o = r_PlayerData.PlayerData.data.SignInStamp2;
    var i = Date.now();
    this.curDayIndex = Math.min(Math.floor((i - o) / _ctor.onDayMilSec), 6);
    this.curSignIndex2 = r_PlayerData.PlayerData.data.curSignIndex2;
    console.log("time:", o, i, this.curDayIndex);
    r_Index.Platform.isMiniPlatform() || (this.curDayIndex = 6);
    this.refreshUI();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.updateDesc = function () {
    for (var e = 0; e < this.list.numChildren; e++) {
      var t = this.list.getChildAt(e).asCom;
      var o = this.signCfgs[e];
      if (o.type == s.weapon) {
        t.getChild("reward").text = r_WeaponSystem.WeaponSystem.GetWeaponInfo(o.rewardId).name + "*" + o.num;
      } else if (o.type == s.mat) {
        t.getChild("reward").text = r_WeaponSystem.WeaponSystem.GetRecipeInfo(o.rewardId).name + "*" + o.num;
      } else {
        t.getChild("reward").text = r_UtilsSystem.UtilsSystem.getShowCoin(o.num, 2, false);
      }
    }
  };
  _ctor.prototype.onClickGet = function () {
    this.signSuc(this.curSignIndex2);
  };
  _ctor.prototype.onClickVideoGet = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("签到补签_" + (this.curSignIndex2 + 1), function () {
      e.signSuc(e.curSignIndex2);
    });
  };
  _ctor.prototype.refreshUI = function () {
    for (var e = 0; e < this.list.numChildren; e++) {
      var t = this.list.getChildAt(e).asCom;
      t.getController("day").selectedIndex = e;
      var o = t.getController("state");
      var i = t.getController("select");
      if (e == this.curSignIndex2) {
        o.selectedIndex = this.curSignIndex2 <= this.curDayIndex ? 1 : 2;
        i.selectedIndex = this.curSignIndex2 <= this.curDayIndex ? 1 : 0;
      } else {
        o.selectedIndex = e > this.curSignIndex2 ? 2 : 0;
        i.selectedIndex = 0;
      }
    }
    var n = this.btnDay7.getController("state");
    var a = this.btnDay7.getController("select");
    if (this.curSignIndex2 <= 6) {
      n.selectedIndex = 1;
    } else {
      n.selectedIndex = 0;
    }
    a.selectedIndex = 6 == this.curSignIndex2 && 6 == this.curDayIndex ? 1 : 0;
    this.signState.selectedIndex = this.curSignIndex2 > this.curDayIndex ? 0 : this.curSignIndex2 == this.curDayIndex ? 2 : 1;
  };
  _ctor.prototype.signSuc = function (e) {
    var t;
    var o = this;
    var i = this.signCfgs[e];
    var n = function () {
      o.curSignIndex2 = ++r_PlayerData.PlayerData.data.curSignIndex2;
      r_PlayerData.PlayerData.saveData();
      o.refreshUI();
      r_PlatformSystem.PlatformSystem.report("sign", {
        day: e + 1
      });
    };
    t = i.type == s.weapon ? function () {
      o.showWeapinAnim(i.spine, i.rewardId, n);
      r_UtilsSystem.UtilsSystem.showTip("恭喜获得" + i.type);
    } : function () {
      if (i.type == s.mat) {
        r_WeaponSystem.WeaponSystem.GetRecipe(i.rewardId, i.num);
      } else if (i.type == s.coin) {
        r_PlayerData.PlayerData.addCoin("签到获得", i.num, r_ReportSystem.SystemKey.签到);
      } else {
        i.type == s.stone && r_PlayerData.PlayerData.addStone("签到获得", i.num, r_ReportSystem.SystemKey.签到);
      }
      r_UtilsSystem.UtilsSystem.showTip("恭喜获得" + i.type);
      n();
    };
    if (i.iconBundle) {
      r_ResSystem.ResSystem.loadBundleRes(i.iconBundle, i.iconPath, cc.SpriteFrame, function (e, o) {
        r_SignGetUI.SignGetUI.showUI({
          sprite: o,
          desc: i.getDesc,
          closeCallback: t
        });
      });
    } else {
      r_SignGetUI.SignGetUI.showUI({
        iconUrl: i.iconPath,
        desc: i.getDesc,
        closeCallback: t
      });
    }
  };
  _ctor.prototype.showWeapinAnim = function (e, t, o) {
    var i = this;
    this.spineCom.visible = true;
    this.spineLoader.node.destroyAllChildren();
    r_ResSystem.ResSystem.loadBundleRes("bundlesignin", e, cc.Prefab, function (e, n) {
      var a = cc.instantiate(n);
      var s = a.getComponent(sp.Skeleton);
      i.spineLoader.node.addChild(a);
      a.x = a.y = 0;
      s.setTrackCompleteListener(s.setAnimation(0, "animation", false), function () {
        i.spineCom.visible = false;
        r_WeaponSystem.WeaponSystem.GainWeapon(t);
        r_WpForgeResUI.WpForgeResUI.showUI({
          id: t
        });
        o && o();
      });
    });
  };
  _ctor.onDayMilSec = 864e5;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDay7")], _ctor.prototype, "btnDay7", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideoGet")], _ctor.prototype, "btnVideoGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("spineCom")], _ctor.prototype, "spineCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("spineCom/spineLoader")], _ctor.prototype, "spineLoader", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.SignIn2UI = exp_SignIn2UI;