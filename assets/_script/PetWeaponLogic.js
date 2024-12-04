Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetWeaponLogic = undefined;
var r_PetCfg = require("PetCfg");
var r_PetCommon = require("PetCommon");
var exp_PetWeaponLogic = function () {
  function _ctor() {}
  _ctor.getWeaponLogic = function (e) {
    return this.weaponLogics[e];
  };
  _ctor.getWeaponDamage = function (e, t, o, n) {
    var a = this.getWeaponAttack(e, t);
    if (n == r_PetCfg.AttackType.投掷) {
      a += this.getDexterityAttack(o.getDexterity());
    } else {
      a += this.getBodyAttack(o.getStrength());
    }
    return a;
  };
  _ctor.getWeaponAttack = function (e, t) {
    var o = r_PetCfg.PetWeaponCfgs.find(function (t) {
      return t.id == e;
    }).levelValues[t];
    return r_PetCommon.PetCommon.randomInt(o[0], o[1]);
  };
  _ctor.getBodyAttack = function (e) {
    return r_PetCommon.PetCommon.randomFloat(.5, 1.5) * e;
  };
  _ctor.getDexterityAttack = function (e) {
    return r_PetCommon.PetCommon.randomFloat(.5, 1.5) * e;
  };
  _ctor.weaponLogics = {
    1: {
      damage: function (t, o, i, n) {
        return _ctor.getWeaponDamage(1, t, o, n);
      },
      changeTargetTurn: function (e) {
        var t = r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 1 == e.id;
        }).levelValues[e];
        if (Math.random() < t[2]) {
          return -1;
        } else {
          return 0;
        }
      }
    },
    2: {
      damage: function (t, o, i, n) {
        return _ctor.getWeaponDamage(2, t, o, n);
      },
      changeTurn: function (e) {
        var t = r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 2 == e.id;
        }).levelValues[e];
        if (Math.random() < t[2]) {
          return -1;
        } else {
          return 0;
        }
      }
    },
    3: {
      damage: function (t, o, i, n) {
        var a = _ctor.getWeaponDamage(3, t, o, n);
        t >= 5 && (a *= 2);
        return a;
      },
      changeTargetTurn: function (e) {
        var t = r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 3 == e.id;
        }).levelValues[e];
        if (Math.random() < t[3]) {
          return -1;
        } else {
          return 0;
        }
      },
      dodgeAttack: function (e) {
        var t = r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 3 == e.id;
        }).levelValues[e];
        if (Math.random() < t[2]) {
          return true;
        }
      }
    },
    11: {
      damage: function (t, o, n, a) {
        var s = _ctor.getWeaponDamage(11, t, o, a);
        o.baseInfo.type == n.baseInfo.type && (s *= 1 + r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 11 == e.id;
        }).levelValues[t][2]);
        return s;
      },
      addAttackCount: function (e) {
        if (e >= 5 && Math.random() < .2) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    14: {
      damage: function (t, o, i, n) {
        return _ctor.getWeaponDamage(14, t, o, n);
      },
      changeTargetTurn: function (e) {
        var t = r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 14 == e.id;
        }).levelValues[e];
        if (Math.random() < t[3]) {
          return -1;
        } else {
          return 0;
        }
      },
      dodgeAttack: function (e) {
        var t = r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 14 == e.id;
        }).levelValues[e];
        if (Math.random() < t[2]) {
          return true;
        }
      }
    },
    19: {
      damage: function (t, o, n, a) {
        var s = _ctor.getWeaponDamage(19, t, o, a) + o.getLevel();
        var r = r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 19 == e.id;
        }).levelValues[t];
        return s + o.getLevel() * r[3];
      },
      changeTargetTurn: function (e) {
        if (e >= 5) {
          return -1;
        } else {
          return 0;
        }
      }
    },
    20: {
      damage: function (t, o, i, n) {
        var a = _ctor.getWeaponDamage(20, t, o, n);
        t >= 5 && (a *= 2 - i.getHp() / i.getMaxHp());
        return a;
      },
      hitRate: function () {
        return 1;
      }
    },
    21: {
      damage: function (t, o, i, n) {
        return _ctor.getWeaponDamage(21, t, o, n);
      },
      dodgeAttack: function (e) {
        var t = r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 21 == e.id;
        }).levelValues[e];
        if (Math.random() < t[2]) {
          return true;
        }
      },
      addAttackCount: function (e) {
        var t = r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 21 == e.id;
        }).levelValues[e];
        if (Math.random() < t[3]) {
          return 1;
        } else {
          return 0;
        }
      },
      ignoreLastHp: function () {
        return true;
      }
    },
    26: {
      damage: function (t, o, i, n) {
        return _ctor.getWeaponDamage(26, t, o, n);
      },
      buff: function (e, t, o) {
        var n = r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 26 == e.id;
        }).levelValues[e];
        var a = {};
        a.type = r_PetCfg.BuffType.伤害率;
        a.val = -n[2];
        a.turnCount = n[3];
        a.turnType = 0;
        o.buffs.push(a);
        return a;
      }
    },
    29: {
      damage: function (t, o, i, n) {
        var a = _ctor.getWeaponDamage(29, t, o, n);
        if (o.getDexterity() > i.getDexterity()) {
          if (4 == t) {
            a *= 1.1;
          } else {
            5 == t && (a *= 1.3);
          }
        }
        return a;
      },
      hitRate: function () {
        return 1;
      },
      addAttackCount: function () {
        return 1;
      }
    },
    31: {
      damage: function (t, o, i, n) {
        return _ctor.getWeaponDamage(31, t, o, n);
      },
      addAttackCount: function (e) {
        if (e < 5) {
          return 1;
        } else {
          return 0;
        }
      },
      ignoreLastHp: function () {
        return true;
      },
      kill: function (e) {
        if (e >= 5 && Math.random() < .1) {
          return true;
        }
      }
    },
    32: {
      damage: function (t, o, i, n) {
        return _ctor.getWeaponDamage(32, t, o, n);
      },
      hitRate: function (e) {
        return -r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 32 == e.id;
        }).levelValues[e][2];
      },
      addAttackCount: function (e) {
        return r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 32 == e.id;
        }).levelValues[e][3] - 1;
      }
    },
    33: {
      damage: function (t, o, n, a) {
        var s = _ctor.getWeaponDamage(33, t, o, a);
        o.getHp() / o.getMaxHp() < .3 && (s *= 1 + r_PetCfg.PetWeaponCfgs.find(function (e) {
          return 33 == e.id;
        }).levelValues[t][2]);
        return s;
      },
      addAttackCount: function () {
        return 1;
      }
    }
  };
  return _ctor;
}();
exports.PetWeaponLogic = exp_PetWeaponLogic;