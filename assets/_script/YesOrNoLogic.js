var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TimeSystem = require("TimeSystem");
var r_CheckHasKeys = require("CheckHasKeys");
var r_LevelPreload = require("LevelPreload");
var r_PlayerData = require("PlayerData");
var r_SoundMgr = require("SoundMgr");
var r_YesOrNoResult = require("YesOrNoResult");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var v = [{
  id: 1,
  name: "金砖",
  normalAnim: "zc",
  yesAnim: ["duzhui", "shenqi"],
  noAnim: ["maohan", "kaix"],
  desc: ["哼，50块买的", "可惜了给你准备的网红红包"],
  soundName: ["哼，50块买的", "可惜了给你准备的网红红包"]
}, {
  id: 2,
  name: "马桶筛",
  normalAnim: "duzhui",
  yesAnim: ["maohan", "kaix"],
  noAnim: ["duzhui", "shenqi"],
  desc: ["今天你刷马桶哟~", "哼，马桶都不打扫"],
  soundName: ["今天打扫马桶哦", "哼，马桶都不打扫"]
}, {
  id: 3,
  name: "螺蛳粉",
  normalAnim: "duzhui",
  yesAnim: ["duzhui", "kaix"],
  noAnim: ["maohan", "shenqi"],
  desc: ["今天终于可以吃螺丝粉啦", "辛苦我煮了这么久"],
  soundName: ["今天终于可以吃螺丝粉啦", "辛苦我煮了这么久"]
}, {
  id: 4,
  name: "换皮裙",
  normalAnim: "duzhui",
  yesAnim: ["maohan", "haixiu"],
  noAnim: ["duzhui", "kaix"],
  desc: ["好嘛，穿给你看", "你不是最喜欢看我穿这套"],
  soundName: ["好嘛，穿给你看", "你不是最喜欢看我穿这套"]
}, {
  id: 5,
  name: "私房钱",
  normalAnim: "duzhui",
  yesAnim: ["duzhui", "kaix"],
  noAnim: ["maohan", "shenqi"],
  desc: ["私房钱通通交出来", "居然不上当"],
  soundName: ["私房钱通通交出来", "居然不上当"]
}, {
  id: 6,
  name: "丝袜",
  normalAnim: "duzhui",
  yesAnim: ["duzhui", "haixiu"],
  noAnim: ["duzhui", "kaix"],
  desc: ["好嘛，换给你看", "你不喜欢了吗？"],
  soundName: ["好嘛，换给你看", "你不喜欢了吗？"]
}];
var C = function () {
  function e() {
    this.keyList = [];
    this.anwserText = "";
    this.isFinish = false;
    this.isGet = false;
  }
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时才可以完成"
  })], e.prototype, "keyList", undefined);
  __decorate([_property({
    displayName: "答案提示文字"
  })], e.prototype, "anwserText", undefined);
  return __decorate([_ccclass("YesOrNoTips")], e);
}();
var def_YesOrNoLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.deskNode = null;
    t.roleNode = null;
    t.roleQipao = null;
    t.boxNode = null;
    t.boxTargetPos = null;
    t.heartNode = null;
    t.heartTipNode = null;
    t.heartTipTargetPos = null;
    t.heartTipLabel = null;
    t.goldBrick = null;
    t.goldBrickAnim = null;
    t.goodsNodeList = [];
    t.goodsBlockNodeList = [];
    t.btnTip = null;
    t.btnNext = null;
    t.btnGet = null;
    t.btnYes1 = null;
    t.btnYes2 = null;
    t.gameTips = [];
    t.curQuest = 1;
    t.curSelectCount = 0;
    t.selectTrueList = [true, false, false, true, false, true];
    t.errorCount = 0;
    t.curMove = 0;
    t.isPiKu = false;
    t.isSiWa = false;
    t.isGameOver = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.registTouch();
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.update = function (e) {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.loadPreload = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    this.init();
    this.startGame();
    return null;
  };
  _ctor.prototype.passLevel = function () {};
  _ctor.prototype.init = function () {
    this.btnTip.active = false;
    this.boxNodeInitPos = new cc.Vec2(this.boxNode.x, this.boxNode.y);
    this.goldBrickNodeInitPos = new cc.Vec2(this.goldBrick.x, this.goldBrick.y);
    this.curQuest = 1;
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
  };
  _ctor.prototype.startGame = function () {
    this.showRoleAnim(this.roleNode, v[this.curQuest - 1].normalAnim, true);
    this.showQuestion();
  };
  _ctor.prototype.showQuestion = function () {
    var e = this;
    if (!this.isGameOver) {
      this.curSelectCount = 0;
      for (var t = 0; t < this.goodsNodeList.length; t++) {
        this.goodsNodeList[t] && (this.goodsNodeList[t].active = false);
      }
      this.boxNode.opacity = 255;
      r_TimeSystem.TimeSystem.scheduleOnce("showQueset", .5, function () {
        e.showRoleAnim(e.roleNode, v[e.curQuest - 1].normalAnim, true);
        e.showBoxNodeAnim(true, function () {
          e.showRoleQiPao("这个要不要？", "这个要不要？");
          e.showSelectBtnGroup();
        });
      });
    }
  };
  _ctor.prototype.showBoxNodeAnim = function (e, t) {
    var o = this;
    undefined === e && (e = true);
    cc.Tween.stopAllByTarget(this.boxNode);
    this.boxNode.active = true;
    this.boxNode.opacity = 255;
    var i = this.boxNodeInitPos.x;
    if (e) {
      this.boxNode.x = this.boxNodeInitPos.x + 1e3;
      i = this.boxNodeInitPos.x;
    } else {
      this.btnTip.active = false;
      i = this.boxTargetPos.x;
      this.roleQipao.parent.opacity = 0;
      this.hideAllBlockGoods();
      this.goodsNodeList[this.curQuest - 1].active = true;
    }
    cc.tween(this.boxNode).to(.5, {
      x: i
    }).delay(.2).call(function () {
      t && t();
      e && o.goodsNodeList[o.curQuest - 1] && (o.goodsNodeList[o.curQuest - 1].active = true);
    }).start();
  };
  _ctor.prototype.showSelectBtnGroup = function () {
    if (0 == this.curSelectCount) {
      this.btnYes1.active = true;
      this.btnYes2.active = false;
      this.btnTip.active = true;
    } else {
      this.btnYes1.active = false;
      this.btnYes2.active = true;
    }
  };
  _ctor.prototype.showBtnGet = function (e) {
    this.btnGet.active = e;
    this.btnYes1.active = false;
    this.btnYes2.active = false;
  };
  _ctor.prototype.showRoleAnim = function (e, t, o) {
    undefined === o && (o = true);
    var i = e.getComponent(sp.Skeleton);
    i.paused = false;
    i.timeScale = 1;
    t = this.isPiKu ? this.isSiWa ? "nv1_" + t + "2" : "nv1_" + t : this.isSiWa ? "nv2_" + t + "2" : "nv2_" + t;
    console.log("人物动画 ", t);
    i.setAnimation(0, t, o);
  };
  _ctor.prototype.showRoleQiPao = function (e, t, o) {
    r_SoundMgr.SoundMgr.stopAllSound();
    r_SoundMgr.SoundMgr.playSound("yesOrNo/" + t);
    this.roleQipao.opacity = 255;
    this.roleQipao.parent.opacity = 255;
    this.roleQipao.getChildByName("label").getComponent(cc.Label).string = e;
    cc.Tween.stopAllByTarget(this.roleQipao);
    cc.tween(this.roleQipao).delay(.1).call(function () {
      o && o();
    }).start();
  };
  _ctor.prototype.showHert = function () {
    if (this.errorCount >= 3) {
      this.btnTip.active = false;
      this.isGameOver = true;
      r_TimeSystem.TimeSystem.scheduleOnce("resultFail", 2, function () {
        r_YesOrNoResult.YesOrNoResult.showUI();
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
  _ctor.prototype.showGameOver = function () {
    this.deskNode.active = false;
    this.boxNode.active = false;
    this.btnGet.active = false;
    this.btnYes1.active = false;
    this.btnYes2.active = false;
    this.isGameOver = true;
    r_TimeSystem.TimeSystem.scheduleOnce("resultSuccess", 3, function () {
      r_YesOrNoResult.YesOrNoResult.showUI({
        mode: 1
      });
    });
  };
  _ctor.prototype.onClickYes = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    this.curSelectCount += 1;
    this.btnYes1.active = false;
    this.btnYes2.active = false;
    if (this.curSelectCount >= v[this.curQuest - 1].yesAnim.length) {
      if (1 != this.selectTrueList[this.curQuest - 1]) {
        this.errorCount += 1;
        this.showHert();
      }
      this.showBoxNodeAnim(false, function () {
        e.showRoleQiPao(v[e.curQuest - 1].desc[0], v[e.curQuest - 1].soundName[0]);
        e.showBtnGet(true);
        e.showRoleAnim(e.roleNode, v[e.curQuest - 1].yesAnim[e.curSelectCount - 1], true);
        if (5 == e.curQuest) {
          if (r_PlayerData.PlayerData.isCoinEnough(1e6)) {
            r_PlayerData.PlayerData.deleteCoin("要不要", 1e6);
          } else {
            r_PlayerData.PlayerData.deleteCoin("要不要", r_PlayerData.PlayerData.bigCoin);
          }
        }
      });
    } else {
      this.showSelectBtnGroup();
      this.showRoleQiPao("真的要吗？", "真的要吗？");
      this.showRoleAnim(this.roleNode, v[this.curQuest - 1].yesAnim[this.curSelectCount - 1], true);
    }
  };
  _ctor.prototype.onClickNo = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    this.btnYes1.active = false;
    this.btnYes2.active = false;
    this.showRoleAnim(this.roleNode, v[this.curQuest - 1].noAnim[this.curSelectCount], true);
    this.curSelectCount += 1;
    if (this.curSelectCount >= v[this.curQuest - 1].yesAnim.length) {
      this.showBtnGet(false);
      this.showBoxNodeAnim(false, function () {
        e.showRoleQiPao(v[e.curQuest - 1].desc[1], v[e.curQuest - 1].soundName[1]);
        if (!(1 == e.selectTrueList[e.curQuest - 1] && (e.errorCount += 1, e.showHert(), e.errorCount >= 3))) {
          if (e.curQuest >= 6) {
            e.showGameOver();
          } else {
            e.btnNext.active = true;
          }
        }
      });
    } else {
      this.showSelectBtnGroup();
      this.showRoleQiPao("真的不要吗？", "真的不要吗？");
    }
  };
  _ctor.prototype.onClickGet = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    1 == this.curQuest && this.curMove <= 0 && r_PlayerData.PlayerData.addCoin("要不要", 50);
    if (4 == this.curQuest) {
      this.isPiKu = true;
    } else {
      6 == this.curQuest && (this.isSiWa = true);
    }
    this.showRoleAnim(this.roleNode, v[this.curQuest - 1].yesAnim[this.curSelectCount - 1], true);
    for (var e = 0; e < this.goodsNodeList.length; e++) {
      this.goodsNodeList[e] && (this.goodsNodeList[e].active = false);
    }
    if (this.curQuest >= 6) {
      this.showGameOver();
      this.showBtnGet(false);
    } else {
      this.curQuest += 1;
      this.showBtnGet(false);
      this.showQuestion();
    }
  };
  _ctor.prototype.onClickNext = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    this.btnNext.active = false;
    this.curQuest += 1;
    this.showQuestion();
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
  _ctor.prototype.checkVideoIsFinish = function () {
    for (var e = 0; e < this.gameTips.length; e++) {
      if (this.gameTips[e].keyList.length > 0 && !r_CheckHasKeys.checkHasKeys(this.gameTips[e].keyList) && this.gameTips[e].isGet) {
        this.gameTips[e].isGet = false;
        this.showBtnTipState(true);
      }
    }
  };
  _ctor.prototype.showBlockGoods = function (e) {
    this.hideAllBlockGoods();
    for (var t = 0; t < this.goodsBlockNodeList.length; t++) {
      if (this.goodsBlockNodeList[t] && e - 1 == t) {
        this.goodsBlockNodeList[t].active = true;
        this.goodsNodeList[t].active = false;
      }
    }
  };
  _ctor.prototype.hideAllBlockGoods = function () {
    for (var e = 0; e < this.goodsBlockNodeList.length; e++) {
      this.goodsBlockNodeList[e] && (this.goodsBlockNodeList[e].active = false);
    }
  };
  _ctor.prototype.showBtnTipState = function (e) {
    undefined === e && (e = true);
    this.btnTip.getChildByName("video").active = e;
    this.btnTip.getChildByName("noVideo").active = !e;
  };
  _ctor.prototype.onClickTip = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("要不要提示", function () {
      e.btnTip.active = false;
      e.boxNode.opacity = 125;
      e.showBlockGoods(e.curQuest);
    });
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.touchStartPos = e.getLocation();
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.startID = e.getID();
      this.moveInfo = {};
      r_UtilsSystem.UtilsSystem.touchInNode(this.boxNode, this.touchStartPos) || this.goldBrick.active && !this.btnNext.active && r_UtilsSystem.UtilsSystem.touchInNode(this.goldBrick, this.touchStartPos) && this.curMove < 2 && (this.moveInfo.node = this.goldBrick, this.moveInfo.mirrorOriginPos = this.goldBrick.getPosition());
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else if (this.moveInfo && this.moveInfo.node) {
      var t = e.getLocation().subtract(this.touchStartPos);
      var o = this.touchStartPos.add(t);
      var i = this.moveInfo.node.parent.convertToNodeSpaceAR(o);
      i.y = this.boxNodeInitPos.y;
      i.x > this.boxNodeInitPos.x && this.moveInfo.node.setPosition(i);
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    var e = this;
    this.startID = null;
    if (this.moveInfo && this.moveInfo.node && this.moveInfo.node.x - this.boxNodeInitPos.x > 50) {
      this.goldBrick.active = false;
      this.boxNode.active = false;
      this.showBtnGet(false);
      this.showGoldBrickAnim();
      r_TimeSystem.TimeSystem.scheduleOnce("goldBrick", 1.5, function () {
        e.goldBrick.active = true;
        e.goldBrick.setPosition(e.boxNodeInitPos);
        e.goldBrickAnim.active = false;
        e.boxNode.active = true;
        e.curMove += 1;
        r_PlayerData.PlayerData.addCoin("要不要", 5e5);
        e.showBtnGet(true);
      });
    }
  };
  _ctor.prototype.onTouchCancel = function () {
    this.startID = null;
    this.moveInfo = null;
    this.moveInfo && this.moveInfo.node && this.moveInfo.node.setPosition(this.moveInfo.mirrorOriginPos);
  };
  _ctor.prototype.showGoldBrickAnim = function () {
    this.goldBrickAnim.active = true;
    this.goldBrickAnim.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "桌子节点"
  })], _ctor.prototype, "deskNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "人物"
  })], _ctor.prototype, "roleNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "人物气泡"
  })], _ctor.prototype, "roleQipao", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "纸箱子"
  })], _ctor.prototype, "boxNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "纸箱子移动位置"
  })], _ctor.prototype, "boxTargetPos", undefined);
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
    displayName: "金砖"
  })], _ctor.prototype, "goldBrick", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "金砖动画"
  })], _ctor.prototype, "goldBrickAnim", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "问题物品列表"
  })], _ctor.prototype, "goodsNodeList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "问题物品（透视）列表"
  })], _ctor.prototype, "goodsBlockNodeList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示按钮"
  })], _ctor.prototype, "btnTip", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "下一题"
  })], _ctor.prototype, "btnNext", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "收下按钮"
  })], _ctor.prototype, "btnGet", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "第一组按钮"
  })], _ctor.prototype, "btnYes1", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "第二组按钮"
  })], _ctor.prototype, "btnYes2", undefined);
  __decorate([_property({
    type: [C],
    tooltip: "提示列表"
  })], _ctor.prototype, "gameTips", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_YesOrNoLogic;