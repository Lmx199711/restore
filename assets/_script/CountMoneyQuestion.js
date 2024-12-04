var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CountMoneyQuestion = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_TimeSystem = require("TimeSystem");
var d = [{
  id: 1,
  name: "问题1",
  desc: "8×5=？",
  option: ["35", "40", "45", "50"],
  answer: 1
}, {
  id: 2,
  name: "问题2",
  desc: "9×7÷8×4×50÷3×0=？",
  option: ["565", "371", "21", "0"],
  answer: 3
}, {
  id: 3,
  name: "问题3",
  desc: "被誉为诗仙的是？",
  option: ["杜甫", "李白", "白居易", "李商隐"],
  answer: 1
}, {
  id: 4,
  name: "问题4",
  desc: "父亲与儿子一共100岁，父亲50岁，问儿子多少岁？",
  option: ["50", "25", "20", "15"],
  answer: 1
}, {
  id: 5,
  name: "问题5",
  desc: "贾玲瘦了多少斤？",
  option: ["100", "50", "20", "10"],
  answer: 0
}, {
  id: 6,
  name: "问题6",
  desc: "窈窕淑女的上半句是什么",
  option: ["关关雎鸠", "在河之洲", "君子好逑", "我怎么知道"],
  answer: 1
}, {
  id: 7,
  name: "问题7",
  desc: "和尚用什么洗头",
  option: ["洗发露", "沐浴露", "洗面奶", "用水用水"],
  answer: 3
}, {
  id: 8,
  name: "问题8",
  desc: "用毒蛇的毒毒毒蛇，毒蛇会被毒死吗",
  option: ["会", "不会", "可能会", "应该不会吧"],
  answer: 1
}, {
  id: 9,
  name: "问题9",
  desc: "电鳗会被电鳗的电电死吗",
  option: ["会", "不会", "可能会", "应该不会吧"],
  answer: 1
}, {
  id: 10,
  name: "问题10",
  desc: "老师说裸考能穿衣服吗",
  option: ["可以穿衣", "穿裤衩", "不能穿", "看看医生吧"],
  answer: 0
}, {
  id: 11,
  name: "问题11",
  desc: "麻醉药发明之前，做手术的人怎么办",
  option: ["不做", "转移注意力", "用棍子", "不怕疼"],
  answer: 2
}, {
  id: 12,
  name: "问题12",
  desc: "是谁给的忘情水",
  option: ["牛德华", "不知道", "啊哈", "时间"],
  answer: 2
}, {
  id: 13,
  name: "问题13",
  desc: "减脂餐是饭前吃还是饭后吃",
  option: ["饭前吃", "饭后吃", "当饭吃", "不吃"],
  answer: 2
}];
var exp_CountMoneyQuestion = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.CountMoney, r_UIDef.UIDef.Res.UI.CountMoneyQuestion) || this;
    t.curQuestIndex = 1;
    t.curAnserNum = 0;
    t.anserIndex = 1;
    t.isClickTip = false;
    t.anserBtnList = [];
    t.isCanClick = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CountMoneyQuestion, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CountMoneyQuestion);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnTip.onClick(this.onClickTip, this);
    var o = function (e) {
      i.anserBtnList[e - 1] = i.contentPane.getChild("btnAnser" + e).asButton;
      i.anserBtnList[e - 1].clearClick();
      i.anserBtnList[e - 1].onClick(function () {
        t.onclickAnser(e);
      }, i);
    };
    var i = this;
    for (var n = 1; n <= 4; n++) {
      o(n);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.isCanClick = false;
    this.isClickTip = false;
    this.btnTip.getController("type").selectedIndex = 0;
    this.refreshOption();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.data.anserCallBack && this.data.anserCallBack();
  };
  _ctor.prototype.refreshOption = function () {
    var e = this;
    this.curQuestIndex = r_UtilsSystem.UtilsSystem.getRandomNum(0, d.length - 1);
    this.lbDesc.text = d[this.curQuestIndex].desc;
    for (var t = 0; t < this.anserBtnList.length; t++) {
      this.anserBtnList[t].getChild("lbName").text = d[this.curQuestIndex].option[t];
      this.showBtnAnim(this.anserBtnList[t]);
    }
    this.anserIndex = d[this.curQuestIndex].answer;
    for (t = 0; t < 4; t++) {
      this.anserBtnList[t].asButton.touchable = false;
    }
    r_TimeSystem.TimeSystem.scheduleOnce("iscanClick", 1, function () {
      e.isCanClick = true;
      for (var t = 0; t < 4; t++) {
        e.anserBtnList[t].asButton.touchable = true;
      }
    });
  };
  _ctor.prototype.showBtnAnim = function (e) {
    e.scaleX = e.scaleY = 0;
    cc.tween(e).to(.2, {
      scaleX: 1,
      scaleY: 1
    }).call(function () {}).start();
  };
  _ctor.prototype.getMoneyByIndex = function (e) {
    var t = 0;
    for (var o = 0; o < this.data.moneyList.length; o++) {
      this.data.moneyList[o].index == e && (t += 1);
    }
    return t;
  };
  _ctor.prototype.randomQuestion = function () {
    if (1 == this.curQuestIndex) {
      var e = r_UtilsSystem.UtilsSystem.getRandomNum(0, this.data.moneyList.length - 1);
      this.lbDesc.text = d[this.curQuestIndex - 1].desc.replace("xx", ["5", "10", "20", "50", "100"][this.data.moneyList[e].index]);
      this.curAnserNum = this.getMoneyByIndex(this.data.moneyList[e].index);
    }
    this.anserIndex = r_UtilsSystem.UtilsSystem.getRandomNum(1, 4);
  };
  _ctor.prototype.onclickAnser = function (e) {
    if (this.isCanClick) {
      if (e == this.anserIndex + 1) {
        r_PlayerData.PlayerData.addCoin("数钱", 5e5);
      } else {
        r_UtilsSystem.UtilsSystem.showTip("回答错误");
      }
      this.hide();
    }
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    if (0 == this.btnTip.getController("type").selectedIndex) {
      r_PlatformSystem.PlatformSystem.showVideo("数钱问答提示", function () {
        e.btnTip.getController("type").selectedIndex = 1;
        r_UtilsSystem.UtilsSystem.showAlert(d[e.curQuestIndex].option[e.anserIndex], 1, function () {}, e, "提示", "确定");
      });
    } else {
      r_UtilsSystem.UtilsSystem.showAlert(d[this.curQuestIndex].option[this.anserIndex], 1, function () {}, this, "提示", "确定");
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnTip")], _ctor.prototype, "btnTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbDesc")], _ctor.prototype, "lbDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.CountMoneyQuestion = exp_CountMoneyQuestion;