Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoRebuildHomeCfg = undefined;
exports.VideoRebuildHomeCfg = {
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