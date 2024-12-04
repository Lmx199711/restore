Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogueTaskCfg = undefined;
exports.DialogueTaskCfg = [{
  id: 101,
  name: "拯救女友",
  taskBg: "bg",
  jumpForTaskId: 3,
  taskList: {
    1: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "恭喜主人，重新收复魔剑，魔剑灵此时任凭您发落",
      btn: [{
        type: "text",
        content: "带上来",
        nextId: [2]
      }]
    },
    2: {
      isMy: true,
      name: "（魔）剑灵",
      onlyOne: false,
      move: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵红",
        animName: "step_3"
      },
      content: "主人，我错了，我愿意化身诸天剑，永远侍奉您"
    },
    3: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: false,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "主人，是否现在将魔剑融合成诛天剑",
      btn: [{
        type: "text",
        content: "立即融合"
      }],
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 102,
  name: "",
  taskBg: "bg",
  jumpForTaskId: 2,
  taskList: {
    1: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "主人，我知道您一定会回来，在此恭候多时",
      btn: [{
        type: "text",
        content: "我要怎么阻止魔剑",
        nextId: [2]
      }]
    },
    2: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "首先您需要获得一把兵器，请跟我来兵器铺",
      event: [{
        type: "显示",
        obj: "荒古遗迹引导"
      }],
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 103,
  name: "",
  taskBg: "bg",
  jumpForTaskId: 2,
  taskList: {
    1: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "主人，在这里需要获得一把好的神兵，需要消耗大量的灵石"
    },
    2: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "我已为您准备好打造兵器的基础材料，我在外面等您",
      event: [{
        type: "显示",
        obj: "荒古遗迹引导2"
      }],
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 104,
  name: "",
  taskBg: "bg",
  jumpForTaskId: 5,
  taskList: {
    1: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "主人小心，魔剑灵要破塔而出了",
      btn: [{
        type: "text",
        content: "现在怎么做",
        nextId: [2]
      }]
    },
    2: {
      isMy: true,
      name: "（魔）剑灵",
      onlyOne: false,
      move: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵红",
        animName: "step_2"
      },
      content: "哟~这不是剑帝嘛，剑帝终于要重新执剑了吗"
    },
    3: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: false,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "放肆，区区魔剑灵也敢跟主人这样说话，你不怕反噬吗"
    },
    4: {
      isMy: true,
      name: "（魔）剑灵",
      onlyOne: false,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵红",
        animName: "step_2"
      },
      content: "我自然是不敢对主人出手，不过如今剑帝难道还能阻止我不成？？？"
    },
    5: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: false,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "主人不必理会她，您一定能收复魔剑，重回往日荣耀",
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 105,
  name: "",
  taskBg: "bg",
  jumpForTaskId: 3,
  taskList: {
    1: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "主人，这里是瑶池，中间有一颗树，我在这里获得不少灵石才维持现状，主人也可以试试"
    },
    2: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "这许愿树传言可获得上古神剑轩辕剑，不过据说需要有一定的耐心和诚意",
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 1001,
  name: "美容院动画结束对话",
  taskBg: "bg",
  taskList: {
    1: {
      isMy: true,
      name: "旁白",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: ""
      },
      content: "咦~那不是之前那个小太妹吗？大晚上的这是去干嘛，不会是？？？",
      btn: [{
        type: "text",
        content: "跟上去看看"
      }],
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 1002,
  name: "美容院进入对话",
  taskBg: "bg",
  jumpForTaskId: 2,
  taskList: {
    1: {
      isMy: false,
      name: "小太妹",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/小太妹"
      },
      content: "怎么到哪都能遇到你，你个扫把星",
      btn: [{
        type: "text",
        content: "只有你能来？",
        nextId: [2]
      }]
    },
    2: {
      isMy: false,
      name: "小太妹",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/小太妹"
      },
      content: "且，惹不起，我还躲不起了，再见",
      btn: [{
        type: "text",
        content: "尴尬一笑"
      }],
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 1003,
  name: "解锁荒古遗迹前对话",
  taskBg: "bg",
  jumpForTaskId: 2,
  taskList: {
    1: {
      isMy: false,
      name: "旁白",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: ""
      },
      content: "一晚上啥也没干成，不过今晚的月亮真亮",
      btn: [{
        type: "text",
        content: "擦亮眼睛",
        nextId: [2]
      }]
    },
    2: {
      isMy: false,
      name: "旁白",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: ""
      },
      content: "不对，怎么越来越亮了，不行太刺眼了"
    },
    3: {
      isMy: false,
      name: "旁白",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: ""
      },
      content: "一股强大的气息迎面而来，耀眼的白光仿佛有一种魔力，将你包裹",
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 1004,
  name: "解锁荒古遗迹前对话",
  taskBg: "bg",
  jumpForTaskId: 6,
  taskList: {
    1: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "主人，你快醒醒，是我，终于找到您啦",
      btn: [{
        type: "text",
        content: "你是谁，我在哪？",
        nextId: [2]
      }]
    },
    2: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "忘了您已经没有了前世的记忆，我来给您解释",
      btn: [{
        type: "text",
        content: "我前世的孽缘？",
        nextId: [3]
      }]
    },
    3: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "您前世是至尊剑帝，当年因为失误被魔剑灵反噬，最终用尽毕生修为将魔剑灵封锁在登天塔内，也因此落入轮回",
      btn: [{
        type: "text",
        content: "你是哪个剧组的",
        nextId: [4]
      }]
    },
    4: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "我知道您一下子接受不了，但现在魔剑即将破塔而出，只有您出手收付魔剑，才能阻止魔剑为祸人间",
      btn: [{
        type: "text",
        content: "......",
        nextId: [5]
      }]
    },
    5: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "我是您当初的神兵剑灵，此次听到您的召唤，我才感知到您的所在，这是命中注定的",
      btn: [{
        type: "text",
        content: "美女你入戏太深",
        nextId: [6]
      }]
    },
    6: {
      isMy: false,
      name: "百年剑灵",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/百年剑灵白"
      },
      content: "留给我的时间已经不多了，我在荒古遗迹等您",
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 1005,
  name: "解锁荒古遗迹前对话",
  taskBg: "bg",
  jumpForTaskId: 3,
  taskList: {
    1: {
      isMy: false,
      name: "小太妹",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/小太妹"
      },
      content: "喂，怎么到哪都能遇到你，你不会是跟踪我吧",
      btn: [{
        type: "text",
        content: "怎么可能",
        nextId: [2]
      }]
    },
    2: {
      isMy: false,
      name: "小太妹",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/小太妹"
      },
      content: "还说没有，我到哪你到哪，怎么可能有这么巧的事",
      btn: [{
        type: "text",
        content: "问你个事",
        nextId: [3]
      }]
    },
    3: {
      isMy: false,
      name: "小太妹",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/小太妹"
      },
      content: "别别别，咱们不熟，别问我，我先走啦",
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 1006,
  name: "解锁荒古遗迹前对话",
  taskBg: "bg",
  jumpForTaskId: 2,
  taskList: {
    1: {
      isMy: false,
      name: "小太妹",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/小太妹"
      },
      content: "怎么又是你，你有完没完啦！到底还能不能好好吃个饭",
      btn: [{
        type: "text",
        content: "......",
        nextId: [2]
      }]
    },
    2: {
      isMy: false,
      name: "小太妹",
      onlyOne: true,
      sex: 0,
      roleAnimInfo: {
        animPath: "role/小太妹"
      },
      content: "我就只是输给你一次，你也别老欺负我行不行？",
      btn: [{
        type: "text",
        content: "你走吧",
        nextId: [3]
      }],
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 501,
  name: "拯救女友",
  taskBg: "bg",
  jumpForTaskId: 4,
  taskList: {
    1: {
      isMy: false,
      name: "子豪",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/村长儿子"
      },
      content: "哟~这不是日天嘛？怎么回来了，不是说在城里赚大钱嘛？",
      btn: [{
        type: "text",
        content: "你是谁",
        nextId: [2]
      }]
    },
    2: {
      isMy: false,
      name: "子豪",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/村长儿子"
      },
      content: "这就不认识啦？你家的债还完了吗？你爸为了还债把别墅都卖给我家啦~",
      btn: [{
        type: "text",
        content: "什么？我爸妈呢？",
        nextId: [3]
      }]
    },
    3: {
      isMy: false,
      name: "子豪",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/村长儿子"
      },
      content: "我怎么知道，说不定能在桥洞下找找看",
      btn: [{
        type: "text",
        content: "你们给我等着",
        nextId: [4]
      }]
    },
    4: {
      isMy: false,
      name: "子豪",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/村长儿子"
      },
      content: "切~就凭你",
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 502,
  name: "小强回收第一次点击",
  taskBg: "bg",
  jumpForTaskId: 4,
  taskList: {
    1: {
      isMy: false,
      name: "小强",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/小强"
      },
      content: "日天，你终于来啦！果然是好兄弟",
      btn: [{
        type: "text",
        content: "这怎么能不来",
        nextId: [2]
      }]
    },
    2: {
      isMy: false,
      name: "小强",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/小强"
      },
      content: "我的情况，小美跟你说过了吧，我现在急需一批物品",
      btn: [{
        type: "text",
        content: "你需要什么交给我",
        nextId: [3]
      }]
    },
    3: {
      isMy: false,
      name: "小强",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/小强"
      },
      content: "我没念多少书，写错了字你别介意",
      btn: [{
        type: "text",
        content: "小事，咱俩谁跟谁",
        nextId: [4]
      }]
    },
    4: {
      isMy: false,
      name: "小强",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/小强"
      },
      content: "那好吧，你看看清单",
      event: [{
        type: "显示",
        obj: "小强回收"
      }],
      isFinish: true,
      unAutoFinish: true
    }
  }
}, {
  id: 503,
  name: "小强回收剧情",
  taskBg: "bg",
  taskList: {
    1: {
      isMy: false,
      name: "小强",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/小强"
      },
      content: "日天哥，我一直暗恋小玉，她现在进城打工以后，我...",
      btn: [{
        type: "text",
        content: "去找她呀",
        nextId: [2]
      }]
    },
    2: {
      isMy: false,
      name: "小强",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/小强"
      },
      content: "也不知道她现在在哪，不知道她是不是...",
      btn: [{
        type: "text",
        content: " 交付信件",
        condition: {
          goodsId: 42
        },
        nextId: [3]
      }, {
        type: "text",
        content: "放宽心",
        nextId: [4]
      }]
    },
    3: {
      isMy: false,
      name: "小强",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/小强"
      },
      content: "原来她也喜欢我，日天哥，麻烦你帮我个忙，告诉她我在等她，以后你日天哥提供的物品，我按300%的物价收",
      event: [{
        type: "解锁",
        obj: "小强回收彩蛋完成"
      }],
      isFinish: true,
      unAutoFinish: true
    },
    4: {
      isMy: false,
      name: "小强",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/小强"
      },
      content: "也只能这样啦，我们先多赚钱点吧~",
      btn: [{
        type: "text",
        content: " 好的",
        event: [{
          type: "显示",
          obj: "小强回收"
        }]
      }],
      isFinish: true
    }
  }
}, {
  id: 504,
  name: "数钱彩蛋1",
  taskBg: "bg",
  jumpForTaskId: 2,
  taskList: {
    1: {
      isMy: false,
      name: "富婆",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/富婆"
      },
      content: "你这就走了吗？",
      btn: [{
        type: "text",
        content: "下次再来",
        nextId: [2]
      }]
    },
    2: {
      isMy: false,
      name: "富婆",
      sex: 0,
      roleAnimInfo: {
        animPath: "roleAnim/富婆"
      },
      content: "那你要记得来看我哦~",
      btn: [{
        type: "text",
        content: "下次一定",
        event: [{
          type: "显示",
          obj: "数钱彩蛋1"
        }]
      }],
      isFinish: true,
      unAutoFinish: true
    }
  }
}];