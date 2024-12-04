Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RebuildHomeCfg = exports.HostnessCfg = undefined;
exports.HostnessCfg = [{
  id: "上门女婿",
  path: "hostess/smnx",
  bgm: "hostess2/主音乐",
  defeat: ["贫苦退婚"],
  defeatText: "",
  endSound: {
    画饼骗婚: "hostess2/哭泣",
    无奈结婚: "hostess2/哭泣"
  },
  scenes: [{
    id: 1,
    sceneName: "楼道",
    word: "今天是你第一次和女友回她家，你该。。。",
    items: [{
      name: "领带",
      flyTo: "男",
      show: ["男-领带", "女-扬手", "女-扬手-开心"],
      sound: ["hostess2/娇羞"],
      turnTo: 2
    }, {
      name: "篮球",
      flyTo: "男",
      show: ["男-篮球", "女-开场-生气"],
      sound: ["hostess2/鸡", "hostess2/生气"],
      turnTo: "贫苦退婚",
      reason: "你的衣品太差了，你被甩了"
    }, {
      name: "旺仔牛奶",
      flyTo: "男",
      show: ["男-旺仔牛奶", "女-开场-生气"],
      sound: ["hostess2/生气"],
      turnTo: "贫苦退婚",
      reason: "你的衣品太差了，你被甩了"
    }]
  }, {
    id: 2,
    sceneName: "玄关",
    word: "进了家门小舅子迎到了你面前，你该。。。",
    items: [{
      name: "冰绿茶",
      flyTo: "小舅子",
      show: ["小舅子-嫌弃", "小舅子-嫌弃-生气"],
      sound: ["hostess2/焯"],
      turnTo: "贫苦退婚",
      reason: "小舅子嫌弃你的礼物，你被赶走了"
    }, {
      name: "老式按键游戏机",
      flyTo: "小舅子",
      show: [, "小舅子-嫌弃"],
      sound: ["hostess2/冷哼男"],
      turnTo: "贫苦退婚",
      reason: "小舅子嫌弃你的礼物，你被赶走了"
    }, {
      name: "红包",
      flyTo: "小舅子",
      show: [],
      sound: ["hostess2/笑"],
      turnTo: 3
    }]
  }, {
    id: 3,
    sceneName: "客厅",
    word: "来到客厅岳父一脸凶相的坐着，你该。。。",
    beginEvent: "红包1",
    items: [{
      name: "果篮",
      flyTo: "岳父",
      show: ["岳父-开场-嫌弃"],
      sound: ["hostess2/冷哼男"],
      turnTo: 4
    }, {
      name: "萝卜",
      flyTo: "岳父",
      show: ["岳父-开场-嫌弃"],
      sound: ["hostess2/冷哼男"],
      turnTo: "贫苦退婚",
      reason: "岳父觉得你不用心，你被赶走了"
    }, {
      name: "酱香拿铁",
      flyTo: "岳父",
      show: ["岳父-呕吐"],
      sound: ["hostess2/呕吐"],
      turnTo: "贫苦退婚",
      reason: "岳父觉得你不用心，你被赶走了"
    }],
    newItems: [{}, {
      name: "人参",
      flyTo: "岳父",
      show: ["岳父-开场-开心"],
      sound: ["hostess2/哈哈"],
      turnTo: 5
    }, {
      name: "茅台",
      flyTo: "岳父",
      show: ["岳父-开场-开心"],
      sound: ["hostess2/哈哈"],
      turnTo: 5
    }],
    endEvent: "红包0"
  }, {
    id: 4,
    sceneName: "卧室",
    word: "最后你终于在卧室见到了岳母，你该。。。",
    lockVideo: true,
    beginShow: ["男-讨好", "岳母-高傲"],
    items: [{
      name: "自行车",
      flyTo: "岳母",
      show: ["岳母-嘲讽"],
      sound: ["hostess2/冷哼"],
      turnTo: "贫苦退婚",
      reason: "口袋比脸还干净，你被退婚了"
    }, {
      name: "大饼",
      flyTo: "岳母",
      show: ["岳母-眩晕"],
      sound: ["hostess2/眩晕"],
      turnTo: "画饼骗婚"
    }, {
      name: "怀孕证明",
      flyTo: "男",
      show: ["男-讨好-坏笑"],
      sound: ["hostess2/坏笑"],
      turnTo: "无奈结婚"
    }]
  }, {
    id: 5,
    sceneName: "卧室",
    word: "最后你终于在卧室见到了岳母，你该。。。",
    lockVideo: true,
    beginShow: ["男-站立", "岳母-热情"],
    items: [{
      name: "车钥匙",
      flyTo: "岳母",
      show: ["岳母-惊喜"],
      sound: ["hostess2/惊讶"],
      turnTo: "跑车结婚"
    }, {
      name: "房产证",
      flyTo: "岳母",
      show: ["岳母-惊喜"],
      sound: ["hostess2/惊讶"],
      turnTo: "别墅结婚"
    }, {
      name: "唇印",
      flyTo: "岳母",
      show: ["岳母-娇羞"],
      sound: ["hostess2/娇羞"],
      turnTo: "攻略岳母"
    }]
  }]
}, {
  id: "甜心选择",
  path: "hostess/txxz",
  bgm: "hostess3/主音乐",
  defeat: ["下头", "巴掌", "common"],
  defeatText: "",
  endSound: {
    瑜伽: "hostess3/害羞",
    女仆: "hostess3/害羞",
    旗袍: "hostess3/害羞"
  },
  scenes: [{
    id: 1,
    word: "你爸妈给你选了三个相亲对象，你选择。。。",
    sceneName: "客厅",
    items: [{
      name: "林璐头像",
      show: [],
      event: "隐藏23",
      sound: [],
      turnTo: 10,
      flyTo: "林"
    }, {
      name: "肖乐清头像",
      show: [],
      event: "隐藏13",
      sound: [],
      turnTo: 20,
      flyTo: "肖"
    }, {
      name: "钟梓妍头像",
      show: [],
      event: "隐藏12",
      sound: [],
      turnTo: 30,
      flyTo: "钟"
    }]
  }, {
    id: 10,
    word: "来到餐厅初次见面的聊天话题，你选择。。。",
    sceneName: "餐厅1",
    beginShow: ["1-正常"],
    beginEvent: "称呼#childSelf=林",
    endEvent: "头像1",
    items: [{
      name: "爱心",
      flyTo: "fly",
      show: ["1-生气"],
      sound: ["hostess3/泼水", "hostess3/林/冷哼"],
      event: "播放水",
      turnTo: "下头",
      reason: "你的话题让她觉得很下头"
    }, {
      name: "房子",
      flyTo: "fly",
      show: ["1-失望"],
      sound: ["hostess3/林/叹气"],
      turnTo: 11
    }, {
      name: "婴儿",
      flyTo: "fly",
      show: ["1-开心"],
      sound: ["hostess3/林/笑"],
      turnTo: 11
    }]
  }, {
    id: 11,
    sceneName: "办公室",
    word: "熟悉了之后的第二次见面话题，你选择。。。",
    beginShow: ["1-正常"],
    items: [{
      name: "咖啡",
      flyTo: "fly",
      show: ["1-开心"],
      sound: ["hostess3/林/笑"],
      turnTo: 12
    }, {
      name: "瑜伽姿势",
      flyTo: "fly",
      show: ["1-害羞"],
      sound: ["hostess3/林/笑"],
      turnTo: 12
    }, {
      name: "嘴唇",
      flyTo: "fly",
      show: ["1-生气"],
      sound: ["hostess3/林/冷哼"],
      turnTo: "common"
    }]
  }, {
    id: 12,
    sceneName: "林璐",
    lockVideo: true,
    word: "第一次约会你准备送她个礼物，你选择。。。",
    beginShow: ["手机", "bg-chating"],
    beginEvent: "talk",
    items: [{
      name: "鲜花",
      flyTo: "fly",
      show: ["bg", "flashfly", "bg-外景", "1-正常"],
      delayFly: 1,
      show2: ["1-过敏"],
      sound: ["hostess3/林/打喷嚏"],
      turnTo: "巴掌",
      reason: "你的礼物选的非常的差劲"
    }, {
      name: "红酒",
      flyTo: "fly",
      show: [],
      sound: [],
      turnTo: "分手",
      event: "结局#childSelf=1"
    }, {
      name: "空手",
      flyTo: "fly",
      show: [],
      sound: [],
      turnTo: "分手",
      event: "结局#childSelf=2"
    }],
    newItems: [{
      name: "瑜伽服",
      flyTo: "fly",
      show: ["bg", "flashfly", "bg-外景", "1-正常"],
      sound: [],
      delayFly: 1,
      show2: ["1-开心"],
      turnTo: "瑜伽"
    }]
  }, {
    id: 20,
    sceneName: "餐厅2",
    word: "来到餐厅初次见面的聊天话题，你选择。。。",
    beginShow: ["1-正常"],
    beginEvent: "称呼#childSelf=肖",
    endEvent: "头像2",
    items: [{
      name: "摩天轮",
      flyTo: "fly",
      show: ["1-惊喜"],
      sound: ["hostess3/肖/娇羞"],
      turnTo: 21
    }, {
      name: "游戏机",
      flyTo: "fly",
      show: ["1-开心"],
      sound: ["hostess3/肖/娇羞"],
      turnTo: 21
    }, {
      name: "一杯酒",
      flyTo: "fly",
      show: ["1-生气"],
      sound: ["hostess3/肖/生气", "hostess3/泼水"],
      event: "播放水",
      turnTo: "下头",
      reason: "你的话题让她觉得很下头"
    }]
  }, {
    id: 21,
    sceneName: "卧室",
    word: "熟悉了之后的第二次见面话题，你选择。。。",
    beginShow: ["1-正常"],
    items: [{
      name: "蛋糕",
      flyTo: "fly",
      show: ["1-开心"],
      sound: ["hostess3/肖/娇羞"],
      turnTo: 22
    }, {
      name: "汽水",
      flyTo: "fly",
      show: ["1-湿身"],
      sound: ["hostess3/泼水", "hostess3/肖/尖叫"],
      event: "播放可乐",
      turnTo: 22
    }, {
      name: "爱心",
      flyTo: "fly",
      show: ["1-生气"],
      sound: ["hostess3/肖/生气"],
      turnTo: "common"
    }]
  }, {
    id: 22,
    sceneName: "肖乐清",
    word: "第一次约会你准备送她个礼物，你选择。。。",
    beginShow: ["手机", "bg-chating"],
    lockVideo: true,
    beginEvent: "talk",
    items: [{
      name: "小狗",
      flyTo: "fly",
      show: ["bg", "flashfly", "bg-外景", "1-正常"],
      delayFly: 1,
      show2: ["1-害怕"],
      sound: ["hostess3/肖/尖叫"],
      turnTo: "巴掌",
      reason: "你的礼物选的非常的差劲"
    }, {
      name: "气球",
      flyTo: "fly",
      show: [],
      sound: [],
      turnTo: "分手",
      event: "结局#childSelf=1"
    }, {
      name: "空手",
      flyTo: "fly",
      show: [],
      sound: [],
      turnTo: "分手",
      event: "结局#childSelf=2"
    }],
    newItems: [{
      name: "女仆装",
      flyTo: "fly",
      show: ["bg", "flashfly", "bg-外景", "1-正常"],
      sound: [],
      delayFly: 1,
      show2: ["1-开心"],
      turnTo: "女仆"
    }]
  }, {
    id: 30,
    sceneName: "餐厅3",
    word: "来到餐厅初次见面的聊天话题，你选择。。。",
    beginShow: ["1-正常"],
    beginEvent: "称呼#childSelf=钟",
    endEvent: "头像3",
    items: [{
      name: "头发",
      flyTo: "fly",
      show: ["1-害羞"],
      sound: ["hostess3/钟/笑4"],
      turnTo: 31
    }, {
      name: "音乐符号",
      flyTo: "fly",
      show: ["1-开心"],
      sound: ["hostess3/钟/笑4"],
      turnTo: 31
    }, {
      name: "牵手",
      flyTo: "fly",
      show: ["1-生气"],
      sound: ["hostess3/泼水", "hostess3/钟/冷哼"],
      turnTo: "下头",
      event: "播放水",
      reason: "你的话题让她觉得很下头"
    }]
  }, {
    id: 31,
    sceneName: "酒吧",
    word: "熟悉了之后的第二次见面话题，你选择。。。",
    beginShow: ["1-正常"],
    items: [{
      name: "嘴唇",
      flyTo: "fly",
      show: ["1-害羞"],
      sound: ["hostess3/钟/笑4"],
      turnTo: 32
    }, {
      name: "鸡尾酒",
      flyTo: "fly",
      show: ["1-开心"],
      sound: ["hostess3/钟/笑4"],
      turnTo: 32
    }, {
      name: "爱心",
      flyTo: "fly",
      show: ["1-生气"],
      sound: ["hostess3/钟/冷哼"],
      turnTo: "common"
    }]
  }, {
    id: 32,
    sceneName: "钟梓妍",
    word: "第一次约会你准备送她个礼物，你选择。。。",
    lockVideo: true,
    beginShow: ["手机", "bg-chating"],
    beginEvent: "talk",
    items: [{
      name: "电吉他",
      flyTo: "fly",
      show: [],
      sound: [],
      turnTo: "分手",
      event: "结局#childSelf=1"
    }, {
      name: "JK",
      flyTo: "fly",
      show: ["bg", "flashfly", "bg-外景", "1-正常"],
      delayFly: 1,
      show2: ["1-讨厌"],
      sound: ["hostess3/钟/冷哼"],
      turnTo: "巴掌",
      reason: "你的礼物选的非常的差劲"
    }, {
      name: "空手",
      flyTo: "fly",
      show: [],
      sound: [],
      turnTo: "分手",
      event: "结局#childSelf=2"
    }],
    newItems: [{}, {
      name: "旗袍",
      flyTo: "fly",
      show: ["bg", "flashfly", "bg-外景", "1-正常"],
      sound: [],
      delayFly: 1,
      show2: ["1-开心"],
      turnTo: "旗袍"
    }]
  }]
}, {
  id: "成为海后",
  path: "jumpFish/成为海后",
  bgm: "hostess3/主音乐",
  defeat: ["结束"],
  defeatText: "",
  flySpeed: .1,
  overDelay: 1e3,
  title: "恭喜你帮助小姐姐完成相亲",
  endSound: {
    海后: "hostess4/娇羞"
  },
  scenes: [{
    id: 1,
    sceneName: "all",
    items: [{
      name: "裙子",
      show: [],
      event: ["a1", "girl跳"],
      sound: ["hostess4/嫌弃"],
      turnTo: 2,
      flyTo: "pos"
    }, {
      name: "束带",
      show: [],
      event: ["a2", "girl跳"],
      sound: ["hostess4/欢呼"],
      turnTo: 2,
      flyTo: "pos"
    }, {
      name: "绳子",
      show: [],
      event: ["a3", "girl跳"],
      sound: ["hostess4/嫌弃"],
      turnTo: 2,
      flyTo: "pos"
    }]
  }, {
    id: 2,
    items: [{
      name: "洗发",
      show: [],
      event: ["a4", "girl跳"],
      sound: [],
      turnTo: 3,
      flyTo: "pos2"
    }, {
      name: "拳套",
      show: [],
      event: ["a5", "girl跳"],
      sound: ["hostess4/捶打"],
      turnTo: 3,
      flyTo: "pos"
    }, {
      name: "剪刀",
      show: [],
      event: ["a6", "girl跳"],
      sound: ["hostess4/剪刀"],
      turnTo: 3,
      flyTo: "pos2"
    }]
  }, {
    id: 3,
    items: [{
      name: "粉底",
      show: [],
      event: ["a7", "girl跳"],
      sound: ["hostess4/欢呼"],
      turnTo: "海后",
      flyTo: "pos",
      reason: "你没能帮她变成海后",
      needKey: "good",
      turnTo2: "结束"
    }, {
      name: "猫耳",
      show: [],
      event: ["a8", "girl跳"],
      sound: ["hostess4/嫌弃"],
      turnTo: "结束",
      flyTo: "pos2",
      reason: "你没能帮她变成海后"
    }, {
      name: "大便",
      show: [],
      event: ["a9", "girl跳"],
      sound: ["hostess4/嫌弃"],
      turnTo: "结束",
      flyTo: "pos",
      reason: "你没能帮她变成海后"
    }]
  }]
}];
exports.RebuildHomeCfg = {
  拾荒少女: {
    path: "hostess/拾荒少女",
    upSound: "rebuild/up",
    bgm: "rebuild/1/bgm",
    thing: {
      墙面: {
        icon1: "水泥",
        price1: 1500,
        icon2: "粉色壁纸",
        price2: 1e4
      },
      窗户: {
        icon1: "报纸",
        price1: 1e3,
        icon2: "玻璃",
        price2: 17e3,
        action1: "key#报纸"
      },
      垃圾桶: {
        icon1: "绿垃圾桶",
        price1: 2e3,
        icon2: "衣柜",
        price2: 22e3,
        action1: "绿垃圾桶",
        action2: "衣柜"
      },
      床: {
        icon1: "木板床",
        price1: 1e3,
        icon2: "公主床",
        price2: 33e3,
        action: "上床上"
      },
      热源: {
        icon1: "煤炉",
        price1: 1e3,
        icon2: "电暖炉",
        price2: 3e5,
        action1: "key#煤炉"
      },
      食物: {
        icon1: "泡面",
        price1: 1e3,
        icon2: "儿童套餐",
        price2: 11e3
      },
      主角: {
        icon1: "旧衣服",
        price1: 1e3,
        icon2: "公主裙",
        price2: 5e4,
        action: "音效#rebuild/1/娇羞"
      },
      狗子: {
        icon1: "小土狗",
        price1: 1e3,
        icon2: "贵宾",
        price2: 3e4,
        action: "升级狗"
      },
      狗窝: {
        icon1: "纸板狗窝",
        price1: 1e3,
        icon2: "高档狗窝",
        price2: 3e4,
        action: "变成房子",
        action1: "key#纸板狗窝"
      },
      地板: {
        icon1: "水泥",
        price1: 1e3,
        icon2: "木块",
        price2: 4e4
      },
      桌子: {
        icon1: "石桌",
        price1: 1e3,
        icon2: "高档木桌",
        price2: 15e3
      },
      书本: {
        icon1: "蛇皮袋",
        price1: 1e3,
        icon2: "公主书包",
        price2: 1e4
      }
    },
    finishActon: ["隐藏道具钱", "隐藏雪"],
    successAction: ["执行胜利效果"],
    successDelay: 4,
    defeatAction: ["执行失败效果"],
    defeatDelay: 4,
    reason: "帮人还是帮到底叭"
  }
};