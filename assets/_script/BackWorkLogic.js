var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TimeSystem = require("TimeSystem");
var r_LevelPreload = require("LevelPreload");
var r_BehaviorMgr = require("BehaviorMgr");
var r_SoundMgr = require("SoundMgr");
var r_BackWorkResult = require("BackWorkResult");
var r_BWTipDialogue = require("BWTipDialogue");
var r_GameKeyMgr = require("GameKeyMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_BackWorkLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.countDownLabel = null;
    t.storyBg = null;
    t.heartNode = null;
    t.heartTipNode = null;
    t.heartTipTargetPos = null;
    t.heartTipLabel = null;
    t.labelQustion = null;
    t.labelPassword = null;
    t.nodeKeyboard = null;
    t.btnTip = null;
    t.BWTipDialogue = null;
    t.storyNodeList = [];
    t.storyNodePosList = [];
    t.time = 0;
    t.oneS = 0;
    t.curQuest = 1;
    t.errorCount = 0;
    t.curPic = 0;
    t.curInputList = [];
    t.isGameOver = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.registTouch();
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.update = function (e) {
    var t = this;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
    if (this.oneS > 1) {
      this.oneS = 0;
      if (this.time > 0) {
        this.time -= 1;
        this.time <= 0 && (r_GameKeyMgr.GameKeyMgr.has("显示过度剧情") || (r_BehaviorMgr.BehaviorMgr.trigger("显示过度剧情"), r_TimeSystem.TimeSystem.scheduleOnce("bwstory", 2, function () {
          t.showStoryAnim();
        })));
        this.countDownLabel.getComponent(cc.Label).string = "距离放假还有" + this.time + "秒";
      }
    }
    this.oneS += e;
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.loadPreload = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    this.init();
    return null;
  };
  _ctor.prototype.passLevel = function () {};
  _ctor.prototype.init = function () {
    this.curQuest = 1;
    this.time = 8;
    this.curPic = 0;
    this.countDownLabel.getComponent(cc.Label).string = "距离放假还有" + this.time + "秒";
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
  };
  _ctor.prototype.showHert = function () {
    if (!this.isGameOver && this.errorCount >= 3) {
      r_GameKeyMgr.GameKeyMgr.add("游戏结束");
      r_TimeSystem.TimeSystem.scheduleOnce("resultFail", 2, function () {
        r_BackWorkResult.BackWorkResult.showUI();
      });
    }
    for (var e = 1; e <= 3; e++) {
      if (e > this.errorCount) {
        this.heartNode.getChildByName("红心" + e).active = true;
      } else {
        this.heartNode.getChildByName("红心" + e).active = false;
        this.errorCount == e && this.showHertAnim(this.heartNode.getChildByName("红心" + e));
      }
    }
  };
  _ctor.prototype.showHertAnim = function (e) {
    var t = this;
    var o = this.heartTipLabel.getPosition();
    this.heartTipLabel.active = true;
    cc.Tween.stopAllByTarget(this.heartTipLabel);
    cc.tween(this.heartTipLabel).to(.5, {
      y: o.y + 50
    }).call(function () {
      t.heartTipLabel.y = o.y;
      t.heartTipLabel.active = false;
    }).start();
    this.heartTipNode.active = true;
    this.heartTipNode.setPosition(e.getPosition());
    cc.Tween.stopAllByTarget(this.heartTipNode);
    cc.tween(this.heartTipNode).bezierTo(.5, cc.v2(e.x, e.y), cc.v2(e.x + 50, e.y + 50), cc.v2(this.heartTipTargetPos.x, this.heartTipTargetPos.y)).call(function () {
      t.heartTipNode.active = false;
    }).start();
  };
  _ctor.prototype.showStoryAnim = function () {
    var e = this;
    var t = function () {
      cc.tween(e.storyNodeList[e.curPic]).to(1, {
        x: e.storyNodePosList[e.curPic].x,
        y: e.storyNodePosList[e.curPic].y
      }).delay(1).call(function () {
        e.curPic += 1;
        if (e.curPic > 4) {
          r_BehaviorMgr.BehaviorMgr.trigger("显示准备返工");
        } else if (3 == e.curPic) {
          o();
        } else {
          t();
        }
      }).start();
    };
    var o = function () {
      cc.tween(e.storyNodeList[e.curPic]).to(1, {
        opacity: 255
      }).delay(1).call(function () {
        e.curPic += 1;
        t();
      }).start();
    };
    t();
  };
  _ctor.prototype.registTouch = function () {
    if (!this.touchNode) {
      this.touchNode = new cc.Node();
      this.touchNode.width = 1668;
      this.touchNode.height = 1002;
      this.node.addChild(this.touchNode);
    }
    this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
  };
  _ctor.prototype.unregistTouch = function () {
    this.touchNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart);
    this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove);
    this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd);
    this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel);
  };
  _ctor.prototype.onClickBtnAction = function (e, t) {
    var o = this;
    t && "点击放假回家" == t && r_TimeSystem.TimeSystem.scheduleOnce("bwstory", 2, function () {
      o.showStoryAnim();
    });
    if (-1 != t.indexOf("|")) {
      var i = t.split("|");
      r_GameKeyMgr.GameKeyMgr.has(i[0]) && r_BehaviorMgr.BehaviorMgr.trigger(i[1]);
    } else {
      r_BehaviorMgr.BehaviorMgr.trigger(t);
    }
    r_BehaviorMgr.BehaviorMgr.trigger("音效#click");
  };
  _ctor.prototype.showBtnTipState = function (e) {
    undefined === e && (e = true);
    this.btnTip.getChildByName("video").active = e;
    this.btnTip.getChildByName("noVideo").active = !e;
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    if (this.btnTip.getChildByName("video").active) {
      r_PlatformSystem.PlatformSystem.showVideo("春节返工提示", function () {
        e.showBtnTipState(false);
        e.BWTipDialogue.startDialogue(e.curQuest);
      });
    } else {
      this.BWTipDialogue.startDialogue(this.curQuest);
    }
  };
  _ctor.prototype.anserResult = function (e, t, o) {
    var i = this;
    if (!("1" == o)) {
      this.errorCount += 1;
      r_TimeSystem.TimeSystem.scheduleOnce("anserError", .5, function () {
        i.showHert();
      });
    }
  };
  _ctor.prototype.recordCurQuest = function (e, t, o) {
    "" != o && (this.curQuest = parseInt(o));
    this.showBtnTipState(true);
  };
  _ctor.prototype.gameOver = function () {
    r_GameKeyMgr.GameKeyMgr.add("游戏结束");
    if (this.errorCount >= 3) {
      r_TimeSystem.TimeSystem.scheduleOnce("resultFail", 2, function () {
        r_BackWorkResult.BackWorkResult.showUI();
      });
    } else if (this.errorCount < 3) {
      r_BehaviorMgr.BehaviorMgr.trigger("游戏成功");
      r_TimeSystem.TimeSystem.scheduleOnce("resultwin", 2, function () {
        r_BackWorkResult.BackWorkResult.showUI({
          mode: 1
        });
      });
    }
  };
  _ctor.prototype.onClickInput = function (e, t) {
    r_SoundMgr.SoundMgr.playSound("click");
    if ("enter" == t) {
      this.btnTip.active = false;
      this.nodeKeyboard.active = false;
      if (this.curInputList.length > 0) {
        this.curInputList = [];
        this.labelPassword.getComponent(cc.Label).string = "请输入密码";
        r_BehaviorMgr.BehaviorMgr.trigger("第五题回答错误");
      } else {
        this.gameOver(null, null, null);
      }
    } else if ("point" == t) {
      this.curInputList.push(".");
      if (this.curInputList.length >= 9) {
        return void r_UtilsSystem.UtilsSystem.showTip("超过最大长度");
      }
    } else if ("add" == t) {
      this.curInputList.push("+");
      if (this.curInputList.length >= 9) {
        return void r_UtilsSystem.UtilsSystem.showTip("超过最大长度");
      }
    } else if ("delete" == t) {
      this.curInputList.length > 0 && this.curInputList.splice(this.curInputList.length - 1, 1);
    } else {
      if (this.curInputList.length >= 9) {
        return void r_UtilsSystem.UtilsSystem.showTip("超过最大长度");
      }
      this.curInputList.push(t);
    }
    if (this.curInputList.length > 0) {
      var o = "";
      this.curInputList.forEach(function (e) {
        o += e;
      });
      this.labelPassword.getComponent(cc.Label).string = o;
    } else {
      this.labelPassword.getComponent(cc.Label).string = "请输入密码";
    }
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.touchStartPos = e.getLocation();
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.startID = e.getID();
      this.moveInfo = {};
      if (this.storyBg.active && this.storyBg.activeInHierarchy && r_UtilsSystem.UtilsSystem.touchInNode(this.storyBg, this.touchStartPos)) {
        cc.Tween.stopAllByTarget(this.storyNodeList[this.curPic]);
        this.storyNodeList[this.curPic].x = this.storyNodePosList[this.curPic].x;
        this.storyNodeList[this.curPic].y = this.storyNodePosList[this.curPic].y;
        this.storyNodeList[this.curPic].opacity = 255;
        this.curPic += 1;
        if (!(this.curPic <= 4)) {
          this.curPic = 4;
          return void r_BehaviorMgr.BehaviorMgr.trigger("显示准备返工");
        }
        this.showStoryAnim();
      }
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    this.startID && this.startID != e.getID() && e.stopPropagation();
  };
  _ctor.prototype.onTouchEnd = function () {
    this.startID = null;
    this.moveInfo && this.moveInfo.node;
  };
  _ctor.prototype.onTouchCancel = function () {
    this.startID = null;
    this.moveInfo = null;
    this.moveInfo && this.moveInfo.node;
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "倒计时label"
  })], _ctor.prototype, "countDownLabel", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "故事背景"
  })], _ctor.prototype, "storyBg", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "心父节点"
  })], _ctor.prototype, "heartNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "红心提示动画"
  })], _ctor.prototype, "heartTipNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "红心提示节点动画目标位置"
  })], _ctor.prototype, "heartTipTargetPos", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "红心提示动画(label)"
  })], _ctor.prototype, "heartTipLabel", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "当前第几题"
  })], _ctor.prototype, "labelQustion", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "电脑密码"
  })], _ctor.prototype, "labelPassword", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "键盘界面"
  })], _ctor.prototype, "nodeKeyboard", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示按钮"
  })], _ctor.prototype, "btnTip", undefined);
  __decorate([_property({
    type: r_BWTipDialogue.default,
    displayName: "提示对话"
  })], _ctor.prototype, "BWTipDialogue", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "故事背景图片"
  })], _ctor.prototype, "storyNodeList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "故事背景图片移动目标位置"
  })], _ctor.prototype, "storyNodePosList", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_BackWorkLogic;