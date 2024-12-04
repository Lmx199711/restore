Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelaxExpCfg = exports.RelaxPlayTipCfg = exports.RelaxAnwserCfg = exports.NewActionLevelCfg = exports.RelaxIndexsCfg = exports.RelaxTaskCfg = exports.RelaxLevelCfg = undefined;
exports.RelaxLevelCfg = [{
  id: 13,
  bundle: "relax1",
  path: "levels/level13"
}, {
  id: 15,
  bundle: "relax1",
  path: "levels/level15"
}, {
  id: 25,
  bundle: "relax1",
  path: "levels/level25"
}, {
  id: 36,
  bundle: "relax1",
  path: "levels/level36"
}, {
  id: 37,
  bundle: "relax1",
  path: "levels/level37"
}, {
  id: 158,
  bundle: "relax1",
  path: "levels/level158"
}, {
  id: 100497,
  bundle: "relax1",
  path: "levels/level497"
}, {
  id: 159,
  bundle: "relax1",
  path: "levels/level159"
}, {
  id: 200,
  bundle: "relax1",
  path: "levels/level200"
}];
exports.RelaxTaskCfg = {
  13: {
    id: 13,
    desc: "这是我曾曾祖父留下的乌龟,帮我清洗一下",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 3e8,
    failPirce: 8e7,
    succDesc: "因为你技术高超技术成功打动了客户,客户点了赞并给了3亿小费",
    failDesc: "你清洗方式有误，老乌龟都快见到太祖了,赔偿客户8000万",
    roleId: 1,
    okBubble: "太感谢你了,小伙子",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "回头把我闺蜜介绍给你哈",
    succTime: 4,
    playTip: 2
  },
  25: {
    id: 25,
    desc: "帮我洗一下我的小狗,它很可爱的",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 4e8,
    failPirce: 7e7,
    succDesc: "小狗非常配合,小姐姐十分满意,给了你4亿小费",
    failDesc: "由于你失误太多,狗狗极度不配合,你赔偿了客户7000万",
    roleId: 2,
    okBubble: "谢谢小哥哥,比心~",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "下次我还来找你哦~",
    succTime: 4,
    playTip: 0
  },
  1078: {
    id: 1078,
    desc: "我第一天上班,可以陪我一起去嘛~",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 15e7,
    failPirce: 3e7,
    succDesc: "你明察秋毫,没有漏网之鱼,小姐姐大方地给了1.5亿小费",
    failDesc: "全是误判,小姐姐岗位都不保了,要求你赔偿3000万",
    roleId: 3,
    okBubble: "那我们出发吧！",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "等会请你吃饭哈~",
    succTime: 4,
    playTip: 0
  },
  1086: {
    id: 1086,
    desc: "帅哥能帮我收拾下房子吗",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 5e8,
    failPirce: 1e8,
    succDesc: "你收拾得有没有一点破绽,大哥直接打赏了5亿元",
    failDesc: "你做事情太不细心了,被抓了个正着,赔偿大哥1亿",
    roleId: 4,
    okBubble: "老板快回来了,你得加速了",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "兄弟真是帮大忙了！",
    succTime: 4,
    playTip: 0
  },
  1045: {
    id: 1045,
    desc: "你好,我是木子,要不要和我一起去看海底星空",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 3e8,
    failPirce: 8e7,
    succDesc: "你成功救了木子姐妹,获得了3亿奖励",
    failDesc: "你没有成功救上木子,损失了8000万块",
    roleId: 5,
    okBubble: "我妹妹也会和我们一起去",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "恩人,我会报答你的",
    succTime: 4,
    playTip: 3
  },
  1055: {
    id: 1055,
    desc: "富豪重金寻子,你能帮帮忙吗",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 2e8,
    failPirce: 5e7,
    succDesc: "你成功帮助富豪找到了家人,也找到自己的家人,父亲直接给了你2亿买车",
    failDesc: "没想到选中的人竟然是冒充的,你选择错误被扣了5000万块",
    roleId: 3,
    okBubble: "就靠你了！",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "恭喜恭喜呀~",
    succTime: 3,
    playTip: 0
  },
  1079: {
    id: 1079,
    desc: "能帮我找到老公的秘密吗？",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 4e8,
    failPirce: 1e8,
    succDesc: "你成功得找到了所有的小姐姐,甲玲姐赠送了4亿给你",
    failDesc: "你没有完美完成目标,被扣了1亿块",
    roleId: 11,
    okBubble: "这次不可能让他跑掉",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "小帅哥,你帮大忙了",
    succTime: 3,
    playTip: 0
  },
  37: {
    id: 37,
    desc: "不好啦,男神GG爆被绑架了,快和我一起解救他！",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 2e8,
    failPirce: 5e7,
    succDesc: "男神大手一挥,直接打赏了2亿块",
    failDesc: "没在时间内救出男神,赔偿男神5000万块",
    roleId: 9,
    okBubble: "我们出发吧",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "谢谢你救了我们的男神",
    succTime: 4,
    playTip: 0
  },
  158: {
    id: 158,
    desc: "哈喽,我又来啦,这次能我搓下背吗？",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 3e8,
    failPirce: 1e8,
    succDesc: "小姐姐背被搓的发亮,给了你3亿小费",
    failDesc: "你把小姐姐皮都搓破了,赔偿了小姐姐1亿",
    roleId: 2,
    okBubble: "记得轻一点点哦",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "瞬间神清气爽啦",
    succTime: 4,
    playTip: 0
  },
  100497: {
    id: 100497,
    desc: "男友和闺蜜跑了，能帮我搬新家吗。开始新的生活",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 4e5,
    failPirce: 1e5,
    succDesc: "小姐姐背被搓的发亮,给了你40万小费",
    failDesc: "你把小姐姐皮都搓破了,赔偿了小姐姐10万",
    roleId: 2,
    okBubble: "记得轻一点点哦",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "瞬间神清气爽啦",
    succTime: 4,
    playTip: 0
  },
  159: {
    id: 159,
    desc: "谢谢你救了男神,还能麻烦你帮我把男神改造一下吗",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 4e8,
    failPirce: 1e8,
    succDesc: "男神也被改造的太帅了,给了你4亿小费",
    failDesc: "男神都失去了信心,你赔偿了1亿",
    roleId: 9,
    okBubble: "好的,我太期待了",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "这次真成男神了",
    succTime: 4,
    playTip: 0
  },
  200: {
    id: 200,
    desc: "月饼订单大增，我们忙不过来了，能不能帮帮我们",
    dayCount: 1,
    IntervalDays: 1,
    succPirce: 3e8,
    failPirce: 5e7,
    succDesc: "多亏了你才顺利完成了所有订单，祝你中秋节快乐，获得了3亿奖励",
    failDesc: "月饼订单配送失败，你赔偿了5000万",
    roleId: 10,
    okBubble: "好的，太谢谢你了",
    okTime: 2,
    noBubble: "不干我找别人去",
    noTime: 1,
    succBubble: "多亏了你才顺利完成了所有订单，祝你中秋节快乐！",
    succTime: 4,
    playTip: 0
  }
};
exports.RelaxIndexsCfg = [1055, 1079, 1078, 25, 200, 158, 1045, 37, 13, 159];
exports.NewActionLevelCfg = [159];
exports.RelaxAnwserCfg = [1045, 1055, 1079];
exports.RelaxPlayTipCfg = {
  0: null,
  1: "本关内容设计带有恐怖元素，请确认能接受后点击确定继续游戏",
  2: "本关内容设计带有密集元素，请确认能接受后点击确定继续游戏",
  3: "本关内容设计带有深海元素，请确认能接受后点击确定继续游戏"
};
exports.RelaxExpCfg = {
  0: {
    name: "打工练习生",
    exp: 10
  },
  1: {
    name: "打工两年半",
    exp: 25
  },
  2: {
    name: "打工偶像",
    exp: 50
  },
  3: {
    name: "打工皇帝",
    exp: 2e3
  }
};