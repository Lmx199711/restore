Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findThingIndex = exports.FairyTreeCfg = exports.FairyTreeSet = exports.SpecialWeaponLock = undefined;
var r_UIDef = require("UIDef");
exports.SpecialWeaponLock = {
  1101: 3
};
exports.FairyTreeSet = {
  thingArr: [0, 10, 50, 100, 150, 300, 450, 600, 800, 1e3],
  treeCount: 1e3,
  max: 100,
  reSecond: 60
};
exports.FairyTreeCfg = {
  monkey: {
    icon: "猴子",
    desc: "树上掉下来一只小猴子，你是否愿意放生它？",
    fontSize: 42,
    btn1: "放生",
    btn2: "不放"
  },
  monkey1: {
    icon: "ui://" + r_UIDef.UIDef.Pack.FairyLandTg + "/仙桃",
    fontSize: 40,
    desc: "小猴子为了感谢你送给了你一颗[color=#945236]仙桃[/color]，卖了获得[color=#945236]500灵石[/color]",
    num: 500
  },
  monkey2: {
    icon: "ui://" + r_UIDef.UIDef.Pack.FairyLandTg + "/牙印",
    fontSize: 40,
    desc: "小猴子咬了你口并抢了你一把灵石逃跑了，[color=#945236]损失1000灵石[/color]",
    num: 1e3
  },
  hammer: {
    icon: "锤子",
    desc: "树上掉下来一把生锈的锤子，你准备把他丢到河里还是丢到山上？",
    fontSize: 36,
    btn1: "河里",
    btn2: "山上"
  },
  hammer1: {
    icon: "ui://" + r_UIDef.UIDef.Pack.FairyLandTg + "/水池",
    fontSize: 40,
    desc: "你把锤子丢到了河里，连个水花都没有就消失了"
  },
  hammer2: {
    icon: "ui://" + r_UIDef.UIDef.Pack.FairyLandTg + "/电锤",
    fontSize: 32,
    desc: "你把锤子丢到山上，突然一道闪电劈来，锤子发出金光飞到了天工熔炉，快去看看吧！"
  },
  hulu: {
    icon: "葫芦",
    desc: "树上掉下来一个金闪闪的葫芦，你准备卖了它还是劈开？",
    fontSize: 36,
    btn1: "出售",
    btn2: "劈开"
  },
  hulu1: {
    icon: "ui://" + r_UIDef.UIDef.Pack.Pop + "/bigstone",
    fontSize: 36,
    desc: "你把葫芦卖了[color=#945236]1000灵石[/color]",
    num: 1e3
  },
  hulu2: {
    icon: "ui://" + r_UIDef.UIDef.Pack.FairyLandTg + "/劈开葫芦",
    fontSize: 40,
    desc: "你劈开了葫芦，获得了#",
    preRandom: true,
    preNum: 2,
    preType: "rec"
  }
};
exports.findThingIndex = function (e) {
  var t = 0;
  for (var i = 1; i < exports.FairyTreeSet.thingArr.length; i++) {
    e >= exports.FairyTreeSet.thingArr[i] && (t = i);
  }
  return t;
};