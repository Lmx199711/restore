Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tb = exports._Tb = undefined;
var r_ResSystem = require("ResSystem");
var exp__Tb = function () {
  function _ctor() {
    this.GameSet = null;
    this.FairyEvent = null;
    this.EggDialog = null;
    this.WeaponWash = null;
    this.WpPetFruit = null;
    this.PhoneCar = null;
  }
  _ctor.prototype.Init = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/GameSet", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("GameSet:error");
      } else {
        e.GameSet = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/FairyEvent", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("FairyEvent:error");
      } else {
        e.FairyEvent = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/EggDialog", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("EggDialog:error");
      } else {
        e.EggDialog = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/WeaponWash", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("WeaponWash:error");
      } else {
        e.WeaponWash = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/WpPetFruit", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("WpPetFruit:error");
      } else {
        e.WpPetFruit = o.json;
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "Json/All/PhoneCar", cc.JsonAsset, function (t, o) {
      if (t) {
        cc.log("PhoneCar:error");
      } else {
        e.PhoneCar = o.json;
      }
    });
  };
  _ctor.prototype.GetGameSet = function (e) {
    return this.GameSet.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.GetFairyEvent = function (e) {
    return this.FairyEvent.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.GetEggDialog = function (e) {
    return this.EggDialog.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.GetWeaponWash = function (e) {
    return this.WeaponWash.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.GetWpPetFruit = function (e) {
    return this.WpPetFruit.find(function (t) {
      return t.id == e;
    });
  };
  return _ctor;
}();
exports._Tb = exp__Tb;
exports.Tb = new exp__Tb();