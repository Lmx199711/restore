Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaidanSystem = undefined;
var r_LotteryCfg = require("LotteryCfg");
var r_CaidanUI = require("CaidanUI");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r = function () {
  function e() {
    this.caidanKey = {
      huaxianzi: "先把角色头上花拖到左边眉笔上,然后再拖动新眉笔到角色头上触发彩蛋",
      yugongyishan: "点击左边愚公移山四个字的位置,愚公开始挖山，连续点击三次触发彩蛋",
      bitizhong: "1.当比试失败后,可以长按现女友的文字拖动到右边前女友的位置,完成身份互换\n2.比试失败后,拖动上方的鸡腿图标到前女友身上",
      zuqiu: "长按左上角的足球图标两秒,解锁射门彩蛋",
      wugang: "拖动玉兔右边的桂花到玉兔身上,随后点击两次玉兔则会变身嫦娥,触发彩蛋",
      elevenTick: "拖动右边的红包到手机上,再点击发光的手机,开始抢红包",
      shenron: "拖动角色到左边茅厕中,随后开始抢红包",
      caishen: "拖动上方对联中的“福”字给下方的胖子,随后拖动聚宝盆接住元宝",
      nianMonster: "拖动带火的灯笼点燃鞭炮,随后拖动鞭炮给神兽。随后开始打年兽",
      wangpo: "拖上右上角花给女角色，选人时点击三次媒婆有彩蛋",
      rocketToSky: "摩擦火箭底部2s,随后进入飞行点击宇航员,不要点击外星人",
      diss: "摩擦右上角“世界”文字，擦除出“成都”，随后点击房屋的大门处进入彩蛋"
    };
  }
  e.prototype.bindBtn = function (e, t, o) {
    t.clearClick();
    t.onClick(function (e, t, o) {
      if (0 == r_PlayerData.PlayerData.data[t]) {
        r_PlatformSystem.PlatformSystem.showVideo("观看彩蛋", function () {
          r_CaidanUI.default.showUI(e);
          r_PlayerData.PlayerData.data[t] = 1;
          o.getController("type").selectedIndex = 1;
        });
      } else {
        r_CaidanUI.default.showUI(e);
      }
    }.bind(this, e, o, t));
  };
  e.prototype.setIsVisibleAndState = function (e, t, o) {
    e.visible = 0 == Math.min.apply(Math, t);
    e.getController("type").selectedIndex = o;
  };
  e.prototype.initData = function (e) {
    var t = r_LotteryCfg.LotteryCfg.find(function (t) {
      return e == t.id;
    });
    r_PlayerData.PlayerData.data.lotteryGameMap[t.tipId] || (r_PlayerData.PlayerData.data.lotteryGameMap[t.tipId] = {});
    r_PlayerData.PlayerData.data.lotteryGameMap[t.tipId][t.videoId] || (r_PlayerData.PlayerData.data.lotteryGameMap[t.tipId][t.videoId] = 0);
    t.tipNum.forEach(function (e) {
      r_PlayerData.PlayerData.data.lotteryGameMap[t.tipId][e] || (r_PlayerData.PlayerData.data.lotteryGameMap[t.tipId][e] = 0);
    });
  };
  e.prototype.bindBtnById = function (e, t, o) {
    t.clearClick();
    t.onClick(function (e, t, o) {
      if (0 == r_PlayerData.PlayerData.data.lotteryGameMap[e][t]) {
        r_PlatformSystem.PlatformSystem.showVideo("观看彩蛋", function () {
          r_CaidanUI.default.showUI(e);
          r_PlayerData.PlayerData.data.lotteryGameMap[e][t] = 1;
          o.getController("type").selectedIndex = 1;
        });
      } else {
        r_CaidanUI.default.showUI(e);
      }
    }.bind(this, e, o, t));
  };
  e.prototype.getCaidanNum = function (e, t) {
    var o = r_LotteryCfg.LotteryCfg.find(function (t) {
      return e == t.id;
    });
    return r_PlayerData.PlayerData.data.lotteryGameMap[o.tipId][o.tipNum[t]];
  };
  e.prototype.setCaidanNum = function (e, t, o) {
    var n = r_LotteryCfg.LotteryCfg.find(function (t) {
      return e == t.id;
    });
    r_PlayerData.PlayerData.data.lotteryGameMap[n.tipId][n.tipNum[t]] = o || 1;
  };
  e.prototype.getCaidanVideo = function (e) {
    var t = r_LotteryCfg.LotteryCfg.find(function (t) {
      return e == t.id;
    });
    return r_PlayerData.PlayerData.data.lotteryGameMap[t.tipId][t.videoId];
  };
  return e;
}();
exports.CaidanSystem = new r();