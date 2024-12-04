Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FruitsBubble = exports.FruitsCoeffCfg = exports.FruitsPreCfg = exports.FruitsRandomCfg = exports.FruitsItemCfg = exports.FruitsStepCfg = undefined;
exports.FruitsStepCfg = [{
  group: [0, 1, 2],
  x: -30,
  y: 30
}, {
  group: [0, 3, 4],
  x: 30,
  y: 0
}, {
  group: [0, 1, 3],
  x: 0,
  y: 30
}];
exports.FruitsItemCfg = {
  0: {
    id: 0,
    pr: [{
      id: 0,
      pr: 60
    }, {
      id: 1,
      pr: 40
    }, {
      id: 2,
      pr: 0
    }, {
      id: 3,
      pr: 0
    }],
    price: 5e9
  },
  1: {
    id: 1,
    pr: [{
      id: 0,
      pr: 55
    }, {
      id: 1,
      pr: 45
    }, {
      id: 2,
      pr: 0
    }, {
      id: 3,
      pr: 0
    }],
    price: 1e9
  },
  2: {
    id: 2,
    pr: [{
      id: 0,
      pr: 50
    }, {
      id: 1,
      pr: 50
    }, {
      id: 2,
      pr: 0
    }, {
      id: 3,
      pr: 0
    }],
    price: 3e7
  },
  3: {
    id: 3,
    pr: [{
      id: 0,
      pr: 50
    }, {
      id: 1,
      pr: 50
    }, {
      id: 2,
      pr: 0
    }, {
      id: 3,
      pr: 0
    }],
    price: 5e6
  },
  4: {
    id: 4,
    pr: [{
      id: 0,
      pr: 45
    }, {
      id: 1,
      pr: 55
    }, {
      id: 2,
      pr: 0
    }, {
      id: 3,
      pr: 0
    }],
    price: 1e6
  },
  5: {
    id: 5,
    pr: [{
      id: 0,
      pr: 40
    }, {
      id: 1,
      pr: 60
    }, {
      id: 2,
      pr: 0
    }, {
      id: 3,
      pr: 0
    }],
    price: 5e7
  }
};
exports.FruitsRandomCfg = {
  0: {
    id: 0,
    pr: [[0, 1], [0, 0], [0, 1], [0, 0], [1, 0], [0, 1]]
  },
  1: {
    id: 1,
    pr: [[4, 3], [4, 4], [3, 4], [4, 4], [4, 4], [3, 4]]
  },
  2: {
    id: 1,
    pr: [[2, 1], [3, 2], [0, 1], [2, 0], [4, 2], [3, 1]]
  },
  3: {
    id: 1,
    pr: [[2, 1], [3, 2], [0, 1], [2, 0], [4, 2], [3, 1]]
  },
  4: {
    id: 1,
    pr: [[2, 1], [3, 2], [0, 1], [2, 0], [4, 2], [3, 1]]
  }
};
exports.FruitsPreCfg = {
  0: [{
    type: 0,
    pr: 40
  }, {
    type: 1,
    pr: 35
  }, {
    type: 2,
    pr: 20
  }, {
    type: 3,
    pr: 5
  }],
  1: [{
    type: 0,
    pr: 25
  }, {
    type: 1,
    pr: 35
  }, {
    type: 2,
    pr: 25
  }, {
    type: 3,
    pr: 15
  }],
  2: [{
    type: 0,
    pr: 15
  }, {
    type: 1,
    pr: 25
  }, {
    type: 2,
    pr: 35
  }, {
    type: 3,
    pr: 25
  }],
  3: [{
    type: 0,
    pr: 10
  }, {
    type: 1,
    pr: 20
  }, {
    type: 2,
    pr: 25
  }, {
    type: 3,
    pr: 45
  }],
  4: [{
    type: 0,
    pr: 0
  }, {
    type: 1,
    pr: 20
  }, {
    type: 2,
    pr: 20
  }, {
    type: 3,
    pr: 60
  }]
};
exports.FruitsCoeffCfg = [0, .05, .1, .15];
exports.FruitsBubble = {
  0: ["", "", ""],
  1: ["苍蝇再小也是肉", "这店家也太黑了", "这简直就是榴莲刺客啊", "还好我还没买", "这么小能吃吗", "黑心水果摊呀", "看得让人心疼", "这够塞牙缝吗", "这就我小拇指这么大吧", "找老板赔钱"],
  2: ["这个大小中规中矩吧", "有就知足吧", "有这么大不错了", "这次能回本了", "这也就我一口的量", "看起来很好吃啊", "比小的那个还是好点", "这勉强还够看", "我感觉下块更大"],
  3: ["你这运气爆棚了", "哟西,发财了", "这么大,我都没吃过", "66666", "看得我也想买了", "兄弟等会帮我开下啊", "想吃点啥就吃点啥吧", "老板亏麻了", "老板哭晕在厕所啊"]
};