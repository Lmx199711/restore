Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_LevelConfig = function () {
  function _ctor() {}
  _ctor.isLocalLevel = function (t) {
    return _ctor.localLevel.includes(t);
  };
  _ctor.testLevelList = [93, 94, 78, 84, 83, 82, 40];
  _ctor.levelGroup = {
    xingguansuwan: {
      name: "新关速玩",
      bg: "red",
      level: [17, 502, 13, 68, 78, 57, 58, 72, 41, 49, 4, 56],
      flag: ""
    },
    tuijianguanqia: {
      name: "推荐关卡",
      level: [17, 502, 13, 68, 78, 57, 58, 72, 41, 49, 4, 56],
      flag: ""
    },
    tupianzhaocha: {
      name: "图片找茬",
      level: [17, 502, 58, 6, 49, 32, 27, 11, 25, 43, 34, 29, 44, 3, 12, 15, 22, 24, 54, 10],
      flag: ""
    },
    chuangyiquwei: {
      name: "创意趣味",
      bg: "",
      level: [13, 78, 68, 61, 501, 4, 51, 9, 19, 26, 18],
      flag: ""
    },
    guiyiguijue: {
      name: "怪异诡谲",
      level: [57, 46, 66, 28, 33, 50, 16, 8, 36, 37, 36, 39, 35],
      flag: ""
    },
    hudongjuqing: {
      name: "互动剧情",
      level: [41, 72, 59, 65, 55, 64, 20, 53],
      flag: ""
    },
    lianziwangeng: {
      name: "连字玩梗",
      level: [95, 94, 93, 92, 91, 88, 87, 84, 83, 82, 81, 80, 79, 77, 76, 75],
      flag: ""
    }
  };
  _ctor.recommendType = {
    放大镜找茬: [6, 35, 36, 39, 44, 25],
    互动玩法: [4, 9, 501, 19, 26, 27, "后面的不推荐", 2, 7, 21, 31, 42, 47, 61],
    微恐找茬: [16, 8, 37, 46, 66],
    "互动剧情（选择项": [59, 55, 41, 64, 65, 20, "后面的不推荐", 53],
    规则怪谈: [28, 33, 50],
    普通找茬: [11, 18, 32, 34, 29, 49, "后面的不推荐", 3, 10, 12, 15, 22, 24, 43, 54, 68]
  };
  _ctor.scaryLevel = [50, 46, 48, 40, 28, 25, 16, 36];
  _ctor.newIconLevel = [];
  _ctor.hotIconLevel = [9, 10, 11];
  _ctor.pinbi = [];
  _ctor.defaultUnLockLevel = [17];
  _ctor.banbenpingbiguanqia = [];
  _ctor.banbenpingbibanbenhao = "";
  _ctor.localLevel = [1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 22, 25, 26, 27, 28, 29, 30, 24, 21, 34, 35, 32, 37, 32, 36, 41, 31, 40, 42, 43, 23, 33, 45, 38, 49];
  _ctor.jingxuan = [];
  _ctor.hideTipLevels = [13];
  _ctor.levelInfo = {
    1078: {
      name: "交通巡查",
      succ: "恭喜你，完成该关卡！",
      fail: "要不再试一试？",
      tip1: "仔细检查证件和后备箱,酒驾可以让他重复吹",
      tip2: "1.包租婆喝酒\n2.启强没有问题,可以放行\n3.小朋友后备箱有穿山甲\n4.强哥证件不满18岁领取,假证",
      prefab: "四格漫画",
      subPrefab: "交通巡查",
      newBgm: "lv0078/BGM"
    },
    1086: {
      name: "整理房间",
      succ: "幸好老板没发现嘿嘿",
      fail: "再试试吧",
      tip1: "把衣服给两人穿上",
      tip2: "1.拖动床上女仆装给女生穿上,然后带上床头的发带\n2.拖动墙上西装给男生,把地上的方案给男生\n3.点击右下床单漏出皮鞋,把两只皮鞋拖到男生脚上\n4.拖动男人和旁边保安回家\n5.把地上垃圾拖动到垃圾桶上\n6.全部拖完后点击垃圾袋打包,打包后放到推车上\n7.拖动墙上毛巾擦干净镜子红印,把毛巾丢到拖车上\n8.拖车上装满垃圾后,拖动穿好衣服的女仆到车上\n9.拖动剪刀到熊上,点击熊,删除照片\n10.点击开关,关闭氛围灯光",
      prefab: "文字连线",
      subPrefab: "整理房间",
      newBgm: "lv0086/lv0086"
    },
    1119: {
      name: "街头弹珠",
      succ: "恭喜你，完成该关卡！",
      fail: "要不再试试？",
      tip1: "烧烤技术哪家强，山东淄博尝一尝...",
      tip2: "烧烤技术哪家强，山东淄博尝一尝，灵魂烧烤三件套，小饼烤肉加蘸料，闻着香吃着美，保证你看了流口水，城市名片做得好，全国各地往这跑",
      subPrefab: "街头弹珠/街头弹珠",
      prefab: "文字连线",
      newBgm: "lv0119/lv0119bgm"
    },
    1045: {
      name: "鲨海逃生",
      succ: "你有深海恐惧症吗？",
      fail: "",
      tip1: "",
      tip2: "",
      prefab: "合成烧烤",
      subPrefab: "鲨海逃生",
      newBgm: "bgm/lv45"
    },
    1055: {
      name: "鲨海逃生",
      succ: "你有深海恐惧症吗？",
      fail: "",
      tip1: "",
      tip2: "",
      prefab: "合成烧烤",
      subPrefab: "findParent",
      newBgm: "findParent/1055bgm"
    },
    1079: {
      name: "正经按摩",
      succ: "恭喜过关",
      fail: "",
      tip1: "",
      tip2: "",
      prefab: "合成烧烤",
      subPrefab: "正经按摩",
      newBgm: "lv79/bgm"
    }
  };
  return _ctor;
}();
exports.default = def_LevelConfig;