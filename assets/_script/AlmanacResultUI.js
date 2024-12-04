var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlmanacResultUI = exports.AlmanacRewardType = exports.AlmanacType = undefined;
var a;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_DebugSystem = require("DebugSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_AlmanacUI = require("AlmanacUI");
var r_PlayerData = require("PlayerData");
var r_AlamnacCfg = require("AlamnacCfg");
var r_TimeSystem = require("TimeSystem");
var r_EmgcSystem = require("EmgcSystem");
(function (e) {
  e[e["大吉"] = 0] = "大吉";
  e[e["中吉"] = 1] = "中吉";
  e[e["小吉"] = 2] = "小吉";
  e[e["小凶"] = 3] = "小凶";
  e[e["中凶"] = 4] = "中凶";
  e[e["大凶"] = 5] = "大凶";
})(a = exports.AlmanacType || (exports.AlmanacType = {}));
(function (e) {
  e[e["切石"] = 1] = "切石";
  e[e["集邮"] = 2] = "集邮";
  e[e["刮彩"] = 3] = "刮彩";
})(exports.AlmanacRewardType || (exports.AlmanacRewardType = {}));
var exp_AlmanacResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Almanac, r_UIDef.UIDef.Res.UI.AlmanacResultUI) || this;
    t.wordList = ["结婚", "投资", "复婚", "出嫁", "升学宴", "赴任", "入学", "接亲", "喜宴", "火化", "封顶", "开业", "耕种", "安床", "钓鱼", "栽树", "装修", "乔迁", "养殖", "拆房", "祈福", "搬公司", "交易", "出门", "加油", "安灶", "开张", "办满月酒", "出差", "办百日宴", "出门", "交易", "嫁娶", "蹦迪", "开市", "买车"];
    t.angleList = [0, 120, 240, 60, 300, 180];
    t.rewardNameList = ["切石", "集邮", "刮彩"];
    t.curType = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.AlmanacResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.AlmanacResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnRestart = this.contentPane.getChild("btnRestart").asButton;
    this.btnRestart.onClick(this.onClickRestart, this);
    this.rotationNode = this.contentPane.getChild("panzi");
    this.typeIcon = this.contentPane.getChild("typeIcon");
    this.tipCom = this.contentPane.getChild("tipCom");
    this.content1 = this.contentPane.getChild("content1");
    this.content2 = this.contentPane.getChild("content2");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data.restart) {
      this.startRotation();
    } else {
      this.setContent();
      this.btnRestart.visible = true;
      this.typeIcon.url = "ui://Almanac/typeIcon" + r_PlayerData.PlayerData.data.almanacMap.drawType;
      this.tipCom.getController("mode").selectedIndex = 3;
      this.rotationNode.node.angle = this.angleList[r_PlayerData.PlayerData.data.almanacMap.drawType];
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.clearContent = function () {
    this.content1.text = "";
    this.content2.text = "";
    this.btnRestart.visible = false;
    this.typeIcon.url = null;
  };
  _ctor.prototype.startRotation = function () {
    var e = this;
    this.clearContent();
    var t = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_DebugSystem.DebugSystem.getAlmanacCfg());
    this.curType = t.type;
    r_PlayerData.PlayerData.data.almanacMap.drawTime = r_TimeSystem.TimeSystem.getServerTime();
    r_PlayerData.PlayerData.data.almanacMap.drawType = t.type;
    if (this.curType == a.大吉) {
      r_PlayerData.PlayerData.data.almanacMap.rewardType = r_UtilsSystem.UtilsSystem.getRandomNum(1, 3);
    } else {
      r_PlayerData.PlayerData.data.almanacMap.rewardType = 0;
    }
    this.getContentStr();
    r_PlayerData.PlayerData.saveData();
    console.log("typeCfg.type=", t.type);
    var o = 1800 + this.angleList[t.type];
    this.rotationNode.node.angle = 0;
    cc.Tween.stopAllByTarget(this.rotationNode.node);
    cc.Tween.stopAllByTarget(this.node);
    cc.tween(this.rotationNode.node).to(5, {
      angle: o
    }, {
      easing: "cubicInOut"
    }).start();
    cc.tween(this.node).delay(.5).call(function () {
      e.tipCom.getController("mode").selectedIndex = 1;
    }).delay(1).call(function () {
      e.tipCom.getController("mode").selectedIndex = 2;
    }).delay(1).call(function () {
      e.tipCom.getController("mode").selectedIndex = 3;
    }).delay(2.5).call(function () {
      e.typeIcon.url = "ui://Almanac/typeIcon" + t.type;
      e.btnRestart.visible = true;
      e.setContent();
      var o = r_AlamnacCfg.triggerChatMapCfg[t.type];
      o && r_EmgcSystem.EmgcSystem.triggerEmgc(o);
      e.showOpacityAnim(e.typeIcon.node, .5);
      e.showOpacityAnim(e.content1.node, .5);
      e.showOpacityAnim(e.content2.node, .5);
    }).delay(.5).call(function () {}).start();
    this.tipCom.getController("mode").selectedIndex = 0;
  };
  _ctor.prototype.showOpacityAnim = function (e, t) {
    e.opacity = 0;
    cc.tween(e).to(t, {
      opacity: 255
    }).start();
  };
  _ctor.prototype.getContentStr = function () {
    var e = "";
    var t = "";
    if (this.curType == a.大吉) {
      e = this.rewardNameList[r_PlayerData.PlayerData.data.almanacMap.rewardType - 1];
      t = "百无禁忌";
    } else if (this.curType == a.大凶) {
      e = "诸事不宜";
      t = "万事皆忌";
    } else {
      var o = [];
      var i = r_UtilsSystem.UtilsSystem.getRandomFromArrExceptList(this.wordList, o);
      o.push(i);
      var n = r_UtilsSystem.UtilsSystem.getRandomFromArrExceptList(this.wordList, o);
      o.push(n);
      var s = r_UtilsSystem.UtilsSystem.getRandomFromArrExceptList(this.wordList, o);
      o.push(s);
      e = i + "," + n;
      t = s + "," + r_UtilsSystem.UtilsSystem.getRandomFromArrExceptList(this.wordList, o);
    }
    r_PlayerData.PlayerData.data.almanacMap.contentStr1 = e;
    r_PlayerData.PlayerData.data.almanacMap.contentStr2 = t;
  };
  _ctor.prototype.setContent = function () {
    this.content1.text = r_PlayerData.PlayerData.data.almanacMap.contentStr1;
    this.content2.text = r_PlayerData.PlayerData.data.almanacMap.contentStr2;
  };
  _ctor.prototype.onClickRestart = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("今日运势", function () {
      e.hide();
      r_AlmanacUI.AlmanacUI.showUI();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.AlmanacResultUI = exp_AlmanacResultUI;