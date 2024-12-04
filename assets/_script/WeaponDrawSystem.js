Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponDrawSystem = exports._WeaponDrawSystem = undefined;
var r_FairyLandDrawCardUI = require("FairyLandDrawCardUI");
var r_FairyLandDrawUI = require("FairyLandDrawUI");
var r_FairyLandShopUI = require("FairyLandShopUI");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_RoleSystem = require("RoleSystem");
var r_TimeSystem = require("TimeSystem");
var r_WeaponSystem = require("WeaponSystem");
var exp__WeaponDrawSystem = function () {
  function _ctor() {}
  _ctor.prototype.init = function () {};
  _ctor.prototype.drawOne = function () {
    var e = r_WeaponSystem.WeaponSystem.GetWpRecPool(1);
    var t = e.cost;
    var o = e.count;
    var i = e.type;
    e.weight;
    e.desc;
    var n = e.drawTime;
    var a = e.drawCool;
    var p = null;
    if (1 == o - r_PlayerData.PlayerData.data.draw[1].hasDefeat) {
      p = r_WeaponSystem.WeaponSystem.getRandomRecipe(i);
      r_PlayerData.PlayerData.data.draw[1].hasDefeat = 0;
    } else if ((p = this.drawFromWeight(1)).type >= i) {
      r_PlayerData.PlayerData.data.draw[1].hasDefeat = 0;
    } else {
      r_PlayerData.PlayerData.data.draw[1].hasDefeat = r_PlayerData.PlayerData.data.draw[1].hasDefeat + 1;
    }
    r_PlatformSystem.PlatformSystem.report("chouka", {
      chouka: "1",
      kapai: p.id + ""
    });
    r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.兵器, t, r_ReportSystem.SystemKey.武器系统);
    r_WeaponSystem.WeaponSystem.getRecipeOnce([p.id]);
    r_PlayerData.PlayerData.data.draw[1].use = r_PlayerData.PlayerData.data.draw[1].use + 1;
    r_PlayerData.PlayerData.data.draw[1].total = r_PlayerData.PlayerData.data.draw[1].total + 1;
    if (r_PlayerData.PlayerData.data.draw[1].use >= n) {
      cc.log("次数用光");
      r_PlayerData.PlayerData.data.draw[1].nextTime = r_TimeSystem.TimeSystem.getServerTime() + 60 * a;
    }
    r_PlayerData.PlayerData.saveData();
    return p;
  };
  _ctor.prototype.drawFromWeight = function (e) {
    var t = r_WeaponSystem.WeaponSystem.GetWpRecPool(e).weight.split(",");
    var o = [1e3, 0, 0, 0];
    var i = 0;
    for (var n = 0; n < 4; n++) {
      var a = parseInt(t[n]);
      o[n] = i + a;
      i = o[n];
    }
    var s = Math.random() * i;
    for (var r = 0; r < 4 && !(s < o[r]); r++) {
      ;
    }
    var c = r + 1;
    var l = r_WeaponSystem.WeaponSystem.getRandomRecipe(c);
    this.refreshDrawNum();
    return l;
  };
  _ctor.prototype.drawFive = function () {
    if (!r_PlayerData.PlayerData.data.isFairyDrawGuide) {
      var e = [10, 7, 4, 1001, 1002];
      r_PlayerData.PlayerData.data.isFairyDrawGuide = 1;
      r_FairyLandShopUI.FairyLandShopUI.Inst && (r_FairyLandShopUI.FairyLandShopUI.Inst.finger.visible = false);
      r_PlayerData.PlayerData.data.draw[2].hasDefeat = r_PlayerData.PlayerData.data.draw[2].hasDefeat + 1;
      r_WeaponSystem.WeaponSystem.getRecipeOnce(e);
      this.refreshDrawNum();
      return e;
    }
    var t = r_WeaponSystem.WeaponSystem.GetWpRecPool(2);
    t.cost;
    var o = t.count;
    var i = t.type;
    t.weight;
    t.desc;
    t.drawTime;
    t.drawCool;
    var n = [];
    var c = false;
    if (1 == o - r_PlayerData.PlayerData.data.draw[2].hasDefeat) {
      c = true;
      r_PlayerData.PlayerData.data.draw[2].hasDefeat = 0;
    }
    var l = false;
    for (var u = 0; u < 5; u++) {
      var p = this.drawFromWeight(2);
      if (0 == u && c || p.type >= i) {
        p = r_WeaponSystem.WeaponSystem.getRandomRecipe(i);
        l = true;
      }
      r_PlatformSystem.PlatformSystem.report("chouka", {
        chouka: "5",
        kapai: p.id + ""
      });
      n.push(p.id);
    }
    r_PlayerData.PlayerData.data.draw[2].hasDefeat = l ? 0 : r_PlayerData.PlayerData.data.draw[2].hasDefeat + 1;
    r_WeaponSystem.WeaponSystem.getRecipeOnce(n);
    this.refreshDrawNum();
    return n;
  };
  _ctor.prototype.refreshDrawNum = function () {
    r_FairyLandDrawUI.FairyLandDrawUI.Inst && r_FairyLandDrawUI.FairyLandDrawUI.Inst.refreshDrawNum();
    r_FairyLandDrawCardUI.FairyLandDrawCardUI.Inst && r_FairyLandDrawCardUI.FairyLandDrawCardUI.Inst.refreshDrawNum();
  };
  return _ctor;
}();
exports._WeaponDrawSystem = exp__WeaponDrawSystem;
exports.WeaponDrawSystem = new exp__WeaponDrawSystem();