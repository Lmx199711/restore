var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_Index = require("Index");
var r_TimeSystem = require("TimeSystem");
var r_LevelPreload = require("LevelPreload");
var r_PlayerData = require("PlayerData");
var r_SoundMgr = require("SoundMgr");
var r_DrawAndGuessResult = require("DrawAndGuessResult");
var r_DrawAndGuessTip = require("DrawAndGuessTip");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var C = [{
  id: 1,
  name: "夸父逐日",
  zi: "老|汉|开|车|夸|父|逐|日|眼|瞎|宝|马|猛|男|太|阳|超|速|行|驶|大|阴|落|山",
  picAnim: "tu_2",
  normalAnim: "step_1",
  firstAnim: ["step_4", "step_3"],
  firstQipao: ["你真有眼光", "再给你一次机会"],
  secondAnim: ["step_4", "step_5"],
  secondQipao: ["你真有眼光，画得好吧", "重新猜"]
}, {
  id: 2,
  name: "一山不容二虎",
  zi: "一|山|不|容|二|虎|武|松|打|夜|晚|被|美|女|生|气|骑|老|兽|猛|下|着|图|晚",
  picAnim: "tu_8",
  normalAnim: "step_1",
  firstAnim: ["step_4", "step_3"],
  firstQipao: ["你真有眼光", "再给你一次机会"],
  secondAnim: ["step_4", "step_5"],
  secondQipao: ["你真有眼光，画得好吧", "重新猜"]
}, {
  id: 3,
  name: "女娲补天",
  zi: "女|娲|补|天|电|焊|美|吕|嫦|娥|奔|月|做|雾|一|样|白|云|里|面|梦|雨|仙|境",
  picAnim: "tu_6",
  normalAnim: "step_1",
  firstAnim: ["step_4", "step_3"],
  firstQipao: ["你真有眼光", "再给你一次机会"],
  secondAnim: ["step_4", "step_5"],
  secondQipao: ["你真有眼光，画得好吧", "重新猜"]
}, {
  id: 4,
  name: "坐山观虎斗",
  zi: "坐|山|观|虎|斗|老|打|麻|将|相|亲|爱|一|家|人|望|远|镜|自|摸|清|牌|色|胡",
  picAnim: "tu_4",
  normalAnim: "step_1",
  firstAnim: ["step_4", "step_3"],
  firstQipao: ["你真有眼光", "再给你一次机会"],
  secondAnim: ["step_4", "step_5"],
  secondQipao: ["你真有眼光，画得好吧", "重新猜"]
}];
var S = {
  maxYesNum: 3,
  caidan: 1e6,
  caidanSay: ["给你个红包不许说出去", "再给你加一个", "这总够了吧", "不要算了"]
};
var def_DrawAndGuessLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.roleNode = null;
    t.roleQipao = null;
    t.picTrueBg = null;
    t.picTrueNode = null;
    t.picBadNode = null;
    t.pictrueNodeAnim = null;
    t.boyNode = null;
    t.anserParent = null;
    t.diNode = null;
    t.di2Node = null;
    t.selectParent = null;
    t.trueOrErrorAnim = null;
    t.heartNode = null;
    t.heartTipNode = null;
    t.heartTipTargetPos = null;
    t.heartTipLabel = null;
    t.btnOpen = null;
    t.btnTip = null;
    t.btnNext = null;
    t.btnGroup = null;
    t.picSpriteFrame = [];
    t.m_curQuest = 1;
    t.m_curSelectCount = 0;
    t.m_errorCount = 0;
    t.m_sayNoCount = 1;
    t.m_anserNodeList = [];
    t.m_selectNodeList = [];
    t.m_anserList = [];
    t.m_canClick = false;
    t.m_isCandan = false;
    t.m_isGameOver = false;
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
    this.m_picNodeAnimInitPos = new cc.Vec2(this.pictrueNodeAnim.x, this.pictrueNodeAnim.y);
    this.m_picNodeInitPos = new cc.Vec2(this.picTrueNode.x, this.picTrueNode.y);
    this.m_curQuest = 1;
    for (var e = 0; e < 6; e++) {
      (t = {}).node = this.anserParent.getChildByName("anser" + (e + 1));
      t.node.scale = 0;
      t.isFinish = false;
      t.value = "";
      this.m_anserNodeList[e] = t;
    }
    for (e = 0; e < 24; e++) {
      var t;
      (t = {}).node = this.selectParent.getChildByName("zi" + (e + 1));
      t.node.scale = 0;
      t.isFinish = false;
      t.value = "";
      this.m_selectNodeList[e] = t;
    }
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
  };
  _ctor.prototype.startGame = function () {
    this.btnTip.active = false;
    this.showNodeSpineAnim(this.roleNode, C[this.m_curQuest - 1].normalAnim, true);
    this.showQuestion();
  };
  _ctor.prototype.showQuestion = function () {
    var e = this;
    if (!this.m_isGameOver) {
      this.m_curSelectCount = 0;
      this.m_canClick = false;
      this.m_isCandan = false;
      this.initAnserList();
      this.di2Node.opacity = 0;
      this.diNode.opacity = 0;
      this.m_sayNoCount = 1;
      this.resetSelectNode();
      this.resetAllAnser();
      this.pictrueNodeAnim.x = -1e3;
      this.pictrueNodeAnim.active = true;
      this.showBtnTipState(true);
      this.showNodeSpineAnim(this.pictrueNodeAnim, "step_0", true);
      this.btnTip.active = false;
      cc.tween(this.pictrueNodeAnim).to(.5, {
        x: this.m_picNodeAnimInitPos.x
      }).call(function () {
        e.showAllAnserNode(true);
        e.showAllSelectNode(true);
        e.showDi1Visible();
        e.showNodeSpineAnim(e.pictrueNodeAnim, "step_1", false, C[e.m_curQuest - 1].picAnim, function () {
          e.btnOpen.active = true;
          e.showRoleQiPao("你看我画的这样图是什么意思？", "你看我画的什么");
        });
      }).start();
      r_TimeSystem.TimeSystem.scheduleOnce("dg_start", .8, function () {
        e.m_canClick = true;
        e.btnTip.active = true;
      });
    }
  };
  _ctor.prototype.initAnserList = function () {
    this.m_anserList = [];
    for (var e = 0; e < C[this.m_curQuest - 1].name.length; e++) {
      this.m_anserList.push("");
    }
  };
  _ctor.prototype.showNodeSpineAnim = function (e, t, o, i, n) {
    undefined === o && (o = true);
    e.active = true;
    var a = e.getComponent(sp.Skeleton);
    a.paused = false;
    a.timeScale = 1;
    i && a.setSkin(i);
    console.log("动画 ", t);
    var s = a.setAnimation(0, t, o);
    o || a.setTrackCompleteListener(s, function () {
      n && n();
    });
  };
  _ctor.prototype.showRoleQiPao = function (e, t, o) {
    var i = this;
    r_SoundMgr.SoundMgr.stopAllSound();
    r_SoundMgr.SoundMgr.playSound("drawAndGuess/" + t);
    this.roleQipao.opacity = 255;
    this.roleQipao.parent.opacity = 255;
    this.roleQipao.getChildByName("label").getComponent(cc.Label).string = e;
    cc.Tween.stopAllByTarget(this.roleQipao);
    cc.tween(this.roleQipao).delay(3).call(function () {
      i.roleQipao.opacity = 0;
      o && o();
    }).start();
  };
  _ctor.prototype.resetSelectNode = function () {
    var e = C[this.m_curQuest - 1].zi.split("|");
    r_UtilsSystem.UtilsSystem.shuffle(e);
    for (var t = 0; t < this.m_selectNodeList.length; t++) {
      this.m_selectNodeList[t].node.getChildByName("label").getComponent(cc.Label).string = e[t];
      this.m_selectNodeList[t].node.scale = 0;
      this.m_selectNodeList[t].node.getChildByName("liang").active = false;
      this.m_selectNodeList[t].isFinish = false;
      this.m_selectNodeList[t].value = e[t];
    }
  };
  _ctor.prototype.showTipWordLiang = function () {
    for (var e = 0; e < this.m_selectNodeList.length; e++) {
      -1 != C[this.m_curQuest - 1].name.indexOf(this.m_selectNodeList[e].value) && (this.m_selectNodeList[e].node.getChildByName("liang").active = true);
    }
  };
  _ctor.prototype.showAllSelectNode = function (e) {
    undefined === e && (e = true);
    for (var t = 0; t < this.m_selectNodeList.length; t++) {
      if (e) {
        cc.tween(this.m_selectNodeList[t].node).to(.3, {
          scale: 1
        }).start();
      } else {
        cc.tween(this.m_selectNodeList[t].node).to(.3, {
          scale: 0
        }).start();
      }
    }
  };
  _ctor.prototype.showSelcetNode = function (e, t) {
    undefined === t && (t = true);
    if (t) {
      cc.tween(e).to(.1, {
        scale: 1
      }).start();
    } else {
      cc.tween(e).to(.1, {
        scale: 0
      }).start();
    }
  };
  _ctor.prototype.getSlectNodeIndexByValue = function (e) {
    for (var t = 0; t < this.m_selectNodeList.length; t++) {
      if (this.m_selectNodeList[t].isFinish && e == this.m_selectNodeList[t].value) {
        return t;
      }
    }
    return 0;
  };
  _ctor.prototype.resetAllAnser = function () {
    for (var e = 0; e < this.m_anserNodeList.length; e++) {
      if (e >= C[this.m_curQuest - 1].name.length) {
        this.m_anserNodeList[e].node.active = false;
      } else {
        this.m_anserNodeList[e].node.active = true;
      }
      this.m_anserNodeList[e].isFinish = false;
      this.m_anserNodeList[e].value = "";
      this.m_anserNodeList[e].node.getChildByName("label").getComponent(cc.Label).string = this.m_anserNodeList[e].value;
    }
  };
  _ctor.prototype.showAllAnserNode = function (e) {
    undefined === e && (e = true);
    for (var t = 0; t < this.m_anserNodeList.length; t++) {
      if (e) {
        cc.tween(this.m_anserNodeList[t].node).to(.3, {
          scale: 1
        }).start();
      } else {
        cc.tween(this.m_anserNodeList[t].node).to(.3, {
          scale: 0
        }).start();
      }
    }
  };
  _ctor.prototype.showAnserNode = function (e, t) {
    e.getChildByName("label").getComponent(cc.Label).string = t;
  };
  _ctor.prototype.cleanCurSelect = function () {
    this.resetSelectNode();
    this.resetAllAnser();
    this.showAllSelectNode(true);
  };
  _ctor.prototype.showErrorTip = function (e) {
    r_SoundMgr.SoundMgr.playSound("错误提示");
    var t = function (t) {
      var i = o.m_anserNodeList[t].node.getChildByName("label");
      if (0 == t) {
        cc.tween(i).to(.1, {
          color: cc.color(178, 17, 17, 255)
        }).to(.1, {
          color: cc.color(255, 255, 255, 255)
        }).union().repeat(3).call(function () {
          0 == t && e && e();
        }).start();
      } else {
        cc.tween(i).to(.1, {
          color: cc.color(178, 17, 17, 255)
        }).to(.1, {
          color: cc.color(255, 255, 255, 255)
        }).union().repeat(3).start();
      }
    };
    var o = this;
    for (var i = 0; i < this.m_anserNodeList.length; i++) {
      t(i);
    }
  };
  _ctor.prototype.showTurePic = function () {
    var e = this;
    this.showNodeSpineAnim(this.pictrueNodeAnim, "step_2", false, C[this.m_curQuest - 1].picAnim, function () {
      e.picTrueNode.active = true;
      e.picBadNode.active = true;
      e.picTrueBg.active = true;
      e.picTrueNode.setPosition(e.m_picNodeInitPos);
      e.picBadNode.setPosition(e.m_picNodeInitPos);
      e.picTrueBg.x = e.m_picNodeInitPos.x;
      e.picTrueNode.getComponent(cc.Sprite).spriteFrame = e.picSpriteFrame[2 * (e.m_curQuest - 1)];
      e.picBadNode.getComponent(cc.Sprite).spriteFrame = e.picSpriteFrame[2 * (e.m_curQuest - 1) + 1];
      e.pictrueNodeAnim.active = false;
    });
  };
  _ctor.prototype.showDi1Visible = function () {
    this.di2Node.active = false;
    this.diNode.active = true;
    cc.tween(this.diNode).to(.3, {
      opacity: 255
    }).start();
  };
  _ctor.prototype.showDi2Visible = function () {
    this.diNode.active = false;
    this.di2Node.active = true;
    this.di2Node.opacity = 255;
    this.btnNext.active = false;
  };
  _ctor.prototype.showCaidan = function () {
    this.m_isCandan = true;
    this.m_canClick = false;
    this.showDi2Visible();
    this.picTrueNode.active = false;
    this.showBtnGroup(true);
    this.anserParent.active = false;
    this.showNodeSpineAnim(this.roleNode, "step_2_" + this.m_sayNoCount, true);
    this.showRoleQiPao(S.caidanSay[this.m_sayNoCount - 1], S.caidanSay[this.m_sayNoCount - 1]);
  };
  _ctor.prototype.showNextBtn = function (e) {
    undefined === e && (e = true);
    this.di2Node.active = e;
    this.diNode.active = !e;
    this.btnNext.active = e;
    this.btnGroup.active = !e;
  };
  _ctor.prototype.showBtnGroup = function (e) {
    undefined === e && (e = true);
    this.di2Node.active = e;
    this.diNode.active = !e;
    this.btnNext.active = !e;
    this.btnGroup.active = e;
  };
  _ctor.prototype.showHert = function () {
    if (this.m_errorCount >= 3) {
      this.btnTip.active = false;
      this.m_isGameOver = true;
      r_TimeSystem.TimeSystem.scheduleOnce("resultFail", 2, function () {
        r_DrawAndGuessResult.DrawAndGuessResult.showUI();
      });
    }
    for (var e = 1; e <= 3; e++) {
      if (e > this.m_errorCount) {
        this.heartNode.getChildByName("红心" + e).active = true;
      } else {
        this.heartNode.getChildByName("红心" + e).active = false;
        this.m_errorCount == e && this.showHertAnim(this.heartNode.getChildByName("红心" + e));
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
    this.m_isGameOver = true;
    r_TimeSystem.TimeSystem.scheduleOnce("resultSuccess", 1, function () {
      r_DrawAndGuessResult.DrawAndGuessResult.showUI({
        mode: 1
      });
    });
  };
  _ctor.prototype.onClickYes = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    this.m_canClick = true;
    this.showBtnGroup(false);
    this.di2Node.active = false;
    this.anserParent.active = true;
    this.showDi1Visible();
    this.showRoleQiPao("你要是敢说出去，就别怪我", "你要是敢说出去");
    this.showNodeSpineAnim(this.roleNode, C[this.m_curQuest - 1].firstAnim[1], true);
    r_PlayerData.PlayerData.addCoin("你画我猜", this.m_sayNoCount * S.caidan);
  };
  _ctor.prototype.onClickNo = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    this.m_sayNoCount += 1;
    this.showNodeSpineAnim(this.roleNode, "step_2_" + this.m_sayNoCount, true);
    this.showRoleQiPao(S.caidanSay[this.m_sayNoCount - 1], S.caidanSay[this.m_sayNoCount - 1]);
    if (this.m_sayNoCount > S.maxYesNum) {
      this.showBtnGroup(false);
      this.di2Node.active = false;
      this.anserParent.active = true;
      this.showDi1Visible();
      this.m_canClick = true;
      this.showNodeSpineAnim(this.roleNode, C[this.m_curQuest - 1].firstAnim[1], true);
    }
  };
  _ctor.prototype.onClickNext = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    this.btnNext.active = false;
    this.showAllAnserNode(false);
    this.m_curQuest += 1;
    this.trueOrErrorAnim.active = false;
    cc.tween(this.picTrueBg).to(.5, {
      x: 1500
    }).start();
    cc.tween(this.picTrueNode).to(.5, {
      x: 1500
    }).start();
    cc.tween(this.picBadNode).to(.5, {
      x: 1500
    }).call(function () {
      e.picBadNode.active = false;
      e.showQuestion();
    }).start();
  };
  _ctor.prototype.onClickOpen = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    this.btnOpen.active = false;
    this.m_curSelectCount += 1;
    this.m_canClick = true;
    this.showTurePic();
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
    var t = 0;
    this.m_isCandan && (t = 1);
    if (1 == this.btnTip.getChildByName("video").active) {
      r_PlatformSystem.PlatformSystem.showVideo("你画我猜提示", function () {
        e.showBtnTipState(false);
        e.showTipWordLiang();
        r_DrawAndGuessTip.DrawAndGuessTip.showUI({
          curQuest: e.m_curQuest,
          curSelect: t,
          anser: C[e.m_curQuest - 1].name
        });
      });
    } else {
      this.showTipWordLiang();
      r_DrawAndGuessTip.DrawAndGuessTip.showUI({
        curQuest: this.m_curQuest,
        curSelect: t,
        anser: C[this.m_curQuest - 1].name
      });
    }
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.m_touchStartPos = e.getLocation();
    if (this.m_startID && this.m_startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.m_startID = e.getID();
      this.m_moveInfo = {};
      if (!this.m_isGameOver && this.m_canClick) {
        this.onClickSelectNode();
        this.onClickAnserNode();
        if (r_UtilsSystem.UtilsSystem.touchInNode(this.picTrueNode, this.m_touchStartPos) && r_PlayerData.PlayerData.getComeInSysCount("drawAndGuess") <= 0 && (this.picTrueNode.active || this.picTrueNode.activeInHierarchy)) {
          r_Index.Platform.isMiniPlatform() && r_PlayerData.PlayerData.setComeInSysCount("drawAndGuess");
          this.m_moveInfo.node = this.picTrueNode;
          this.m_moveInfo.mirrorOriginPos = this.picBadNode.getPosition();
        }
      }
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.m_startID && this.m_startID != e.getID()) {
      e.stopPropagation();
    } else if (this.m_moveInfo && this.m_moveInfo.node) {
      var t = e.getLocation().subtract(this.m_touchStartPos);
      var o = this.m_touchStartPos.add(t);
      var i = this.m_moveInfo.node.parent.convertToNodeSpaceAR(o);
      this.m_moveInfo.node.setPosition(i);
    }
  };
  _ctor.prototype.onTouchEnd = function (e) {
    this.m_startID = null;
    var t = e.getLocation().subtract(this.m_touchStartPos).mag();
    if (this.m_moveInfo && this.m_moveInfo.node) {
      if (t > 10) {
        this.showCaidan();
      } else {
        this.m_moveInfo.node.setPosition(this.m_moveInfo.mirrorOriginPos);
      }
    }
    this.m_moveInfo = null;
  };
  _ctor.prototype.onTouchCancel = function () {
    this.m_startID = null;
    this.m_moveInfo && this.m_moveInfo.node && this.m_moveInfo.node.setPosition(this.m_moveInfo.mirrorOriginPos);
    this.m_moveInfo = null;
  };
  _ctor.prototype.onClickSelectNode = function () {
    for (var e = 0; e < this.m_selectNodeList.length; e++) {
      if (!this.m_selectNodeList[e].isFinish && r_UtilsSystem.UtilsSystem.touchInNode(this.m_selectNodeList[e].node, this.m_touchStartPos)) {
        r_SoundMgr.SoundMgr.playSound("click");
        var t = this.m_anserList.indexOf("");
        this.m_anserList[t] = this.m_selectNodeList[e].value;
        this.m_selectNodeList[e].isFinish = true;
        this.showSelcetNode(this.m_selectNodeList[e].node, false);
        this.m_anserNodeList[t].value = this.m_selectNodeList[e].value;
        this.m_anserNodeList[t].isFinish = true;
        this.showAnserNode(this.m_anserNodeList[t].node, this.m_selectNodeList[e].value);
        if (-1 == this.m_anserList.indexOf("")) {
          this.m_canClick = false;
          this.checkResult();
        }
        break;
      }
    }
  };
  _ctor.prototype.onClickAnserNode = function () {
    for (var e = 0; e < this.m_anserNodeList.length; e++) {
      if (this.m_anserNodeList[e].isFinish && !(e >= C[this.m_curQuest - 1].name.length) && "" != this.m_selectNodeList[e].value && r_UtilsSystem.UtilsSystem.touchInNode(this.m_anserNodeList[e].node, this.m_touchStartPos)) {
        r_SoundMgr.SoundMgr.playSound("click");
        var t = this.m_anserList.indexOf(this.m_anserNodeList[e].value);
        this.m_anserList[t] = "";
        this.showAnserNode(this.m_anserNodeList[e].node, "");
        var o = this.getSlectNodeIndexByValue(this.m_anserNodeList[e].value);
        this.m_anserNodeList[e].value = "";
        this.m_anserNodeList[e].isFinish = false;
        this.showSelcetNode(this.m_selectNodeList[o].node, true);
        this.m_selectNodeList[o].isFinish = false;
        break;
      }
    }
  };
  _ctor.prototype.checkResult = function () {
    var e = this;
    this.btnOpen.active = false;
    var t = .5;
    var o = "";
    for (var i = 0; i < this.m_anserList.length; i++) {
      o += this.m_anserList[i];
    }
    if (o == C[this.m_curQuest - 1].name) {
      this.showAllSelectNode(false);
      this.showDi2Visible();
      this.showNodeSpineAnim(this.trueOrErrorAnim, "step_1", false, "", function () {});
      if (1 == this.m_curSelectCount) {
        this.showNodeSpineAnim(this.roleNode, C[this.m_curQuest - 1].secondAnim[0]);
        this.showRoleQiPao(C[this.m_curQuest - 1].secondQipao[0], C[this.m_curQuest - 1].secondQipao[0]);
      } else {
        this.showNodeSpineAnim(this.roleNode, C[this.m_curQuest - 1].firstAnim[0], true);
        this.showRoleQiPao(C[this.m_curQuest - 1].firstQipao[0], C[this.m_curQuest - 1].firstQipao[0]);
        t = 1;
        this.showTurePic();
      }
      r_TimeSystem.TimeSystem.scheduleOnce("slecttrue", t, function () {
        if (e.m_curQuest >= C.length) {
          e.trueOrErrorAnim.active = false;
          e.showGameOver();
        } else {
          e.showNextBtn();
        }
      });
    } else {
      this.showNodeSpineAnim(this.trueOrErrorAnim, "step_2", false, "", function () {});
      if (1 == this.m_curSelectCount) {
        this.m_errorCount += 1;
        this.showErrorTip(function () {
          e.trueOrErrorAnim.active = false;
          e.boyNode.active = true;
          e.showNodeSpineAnim(e.boyNode, "step_1", true);
          r_SoundMgr.SoundMgr.playSound("drawAndGuess/一巴掌");
          e.showNodeSpineAnim(e.roleNode, "step_5", false, "", function () {
            e.showNodeSpineAnim(e.boyNode, "step_2", false);
          });
          e.showHert();
          e.cleanCurSelect();
          e.initAnserList();
          e.m_canClick = true;
        });
        r_TimeSystem.TimeSystem.scheduleOnce("bazhang", 1.5, function () {
          e.boyNode.active = false;
          e.showNodeSpineAnim(e.roleNode, C[e.m_curQuest - 1].firstAnim[1], true);
          e.showRoleQiPao("重新猜", "重新猜");
        });
      } else {
        this.m_curSelectCount += 1;
        this.showNodeSpineAnim(this.roleNode, C[this.m_curQuest - 1].firstAnim[1], true);
        this.showRoleQiPao(C[this.m_curQuest - 1].firstQipao[1], C[this.m_curQuest - 1].firstQipao[1]);
        this.showErrorTip(function () {
          e.trueOrErrorAnim.active = false;
          e.cleanCurSelect();
          e.initAnserList();
          e.m_canClick = true;
          e.showTurePic();
        });
      }
    }
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
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
    displayName: "画卷真/假背景"
  })], _ctor.prototype, "picTrueBg", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "画卷真"
  })], _ctor.prototype, "picTrueNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "画卷假"
  })], _ctor.prototype, "picBadNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "画卷动画"
  })], _ctor.prototype, "pictrueNodeAnim", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "男友"
  })], _ctor.prototype, "boyNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "答案节点"
  })], _ctor.prototype, "anserParent", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "底"
  })], _ctor.prototype, "diNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "底2"
  })], _ctor.prototype, "di2Node", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "选择（字）"
  })], _ctor.prototype, "selectParent", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "对错动画"
  })], _ctor.prototype, "trueOrErrorAnim", undefined);
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
    displayName: "展开按钮"
  })], _ctor.prototype, "btnOpen", undefined);
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
    displayName: "第一组按钮"
  })], _ctor.prototype, "btnGroup", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "画的精灵帧"
  })], _ctor.prototype, "picSpriteFrame", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_DrawAndGuessLogic;