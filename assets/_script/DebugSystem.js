Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebugSystem = exports._DebugSystem = exports.GMToolTypeFerrule = exports.GMToolTypeFarm = exports.GMToolTypeMysteryShop = exports.GMToolTypeGiveRedPacket = exports.GMToolTypeGoodsShop = exports.GMToolTypeFish = exports.DebugTypeWoodenPeople = exports.DebugTypeLuckBag = exports.DebugTypeTiger = exports.DebugTypeAlmanac = exports.DebugTypeTransfer = exports.DebugTypeMail = exports.DebugTypeLottery = exports.DebugTypeRace = exports.DebugTypeStone = undefined;
var i;
var n;
var a;
var s;
var r;
var c;
var l;
var u;
var h;
var p;
var d;
var y;
var f;
var m;
var g;
var r_AlamnacCfg = require("AlamnacCfg");
var r_ChatTransferCfg = require("ChatTransferCfg");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_LotteryTicketCfg1 = require("LotteryTicketCfg1");
var r_LotteryTicketCfg2 = require("LotteryTicketCfg2");
var r_LotteryTicketCfg3 = require("LotteryTicketCfg3");
var r_LotteryTicketCfg4 = require("LotteryTicketCfg4");
var r_LuckBagCfg = require("LuckBagCfg");
var r_MailCfg = require("MailCfg");
var r_TigerCfg = require("TigerCfg");
var r_AlmanacResultUI = require("AlmanacResultUI");
var r_PlayerData = require("PlayerData");
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.maxWin = 1] = "maxWin";
  e[e.minWin = 2] = "minWin";
  e[e.minLose = 3] = "minLose";
  e[e.maxLose = 4] = "maxLose";
})(i = exports.DebugTypeStone || (exports.DebugTypeStone = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.one = 1] = "one";
  e[e.two = 2] = "two";
  e[e.three = 3] = "three";
  e[e.four = 4] = "four";
})(n = exports.DebugTypeRace || (exports.DebugTypeRace = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.level1 = 1] = "level1";
  e[e.level2 = 2] = "level2";
  e[e.level3 = 3] = "level3";
  e[e.level4 = 4] = "level4";
})(a = exports.DebugTypeLottery || (exports.DebugTypeLottery = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.level1 = 1] = "level1";
  e[e.level2 = 2] = "level2";
  e[e.level3 = 3] = "level3";
  e[e.level4 = 4] = "level4";
})(s = exports.DebugTypeMail || (exports.DebugTypeMail = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.level1 = 1] = "level1";
  e[e.level2 = 2] = "level2";
  e[e.level3 = 3] = "level3";
  e[e.level4 = 4] = "level4";
})(r = exports.DebugTypeTransfer || (exports.DebugTypeTransfer = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.level1 = 1] = "level1";
  e[e.level2 = 2] = "level2";
})(c = exports.DebugTypeAlmanac || (exports.DebugTypeAlmanac = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.qingwa = 1] = "qingwa";
  e[e.shizi = 2] = "shizi";
})(l = exports.DebugTypeTiger || (exports.DebugTypeTiger = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.bizhong = 1] = "bizhong";
  e[e.chongzhi = 2] = "chongzhi";
  e[e.jiqi = 3] = "jiqi";
  e[e.bizhuan = 4] = "bizhuan";
})(u = exports.DebugTypeLuckBag || (exports.DebugTypeLuckBag = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.chongzhi = 1] = "chongzhi";
})(h = exports.DebugTypeWoodenPeople || (exports.DebugTypeWoodenPeople = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.caidan1 = 1] = "caidan1";
  e[e.caidan2 = 2] = "caidan2";
  e[e.caidan3 = 3] = "caidan3";
  e[e.jian = 4] = "jian";
})(p = exports.GMToolTypeFish || (exports.GMToolTypeFish = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.jingyefu = 1] = "jingyefu";
  e[e.piaoliuping = 2] = "piaoliuping";
  e[e.caoshika = 3] = "caoshika";
})(d = exports.GMToolTypeGoodsShop || (exports.GMToolTypeGoodsShop = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.one = 1] = "one";
  e[e.two = 2] = "two";
  e[e.three = 3] = "three";
  e[e.four = 4] = "four";
  e[e.five = 5] = "five";
  e[e.six = 6] = "six";
  e[e.seven = 7] = "seven";
  e[e.eight = 8] = "eight";
  e[e.nine = 9] = "nine";
})(y = exports.GMToolTypeGiveRedPacket || (exports.GMToolTypeGiveRedPacket = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.one = 1] = "one";
  e[e.two = 2] = "two";
  e[e.three = 3] = "three";
  e[e.four = 4] = "four";
  e[e.five = 5] = "five";
  e[e.six = 6] = "six";
  e[e.seven = 7] = "seven";
  e[e.eight = 8] = "eight";
})(f = exports.GMToolTypeMysteryShop || (exports.GMToolTypeMysteryShop = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.bizhongSSR = 1] = "bizhongSSR";
  e[e.bizhongYJ = 2] = "bizhongYJ";
  e[e.CaiDan = 3] = "CaiDan";
  e[e.jiqiYJ = 4] = "jiqiYJ";
})(m = exports.GMToolTypeFarm || (exports.GMToolTypeFarm = {}));
(function (e) {
  e[e.normal = 0] = "normal";
  e[e.bizhong = 1] = "bizhong";
  e[e.chongzhi = 2] = "chongzhi";
  e[e.jiandingzhen = 3] = "jiandingzhen";
  e[e.jiandingjia = 4] = "jiandingjia";
})(g = exports.GMToolTypeFerrule || (exports.GMToolTypeFerrule = {}));
var exp__DebugSystem = function () {
  function _ctor() {
    this.stoneType = i.normal;
    this.raceType = n.normal;
    this.lotteryType = a.normal;
    this.mailType = s.normal;
    this.transferType = r.normal;
    this.almanacType = c.normal;
    this.tigerType = l.normal;
    this.luckBagType = u.normal;
    this.woodenPeopleType = h.normal;
    this.fishType = p.normal;
    this.goodsShopType = d.normal;
    this.giveRedPacketType = y.normal;
    this.farmType = m.normal;
    this.mysteryShopType = f.normal;
    this.ferruleType = g.normal;
  }
  _ctor.prototype.init = function () {};
  _ctor.prototype.getLotteryTicketCfg = function () {
    if (r_PlayerData.PlayerData.data.almanacMap.rewardType == r_AlmanacResultUI.AlmanacRewardType.刮彩) {
      return r_LotteryTicketCfg4.LotteryTicketCfg4;
    } else if (this.lotteryType == a.normal) {
      return r_LotteryTicketCfg.LotteryTicketCfg;
    } else if (this.lotteryType == a.level1) {
      return r_LotteryTicketCfg1.LotteryTicketCfg1;
    } else if (this.lotteryType == a.level2) {
      return r_LotteryTicketCfg2.LotteryTicketCfg2;
    } else if (this.lotteryType == a.level3) {
      return r_LotteryTicketCfg3.LotteryTicketCfg3;
    } else if (this.lotteryType == a.level4) {
      return r_LotteryTicketCfg4.LotteryTicketCfg4;
    } else {
      return r_LotteryTicketCfg.LotteryTicketCfg;
    }
  };
  _ctor.prototype.getMailRareCfg = function (e) {
    if (r_PlayerData.PlayerData.data.almanacMap.rewardType == r_AlmanacResultUI.AlmanacRewardType.集邮) {
      r_PlayerData.PlayerData.data.almanacMap.rewardType = 0;
      return r_MailCfg.MailRare4Cfg;
    } else if (this.mailType == s.normal) {
      if (e) {
        return r_MailCfg.MailVideoRareCfg;
      } else {
        return r_MailCfg.MailRareCfg;
      }
    } else if (this.mailType == s.level1) {
      return r_MailCfg.MailRare1Cfg;
    } else if (this.mailType == s.level2) {
      return r_MailCfg.MailRare2Cfg;
    } else if (this.mailType == s.level3) {
      return r_MailCfg.MailRare3Cfg;
    } else if (this.mailType == s.level4) {
      return r_MailCfg.MailRare4Cfg;
    } else {
      return r_MailCfg.MailRareCfg;
    }
  };
  _ctor.prototype.getChatTransferCfg = function () {
    if (this.transferType == r.normal) {
      return r_ChatTransferCfg.ChatTansferCfg;
    } else if (this.transferType == r.level1) {
      return r_ChatTransferCfg.ChatTansferCfg1;
    } else if (this.transferType == r.level2) {
      return r_ChatTransferCfg.ChatTansferCfg2;
    } else if (this.transferType == r.level3) {
      return r_ChatTransferCfg.ChatTansferCfg3;
    } else if (this.transferType == r.level4) {
      return r_ChatTransferCfg.ChatTansferCfg4;
    } else {
      return r_ChatTransferCfg.ChatTansferCfg;
    }
  };
  _ctor.prototype.getAlmanacCfg = function () {
    if (this.almanacType == c.normal) {
      return r_AlamnacCfg.AlamnacCfg;
    } else if (this.almanacType == c.level1) {
      return r_AlamnacCfg.Alamnac1Cfg;
    } else if (this.almanacType == c.level2) {
      return r_AlamnacCfg.Alamnac2Cfg;
    } else {
      return r_AlamnacCfg.AlamnacCfg;
    }
  };
  _ctor.prototype.getTigerCfg = function () {
    if (this.tigerType == l.normal) {
      return r_TigerCfg.TigerCaidanCfg;
    } else if (this.tigerType == l.qingwa) {
      return r_TigerCfg.TigerCaidanCfg1;
    } else if (this.tigerType == l.shizi) {
      return r_TigerCfg.TigerCaidanCfg2;
    } else {
      return undefined;
    }
  };
  _ctor.prototype.getLuckBagRewadDebugCfg = function () {
    if (this.luckBagType == u.bizhuan) {
      return r_LuckBagCfg.LuckBagRewadDebugCfg;
    } else {
      return r_LuckBagCfg.LuckBagRewadCfg;
    }
  };
  return _ctor;
}();
exports._DebugSystem = exp__DebugSystem;
exports.DebugSystem = new exp__DebugSystem();