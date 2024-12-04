Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponWashSystem = exports._WeaponWashSystem = exports.WashType = undefined;
var r_Tb = require("Tb");
var r_CommonFunc = require("CommonFunc");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponSystem = require("WeaponSystem");
(function (e) {
  e[e["普通洗炼"] = 1] = "普通洗炼";
  e[e["特殊洗炼"] = 2] = "特殊洗炼";
})(exports.WashType || (exports.WashType = {}));
var exp__WeaponWashSystem = function () {
  function _ctor() {}
  _ctor.prototype.FindStrategy = function (e) {
    var t = null;
    var o = r_Tb.Tb.WeaponWash.filter(function (t) {
      return t.type == e;
    });
    if (o) {
      if (1 == o.length) {
        t = o[0];
      } else {
        o = o.filter(function (e) {
          return e.weight && e.weight > 0;
        });
        var n = [];
        for (var a = 0; a < o.length; a++) {
          n.push(o[a].weight);
        }
        t = o[r_UtilsSystem.UtilsSystem.getWeight(n)];
      }
    }
    return t;
  };
  _ctor.prototype.WashWeapon = function (e, t) {
    var o = [0, 0, 0];
    var i = this.FindStrategy(t);
    var a = i.upNum;
    var s = r_CommonFunc.getRandomNumsFromArr([0, 1, 2], a);
    for (var r = 0; r < 3; r++) {
      var c = i.WpWashRange[r];
      var l = 0;
      if (s.includes(r)) {
        l = r_CommonFunc.Random1Num(c.up);
        o[r] = l;
      } else {
        l = r_CommonFunc.Random1Num(c.down);
        o[r] = -1 * l;
      }
    }
    this.ChangeWeaponBase(e, o);
  };
  _ctor.prototype.ChangeWeaponBase = function (e, t) {
    var o = r_WeaponSystem.WeaponSystem.GetWeaponInfo(e);
    var i = r_CommonFunc.GetLR(o.bornAtk);
    var s = r_CommonFunc.GetLR(o.bornCrit);
    var c = r_CommonFunc.GetLR(o.bornFack);
    var l = r_PlayerData.PlayerData.data.weapon.weapons[e];
    if (0 != t[0] && i.length > 1) {
      var u = Math.round((i[1] - i[0]) * t[0] / 100);
      0 == u && (u = r_CommonFunc.getSymbolNum(t[0]));
      var h = r_CommonFunc.clampNum(l.pAtk + u, i[0], i[1]);
      l.pAtk = h;
    }
    if (0 != t[1] && s.length > 1) {
      var p = Math.round((s[1] - s[0]) * t[1] / 100);
      0 == p && (p = r_CommonFunc.getSymbolNum(t[1]));
      var d = r_CommonFunc.clampNum(l.pCrit + p, s[0], s[1]);
      l.pCrit = d;
    }
    if (0 != t[2] && c.length > 1) {
      var y = Math.round((c[1] - c[0]) * t[2] / 100);
      0 == y && (y = r_CommonFunc.getSymbolNum(t[2]));
      var f = r_CommonFunc.clampNum(l.pFack + y, c[0], c[1]);
      l.pFack = f;
    }
    r_WeaponSystem.WeaponSystem.StrongWeaponByLevel(e, Number(l.sLevel) || 0);
  };
  return _ctor;
}();
exports._WeaponWashSystem = exp__WeaponWashSystem;
exports.WeaponWashSystem = new exp__WeaponWashSystem();