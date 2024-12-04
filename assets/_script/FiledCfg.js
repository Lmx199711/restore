Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiledGameConfig = exports.FiledLevelConfig = undefined;
exports.FiledLevelConfig = [{
  id: 0,
  name: "小油田",
  price: 1e7,
  coefficient: 120,
  video: 1
}, {
  id: 1,
  name: "小油田",
  price: 1e8,
  coefficient: 1100,
  video: 1
}, {
  id: 2,
  name: "小油田",
  price: 5e8,
  coefficient: 5200,
  video: 2
}, {
  id: 3,
  name: "中油田",
  price: 1e9,
  coefficient: 1e4,
  video: 3
}, {
  id: 4,
  name: "中油田",
  price: 5e9,
  coefficient: 5e4,
  video: 5
}, {
  id: 5,
  name: "大油田",
  price: 1e10,
  coefficient: 95e3,
  video: 5
}];
exports.FiledGameConfig = {
  0: {
    id: 0,
    tip: "恭喜你找到油田!",
    icon: "大型油田",
    price: 5e4,
    clearType: 0,
    eventType: 1
  },
  1: {
    id: 1,
    tip: "过度开采，地下水管被挖断!",
    icon: "管道泄漏",
    price: 5e4,
    clearType: 1,
    eventType: 0
  },
  2: {
    id: 2,
    tip: "孵化出上古异兽，将资源全部吞噬！",
    icon: "异兽蛋",
    price: 5e4,
    clearType: 1,
    eventType: 0
  },
  3: {
    id: 3,
    tip: "弄坏管道发生爆炸，资源全部清空！",
    icon: "天然气爆炸",
    price: 5e4,
    clearType: 1,
    eventType: 0
  },
  4: {
    id: 4,
    tip: "意外找到远古恐龙化石！",
    icon: "恐龙化石",
    price: 5e4,
    clearType: 1,
    eventType: 0
  },
  5: {
    id: 5,
    tip: "意外获得古代传国玉玺！",
    icon: "玉玺",
    price: 5e4,
    clearType: 1,
    eventType: 0
  },
  6: {
    id: 6,
    tip: "意外获得黄金十二兽首之一！",
    icon: "羊",
    price: 5e4,
    clearType: 1,
    eventType: 0
  },
  7: {
    id: 7,
    tip: "发现埋藏已久的极品古酒！",
    icon: "珍贵毛台",
    price: 5e4,
    clearType: 1,
    eventType: 0
  },
  8: {
    id: 8,
    tip: "发现超大型动物粪坑！",
    icon: "大型粪坑",
    price: 5e4,
    clearType: 0,
    eventType: 0
  },
  9: {
    id: 9,
    tip: "发现一个臭烘烘的垃圾桶！",
    icon: "垃圾",
    price: 5e4,
    clearType: 1,
    eventType: 0
  }
};