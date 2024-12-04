Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitLayerCoeff = exports.BitLeveCoin = exports.BitLeveOilLoss = exports.BitLeveMoveSpeed = exports.BitPropConfig = undefined;
exports.BitPropConfig = {
  2001: {
    id: 2001,
    type: 0,
    name: "小石油1",
    desc: "三千年前是一家",
    count: 20,
    time: 0,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  2002: {
    id: 2002,
    type: 0,
    name: "小石油2",
    desc: "三千年前是一家",
    count: 20,
    time: 0,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  2003: {
    id: 2003,
    type: 0,
    name: "小石油3",
    desc: "三千年前是一家",
    count: 20,
    time: 0,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  2004: {
    id: 2004,
    type: 0,
    name: "中石油1",
    desc: "三千年前是一家",
    count: 40,
    time: 0,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  2005: {
    id: 2005,
    type: 0,
    name: "中石油2",
    desc: "三千年前是一家",
    count: 40,
    time: 0,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  2006: {
    id: 2006,
    type: 0,
    name: "大石油1",
    desc: "三千年前是一家",
    count: 60,
    time: 0,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  3001: {
    id: 3001,
    type: 1,
    name: "石头1",
    desc: "三千年前是一家",
    count: 80,
    time: 1.5,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  3002: {
    id: 3002,
    type: 1,
    name: "石头2",
    desc: "三千年前是一家",
    count: 80,
    time: 1.5,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  3003: {
    id: 3003,
    type: 1,
    name: "汽车轮胎",
    desc: "三千年前是一家",
    count: 80,
    time: 1.5,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  3004: {
    id: 3004,
    type: 1,
    name: "火车残骸",
    desc: "三千年前是一家",
    count: 120,
    time: 2,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  3005: {
    id: 3005,
    type: 1,
    name: "飞机残骸1",
    desc: "三千年前是一家",
    count: 120,
    time: 2,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  3006: {
    id: 3006,
    type: 1,
    name: "大理石残骸",
    desc: "三千年前是一家",
    count: 100,
    time: 2,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  3007: {
    id: 3007,
    type: 1,
    name: "罐子",
    desc: "三千年前是一家",
    count: 80,
    time: 1.5,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  3008: {
    id: 3008,
    type: 1,
    name: "飞机残骸2",
    desc: "三千年前是一家",
    count: 100,
    time: 2,
    shoot: 0,
    shootType: 0,
    isCoefficient: false,
    waitTime: 0
  },
  4001: {
    id: 4001,
    type: 2,
    name: "核弹",
    desc: "挖爆残留核弹，钻头受损无法继续下探。",
    count: 0,
    time: 0,
    shoot: 1,
    shootType: 1,
    isCoefficient: false,
    waitTime: 1
  },
  5001: {
    id: 5001,
    type: 4,
    name: "水管",
    desc: "糟糕，地下水管被挖断！",
    count: 2e6,
    time: 0,
    shoot: 1,
    shootType: 2,
    isCoefficient: false,
    waitTime: .5
  },
  5002: {
    id: 5002,
    type: 4,
    name: "垃圾袋",
    desc: "挖出臭烘烘的垃圾，生态环境被污染！",
    count: 5e5,
    time: 0,
    shoot: 1,
    shootType: 2,
    isCoefficient: false,
    waitTime: .5
  },
  5003: {
    id: 5003,
    type: 4,
    name: "蛇蛋",
    desc: "动物栖息地被无情破坏！",
    count: 1e6,
    time: 0,
    shoot: 1,
    shootType: 2,
    isCoefficient: false,
    waitTime: .5
  },
  5004: {
    id: 5004,
    type: 4,
    name: "毒气桶",
    desc: "大事不好，毒气正在扩散！",
    count: 1e7,
    time: 0,
    shoot: 1,
    shootType: 2,
    isCoefficient: false,
    waitTime: 0
  },
  6001: {
    id: 6001,
    type: 5,
    name: "黄金",
    desc: "24K纯金，有人出高价收藏！",
    count: 1e6,
    time: 0,
    shoot: 1,
    shootType: 0,
    isCoefficient: true,
    waitTime: 0
  },
  6002: {
    id: 6002,
    type: 5,
    name: "钻石",
    desc: "极品钻石，富豪争先恐后收购！",
    count: 3e6,
    time: 0,
    shoot: 1,
    shootType: 0,
    isCoefficient: true,
    waitTime: 0
  },
  6003: {
    id: 6003,
    type: 5,
    name: "玉如意",
    desc: "古代皇宫至宝，博物馆出高价收藏！",
    count: 5e6,
    time: 0,
    shoot: 1,
    shootType: 0,
    isCoefficient: true,
    waitTime: 0
  },
  6004: {
    id: 6004,
    type: 5,
    name: "恐龙化石",
    desc: "侏罗纪时期的珍贵化石，有神秘组织高价购买！",
    count: 8e6,
    time: 0,
    shoot: 1,
    shootType: 0,
    isCoefficient: true,
    waitTime: 0
  },
  6005: {
    id: 6005,
    type: 5,
    name: "青花瓷",
    desc: "清朝皇室御用瓷器，有豪门少爷出天价购买！",
    count: 6e6,
    time: 0,
    shoot: 1,
    shootType: 0,
    isCoefficient: true,
    waitTime: 0
  },
  7001: {
    id: 7001,
    type: 6,
    name: "蠕虫",
    desc: "三千年前是一家",
    count: 0,
    time: 2,
    shoot: 0,
    shootType: 0,
    isCoefficient: true,
    waitTime: 0
  },
  7002: {
    id: 7002,
    type: 7,
    name: "蝙蝠",
    desc: "三千年前是一家",
    count: 0,
    time: 2.5,
    shoot: 0,
    shootType: 0,
    isCoefficient: true,
    waitTime: 0
  },
  8001: {
    id: 8001,
    type: 9,
    name: "燃料瓶",
    desc: "3秒内不消耗燃料！",
    count: 0,
    time: 3,
    shoot: 1,
    shootType: 3,
    isCoefficient: true,
    waitTime: 0
  },
  8002: {
    id: 8002,
    type: 8,
    name: "发动机",
    desc: "3秒内速度提高100%！",
    count: 200,
    time: 3,
    shoot: 1,
    shootType: 3,
    isCoefficient: true,
    waitTime: 0
  },
  101: {
    id: 101,
    type: 5,
    name: "太空",
    desc: "意外发现通往太空的神秘通道！",
    count: 8e5,
    time: 2,
    shoot: 1,
    shootType: 0,
    isCoefficient: true,
    waitTime: 0
  },
  102: {
    id: 102,
    type: 5,
    name: "兵马俑",
    desc: "发现古代遗迹，极具考古价值！",
    count: 1e6,
    time: 2,
    shoot: 1,
    shootType: 0,
    isCoefficient: true,
    waitTime: 0
  },
  103: {
    id: 103,
    type: 4,
    name: "恐龙",
    desc: "危险！放出沉睡在地底的恐龙！",
    count: 6e5,
    time: 2,
    shoot: 1,
    shootType: 2,
    isCoefficient: true,
    waitTime: 0
  },
  104: {
    id: 104,
    type: 4,
    name: "火山",
    desc: "挖穿地底，使火山爆发！",
    count: 12e5,
    time: 2,
    shoot: 1,
    shootType: 2,
    isCoefficient: true,
    waitTime: 0
  },
  999: {
    id: 999,
    type: 8,
    name: "没油了",
    desc: "补充燃料，继续挖掘！",
    shootType: 4,
    count: 0,
    shoot: 1,
    time: 0,
    isCoefficient: false,
    waitTime: 0
  },
  9999: {
    id: 9999,
    type: 0,
    name: "金刚钻",
    desc: "普通钻头升级为金刚钻无视障碍物减速效果",
    count: 0,
    time: 0,
    shoot: 0,
    shootType: 5,
    isCoefficient: false,
    waitTime: 0
  }
};
exports.BitLeveMoveSpeed = {
  0: {
    level: 0,
    moveSpeed: 200,
    nextLevel: "1",
    upPrice: 1e5
  },
  1: {
    level: 1,
    moveSpeed: 205,
    nextLevel: "2",
    upPrice: 25e4
  },
  2: {
    level: 2,
    moveSpeed: 210,
    nextLevel: "3",
    upPrice: 4e5
  },
  3: {
    level: 3,
    moveSpeed: 215,
    nextLevel: "4",
    upPrice: 6e5
  },
  4: {
    level: 4,
    moveSpeed: 220,
    nextLevel: "5",
    upPrice: 8e5
  },
  5: {
    level: 5,
    moveSpeed: 225,
    nextLevel: "6",
    upPrice: 1e6
  },
  6: {
    level: 6,
    moveSpeed: 230,
    nextLevel: "7",
    upPrice: 12e5
  },
  7: {
    level: 7,
    moveSpeed: 235,
    nextLevel: "8",
    upPrice: 14e5
  },
  8: {
    level: 8,
    moveSpeed: 240,
    nextLevel: "9",
    upPrice: 16e5
  },
  9: {
    level: 9,
    moveSpeed: 245,
    nextLevel: "10",
    upPrice: 18e5
  },
  10: {
    level: 10,
    moveSpeed: 250,
    nextLevel: "11",
    upPrice: 2e6
  },
  11: {
    level: 11,
    moveSpeed: 255,
    nextLevel: "12",
    upPrice: 22e5
  },
  12: {
    level: 12,
    moveSpeed: 260,
    nextLevel: "13",
    upPrice: 24e5
  },
  13: {
    level: 13,
    moveSpeed: 265,
    nextLevel: "14",
    upPrice: 26e5
  },
  14: {
    level: 14,
    moveSpeed: 270,
    nextLevel: "15",
    upPrice: 28e5
  },
  15: {
    level: 15,
    moveSpeed: 275,
    nextLevel: "16",
    upPrice: 3e6
  },
  16: {
    level: 16,
    moveSpeed: 280,
    nextLevel: "17",
    upPrice: 32e5
  },
  17: {
    level: 17,
    moveSpeed: 285,
    nextLevel: "18",
    upPrice: 34e5
  },
  18: {
    level: 17,
    moveSpeed: 290,
    nextLevel: "19",
    upPrice: 36e5
  },
  19: {
    level: 19,
    moveSpeed: 295,
    nextLevel: "20",
    upPrice: 38e5
  },
  20: {
    level: 20,
    moveSpeed: 300,
    nextLevel: "21",
    upPrice: 4e6
  },
  21: {
    level: 21,
    moveSpeed: 305,
    nextLevel: "22",
    upPrice: 42e5
  },
  22: {
    level: 22,
    moveSpeed: 310,
    nextLevel: "23",
    upPrice: 45e5
  },
  23: {
    level: 23,
    moveSpeed: 315,
    nextLevel: "24",
    upPrice: 48e5
  },
  24: {
    level: 24,
    moveSpeed: 320,
    nextLevel: "25",
    upPrice: 51e5
  },
  25: {
    level: 25,
    moveSpeed: 325,
    nextLevel: "26",
    upPrice: 54e5
  },
  26: {
    level: 26,
    moveSpeed: 330,
    nextLevel: "27",
    upPrice: 6e6
  },
  27: {
    level: 27,
    moveSpeed: 335,
    nextLevel: "28",
    upPrice: 65e5
  },
  28: {
    level: 28,
    moveSpeed: 340,
    nextLevel: "29",
    upPrice: 7e6
  },
  29: {
    level: 29,
    moveSpeed: 345,
    nextLevel: "30",
    upPrice: 8e6
  },
  30: {
    level: 30,
    moveSpeed: 350,
    nextLevel: "31",
    upPrice: 9e6
  },
  31: {
    level: 31,
    moveSpeed: 355,
    nextLevel: "32",
    upPrice: 1e7
  },
  32: {
    level: 32,
    moveSpeed: 360,
    nextLevel: "33",
    upPrice: 15e6
  },
  33: {
    level: 33,
    moveSpeed: 365,
    nextLevel: "34",
    upPrice: 2e7
  },
  34: {
    level: 34,
    moveSpeed: 370,
    nextLevel: "35",
    upPrice: 25e6
  },
  35: {
    level: 35,
    moveSpeed: 375,
    nextLevel: "36",
    upPrice: 3e7
  },
  36: {
    level: 36,
    moveSpeed: 380,
    nextLevel: "37",
    upPrice: 4e7
  },
  37: {
    level: 37,
    moveSpeed: 385,
    nextLevel: "38",
    upPrice: 5e7
  },
  38: {
    level: 38,
    moveSpeed: 390,
    nextLevel: "39",
    upPrice: 6e7
  },
  39: {
    level: 39,
    moveSpeed: 395,
    nextLevel: "40",
    upPrice: 7e7
  },
  40: {
    level: 40,
    moveSpeed: 400,
    nextLevel: "41",
    upPrice: 8e7
  },
  41: {
    level: 41,
    moveSpeed: 405,
    nextLevel: "42",
    upPrice: 9e7
  },
  42: {
    level: 42,
    moveSpeed: 410,
    nextLevel: "43",
    upPrice: 1e8
  },
  43: {
    level: 43,
    moveSpeed: 415,
    nextLevel: "44",
    upPrice: 15e7
  },
  44: {
    level: 44,
    moveSpeed: 420,
    nextLevel: "45",
    upPrice: 2e8
  },
  45: {
    level: 45,
    moveSpeed: 425,
    nextLevel: "46",
    upPrice: 25e7
  },
  46: {
    level: 46,
    moveSpeed: 430,
    nextLevel: "47",
    upPrice: 3e8
  },
  47: {
    level: 47,
    moveSpeed: 435,
    nextLevel: "48",
    upPrice: 4e8
  },
  48: {
    level: 48,
    moveSpeed: 440,
    nextLevel: "49",
    upPrice: 5e8
  },
  49: {
    level: 49,
    moveSpeed: 445,
    nextLevel: "50",
    upPrice: 6e8
  },
  50: {
    level: 50,
    moveSpeed: 450,
    nextLevel: "max",
    upPrice: 7e8
  }
};
exports.BitLeveOilLoss = {
  0: {
    level: 0,
    oilLoss: 8,
    nextLevel: "1",
    upPrice: 1e5
  },
  1: {
    level: 1,
    oilLoss: 7.95,
    nextLevel: "2",
    upPrice: 25e4
  },
  2: {
    level: 2,
    oilLoss: 7.9,
    nextLevel: "3",
    upPrice: 4e5
  },
  3: {
    level: 3,
    oilLoss: 7.85,
    nextLevel: "4",
    upPrice: 6e5
  },
  4: {
    level: 4,
    oilLoss: 7.8,
    nextLevel: "5",
    upPrice: 8e5
  },
  5: {
    level: 5,
    oilLoss: 7.75,
    nextLevel: "6",
    upPrice: 1e6
  },
  6: {
    level: 6,
    oilLoss: 7.7,
    nextLevel: "7",
    upPrice: 12e5
  },
  7: {
    level: 7,
    oilLoss: 7.65,
    nextLevel: "8",
    upPrice: 14e5
  },
  8: {
    level: 8,
    oilLoss: 7.6,
    nextLevel: "9",
    upPrice: 16e5
  },
  9: {
    level: 9,
    oilLoss: 7.55,
    nextLevel: "10",
    upPrice: 18e5
  },
  10: {
    level: 10,
    oilLoss: 7.5,
    nextLevel: "11",
    upPrice: 2e6
  },
  11: {
    level: 11,
    oilLoss: 7.45,
    nextLevel: "12",
    upPrice: 23e5
  },
  12: {
    level: 12,
    oilLoss: 7.4,
    nextLevel: "11",
    upPrice: 26e5
  },
  13: {
    level: 13,
    oilLoss: 7.3,
    nextLevel: "14",
    upPrice: 3e6
  },
  14: {
    level: 14,
    oilLoss: 7.2,
    nextLevel: "15",
    upPrice: 35e5
  },
  15: {
    level: 15,
    oilLoss: 7.1,
    nextLevel: "16",
    upPrice: 4e6
  },
  16: {
    level: 16,
    oilLoss: 7,
    nextLevel: "17",
    upPrice: 45e5
  },
  17: {
    level: 17,
    oilLoss: 6.9,
    nextLevel: "18",
    upPrice: 5e6
  },
  18: {
    level: 18,
    oilLoss: 6.8,
    nextLevel: "19",
    upPrice: 55e5
  },
  19: {
    level: 19,
    oilLoss: 6.7,
    nextLevel: "20",
    upPrice: 6e6
  },
  20: {
    level: 20,
    oilLoss: 6.6,
    nextLevel: "21",
    upPrice: 65e5
  },
  21: {
    level: 21,
    oilLoss: 6.5,
    nextLevel: "22",
    upPrice: 7e6
  },
  22: {
    level: 22,
    oilLoss: 6.4,
    nextLevel: "23",
    upPrice: 75e5
  },
  23: {
    level: 23,
    oilLoss: 6.3,
    nextLevel: "23",
    upPrice: 8e6
  },
  24: {
    level: 24,
    oilLoss: 6.2,
    nextLevel: "25",
    upPrice: 9e6
  },
  25: {
    level: 25,
    oilLoss: 6.1,
    nextLevel: "26",
    upPrice: 1e7
  },
  26: {
    level: 26,
    oilLoss: 6,
    nextLevel: "27",
    upPrice: 11e6
  },
  27: {
    level: 27,
    oilLoss: 5.9,
    nextLevel: "28",
    upPrice: 12e6
  },
  28: {
    level: 28,
    oilLoss: 5.8,
    nextLevel: "29",
    upPrice: 14e6
  },
  29: {
    level: 29,
    oilLoss: 5.7,
    nextLevel: "30",
    upPrice: 16e6
  },
  30: {
    level: 30,
    oilLoss: 5.6,
    nextLevel: "31",
    upPrice: 2e7
  },
  31: {
    level: 31,
    oilLoss: 5.5,
    nextLevel: "32",
    upPrice: 25e6
  },
  32: {
    level: 32,
    oilLoss: 5.4,
    nextLevel: "33",
    upPrice: 3e7
  },
  33: {
    level: 33,
    oilLoss: 5.3,
    nextLevel: "34",
    upPrice: 4e7
  },
  34: {
    level: 34,
    oilLoss: 5.2,
    nextLevel: "35",
    upPrice: 5e7
  },
  35: {
    level: 35,
    oilLoss: 5.05,
    nextLevel: "36",
    upPrice: 6e7
  },
  36: {
    level: 36,
    oilLoss: 4.9,
    nextLevel: "37",
    upPrice: 75e6
  },
  37: {
    level: 37,
    oilLoss: 4.75,
    nextLevel: "38",
    upPrice: 9e7
  },
  38: {
    level: 38,
    oilLoss: 4.6,
    nextLevel: "39",
    upPrice: 11e7
  },
  39: {
    level: 39,
    oilLoss: 4.45,
    nextLevel: "40",
    upPrice: 13e7
  },
  40: {
    level: 40,
    oilLoss: 4.3,
    nextLevel: "41",
    upPrice: 15e7
  },
  41: {
    level: 41,
    oilLoss: 4.1,
    nextLevel: "42",
    upPrice: 17e7
  },
  42: {
    level: 42,
    oilLoss: 3.9,
    nextLevel: "43",
    upPrice: 2e8
  },
  43: {
    level: 43,
    oilLoss: 3.7,
    nextLevel: "44",
    upPrice: 23e7
  },
  44: {
    level: 44,
    oilLoss: 3.5,
    nextLevel: "45",
    upPrice: 25e7
  },
  45: {
    level: 45,
    oilLoss: 3.2,
    nextLevel: "46",
    upPrice: 28e7
  },
  46: {
    level: 46,
    oilLoss: 3,
    nextLevel: "47",
    upPrice: 32e7
  },
  47: {
    level: 47,
    oilLoss: 2.8,
    nextLevel: "48",
    upPrice: 4e8
  },
  48: {
    level: 48,
    oilLoss: 2.6,
    nextLevel: "49",
    upPrice: 5e8
  },
  49: {
    level: 49,
    oilLoss: 2.4,
    nextLevel: "50",
    upPrice: 6e8
  },
  50: {
    level: 50,
    oilLoss: 2.2,
    nextLevel: "max",
    upPrice: 8e8
  }
};
exports.BitLeveCoin = {
  0: {
    level: 0,
    coefficient: 1,
    nextLevel: "1",
    upPrice: 1e5
  },
  1: {
    level: 1,
    coefficient: 1.5,
    nextLevel: "2",
    upPrice: 25e4
  },
  2: {
    level: 2,
    coefficient: 2,
    nextLevel: "3",
    upPrice: 4e5
  },
  3: {
    level: 3,
    coefficient: 2.5,
    nextLevel: "4",
    upPrice: 6e5
  },
  4: {
    level: 4,
    coefficient: 3,
    nextLevel: "5",
    upPrice: 8e5
  },
  5: {
    level: 5,
    coefficient: 3.5,
    nextLevel: "6",
    upPrice: 1e6
  },
  6: {
    level: 6,
    coefficient: 4,
    nextLevel: "7",
    upPrice: 12e5
  },
  7: {
    level: 7,
    coefficient: 4.5,
    nextLevel: "8",
    upPrice: 14e5
  },
  8: {
    level: 8,
    coefficient: 5,
    nextLevel: "9",
    upPrice: 16e5
  },
  9: {
    level: 9,
    coefficient: 5.5,
    nextLevel: "10",
    upPrice: 18e5
  },
  10: {
    level: 10,
    coefficient: 6,
    nextLevel: "11",
    upPrice: 2e6
  },
  11: {
    level: 11,
    coefficient: 6.5,
    nextLevel: "12",
    upPrice: 22e5
  },
  12: {
    level: 12,
    coefficient: 7,
    nextLevel: "13",
    upPrice: 24e5
  },
  13: {
    level: 13,
    coefficient: 7.5,
    nextLevel: "14",
    upPrice: 26e5
  },
  14: {
    level: 14,
    coefficient: 8,
    nextLevel: "15",
    upPrice: 28e5
  },
  15: {
    level: 15,
    coefficient: 8.5,
    nextLevel: "16",
    upPrice: 3e6
  },
  16: {
    level: 16,
    coefficient: 9,
    nextLevel: "17",
    upPrice: 33e5
  },
  17: {
    level: 17,
    coefficient: 9.5,
    nextLevel: "18",
    upPrice: 36e5
  },
  18: {
    level: 18,
    coefficient: 10,
    nextLevel: "19",
    upPrice: 4e6
  },
  19: {
    level: 19,
    coefficient: 10.5,
    nextLevel: "20",
    upPrice: 45e5
  },
  20: {
    level: 20,
    coefficient: 11,
    nextLevel: "21",
    upPrice: 5e6
  },
  21: {
    level: 21,
    coefficient: 11.5,
    nextLevel: "22",
    upPrice: 55e5
  },
  22: {
    level: 22,
    coefficient: 12,
    nextLevel: "23",
    upPrice: 6e6
  },
  23: {
    level: 23,
    coefficient: 12.5,
    nextLevel: "24",
    upPrice: 65e5
  },
  24: {
    level: 24,
    coefficient: 13,
    nextLevel: "25",
    upPrice: 7e6
  },
  25: {
    level: 25,
    coefficient: 13.5,
    nextLevel: "26",
    upPrice: 8e6
  },
  26: {
    level: 26,
    coefficient: 14,
    nextLevel: "27",
    upPrice: 9e6
  },
  27: {
    level: 27,
    coefficient: 15,
    nextLevel: "28",
    upPrice: 1e7
  },
  28: {
    level: 28,
    coefficient: 16,
    nextLevel: "29",
    upPrice: 12e6
  },
  29: {
    level: 29,
    coefficient: 17,
    nextLevel: "30",
    upPrice: 14e6
  },
  30: {
    level: 30,
    coefficient: 18,
    nextLevel: "31",
    upPrice: 16e6
  },
  31: {
    level: 31,
    coefficient: 19,
    nextLevel: "32",
    upPrice: 2e7
  },
  32: {
    level: 32,
    coefficient: 20,
    nextLevel: "33",
    upPrice: 25e6
  },
  33: {
    level: 33,
    coefficient: 21,
    nextLevel: "34",
    upPrice: 3e7
  },
  34: {
    level: 34,
    coefficient: 22,
    nextLevel: "35",
    upPrice: 4e7
  },
  35: {
    level: 35,
    coefficient: 23,
    nextLevel: "36",
    upPrice: 6e7
  },
  36: {
    level: 36,
    coefficient: 24,
    nextLevel: "37",
    upPrice: 9e7
  },
  37: {
    level: 37,
    coefficient: 25,
    nextLevel: "38",
    upPrice: 1e8
  },
  38: {
    level: 38,
    coefficient: 26,
    nextLevel: "39",
    upPrice: 12e7
  },
  39: {
    level: 39,
    coefficient: 27,
    nextLevel: "40",
    upPrice: 14e7
  },
  40: {
    level: 40,
    coefficient: 28,
    nextLevel: "41",
    upPrice: 16e7
  },
  41: {
    level: 41,
    coefficient: 29,
    nextLevel: "42",
    upPrice: 18e7
  },
  42: {
    level: 42,
    coefficient: 30,
    nextLevel: "43",
    upPrice: 2e8
  },
  43: {
    level: 43,
    coefficient: 31,
    nextLevel: "44",
    upPrice: 23e7
  },
  44: {
    level: 44,
    coefficient: 32,
    nextLevel: "45",
    upPrice: 26e7
  },
  45: {
    level: 45,
    coefficient: 33,
    nextLevel: "46",
    upPrice: 3e8
  },
  46: {
    level: 46,
    coefficient: 34,
    nextLevel: "47",
    upPrice: 35e7
  },
  47: {
    level: 47,
    coefficient: 35,
    nextLevel: "48",
    upPrice: 4e8
  },
  48: {
    level: 48,
    coefficient: 36,
    nextLevel: "49",
    upPrice: 5e8
  },
  49: {
    level: 49,
    coefficient: 37,
    nextLevel: "50",
    upPrice: 6e8
  },
  50: {
    level: 50,
    coefficient: 38,
    nextLevel: "max",
    upPrice: 8e8
  }
};
exports.BitLayerCoeff = [.01, .01, .02, .03, .03, .04, .04, .05];