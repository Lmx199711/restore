Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TheSimsCfg = undefined;
exports.TheSimsCfg = {
  scene: {
    出差: {
      index: 0,
      bg: "bg1",
      role: "role1",
      msg: "明天就是周末了，当时上司却让我去出差",
      item: ["物品@医院", "物品@辞职信", "物品@ok"],
      next: ["end2", "end1", "酒店"]
    },
    酒店: {
      index: 1,
      bg: "bg2",
      role: "role2",
      msg: "到达酒店发现只剩1间房间了，上司问我怎么办",
      bubbleOut: ["", "怎么好意思让你掏钱呢，凑合着住吧", ""],
      item: ["物品@门", "物品@一沓子钱", "物品@ok"],
      next: ["end2", "房间", "end3_1"]
    },
    房间: {
      index: 2,
      bg: "bg3",
      role: "role3",
      msg: "进到酒店房间，上司问我做点什么来打发时间",
      item: ["物品@瑜伽", "物品@电视", "物品@酒杯"],
      next: ["瑜伽", "电视", "end4"]
    },
    瑜伽: {
      index: 3,
      bg: "bg4",
      role: "role4",
      msg: "我们做瑜伽舒缓一下身体",
      next: ["浴室"]
    },
    电视: {
      index: 4,
      bg: "bg5",
      role: "role5",
      prop: "prop5",
      msg: "电视机前，上司害怕的抱着我",
      next: ["浴室"]
    },
    浴室: {
      index: 5,
      bg: "bg6",
      role: "role6",
      msg: "打发时间结束，领导进浴室去洗澡了，看着领导在浴室的身影，这个时候我应该",
      item: ["物品@相机", "物品@扳手", "物品@浴室门"],
      next: ["相机", "扳手", "end3_2"]
    },
    相机: {
      index: 6,
      bg: "bg7",
      role: "role7",
      msg: "拿着照片威胁上司",
      next: ["end0_1"]
    },
    扳手: {
      index: 7,
      bg: "bg8",
      role: "role8",
      bubbleIn: "热水器好像坏了，该怎么办呢",
      bubbleOut: ["", "", "你真的好棒，技术够硬"],
      item: ["物品@棒球棒", "物品@亲", "物品@修理"],
      next: ["end0_2", "亲她", "床上"]
    },
    亲她: {
      index: 8,
      bg: "bg9",
      role: "role9",
      next: ["床上"]
    },
    床上: {
      index: 9,
      bg: "bg10",
      role: "role10",
      bubbleIn: "夜深了快睡觉吧，明天还要上班呢",
      item: ["物品@皮鞭", "物品@爱心", "物品@麻辣烫"],
      next: ["小皮鞭", "爱心", "麻辣烫"]
    },
    小皮鞭: {
      index: 10,
      bg: "bg11",
      role: "role11",
      reward: 6e4,
      bubbleIn: "主人"
    },
    爱心: {
      index: 11,
      bg: "bg12",
      role: "role12",
      reward: 6e4
    },
    麻辣烫: {
      index: 12,
      bg: "bg13",
      role: "role13",
      reward: 6e4,
      bubbleIn: "咱们下次继续出差哈"
    },
    end0_1: {
      index: 13,
      bg: "bgend",
      role: "roleend",
      reward: 4e4
    },
    end0_2: {
      index: 13,
      bg: "bgend",
      role: "roleend",
      reward: 5e4
    },
    end1: {
      index: 14,
      bg: "bgend1",
      role: "roleend1",
      msg: "离职后找不到工作，只能在街头讨生活",
      reward: 1e4
    },
    end2: {
      index: 15,
      bg: "bgend2",
      role: "roleend2",
      msg: "回来后，上司对我大骂一通",
      reward: 2e4
    },
    end3_1: {
      index: 16,
      bg: "bgend3_1",
      role: "roleend3",
      sound: "扇耳光_01",
      reward: 2e4
    },
    end3_2: {
      index: 17,
      bg: "bgend3_2",
      role: "roleend3",
      sound: "扇耳光_01",
      reward: 4e4
    },
    end4: {
      index: 18,
      bg: "bgend4",
      role: "roleend4",
      msg: "没想到上司这么能喝，最后我都不记得发生了什么",
      reward: 3e4
    }
  }
};