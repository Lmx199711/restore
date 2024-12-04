Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RussiaRoundAward = exports.RussiaBuffCfg = exports.RussiaBulletCount = exports.RussiaCfg = undefined;
exports.RussiaCfg = {
  bulletHoleNum: 6,
  hoodCount: 0,
  dodge: 0,
  hp: 3,
  buffLevels: [0, 0, 0, 0]
};
exports.RussiaBulletCount = [2, 3, 4, 5, 6];
exports.RussiaBuffCfg = [{
  1: {
    name: "防护罩+1",
    desc: "抵挡1次伤害",
    value: 1,
    id: 0,
    level: 1
  },
  2: {
    name: "防护罩+2",
    desc: "抵挡2次伤害",
    value: 2,
    id: 0,
    level: 2
  }
}, {
  1: {
    name: "打不着",
    desc: "20%闪避掉伤害",
    value: .2,
    id: 1,
    level: 1
  },
  2: {
    name: "打不着",
    desc: "30%闪避掉伤害",
    value: .3,
    id: 1,
    level: 2
  }
}, {
  1: {
    name: "强身健体",
    desc: "增加两点生命值",
    value: 2,
    id: 2,
    level: 1
  },
  2: {
    name: "强身健体",
    desc: "增加三点生命值",
    value: 3,
    id: 2,
    level: 2
  }
}, {
  1: {
    name: "武器升级",
    desc: "更换为八孔武器",
    value: 2,
    id: 3,
    level: 1
  },
  2: {
    name: "武器升级",
    desc: "更换为十孔武器",
    value: 2,
    id: 3,
    level: 2
  }
}];
exports.RussiaRoundAward = [1e9, 5e9, 1e10, 3e10, 0];