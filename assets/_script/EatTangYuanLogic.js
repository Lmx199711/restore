var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TimeSystem = require("TimeSystem");
var r_LevelPreload = require("LevelPreload");
var r_PlayerData = require("PlayerData");
var r_SoundMgr = require("SoundMgr");
var r_EatTangYuanResult = require("EatTangYuanResult");
var r_EatTangYuanUI = require("EatTangYuanUI");
var r_ReportSystem = require("ReportSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var C = [{
  id: 1,
  name: "草莓汤圆",
  normalAnim: "step_1",
  yesAnim: ["step_4", "step_3"],
  noAnim: ["step_7", "step_6"],
  myAnim: "step_3",
  desc: ["真好吃", "哼，你是不是不爱我了"],
  soundName: ["真好吃（女）", "你是不是不爱我了（女）"]
}, {
  id: 2,
  name: "榴莲汤圆",
  normalAnim: "step_7",
  yesAnim: ["step_4", "step_6"],
  noAnim: ["step_7", "step_6"],
  myAnim: "step_4",
  desc: ["真好吃", "好吃吗？"],
  soundName: ["真好吃（女）", "好吃吗（女）"]
}, {
  id: 3,
  name: "鞭炮汤圆",
  normalAnim: "step_7",
  yesAnim: ["step_4", "step_6"],
  noAnim: ["step_7", "step_5"],
  myAnim: "step_5",
  desc: ["汤圆还会爆炸？", "可能不小心包错了"],
  soundName: ["汤圆还会爆炸（女）", "可能不小心包错了（女）"]
}, {
  id: 4,
  name: "丝袜汤圆",
  normalAnim: "step_2",
  yesAnim: ["step_4", "step_6"],
  noAnim: ["step_7", "step_2"],
  myAnim: "step_3",
  desc: ["讨厌，等会再换给你看", "你穿这也挺好看嘛，哈哈"],
  soundName: ["讨厌，等会再换给你看", "你穿着也挺好看嘛（女）"]
}, {
  id: 5,
  name: "硬币汤圆",
  normalAnim: "step_7",
  yesAnim: ["step_7", "step_3"],
  noAnim: ["step_4", "step_6"],
  myAnim: "step_3",
  desc: ["幸运币被我吃到啦", "你吃了幸运币，奖励你一点零花钱"],
  soundName: ["幸运币被我吃到了（女）", "你吃到了幸运币（女）"]
}, {
  id: 6,
  name: "辣椒汤圆",
  normalAnim: "step_2",
  yesAnim: ["step_7", "step_6"],
  noAnim: ["step_4", "step_8"],
  myAnim: "step_6",
  desc: ["太辣了换个衣服", "不小心包了辣椒"],
  soundName: ["太辣了，换个衣服（女）", "不小心包了辣椒（女）"]
}];
var def_EatTangYuanLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.deskNode = null;
    t.roleNode = null;
    t.roleQipao = null;
    t.roleNode1 = null;
    t.bowlNode1 = null;
    t.bowlNode2 = null;
    t.manNode = null;
    t.dogNode = null;
    t.redPacketNode = null;
    t.flyRedPacketNode = null;
    t.flyRedPacketTarget = null;
    t.heartNode = null;
    t.heartTipNode = null;
    t.heartTipTargetPos = null;
    t.heartTipLabel = null;
    t.tiangyuanNode = null;
    t.tiangyuanTarget = null;
    t.tiangyuanBigNode = null;
    t.tianYuanNodeList = [];
    t.tyGoodsSpriteFrameList = [];
    t.tyBigSpriteFrameList = [];
    t.tyBig2SpriteFrameList = [];
    t.btnTip = null;
    t.btnYes1 = null;
    t.btnYes2 = null;
    t.tianYuanNodePosList = [];
    t.curQuest = 1;
    t.curSelectCount = 0;
    t.selectTrueList = [1, 2, 3, 2, 1, 2];
    t.errorCount = 0;
    t.curMove = 0;
    t.isSiWa = false;
    t.isPiKu = false;
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
    for (var e = 0; e < this.tianYuanNodeList.length; e++) {
      this.tianYuanNodePosList[e] = new cc.Vec2(this.tianYuanNodeList[e].x, this.tianYuanNodeList[e].y);
    }
    this.randmonGoodsNodePos();
    this.curQuest = 1;
  };
  _ctor.prototype.randmonGoodsNodePos = function () {
    r_UtilsSystem.UtilsSystem.shuffle(this.tianYuanNodePosList);
    for (var e = 0; e < this.tianYuanNodeList.length; e++) {
      this.tianYuanNodeList[e].x = this.tianYuanNodePosList[e].x;
      this.tianYuanNodeList[e].y = this.tianYuanNodePosList[e].y;
    }
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
  };
  _ctor.prototype.startGame = function () {
    this.showRoleAnim(this.roleNode, C[this.curQuest - 1].normalAnim, true);
    this.showQuestion();
  };
  _ctor.prototype.showQuestion = function () {
    var e = this;
    if (!this.isGameOver) {
      this.curSelectCount = 0;
      this.showTiangyuanNode(false);
      this.showBtnTipState(true);
      this.showSpineAnim(this.dogNode, "step_1", "", true);
      r_TimeSystem.TimeSystem.scheduleOnce("showQueset", .5, function () {
        e.showRoleAnim(e.roleNode, "step_10_1", false, function () {
          e.showRoleAnim(e.roleNode, C[e.curQuest - 1].normalAnim, true);
          e.showRoleQiPao("这个你吃还是我吃？", "这个你吃还是我吃（女）");
          e.showSelectBtnGroup();
        });
      });
      r_TimeSystem.TimeSystem.scheduleOnce("showQueset2", 1.2, function () {
        e.showTiangyuanNode(true);
        e.tianYuanNodeList[e.curQuest - 1].active = false;
      });
    }
  };
  _ctor.prototype.showTiangyuanNode = function (e, t) {
    undefined === e && (e = true);
    undefined === t && (t = false);
    this.tiangyuanNode.active = e;
    this.tiangyuanNode.getChildByName("goods").getComponent(cc.Sprite).spriteFrame = this.tyGoodsSpriteFrameList[this.curQuest - 1];
    var o = this.tiangyuanNode.getChildByName("不透明");
    o.getComponent(cc.Sprite).spriteFrame = this.tyBigSpriteFrameList[this.curQuest - 1];
    o.active = true;
    var i = this.tiangyuanNode.getChildByName("透明");
    i.getComponent(cc.Sprite).spriteFrame = this.tyBig2SpriteFrameList[this.curQuest - 1];
    i.active = false;
    if (t) {
      o.active = false;
      i.active = true;
    }
  };
  _ctor.prototype.showTiangyuanBigNode = function (e) {
    var t = this;
    undefined === e && (e = true);
    if (!e) {
      this.tiangyuanBigNode.scale = 0;
      return void cc.Tween.stopAllByTarget(this.tiangyuanBigNode);
    }
    this.tiangyuanBigNode.active = true;
    var o = this.tiangyuanBigNode.getChildByName("放大汤圆");
    o.getChildByName("goods").getComponent(cc.Sprite).spriteFrame = this.tyGoodsSpriteFrameList[this.curQuest - 1];
    var i = o.getChildByName("透明");
    i.getComponent(cc.Sprite).spriteFrame = this.tyBig2SpriteFrameList[this.curQuest - 1];
    i.active = true;
    this.tiangyuanBigNode.scale = 0;
    cc.Tween.stopAllByTarget(this.tiangyuanBigNode);
    cc.tween(this.tiangyuanBigNode).to(.3, {
      scale: 1
    }).delay(2).to(.1, {
      scale: 0
    }).call(function () {
      t.tiangyuanBigNode.scale = 0;
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
  _ctor.prototype.showBtnGet = function () {
    this.btnTip.active = false;
    this.btnYes1.active = false;
    this.btnYes2.active = false;
  };
  _ctor.prototype.showRoleAnim = function (e, t, o, i) {
    undefined === o && (o = true);
    e.active = true;
    var n = e.getComponent(sp.Skeleton);
    n.paused = false;
    n.timeScale = 1;
    this.isSiWa && n.setSkin("siwa");
    console.log("人物动画 ", t);
    var a = n.setAnimation(0, t, o);
    o || n.setTrackCompleteListener(a, function () {
      i && i();
    });
  };
  _ctor.prototype.showSpineAnim = function (e, t, o, i, n) {
    undefined === o && (o = "");
    undefined === i && (i = true);
    e.active = true;
    var a = e.getComponent(sp.Skeleton);
    a.paused = false;
    a.timeScale = 1;
    if (o.length > 0) {
      a.setSkin(o);
    } else {
      a.setSkin("default");
    }
    console.log("人物动画 ", t);
    var s = a.setAnimation(0, t, i);
    i || a.setTrackCompleteListener(s, function () {
      n && n();
    });
  };
  _ctor.prototype.showRoleQiPao = function (e, t, o) {
    r_SoundMgr.SoundMgr.stopAllSound();
    r_SoundMgr.SoundMgr.playSound("eatTangYuan/" + t);
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
        r_EatTangYuanResult.EatTangYuanResult.showUI();
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
    this.roleNode.active = false;
    this.bowlNode1.active = false;
    this.bowlNode2.active = false;
    this.roleNode1.active = true;
    if (this.isPiKu) {
      this.showRoleAnim(this.roleNode1, "step_12", true, function () {});
    } else {
      this.showRoleAnim(this.roleNode1, "step_1", true, function () {});
    }
    this.btnTip.active = false;
    this.btnYes1.active = false;
    this.btnYes2.active = false;
    this.isGameOver = true;
    r_TimeSystem.TimeSystem.scheduleOnce("resultSuccess", 3, function () {
      r_EatTangYuanResult.EatTangYuanResult.showUI({
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
    this.showTiangyuanBigNode(false);
    if (this.curSelectCount >= C[this.curQuest - 1].yesAnim.length) {
      this.btnTip.active = false;
      this.showRoleAnim(this.roleNode, "step_10_3", false, function () {
        e.showTiangyuanNode(false);
        e.showRoleQiPao(C[e.curQuest - 1].desc[1], C[e.curQuest - 1].soundName[1]);
        e.showRoleAnim(e.roleNode, C[e.curQuest - 1].yesAnim[e.curSelectCount - 1], true);
        e.showBtnGet();
        if (4 == e.curQuest) {
          e.showSpineAnim(e.manNode, C[e.curQuest - 1].myAnim, "jiao", false, function () {
            e.manNode.active = false;
          });
        } else {
          e.showSpineAnim(e.manNode, C[e.curQuest - 1].myAnim, "", false, function () {
            e.manNode.active = false;
          });
        }
        if (!((1 != e.selectTrueList[e.curQuest - 1] || 3 == e.selectTrueList[e.curQuest - 1]) && (3 == e.curQuest ? (e.errorCount += 3, r_SoundMgr.SoundMgr.playSound("eatTangYuan/爆炸（吃到鞭炮）通用")) : e.errorCount += 1, e.showHert(), e.errorCount >= 3))) {
          if (e.curQuest >= 6) {
            e.showGameOver();
          } else if (1 == e.curQuest) {
            r_SoundMgr.SoundMgr.playSound("eatTangYuan/生气（女）");
          } else if (5 == e.curQuest) {
            r_PlayerData.PlayerData.addCoin("吃汤圆", 1e6);
            r_SoundMgr.SoundMgr.playSound("eatTangYuan/生气（女）");
          } else {
            3 == e.curQuest && r_SoundMgr.SoundMgr.playSound("eatTangYuan/爆炸（吃到鞭炮）通用");
          }
        }
      });
      r_TimeSystem.TimeSystem.scheduleOnce("NextQuest", 2, function () {
        e.curQuest += 1;
        e.showQuestion();
      });
    } else {
      this.showSelectBtnGroup();
      this.showRoleQiPao("你真的不给我吃吗？", "你真的不给我吃吗");
      this.showRoleAnim(this.roleNode, C[this.curQuest - 1].yesAnim[this.curSelectCount - 1], true);
    }
  };
  _ctor.prototype.onClickNo = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    this.btnYes1.active = false;
    this.btnYes2.active = false;
    this.curSelectCount += 1;
    this.showTiangyuanBigNode(false);
    if (this.curSelectCount >= C[this.curQuest - 1].yesAnim.length) {
      this.btnTip.active = false;
      this.showBtnGet();
      this.showRoleAnim(this.roleNode, "step_10_4", false);
      r_TimeSystem.TimeSystem.scheduleOnce("NextQuest111", .5, function () {
        e.showTiangyuanNode(false);
        e.showRoleAnim(e.roleNode, "step_9", false, function () {
          e.showRoleQiPao(C[e.curQuest - 1].desc[0], C[e.curQuest - 1].soundName[0]);
          e.showRoleAnim(e.roleNode, C[e.curQuest - 1].noAnim[e.curSelectCount - 1], true);
          if (!((2 != e.selectTrueList[e.curQuest - 1] || 3 == e.selectTrueList[e.curQuest - 1]) && (3 == e.curQuest ? (e.errorCount += 3, r_SoundMgr.SoundMgr.playSound("eatTangYuan/爆炸（吃到鞭炮）通用")) : e.errorCount += 1, e.showHert(), e.errorCount >= 3))) {
            if (e.curQuest >= 6) {
              e.isPiKu = true;
              e.showGameOver();
            } else if (3 == e.curQuest) {
              r_SoundMgr.SoundMgr.playSound("eatTangYuan/爆炸（吃到鞭炮）通用");
            } else {
              4 == e.curQuest && (e.isSiWa = true);
            }
          }
        });
      });
      r_TimeSystem.TimeSystem.scheduleOnce("NextQuest", 3, function () {
        e.curQuest += 1;
        e.showQuestion();
      });
    } else {
      this.showSelectBtnGroup();
      this.showRoleQiPao("你真的不吃吗？", "你真的不吃吗");
      this.showRoleAnim(this.roleNode, C[this.curQuest - 1].noAnim[this.curSelectCount - 1], true);
    }
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
  _ctor.prototype.showBtnTipState = function (e) {
    undefined === e && (e = true);
    this.btnTip.getChildByName("video").active = e;
    this.btnTip.getChildByName("noVideo").active = !e;
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    if (this.btnTip.getChildByName("video").active) {
      r_PlatformSystem.PlatformSystem.showVideo("吃汤圆提示", function () {
        e.showBtnTipState(false);
        e.showTiangyuanNode(true, true);
        e.showTiangyuanBigNode();
      });
    } else {
      this.showBtnTipState(false);
      this.showTiangyuanNode(true, true);
      this.showTiangyuanBigNode();
    }
  };
  _ctor.prototype.showRedPacketFly = function (e) {
    var t = cc.instantiate(this.flyRedPacketNode);
    var o = cc.instantiate(this.flyRedPacketNode);
    var i = cc.instantiate(this.flyRedPacketNode);
    t.opacity = 255;
    o.opacity = 255;
    i.opacity = 255;
    t.x = this.flyRedPacketNode.x;
    t.y = this.flyRedPacketNode.y;
    this.flyRedPacketNode.parent.addChild(t);
    o.x = this.flyRedPacketNode.x;
    o.y = this.flyRedPacketNode.y;
    this.flyRedPacketNode.parent.addChild(o);
    i.x = this.flyRedPacketNode.x;
    i.y = this.flyRedPacketNode.y;
    this.flyRedPacketNode.parent.addChild(i);
    cc.tween(t).to(.5, {
      x: this.flyRedPacketTarget.x,
      y: this.flyRedPacketTarget.y
    }).call(function () {
      t.destroy();
      e && e();
    }).start();
    cc.tween(o).delay(.1).to(.5, {
      x: this.flyRedPacketTarget.x,
      y: this.flyRedPacketTarget.y
    }).call(function () {
      o.destroy();
    }).start();
    cc.tween(i).delay(.2).to(.5, {
      x: this.flyRedPacketTarget.x,
      y: this.flyRedPacketTarget.y
    }).call(function () {
      i.destroy();
    }).start();
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.touchStartPos = e.getLocation();
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.startID = e.getID();
      this.moveInfo = {};
      if (this.tiangyuanNode.active && r_UtilsSystem.UtilsSystem.touchInNode(this.tiangyuanNode, this.touchStartPos)) {
        this.moveInfo.node = this.tiangyuanNode;
        this.moveInfo.mirrorOriginPos = this.tiangyuanNode.getPosition();
      }
      this.redPacketNode.active && r_UtilsSystem.UtilsSystem.touchInNode(this.redPacketNode, this.touchStartPos) && this.showRedPacketFly(function () {
        r_EatTangYuanUI.EatTangYuanUI.Inst && r_EatTangYuanUI.EatTangYuanUI.Inst.showAddMoneyTip("+" + r_UtilsSystem.UtilsSystem.numFormats(1e5));
        r_PlayerData.PlayerData.addCoin("吃汤圆", 1e5, r_ReportSystem.SystemKey.None, false, true);
      });
      this.tiangyuanBigNode.active && r_UtilsSystem.UtilsSystem.touchInNode(this.tiangyuanBigNode, this.touchStartPos) && this.showTiangyuanBigNode(false);
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else if (this.moveInfo && this.moveInfo.node) {
      var t = e.getLocation().subtract(this.touchStartPos);
      var o = this.touchStartPos.add(t);
      var i = this.moveInfo.node.parent.convertToNodeSpaceAR(o);
      this.moveInfo.node.setPosition(i);
    }
  };
  _ctor.prototype.onTouchEnd = function (e) {
    var t = this;
    this.startID = null;
    var o = e.getLocation();
    if (this.moveInfo && this.moveInfo.node && r_UtilsSystem.UtilsSystem.touchInNode(this.tiangyuanTarget, o)) {
      if (this.curQuest > 3) {
        this.moveInfo.node.setPosition(this.moveInfo.mirrorOriginPos);
        this.showSpineAnim(this.dogNode, "step_5", "", true);
      } else {
        this.showTiangyuanNode(false);
        this.showBtnGet();
        var i = 2;
        this.moveInfo.node.setPosition(this.moveInfo.mirrorOriginPos);
        if (1 == this.curQuest) {
          this.showSpineAnim(this.dogNode, "step_2", "", true);
          this.errorCount += 1;
          this.showHert();
        } else if (2 == this.curQuest) {
          i = 10;
          this.showSpineAnim(this.dogNode, "step_3", "", false);
          r_TimeSystem.TimeSystem.scheduleOnce("redPacketNode", 1, function () {
            t.redPacketNode.active = true;
          });
          this.showRoleQiPao("狗子好像不太喜欢吃", "狗子好像不太喜欢吃（女）");
        } else if (3 == this.curQuest) {
          this.showSpineAnim(this.dogNode, "step_4", "", true);
          r_SoundMgr.SoundMgr.playSound("eatTangYuan/爆炸（吃到鞭炮）通用");
        }
        r_TimeSystem.TimeSystem.scheduleOnce("NextQuest", i, function () {
          t.curQuest += 1;
          t.showQuestion();
          t.redPacketNode.active = false;
        });
      }
    } else {
      this.moveInfo && this.moveInfo.node && this.moveInfo.node.setPosition(this.moveInfo.mirrorOriginPos);
    }
  };
  _ctor.prototype.onTouchCancel = function () {
    this.startID = null;
    this.moveInfo = null;
    this.moveInfo && this.moveInfo.node && this.moveInfo.node.setPosition(this.moveInfo.mirrorOriginPos);
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
    displayName: "人物1(最后长腿)"
  })], _ctor.prototype, "roleNode1", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "碗前"
  })], _ctor.prototype, "bowlNode1", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "碗后"
  })], _ctor.prototype, "bowlNode2", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "男主人物"
  })], _ctor.prototype, "manNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "小狗"
  })], _ctor.prototype, "dogNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "红包"
  })], _ctor.prototype, "redPacketNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "飞动画红包"
  })], _ctor.prototype, "flyRedPacketNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "飞动画红包目标位置"
  })], _ctor.prototype, "flyRedPacketTarget", undefined);
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
    displayName: "勺子里边的汤圆"
  })], _ctor.prototype, "tiangyuanNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "勺子里边的汤圆目标位置"
  })], _ctor.prototype, "tiangyuanTarget", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击透视放大的汤圆"
  })], _ctor.prototype, "tiangyuanBigNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "汤圆物品列表"
  })], _ctor.prototype, "tianYuanNodeList", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "汤圆里边物品精灵帧"
  })], _ctor.prototype, "tyGoodsSpriteFrameList", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "勺子汤圆不透明精灵帧"
  })], _ctor.prototype, "tyBigSpriteFrameList", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "勺子半透明汤圆精灵帧"
  })], _ctor.prototype, "tyBig2SpriteFrameList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示按钮"
  })], _ctor.prototype, "btnTip", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "第一组按钮"
  })], _ctor.prototype, "btnYes1", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "第二组按钮"
  })], _ctor.prototype, "btnYes2", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_EatTangYuanLogic;