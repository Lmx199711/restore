Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponSystem = exports._WeaponSystem = undefined;
var r_Index = require("Index");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_FairyEventChooseUI = require("FairyEventChooseUI");
var r_FairyEventGiftUI = require("FairyEventGiftUI");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponRankSystem = require("WeaponRankSystem");
var r_CommonFunc = require("CommonFunc");
var r_ResSystem = require("ResSystem");
var r_HttpSystem = require("HttpSystem");
var exp__WeaponSystem = function () {
  function _ctor() {
    this.nodeMap = {};
    this.firstFeedGold = false;
    this.WeaponList = null;
    this.Weapons = null;
    this.WpRecipe = null;
    this.FairySet = null;
    this.WpRecPool = null;
    this.TgTable = null;
    this.WeaponT = null;
    this.WpRecipeT = null;
    this.WeaponStrong = null;
    this.curWeapon = null;
    this.WpPet = null;
    this.WpPetLv = null;
  }
  _ctor.prototype.init = function () {
    this.initMainTableData();
    this.initTypeTable();
    r_PlayerData.PlayerData.data.weapon || (r_PlayerData.PlayerData.data.weapon = {});
    r_PlayerData.PlayerData.data.weapon.weapons || (r_PlayerData.PlayerData.data.weapon.weapons = {});
    r_PlayerData.PlayerData.data.weapon.recipes || (r_PlayerData.PlayerData.data.weapon.recipes = {});
    r_PlayerData.PlayerData.data.weapon.weapons2 || (r_PlayerData.PlayerData.data.weapon.weapons2 = {});
    r_PlayerData.PlayerData.data.weapon.stash || (r_PlayerData.PlayerData.data.weapon.stash = {});
  };
  _ctor.prototype.initMainTableData = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/WeaponList", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("WeaponList:error");
      } else {
        e.WeaponList = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/Weapons", cc.JsonAsset, function (t, o) {
      if (!t) {
        e.Weapons = o.json;
        e.curWeapon || (e.curWeapon = JSON.parse(JSON.stringify(e.Weapons[0])));
        e.curWeapon.name = "hhhhhh";
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/WpRecipe", cc.JsonAsset, function (t, o) {
      t || (e.WpRecipe = o.json);
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/FairySet", cc.JsonAsset, function (t, o) {
      t || (e.FairySet = o.json);
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/WpRecPool", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("pool:error");
      } else {
        e.WpRecPool = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/FairySet", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("FairySet:error");
      } else {
        e.FairySet = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/TgForge", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("TgForge:error");
      } else {
        e.TgTable = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/WeaponStrong", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("WeaponStrong:error");
      } else {
        e.WeaponStrong = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/WpPetLv", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("WpPetLv:error");
      } else {
        e.WpPetLv = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/WpPet", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("WpPet:error");
      } else {
        e.WpPet = o.json;
      }
    });
  };
  _ctor.prototype.initTypeTable = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/WeaponT", cc.JsonAsset, function (t, o) {
      t || (e.WeaponT = o.json);
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/WpRecipeT", cc.JsonAsset, function (t, o) {
      t || (e.WpRecipeT = o.json);
    });
  };
  _ctor.prototype.isDrawed = function (e) {
    return -1 != r_PlayerData.PlayerData.data.drawedList.indexOf(e);
  };
  _ctor.prototype.setDrawed = function (e) {
    this.isDrawed(e) || r_PlayerData.PlayerData.data.drawedList.push(e);
  };
  _ctor.prototype.GetWpPetInfo = function (e) {
    return this.WpPet.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.GetWpPetLvInfo = function (e) {
    return this.WpPetLv.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.GetWeaponInfoDyn = function (e) {
    var t = JSON.parse(JSON.stringify(this.GetWeaponInfo(e)));
    var o = {
      own: false,
      info: t
    };
    if (r_PlayerData.PlayerData.data.weapon.weapons) {
      var i = undefined;
      if (r_PlayerData.PlayerData.data.weapon.weapons[e]) {
        o.own = true;
        console.log("own weapon");
        i = r_PlayerData.PlayerData.data.weapon.weapons[e];
        t.bornAtk = this.GetAtk(e);
      } else if (r_PlayerData.PlayerData.data.weapon.weapons2[e]) {
        i = r_PlayerData.PlayerData.data.weapon.weapons2[e];
        t.bornAtk = this.GetAtk(e, true);
        console.log("stash weapon");
      }
      if (i) {
        t.bornCrit = i.nowCrit || i.pCrit;
        t.bornFack = i.nowFack || i.pFack;
      }
      o.info = t;
    }
    return o;
  };
  _ctor.prototype.GetWeaponInfo = function (e) {
    if ("number" == typeof e) {
      return this.WeaponList.find(function (t) {
        return t.id == e;
      });
    } else if ("string" == typeof e) {
      return this.WeaponList.find(function (t) {
        return t.name == e;
      });
    } else {
      return undefined;
    }
  };
  _ctor.prototype.GetTgInfo = function (e) {
    if ("number" == typeof e) {
      return this.TgTable.find(function (t) {
        return t.id == e;
      });
    } else if ("string" == typeof e) {
      return this.TgTable.find(function (t) {
        return t.name == e;
      });
    } else {
      return undefined;
    }
  };
  _ctor.prototype.GetWeaponForgeInfo = function (e) {
    if ("number" == typeof e) {
      return this.Weapons.find(function (t) {
        return t.id == e;
      });
    } else if ("string" == typeof e) {
      return this.Weapons.find(function (t) {
        return t.name == e;
      });
    } else {
      return undefined;
    }
  };
  _ctor.prototype.GetFairySet = function (e) {
    return this.FairySet.find(function (t) {
      return t.id == e;
    }).value;
  };
  _ctor.prototype.GetRecipeInfo = function (e) {
    return this.WpRecipe.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.GetWpRecPool = function (e) {
    return this.WpRecPool.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.GetWeaponStrongInfo = function (e) {
    return this.WeaponStrong.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.getWeaponT = function (e) {
    return this.WeaponT.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.getWpRecipeT = function (e) {
    return this.WpRecipeT.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.GetWeaponRecName = function (e) {
    var t = [];
    var o = 0;
    for (var i = this.GetWeaponForgeInfo(e).res; o < i.length; o++) {
      var n = i[o];
      t.push(this.GetRecipeInfo(n).name);
    }
    return t;
  };
  _ctor.prototype.GetRecipesLen = function () {
    var e = 0;
    if (r_PlayerData.PlayerData.data.weapon.recipes) {
      for (var t in r_PlayerData.PlayerData.data.weapon.recipes) r_PlayerData.PlayerData.data.weapon.recipes[t] > 0 && e++;
    }
    return e;
  };
  _ctor.prototype.ClearRecipe = function () {
    r_PlayerData.PlayerData.data.weapon.recipes || (r_PlayerData.PlayerData.data.weapon.recipes = {});
    var e = Object.keys(r_PlayerData.PlayerData.data.weapon.recipes);
    for (var t = e.length - 1; t >= 0; t--) {
      (!r_PlayerData.PlayerData.data.weapon.recipes[e[t]] || r_PlayerData.PlayerData.data.weapon.recipes[e[t]] <= 0) && delete r_PlayerData.PlayerData.data.weapon.recipes[e[t]];
    }
  };
  _ctor.prototype.GetAllRecipe = function () {
    var e = this;
    this.Weapons.forEach(function (t) {
      e.GetWeaponRecipe(t.id);
    });
  };
  _ctor.prototype.GetWeaponRecipe = function (e) {
    var t = this.GetWeaponForgeInfo(e).res;
    this.getRecipeOnce(t);
  };
  _ctor.prototype.LoseRecipe = function (e) {
    for (var t = 0; t < e.length; t++) {
      r_PlayerData.PlayerData.data.weapon.recipes[e[t]] = r_PlayerData.PlayerData.data.weapon.recipes[e[t]] - 1;
      (!r_PlayerData.PlayerData.data.weapon.recipes[e[t]] || r_PlayerData.PlayerData.data.weapon.recipes[e[t]] <= 0) && delete r_PlayerData.PlayerData.data.weapon.recipes[e[t]];
    }
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.GetRecipe = function (e, t) {
    r_PlayerData.PlayerData.data.weapon || (r_PlayerData.PlayerData.data.weapon = {});
    r_PlayerData.PlayerData.data.weapon.recipes || (r_PlayerData.PlayerData.data.weapon.recipes = {});
    r_PlayerData.PlayerData.data.weapon.recipes[e] || (r_PlayerData.PlayerData.data.weapon.recipes[e] = 0);
    r_PlayerData.PlayerData.data.weapon.recipes[e] = r_PlayerData.PlayerData.data.weapon.recipes[e] + t;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.getRecipeOnce = function (e) {
    for (var t = 0; t < e.length; t++) {
      if (r_PlayerData.PlayerData.data.weapon.recipes[e[t]]) {
        r_PlayerData.PlayerData.data.weapon.recipes[e[t]] = r_PlayerData.PlayerData.data.weapon.recipes[e[t]] + 1;
      } else {
        r_PlayerData.PlayerData.data.weapon.recipes[e[t]] = 1;
      }
      (!r_PlayerData.PlayerData.data.weapon.recipes[t] || r_PlayerData.PlayerData.data.weapon.recipes[t] <= 0) && delete r_PlayerData.PlayerData.data.weapon.recipes[t];
    }
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.forgeWeapon = function (e) {
    this.GainWeapon(e);
    r_PlatformSystem.PlatformSystem.report("duanzao", {
      weapon: e + ""
    });
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.newWeapon);
  };
  _ctor.prototype.GainWeapon = function (e, t) {
    undefined === t && (t = false);
    r_PlayerData.PlayerData.data.weapon.weapons || (r_PlayerData.PlayerData.data.weapon.weapons = {});
    r_PlayerData.PlayerData.data.weapon.weapons2 || (r_PlayerData.PlayerData.data.weapon.weapons2 = {});
    var o = this.WeaponList.find(function (t) {
      return t.id == e;
    });
    if (o) {
      var i = o.bornAtk;
      var n = o.bornCrit;
      var a = o.bornFack;
      var s = r_CommonFunc.Random1Num(i);
      var r = r_CommonFunc.Random1Num(n);
      var c = r_CommonFunc.Random1Num(a);
      if (t) {
        if (!r_PlayerData.PlayerData.data.weapon.weapons2[e]) {
          r_PlayerData.PlayerData.data.weapon.weapons2[e] = {
            pAtk: s,
            pCrit: r,
            pFack: c,
            nowAtk: s,
            nowCrit: r,
            nowFack: c,
            sLevel: 0,
            isNew: 1
          };
          r_PlayerData.PlayerData.data.weapon.stash[e] = 0;
        }
      } else {
        r_PlayerData.PlayerData.data.weapon.weapons[e] = {
          pAtk: s,
          pCrit: r,
          pFack: c,
          nowAtk: s,
          nowCrit: r,
          nowFack: c,
          sLevel: 0,
          isNew: 1
        };
      }
      r_PlayerData.PlayerData.saveData();
      r_WeaponRankSystem.WeaponRankSystem.UpWeapon2Rank();
      r_HttpSystem.HttpSystem.checkUpdateOrUploadData(false);
    } else {
      cc.warn("GainWeapon Error:图鉴没有id为" + e + "的武器");
    }
  };
  _ctor.prototype.GainStashWeapon = function (e) {
    r_PlayerData.PlayerData.data.weapon.weapons[e] = r_PlayerData.PlayerData.data.weapon.weapons2[e];
    delete r_PlayerData.PlayerData.data.weapon.stash[e];
    delete r_PlayerData.PlayerData.data.weapon.weapons2[e];
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.StrongWeaponByLevel = function (e, t) {
    var i = exports.WeaponSystem.GetWeaponStrongInfo(t);
    this.StrongWeapon(e, i);
  };
  _ctor.prototype.StrongWeapon = function (e, t) {
    var o = r_PlayerData.PlayerData.data.weapon.weapons[e];
    if (t) {
      o.nowAtk = o.pAtk + Math.floor(o.pAtk * t.sAtk / 100);
      o.nowCrit = o.pCrit + t.sCrit;
      o.nowFack = o.pFack + t.sFack;
      o.sLevel = t.id;
    } else {
      o.nowAtk = o.pAtk;
      o.nowCrit = o.pCrit;
      o.nowFack = o.pFack;
      o.sLevel = 0;
    }
    r_PlayerData.PlayerData.saveData();
    r_WeaponRankSystem.WeaponRankSystem.UpWeapon2Rank();
    cc.log("强化成功!" + JSON.stringify(r_PlayerData.PlayerData.data.weapon.weapons[e]));
  };
  _ctor.prototype.LoseWeapon = function (e) {
    r_PlayerData.PlayerData.data.weapon.weapons[e].sLevel = r_PlayerData.PlayerData.data.weapon.weapons[e].sLevel - 3 <= 0 ? 0 : r_PlayerData.PlayerData.data.weapon.weapons[e].sLevel - 3;
    r_WeaponRankSystem.WeaponRankSystem.DropRank();
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.reparWeapon = function (e, t) {
    r_PlayerData.PlayerData.data.weapon.weapons[e].sLevel = t;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.MyWeaponLen = function () {
    var e = 0;
    r_PlayerData.PlayerData.data.weapon && r_PlayerData.PlayerData.data.weapon.weapons && (e = r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons));
    return e;
  };
  _ctor.prototype.GetMyWeapon = function (e) {
    r_PlayerData.PlayerData.data.weapon || (r_PlayerData.PlayerData.data.weapon = {});
    r_PlayerData.PlayerData.data.weapon.weapons || (r_PlayerData.PlayerData.data.weapon.weapons = {});
    r_PlayerData.PlayerData.data.weapon.weapons2 || (r_PlayerData.PlayerData.data.weapon.weapons2 = {});
    return r_PlayerData.PlayerData.data.weapon.weapons[e];
  };
  _ctor.prototype.getTypeRecipeArr = function (e) {
    return this.WpRecipe.filter(function (t) {
      return t.type == e;
    });
  };
  _ctor.prototype.getRandomRecipe = function (e) {
    var t = this.getTypeRecipeArr(e);
    return t[Math.floor(Math.random() * t.length)];
  };
  _ctor.prototype.GetAtkBuff = function () {
    var e = exports.WeaponSystem.GetWpPetInfo(r_PlayerData.PlayerData.data.weapon.pet[0].id).atkBuffInfo;
    return exports.WeaponSystem.GetWpPetLvInfo(e).num[r_PlayerData.PlayerData.data.weapon.pet[0].lv] || 0;
  };
  _ctor.prototype.GetAtk = function (e, t) {
    undefined === t && (t = false);
    var o = r_PlayerData.PlayerData.data.weapon.weapons[e] || r_PlayerData.PlayerData.data.weapon.weapons2[e];
    return this.GetAtkBuff() + o.nowAtk || o.pAtk;
  };
  _ctor.prototype.GetWeaponPoint = function (e) {
    var t;
    var i = r_PlayerData.PlayerData.data.weapon.weapons[e] || r_PlayerData.PlayerData.data.weapon.weapons2[e];
    var n = i.pCrit;
    var a = i.pFack;
    (t = [this.GetAtk(e), i.nowCrit || n, i.nowFack || a])[0] || t[1] || t[2] || cc.warn("你的已拥有的剑数据没有带有属性???");
    return exports.WeaponSystem.GetFightPoint(t);
  };
  _ctor.prototype.GetFightPoint = function (e) {
    if (e && 0 != e.length && e[0]) {
      return 10 * e[0] + 50 * e[1] + 50 * e[2];
    } else {
      return -1;
    }
  };
  _ctor.prototype.MyHighestWeapon = function () {
    var e = {
      id: undefined,
      point: 0
    };
    if (r_PlayerData.PlayerData.data.weapon.weapons && Object.keys(r_PlayerData.PlayerData.data.weapon.weapons).length > 0) {
      var t = 0;
      var o = undefined;
      for (var i in r_PlayerData.PlayerData.data.weapon.weapons) {
        var n = r_PlayerData.PlayerData.data.weapon.weapons[i];
        var a = n.pCrit;
        var s = n.pFack;
        var r = this.GetAtk(i);
        var c = this.GetFightPoint([r, r_PlayerData.PlayerData.data.weapon.weapons[i].nowCrit || a, r_PlayerData.PlayerData.data.weapon.weapons[i].nowFack || s]);
        if (c > 0 && c > t) {
          t = Number(c) || 0;
          o = Number(i);
        }
      }
      if (o) {
        e.id = o;
        e.point = t;
      }
    }
    return e;
  };
  _ctor.prototype.LookedWeaponFactor = function (e) {
    if (r_PlayerData.PlayerData.data.weapon.lookedFactor) {
      return !!r_PlayerData.PlayerData.data.weapon.lookedFactor[e];
    } else {
      r_PlayerData.PlayerData.data.weapon.lookedFactor = {};
      return false;
    }
  };
  _ctor.prototype.LookedWeaponRecWay = function (e) {
    if (r_PlayerData.PlayerData.data.weapon.lookedRecWay) {
      return !!r_PlayerData.PlayerData.data.weapon.lookedRecWay[e];
    } else {
      r_PlayerData.PlayerData.data.weapon.lookedRecWay = {};
      return false;
    }
  };
  _ctor.prototype.checkInitDraw = function () {
    if (!(r_PlayerData.PlayerData.data.draw && 0 != Object.keys(r_PlayerData.PlayerData.data.draw).length)) {
      r_PlayerData.PlayerData.data.draw = {};
      exports.WeaponSystem.WpRecPool.forEach(function (e) {
        r_PlayerData.PlayerData.data.draw[e.id] = {
          use: 0,
          total: 0,
          nextTime: 0,
          hasDefeat: 0
        };
      });
      r_PlayerData.PlayerData.saveData();
    }
    r_PlayerData.PlayerData.data.isFairyDrawGuide || (r_PlayerData.PlayerData.data.isFairyDrawGuide = 0);
  };
  _ctor.prototype.GetRarelyTgList = function () {
    return this.TgTable.filter(function (e) {
      return e.type;
    });
  };
  _ctor.prototype.IsTgUsable = function () {
    return !!(r_PlayerData.PlayerData.data.weapon && r_PlayerData.PlayerData.data.weapon.weapons && r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) >= 3);
  };
  _ctor.prototype.isWeaponExist = function (e) {
    return !!(r_PlayerData.PlayerData.data.weapon && r_PlayerData.PlayerData.data.weapon.weapons && r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons) >= e);
  };
  _ctor.prototype.GetRandomTg = function () {
    var e = [0];
    var t = 0;
    this.TgTable.forEach(function (o) {
      if (0 == t) {
        e[t] = o.weight || 0;
      } else {
        var i = o.weight || 0;
        e.push(e[t - 1] + i);
      }
      t++;
    });
    var o = e[e.length - 1];
    var i = Math.floor(Math.random() * o);
    for (var n = 0; n < e.length && !(i < e[n]); n++) {
      ;
    }
    return n;
  };
  _ctor.prototype.findEvent = function (e) {
    var t = 0;
    var o = false;
    if (r_Index.Platform.isMiniPlatform()) {
      return {
        isFind: false,
        info: null
      };
    }
    for (; t < e.length; t++) {
      r_PlayerData.PlayerData.data.weapon.event || (r_PlayerData.PlayerData.data.weapon.event = {});
      if (!r_PlayerData.PlayerData.data.weapon.event[e[t].id] || !r_PlayerData.PlayerData.data.weapon.event[e[t].id].flag) {
        r_PlayerData.PlayerData.data.weapon.event[e[t].id] = {
          flag: true
        };
        o = true;
        break;
      }
    }
    if (t < e.length) {
      return {
        isFind: o,
        info: e[t]
      };
    } else {
      return {
        isFind: false,
        info: null
      };
    }
  };
  _ctor.prototype.showEvent = function (e, t) {
    switch (e.type) {
      case 2:
        r_FairyEventChooseUI.FairyEventChooseUI.showUI({
          info: e,
          finishCallback: t
        });
        break;
      case 3:
        r_FairyEventGiftUI.FairyEventGiftUI.showUI({
          info: e,
          finishCallback: t
        });
    }
  };
  _ctor.prototype.MyGraduateWpLen = function () {
    var e = Number(exports.WeaponSystem.WeaponStrong[exports.WeaponSystem.WeaponStrong.length - 1].id);
    var t = r_PlayerData.PlayerData.data.weapon.weapons;
    var i = 0;
    for (var n in t) {
      var a = t[n];
      a.sLevel && Number(a.sLevel) >= e && i++;
    }
    return i;
  };
  _ctor.prototype.MaxPetLv = function () {
    return this.WpPetLv[0].num.length - 1;
  };
  return _ctor;
}();
exports._WeaponSystem = exp__WeaponSystem;
exports.WeaponSystem = new exp__WeaponSystem();