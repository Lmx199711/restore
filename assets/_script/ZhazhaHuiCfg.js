Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZhazhaHuiPrice = exports.ZhazhaHuiPropCfg = exports.ZhazhaHuiLevelCfg = exports.ZhazhaHuiActionCfg = undefined;
exports.ZhazhaHuiActionCfg = {
  role: {
    power: 5,
    level: 1
  },
  monter0: {
    power: 5,
    level: 1,
    dorp: [{
      pr: 50,
      propId: 1
    }, {
      pr: 30,
      propId: 2
    }, {
      pr: 20,
      propId: 3
    }],
    dorpPos: [{
      x: 0,
      y: 120
    }, {
      x: -120,
      y: 120
    }, {
      x: 120,
      y: 120
    }]
  },
  monter1: {
    power: 200,
    level: 3,
    dorp: [{
      pr: 20,
      propId: 1
    }, {
      pr: 50,
      propId: 2
    }, {
      pr: 30,
      propId: 3
    }],
    dorpPos: [{
      x: 50,
      y: 120
    }, {
      x: -70,
      y: 120
    }, {
      x: 170,
      y: 120
    }]
  },
  monter2: {
    power: 9999,
    level: 7,
    dorp: [{
      pr: 100,
      propId: 4
    }],
    dorpPos: [{
      x: 300,
      y: 20
    }]
  },
  nvren: {
    power: 8888,
    level: 6
  }
};
exports.ZhazhaHuiLevelCfg = {
  1: 5,
  2: 50,
  3: 200,
  4: 1e3,
  5: 5e3,
  6: 8888,
  7: 99999
};
exports.ZhazhaHuiPropCfg = {
  1: {
    id: 1,
    name: "蓝宝石",
    type: 0,
    pr: .3
  },
  2: {
    id: 2,
    name: "紫宝石",
    type: 0,
    pr: .5
  },
  3: {
    id: 3,
    name: "红宝石",
    type: 0,
    pr: 1
  },
  4: {
    id: 4,
    name: "复活药水",
    type: 1,
    pr: 1
  },
  5: {
    id: 5,
    name: "宝箱",
    type: 2,
    pr: [{
      pr: 20,
      id: 1
    }, {
      pr: 30,
      id: 2
    }, {
      pr: 50,
      id: 3
    }],
    dorpPos: [{
      x: 0,
      y: 100
    }, {
      x: 100,
      y: 0
    }, {
      x: -100,
      y: 0
    }]
  }
};
exports.ZhazhaHuiPrice = 2e6;