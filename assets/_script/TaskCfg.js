Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskDayType = exports.TaskMainType = exports.DayAwards = exports.DayMaxExp = exports.TaskCfgClass = undefined;
var r_FlyGodUI = require("FlyGodUI");
var r_FunUI = require("FunUI");
var r_MainHomeUI = require("MainHomeUI");
var r_MainUI = require("MainUI");
var r_PhoneMakeUI2 = require("PhoneMakeUI2");
var r_SquareUI = require("SquareUI");
var r_StoneNewUI = require("StoneNewUI");
var r_BattleUpUI = require("BattleUpUI");
var r_BridePriceTipUI = require("BridePriceTipUI");
var r_CatchDogUI = require("CatchDogUI");
var r_DrawUI = require("DrawUI");
var r_TouchNumUI = require("TouchNumUI");
var r_FairyLandShopUI = require("FairyLandShopUI");
var r_FairyLandTgUI = require("FairyLandTgUI");
var r_FairyLandUI = require("FairyLandUI");
var r_FiledSelectUI = require("FiledSelectUI");
var r_FruitsUI = require("FruitsUI");
var r_GodWealthUI = require("GodWealthUI");
var r_HouseMarketUI = require("HouseMarketUI");
var r_NewGuideTipUI = require("NewGuideTipUI");
var r_PhoneUI = require("PhoneUI");
var r_ScrapingCarUI = require("ScrapingCarUI");
var r_SecretUpUI = require("SecretUpUI");
var r_ShareUI = require("ShareUI");
var r_TanqiuUI = require("TanqiuUI");
var r_VentureUI = require("VentureUI");
var r_WeddingResultUI = require("WeddingResultUI");
var exp_TaskCfgClass = function () {
  function _ctor() {}
  Object.defineProperty(_ctor, "TaskMainCfg", {
    get: function () {
      return [{
        title: "第一章",
        name: "少年逆袭",
        day: 1,
        desc: "原本人生一片光明的你突然坠入了深渊;\n被迫分离的青梅竹马...\n突然来临的巨额负债...\n争分夺秒的时间.....\n进退两难的处境,什么都不那么尽人意....\n但凡自强不息者,终将得到救赎;\n从此刻起,一名少年开启了他的逆袭之旅...",
        isOpen: true,
        list: [{
          id: 1,
          type: 0,
          title: "招募一名秘书",
          desc: "成功招募一名秘书",
          maxNum: 1,
          minNum: 0,
          award: [5e4, 100],
          change: [r_MainHomeUI.default, r_DrawUI.DrawUI]
        }, {
          id: 2,
          type: 1,
          title: "完成一次升级挑战",
          desc: "完成一次升级挑战",
          maxNum: 2,
          minNum: 1,
          award: [6e4, 400],
          change: [r_MainHomeUI.default, r_BattleUpUI.default]
        }, {
          id: 3,
          type: 2,
          title: "在“电子厂”打一轮螺丝",
          desc: "在螺丝厂成功打完一轮螺丝",
          maxNum: 1,
          minNum: 0,
          award: [8e4, 600],
          change: [r_MainUI.MainUI, r_PhoneMakeUI2.PhoneMakeUI2]
        }, {
          id: 4,
          type: 3,
          title: "刮一次彩票",
          desc: "刮一次彩票",
          maxNum: 1,
          minNum: 0,
          award: [1e5, 700],
          change: []
        }, {
          id: 5,
          type: 4,
          title: "切一次石头",
          desc: "切一次石头",
          maxNum: 1,
          minNum: 0,
          award: [12e4, 800],
          change: [r_MainUI.MainUI, r_SquareUI.SquareUI, r_StoneNewUI.default]
        }, {
          id: 6,
          type: 5,
          title: "在“城市公园”切一次榴莲",
          desc: "在“城市公园”切一次榴莲",
          maxNum: 1,
          minNum: 0,
          award: [15e4, 900],
          change: [r_MainUI.MainUI, r_SquareUI.SquareUI, r_FruitsUI.FruitsUI]
        }, {
          id: 7,
          type: 6,
          title: "在“娱乐中心”玩一次弹球",
          desc: "玩一把弹球",
          maxNum: 1,
          minNum: 0,
          award: [18e4, 1e3],
          change: [r_MainUI.MainUI, r_FunUI.FunUI, r_TanqiuUI.default]
        }, {
          id: 8,
          type: 16,
          title: "主角能力达到十级",
          desc: "能力升级到10级",
          maxNum: 10,
          minNum: 1,
          award: [2e5, 1200],
          change: [r_MainHomeUI.default, r_TouchNumUI.default]
        }, {
          id: 9,
          type: 7,
          title: "升级一次秘书",
          desc: "升级一次秘书",
          maxNum: 2,
          minNum: 1,
          award: [25e4, 1400],
          change: [r_MainHomeUI.default, r_SecretUpUI.SecretUpUI]
        }, {
          id: 10,
          type: 8,
          title: "领取一次财神奖励",
          desc: "领取一次财神奖励",
          maxNum: 1,
          minNum: 0,
          award: [3e5, 1600],
          change: [r_MainHomeUI.default, r_FlyGodUI.default]
        }, {
          id: 11,
          type: 9,
          title: "在“风投大厦”投资三次油田",
          desc: "在“风投大厦”投资三次油田",
          maxNum: 3,
          minNum: 0,
          award: [35e4, 1800],
          change: [r_MainUI.MainUI, r_VentureUI.VentureUI, r_FiledSelectUI.FiledSelectUI]
        }, {
          id: 12,
          type: 10,
          title: "在“风投大厦”抓一次狗狗",
          desc: "在“风投大厦”抓一次狗狗",
          maxNum: 1,
          minNum: 0,
          award: [4e5, 2e3],
          change: [r_MainUI.MainUI, r_VentureUI.VentureUI, r_CatchDogUI.default]
        }]
      }, {
        title: "第二章",
        name: "喜结良缘",
        desc: "经过你不懈的努力，获取了不俗的成就；\n感情的好转,蒸蒸日上的事业,\n让你看到了美好未来的影子;\n但突然杀出的丈母娘迎面给你泼了一盆冷水...\n一个天文数字的彩礼似乎要彻底将你压垮,\n但这一次,你已不再是之前那个青涩的少年;\n你会用自己的方式抓住幸福....",
        day: 3,
        isOpen: true,
        list: [{
          id: 13,
          type: 11,
          title: "在“荒古遗迹”打造三把兵器",
          desc: "在“荒古遗迹”打造三把兵器",
          maxNum: 3,
          minNum: 0,
          award: [3e6, 2e3],
          change: [r_MainHomeUI.default, r_FairyLandUI.FairyLandUI, r_FairyLandShopUI.FairyLandShopUI]
        }, {
          id: 14,
          type: 12,
          title: "使用一次天工熔炉",
          desc: "使用一次天工熔炉",
          maxNum: 1,
          minNum: 0,
          award: [35e5, 2400],
          change: [r_MainHomeUI.default, r_FairyLandUI.FairyLandUI, r_FairyLandTgUI.FairyLandTgUI]
        }, {
          id: 15,
          type: 13,
          title: "拜一次招财猫",
          desc: "拜一次招财猫",
          maxNum: 1,
          minNum: 0,
          award: [4e6, 3e3],
          change: [r_MainUI.MainUI, r_GodWealthUI.default]
        }, {
          id: 16,
          type: 14,
          title: "在“售楼中心”买一套房子",
          desc: "在“售楼中心”买一套房子",
          maxNum: 1,
          minNum: 0,
          award: [45e5, 3600],
          change: [r_MainUI.MainUI, r_HouseMarketUI.default]
        }, {
          id: 17,
          type: 16,
          title: "主角能力达到二十五级",
          desc: "主角能力达到二十五级",
          maxNum: 25,
          minNum: 0,
          award: [5e6, 4e3],
          change: [r_MainHomeUI.default, r_TouchNumUI.default]
        }, {
          id: 18,
          type: 0,
          title: "累计招募五名秘书",
          desc: "累计招募五名秘书",
          maxNum: 5,
          minNum: 0,
          award: [6e6, 4400],
          change: [r_MainHomeUI.default, r_DrawUI.DrawUI]
        }, {
          id: 19,
          type: 8,
          title: "累计领取三次财神奖励",
          desc: "累计领取三次财神奖励",
          maxNum: 3,
          minNum: 0,
          award: [7e6, 5e3],
          change: [r_MainHomeUI.default, r_FlyGodUI.default]
        }, {
          id: 20,
          type: 1,
          title: "完成五次升级挑战",
          desc: "完成五次升级挑战",
          maxNum: 6,
          minNum: 1,
          award: [8e6, 6e3],
          change: [r_MainHomeUI.default, r_BattleUpUI.default]
        }, {
          id: 21,
          type: 17,
          title: "打败“老马”",
          desc: "打败“老马”",
          maxNum: 1,
          minNum: 0,
          award: [9e6, 1e4],
          change: [r_NewGuideTipUI.default]
        }, {
          id: 22,
          type: 15,
          title: "在“售楼中心”的产业楼研发一次产品",
          desc: "在“售楼中心”的产业楼研发一次产品",
          maxNum: 1,
          minNum: 0,
          award: [1e7, 2e4],
          change: [r_MainUI.MainUI, r_HouseMarketUI.default]
        }, {
          id: 23,
          type: 18,
          title: "完成“彩礼”任务",
          desc: "完成“彩礼”任务",
          maxNum: 2,
          minNum: 1,
          award: [2e7, 4e4],
          change: [r_MainHomeUI.default, r_BridePriceTipUI.default]
        }, {
          id: 24,
          type: 19,
          title: "完成“结婚”任务",
          desc: "完成“结婚”任务",
          maxNum: 3,
          minNum: 2,
          award: [3e7, 6e4],
          change: [r_MainHomeUI.default, r_WeddingResultUI.default]
        }]
      }, {
        title: "第三章",
        name: "重回巅峰",
        desc: "敬请期待",
        day: 9999999,
        isOpen: false,
        list: []
      }];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "TaskDayCfg", {
    get: function () {
      return [{
        id: 0,
        type: 0,
        title: "登陆游戏",
        desc: "登陆游戏",
        maxNum: 1,
        award: 15,
        change: []
      }, {
        id: 1,
        type: 1,
        title: "招募一名秘书",
        desc: "获得一个新秘书",
        maxNum: 1,
        award: 15,
        change: [r_MainHomeUI.default, r_DrawUI.DrawUI]
      }, {
        id: 2,
        type: 2,
        title: "秘书提升五次",
        desc: "秘书提升五次",
        maxNum: 5,
        award: 15,
        change: [r_MainHomeUI.default, r_SecretUpUI.SecretUpUI]
      }, {
        id: 3,
        type: 3,
        title: "点击能力提升五次",
        desc: "点击能力提升五次",
        maxNum: 5,
        award: 15,
        change: [r_MainHomeUI.default, r_TouchNumUI.default]
      }, {
        id: 4,
        type: 4,
        title: "领取一次财神奖励",
        desc: "领取一次财神奖励",
        maxNum: 1,
        award: 15,
        change: [r_MainHomeUI.default, r_FlyGodUI.default]
      }, {
        id: 5,
        type: 5,
        title: "切三次石头",
        desc: "切三次石头",
        maxNum: 3,
        award: 15,
        change: [r_MainUI.MainUI, r_SquareUI.SquareUI, r_StoneNewUI.default]
      }, {
        id: 6,
        type: 6,
        title: "在“娱乐中心”玩一次弹球",
        desc: "在“娱乐中心”玩一次弹球",
        maxNum: 1,
        award: 15,
        change: [r_MainUI.MainUI, r_FunUI.FunUI, r_TanqiuUI.default]
      }, {
        id: 7,
        type: 7,
        title: "进入一次兵器铺",
        desc: "进入一次兵器铺",
        maxNum: 1,
        award: 15,
        change: [r_MainHomeUI.default, r_FairyLandUI.FairyLandUI, r_FairyLandShopUI.FairyLandShopUI]
      }, {
        id: 8,
        type: 8,
        title: "打造一把新武器",
        desc: "打造一把新武器",
        maxNum: 1,
        award: 15,
        change: [r_MainHomeUI.default, r_FairyLandUI.FairyLandUI, r_FairyLandShopUI.FairyLandShopUI]
      }, {
        id: 9,
        type: 9,
        title: "刮三次彩票",
        desc: "刮三次彩票",
        maxNum: 3,
        award: 15,
        change: []
      }, {
        id: 10,
        type: 10,
        title: "玩一次小游戏“专属座驾”",
        desc: "玩一次小游戏“专属座驾”",
        maxNum: 1,
        award: 15,
        change: [r_MainUI.MainUI, r_PhoneUI.PhoneUI, r_ScrapingCarUI.ScrapingCarUI]
      }, {
        id: 11,
        type: 11,
        title: "在“风投大厦”抓一次狗狗",
        desc: "在“风投大厦”抓一次狗狗",
        maxNum: 1,
        award: 15,
        change: [r_MainUI.MainUI, r_VentureUI.VentureUI, r_CatchDogUI.default]
      }, {
        id: 12,
        type: 12,
        title: "每天录屏分享一次",
        desc: "每天录屏分享一次",
        maxNum: 1,
        award: 15,
        change: [r_MainHomeUI.default, r_ShareUI.default]
      }];
    },
    enumerable: false,
    configurable: true
  });
  return _ctor;
}();
exports.TaskCfgClass = exp_TaskCfgClass;
exports.DayMaxExp = 150;
exports.DayAwards = [1e5, 5e5, 3e6];
(function (e) {
  e[e["秘书数量"] = 0] = "秘书数量";
  e[e["挑战次数"] = 1] = "挑战次数";
  e[e["打螺丝"] = 2] = "打螺丝";
  e[e["刮刮乐"] = 3] = "刮刮乐";
  e[e["买石头"] = 4] = "买石头";
  e[e["买榴莲"] = 5] = "买榴莲";
  e[e["弹球"] = 6] = "弹球";
  e[e["升级秘书"] = 7] = "升级秘书";
  e[e["领取财神"] = 8] = "领取财神";
  e[e["买油田"] = 9] = "买油田";
  e[e["抓狗"] = 10] = "抓狗";
  e[e["锻造武器"] = 11] = "锻造武器";
  e[e["使用熔炉"] = 12] = "使用熔炉";
  e[e["拜招财猫"] = 13] = "拜招财猫";
  e[e["房产数量"] = 14] = "房产数量";
  e[e["研发产品"] = 15] = "研发产品";
  e[e["点击能力"] = 16] = "点击能力";
  e[e["挑战老马"] = 17] = "挑战老马";
  e[e["付清彩礼"] = 18] = "付清彩礼";
  e[e["完成结婚"] = 19] = "完成结婚";
})(exports.TaskMainType || (exports.TaskMainType = {}));
(function (e) {
  e[e["登录游戏"] = 0] = "登录游戏";
  e[e["招募秘书"] = 1] = "招募秘书";
  e[e["秘书升级"] = 2] = "秘书升级";
  e[e["点击升级"] = 3] = "点击升级";
  e[e["领取财神爷"] = 4] = "领取财神爷";
  e[e["切石头"] = 5] = "切石头";
  e[e["弹球"] = 6] = "弹球";
  e[e["进入兵器铺"] = 7] = "进入兵器铺";
  e[e["锻造武器"] = 8] = "锻造武器";
  e[e["刮刮乐"] = 9] = "刮刮乐";
  e[e["刮车"] = 10] = "刮车";
  e[e["抓狗"] = 11] = "抓狗";
  e[e["分享"] = 12] = "分享";
})(exports.TaskDayType || (exports.TaskDayType = {}));