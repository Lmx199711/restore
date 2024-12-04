Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaomuAwardBubble = exports.BaomuBubble = exports.BaomuPr = exports.BaomuZpCfg = exports.BaomuCfg = exports.HomeDoorRuleCfg = undefined;
var r_FunUI = require("FunUI");
var r_BathUI = require("BathUI");
exports.HomeDoorRuleCfg = {
  0: {
    id: 0,
    name: "房产中心",
    price: 5e8,
    desc: "灯红酒绿，纸醉金迷，除了按摩和洗脚之外，还有很多好玩又刺激的项目",
    goodTxt: "小帅哥~等您好久了~您的光临让贱地蓬荜生辉",
    badTxt: "哪来的穷小子,没钱还不配来我们这,滚去赚钱吧",
    T: r_BathUI.default
  },
  1: {
    id: 1,
    name: "娱乐中心",
    price: 1e8,
    desc: "里面的娱乐设施应有尽有，里面也不缺一夜暴富的机会，但前提是你需要证明你有足够的经济实力",
    goodTxt: "哦~尊贵的客人，很高兴为您服务~",
    badTxt: "请止步,穷鬼,这里不是你该来的地方,别脏了我们的地方！",
    T: r_FunUI.FunUI
  }
};
exports.BaomuCfg = {
  0: {
    id: 0,
    type: 0,
    isGood: true,
    name: "傲娇"
  },
  1: {
    id: 1,
    type: 1,
    isGood: true,
    name: "可爱"
  },
  2: {
    id: 2,
    type: 2,
    isGood: true,
    name: "奔放"
  },
  3: {
    id: 3,
    type: 3,
    isGood: true,
    name: "成熟"
  },
  4: {
    id: 4,
    type: 4,
    isGood: true,
    name: "高冷"
  },
  5: {
    id: 5,
    type: 5,
    isGood: true,
    name: "甜美"
  },
  100: {
    id: 100,
    type: 0,
    isGood: false,
    name: "傲娇"
  },
  101: {
    id: 101,
    type: 1,
    isGood: false,
    name: "可爱"
  },
  102: {
    id: 102,
    type: 2,
    isGood: false,
    name: "奔放"
  },
  103: {
    id: 103,
    type: 3,
    isGood: false,
    name: "成熟"
  },
  104: {
    id: 104,
    type: 4,
    isGood: false,
    name: "高冷"
  },
  105: {
    id: 105,
    type: 5,
    isGood: false,
    name: "甜美"
  }
};
exports.BaomuZpCfg = {
  0: {
    id: 0,
    type: 0,
    isGood: true,
    name: "房产中心",
    animName: "daiji_1"
  },
  1: {
    id: 1,
    type: 1,
    isGood: true,
    name: "房产中心",
    animName: "animation"
  },
  3: {
    id: 2,
    type: 2,
    isGood: true,
    name: "套圈",
    animName: "step_1"
  },
  4: {
    id: 3,
    type: 3,
    isGood: true,
    name: "狩猎",
    animName: "idle_8"
  }
};
exports.BaomuPr = .4;
exports.BaomuBubble = {
  0: ["欢迎回家，少爷~", "等您好久了，少爷~", "您终于回家了~", "少爷还是一如既往地帅~", "盼星星，盼月亮，盼少爷回家~", "少爷今日有何吩咐呀~"],
  1: ["年轻就是好，回家就能躺", "生前不必久睡，死后自会长眠", "睡觉睡到自然醒，数钱数到手抽筋", "睡觉也是一门技术活", "少爷天天睡觉，真累啊", "眼睛一闭一睁，一天就过去了", "睡觉是为了更好得赚钱", "越睡越累，越累越睡", "清醒时睡觉，睡觉时做梦", "窈窕淑女，寤寐求之", "床塌屋漏难觉醒，沐浴犹闻打鼾声"]
};
exports.BaomuAwardBubble = {
  0: "我才没有很高兴呢",
  1: "很高兴见到你~",
  2: "是帅气的小哥哥呢,我喜欢",
  3: "很高兴为您服务",
  4: "合作愉快",
  5: "嘻嘻,请多多关照呀",
  100: "别贪图我的美貌",
  101: "我是不是很可爱呀~",
  102: "小哥哥！哧溜哧溜",
  103: "成熟是我最大的优势",
  104: "我是冰山美人",
  105: "想做你怀里的猫"
};