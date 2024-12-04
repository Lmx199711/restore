Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeworkChatCfg = undefined;
exports.HomeworkChatCfg = [{
  id: 1001,
  name: "秦少",
  icon: "icon1",
  personId: 1,
  triggerDay: 998,
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
    homework: false
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一会联系你"
    }],
    resultType: "finish"
  }]
}, {
  id: 1002,
  name: "阿谀奉承",
  icon: "icon2",
  personId: 2,
  triggerDay: 5,
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
    homework: false
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一会寄给你"
    }],
    resultType: "finish"
  }]
}, {
  id: 1003,
  name: "小秦舅舅",
  icon: "icon3",
  personId: 3,
  triggerDay: 2,
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
    homework: false
  }, {
    id: 7,
    isMy: true,
    chatList: [{
      type: "text",
      content: "好，我一会联系你"
    }],
    resultType: "finish"
  }]
}, {
  id: 1004,
  name: "小秦班主任",
  icon: "icon4",
  personId: 4,
  triggerDay: 998,
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
    homework: false
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一会寄给你"
    }],
    resultType: "finish"
  }]
}, {
  id: 1005,
  name: "小秦妈妈",
  icon: "icon1",
  personId: 1,
  triggerDay: 998,
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
    homework: true
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一会寄给你"
    }],
    resultType: "finish"
  }]
}, {
  id: 1006,
  name: "小秦爸爸",
  icon: "icon43",
  personId: 21,
  triggerDay: 2,
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
    homework: false
  }, {
    id: 8,
    isMy: true,
    chatList: [{
      type: "text",
      content: "我一会寄给你"
    }],
    resultType: "finish"
  }]
}, {
  id: 1007,
  name: "秦少的噩梦",
  icon: "icon5",
  personId: 5,
  triggerDay: 2,
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
    homework: false
  }, {
    id: 9,
    isMy: true,
    chatList: [{
      type: "text",
      content: "一会联系你"
    }],
    resultType: "finish"
  }]
}, {
  id: 1008,
  name: "秦少女友",
  icon: "icon4",
  personId: 4,
  triggerDay: 998,
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
    homework: false
  }, {
    id: 6,
    isMy: true,
    chatList: [{
      type: "text",
      content: "一会联系你"
    }],
    resultType: "finish"
  }]
}];