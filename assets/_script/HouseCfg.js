Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HouseIndustryResultPr5Cfg = exports.HouseIndustryResultPr4Cfg = exports.HouseIndustryResultPr3Cfg = exports.HouseIndustryResultPr2Cfg = exports.HouseIndustryResultPr1Cfg = exports.HouseIndustryResultPr0Cfg = exports.HouseTenantCfg = exports.HousePrejectCfg = exports.HouseIndustryCfg = exports.HouseStoreCfg = exports.HouseBedCfg = exports.minCeff = exports.maxCeff = exports.HouseCfg = undefined;
exports.HouseCfg = {
  0: {
    id: 0,
    name: "桥洞",
    price: 0,
    isVideoBuy: false
  },
  1: {
    id: 1,
    name: "地下室",
    price: 5e6,
    isVideoBuy: false
  },
  2: {
    id: 2,
    name: "毛坯房",
    price: 3e7,
    isVideoBuy: false
  },
  3: {
    id: 3,
    name: "城中村",
    price: 12e7,
    isVideoBuy: false
  },
  4: {
    id: 4,
    name: "精装房",
    price: 6e8,
    isVideoBuy: false
  },
  5: {
    id: 5,
    name: "高档小区",
    price: 17e8,
    isVideoBuy: false
  },
  6: {
    id: 6,
    name: "海景别墅",
    price: 38e8,
    isVideoBuy: false
  }
};
exports.maxCeff = 140;
exports.minCeff = 60;
exports.HouseBedCfg = {
  0: {
    id: 0,
    name: "旧报纸",
    price: 0,
    ear: 5,
    isVideoBuy: false,
    videoNum: 0
  },
  1: {
    id: 1,
    name: "纸壳",
    price: 2e5,
    ear: 200,
    isVideoBuy: false,
    videoNum: 0
  },
  2: {
    id: 2,
    name: "破凉席",
    price: 5e6,
    ear: 5e3,
    isVideoBuy: false,
    videoNum: 0
  },
  3: {
    id: 3,
    name: "上下床",
    price: 18e6,
    ear: 18e3,
    isVideoBuy: false,
    videoNum: 0
  },
  4: {
    id: 4,
    name: "木板床",
    price: 6e7,
    ear: 6e4,
    isVideoBuy: false,
    videoNum: 0
  },
  5: {
    id: 5,
    name: "标准床",
    price: 2e8,
    ear: 2e5,
    isVideoBuy: false,
    videoNum: 0
  },
  6: {
    id: 6,
    name: "席梦思",
    price: 7e8,
    ear: 7e5,
    isVideoBuy: false,
    videoNum: 0
  },
  7: {
    id: 7,
    name: "水床",
    price: 15e8,
    ear: 15e5,
    isVideoBuy: false,
    videoNum: 0
  },
  8: {
    id: 8,
    name: "太空舱",
    price: 5e9,
    ear: 5e6,
    isVideoBuy: false,
    videoNum: 0
  },
  9: {
    id: 9,
    name: "公主床",
    price: 5e8,
    ear: 5e4,
    isVideoBuy: true,
    videoNum: 1
  },
  10: {
    id: 10,
    name: "宇宙飞床",
    price: 5e8,
    ear: 25e4,
    isVideoBuy: true,
    videoNum: 3
  }
};
exports.HouseStoreCfg = {
  0: {
    id: 0,
    name: "安置房",
    price: 2e7,
    isVideoBuy: false
  },
  1: {
    id: 1,
    name: "法拍房",
    price: 8e7,
    isVideoBuy: false
  },
  2: {
    id: 2,
    name: "酒店公寓",
    price: 25e7,
    isVideoBuy: false
  },
  3: {
    id: 3,
    name: "家居三房",
    price: 66e7,
    isVideoBuy: false
  },
  4: {
    id: 4,
    name: "大平层",
    price: 13e8,
    isVideoBuy: false
  },
  5: {
    id: 5,
    name: "独栋别墅",
    price: 25e8,
    isVideoBuy: false
  }
};
exports.HouseIndustryCfg = {
  0: {
    id: 0,
    name: "大众影院",
    price: 1e9,
    isVideoBuy: false,
    projects: [0, 1, 2, 3]
  },
  1: {
    id: 1,
    name: "科学研究院",
    price: 17e8,
    isVideoBuy: false,
    projects: [4, 5, 6, 7]
  },
  2: {
    id: 2,
    name: "美食一条街",
    price: 35e8,
    isVideoBuy: false,
    projects: [8, 9, 10, 11]
  }
};
exports.HousePrejectCfg = {
  0: {
    id: 0,
    name: "西游记者",
    price: 5e7,
    time: 900,
    award: 3e8,
    loss: 1e8,
    succDesc: "《西游记者》上线影院后,获得大致好评,连圈内大佬六大龄痛也赞不绝口。你越卖越火,总共斩获了3亿票房",
    loseDesc: "电影上线后被网友一致差评,原因竟然是采访的时候说的都是方言,观众完全听不懂,各大影院要求你赔偿1亿元",
    runDesc: "由于你剧组的伙食实在是太好,天天山珍海味扮演孙悟空的演员硬是吃成了猪八戒,主演都没了,剧组不得不解散"
  },
  1: {
    id: 1,
    name: "睡了在我上铺的兄弟",
    price: 8e7,
    time: 900,
    award: 5e8,
    loss: 8e7,
    succDesc: "一经上线,一堆大老爷们哭成了泪人,在网上联名请愿你拍续集《打死我下铺的娘炮》,共收获了5亿票房",
    loseDesc: "电影上线后被骂惨了,众人纷纷指责你是标题党,根本没看到想到的内容,你光赔偿电影的票价就赔偿了8000万",
    runDesc: "电影即将拍摄完毕时,两位主演在拍摄期间偷偷私奔了!你追了十万八千里都没追回来,剧组被迫散场了"
  },
  2: {
    id: 2,
    name: "死鬼吹灯",
    price: 1e8,
    time: 900,
    award: 8e8,
    loss: 2e8,
    succDesc: "上映前大家普遍以为是部烂片,没想到里面剧情反转不断,观众直呼过瘾,收获了大批好评,收获了8亿票房",
    loseDesc: "电影开场后,没想到黑暗持续了两个小时,原来死鬼把灯吹灭后根本就没有光,观众光听到了两小时的黑屏相声,顾客要求赔偿精神损失2亿元",
    runDesc: "全城的灯都被剧组买光了,主演怎么都演不出吹灯的感觉,大伙都觉得没戏了,各自回老家了"
  },
  3: {
    id: 3,
    name: "大鱼炖海棠",
    price: 13e7,
    time: 900,
    award: 1e9,
    loss: 3e8,
    succDesc: "这款电影上线后,影院坐满了人,贝爷发推表示一定要尝下这个菜,热度久居不下,你净盈利了10亿",
    loseDesc: "由于烹饪过程太过残忍,玩家根本不买单,你白买了那么多食材,亏了3个亿",
    runDesc: "投资都已准备就绪,结果发现根本没有一口这么大的锅,项目胎死腹中"
  },
  4: {
    id: 4,
    name: "滴药神器",
    price: 7e7,
    time: 900,
    award: 4e8,
    loss: 12e7,
    succDesc: "研发此产品后,所有人都解决了眼药水滴不进去的问题,货物一抢而光,你靠此产品获得了4亿收入",
    loseDesc: "大家十分看好这个产品,加大了投资力度,量产后发现市面上压根没有人使用眼药水了,你血亏了1亿2000万",
    runDesc: "研发产品的主要技术员根本不理解你的需求是什么,因为他根本不滴眼药水,一次矛盾之后他愤愤离开了研究院"
  },
  5: {
    id: 5,
    name: "陆游器",
    price: 12e7,
    time: 900,
    award: 6e8,
    loss: 2e8,
    succDesc: "这个产品简直神奇,它满足了人们不在海边也能游泳的梦想,被誉为世界上第九大发明,你靠这个专利赚了整整6个亿",
    loseDesc: "产品一经上线,接到了大量的差评和退货,原因竟然是他们说游泳时总有一股味,你赔偿了2个亿",
    runDesc: "你的关键制作材料被市场竞争者马桶供应商放肆抬价,入不敷出,项目组的人都跑路了"
  },
  6: {
    id: 6,
    name: "脚踏轮椅",
    price: 2e8,
    time: 900,
    award: 9e8,
    loss: 3e8,
    succDesc: "这个专利申请后,大大提升了腿部不便者的移动速度,整个大街上随处可见,你赚大发了,一共收入9个亿",
    loseDesc: "腿部不便者像市管部举报了这个产品,觉得智商受到了侮辱,你赔偿了一笔天价补偿费3亿",
    runDesc: "项目组两小伙因为怎么装轮胎好看大打出手,把实验室砸了个七七八八,你的项目被迫停止"
  },
  7: {
    id: 7,
    name: "蹦迪马桶",
    price: 3e8,
    time: 900,
    award: 15e8,
    loss: 5e8,
    succDesc: "这个马桶不仅受到年轻人的大量追捧,连广场舞大妈也加入了疯抢的行列,她们觉得回到了自己的青春年代,一个马桶产品净赚了15亿",
    loseDesc: "产品投入使用后收到了很多差评,原因是蹦起来太忘乎所以,导致卫生很难搞,你补贴了他们众多用户5个亿的卫生费",
    runDesc: "马桶里塞音响还是太过超前,马桶供应商和音响供应商互相都不肯让价,项目夭折了"
  },
  8: {
    id: 8,
    name: "黑霸汉堡",
    price: 12e7,
    time: 900,
    award: 6e8,
    loss: 2e8,
    succDesc: "这霸气的外表推出后吸引了无数少女,一度到了有价无市的情况,你爆赚了6个亿",
    loseDesc: "这个汉堡推出后,别人反馈太干了,一个汉堡要喝一桶水,你血亏了2个亿",
    runDesc: "市面上突然不流行吃汉堡,流行吃披萨了,你的项目胎死腹中,直接解散了"
  },
  9: {
    id: 9,
    name: "西瓜炒香蕉",
    price: 2e8,
    time: 900,
    award: 1e9,
    loss: 3e7,
    succDesc: "学校食堂因为上了这个菜,学生身体素质倍儿棒,你包办了大大小小的学校食堂,怒赚了10个亿",
    loseDesc: "这酸涩的滋味上了新闻热搜,卫生局检查,要求你罚款3亿",
    runDesc: "这奇怪的味道,让主厨们都呕吐不会,纷纷跑路,你的计划泡汤了"
  },
  10: {
    id: 10,
    name: "奥达曼泡酒",
    price: 4e8,
    time: 900,
    award: 2e9,
    loss: 8e8,
    succDesc: "老年人和中年人都爱上这个酒,你成功当上了旧厂大亨,顺便攻打下了M887星云,你有了源源不绝的材料来源,靠这酒你赚了20亿",
    loseDesc: "小学生怒了,对你群起而攻之,他们要保护奥达曼,为了息事宁人,你补偿了奥达曼8亿元",
    runDesc: "野生奥达曼为了避免被泡酒,纷纷躲起来了,缺少原材料,你的料酒只能被迫停产"
  },
  11: {
    id: 11,
    name: "巧克力蛋糕",
    price: 6e8,
    time: 900,
    award: 5e9,
    loss: 1e9,
    succDesc: "这美丽的配色,一度让它成为了甜品类的宠儿,大小厂商纷纷效仿你,一款经典蛋糕让你功成名就,血赚50亿",
    loseDesc: "顾客反馈总感觉有一股臭臭味道,你的蛋糕无人问津,你还倒贴了10亿给材料供应商",
    runDesc: "你的厨房味道实在太大了,厨师们都晕倒在了厨房,根本没人愿意继续研发,大家都跑路了"
  }
};
exports.HouseTenantCfg = {
  0: {
    id: 0,
    desc: "我刚刚结婚,你看我的婚纱好看吗"
  },
  1: {
    id: 1,
    desc: "我不缺房子住,我缺甜甜的爱情"
  },
  2: {
    id: 2,
    desc: "我想租个好房子,还想找个男朋友"
  },
  3: {
    id: 3,
    desc: "我是刚毕业的程序员,能便宜点租我吗"
  },
  4: {
    id: 4,
    desc: "我很丑,但是我很温柔"
  },
  5: {
    id: 5,
    desc: "把房子租给我吧,我会好好爱护房子的"
  },
  6: {
    id: 6,
    desc: "我非常喜欢你的房子,我可以出高价租它"
  },
  7: {
    id: 7,
    desc: "我可会做饭了,下次请你来我家吃晚饭呀"
  },
  8: {
    id: 8,
    desc: "我一人住有点害怕,你能不能多关照下我"
  },
  9: {
    id: 9,
    desc: "你的房子给我一种家的感觉"
  }
};
exports.HouseIndustryResultPr0Cfg = [{
  id: 0,
  pr: "25"
}, {
  id: 1,
  pr: "35"
}, {
  id: 2,
  pr: "40"
}];
exports.HouseIndustryResultPr1Cfg = [{
  id: 0,
  pr: "30"
}, {
  id: 1,
  pr: "30"
}, {
  id: 2,
  pr: "40"
}];
exports.HouseIndustryResultPr2Cfg = [{
  id: 0,
  pr: "35"
}, {
  id: 1,
  pr: "25"
}, {
  id: 2,
  pr: "40"
}];
exports.HouseIndustryResultPr3Cfg = [{
  id: 0,
  pr: "40"
}, {
  id: 1,
  pr: "25"
}, {
  id: 2,
  pr: "35"
}];
exports.HouseIndustryResultPr4Cfg = [{
  id: 0,
  pr: "55"
}, {
  id: 1,
  pr: "20"
}, {
  id: 2,
  pr: "25"
}];
exports.HouseIndustryResultPr5Cfg = [{
  id: 0,
  pr: "55"
}, {
  id: 1,
  pr: "20"
}, {
  id: 2,
  pr: "25"
}];