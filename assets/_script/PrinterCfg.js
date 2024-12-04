var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuyInkInfo = exports.LeastQuality = exports.PrinterInfo = exports.CardGroupReward = exports.CardInfo = exports.CollectInfo = exports.CardQuality = exports.CardType = exports.PrinterType = undefined;
(function (e) {
  e[e["老旧的打印机"] = 0] = "老旧的打印机";
  e[e["普通打印机"] = 1] = "普通打印机";
  e[e["激光打印机"] = 2] = "激光打印机";
})(exports.PrinterType || (exports.PrinterType = {}));
(function (e) {
  e[e["甜美"] = 0] = "甜美";
  e[e["御姐"] = 1] = "御姐";
  e[e["古风"] = 2] = "古风";
})(exports.CardType || (exports.CardType = {}));
(function (e) {
  e[e.N = 0] = "N";
  e[e.NR = 1] = "NR";
  e[e.R = 2] = "R";
  e[e.SR = 3] = "SR";
  e[e.SSR = 4] = "SSR";
  e[e.UR = 5] = "UR";
})(i = exports.CardQuality || (exports.CardQuality = {}));
exports.CollectInfo = [{
  name: "青铜",
  score: 0,
  reward: 0
}, {
  name: "白银",
  score: 2001,
  reward: 2e4
}, {
  name: "黄金",
  score: 4001,
  reward: 3e4
}, {
  name: "铂金",
  score: 6001,
  reward: 4e4
}, {
  name: "钻石",
  score: 8001,
  reward: 5e4
}, {
  name: "王者",
  score: 1e4,
  reward: 6e4
}];
exports.CardInfo = [{
  score: 0,
  count: 2,
  sell: 10
}, {
  score: 0,
  count: 2,
  sell: 40
}, {
  score: 100,
  count: 5,
  sell: 400
}, {
  score: 300,
  count: 3,
  sell: 4e3
}, {
  score: 500,
  count: 2,
  sell: 4e4
}, {
  score: 1e3,
  count: 1,
  sell: 4e5
}];
exports.CardGroupReward = {
  sell: 1e6,
  finish: 8e5
};
exports.PrinterInfo = [{
  rate: [.565, .351, .08, .004, 0, 0],
  cost: 100,
  unlockCost: 0
}, {
  rate: [.474, .426, .08, .016, .004, 0],
  cost: 500,
  unlockCost: 2e3
}, {
  rate: [.423, .465, .085, .0186, .0074, .001],
  cost: 2e3,
  unlockCost: 2
}];
exports.LeastQuality = [{
  count: [10],
  quality: [[i.R]],
  rate: [[1]]
}, {
  count: [10, 40],
  quality: [[i.R], [i.SR]],
  rate: [[1], [1]]
}, {
  count: [10, 40, 80],
  quality: [[i.R], [i.SR], [i.SSR, i.UR]],
  rate: [[1], [1], [.8, .2]]
}];
exports.BuyInkInfo = [{
  count: 1,
  cost: 0
}, {
  count: 10,
  cost: 2
}, {
  count: 50,
  cost: 1e4
}, {
  count: 100,
  cost: 1e4
}];