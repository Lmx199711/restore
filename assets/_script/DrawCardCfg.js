Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawCardType = exports.DrawFreeFireCfg = exports.DrawStoneNum = exports.DrawCardAward = exports.DrawCardCfg = undefined;
exports.DrawCardCfg = {
  1: {
    id: 1,
    name: "单抽",
    cost: 5e4,
    count: 30,
    weight: [1e3, 0, 150, 100, 20, 300],
    desc: "单抽#次",
    drawTimes: 5,
    drawCool: 600
  },
  2: {
    id: 2,
    name: "五连抽",
    cost: "video",
    count: 10,
    weight: [1e3, 0, 200, 100, 20, 300],
    desc: "#次5连抽",
    drawTimes: -1,
    drawCool: -1
  }
};
exports.DrawCardAward = {
  0: [{
    pr: 15,
    id: 1e4
  }, {
    pr: 30,
    id: 5e4
  }, {
    pr: 30,
    id: 1e5
  }, {
    pr: 15,
    id: 5e5
  }, {
    pr: 10,
    id: 1e6
  }],
  1: [{
    pr: 15,
    id: 50
  }, {
    pr: 30,
    id: 100
  }, {
    pr: 30,
    id: 200
  }, {
    pr: 15,
    id: 500
  }, {
    pr: 10,
    id: 2e3
  }]
};
exports.DrawStoneNum = {
  1: 1,
  2: 10,
  3: 50,
  5: 1,
  6: 100
};
exports.DrawFreeFireCfg = [{
  id: 2e3,
  type: 0
}, {
  id: 500,
  type: 0
}, {
  id: 6,
  type: 3
}, {
  id: 1e3,
  type: 0
}, {
  id: 100,
  type: 0
}];
(function (e) {
  e[e["金币"] = 0] = "金币";
  e[e["钻石"] = 1] = "钻石";
  e[e["品质R"] = 2] = "品质R";
  e[e["品质SR"] = 3] = "品质SR";
  e[e["品质SSR"] = 4] = "品质SSR";
  e[e["品质N"] = 5] = "品质N";
  e[e["品质UR"] = 6] = "品质UR";
})(exports.DrawCardType || (exports.DrawCardType = {}));