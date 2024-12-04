Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatTaskCfg = undefined;
exports.ChatTaskCfg = [{
  id: 1,
  name: "李管家",
  icon: "icon1",
  personId: 1,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "少爷，大事不好了！"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不要大惊小怪的,慢慢说"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "家里的资产都被银行冻结了,老爷和太太又去环游世界了，联系不上"
    }],
    resultType: "chat",
    resultInfo: [4, 5]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "无所谓,我会出手"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "啊?那咋办!"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "对了,忘了告诉您,您的信用卡也被冻结了,需要还清10W欠款后才能使用"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "......"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "情况就是这样了,少爷您一个人要好好保重啊"
    }],
    resultType: "finish"
  }]
}, {
  id: 2,
  name: "8号师傅",
  icon: "icon2",
  personId: 2,
  triggerDay: 5,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "小帅哥,有空过来玩呀"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "努力赚钱呢"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "劳逸结合嘛~"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "最近家里很困难"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "只能靠摆摊维持生活了"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "不摆摊行不行啊"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不摆摊你养我啊？"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "那个,我手机没电了，先不聊了"
    }],
    resultType: "finish"
  }]
}, {
  id: 3,
  name: "狗蛋",
  icon: "icon3",
  personId: 3,
  triggerDay: 2,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "日天,啥时候出来上网啊"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    chatList: [{
      type: "text",
      content: "咱哥俩好久没聚过了"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "等我手上事情忙完,一定陪你玩个尽兴"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "哈哈好,等你带我飞"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "对了,听说最近你家里出事了？"
    }],
    resultType: "chat",
    resultInfo: [6, 7]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "还行,我还顶得住"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "是啊,最近压力很大"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "hongbao",
      coin: 5e5
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "这50W你先拿着,有困难随时开口"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "兄弟永远是你坚强的后盾"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "谢了兄弟,多的不说了,下次请你喝酒"
    }],
    resultType: "win"
  }]
}, {
  id: 4,
  name: "静静",
  icon: "icon4",
  personId: 4,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你的事情我都知道了"
    }, {
      type: "text",
      content: "我也做好了决定"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "嗯,我能理解的"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "我要陪你一起打工还钱"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "啊?"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "可是跟着我会有很多苦吃"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "没关系,我们一起扛"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "同甘共苦!"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好,我们一起努力！"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我先去找工作了"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "好~加油"
    }],
    resultType: "finish"
  }]
}, {
  id: 5,
  name: "李管家",
  icon: "icon1",
  personId: 1,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "少爷,忙碌了一天,记得要好好休息呀"
    }, {
      type: "text",
      content: "桌上备好了早餐,您出门时记得吃"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好的李叔,谢谢了啊"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "对了,李叔"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我现在发不起你的工资,你要不..."
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "少爷,不要说这种话"
    }, {
      type: "text",
      content: "我从记事起就在家族里,您也是我看着长大的"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "只要您能开开心心的，我就满足了"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好...谢谢李叔"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "加油吧,少爷,我相信您！"
    }],
    resultType: "finish"
  }]
}, {
  id: 6,
  name: "爸爸",
  icon: "icon43",
  personId: 21,
  triggerDay: 2,
  beforeTaskId: 43,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "儿子,找到合适的工作了吗？"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "有合适的岗位吗"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "我联系了一个之前一个朋友"
    }, {
      type: "text",
      content: "听说他那有职位空缺"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "可以啊,我等下过去试试"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "要是太累了的话,我们再去找找别的"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我能吃苦的！"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "喝,长大了"
    }],
    resultType: "finish"
  }]
}, {
  id: 7,
  name: "电子厂主管",
  icon: "icon5",
  personId: 5,
  triggerDay: 3,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你就是介绍来的小伙子吧"
    }, {
      type: "text",
      content: "看着细皮嫩肉的,能不能干体力活"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "可以的主管,您相信我"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "我也很看好你,简单介绍一下我们强盛电子厂"
    }, {
      type: "text",
      content: "我们厂自创立已经有两年半的悠久历史"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "不仅拥有良好的企业形象"
    }, {
      type: "text",
      content: "还有着同行们都没有的福利待遇"
    }, {
      type: "text",
      content: "同样的工资,别人每天只能上班8小时,我们却可以上班12小时"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不好意思,打断一下"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我怎么感觉怪怪的"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "这不是重点,最主要是我们没有底薪,全靠提成"
    }, {
      type: "text",
      content: "能力越大,责任越大"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那五险一金....."
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "这个表现够好的员工我们都会购买的,你难道没有把握吗?"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我会加油表现的!"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "嗯,只要你好好干,不仅年底有大红包,明年房车都会有的!"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好的主管,我明天就来入职"
    }],
    resultType: "finish"
  }]
}, {
  id: 8,
  name: "静静",
  icon: "icon4",
  personId: 4,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "宝"
    }, {
      type: "text",
      content: "你在不在"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不出意外"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我肯定在"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "我发现你变了"
    }],
    resultType: "chat",
    resultInfo: [5, 6]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我哪变了"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "是的,我变了"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "以前你都秒回我的"
    }],
    resultType: "chat",
    resultInfo: [20]
  }, {
    id: 20,
    chatList: [{
      type: "text",
      content: "这次竟然过了三秒钟,我生气了!"
    }],
    resultType: "fail"
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "变得更喜欢你了"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "油嘴滑舌,怎么证明呢！"
    }],
    resultType: "chat",
    resultInfo: [10, 11]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "多喝热水"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你好看,先救你,买买买"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 12,
    chatList: [{
      type: "text",
      content: "你怎么不让我喝岩浆呢,气死我了"
    }],
    resultType: "fail"
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "嘿嘿,爱你哟"
    }],
    resultType: "win"
  }]
}, {
  id: 9,
  name: "小美",
  icon: "icon42",
  personId: 20,
  triggerDay: 443,
  beforeTaskId: 444,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "宝贝,我们玩个游戏吗"
    }],
    resultType: "chat",
    resultInfo: [2, 3]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我准备好了"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "可以不玩吗?"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "当然不可以"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "很简单的,快问快答"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "先说好,赢了有啥奖励"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "你赢了,我包一个月家务"
    }, {
      type: "text",
      content: "你输了,送我一只口红"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "一言为定!开始吧"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "狗在哪?"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "狗窝里"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "鱼在哪?"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "鱼缸里"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "马桶在哪?"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "厕所里"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    chatList: [{
      type: "text",
      content: "私房钱在哪?"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    isMy: true,
    chatList: [{
      type: "text",
      content: "壁画里"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    chatList: [{
      type: "text",
      content: "好的,我输了,我打扫家务去了"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    isMy: true,
    chatList: [{
      type: "text",
      content: "别动我壁画!"
    }],
    resultType: "finish"
  }]
}, {
  id: 10,
  name: "工友",
  icon: "icon6",
  personId: 6,
  triggerDay: 4,
  beforeTaskId: 7,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "不是,兄弟你也太拼了吧"
    }, {
      type: "text",
      content: "铁人呀,一天干三个人的活"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "打工人,打工魂"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "打工都是人上人"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "对了兄弟，明天请你吃个饭吧,平时承蒙照顾"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "这不太好吧"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "怎么了"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "主要我们这边最近不太平,总发生遗失物品事件"
    }, {
      type: "text",
      content: "保安都出动了"
    }, {
      type: "text",
      content: "闹得沸沸扬扬的"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你有什么宝贝的东西怕被偷的?"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "我怕心被偷走了"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "...."
    }],
    resultType: "finish"
  }]
}, {
  id: 11,
  name: "路人",
  icon: "icon7",
  personId: 7,
  triggerDay: 7,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "在忙吗"
    }, {
      type: "text",
      content: "我有事和你说"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "怎么了,你说"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "我怀孕了"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "哦"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "你就这态度?"
    }, {
      type: "text",
      content: "是不是不想认?"
    }, {
      type: "text",
      content: "呵,男人"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我认?"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我怎么认啊?"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "咱俩就玩了一次王者"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你玩小明牵我一下就有了?"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "每个人的体质又不一样"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你找别人认去吧!"
    }],
    resultType: "finish"
  }]
}, {
  id: 12,
  name: "富豪老马",
  icon: "icon19",
  personId: 8,
  triggerDay: 4,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "小伙子我看你日子过得不咋样啊"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "如果你只是来挖苦我的话就请回吧"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我的生活不需要你来评价"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "也不知道当初如烟怎么看上的你"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "她只是看上了你的钱"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "她要钱,我就给"
    }, {
      type: "text",
      content: "但是你这穷鬼给的了吗？"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "钱也买不到真感情"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "那也总比你睡桥洞,过苦日子强"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "三十年河东,三十年河西"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "莫欺少年穷！"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "还这么嘴硬"
    }, {
      type: "text",
      content: "我倒看看你能硬气到什么时候"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "等着瞧吧"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "非常期待"
    }],
    resultType: "finish"
  }]
}, {
  id: 13,
  name: "hr",
  icon: "icon9",
  personId: 9,
  triggerDay: 3,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你好,同学"
    }, {
      type: "text",
      content: "我刚在网上看到了你的简历"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "您好,关注贵公司很久了,请问还有职位空缺吗?"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "目前是有的,请问你这边有什么特长"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我指甲特长"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "额,那你有什么不足和缺点呢"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我余额不足和缺点钱"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "...那先不聊这些,你有相关的销售经验吗"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "没有啊,不工作怎么有经验,我这不是在面试吗"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "那方便来公司面试吗"
    }, {
      type: "text",
      content: "你的实际能力需要面试评估"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "怎么感觉您不信任我,您可以去网上查一下"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你可以学心网查,我一个硕士能力还需要评估吗?"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "查了,大砖生,非全日制"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "嘻嘻,居然没唬住你,ok我等会来面试"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "不用了,刚接到消息已经招到人了"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "开除他,我更合适"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    chatList: [{
      type: "text",
      content: "刚招到,暂时不会考虑换的"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    isMy: true,
    chatList: [{
      type: "text",
      content: "如果他考核不过可以找我"
    }, {
      type: "image",
      noVideo: false,
      width: 321,
      height: 408,
      path: "chat2"
    }],
    resultType: "finish"
  }]
}, {
  id: 14,
  name: "富豪老马",
  icon: "icon19",
  personId: 8,
  triggerDay: 7,
  beforeTaskId: 12,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "赚到钱了吗"
    }, {
      type: "text",
      content: "要不你来我公司楼下当保安吧"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你怎么这么操心我的事呢"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你是急急国王吗"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "听人说你在摆摊呢"
    }, {
      type: "text",
      content: "一天能赚几个钱？"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "靠自己努力赚的钱有什么丢人的"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "那希望你能努力坚持,不要三分钟热度"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "借你吉言"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "对了,楼下的保安职位还是给你留着"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "早点认怂,可以少吃点苦"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "就不劳您费心了,再见！"
    }],
    resultType: "finish"
  }]
}, {
  id: 15,
  name: "集邮俱乐部",
  icon: "icon10",
  personId: 22,
  triggerDay: 0,
  beforeTaskId: 999,
  emergencyId: 0,
  taskList: [{
    id: 1,
    icon: "icon12",
    chatList: [{
      type: "text",
      content: "小兄弟听说你这有猴票啊"
    }, {
      type: "text",
      content: "能否割爱给我呀？"
    }],
    resultType: "chat",
    resultInfo: [20]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "这可是我好不容易收集到的"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "这么值钱啊,我卖！"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 4,
    icon: "icon11",
    chatList: [{
      type: "text",
      content: "小伙子别卖他,卖给我"
    }, {
      type: "text",
      content: "我出一个小目标,1亿"
    }],
    resultType: "chat",
    resultInfo: [22]
  }, {
    id: 5,
    icon: "icon12",
    chatList: [{
      type: "hongbao",
      coin: 5e7,
      noVideo: true
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "谢谢老板"
    }],
    resultType: "finish"
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我再考虑一下"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那行,成交吧！"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    icon: "icon11",
    chatList: [{
      type: "hongbao",
      coin: 1e8,
      noVideo: true
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "老板大气！"
    }],
    resultType: "finish"
  }, {
    id: 11,
    icon: "icon13",
    chatList: [{
      type: "text",
      content: "兄弟,我直接一口价"
    }, {
      type: "text",
      content: "5亿!卖给我绝对不亏"
    }],
    resultType: "chat",
    resultInfo: [23]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我突然不那么想卖了"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 13,
    isMy: true,
    chatList: [{
      type: "text",
      content: "就决定是你了老板!"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    icon: "icon13",
    chatList: [{
      type: "hongbao",
      coin: 5e8,
      noVideo: true
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    isMy: true,
    chatList: [{
      type: "text",
      content: "老板爽快人"
    }],
    resultType: "finish"
  }, {
    id: 16,
    icon: "icon14",
    chatList: [{
      type: "text",
      content: "我出10亿"
    }, {
      type: "text",
      content: "这个已经是市场最高价了"
    }],
    resultType: "chat",
    resultInfo: [24]
  }, {
    id: 17,
    isMy: true,
    chatList: [{
      type: "text",
      content: "直接交易吧!老板"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    icon: "icon14",
    chatList: [{
      type: "hongbao",
      coin: 1e9,
      noVideo: true
    }],
    resultType: "chat",
    resultInfo: [19]
  }, {
    id: 19,
    isMy: true,
    chatList: [{
      type: "text",
      content: "谢谢老板!我有还联系您"
    }],
    resultType: "finish"
  }, {
    id: 20,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你出多少价格呀"
    }],
    resultType: "chat",
    resultInfo: [21]
  }, {
    id: 21,
    icon: "icon12",
    chatList: [{
      type: "text",
      content: "这样吧,我出5000万"
    }],
    resultType: "chat",
    resultInfo: [2, 3]
  }, {
    id: 22,
    isMy: true,
    chatList: [{
      type: "text",
      content: "这东西这么抢手吗"
    }],
    resultType: "chat",
    resultInfo: [7, 8]
  }, {
    id: 23,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我想一想"
    }],
    resultType: "chat",
    resultInfo: [12, 13]
  }, {
    id: 24,
    icon: "icon14",
    chatList: [{
      type: "text",
      content: "这也是我最大的诚意了"
    }],
    resultType: "chat",
    resultInfo: [17]
  }]
}, {
  id: 16,
  name: "富婆",
  icon: "icon39",
  personId: 40,
  triggerDay: 0,
  beforeTaskId: 999,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "最近表现不错~"
    }, {
      type: "text",
      content: "给你发点零花钱"
    }, {
      type: "text",
      content: "不过得玩一个游戏"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "玩什么游戏"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "按多少加多少零花钱"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我准备好了!"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "transfer"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "hongbao",
      coin: "transfer",
      noVideo: false,
      mustGet: true
    }],
    resultType: "transfer",
    resultInfo: [9, 7, 12]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "谢谢老板！"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "表现好下次还有~"
    }],
    resultType: "finish"
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "啊,我这运气也太差了吧"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "哈哈小可怜,那我给你发波福利吧"
    }, {
      type: "image",
      noVideo: false,
      width: 321,
      height: 408,
      path: "chat10",
      pathMask: "chatMask10"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "哇,我真是太感动了！"
    }],
    resultType: "finish"
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你怎么耍赖呢!"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "我没有那么多钱"
    }, {
      type: "text",
      content: "换个方式补偿你"
    }, {
      type: "text",
      content: "给你发一张男人看了就想冲的图片！"
    }, {
      type: "image",
      noVideo: false,
      width: 321,
      height: 408,
      path: "chat11",
      pathMask: "chatMask11"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "冲冲冲！！！"
    }],
    resultType: "finish"
  }]
}, {
  id: 17,
  name: "静香",
  icon: "icon15",
  personId: 10,
  triggerDay: 10,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "不好意思啊哥哥"
    }, {
      type: "text",
      content: "我加错人了"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "没事,那你删了吧"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "竟然那么有缘"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "那就交个朋友吧"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "嗯,可以"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "哥哥你长得好帅啊"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "你是做什么工作的"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "养鹅的"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你要鹅吗？"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "我家有一只"
    }, {
      type: "text",
      content: "我在我爸的公司上班"
    }, {
      type: "text",
      content: "做行政的"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "哦,那公司应该很大吧"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "要不买点鹅做员工餐?我给你打折"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "不了,我不是很喜欢这份工作"
    }, {
      type: "text",
      content: "我其实喜欢摄影,但我爸说我不务正业"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我觉得摄影蛮好的啊"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    chatList: [{
      type: "text",
      content: "我刚和他吵架了一架,心情不好,饭都不想吃"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那你买只鹅吧,特别好吃"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    chatList: [{
      type: "text",
      content: "我也知道他是对我好,但是他根本不知道我想要什么"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那还不如买只鹅吃"
    }],
    resultType: "chat",
    resultInfo: [19]
  }, {
    id: 19,
    chatList: [{
      type: "text",
      content: "主要也是我从小就是爷爷奶奶带大的,和他们沟通本来就不多"
    }],
    resultType: "chat",
    resultInfo: [20]
  }, {
    id: 20,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那你买只鹅回家给他们吃就能好好沟通了"
    }],
    resultType: "chat",
    resultInfo: [21]
  }, {
    id: 21,
    chatList: [{
      type: "text",
      content: "等我心情好了再说吧"
    }, {
      type: "text",
      content: "我先去找我爷爷奶奶了"
    }, {
      type: "text",
      content: "哥哥你现在在干嘛"
    }],
    resultType: "chat",
    resultInfo: [22]
  }, {
    id: 22,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我在吃烧鹅"
    }],
    resultType: "chat",
    resultInfo: [23]
  }, {
    id: 23,
    chatList: [{
      type: "text",
      content: "哎,现在爷爷奶奶年纪也大了,皱纹也越来越多了"
    }, {
      type: "text",
      content: "爷爷一直守着他的茶园不肯过来"
    }],
    resultType: "chat",
    resultInfo: [24]
  }, {
    id: 24,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那买只鹅给老人家补补身体"
    }],
    resultType: "chat",
    resultInfo: [25]
  }, {
    id: 25,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我给你打折"
    }],
    resultType: "chat",
    resultInfo: [26]
  }, {
    id: 26,
    chatList: [{
      type: "text",
      content: "暂时不用了"
    }, {
      type: "text",
      content: "我爷爷现在在炒茶"
    }, {
      type: "text",
      content: "哥哥你想尝尝吗"
    }],
    resultType: "chat",
    resultInfo: [27]
  }, {
    id: 27,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不用,我喜欢吃鹅,好吃又营养"
    }],
    resultType: "chat",
    resultInfo: [28]
  }, {
    id: 28,
    chatList: [{
      type: "text",
      content: "尝尝嘛,我给你寄一点过去"
    }],
    resultType: "chat",
    resultInfo: [29]
  }, {
    id: 29,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那行,我用我的鹅跟你换"
    }],
    resultType: "chat",
    resultInfo: [30]
  }, {
    id: 30,
    chatList: [{
      type: "text",
      content: "如果是我的,我就免费给哥哥寄过去了"
    }, {
      type: "text",
      content: "但是老人家年纪大了,炒茶不容易"
    }, {
      type: "text",
      content: "之前是1600一斤,哥哥你便宜点1000一斤吧"
    }],
    resultType: "chat",
    resultInfo: [31]
  }, {
    id: 31,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那确实,老人家也不容易"
    }],
    resultType: "chat",
    resultInfo: [32]
  }, {
    id: 32,
    isMy: true,
    chatList: [{
      type: "text",
      content: "这样吧,我跳几只最肥的鹅给爷爷寄过去"
    }],
    resultType: "chat",
    resultInfo: [33]
  }, {
    id: 33,
    isMy: true,
    chatList: [{
      type: "text",
      content: "之前1000一只,给你们就800"
    }],
    resultType: "chat",
    resultInfo: [34]
  }, {
    id: 34,
    chatList: [{
      type: "text",
      content: "鹅鹅鹅,你就知道鹅"
    }, {
      type: "text",
      content: "你是不是有问题"
    }, {
      type: "text",
      content: "懒得和你聊了"
    }],
    resultType: "chat",
    resultInfo: [35]
  }, {
    id: 35,
    isMy: true,
    chatList: [{
      type: "text",
      content: "别生气啊,买只鹅吃消消气吧"
    }],
    resultType: "chat",
    resultInfo: [36]
  }, {
    id: 36,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我给你打折"
    }],
    resultType: "finish"
  }]
}, {
  id: 18,
  name: "客服",
  icon: "icon16",
  personId: 11,
  triggerDay: 19,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "亲,你好"
    }, {
      type: "text",
      content: "37号客服为你服务"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我想买件衣服,诱惑吗"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "你想怎么诱惑？"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我说这款有货吗"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "哦！有的有的"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "给你朋友买的"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "我朋友?哪个朋友"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "给女朋友买的"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "哦哦,放心"
    }, {
      type: "text",
      content: "你女朋友穿上绝对漂亮"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你能活到付款码?"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "啊?你想干啥?"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "能货到付款吗?"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "抱歉,亲"
    }, {
      type: "text",
      content: "我们都是先付款后发货"
    }, {
      type: "text",
      content: "可以七天无理由退款的哦"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "哦,好爸"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    chatList: [{
      type: "text",
      content: ".......我是女生"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不好意思,老打错字"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    isMy: true,
    chatList: [{
      type: "text",
      content: "多买几件可以跟我幽会不?"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    chatList: [{
      type: "text",
      content: "啊？吃个饭还是可以的"
    }],
    resultType: "chat",
    resultInfo: [19]
  }, {
    id: 19,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我是说多买几件能给优惠不"
    }],
    resultType: "chat",
    resultInfo: [20]
  }, {
    id: 20,
    chatList: [{
      type: "text",
      content: "哦哦,可以打95折"
    }],
    resultType: "chat",
    resultInfo: [21]
  }, {
    id: 21,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那你可以保佑不?"
    }],
    resultType: "chat",
    resultInfo: [22]
  }, {
    id: 22,
    chatList: [{
      type: "text",
      content: "这个我没学过,我估计不行"
    }],
    resultType: "chat",
    resultInfo: [23]
  }, {
    id: 23,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我是说可以包邮吗"
    }],
    resultType: "chat",
    resultInfo: [24]
  }, {
    id: 24,
    chatList: [{
      type: "text",
      content: "我们这个衣服是不包邮的哦"
    }, {
      type: "text",
      content: "已经是史低最优惠了"
    }],
    resultType: "chat",
    resultInfo: [25]
  }, {
    id: 25,
    isMy: true,
    chatList: [{
      type: "text",
      content: "哦那我不买了,再见"
    }],
    resultType: "chat",
    resultInfo: [26]
  }, {
    id: 26,
    chatList: [{
      type: "text",
      content: "...."
    }, {
      type: "text",
      content: "好的,祝你生活愉快...."
    }],
    resultType: "finish"
  }]
}, {
  id: 19,
  name: "静静",
  icon: "icon4",
  personId: 4,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你怎么来我公司了"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "今天厂里停电了,提前下班了"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "你下次别过来了"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "被别人看到不好"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "是有点脏,没来得及换工服"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "下次我注意"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "下次别过来了,跑这么远"
    }, {
      type: "text",
      content: "你那么累早点回家休息呀"
    }, {
      type: "text",
      content: "我想你会去找你的"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好的,我知道了"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "嗯嗯,你先回家吧"
    }, {
      type: "text",
      content: "晚上我和闺蜜约了饭局"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那你早点回家哈"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "知道啦~爱你哟"
    }],
    resultType: "finish"
  }]
}, {
  id: 20,
  name: "静静",
  icon: "icon4",
  personId: 4,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "今天我也不回家吃饭咯"
    }, {
      type: "text",
      content: "公司聚餐"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "宝贝你已经很多天没在家吃饭了"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "这不是最近事情很多嘛"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "等有空了我会好好陪你的"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "嗯嗯,理解"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "注意休息哈,早点回家"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "今天会很晚,你不用等我啦"
    }, {
      type: "text",
      content: "晚上吃完饭去唱K"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "OK"
    }],
    resultType: "finish"
  }]
}, {
  id: 21,
  name: "静静",
  icon: "icon4",
  personId: 4,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你怎么在这里?"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不在这里我应该在鼓里吗"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "我和高总只是唱会歌,你别误会"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "你先回去吧"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你还准备瞒我多久"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "新换的LU包也是他买的吧"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "行,那我也懒得装了"
    }, {
      type: "text",
      content: "是他买的,你也买不起啊"
    }, {
      type: "text",
      content: "跟着你打螺丝什么时候是个头呢"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那你之前说的那些"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "现实一点吧"
    }, {
      type: "text",
      content: "总要往前看的"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "呵呵,是往钱看吧"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "行,那就不打扰两位的雅兴了,再也不见"
    }],
    resultType: "finish"
  }]
}, {
  id: 22,
  name: "京海高总",
  icon: "icon8",
  personId: 8,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "这场戏真是精彩"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "还得谢谢你这位导演"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "让我看清楚了一个人"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "现在的你可真是一无所有了"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "无所谓,失去的我都会拿回来的"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你们高家等着我的报复吧"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "高家纵横京海这么多年"
    }, {
      type: "text",
      content: "还没怕过谁"
    }, {
      type: "text",
      content: "就凭你?"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "看谁笑到最后吧"
    }],
    resultType: "finish"
  }]
}, {
  id: 23,
  name: "李管家",
  icon: "icon1",
  personId: 1,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "少爷不要太难过了"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "没关系"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "这也不一定是坏事"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "我这确实有好消息,不过也有坏消息"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "先说好消息吧"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "老爷和夫人回信了,应该很快就会联系您"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "他们还记得有我这个儿子"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "老爷和夫人还是很关心您的"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那坏消息呢"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "白家大小姐回国了"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那个小胖妞?她回来和我有啥关系"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    chatList: [{
      type: "text",
      content: "白小姐是回来和您履行婚约的"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    isMy: true,
    chatList: [{
      type: "text",
      content: "什么时候的婚约,我咋不知道"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    chatList: [{
      type: "text",
      content: "从小老爷就和白老爷签订的娃娃亲"
    }, {
      type: "text",
      content: "时间太久了,老爷估计是忘记告诉您了"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那个小胖妞能把我压死"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    isMy: true,
    chatList: [{
      type: "text",
      content: "这婚事我不同意!"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    chatList: [{
      type: "text",
      content: "少爷,白纸黑字,还是认命吧"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    isMy: true,
    chatList: [{
      type: "text",
      content: "......"
    }],
    resultType: "finish"
  }]
}, {
  id: 24,
  name: "白雪",
  icon: "icon17",
  personId: 12,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "小瘦猴,我到京海了"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你是?我们认识吗"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你怎么知道我的外号"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "不认识我了？"
    }, {
      type: "text",
      content: "我是白雪呀"
    }, {
      type: "text",
      content: "小时候你还偷偷亲过我呢"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "小胖妞?"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你别瞎说,我可没亲过你"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "你不想认账咯"
    }, {
      type: "text",
      content: "小时候还说让我当你的新娘子呢"
    }, {
      type: "text",
      content: "你这个骗子"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那时候还小,不算不算"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我又不喜欢你,感情不能勉强的"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "那你为什么不喜欢我呢"
    }, {
      type: "text",
      content: "说吧,反正我不会改"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不喜欢就不喜欢"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    chatList: [{
      type: "text",
      content: "反正我们有婚约的,嗯哼~"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不听不听王八念经"
    }],
    resultType: "finish"
  }]
}, {
  id: 25,
  name: "白雪",
  icon: "icon17",
  personId: 12,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "起床啦小猴子"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不要叫我小猴子了,小胖妞"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我现在有肌肉,已经很强壮了"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "那你还一直叫我小胖妞呢"
    }, {
      type: "text",
      content: "我又不胖了"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你别告诉我这个头像是你自己"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "一定是网图吧"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "这就是我呀"
    }, {
      type: "text",
      content: "切~就准你变壮,不准我变瘦啦"
    }, {
      type: "text",
      content: "我现在好看吗"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好看...不是,不难看而已"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "哈哈你还是这么可爱"
    }, {
      type: "text",
      content: "估计脸都要红了"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "别瞎说,你这小胖妞"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我先继续干活了!"
    }],
    resultType: "finish"
  }]
}, {
  id: 26,
  name: "小雅老师",
  icon: "icon4",
  personId: 20,
  triggerDay: 6,
  beforeTaskId: 9,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "在干嘛呀"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "在发呆呢"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "找我有事吗"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "没事啊"
    }, {
      type: "text",
      content: "我只是有两张多余的电影票"
    }, {
      type: "text",
      content: "不知道怎么处理呢"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "什么电影呀"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "午夜凶凌!"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "有没有兴趣呀"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "啊？"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "那要不等会一起去看？"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我还得加班呢"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "好吧~"
    }, {
      type: "text",
      content: "果然还是害怕呀"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不见不散!"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "嘻嘻~好的"
    }],
    resultType: "finish"
  }]
}, {
  id: 27,
  name: "小雅老师",
  icon: "icon4",
  personId: 20,
  triggerDay: 6,
  beforeTaskId: 26,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "哈哈哈,太好看了"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我觉得还可以..."
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "没网上说的那么夸张"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "是嘛？"
    }, {
      type: "text",
      content: "刚刚是谁紧紧抓着我的手呀"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我是担心你害怕"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "所以抓着你让你放心"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "那刚刚是谁的腿在抖呀"
    }, {
      type: "text",
      content: "我还以为地震了呢"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "个人习惯而已，又不是害怕"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "你就是小鸡崽见老鹰"
    }, {
      type: "text",
      content: "嘴硬腿软"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那下次再看其他的恐怖片"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你看我到底怕不怕"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    chatList: [{
      type: "text",
      content: "好哒,一言为定哦"
    }],
    resultType: "finish"
  }]
}, {
  id: 28,
  name: "李管家",
  icon: "icon1",
  personId: 1,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "少爷最近开朗了很多呀"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "有吗"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我自己都没感觉到呢"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "明显笑容更多了"
    }, {
      type: "text",
      content: "对了,少爷有个事要和您说一下"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "怎么了"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "白老爷约了您明天共进晚餐"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "地点就在他府上"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "这不就是家宴了吗"
    }, {
      type: "text",
      content: "我能不去吗?"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "我们两家一向私交甚好"
    }, {
      type: "text",
      content: "不去不太合适"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好吧..那我准备一下吧"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "感觉明天将是一个修罗场"
    }],
    resultType: "finish"
  }]
}, {
  id: 29,
  name: "大师",
  icon: "icon18",
  personId: 13,
  triggerDay: 16,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "这位施主有何疑惑"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "大师,我不懂如何放下"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "这个简单"
    }, {
      type: "text",
      content: "你身边有开水吗?"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "有,刚烧的"
    }, {
      type: "text",
      content: "非常沸腾"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "倒杯子里"
    }, {
      type: "text",
      content: "用力握住"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "握不住,太烫了,摔碎了"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "你悟了吗?"
    }, {
      type: "text",
      content: "这个世界就没有放不下的"
    }, {
      type: "text",
      content: "痛了,就放下了"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "大师,我想再试一下"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "好,再把水烧一下"
    }, {
      type: "text",
      content: "然后再放进去"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "大师,这次我握住了"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "痛吗"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "痛"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "放下了吗"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "没有"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    chatList: [{
      type: "text",
      content: "继续倒"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    isMy: true,
    chatList: [{
      type: "text",
      content: "倒了,有点烫"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    chatList: [{
      type: "text",
      content: "放下了吗"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    isMy: true,
    chatList: [{
      type: "text",
      content: "没有"
    }],
    resultType: "chat",
    resultInfo: [19]
  }, {
    id: 19,
    chatList: [{
      type: "text",
      content: "你为何不放下？"
    }],
    resultType: "chat",
    resultInfo: [20]
  }, {
    id: 20,
    isMy: true,
    chatList: [{
      type: "text",
      content: "因为我换了个保温杯"
    }],
    resultType: "chat",
    resultInfo: [21]
  }, {
    id: 21,
    chatList: [{
      type: "text",
      content: "曹,那你可真是小机灵鬼"
    }],
    resultType: "finish"
  }]
}, {
  id: 30,
  name: "白老爷",
  icon: "icon19",
  personId: 14,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "小王,别这么拘谨"
    }, {
      type: "text",
      content: "都是一家人"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好多年没见了,白叔"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "您身体还是一样的健朗"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "不愧是遗传了老王的基因"
    }, {
      type: "text",
      content: "你都已经是个帅小伙了"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那还是不及白叔年轻时一半"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "你小子还是那么会说话"
    }, {
      type: "text",
      content: "对了这次约你来"
    }, {
      type: "text",
      content: "主要还是聊下你和小雪的婚约"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "白叔..."
    }, {
      type: "text",
      content: "我现在确实配不上小雪"
    }, {
      type: "text",
      content: "请您收回婚约吧"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "你这孩子"
    }, {
      type: "text",
      content: "老王的不要脸你倒是一点没学到"
    }, {
      type: "text",
      content: "我像是这么古板的人吗"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那白叔的意思是.."
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "你们年轻人谈恋爱我管不着"
    }, {
      type: "text",
      content: "不要太在乎婚约"
    }, {
      type: "text",
      content: "你们可以试着接触下"
    }, {
      type: "text",
      content: "万一合拍呢"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我知道了"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    chatList: [{
      type: "text",
      content: "不过我可提醒你"
    }, {
      type: "text",
      content: "小雪现在可是抢手的很"
    }, {
      type: "text",
      content: "你得加油了"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好的,谢谢白叔！"
    }],
    resultType: "finish"
  }]
}, {
  id: 31,
  name: "正经商家",
  icon: "icon20",
  personId: 15,
  triggerDay: 17,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "亲亲,您买的痔疮药还满意吗"
    }, {
      type: "text",
      content: "可以赏个好评吗"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好评有奖励吗?"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "可以给您返一些功德"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "什么功德??"
    }, {
      type: "text",
      content: "怎么返"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "亲亲,您好评一下"
    }, {
      type: "text",
      content: "我返给您就知道了"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好评完了,你看下"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "好的,亲亲,稍等一下"
    }, {
      type: "text",
      content: "我要准备一下"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "...."
    }, {
      type: "text",
      content: "过了很久了,你不会骗我吧"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "来了来了"
    }, {
      type: "text",
      content: "您贵姓呀"
    }, {
      type: "text",
      content: "是哪里人"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "王..京海人"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "好的!"
    }, {
      type: "image",
      noVideo: true,
      width: 321,
      height: 408,
      path: "chat5"
    }, {
      type: "text",
      content: "亲亲请查收下"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "难怪突然有种醍醐灌顶的感觉"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    isMy: true,
    chatList: [{
      type: "text",
      content: "下次再来你家买药!"
    }],
    resultType: "finish"
  }]
}, {
  id: 32,
  name: "小雅老师",
  icon: "icon4",
  personId: 20,
  triggerDay: 8,
  beforeTaskId: 27,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "在吗在吗？"
    }, {
      type: "text",
      content: "有一个十万火急的事情"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "咋啦咋啦"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "你饿了吗"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我还没饿"
    }, {
      type: "text",
      content: "刚吃完饭呢"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "不对"
    }, {
      type: "text",
      content: "你应该饿了吧"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "还好啦"
    }, {
      type: "text",
      content: "刚吃了三碗饭"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "我感觉你是饿了"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "这么一说..."
    }, {
      type: "text",
      content: "是有点饿..."
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "那你想吃什么呀？"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我也许想吃..."
    }, {
      type: "text",
      content: "馄饨？"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "你不想吧!"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那我想吃炸鸡？"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "是吗，不是才吃过吗"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那我想吃火锅了..."
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    chatList: [{
      type: "text",
      content: "原来你想吃火锅呀"
    }, {
      type: "text",
      content: "那我陪你去吧"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好的,谢谢你..."
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    chatList: [{
      type: "text",
      content: "嘻嘻，不用客气"
    }],
    resultType: "finish"
  }]
}, {
  id: 33,
  name: "狗蛋",
  icon: "icon3",
  personId: 3,
  triggerDay: 11,
  beforeTaskId: 3,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "兄弟,下班了吗"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "还有几分钟"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "下班了去上网不"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你怎么天天想着上网"
    }, {
      type: "text",
      content: "你就没有其他爱好吗"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "我还喜欢洗脚呀"
    }, {
      type: "text",
      content: "咋啦？"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你总这样,不太好"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你有没有清晰的目标"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你将来想干什么？"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "当然有啊"
    }, {
      type: "text",
      content: "天天上网它不香吗"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那你说人活着为了什么？"
    }, {
      type: "text",
      content: "我不想再活的浑浑噩噩"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我想要"
    }, {
      type: "text",
      content: "为天地立心"
    }, {
      type: "text",
      content: "为人民立命"
    }, {
      type: "text",
      content: "为往圣继绝学"
    }, {
      type: "text",
      content: "为万事开太平！"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    chatList: [{
      type: "text",
      content: "你昨天是不是去上网了"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你咋知道?!"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    chatList: [{
      type: "text",
      content: "主要我每次上完后也会有你这感觉"
    }, {
      type: "text",
      content: "就问你,今天你去不去"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不去,我要改变！"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    chatList: [{
      type: "text",
      content: "我请客"
    }, {
      type: "text",
      content: "不要你花钱"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    isMy: true,
    chatList: [{
      type: "text",
      content: "马上下班,等会来接我"
    }],
    resultType: "finish"
  }]
}, {
  id: 34,
  name: "狗蛋",
  icon: "icon3",
  personId: 3,
  triggerDay: 12,
  beforeTaskId: 33,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "今天有空不兄弟"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "昨天不是才通宵吗?"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "今天不去了"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "你误会了"
    }, {
      type: "text",
      content: "我是想叫你去洗脚"
    }, {
      type: "text",
      content: "昨天上网太累了"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不去不去"
    }, {
      type: "text",
      content: "子涵知道了我会挨打的"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "再说那也不是好地方"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "兄弟你们对洗脚是不是有些误会"
    }, {
      type: "text",
      content: "你仔细想想"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "此话怎讲"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "我们有手有脚"
    }, {
      type: "text",
      content: "有钱可以自己挣"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "她们就不一样了"
    }, {
      type: "text",
      content: "家境贫困,还有弟弟妹妹要上学"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "我们去帮助一下"
    }, {
      type: "text",
      content: "这不是应该的嘛"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好像有点道理"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "再说她们挣的钱也干干净净"
    }, {
      type: "text",
      content: "都是我们的血汗钱"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    chatList: [{
      type: "text",
      content: "有什么理由不支持"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好吧,等会来接我"
    }, {
      type: "text",
      content: "先说好,我有几个原则"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    chatList: [{
      type: "text",
      content: "我请客"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    isMy: true,
    chatList: [{
      type: "text",
      content: "gogogo!"
    }],
    resultType: "finish"
  }]
}, {
  id: 35,
  name: "京海十环两套房",
  icon: "icon21",
  personId: 16,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你就是那个什么撕葱？"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "是我,请问您是？"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "你不需要知道我的名字"
    }, {
      type: "text",
      content: "你只要知道你配不上小美"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你在说什么,我听不懂"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "你只要知道"
    }, {
      type: "text",
      content: "小美是我的就可以了"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "可是我和小雪青梅竹马诶"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "看你在这电子厂上班"
    }, {
      type: "text",
      content: "你一个月几个钱"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "看我的名字"
    }, {
      type: "text",
      content: "知道我的实力了吗"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "感情不是钱衡量的"
    }, {
      type: "text",
      content: "再说"
    }, {
      type: "text",
      content: "你这十环也有点点偏呀"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "...."
    }, {
      type: "text",
      content: "这是短时间的"
    }, {
      type: "text",
      content: "我还会努力的!"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "哈哈,那你要加油哦！"
    }],
    resultType: "finish"
  }]
}, {
  id: 36,
  name: "小山",
  icon: "icon22",
  personId: 17,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你就是小美的舔狗吧"
    }, {
      type: "text",
      content: "啧啧，你像个小土鳖"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你又是谁？"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "怎么骂人呢"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "我才不会告诉你我是谁"
    }, {
      type: "text",
      content: "反正不准你靠近我姐姐"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "哦哦,原来是小山啊"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我小时候还抱过你呢"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "少来套近乎"
    }, {
      type: "text",
      content: "我不吃这套"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那玩王者不？"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "你玩啥位置？"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我野王呀"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "真的假的"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "嗯哼，国服打野"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "那我玩瑶挂你身上"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    chatList: [{
      type: "text",
      content: "带我上分哦~姐夫"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    isMy: true,
    chatList: [{
      type: "text",
      content: "没问题!"
    }],
    resultType: "finish"
  }]
}, {
  id: 37,
  name: "小山",
  icon: "icon22",
  personId: 17,
  triggerDay: 998,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "姐夫，今天还玩游戏不"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "今天我加班,玩不了"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "玩嘛~玩嘛~我还要挂你身上"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "好吧"
    }, {
      type: "text",
      content: "我姐今天夜班吧"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "嗯,怎么了"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "那我去你家陪你睡吧"
    }, {
      type: "text",
      content: "我一个人在家害怕"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不行"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你都十八了，成年了"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "没关系，姐夫"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "我不会告诉我姐的"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "真的不行"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    chatList: [{
      type: "text",
      content: "但是我一个人真的害怕啊"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "求你了姐夫"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "滚犊子"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你一个大小伙子，你怕啥"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 17,
    isMy: true,
    chatList: [{
      type: "text",
      content: "真的玩不了"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 16,
    chatList: [{
      type: "text",
      content: "哼"
    }],
    resultType: "finish"
  }]
}, {
  id: 38,
  name: "小区保安",
  icon: "icon23",
  personId: 18,
  triggerDay: 18,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你好，我是小区安保王大爷"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你好，王大爷"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "有什么事吗"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "我姓安，谢谢！"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "安？哦，不好意思，安大爷"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "是这样的"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "我昨天路过你家门是开的"
    }],
    resultType: "chat",
    resultInfo: [21]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "原来是你啊！"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你现在在安保室吗？"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "不用谢我啊！"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "这是一个优秀的保安应该的"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    chatList: [{
      type: "text",
      content: "也别买什么东西啊，吃的抽的"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "你非要买，倒也不是不行"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你误会了"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    isMy: true,
    chatList: [{
      type: "text",
      content: "主要是我昨晚一个人没带钥匙"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    isMy: true,
    chatList: [{
      type: "text",
      content: "到窗口吹个风"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    isMy: true,
    chatList: [{
      type: "text",
      content: "门就关了，现在都没进去"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    chatList: [{
      type: "text",
      content: " 额，这就尴尬了"
    }],
    resultType: "chat",
    resultInfo: [19]
  }, {
    id: 19,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我马上过来找你!!"
    }],
    resultType: "chat",
    resultInfo: [20]
  }, {
    id: 21,
    chatList: [{
      type: "text",
      content: " 就好心把门关上了"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 20,
    chatList: [{
      type: "text",
      content: "别冲动啊年轻人！"
    }],
    resultType: "finish"
  }]
}, {
  id: 39,
  name: "小雅老师",
  icon: "icon4",
  personId: 20,
  triggerDay: 9,
  beforeTaskId: 32,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "子涵爸爸！"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "咋了咋了"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "我发现我掌握了一个新技能"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "啥技能呀"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "做饭！"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "色香味俱全！"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "听起来很厉害"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "啥时候露一手"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "你别着急哈，马上出炉了"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "等会给你送过来"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好的呀，期待！"
    }],
    resultType: "finish"
  }]
}, {
  id: 40,
  name: "小雅老师",
  icon: "icon4",
  personId: 20,
  triggerDay: 9,
  beforeTaskId: 39,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "尝完记得给我反馈哈~"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好的"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "咋样~"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一口没剩..."
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "哇，看来我还是很有天赋的！"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "全吐了"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "怎么会这样"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "我自己试了挺好吃的呀"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你怎么做的"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我看一下"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "image",
      noVideo: true,
      width: 321,
      height: 408,
      path: "chat6"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    chatList: [{
      type: "text",
      content: "我看菜谱上就是这么做的"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我觉得吧"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "应该是菜谱的问题"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    chatList: [{
      type: "text",
      content: "那我下次再换一本再做下"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    isMy: true,
    chatList: [{
      type: "text",
      content: "现在都没什么靠谱的"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    isMy: true,
    chatList: [{
      type: "text",
      content: "干脆别做了，以后我来做"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    chatList: [{
      type: "text",
      content: "那也行~"
    }],
    resultType: "chat",
    resultInfo: [19]
  }, {
    id: 19,
    isMy: true,
    chatList: [{
      type: "text",
      content: "嗯嗯"
    }],
    resultType: "finish"
  }]
}, {
  id: 41,
  name: "菲菲",
  icon: "icon24",
  personId: 19,
  triggerDay: 5,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "哈喽先生你好"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    chatList: [{
      type: "text",
      content: "请问你最近有去印度旅游吗"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "对呀，你怎么知道的"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "是这样的，我们这边系统显示"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "你的信用卡在印度消费了两万"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "请问是您本人消费的吗"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "是不是搞错了"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "没搞错，我这边系统就是你"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我明明刷了100多万"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "...."
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "不好意思不好意思"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    chatList: [{
      type: "text",
      content: "我们刚刚重新核对了一下"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "你确实消费了100多万"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    chatList: [{
      type: "text",
      content: "请问一下，这钱具体用来干嘛了"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我买大象了"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    chatList: [{
      type: "text",
      content: "啥玩意儿"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    chatList: [{
      type: "text",
      content: "大象可以随便买卖吗"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我在黑市买的"
    }],
    resultType: "chat",
    resultInfo: [19]
  }, {
    id: 19,
    chatList: [{
      type: "text",
      content: "啊这.."
    }],
    resultType: "chat",
    resultInfo: [20]
  }, {
    id: 20,
    chatList: [{
      type: "text",
      content: "贫穷限制了我的想象力"
    }],
    resultType: "chat",
    resultInfo: [21]
  }, {
    id: 21,
    chatList: [{
      type: "text",
      content: "那您买大象干嘛呢"
    }],
    resultType: "chat",
    resultInfo: [22]
  }, {
    id: 22,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我给炖了"
    }],
    resultType: "chat",
    resultInfo: [23]
  }, {
    id: 23,
    isMy: true,
    chatList: [{
      type: "text",
      content: "大象炖土豆贼入味"
    }],
    resultType: "chat",
    resultInfo: [24]
  }, {
    id: 24,
    chatList: [{
      type: "text",
      content: " 呵呵，你比我还能吹呢"
    }],
    resultType: "chat",
    resultInfo: [25]
  }, {
    id: 25,
    chatList: [{
      type: "text",
      content: "把我思路都打乱了"
    }],
    resultType: "finish"
  }]
}, {
  id: 42,
  name: "小区保安",
  icon: "icon23",
  personId: 18,
  triggerDay: 21,
  beforeTaskId: 38,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "上次属实是意外"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "理解的王大爷"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "安"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "哦，安大爷"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "对了，今天我朋友来过吗"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "你朋友有什么特征吗"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "她女的，脾气不太好"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "扎了头发，穿了衣服"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "忘了胖不胖了"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    chatList: [{
      type: "text",
      content: "额...或者她还有啥其他特点吗"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 11,
    chatList: [{
      type: "text",
      content: "或者带了什么东西"
    }],
    resultType: "chat",
    resultInfo: [12]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "对了，她带着我的电脑"
    }],
    resultType: "chat",
    resultInfo: [13]
  }, {
    id: 13,
    chatList: [{
      type: "text",
      content: "什么样的电脑？"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    isMy: true,
    chatList: [{
      type: "text",
      content: "黄色rogg朋克风限定机箱"
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    isMy: true,
    chatList: [{
      type: "text",
      content: "cpu,i9-12900k"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 16,
    isMy: true,
    chatList: [{
      type: "text",
      content: "z690主板"
    }],
    resultType: "chat",
    resultInfo: [17]
  }, {
    id: 17,
    isMy: true,
    chatList: [{
      type: "text",
      content: "ddr5双16g内存条"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    isMy: true,
    chatList: [{
      type: "text",
      content: "叁星980 pro1TB固态硬盘"
    }],
    resultType: "chat",
    resultInfo: [19]
  }, {
    id: 19,
    isMy: true,
    chatList: [{
      type: "text",
      content: "外加一个4090ti的显卡呀"
    }],
    resultType: "chat",
    resultInfo: [20]
  }, {
    id: 20,
    isMy: true,
    chatList: [{
      type: "text",
      content: "王大爷你可一定要找到她啊"
    }],
    resultType: "chat",
    resultInfo: [21]
  }, {
    id: 21,
    chatList: [{
      type: "text",
      content: "放心，我一定会找到你的电脑的"
    }],
    resultType: "chat",
    resultInfo: [22]
  }, {
    id: 22,
    isMy: true,
    chatList: [{
      type: "text",
      content: "谢谢！"
    }],
    resultType: "finish"
  }]
}, {
  id: 44,
  name: "小雅老师",
  icon: "icon4",
  personId: 20,
  triggerDay: 2,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "子涵爸爸,你不要压力太大了"
    }, {
      type: "text",
      content: "我相信你会逆袭的"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "谢谢小雅老师"
    }, {
      type: "text",
      content: "我会努力的"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "嗯嗯,赚钱需要一步步慢慢积累"
    }, {
      type: "text",
      content: "你不要累坏了"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好的"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "对了,有多余的金币记得提早去升级"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "还有多多招募助理"
    }, {
      type: "text",
      content: "这样赚钱更轻松"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我等会就试试"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "那你加油哦~"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好哒"
    }],
    resultType: "finish"
  }]
}, {
  id: 43,
  name: "爸爸",
  icon: "icon43",
  personId: 21,
  triggerDay: 1,
  beforeTaskId: 9991,
  emergencyId: 9991,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "听说你和如烟离了?"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "嗯,是"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "没事,过去的就过去"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "重要的是如何过好当下和未来"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好的爸,您儿子很坚强的"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "哈哈,这才是我的好儿子嘛"
    }, {
      type: "text",
      content: "振作起来,别让子涵这丫头跟你吃苦了"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "爸,您就放心吧"
    }, {
      type: "text",
      content: "我肯定会让她过上好日子的"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "hongbao",
      coin: 5e4
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    chatList: [{
      type: "text",
      content: "这是我这些年的积蓄,你先拿去应急"
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "谢谢爸,我一定不会让您失望的"
    }],
    resultType: "finish"
  }]
}, {
  id: 49,
  name: "妈妈",
  icon: "icon321",
  personId: 22,
  triggerDay: 9991,
  beforeTaskId: 9991,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "儿子,妈也知道了"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我没事的,妈"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "没事就多回家坐坐,我帮你带带子涵"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "这样你身上担子轻一点"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "嗯嗯,我以后一定多回家看你们"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "你们父女两在外面也多注意身体"
    }, {
      type: "text",
      content: "别把身体累垮了"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "肯定不会的,放心,妈"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "有啥问题随时和妈说啊,别憋着"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "知道啦,爱你老妈"
    }],
    resultType: "finish"
  }]
}, {
  id: 48,
  name: "宝贝女儿",
  icon: "icon45",
  personId: 25,
  triggerDay: 3,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "爸爸你下班了吗?"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "宝贝,我马上就回来了"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "那宝贝晚上可以和你一起睡吗"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "我一个人睡不着"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "爸爸这就回来了,你等等啊"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "好,宝贝等着呢"
    }, {
      type: "text",
      content: "爸爸今天辛苦不辛苦？"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不辛苦呀"
    }, {
      type: "text",
      content: "今天上学好玩吗"
    }],
    resultType: "chat",
    resultInfo: [8]
  }, {
    id: 8,
    chatList: [{
      type: "text",
      content: "很好玩,小雅老师也对我特别好"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那就好,那宝贝在等我会,爸爸就到了"
    }],
    resultType: "finish"
  }]
}, {
  id: 45,
  name: "男神粉丝团",
  icon: "icon10",
  personId: 23,
  triggerDay: 0,
  beforeTaskId: 999,
  emergencyId: 0,
  taskList: [{
    id: 1,
    icon: "icon27",
    chatList: [{
      type: "text",
      content: "听说你搞到了绝版的男神内裤"
    }, {
      type: "text",
      content: "是原汁原味的不？"
    }],
    resultType: "chat",
    resultInfo: [20]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "内裤有卤香味,我舍不得"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "破内裤这么值钱？我卖了！"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 4,
    icon: "icon25",
    chatList: [{
      type: "text",
      content: "他的内裤看起来很时髦,卖给我"
    }, {
      type: "text",
      content: "我准备买来外穿,不多说了,直接1亿"
    }],
    resultType: "chat",
    resultInfo: [22]
  }, {
    id: 5,
    icon: "icon27",
    chatList: [{
      type: "hongbao",
      coin: 5e7,
      noVideo: true
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "谢谢老板"
    }],
    resultType: "finish"
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "不行,我准备留着自己穿"
    }],
    resultType: "chat",
    resultInfo: [11]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好吧,我成全你,成交！"
    }],
    resultType: "chat",
    resultInfo: [9]
  }, {
    id: 9,
    icon: "icon25",
    chatList: [{
      type: "hongbao",
      coin: 1e8,
      noVideo: true
    }],
    resultType: "chat",
    resultInfo: [10]
  }, {
    id: 10,
    isMy: true,
    chatList: [{
      type: "text",
      content: "老板大气！"
    }],
    resultType: "finish"
  }, {
    id: 11,
    icon: "icon27",
    chatList: [{
      type: "text",
      content: "为了男神,我拼了！"
    }, {
      type: "text",
      content: "我出5亿!求求你卖给我吧！"
    }],
    resultType: "chat",
    resultInfo: [23]
  }, {
    id: 12,
    isMy: true,
    chatList: [{
      type: "text",
      content: "但是我还是不想卖"
    }],
    resultType: "chat",
    resultInfo: [16]
  }, {
    id: 13,
    isMy: true,
    chatList: [{
      type: "text",
      content: "就决定是你了老板!"
    }],
    resultType: "chat",
    resultInfo: [14]
  }, {
    id: 14,
    icon: "icon27",
    chatList: [{
      type: "hongbao",
      coin: 5e8,
      noVideo: true
    }],
    resultType: "chat",
    resultInfo: [15]
  }, {
    id: 15,
    isMy: true,
    chatList: [{
      type: "text",
      content: "老板爽快人"
    }],
    resultType: "finish"
  }, {
    id: 16,
    icon: "icon26",
    chatList: [{
      type: "text",
      content: "这条内裤我不可能让,我出10亿"
    }, {
      type: "text",
      content: "这条大裤衩我大呆呆必须拿下"
    }],
    resultType: "chat",
    resultInfo: [24]
  }, {
    id: 17,
    isMy: true,
    chatList: [{
      type: "text",
      content: "老板好眼光,还是热乎的呢"
    }, {
      type: "text",
      content: "我就只想卖给你"
    }],
    resultType: "chat",
    resultInfo: [18]
  }, {
    id: 18,
    icon: "icon26",
    chatList: [{
      type: "hongbao",
      coin: 1e9,
      noVideo: true
    }],
    resultType: "chat",
    resultInfo: [19]
  }, {
    id: 19,
    isMy: true,
    chatList: [{
      type: "text",
      content: "谢谢老板!我有还联系你"
    }],
    resultType: "finish"
  }, {
    id: 20,
    isMy: true,
    chatList: [{
      type: "text",
      content: "这东西这么抢手？"
    }, {
      type: "text",
      content: "你出多少价格呀"
    }],
    resultType: "chat",
    resultInfo: [21]
  }, {
    id: 21,
    icon: "icon27",
    chatList: [{
      type: "text",
      content: "为了男神,我愿意出5000万"
    }],
    resultType: "chat",
    resultInfo: [2, 3]
  }, {
    id: 22,
    isMy: true,
    chatList: [{
      type: "text",
      content: "内裤外穿想想就很酷啊！"
    }],
    resultType: "chat",
    resultInfo: [7, 8]
  }, {
    id: 23,
    isMy: true,
    chatList: [{
      type: "text",
      content: "一条内裤能拍到5亿？！"
    }],
    resultType: "chat",
    resultInfo: [12, 13]
  }, {
    id: 24,
    icon: "icon26",
    chatList: [{
      type: "text",
      content: "这已经是市场最高价了！没人和我抢了吧"
    }],
    resultType: "chat",
    resultInfo: [17]
  }]
}, {
  id: 46,
  name: "妈妈",
  icon: "icon321",
  personId: 23,
  triggerDay: 2,
  beforeTaskId: 0,
  emergencyId: 1,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "儿子，你还记得咱们村里的小强吗？"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "记得呀，怎么啦"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "我记得你跟小强关系还不错，小强现在在做贸易经商"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "现在是个机会，他需要进城收购一些物品，你可以帮帮他"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "他怎么不自己进城购买呢"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "小强的暗恋对象不是在城里嘛，不太方便进城"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好，我去看看"
    }],
    resultType: "chat",
    resultInfo: [8, 9]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我准备一下"
    }],
    resultType: "finish"
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "btn",
      content: "立即回乡",
      changeUI: ["MainUI", "VillageScene"]
    }],
    resultType: "finish"
  }]
}, {
  id: 47,
  name: "富婆",
  icon: "icon44",
  personId: 24,
  triggerDay: 17,
  beforeTaskId: 0,
  emergencyId: 1,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你今天怎么没来找我呀~你看我今天好看吗？"
    }, {
      type: "image",
      noVideo: false,
      width: 321,
      height: 408,
      path: "chat47",
      pathMask: "chatMask47"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "一会就来看你"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    icon: "icon44",
    chatList: [{
      type: "hongbao",
      coin: 1e6,
      noVideo: false
    }, {
      type: "text",
      content: "这是给你的零花钱"
    }],
    resultType: "chat",
    resultInfo: [4, 5]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "btn",
      content: "前往别墅",
      changeUI: ["MainUI", "VillageScene", "CountMoneyUI"]
    }],
    resultType: "finish"
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "一会就来"
    }],
    resultType: "finish"
  }]
}, {
  id: 1001,
  name: "秦少",
  icon: "icon51",
  personId: 1,
  triggerDay: 998888,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "我是秦某某本人，麻烦你把寒假作业还给我"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那你怎么证明寒假作业是你的呢？"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "啊？那你要怎么你妈是你妈？？？"
    }],
    resultType: "chat",
    resultInfo: [4, 5]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "...是哪个学校的，你总得告诉我吧"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "写了多少啦？你说这本作业是你的"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "我在西场小学上学，快点吧作业寄给我，地址xxxx"
    }],
    resultType: "chat",
    resultInfo: [8, 9]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "当然写完啦，而且字迹工整，无空白处"
    }],
    resultType: "chat",
    resultInfo: [8, 9]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "立刻邮寄"
    }],
    resultType: "finish",
    homework: 0
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一会联系你"
    }],
    resultType: "finish",
    homework: 1
  }]
}, {
  id: 1002,
  name: "阿谀奉承",
  icon: "icon45",
  personId: 2,
  triggerDay: 998888,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "赶紧给我把寒假作业邮过来"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你是谁？跟秦某某什么关系"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "大胆，敢这么称呼秦少，我是秦少小弟"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "立刻将寒假作业邮过来，不然的话，二十年后秦帝率神州大军踏平***国"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "...流弊"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "地址是：东场场小学三年八班办公室"
    }],
    resultType: "chat",
    resultInfo: [7, 8]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "立刻邮寄"
    }],
    resultType: "finish",
    homework: 0
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一会寄给你"
    }],
    resultType: "finish",
    homework: 1
  }]
}, {
  id: 1003,
  name: "小秦舅舅",
  icon: "icon53",
  personId: 3,
  triggerDay: 998888,
  beforeTaskId: 0,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你好，我是秦某某的舅舅，麻烦你了，我一会要再给他买一些作业试卷一并给他邮寄过去"
    }],
    resultType: "chat",
    resultInfo: [2, 3]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "请问你侄子在哪里上学呢"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "请问你侄子把作业丢在哪里了呢"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "他好像在xxx市西场小学上学吧，这事我也不太清除具体的地方"
    }],
    resultType: "chat",
    resultInfo: [6, 7]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "这是说来话长，长话短说，他在外面玩把作业丢在外面了"
    }],
    resultType: "chat",
    resultInfo: [6, 7]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "立刻邮寄"
    }],
    resultType: "finish",
    homework: 0
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好，我一会联系你"
    }],
    resultType: "finish",
    homework: 1
  }]
}, {
  id: 1004,
  name: "小秦班主任",
  icon: "icon47",
  personId: 4,
  triggerDay: 998888,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你好，我是秦某某的班主任，我看到你在找咱们学校的学生，所以找了过来"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    isMy: true,
    chatList: [{
      type: "text",
      content: "原来是这样，我一会就给您邮寄过去"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "非常感谢，到时候一定让他当面给你道谢"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那到不必了，对了你们学校为什么叫西场小学呀，一定有深意吧"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "啊？这个，我太清楚，我刚来这里上班没多久"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "哦，原来是这样"
    }],
    resultType: "chat",
    resultInfo: [7, 8]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "立刻邮寄"
    }],
    resultType: "finish",
    homework: 0
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一会寄给你"
    }],
    resultType: "finish",
    homework: 1
  }]
}, {
  id: 1005,
  name: "小秦妈妈",
  icon: "icon49",
  personId: 1,
  triggerDay: 998888,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你好，我是小秦的妈妈，麻烦你把作业邮寄给我"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    chatList: [{
      type: "text",
      content: "等过几天要开学了，我悄悄的把作业放到他枕头旁边"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "我让他怀疑人生"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "...这会给小朋友吓出后遗症吧"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "这是给他的教训，让他出去玩，把作业丢在外面"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "啊...这...是不是不太好的样子"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "好像是不太好，那麻烦你帮我邮寄到东场小学，一年级办公室，让他们老师好好教育一下他"
    }],
    resultType: "chat",
    resultInfo: [8, 9]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "立刻邮寄"
    }],
    resultType: "finish",
    homework: 2
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一会寄给你"
    }],
    resultType: "finish",
    homework: 1
  }]
}, {
  id: 1006,
  name: "小秦爸爸",
  icon: "icon46",
  personId: 21,
  triggerDay: 998888,
  beforeTaskId: 43,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你好，我是小秦的爸爸，麻烦你把作业邮寄给我"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    chatList: [{
      type: "text",
      content: "这孩子真的是欠揍了，看我不把他S给他打出来"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "小秦爸爸，你这样是不是不太好"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "没事，上次他告老师我作业没写完，害的我爸给我一顿胖揍"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "...小朋友，你是小秦的同学是吗？"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    chatList: [{
      type: "text",
      content: "不，我是小秦爸爸，他上次打赌输了"
    }],
    resultType: "chat",
    resultInfo: [7, 8]
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "立刻邮寄"
    }],
    resultType: "finish",
    homework: 0
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一会寄给你"
    }],
    resultType: "finish",
    homework: 1
  }]
}, {
  id: 1007,
  name: "秦少的噩梦",
  icon: "icon48",
  personId: 5,
  triggerDay: 998888,
  beforeTaskId: 6,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "你怎么肥四，我好不容易放在厕所的作业，你捡回来干嘛"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    chatList: [{
      type: "text",
      content: "这作业怎么甩都甩不掉"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    chatList: [{
      type: "text",
      content: "既然这样，你给我邮寄回来吧"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    isMy: true,
    chatList: [{
      type: "text",
      content: "你为什么要丢掉作业"
    }],
    resultType: "chat",
    resultInfo: [5]
  }, {
    id: 5,
    chatList: [{
      type: "text",
      content: "作业那么多，前后几百页，我怎么写得完"
    }],
    resultType: "chat",
    resultInfo: [6]
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "那你现在为什么又要回去呢？"
    }],
    resultType: "chat",
    resultInfo: [7]
  }, {
    id: 7,
    chatList: [{
      type: "text",
      content: "既然甩不掉，就面对"
    }],
    resultType: "chat",
    resultInfo: [8, 9]
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "立刻邮寄"
    }],
    resultType: "finish",
    homework: 0
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "一会联系你"
    }],
    resultType: "finish",
    homework: 1
  }]
}, {
  id: 1008,
  name: "秦少女友",
  icon: "icon52",
  personId: 4,
  triggerDay: 998888,
  beforeTaskId: 998,
  emergencyId: 0,
  taskList: [{
    id: 1,
    chatList: [{
      type: "text",
      content: "我是秦少的女朋友，你快把作业寄给我"
    }],
    resultType: "chat",
    resultInfo: [2]
  }, {
    id: 2,
    chatList: [{
      type: "text",
      content: "秦少听说了你拿了他作业，如果你不把作业给我，他就要跟我粉首"
    }],
    resultType: "chat",
    resultInfo: [3]
  }, {
    id: 3,
    isMy: true,
    chatList: [{
      type: "text",
      content: "这...那秦少作业都没写"
    }],
    resultType: "chat",
    resultInfo: [4]
  }, {
    id: 4,
    chatList: [{
      type: "text",
      content: "没关系，我帮他写"
    }],
    resultType: "chat",
    resultInfo: [5, 6]
  }, {
    id: 5,
    isMy: true,
    chatList: [{
      type: "text",
      content: "立刻邮寄"
    }],
    resultType: "finish",
    homework: 0
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "一会联系你"
    }],
    resultType: "finish",
    homework: 1
  }]
}];