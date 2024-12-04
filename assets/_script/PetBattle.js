Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetBattle = undefined;
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_PetBattleResultUI = require("PetBattleResultUI");
var r_PetCfg = require("PetCfg");
var r_PetCommon = require("PetCommon");
var r_PetData = require("PetData");
var r_PetSkillLogic = require("PetSkillLogic");
var r_PetWeaponLogic = require("PetWeaponLogic");
var exp_PetBattle = function () {
  function _ctor() {
    this.hp = 0;
    this.maxHp = 0;
    this.strength = 0;
    this.speed = 0;
    this.dexterity = 0;
    this.damage = 0;
    this.defence = 0;
    this.isRun = true;
    this.dtime = 0;
    this.weapons = [];
    this.skills = [];
    this.petNodePosX = 0;
    this.turnCount = 0;
    this.turnStartCount = 0;
    this.isPursueAttack = false;
    this.attackCount = 0;
    this.buffs = [];
    this.lastHpVal = 0;
    this.isHealAddHp = false;
    this.extraSkillHitRate = 0;
    this.isHoldWeapon = false;
    this.attackInterval = .5;
    this.zhuangsiDelay = 0;
    this.isAttacking = false;
    this.objPool = [];
    this.objPool2 = [];
  }
  _ctor.prototype.init = function (e, t, o, s, r, c) {
    var l;
    var h = this;
    this.baseInfo = e;
    this.weapons = t;
    this.skills = o;
    this.petInfoItem = s;
    this.target = r;
    this.isPlayer = c;
    this.hp = e.hp;
    this.strength = e.strength;
    this.speed = e.speed;
    this.dexterity = e.dexterity;
    if (0 == this.petNodePosX) {
      this.petNodePosX = this.petRoot.x;
    } else {
      this.petRoot.x = this.petNodePosX;
    }
    this.showWeapons();
    this.turnCount = 0;
    this.turnStartCount = 0;
    this.lastHpVal = 0;
    this.isHealAddHp = false;
    this.isHoldWeapon = false;
    this.extraSkillHitRate = 0;
    this.isAttacking = false;
    this.zhuangsiDelay = 0;
    for (var d = 0; d < this.skills.length; d++) {
      var y = this.skills[d];
      var f = r_PetSkillLogic.PetSkillLogic.skillLogics[y.id];
      f.extraHp && (this.hp += f.extraHp(y.level, this.baseInfo));
      f.extraDexterity && (this.dexterity += f.extraDexterity(y.level, this.baseInfo));
      f.extraStrength && (this.strength += f.extraStrength(y.level, this.baseInfo));
      f.extraSpeed && (this.speed += f.extraSpeed(y.level, this.baseInfo));
      f.skillHitRate && (this.extraSkillHitRate += f.skillHitRate(y.level));
      f.lastHp && (this.lastHpVal += f.lastHp(y.level));
    }
    this.maxHp = this.hp;
    l = c ? r_PlatformSystem.PlatformSystem.getNickName() || "我" : e.nickName;
    this.petInfoItem.getChild("name").text = l + "的" + e.name;
    this.petInfoItem.getChild("level").text = e.level;
    this.petInfoItem.getChild("hpPro").asProgress.max = this.maxHp;
    this.petInfoItem.getChild("hpPro").asProgress.value = this.hp;
    this.petInfoItem.getChild("hpPro").asProgress.getController("c1").selectedIndex = c ? 0 : 1;
    this.petInfoItem.getChild("battleVal").asCom.getChild("num").text = r_PetCommon.PetCommon.getBattleVal(e, t, o) + "";
    this.isRun = true;
    if (this.petNode && this.petNode.name == this.baseInfo.prefab) {
      this.idle("default");
    } else {
      this.isRun = false;
      r_ResSystem.ResSystem.loadBundleRes("game3", "pet/" + this.baseInfo.prefab, cc.Prefab, function (e, t) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(h, t);
        h.petRoot.node.removeAllChildren();
        var o = cc.instantiate(t);
        h.petRoot.node.addChild(o);
        h.petNode = o;
        h.petNode.scale = .5;
        h.petNode.y = -h.petRoot.height / 2 * h.petNode.scale - 30;
        h.petAnim = o.getComponent(sp.Skeleton);
        h.idle("default");
        h.isRun = true;
      });
    }
  };
  _ctor.prototype.stop = function () {
    this.isRun = false;
    r_TimeSystem.TimeSystem.scheduleClear("battleResult");
    r_TimeSystem.TimeSystem.scheduleClear("attackDelay");
    r_TimeSystem.TimeSystem.scheduleClear("attackInterval");
    if (this.popupRoot) {
      this.popupRoot.dispose();
      this.popupRoot = null;
    }
  };
  _ctor.prototype.getMaxHp = function () {
    return this.maxHp;
  };
  _ctor.prototype.getHp = function () {
    return this.hp;
  };
  _ctor.prototype.setHp = function (e) {
    this.hp = e;
  };
  _ctor.prototype.addHp = function (e, t) {
    var o = this;
    undefined === t && (t = false);
    if (this.isRun) {
      this.hp += e;
      this.hp = cc.misc.clampf(this.hp, 0, this.maxHp);
      if (this.hp <= 0) {
        if (!t && this.lastHpVal > 0) {
          this.attackLog("装死：" + this.lastHpVal);
          this.hp = cc.misc.clampf(this.lastHpVal, 0, this.maxHp);
          this.lastHpVal = 0;
          this.zhuangsiDelay = 3;
          this.playAnim("zhuangsi", null, function () {
            r_TimeSystem.TimeSystem.scheduleOnce("zhuangsi", 1, function () {
              o.idle();
              if (o.target.isAttacking) {
                o.zhuangsiDelay = 0;
                o.target.attackEnd();
              }
            });
          });
        } else {
          this.die();
        }
      }
      this.petInfoItem.getChild("hpPro").asProgress.max = this.maxHp;
      this.petInfoItem.getChild("hpPro").asProgress.value = this.hp;
      this.popupHp(Math.abs(e));
    }
  };
  _ctor.prototype.getStrength = function () {
    return this.strength;
  };
  _ctor.prototype.addStrength = function (e) {
    this.strength += e;
  };
  _ctor.prototype.getSpeed = function () {
    return this.speed;
  };
  _ctor.prototype.addSpeed = function (e) {
    this.speed += e;
  };
  _ctor.prototype.getDexterity = function () {
    return this.dexterity;
  };
  _ctor.prototype.addDexterity = function (e) {
    this.dexterity += e;
  };
  _ctor.prototype.getDamage = function () {
    return this.damage;
  };
  _ctor.prototype.setDamage = function (e) {
    this.damage = e;
  };
  _ctor.prototype.getDefence = function () {
    return this.defence;
  };
  _ctor.prototype.setDefence = function (e) {
    this.defence = e;
  };
  _ctor.prototype.getLevel = function () {
    return this.baseInfo.level;
  };
  _ctor.prototype.getHitRate = function (e, t) {
    var o = 0;
    if (e) {
      var i = r_PetSkillLogic.PetSkillLogic.skillLogics[e.id];
      i.hitRate && (o += i.hitRate(e.level));
      o += this.extraSkillHitRate;
    }
    if (t) {
      var n = r_PetWeaponLogic.PetWeaponLogic.weaponLogics[t.id];
      n.hitRate && (o += n.hitRate(t.level));
    }
    for (var a = 0; a < this.buffs.length; a++) {
      var s = this.buffs[a];
      s.type == r_PetCfg.BuffType.命中 && (o += s.val);
    }
    return o;
  };
  _ctor.prototype.getDodgeRate = function () {
    return .2 + Math.max(0, (this.getDexterity() - this.target.getDexterity()) / (this.getDexterity() + this.target.getDexterity()));
  };
  _ctor.prototype.addTurn = function (e) {
    this.turnCount += e;
  };
  _ctor.prototype.update = function (e) {
    this.dtime += e;
  };
  _ctor.prototype.playAnim = function (e, t, o, i) {
    undefined === o && (o = null);
    undefined === i && (i = false);
    if (this.petAnim && e) {
      t && this.petAnim.setSkin(t);
      this.petAnim.setAnimation(0, e, i);
      this.petAnim.setCompleteListener(o);
    }
  };
  _ctor.prototype.turnStart = function () {
    var e = this;
    if (this.isRun) {
      this.petRoot.node.setSiblingIndex(this.target.petRoot.node.getSiblingIndex() + 1);
      if (this.isPursueAttack) {
        this.isPursueAttack = false;
      } else {
        this.addTurn(1);
        if (this.turnCount < 1) {
          return void this.target.turnStart();
        }
        this.turnStartCount++;
        this.turnCount--;
        if (this.target.getSpeed() < this.getSpeed()) {
          var t = Math.ceil(2 * Math.min(this.getSpeed(), this.target.getSpeed()) / Math.abs(this.target.getSpeed() - this.getSpeed()));
          this.attackLog("速度：" + this.getSpeed());
          this.attackLog("对方速度：" + this.target.getSpeed());
          this.attackLog("追击回合数：" + t);
          if (this.turnStartCount % t == 0) {
            this.isPursueAttack = true;
            this.attackLog("追击");
          }
        }
      }
      if (this.isHoldWeapon) {
        this.isHoldWeapon = false;
        this.playAnim("diudiaowuqi", null, function () {
          e.attackStart();
        });
      } else {
        this.attackStart();
      }
    }
  };
  _ctor.prototype.turnEnd = function () {
    var e = this;
    for (var t = this.buffs.length - 1; t >= 0; t--) {
      if (0 == (o = this.buffs[t]).turnType && o.turnCount > 0) {
        o.turnCount--;
        0 == o.turnCount && this.buffs.splice(t, 1);
      }
    }
    for (t = this.target.buffs.length - 1; t >= 0; t--) {
      var o;
      if (1 == (o = this.target.buffs[t]).turnType && o.turnCount > 0) {
        o.turnCount--;
        0 == o.turnCount && this.target.buffs.splice(t, 1);
      }
    }
    var i = function () {
      e.idle();
      e.isPursueAttack && e.popupAttackName("追击");
      r_TimeSystem.TimeSystem.scheduleOnce("attackInterval", e.attackInterval + e.target.zhuangsiDelay, function () {
        e.target.zhuangsiDelay = 0;
        if (e.isPursueAttack) {
          e.turnStart();
        } else {
          e.target.turnStart();
        }
      });
    };
    if (Math.abs(this.petRoot.x - this.petNodePosX) > 10) {
      this.idle();
      r_TimeSystem.TimeSystem.scheduleOnce("attackInterval", this.attackInterval, function () {
        e.move("back", function () {
          i();
        });
      });
    } else {
      i();
    }
  };
  _ctor.prototype.attackStart = function () {
    this.isAttacking = true;
    this.attackCount = 0;
    var e = false;
    var t = 1;
    var o = -1;
    for (var i = 0; i < this.buffs.length; i++) {
      var n = this.buffs[i];
      if (n.type == r_PetCfg.BuffType.伤害率) {
        t += n.val;
      } else {
        n.type == r_PetCfg.BuffType.攻击类型 && (o = n.val);
      }
    }
    var a = Math.random();
    if (a < .8) {
      (a < .4 || o == r_PetCfg.AttackType.投掷) && (e = this.weaponAttack(t, o));
      e || (e = this.skillAttack(t));
      !e && this.weapons.length > 0 && (e = this.weaponAttack(t, o));
    }
    e || this.bodyAttack(t);
  };
  _ctor.prototype.attackEnd = function () {
    var e = this;
    this.isAttacking = false;
    if (this.attackCount > 0 && this.fnAttackAgain && this.isRun) {
      this.attackCount--;
      this.popupAttackName("连击");
      r_TimeSystem.TimeSystem.scheduleOnce("attackInterval", this.attackInterval + this.target.zhuangsiDelay, function () {
        e.target.zhuangsiDelay = 0;
        e.isAttacking = true;
        e.fnAttackAgain(true);
      });
    } else {
      this.turnEnd();
    }
  };
  _ctor.prototype.checkDodge = function (e, t, o) {
    var i = this;
    undefined === o && (o = true);
    var n = this.target.getDodgeRate(e, t) - this.getHitRate(e, t);
    if (Math.random() < n) {
      this.target.popupHp("m");
      o && this.target.playAnim("duobi", null, function () {
        i.target.idle();
      });
      return true;
    }
  };
  _ctor.prototype.bodyAttack = function (e) {
    var t = this;
    var o = function () {
      if (t.checkDodge()) {
        t.attackLog("空手 --- miss");
        return true;
      }
      var o = Math.ceil(r_PetWeaponLogic.PetWeaponLogic.getBodyAttack(t.getStrength()) * e);
      t.target.hit();
      t.target.addHp(-o);
      t.attackLog("空手 --- 伤害：" + o);
    };
    var i = function () {
      r_SoundMgr.SoundMgr.playSound("pet/出拳_01");
      t.playAnim("chuquan", "default", function () {
        t.attackEnd();
      });
      r_TimeSystem.TimeSystem.scheduleOnce("attackDelay", .2, function () {
        o();
      });
    };
    this.fnAttackAgain = i;
    this.move("forward", function () {
      i();
    });
  };
  _ctor.prototype.skillAttack = function (e) {
    var t = this;
    var o = this.skills.filter(function (e) {
      return r_PetCfg.PetSkillCfgs.find(function (t) {
        return t.id == e.id;
      }).type == r_PetCfg.SkillType.主动 && !(27 == e.id && t.isHealAddHp);
    });
    if (o.length > 0) {
      var i = o[r_PetCommon.PetCommon.randomInt(0, o.length - 1)];
      var n = r_PetSkillLogic.PetSkillLogic.skillLogics[i.id];
      var a = r_PetCfg.PetSkillCfgs.find(function (e) {
        return e.id == i.id;
      });
      var c = this.skills.indexOf(i);
      c >= 0 && this.skills.splice(c, 1);
      var h = function () {
        var o;
        var s;
        var r;
        var c;
        var l;
        if (t.checkDodge(i, null, !a.targetHitAnim)) {
          t.attackLog(a.name + " --- miss");
          return true;
        }
        var u = null === (o = n.buff) || undefined === o ? undefined : o.call(n, i.level, t, t.target);
        u && t.attackLog(a.name + " --- buff：" + u);
        var h = Math.ceil(null === (s = n.addHp) || undefined === s ? undefined : s.call(n, i.level, t.baseInfo));
        if (!t.isHealAddHp && h > 0) {
          t.isHealAddHp = true;
          t.addHp(h);
          t.attackLog(a.name + " --- 增加血量：" + h);
        } else {
          a.targetHitAnim || t.target.hit();
        }
        var p = Math.ceil(null === (r = n.addSpeed) || undefined === r ? undefined : r.call(n, i.level));
        if (p > 0) {
          t.addSpeed(p);
          t.attackLog(a.name + " --- 增加速度：" + p);
        }
        var d = Math.ceil((null === (c = n.damage) || undefined === c ? undefined : c.call(n, i.level, t, t.target)) * e);
        if (d > 0) {
          t.target.addHp(-d);
          t.attackLog(a.name + " --- 伤害：" + d);
        }
        null === (l = n.removeWeapon) || undefined === l || l.call(n, i.level, t.target);
        p > 0 && t.addSpeed(-p);
      };
      var d = function () {
        t.popupAttackName(a.name);
        t.playAnim(a.anim, "default", function () {
          t.attackEnd();
        });
        a.targetHitAnim && t.target.playAnim(a.targetHitAnim, null, function () {
          t.target.idle();
          t.attackEnd();
        });
        if (a.attackDelay) {
          r_TimeSystem.TimeSystem.scheduleOnce("attackDelay", a.attackDelay, function () {
            h();
          });
        } else {
          h();
        }
        a.sound && r_SoundMgr.SoundMgr.playSound(a.sound);
      };
      this.fnAttackAgain = d;
      d();
      return true;
    }
  };
  _ctor.prototype.weaponAttack = function (e, t) {
    var o = this;
    var i = this.weapons;
    if (i.length > 0) {
      var n = r_PetCommon.PetCommon.randomInt(0, i.length - 1);
      var a = i[n];
      var c = r_PetWeaponLogic.PetWeaponLogic.weaponLogics[a.id];
      var h = r_PetCfg.PetWeaponCfgs.find(function (e) {
        return e.id == a.id;
      });
      this.removeOneWeapon(n);
      var p = function (i) {
        var n;
        var s;
        var r;
        var l;
        var u;
        if (!i && o.attackCount < 1 && c.addAttackCount) {
          o.attackCount += c.addAttackCount(a.level);
          o.attackCount > 0 && o.attackLog(h.name + " --- 连续攻击：" + o.attackCount);
        }
        if (o.checkDodge(null, a)) {
          o.attackLog(h.name + " --- miss");
          return void (!i && o.attackCount < 1 && (null === (n = c.dodgeAttack) || undefined === n ? undefined : n.call(c, a.level)) && (o.attackCount = 1, o.attackLog(h.name + " --- 闪避反击：" + o.attackCount)));
        }
        var p;
        var d = null === (s = c.buff) || undefined === s ? undefined : s.call(c, a.level, o, o.target);
        d && o.attackLog(c.name + " --- buff：" + d);
        if (c.changeTurn && 0 != (p = c.changeTurn(a.level))) {
          o.addTurn(p);
          o.attackLog(h.name + " --- 回合数：" + p);
        }
        if (c.changeTargetTurn && 0 != (p = c.changeTargetTurn(a.level))) {
          o.target.addTurn(p);
          o.attackLog(h.name + " --- 对手回合数：" + p);
        }
        o.target.hit();
        if (null === (r = c.kill) || undefined === r ? undefined : r.call(c, a.level)) {
          o.target.addHp(-o.target.getHp(), null === (l = c.ignoreLastHp) || undefined === l ? undefined : l.call(c));
          return void o.attackLog(h.name + " --- 秒杀");
        }
        var y = Math.ceil(c.damage(a.level, o, o.target, t) * e);
        if (y > 0) {
          o.target.addHp(-y, null === (u = c.ignoreLastHp) || undefined === u ? undefined : u.call(c));
          o.attackLog(h.name + " --- 伤害：" + y);
        }
      };
      var y = function (e) {
        undefined === e && (e = false);
        var i = .6;
        if (t == r_PetCfg.AttackType.投掷) {
          if (!o.isHoldWeapon) {
            return void o.holdWeapon(f, function () {
              o.isHoldWeapon = true;
              y(e);
            });
          }
          o.isHoldWeapon = false;
          o.playAnim("gj_touz", f, function () {
            o.idle("default");
            o.attackEnd();
          });
          r_SoundMgr.SoundMgr.playSound("pet/投掷武器");
          i = .75;
        } else {
          o.playAnim("gj_jinzhan", f, function () {
            o.attackEnd();
          });
          r_SoundMgr.SoundMgr.playSound("pet/挥舞_01");
        }
        r_TimeSystem.TimeSystem.scheduleOnce("attackDelay", i, function () {
          p(e);
        });
      };
      this.fnAttackAgain = y;
      var f = "";
      if (h.type == r_PetCfg.WeaponType.投掷武器 || t == r_PetCfg.AttackType.投掷 || Math.random() < .3) {
        t = r_PetCfg.AttackType.投掷;
        f = h.skin_touzi;
      } else {
        t = r_PetCfg.AttackType.近身;
        f = h.skin_jinzhan;
      }
      this.holdWeapon(f, function () {
        o.isHoldWeapon = true;
        if (t == r_PetCfg.AttackType.投掷) {
          y();
        } else {
          o.move("forward", function () {
            y();
          });
        }
      });
      this.popupAttackName(h.name);
      return true;
    }
    if (t == r_PetCfg.AttackType.投掷) {
      this.attackEnd();
      this.attackLog("502胶强制远击，跳过攻击");
      return true;
    }
  };
  _ctor.prototype.holdWeapon = function (e, t) {
    var o = this;
    this.playAnim("nachuwuqi", e, function () {
      o.idle();
      r_TimeSystem.TimeSystem.scheduleOnce("attackInterval", o.attackInterval, function () {
        null == t || t();
      });
    });
  };
  _ctor.prototype.idle = function (e) {
    undefined === e && (e = null);
    this.playAnim("daiji", e, null, true);
  };
  _ctor.prototype.move = function (e, t) {
    r_SoundMgr.SoundMgr.playSound("pet/跑动_01");
    this.playAnim("paobu", null, null, true);
    cc.Tween.stopAllByTarget(this.petRoot);
    var o = "forward" == e ? this.target.petRoot.x + this.petRoot.width * (this.petRoot.x < this.target.petRoot.x ? -1 : 1) : this.petNodePosX;
    cc.tween(this.petRoot).to(.3, {
      x: o
    }, {
      easing: cc.easing.smooth
    }).call(function () {
      r_SoundMgr.SoundMgr.stopSound("pet/跑动_01");
      t && t();
    }).start();
  };
  _ctor.prototype.hit = function () {
    var e = this;
    if (this.isRun) {
      this.playAnim("shouji", null, function () {
        e.idle();
      });
      r_SoundMgr.SoundMgr.playSound("pet/受击2_01");
    }
  };
  _ctor.prototype.die = function () {
    this.isRun = false;
    this.target.isRun = false;
    this.playAnim("daodi", null);
    this.battleResult();
  };
  _ctor.prototype.removeOneWeapon = function (e) {
    this.weapons.splice(e, 1);
    this.showWeapons();
  };
  _ctor.prototype.battleResult = function () {
    var e = this.isPlayer ? this.target : this;
    var t = !this.isPlayer;
    var o = 10;
    if (t) {
      var i = e.getLevel() - this.getLevel();
      o = i >= 0 ? Math.min(40 + i, 45) : Math.max(40 + 2 * i, 24);
    }
    var n = r_PetData.PetData.getData("expProp", 0);
    if (n > 0) {
      o += 10;
      r_PetData.PetData.setData("expProp", n - 1);
    }
    var a = r_PetData.PetData.getPetBaseInfo();
    var r = a.level;
    var l = a.exp;
    var p = r_PetCommon.PetCommon.addExp(o, t);
    var d = r_PetCommon.PetCommon.setTier(t);
    r_TimeSystem.TimeSystem.scheduleOnce("battleResult", 3, function () {
      r_PetBattleResultUI.PetBattleResultUI.showUI({
        result: t ? 0 : 1,
        exp: o,
        rewards: p,
        starOffset: d,
        oldLevel: r,
        oldExp: l
      });
    });
  };
  _ctor.prototype.showWeapons = function () {
    var e = this.petInfoItem.getChild("weaponList").asList;
    e.itemRenderer = this.weaponItemRenderer.bind(this);
    e.numItems = this.weapons.length;
  };
  _ctor.prototype.weaponItemRenderer = function (e, t) {
    var o = this.weapons[e];
    var i = r_PetCfg.PetWeaponCfgs.find(function (e) {
      return e.id == o.id;
    });
    t.getChild("icon").asLoader.url = "ui://Pet/weaponS" + i.id;
  };
  _ctor.prototype.popupHp = function (e) {
    var t = this;
    var o = this.objPool.pop() || new fgui.GTextField();
    if (!this.popupRoot) {
      this.popupRoot = new fgui.GComponent();
      this.petRoot.parent.addChild(this.popupRoot);
    }
    this.popupRoot.addChild(o);
    o.font = "ui://Pet/HPFont";
    o.fontSize = 20;
    o.autoSize = fgui.AutoSizeType.Both;
    setTimeout(function () {
      o.setPivot(.5, .5, true);
    }, 0);
    o.text = e;
    o.setPosition(this.petRoot.x, this.petRoot.y - this.petRoot.height / 2);
    o.scaleX = 1;
    o.scaleY = 1;
    cc.Tween.stopAllByTarget(o);
    cc.tween(o).by(1, {
      y: -150
    }).call(function () {
      o.removeFromParent();
      t.objPool.push(o);
    }).start();
  };
  _ctor.prototype.popupAttackName = function (e) {
    var t = this;
    var o = this.objPool2.pop() || new fgui.GLoader();
    if (!this.popupRoot) {
      this.popupRoot = new fgui.GComponent();
      this.petRoot.parent.addChild(this.popupRoot);
    }
    this.popupRoot.addChild(o);
    o.url = "ui://Pet/" + e;
    o.autoSize = true;
    o.setPosition(this.petNodePosX, this.petRoot.y + this.petRoot.height / 2 + 30);
    setTimeout(function () {
      o.setPivot(.5, .5, true);
    }, 0);
    o.scaleX = .5;
    o.scaleY = .5;
    cc.Tween.stopAllByTarget(o);
    cc.tween(o).by(.2, {
      scaleX: 1,
      scaleY: 1
    }).delay(1).call(function () {
      o.removeFromParent();
      t.objPool2.push(o);
    }).start();
  };
  _ctor.prototype.attackLog = function (e) {
    this.isPlayer && console.log(e);
  };
  return _ctor;
}();
exports.PetBattle = exp_PetBattle;