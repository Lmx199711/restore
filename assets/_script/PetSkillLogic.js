Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetSkillLogic = undefined;
var r_PetCfg = require("PetCfg");
var r_PetCommon = require("PetCommon");
var exp_PetSkillLogic = function () {
  function _ctor() {}
  _ctor.getSkillLogic = function (e) {
    return this.skillLogics[e];
  };
  _ctor.getSkillExtraVal = function (e, t, o) {
    var n = r_PetCfg.PetSkillCfgs.find(function (t) {
      return t.id == e;
    }).levelValues[t];
    return o * n[0] + n[1];
  };
  _ctor.skillLogics = {
    1: {
      extraHp: function (t, o) {
        return _ctor.getSkillExtraVal(1, t, o.hp);
      }
    },
    2: {
      extraDexterity: function (t, o) {
        return _ctor.getSkillExtraVal(2, t, o.dexterity);
      }
    },
    3: {
      extraStrength: function (t, o) {
        return _ctor.getSkillExtraVal(3, t, o.strength);
      }
    },
    6: {
      lastHp: function (e) {
        return r_PetCfg.PetSkillCfgs.find(function (e) {
          return 6 == e.id;
        }).levelValues[e][0];
      }
    },
    7: {
      skillHitRate: function (e) {
        return r_PetCfg.PetSkillCfgs.find(function (e) {
          return 7 == e.id;
        }).levelValues[e][0];
      }
    },
    10: {
      extraSpeed: function (t, o) {
        return _ctor.getSkillExtraVal(10, t, o.speed);
      }
    },
    23: {
      damage: function (t, o) {
        return _ctor.getSkillExtraVal(23, t, o.getStrength());
      }
    },
    25: {
      damage: function (e) {
        return r_PetCfg.PetSkillCfgs.find(function (e) {
          return 25 == e.id;
        }).levelValues[e][0];
      },
      hitRate: function () {
        return 1;
      },
      removeWeapon: function (e, t) {
        var o = r_PetCfg.PetSkillCfgs.find(function (e) {
          return 25 == e.id;
        }).levelValues[e];
        var a = t.weapons;
        for (var s = 0; s < o[1] && a.length > 0; s++) {
          t.removeOneWeapon(r_PetCommon.PetCommon.randomInt(0, a.length - 1));
        }
      }
    },
    27: {
      damage: function () {
        return 0;
      },
      addHp: function (t, o) {
        return _ctor.getSkillExtraVal(27, t, o.level);
      },
      hitRate: function () {
        return 1;
      },
      buff: function (e, t) {
        var o = r_PetCfg.PetSkillCfgs.find(function (e) {
          return 27 == e.id;
        }).levelValues[e];
        var n = {};
        n.type = r_PetCfg.BuffType.命中;
        n.val = o[2];
        n.turnCount = o[3];
        n.turnType = 0;
        t.buffs.push(n);
        return n;
      }
    },
    29: {
      damage: function (t, o) {
        return _ctor.getSkillExtraVal(29, t, o.getDexterity());
      },
      hitRate: function (e) {
        if (e >= 5) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    30: {
      damage: function () {
        return 0;
      },
      buff: function (e, t, o) {
        var n = r_PetCfg.PetSkillCfgs.find(function (e) {
          return 30 == e.id;
        }).levelValues[e];
        if (Math.random() < n[0]) {
          var a = {};
          a.type = r_PetCfg.BuffType.攻击类型;
          a.val = r_PetCfg.AttackType.投掷;
          a.turnCount = n[1];
          a.turnType = 0;
          o.buffs.push(a);
          return a;
        }
      }
    },
    34: {
      damage: function (e, t, o) {
        var n = 1.5 * t.getLevel() + 15;
        t.baseInfo.type != o.baseInfo.type && (n *= 1 + r_PetCfg.PetSkillCfgs.find(function (e) {
          return 34 == e.id;
        }).levelValues[e][0]);
        return n;
      }
    },
    35: {
      damage: function (e, t) {
        var o = r_PetCfg.PetSkillCfgs.find(function (e) {
          return 35 == e.id;
        }).levelValues[e];
        return t.getSpeed() * o[1];
      },
      addSpeed: function (e) {
        return r_PetCfg.PetSkillCfgs.find(function (e) {
          return 35 == e.id;
        }).levelValues[e][0];
      }
    }
  };
  return _ctor;
}();
exports.PetSkillLogic = exp_PetSkillLogic;