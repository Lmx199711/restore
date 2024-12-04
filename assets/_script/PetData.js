Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetData = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlayerData = require("PlayerData");
var r_PetCfg = require("PetCfg");
var exp_PetData = function () {
  function _ctor() {}
  _ctor.setData = function (e, t) {
    r_PlayerData.PlayerData.data.petData[e] = t;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.getData = function (e, t) {
    if (null == r_PlayerData.PlayerData.data.petData[e]) {
      return t;
    } else {
      return r_PlayerData.PlayerData.data.petData[e];
    }
  };
  _ctor.getPetBaseInfo = function () {
    return this.getData("PetBaseInfo");
  };
  _ctor.setPetBaseInfo = function (e) {
    this.setData("PetBaseInfo", e);
  };
  _ctor.getWeaponsInfo = function () {
    return this.getData("weapons", []);
  };
  _ctor.setWeaponsInfo = function (e) {
    this.setData("weapons", e);
  };
  _ctor.getSkillsInfo = function () {
    return this.getData("skills", []);
  };
  _ctor.setSkillsInfo = function (e) {
    this.setData("skills", e);
  };
  _ctor.getBagProps = function () {
    return this.getData("BagProps", []);
  };
  _ctor.setBagProps = function (e) {
    this.setData("BagProps", e);
  };
  _ctor.addBagProp = function (t, o) {
    var i = _ctor.getBagProps();
    var n = i.find(function (e) {
      return e.id == t;
    });
    if (n) {
      n.num += o;
      n.num <= 0 && i.splice(i.indexOf(n), 1);
    } else {
      o > 0 && i.unshift({
        id: t,
        num: o
      });
    }
    _ctor.setBagProps(i);
  };
  _ctor.getBagPropNum = function (t) {
    var o = _ctor.getBagProps().find(function (e) {
      return e.id == t;
    });
    if (o) {
      return o.num;
    } else {
      return 0;
    }
  };
  _ctor.addVitality = function (t, o) {
    undefined === o && (o = false);
    var a = _ctor.getPetBaseInfo();
    if (!(o && t > 0 && (t = Math.min(t, r_PetCfg.PetGameCfg.vitalityMax - a.vitality)) <= 0)) {
      a.vitality += t;
      a.vitality < 0 && (a.vitality = 0);
      _ctor.setPetBaseInfo(a);
      r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.vitalityChange);
    }
  };
  _ctor.addEnergy = function (t) {
    var o = _ctor.getPetBaseInfo();
    o.energy += t;
    o.energy > r_PetCfg.PetGameCfg.energyMax && (o.energy = r_PetCfg.PetGameCfg.energyMax);
    _ctor.setPetBaseInfo(o);
  };
  return _ctor;
}();
exports.PetData = exp_PetData;