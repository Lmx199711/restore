var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_JobResultUI = require("JobResultUI");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var f = function () {
  function e() {
    this.node = null;
    this.answer = "";
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "选择题"
  })], e.prototype, "node", undefined);
  __decorate([_property({
    type: String,
    tooltip: "文字"
  })], e.prototype, "answer", undefined);
  return __decorate([_ccclass("JobTestCombineWord")], e);
}();
var m = function () {
  function e() {
    this.wordList = [];
    this.trueList = [];
    this.result = null;
    this.curList = [];
    this.curSelectIndex = 0;
  }
  __decorate([_property({
    type: [f],
    displayName: "选字列表"
  })], e.prototype, "wordList", undefined);
  __decorate([_property({
    type: cc.Label,
    tooltip: "输出"
  })], e.prototype, "outPutLb", undefined);
  __decorate([_property({
    type: [Number],
    tooltip: "正确顺序"
  })], e.prototype, "trueList", undefined);
  __decorate([_property({
    type: cc.Sprite,
    displayName: "结果图片"
  })], e.prototype, "result", undefined);
  return __decorate([_ccclass("JobTestCombineInfo")], e);
}();
var g = function () {
  function e() {
    this.node = null;
    this.answer = 1;
    this.selectIndex = 0;
    this.curIndex = 0;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "选择题"
  })], e.prototype, "node", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "正确id"
  })], e.prototype, "answer", undefined);
  return __decorate([_ccclass("JobTestSelectInfo")], e);
}();
var def_JobTestCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.levelMaxTime = 90;
    t.scoreRoot = null;
    t.picList = [];
    t.selectList = [];
    t.judgList = [];
    t.combineList = [];
    t.leftTime = 0;
    t.findNum = 0;
    t.isPause = false;
    t.isFinish = false;
    t.allSelectList = [];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.start = function () {};
  _ctor.prototype.onEnable = function () {
    if (0 == this.allSelectList.length) {
      for (var e = 0; e < this.selectList.length; e++) {
        this.allSelectList.push(this.selectList[e]);
      }
      for (e = 0; e < this.judgList.length; e++) {
        this.allSelectList.push(this.judgList[e]);
      }
    }
    for (e = 0; e < this.allSelectList.length; e++) {
      var t = this.allSelectList[e];
      t.curIndex = 0;
      t.selectIndex = 0;
      for (var o = 1; o <= 4; o++) {
        var i = t.node.getChildByName("n" + o);
        if (!i) {
          break;
        }
        i.getChildByName("select").active = false;
      }
      t.node.getChildByName("result") && (t.node.getChildByName("result").active = false);
      if (t.node.getChildByName("n5")) {
        t.node.getChildByName("n5").getComponent(cc.Sprite).spriteFrame = null;
        t.node.getChildByName("n5").active = true;
      }
    }
    for (e = 0; e < this.combineList.length; e++) {
      var n = this.combineList[e];
      n.result && (n.result.node.active = false);
      n.outPutLb.string = "";
      n.curList = [];
    }
    this.scoreRoot.active = false;
    this.registTouch();
    this.leftTime = this.levelMaxTime;
    this.isPause = false;
    this.isFinish = false;
  };
  _ctor.prototype.updateTime = function () {
    this.timeLb.string = Math.floor(this.leftTime) + "";
  };
  _ctor.prototype.update = function (e) {
    if (!(this.isPause || this.isFinish || this.leftTime <= 0)) {
      e > .5 && (e = .016);
      this.leftTime = this.leftTime - e;
      if (this.leftTime <= 0) {
        this.leftTime = 0;
        console.log("失败");
        this.onClickUp();
      }
      this.updateTime();
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    if (!this.touchNode) {
      this.touchNode = new cc.Node();
      this.touchNode.width = 1668;
      this.touchNode.height = 1002;
      this.node.addChild(this.touchNode);
    }
    var t = null;
    this.touchNode.off(cc.Node.EventType.TOUCH_START);
    this.touchNode.off(cc.Node.EventType.TOUCH_MOVE);
    this.touchNode.off(cc.Node.EventType.TOUCH_END);
    this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL);
    var o = null;
    var i = null;
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (n) {
      t = n.getLocation();
      o = null;
      i = null;
      for (var a = 0; a < e.allSelectList.length; a++) {
        var s = e.allSelectList[a];
        for (var r = 1; r <= 4; r++) {
          var l = s.node.getChildByName("n" + r);
          s.selectIndex = 0;
          if (!l) {
            break;
          }
          if (r_UtilsSystem.UtilsSystem.touchInNode(l, t)) {
            (o = s).selectIndex = r;
            break;
          }
        }
      }
      for (a = 0; a < e.combineList.length; a++) {
        var u = e.combineList[a];
        for (r = 0; r < u.wordList.length; r++) {
          if (-1 == u.curList.indexOf(r + 1)) {
            var h = u.wordList[r];
            if (r_UtilsSystem.UtilsSystem.touchInNode(h.node, t)) {
              u.curSelectIndex = r + 1;
              i = u;
              break;
            }
          }
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
      var n = e.touch.getLocation();
      if (Math.abs(n.x - t.x) > 20 || Math.abs(n.y - t.y)) {
        o = null;
        i = null;
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function () {
      if (o) {
        if (o.curIndex == o.selectIndex) {
          o.node.getChildByName("n" + o.curIndex).getChildByName("select").active = false;
          o.node.getChildByName("n5") && (o.node.getChildByName("n5").getComponent(cc.Sprite).spriteFrame = null);
          o.curIndex = 0;
        } else if (o.curIndex) {
          o.node.getChildByName("n" + o.curIndex).getChildByName("select").active = false;
          o.node.getChildByName("n" + o.selectIndex).getChildByName("select").active = true;
          o.node.getChildByName("n5") && (o.node.getChildByName("n5").getComponent(cc.Sprite).spriteFrame = e.picList[o.selectIndex - 1]);
          o.curIndex = o.selectIndex;
        } else {
          o.node.getChildByName("n" + o.selectIndex).getChildByName("select").active = true;
          o.node.getChildByName("n5") && (o.node.getChildByName("n5").getComponent(cc.Sprite).spriteFrame = e.picList[o.selectIndex - 1]);
          o.curIndex = o.selectIndex;
        }
        r_SoundMgr.SoundMgr.playSound("click1");
        o = null;
      }
      if (i) {
        r_SoundMgr.SoundMgr.playSound("click1");
        i.curList.push(i.curSelectIndex);
        i.outPutLb.string = i.outPutLb.string + i.wordList[i.curSelectIndex - 1].answer;
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, function () {});
    this.touchNode._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.onClickReset = function (e, t) {
    var o = this.combineList[t - 1];
    o.curList = [];
    o.outPutLb.string = "";
  };
  _ctor.prototype.isCombineSuccess = function (e) {
    if (e.trueList.length != e.curList.length) {
      return false;
    }
    for (var t = 0; t < e.trueList.length; t++) {
      if (e.trueList[t] != e.curList[t]) {
        return false;
      }
    }
    return true;
  };
  _ctor.prototype.onClickUp = function () {
    if (!this.isFinish) {
      this.isFinish = true;
      var e = [];
      for (var t = 0; t < 3; t++) {
        e[t] = 0;
      }
      for (t = 0; t < this.selectList.length; t++) {
        (i = this.selectList[t]).node.getChildByName("result") && (i.node.getChildByName("result").active = true);
        if (i.curIndex && i.curIndex == i.answer) {
          e[0] = e[0] + 10;
          i.node.getChildByName("result") && (i.node.getChildByName("result").getComponent(cc.Sprite).spriteFrame = this.picList[4]);
        } else {
          i.node.getChildByName("result") && (i.node.getChildByName("result").getComponent(cc.Sprite).spriteFrame = this.picList[5]);
        }
      }
      for (t = 0; t < this.judgList.length; t++) {
        var i;
        (i = this.judgList[t]).node.getChildByName("result") && (i.node.getChildByName("result").active = true);
        if (i.curIndex && i.curIndex == i.answer) {
          e[1] = e[1] + 10;
          i.node.getChildByName("result") && (i.node.getChildByName("result").getComponent(cc.Sprite).spriteFrame = this.picList[4]);
        } else {
          i.node.getChildByName("result") && (i.node.getChildByName("result").getComponent(cc.Sprite).spriteFrame = this.picList[5]);
        }
      }
      for (t = 0; t < this.combineList.length; t++) {
        var n = this.combineList[t];
        n.result && (n.result.node.active = true);
        if (this.isCombineSuccess(n)) {
          e[2] = e[2] + 10;
          n.result && (n.result.spriteFrame = this.picList[4]);
        } else {
          n.result && (n.result.spriteFrame = this.picList[5]);
        }
      }
      var a = 0;
      for (t = 0; t < 3; t++) {
        a += e[t];
      }
      this.scoreRoot.active = true;
      for (t = 1; t <= 3; t++) {
        this.scoreRoot.getChildByName("score" + t).getChildByName("num").getComponent(cc.Label).string = e[t - 1] + "";
      }
      this.scoreRoot.getChildByName("allScore").getChildByName("num").getComponent(cc.Label).string = a + "";
      this.node.getChildByName("scrollView").getComponent(cc.ScrollView).scrollToTop(.1);
      if (a >= 100) {
        r_PlayerData.PlayerData.addCoin("智商测试", _ref__ctor.addCoinNum, r_ReportSystem.SystemKey.None);
        r_JobResultUI.JobResultUI.showUI({
          mode: 1
        });
        r_SoundMgr.SoundMgr.playSound("win");
      } else {
        r_JobResultUI.JobResultUI.showUI({
          mode: 0
        });
        r_SoundMgr.SoundMgr.playSound("fail");
      }
    }
  };
  _ctor.Inst = null;
  _ctor.addCoinNum = 1e5;
  __decorate([_property({
    type: cc.Label,
    displayName: "时间"
  })], _ctor.prototype, "timeLb", undefined);
  __decorate([_property({
    type: Number,
    displayName: "关卡时间"
  })], _ctor.prototype, "levelMaxTime", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "分数根"
  })], _ctor.prototype, "scoreRoot", undefined);
  __decorate([_property({
    type: [cc.SpriteFrame],
    displayName: "ABCD对错图片路径"
  })], _ctor.prototype, "picList", undefined);
  __decorate([_property({
    type: [g],
    displayName: "选择题列表"
  })], _ctor.prototype, "selectList", undefined);
  __decorate([_property({
    type: [g],
    displayName: "判断题列表"
  })], _ctor.prototype, "judgList", undefined);
  __decorate([_property({
    type: [m],
    displayName: "组合题列表"
  })], _ctor.prototype, "combineList", undefined);
  return _ref__ctor = __decorate([_ccclass, _menu("豪门少年/人才招聘/智商测试")], _ctor);
}(cc.Component);
exports.default = def_JobTestCom;