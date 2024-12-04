var i;
var n;
var a;
var s;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetRoleRandomName = exports.PetExp = exports.PetUpgradeCfg = exports.PetTierReward = exports.PetCardCfg = exports.PetLevelUpPropRewards = exports.PetProps = exports.PetSkillCfgs = exports.PetWeaponCfgs = exports.PetBossCfgs = exports.PetCfgs = exports.PetItemQuality = exports.BuffType = exports.AttackType = exports.WeaponType = exports.ValueType = exports.SkillType = exports.PetType = exports.PetGameCfg = undefined;
exports.PetGameCfg = {
  levelMax: 32,
  initAttr: {
    hp: 65,
    speed: 2,
    dexterity: 2,
    strength: 2,
    randomAttr: 4
  },
  vitalityMax: 3,
  energyMax: 50,
  costVitality: 1,
  mathInfo: {
    initAttrs: [{
      hp: 8,
      speed: 2,
      dexterity: 2,
      strength: 2,
      randomAttr: 0
    }, {
      hp: 15,
      speed: 2,
      dexterity: 3,
      strength: 4,
      randomAttr: 0
    }, {
      hp: 25,
      speed: 3,
      dexterity: 3,
      strength: 4,
      randomAttr: 0
    }],
    npcLevelInfos: [{
      level: [-2, -1],
      weaponNum: -2,
      weaponLevel: -2
    }, {
      level: [-1, -1],
      weaponNum: -2,
      weaponLevel: -1
    }, {
      level: [-1, -1],
      weaponNum: -1,
      weaponLevel: -1
    }, {
      level: [0, 0],
      weaponNum: -1,
      weaponLevel: 0
    }, {
      level: [0, 0],
      weaponNum: 0,
      weaponLevel: 2
    }, {
      level: [0, 0],
      weaponNum: 0,
      weaponLevel: 4
    }, {
      level: [1, 1],
      weaponNum: 1,
      weaponLevel: 6
    }, {
      level: [1, 2],
      weaponNum: 2,
      weaponLevel: 6
    }, {
      level: [2, 2],
      weaponNum: 2,
      weaponLevel: 8
    }, {
      level: [2, 3],
      weaponNum: 2,
      weaponLevel: 10
    }, {
      level: [2, 3],
      weaponNum: 3,
      weaponLevel: 12
    }]
  },
  tier: {
    name: ["青铜", "白银", "黄金", "白金", "钻石", "大师", "王者"],
    starNum: [4, 4, 4, 4, 5, 6, 6]
  }
};
(function (e) {
  e[e["猫"] = 0] = "猫";
  e[e["狗"] = 1] = "狗";
})(i = exports.PetType || (exports.PetType = {}));
(function (e) {
  e[e["主动"] = 0] = "主动";
  e[e["被动"] = 1] = "被动";
})(n = exports.SkillType || (exports.SkillType = {}));
(function (e) {
  e[e["无"] = 0] = "无";
  e[e["生命"] = 1] = "生命";
  e[e["力量"] = 2] = "力量";
  e[e["闪避"] = 3] = "闪避";
  e[e["速度"] = 4] = "速度";
  e[e["伤害"] = 5] = "伤害";
  e[e["命中"] = 6] = "命中";
})(exports.ValueType || (exports.ValueType = {}));
(function (e) {
  e[e["大型武器"] = 0] = "大型武器";
  e[e["中型武器"] = 1] = "中型武器";
  e[e["小型武器"] = 2] = "小型武器";
  e[e["投掷武器"] = 3] = "投掷武器";
})(a = exports.WeaponType || (exports.WeaponType = {}));
(function (e) {
  e[e["近身"] = 0] = "近身";
  e[e["投掷"] = 1] = "投掷";
})(exports.AttackType || (exports.AttackType = {}));
(function (e) {
  e[e["伤害率"] = 0] = "伤害率";
  e[e["攻击类型"] = 1] = "攻击类型";
  e[e["命中"] = 2] = "命中";
})(exports.BuffType || (exports.BuffType = {}));
(function (e) {
  e[e.R = 0] = "R";
  e[e.SR = 1] = "SR";
  e[e.SSR = 2] = "SSR";
})(s = exports.PetItemQuality || (exports.PetItemQuality = {}));
exports.PetCfgs = [{
  id: 1,
  type: i.猫,
  name: "猫猫",
  prefab: "cat"
}, {
  id: 2,
  type: i.狗,
  name: "狗狗",
  prefab: "dog"
}];
exports.PetBossCfgs = [{
  name: "BOSS1",
  level: 40,
  icon: "bossIcon1"
}, {
  name: "BOSS2",
  level: 80,
  icon: "bossIcon2"
}];
exports.PetWeaponCfgs = [{
  id: 1,
  type: a.大型武器,
  name: "充气锤子",
  name2: "真·昊天锤",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，[color=#ff0000]{val2=10%}[/color]概率忽略对手1回合",
  levelValues: [[20, 35, .1], [22, 37, .1], [24, 39, .1], [26, 41, .15], [28, 43, .2], [30, 45, .3]],
  skin_jinzhan: "wuqi_jinzhan_3",
  skin_touzi: "wuqi_touz_8",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.SSR
}, {
  id: 2,
  type: a.大型武器,
  name: "三叉戟",
  name2: "真·三叉戟",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，攻击后自己[color=#ff0000]{val2=10%}[/color]概率休息1回合",
  levelValues: [[25, 50, 1.00001], [28, 53, .9], [31, 56, .8], [34, 59, .7], [37, 62, .6], [40, 65, .5]],
  skin_jinzhan: "wuqi_jinzhan_9",
  skin_touzi: "wuqi_touz_4",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.SSR
}, {
  id: 3,
  type: a.大型武器,
  name: "开山斧",
  name2: "真·开山斧",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，[color=#ff0000]{val2=10%}[/color]闪避反击，[color=#ff0000]{val3=10%}[/color]忽略对手1回合",
  descExtra5: "必暴击",
  levelValues: [[12, 28, .05, .05], [14, 30, .05, .05], [16, 32, .05, .05], [20, 33, .1, .1], [27, 33, .15, .15], [27, 33, .15, .15]],
  skin_jinzhan: "wuqi_jinzhan_5",
  skin_touzi: "wuqi_touz_10",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.SSR
}, {
  id: 11,
  type: a.中型武器,
  name: "宽刃剑",
  name2: "真·宽刃剑",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，对同类伤害[color=#ff0000]+{val2=10%}[/color]",
  descExtra5: "20%连续攻击",
  levelValues: [[6, 10, .2], [8, 12, .3], [10, 14, .4], [12, 16, .5], [14, 18, .8], [16, 26, 1.00001]],
  skin_jinzhan: "wuqi_jinzhan_4",
  skin_touzi: "wuqi_touz_9",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.R
}, {
  id: 14,
  type: a.中型武器,
  name: "板砖",
  name2: "真·金砖",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，[color=#ff0000]{val2=10%}[/color]闪避反击，[color=#ff0000]{val3=10%}[/color]忽略对手1回合",
  levelValues: [[10, 40, .1, .1], [11, 41, .11, .11], [12, 42, .12, .12], [13, 43, .13, .13], [14, 44, .14, .14], [15, 45, .15, .15]],
  skin_jinzhan: "wuqi_jinzhan_1",
  skin_touzi: "wuqi_touz_6",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.SR
}, {
  id: 19,
  type: a.中型武器,
  name: "菜刀",
  name2: "真·斩骨刀",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，额外造成自身等级[color=#ff0000]*{val2=10%}[/color]的伤害",
  descExtra5: "忽略对手1回合",
  levelValues: [[11, 13, 1], [13, 15, 1], [15, 17, 1], [17, 19, 1], [21, 23, 1], [25, 27, 2]],
  skin_jinzhan: "wuqi_jinzhan_2",
  skin_touzi: "wuqi_touz_7",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.SR
}, {
  id: 20,
  type: a.小型武器,
  name: "判官笔",
  name2: "真·判官笔",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，必中",
  descExtra5: "对手每损失1%的生命，就会额外造成1%的伤害",
  levelValues: [[10, 15], [12, 17], [14, 19], [17, 22], [20, 25], [25, 30]],
  skin_jinzhan: "wuqi_jinzhan_8",
  skin_touzi: "wuqi_touz_13",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.SR
}, {
  id: 21,
  type: a.小型武器,
  name: "木剑",
  name2: "真·桃木剑",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，[color=#ff0000]{val2=10%}[/color]闪避反击，[color=#ff0000]{val3=10%}[/color]连续攻击，忽略装死",
  levelValues: [[10, 25, .05, .05], [12, 27, .08, .08], [14, 29, .12, .12], [16, 31, .16, .16], [18, 33, .2, .2], [22, 37, .25, .25]],
  skin_jinzhan: "wuqi_jinzhan_7",
  skin_touzi: "wuqi_touz_12",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.SR
}, {
  id: 26,
  type: a.小型武器,
  name: "萝卜刀",
  name2: "真·萝卜刀",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，降低对方伤害[color=#ff0000]{val2=10%}[/color]，持续[color=#ff0000]{val3=10%}[/color]回台",
  levelValues: [[10, 15, .1, 1], [12, 17, .15, 1], [14, 19, .2, 1], [16, 21, .25, 1], [18, 23, .3, 1], [20, 25, .5, 3]],
  skin_jinzhan: "wuqi_jinzhan_6",
  skin_touzi: "wuqi_touz_11",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.R
}, {
  id: 29,
  type: a.投掷武器,
  name: "易拉罐",
  name2: "真·易拉罐",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，必中，连扔2个",
  descExtra4: "闪避高于对手时伤害提升[color=#ff0000]10%[/color]",
  descExtra5: "闪避高于对手时伤害提升[color=#ff0000]30%[/color]",
  levelValues: [[4, 6], [6, 8], [8, 10], [10, 12], [13, 15], [16, 18]],
  skin_jinzhan: "",
  skin_touzi: "wuqi_touz_1",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.SR
}, {
  id: 31,
  type: a.投掷武器,
  name: "小李飞刀",
  name2: "真·小李飞刀",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，忽略装死，连扔[color=#ff0000]{val2=10%}[/color]个",
  descExtra5: "10%概率秒杀对手",
  levelValues: [[5, 10, 2], [7, 12, 2], [10, 15, 2], [14, 19, 2], [18, 23, 2], [23, 28, 1]],
  skin_jinzhan: "",
  skin_touzi: "wuqi_touz_3",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.R
}, {
  id: 32,
  type: a.投掷武器,
  name: "流星球",
  name2: "真·流星锤",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，增加对方[color=#ff0000]{val2=10%}[/color]闪避，连扔[color=#ff0000]{val3=10%}[/color]个",
  levelValues: [[15, 24, .15, 2], [16, 25, .15, 2], [17, 26, .15, 2], [18, 27, .1, 2], [19, 28, .5, 2], [20, 29, 1e-5, 3]],
  skin_jinzhan: "",
  skin_touzi: "wuqi_touz_5",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.SR
}, {
  id: 33,
  type: a.投掷武器,
  name: "眉笔",
  name2: "真·花西笔",
  desc: "攻击力[color=#ff0000]{val0=20}~{val1=35}[/color]，血量低于30%时伤害[color=#ff0000]+{val2=10%}[/color]，连扔2个",
  levelValues: [[4, 7, .1], [6, 9, .15], [8, 11, .25], [10, 13, .35], [12, 15, .55], [15, 18, 1.00001]],
  skin_jinzhan: "",
  skin_touzi: "wuqi_touz_2",
  battleVal: [200, 100, 100, 100, 100, 400],
  quality: s.R
}];
exports.PetSkillCfgs = [{
  id: 1,
  type: n.被动,
  name: "强身健体",
  desc: "生命值增加：基础生命[color=#ff0000]*{val0=20}+{val1=35}[/color]",
  levelValues: [[.14, 8], [.17, 8], [.2, 8], [.24, 8], [.3, 8], [.4, 8]],
  battleVal: [0, 0, 0, 0, 0, 0],
  quality: s.R
}, {
  id: 2,
  type: n.被动,
  name: "迅捷如风",
  desc: "闪避值提升：基础闪避[color=#ff0000]*{val0=20}+{val1=35}[/color]",
  levelValues: [[.5, 3], [.55, 4], [.6, 5], [.65, 6], [.75, 8], [1.00001, 10]],
  battleVal: [0, 0, 0, 0, 0, 0],
  quality: s.R
}, {
  id: 3,
  type: n.被动,
  name: "力大无穷",
  desc: "力量值提升: 基础力量[color=#ff0000]*{val0=20}+{val1=35}[/color]",
  levelValues: [[.5, 3], [.55, 4], [.6, 5], [.65, 6], [.75, 8], [1.00001, 10]],
  battleVal: [0, 0, 0, 0, 0, 0],
  quality: s.R
}, {
  id: 6,
  type: n.被动,
  name: "装死",
  desc: "受到致命伤害时不会死亡，100%剩下[color=#ff0000]{val0=20}[/color]点生命值",
  levelValues: [[1], [20], [40], [60], [100], [300]],
  battleVal: [300, 100, 100, 100, 300, 1e3],
  quality: s.SSR
}, {
  id: 7,
  type: n.被动,
  name: "基础心法",
  desc: "提高所有主动技能[color=#ff0000]{val0=20}[/color]的命中",
  levelValues: [[.03], [.04], [.05], [.07], [.08], [.1]],
  battleVal: [100, 50, 50, 50, 50, 200],
  quality: s.R
}, {
  id: 10,
  type: n.被动,
  name: "电光火石",
  desc: "速度值提升: 基础速度[color=#ff0000]*{val0=20}+{val1=35}[/color]",
  levelValues: [[.5, 3], [.55, 4], [.6, 5], [.65, 6], [.75, 8], [1.00001, 10]],
  battleVal: [0, 0, 0, 0, 0, 0],
  quality: s.R
}, {
  id: 23,
  type: n.主动,
  name: "佛山无影脚",
  desc: "造成{val1=30}+力量[color=#ff0000]*{val0=20}[/color]的伤害",
  descExtra5: "附带50%连击率",
  levelValues: [[.5, 30], [.6, 30], [.7, 30], [.8, 30], [.9, 30], [1.00001, 30]],
  anim: "foshanwuyj",
  attackDelay: .4,
  sound: "pet/佛山无影脚1_01",
  battleVal: [200, 100, 100, 100, 100, 500],
  quality: s.SR
}, {
  id: 25,
  type: n.主动,
  name: "飞龙探云手",
  desc: "造成[color=#ff0000]{val0=20}[/color]点伤害，并随机丢掉对手[color=#ff0000]{val1=35}[/color]把武器，必中",
  levelValues: [[25, 1], [30, 1], [35, 1], [40, 1], [45, 2], [45, 3]],
  anim: "feilongtys",
  attackDelay: .15,
  sound: "pet/飞龙探云手_01",
  battleVal: [200, 80, 80, 80, 200, 200],
  quality: s.SSR
}, {
  id: 27,
  type: n.主动,
  name: "治疗术",
  desc: "恢复[color=#ff0000]{val1=20}[/color]+等级[color=#ff0000]*{val0=35}[/color]点生命，命中提高[color=#ff0000]{val2=35}[/color]持续[color=#ff0000]{val3=35}[/color]回合",
  levelValues: [[.4, 30, 1e-5, 1], [.45, 32, .04, 1], [.5, 34, .08, 1], [.55, 36, .12, 1], [.6, 38, .16, 2], [1.00001, 40, .3, 3]],
  anim: "zhiliao",
  attackDelay: .2,
  sound: "pet/治疗2_01",
  battleVal: [200, 150, 150, 150, 200, 400],
  quality: s.SSR
}, {
  id: 29,
  type: n.主动,
  name: "天降正义",
  desc: "造成[color=#ff0000]{val1=20}[/color]+闪避[color=#ff0000]*{val0=35}[/color]的伤害，无法被反击",
  descExtra5: "必中",
  levelValues: [[1.00001, 15], [1.05, 16], [1.1, 17], [1.15, 18], [1.2, 20], [1.25, 20]],
  anim: "tianjiangzhengyi",
  attackDelay: 1.2,
  sound: "pet/天降正义_01",
  battleVal: [200, 100, 100, 100, 100, 200],
  quality: s.SR
}, {
  id: 30,
  type: n.主动,
  name: "502胶",
  desc: "[color=#ff0000]{val0=20}[/color]概率使用胶水黏住对方，对方[color=#ff0000]{val1=35}[/color]回合只能远程攻击",
  levelValues: [[.1, 2], [.12, 2], [.14, 2], [.16, 2], [.2, 3], [.25, 4]],
  anim: "jiaoshui",
  attackDelay: .73,
  sound: "pet/502胶生效时_01",
  battleVal: [200, 100, 100, 100, 200, 400],
  quality: s.SR
}, {
  id: 34,
  type: n.主动,
  name: "心如刀割",
  desc: "造成15+等级*1.5的伤害，非同类伤害[color=#ff0000]+{val0=20}[/color]",
  levelValues: [[.1], [.2], [.3], [.45], [.6], [1.00001]],
  targetHitAnim: "aixin",
  attackDelay: 1.8,
  sound: "pet/心如刀割_01",
  battleVal: [100, 80, 80, 80, 100, 200],
  quality: s.SR
}, {
  id: 35,
  type: n.主动,
  name: "梯云纵",
  desc: "当前回合速度[color=#ff0000]+{val0=20}[/color]，对目标造成速度[color=#ff0000]*{val1=35}[/color]的伤害",
  levelValues: [[10, .5], [15, .6], [20, .7], [30, .8], [40, .9], [60, 1.00001]],
  anim: "tiyunz",
  attackDelay: .2,
  sound: "pet/梯云纵_01",
  battleVal: [100, 80, 80, 80, 80, 80],
  quality: s.SR
}];
exports.PetProps = [{
  id: 1,
  name: "强者之心",
  desc: "强者之心是成为强者的第一步，可以用来强化技能或者武器",
  icon: "propHeart",
  costType: 0,
  cost: 5e4,
  limit: 10,
  isShow: true
}, {
  id: 2,
  name: "工匠之心",
  desc: "工匠之心让你不被外物所扰，强化技能或者武器失败时不会掉星",
  icon: "propHeart",
  costType: 1,
  cost: 1,
  limit: -1
}, {
  id: 3,
  name: "体力药剂（大）",
  desc: "恢复3点体力",
  icon: "propVitality1",
  costType: 1,
  cost: 1,
  limit: -1,
  isShow: true
}, {
  id: 4,
  name: "体力药剂（小）",
  desc: "恢复1点体力",
  icon: "propVitality2",
  costType: 0,
  cost: 1e4,
  limit: 3,
  isShow: true
}, {
  id: 5,
  name: "经验药剂",
  desc: "接下来3次战斗经验值额外增加10点",
  icon: "propExp",
  costType: 1,
  cost: 1,
  limit: -1,
  isShow: true
}, {
  id: 6,
  name: "力量肥皂",
  desc: "用1点基础力量换1点基础闪避或速度（当力量占基础属性比低于25%时无法使用）",
  icon: "propTicket",
  costType: 0,
  cost: 1e4,
  limit: -1
}, {
  id: 7,
  name: "闪避肥皂",
  desc: "用1点基础闪避换1点基础力量或速度（当闪避占基础属性比低于25%时无法使用）",
  icon: "propTicket",
  costType: 0,
  cost: 1e4,
  limit: -1
}, {
  id: 8,
  name: "速度肥皂",
  desc: "用1点基础速度换1点基础力量或闪避（当速度占基础属性比低于25%时无法使用）",
  icon: "propTicket",
  costType: 0,
  cost: 1e4,
  limit: -1
}, {
  id: 9,
  name: "生命肥皂",
  desc: "刷新基础生命，成功可以提升1点基础生命，失败基础生命不变。",
  icon: "propTicket",
  costType: 0,
  cost: 3e4,
  limit: -1
}, {
  id: 10,
  name: "力量滴剂",
  desc: "增加1点基础力量",
  icon: "propStrength",
  costType: 1,
  cost: 1,
  limit: -1,
  isShow: true
}, {
  id: 11,
  name: "闪避滴剂",
  desc: "增加一点基础闪避",
  icon: "propDexterity",
  costType: 1,
  cost: 1,
  limit: -1,
  isShow: true
}, {
  id: 12,
  name: "速度滴剂",
  desc: "增加一点基础速度",
  icon: "propSpeed",
  costType: 1,
  cost: 1,
  limit: -1,
  isShow: true
}, {
  id: 13,
  name: "生命滴剂",
  desc: "增加一点基础血量",
  icon: "propHp",
  costType: 1,
  cost: 1,
  limit: -1,
  isShow: true
}];
exports.PetLevelUpPropRewards = [[{
  type: 0,
  val: 0
}, {
  type: 0,
  val: 0
}], [{
  type: 0,
  val: 1e5
}, {
  type: 3,
  val: 1
}], [{
  type: 0,
  val: 1e5
}, {
  type: 3,
  val: 1
}], [{
  type: 0,
  val: 1e5
}, {
  type: 3,
  val: 1
}], [{
  type: 2,
  val: 1
}, {
  type: 1,
  val: 1e4
}], [{
  type: 0,
  val: 2e5
}, {
  type: 1,
  val: 15e3
}], [{
  type: 0,
  val: 2e5
}, {
  type: 1,
  val: 15e3
}], [{
  type: 0,
  val: 2e5
}, {
  type: 1,
  val: 15e3
}], [{
  type: 0,
  val: 2e5
}, {
  type: 1,
  val: 15e3
}], [{
  type: 2,
  val: 1
}, {
  type: 1,
  val: 3e4
}], [{
  type: 0,
  val: 4e5
}, {
  type: 1,
  val: 35e3
}], [{
  type: 0,
  val: 4e5
}, {
  type: 1,
  val: 35e3
}], [{
  type: 0,
  val: 4e5
}, {
  type: 1,
  val: 35e3
}], [{
  type: 0,
  val: 4e5
}, {
  type: 1,
  val: 35e3
}], [{
  type: 2,
  val: 1
}, {
  type: 1,
  val: 6e4
}], [{
  type: 0,
  val: 8e5
}, {
  type: 1,
  val: 65e3
}], [{
  type: 0,
  val: 8e5
}, {
  type: 1,
  val: 65e3
}], [{
  type: 0,
  val: 8e5
}, {
  type: 1,
  val: 65e3
}], [{
  type: 0,
  val: 8e5
}, {
  type: 1,
  val: 65e3
}], [{
  type: 2,
  val: 1
}, {
  type: 1,
  val: 8e4
}], [{
  type: 0,
  val: 1e6
}, {
  type: 1,
  val: 85e3
}], [{
  type: 0,
  val: 1e6
}, {
  type: 1,
  val: 85e3
}], [{
  type: 0,
  val: 1e6
}, {
  type: 1,
  val: 85e3
}], [{
  type: 0,
  val: 1e6
}, {
  type: 1,
  val: 85e3
}], [{
  type: 2,
  val: 1
}, {
  type: 1,
  val: 1e5
}], [{
  type: 0,
  val: 2e6
}, {
  type: 1,
  val: 12e4
}], [{
  type: 0,
  val: 2e6
}, {
  type: 1,
  val: 13e4
}], [{
  type: 0,
  val: 2e6
}, {
  type: 1,
  val: 14e4
}], [{
  type: 0,
  val: 2e6
}, {
  type: 1,
  val: 15e4
}], [{
  type: 2,
  val: 1
}, {
  type: 1,
  val: 2e5
}], [{
  type: 0,
  val: 4e6
}, {
  type: 1,
  val: 2e5
}], [{
  type: 0,
  val: 4e6
}, {
  type: 1,
  val: 2e5
}]];
exports.PetCardCfg = {
  rewards: [{
    rate: .25,
    type: 0,
    val: 2e4
  }, {
    rate: .1,
    type: 0,
    val: 1e5
  }, {
    rate: .05,
    type: 0,
    val: 5e5
  }, {
    rate: .25,
    type: 1,
    val: 50
  }, {
    rate: .1,
    type: 1,
    val: 500
  }, {
    rate: .05,
    type: 1,
    val: 5e3
  }, {
    rate: .05,
    type: 2,
    val: 1
  }, {
    rate: .1,
    type: 3,
    val: 0
  }, {
    rate: .04,
    type: 3,
    val: 1
  }, {
    rate: .01,
    type: 3,
    val: 2
  }],
  qualityPrice: [1, 2, 3],
  fistOpen5: [{
    type: 3,
    val: 11
  }, {
    type: 2,
    val: 1
  }, {
    type: 0,
    val: 1e5
  }, {
    type: 1,
    val: 500
  }, {
    type: 0,
    val: 2e4
  }]
};
exports.PetTierReward = [2e4, 2e4, 2e4, 2e4, 4e4, 4e4, 4e4, 4e4, 6e4, 6e4, 6e4, 6e4, 8e4, 8e4, 8e4, 8e4, 1e5, 1e5, 1e5, 1e5, 15e4, 15e4, 15e4, 15e4, 4e5];
exports.PetUpgradeCfg = {
  cost: [1, 2, 4, 6, 8],
  rate: [1, .65, .35, .2, .1]
};
exports.PetExp = [0, 40, 40, 40, 40, 80, 80, 80, 80, 120, 120, 120, 120, 160, 160, 160, 160, 200, 200, 200, 200, 240, 240, 240, 240, 280, 280, 280, 280, 320, 320, 320];
exports.PetRoleRandomName = ["云端遗梦录", "星河暗恋记", "月野氿桃", "星星跌入梦境", "桃奈叶子", "放鹤归舟", "春日樱亭", "宇宙热恋期", "今夜星潮暗涌", "与银河邂逅", "夜幕星河", "月间摘星", "秋山信月归", "一池春水", "与星星私奔", "星河私藏家", "晚间偷亲", "甜岛和星", "香川松子", "揽星河", "这人间烟火", "脸红", "人间宝藏", "信月诗集", "清水失愿", "风几里", "屿离别", "止风眉", "间歇性心动", "关掉月亮", "低头是人间", "你脸红什么", "行凶", "怪夜色太温柔", "捧一束月光", "化成小熊糖浆", "一勺草莓酱", "星月软糖", "神秘的告白者", "摘一缕清风", "渡星河", "别捏本酱脸", "我的长安丢了", "欢喜赴空山", "无羡心动", "月亮熄灭了", "吞掉月亮", "和星星道晚安", "小梨涡很甜", "星星抓不住", "盐焗小星球", "甜崽小洋", "脑袋困掉了", "花生了什么树", "银河小铁骑", "章鱼小肉丸", "油炸小可爱", "月亮供电不足", "柠檬小丸子", "邮一棵草莓", "bi8bo", "鲜虾炖萝卜", "小熊行星", "呆熊吐泡泡", "肚子圆滚滚", "小绵羊的酸奶盖", "白白一只咩", "小熊趴在云朵", "盐煎肉女孩", "海盐芝士奶盖", "肥水不流油", "派可爱星", "Sinsoledad", "Flechazo", "Solitude", "Sokäch", "Echo", "Aurora", "Komoreb", "被月亮收买", "薄荷撞可乐", "月亮也会心动", "橘子味汽水", "桃桃星冰乐", "售空爱意", "甜桃梦游记", "东京日和", "在星夜下失眠", "春日小憩", "心动写真馆", "零度碳酸", "星萝湾", "望月纱", "玫瑰徒步而来", "点击登录月球", "桃椰奶冻", "空白剧本", "关月亮了", "绒毛猫", "集市漫过街巷", "银河邮差", "地面宇航员", "猫的日光浴", "我安静存在", "请夏天吃饭", "漫游月亮岛"];