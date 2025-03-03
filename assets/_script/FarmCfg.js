Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyReward = exports.BKJingCui = exports.BKMoney = exports.farmStrengthMax = exports.strenghtTime = exports.landDroughtTime = exports.SMTime = exports.OpenCardCountSSR = exports.OpenCardInterval = exports.OpenCardCost = exports.OpenCardSeedNum = exports.LandValue = exports.PropCfg = exports.MarkCfg = exports.FarmCfg = undefined;
exports.FarmCfg = [{
  id: 1,
  name: "青龙",
  item: "青龙",
  price: 5e6,
  lv: "SSR",
  ripeTime: 900,
  mark: 1001,
  rate: 1,
  markRate: .04
}, {
  id: 2,
  name: "朱雀",
  item: "朱雀",
  price: 5e6,
  lv: "SSR",
  ripeTime: 900,
  mark: 1002,
  rate: 1,
  markRate: .03
}, {
  id: 3,
  name: "白虎",
  item: "白虎",
  price: 5e6,
  lv: "SSR",
  ripeTime: 900,
  mark: 1003,
  rate: 1,
  markRate: .02
}, {
  id: 4,
  name: "玄武",
  item: "玄武",
  price: 5e6,
  lv: "SSR",
  ripeTime: 900,
  mark: 1004,
  rate: 1,
  markRate: .01
}, {
  id: 5,
  name: "GG棒",
  item: "GG棒",
  price: 12e5,
  lv: "SR",
  ripeTime: 600,
  mark: 0,
  rate: 3,
  markRate: 0
}, {
  id: 6,
  name: "玲珑塔",
  item: "玲珑塔",
  price: 15e5,
  lv: "SR",
  ripeTime: 600,
  mark: 0,
  rate: 3,
  markRate: 0
}, {
  id: 7,
  name: "神之锤",
  item: "雷神之锤",
  price: 168e4,
  lv: "SR",
  ripeTime: 600,
  mark: 0,
  rate: 3,
  markRate: 0
}, {
  id: 8,
  name: "福袋",
  item: "福袋",
  price: 188e4,
  lv: "SR",
  ripeTime: 600,
  mark: 0,
  rate: 3,
  markRate: 0
}, {
  id: 9,
  name: "跑车",
  item: "法拉利",
  price: 128e4,
  lv: "SR",
  ripeTime: 600,
  mark: 0,
  rate: 3,
  markRate: 0
}, {
  id: 10,
  name: "包包",
  item: "Lv包包",
  price: 1e6,
  lv: "SR",
  ripeTime: 600,
  mark: 0,
  rate: 3,
  markRate: 0
}, {
  id: 11,
  name: "猫咪",
  item: "猫咪",
  price: 28e4,
  lv: "R",
  ripeTime: 360,
  mark: 0,
  rate: 8,
  markRate: 0
}, {
  id: 12,
  name: "奶茶",
  item: "奶茶",
  price: 15e4,
  lv: "R",
  ripeTime: 360,
  mark: 0,
  rate: 8,
  markRate: 0
}, {
  id: 13,
  name: "手机",
  item: "手机",
  price: 3e5,
  lv: "R",
  ripeTime: 360,
  mark: 0,
  rate: 8,
  markRate: 0
}, {
  id: 14,
  name: "元宝",
  item: "元宝",
  price: 18e4,
  lv: "R",
  ripeTime: 360,
  mark: 0,
  rate: 8,
  markRate: 0
}, {
  id: 15,
  name: "锤子",
  item: "锤子",
  price: 22e4,
  lv: "R",
  ripeTime: 360,
  mark: 0,
  rate: 8,
  markRate: 0
}, {
  id: 16,
  name: "脚丫子",
  item: "脚掌",
  price: 26e4,
  lv: "R",
  ripeTime: 360,
  mark: 0,
  rate: 8,
  markRate: 0
}, {
  id: 17,
  name: "熊猫",
  item: "小熊猫",
  price: 14e4,
  lv: "R",
  ripeTime: 360,
  mark: 0,
  rate: 8,
  markRate: 0
}, {
  id: 18,
  name: "爱心",
  item: "爱心",
  price: 11e4,
  lv: "R",
  ripeTime: 360,
  mark: 0,
  rate: 7,
  markRate: 0
}, {
  id: 19,
  name: "坤坤",
  item: "坤坤球",
  price: 12e4,
  lv: "R",
  ripeTime: 360,
  mark: 0,
  rate: 8,
  markRate: 0
}, {
  id: 20,
  name: "狗头",
  item: "狗头",
  price: 1e5,
  lv: "R",
  ripeTime: 360,
  mark: 0,
  rate: 7,
  markRate: 0
}];
exports.MarkCfg = [{
  id: 1001,
  name: "青龙印",
  price: 5e6,
  lv: "SSR"
}, {
  id: 1002,
  name: "朱雀印",
  price: 5e6,
  lv: "SSR"
}, {
  id: 1003,
  name: "白虎印",
  price: 5e6,
  lv: "SSR"
}, {
  id: 1004,
  name: "玄武印",
  price: 5e6,
  lv: "SSR"
}];
exports.PropCfg = [{
  id: 2001,
  name: "六芒星玉",
  price: 1e10,
  lv: "SSR"
}];
exports.LandValue = [0, 0, 0, 0, 0, 1e6, -1, -1, -1, -1, -1, -1, -1, -1];
exports.OpenCardSeedNum = 5;
exports.OpenCardCost = 1e5;
exports.OpenCardInterval = 600;
exports.OpenCardCountSSR = 50;
exports.SMTime = 300;
exports.landDroughtTime = 600;
exports.strenghtTime = 300;
exports.farmStrengthMax = 15;
exports.BKMoney = 1e5;
exports.BKJingCui = 1e3;
exports.DailyReward = [{
  id: 19,
  num: 5
}, {
  id: 20,
  num: 5
}];