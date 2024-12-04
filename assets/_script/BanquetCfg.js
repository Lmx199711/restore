Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BanquetOtherCfg = exports.BanquetEggCfg = exports.BanquetFoodLastCfg = exports.BanquetFoodCfg = exports.BanquetGameCfg = exports.BanquetBaseCfg = undefined;
exports.BanquetBaseCfg = {
  normal: {
    price: 8e6,
    anim_1: "daiji_2",
    anim_2: "chixi_2",
    anim_3: "dao_3",
    anim_4: "jiao_daiji_3",
    anim_yb: "yb_2",
    stopTime: 5,
    multiply: 1
  },
  medium: {
    price: 88e6,
    anim_1: "daiji_1",
    anim_2: "chixi_1",
    anim_3: "dao_2",
    anim_4: "jiao_daiji_2",
    anim_yb: "yb_1",
    stopTime: 5,
    multiply: 8
  },
  high: {
    price: 888e6,
    anim_1: "daiji_3",
    anim_2: "chixi_3",
    anim_3: "dao_1",
    anim_4: "jiao_daiji_1",
    anim_yb: "yb_3",
    stopTime: 5,
    multiply: 50
  }
};
exports.BanquetGameCfg = {
  normal: {
    initNum: 10,
    freshTime: 1,
    freshNum: 1,
    npcSlowSpeed: .5,
    npcFastSpeed: .3,
    gameTime: 20,
    npcSlowSpeed_last: .4,
    npcFastSpeed_last: .3,
    lastFood: "狗不理"
  },
  medium: {
    initNum: 15,
    freshTime: .85,
    freshNum: 2,
    npcSlowSpeed: .3,
    npcFastSpeed: .1,
    gameTime: 20,
    npcSlowSpeed_last: .25,
    npcFastSpeed_last: .18,
    lastFood: "佛跳墙"
  },
  high: {
    initNum: 30,
    freshTime: .5,
    freshNum: 5,
    npcSlowSpeed: .1,
    npcFastSpeed: .05,
    gameTime: 20,
    npcSlowSpeed_last: .2,
    npcFastSpeed_last: .1,
    lastFood: "满汉全席"
  }
};
exports.BanquetFoodCfg = [{
  name: "菜1",
  price: 1e5,
  icon: "ui/banquet/菜1"
}, {
  name: "菜2",
  price: 1e5,
  icon: "ui/banquet/菜2"
}, {
  name: "菜3",
  price: 1e5,
  icon: "ui/banquet/菜3"
}, {
  name: "菜4",
  price: 1e5,
  icon: "ui/banquet/菜4"
}, {
  name: "菜5",
  price: 1e5,
  icon: "ui/banquet/菜5"
}, {
  name: "菜6",
  price: 1e5,
  icon: "ui/banquet/菜6"
}, {
  name: "菜7",
  price: 1e5,
  icon: "ui/banquet/菜7"
}, {
  name: "菜8",
  price: 1e5,
  icon: "ui/banquet/菜8"
}, {
  name: "菜9",
  price: 1e5,
  icon: "ui/banquet/菜9"
}, {
  name: "菜10",
  price: 1e5,
  icon: "ui/banquet/菜10"
}, {
  name: "菜11",
  price: 1e5,
  icon: "ui/banquet/菜11"
}, {
  name: "菜12",
  price: 1e5,
  icon: "ui/banquet/菜12"
}];
exports.BanquetFoodLastCfg = {
  狗不理: {
    name: "狗不理",
    price: 5e6,
    icon: "ui/banquet/狗不理",
    url: "ui://Banquet/狗不理"
  },
  佛跳墙: {
    name: "佛跳墙",
    price: 5e6,
    icon: "ui/banquet/佛跳墙",
    url: "ui://Banquet/佛跳墙"
  },
  满汉全席: {
    name: "满汉全席",
    price: 1e7,
    icon: "ui/banquet/满汉全席",
    url: "ui://Banquet/满汉全席"
  }
};
exports.BanquetEggCfg = [{
  name: "学习资料",
  price: 1e8,
  info: "真的只是一份用来学习的资料！",
  rate: .25,
  url: "9-1",
  anim_1: "tao_1",
  anim_2: "tao_daiji_1"
}, {
  name: "世界名画",
  price: 5e8,
  info: "达分奇的亲笔作画!价值不菲",
  rate: .25,
  url: "9-2",
  anim_1: "tao_2",
  anim_2: "tao_daiji_2"
}, {
  name: "emo叔",
  price: 1e10,
  info: "有人跟风玩梗 有人苦在其中",
  rate: .2,
  url: "9-3",
  anim_1: "tao_3",
  anim_2: "tao_daiji_3"
}, {
  name: "策划内裤",
  price: 50,
  info: "都被穿坏的内裤,值不了几个钱",
  rate: .3,
  url: "9-4",
  anim_1: "tao_4",
  anim_2: "tao_daiji_4"
}];
exports.BanquetOtherCfg = {
  lastFoodMoveUnit: 30,
  eggShowText1: "大哥，借一步说话",
  eggShowText2: "大哥，之前游戏做的不好是我的问题，我今天大喜的日子，麻烦给我留点面子哈",
  eggShowText3: "大哥请收好！",
  eggMyShowText: "那你得意思意思一下吧"
};