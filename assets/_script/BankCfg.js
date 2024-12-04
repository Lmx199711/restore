Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BankDayCfg = exports.BankCfg = undefined;
exports.BankCfg = {
  1: {
    id: 1,
    day: 1,
    coin: [1e3, 9999],
    pr: 20,
    unit: "元"
  },
  2: {
    id: 2,
    day: 2,
    coin: [10, 200],
    pr: 20,
    unit: "万"
  },
  3: {
    id: 3,
    day: 3,
    coin: [50, 500],
    pr: 20,
    unit: "万"
  },
  4: {
    id: 4,
    day: 4,
    coin: [100, 800],
    pr: 20,
    unit: "万"
  },
  5: {
    id: 5,
    day: 5,
    coin: [500, 999],
    pr: 20,
    unit: "万"
  },
  6: {
    id: 6,
    day: 4,
    coin: [500, 2e3],
    pr: 1,
    unit: "万"
  },
  7: {
    id: 6,
    day: 5,
    coin: [1e3, 3e3],
    pr: 1,
    unit: "万"
  },
  8: {
    id: 6,
    day: 6,
    coin: [2e3, 5e3],
    pr: 1,
    unit: "万"
  },
  9: {
    id: 6,
    day: 5,
    coin: [3e3, 5e3],
    pr: 1,
    unit: "万"
  },
  10: {
    id: 6,
    day: 6,
    coin: [5e3, 8e3],
    pr: 1,
    unit: "万"
  },
  11: {
    id: 6,
    day: 7,
    coin: [7e3, 9999],
    pr: 1,
    unit: "万"
  },
  12: {
    id: 6,
    day: 8,
    coin: [11, 20],
    pr: 1,
    unit: "亿"
  },
  13: {
    id: 6,
    day: 9,
    coin: [21, 60],
    pr: 1,
    unit: "亿"
  },
  14: {
    id: 6,
    day: 10,
    coin: [50, 100],
    pr: 1,
    unit: "亿"
  }
};
exports.BankDayCfg = [{
  days: [2, 5],
  ids: [1, 2, 3, 4, 5]
}, {
  days: [6, 10],
  ids: [6, 7, 8]
}, {
  days: [11, 15],
  ids: [9, 10, 11]
}, {
  days: [15, 9999999],
  ids: [12, 13, 14]
}];