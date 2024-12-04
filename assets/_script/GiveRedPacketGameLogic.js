var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s;
var r_LevelPreload = require("LevelPreload");
var r_ShowEffectCom_PicLabel = require("ShowEffectCom_PicLabel");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_GiveRedPacketResult = require("GiveRedPacketResult");
var r_GiveRedPacketReward = require("GiveRedPacketReward");
var r_GiveRedPacketSelectUI = require("GiveRedPacketSelectUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e["空"] = 0] = "空";
  e[e["走"] = 1] = "走";
  e[e["停"] = 2] = "停";
  e[e["走看"] = 3] = "走看";
  e[e["停看"] = 4] = "停看";
  e[e["拦截"] = 5] = "拦截";
})(s || (s = {}));
var C = [{
  id: 1,
  name: "男人",
  prefab: "男人",
  pos: cc.v2(0, -80),
  desc: "新年快乐",
  soundName: "新年快乐"
}, {
  id: 2,
  name: "女人",
  prefab: "女人",
  pos: cc.v2(0, -80),
  desc: "新年快乐",
  soundName: "新年快乐"
}, {
  id: 3,
  name: "小男孩",
  prefab: "小男孩",
  pos: cc.v2(0, -80),
  desc: "新年快乐",
  soundName: "新年快乐"
}, {
  id: 4,
  name: "小女孩",
  prefab: "小女孩",
  pos: cc.v2(0, -80),
  desc: "新年快乐",
  soundName: "新年快乐"
}];
var S = [2, 5];
var I = [1, 2];
var b = [2, 5];
var x = [2, 3];
var P = [-300, 330];
var def_GiveRedPacketGameLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.relativeLayer = null;
    t.sceneNode = [];
    t.girlFriendNode = null;
    t.gfQiapaoNode = null;
    t.sendRedPacket = null;
    t.sendRpTargetPos = null;
    t.lbSend = null;
    t.lbHold = null;
    t.lbGameTime = null;
    t.yanAnim = null;
    t.girlFriendNode2 = null;
    t.gfQiapaoNode2 = null;
    t.redPacket = null;
    t.redPacketStartPos = null;
    t.redPacketArea = [];
    t.relativeNodeList = [];
    t.time = 0;
    t.curStopTime = 0;
    t.curStopStayTime = 0;
    t.isStopTimeSet = false;
    t.curLookStayTime = 0;
    t.lookStayTime = 0;
    t.curLookTime = 0;
    t.isLookTimeSet = false;
    t.isGameOver = false;
    t.isStart = false;
    t.isHighSpeed = false;
    t.relativeId = -1;
    t.curSpeed = 0;
    t.curGfState = s.空;
    t.curSendCount = 0;
    t.curHoldCount = 0;
    t.isSending = false;
    t.initRolePos = null;
    t.initRoleQipaoPos = null;
    t.level = 1;
    t.clickCount = 0;
    t.isFirst = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    e.prototype.onLoad.call(this);
    this.registTouch();
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.update = function (e) {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
    if (this.isStart && !this.isGameOver) {
      this.time -= e;
      if (this.time <= 0) {
        this.time = 0;
        this.updateGameTime();
        r_SoundMgr.SoundMgr.stopAllSound();
        if (1 == this.level) {
          r_GiveRedPacketResult.GiveRedPacketResult.showUI({
            sendCount: this.curSendCount,
            holdCount: this.curHoldCount,
            opendCallback: function () {}
          });
        } else {
          r_GiveRedPacketReward.GiveRedPacketReward.showUI({
            mode: 2,
            totalMoney: r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.oneRedMoney * this.clickCount,
            opendCallback: function () {}
          });
        }
        this.isGameOver = true;
        return void (this.isStart = false);
      }
      this.updateGameTime();
      if (this.curGfState != s.拦截) {
        if (this.girlFriendNode.x <= P[0]) {
          this.girlFriendNode.scaleX = -1;
          if (this.isHighSpeed) {
            this.curSpeed = 5;
          } else {
            this.curSpeed = 2;
          }
        } else if (this.girlFriendNode.x >= P[1]) {
          this.girlFriendNode.scaleX = 1;
          if (this.isHighSpeed) {
            this.curSpeed = -5;
          } else {
            this.curSpeed = -2;
          }
        }
        if (-1 == this.girlFriendNode.scaleX) {
          this.gfQiapaoNode.scaleX = -1;
        } else {
          this.gfQiapaoNode.scaleX = 1;
        }
        this.curGfState != s.走 && this.curGfState != s.空 && this.curGfState != s.走看 || (this.girlFriendNode.x += this.curSpeed);
        if (this.curStopTime <= 0 && this.curStopStayTime <= 0) {
          this.curStopTime = r_UtilsSystem.UtilsSystem.getRandomFromArr(S);
          this.curStopStayTime = r_UtilsSystem.UtilsSystem.getRandomFromArr(I);
          this.isStopTimeSet = false;
        } else {
          this.curStopTime -= e;
          if (this.curStopTime <= 0) {
            if (!this.isStopTimeSet) {
              this.showRoleAnim(this.girlFriendNode, "step_4", true);
              this.curGfState = s.停;
            }
            this.isStopTimeSet = true;
            this.curStopStayTime -= e;
            if (this.curStopStayTime <= 0) {
              this.showRoleAnim(this.girlFriendNode, "step_1", true);
              this.curGfState = s.走;
            }
          }
        }
        if (this.curLookTime <= 0 && this.curLookStayTime <= 0) {
          this.curLookStayTime = r_UtilsSystem.UtilsSystem.getRandomFromArr(x);
          this.lookStayTime = this.curLookStayTime;
          this.curLookTime = r_UtilsSystem.UtilsSystem.getRandomFromArr(b);
          this.isLookTimeSet = false;
        } else {
          this.curLookTime -= e;
          if (this.curLookTime <= 0) {
            if (!this.isLookTimeSet) {
              if (this.curGfState == s.走) {
                this.showRoleAnim(this.girlFriendNode, "step_2", true);
                this.curGfState = s.走看;
              } else {
                this.showRoleAnim(this.girlFriendNode, "step_3", true);
                this.curGfState = s.停看;
              }
            }
            this.isLookTimeSet = true;
            this.curLookStayTime -= e;
            if (this.curLookStayTime <= 0) {
              this.showRoleAnim(this.girlFriendNode, "step_1", true);
              this.curGfState = s.走;
            }
          }
        }
      }
    }
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.loadPreload = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    this.initRolePos = cc.v2(this.girlFriendNode.x, this.girlFriendNode.y);
    this.initRoleQipaoPos = cc.v2(this.gfQiapaoNode.x, this.gfQiapaoNode.y);
    this.init();
    this.startGame();
    return null;
  };
  _ctor.prototype.passLevel = function () {};
  _ctor.prototype.init = function () {
    this.time = 30;
    this.curStopTime = 0;
    this.curStopStayTime = 0;
    this.isStopTimeSet = false;
    this.curLookStayTime = 0;
    this.lookStayTime = 0;
    this.curLookTime = 0;
    this.isLookTimeSet = false;
    this.isGameOver = false;
    this.isStart = false;
    this.isHighSpeed = false;
    this.relativeId = -1;
    this.curSpeed = 0;
    this.curGfState = s.空;
    this.curSendCount = 0;
    this.curHoldCount = 0;
    this.isSending = false;
    this.level = 1;
    this.isFirst = false;
    this.updateGameTime();
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
  };
  _ctor.prototype.startGame = function () {
    this.girlFriendNode.x = this.initRolePos.x;
    this.showRoleAnim(this.girlFriendNode, "step_5", true);
    this.showSendRedPacket();
    this.updateSendCount();
  };
  _ctor.prototype.restartGame = function () {
    e.prototype.restartGame.call(this);
    this.init();
    this.startGame();
  };
  _ctor.prototype.showCaidan2 = function () {
    this.isGameOver = false;
    this.isStart = true;
    this.relativeLayer.active = false;
    this.sceneNode[0].active = false;
    this.sceneNode[1].active = true;
    this.level = 2;
    this.lbGameTime.parent.y += 100;
    this.time = 30;
    this.showRoleAnim2(this.girlFriendNode2, "step_1", true);
    this.showRoleQiPao2("我可没拿你红包", "");
    r_SoundMgr.SoundMgr.playSound("giveRedPacket/我可没有拿你红包");
  };
  _ctor.prototype.showSendRedPacket = function () {
    var e = this;
    cc.Tween.stopAllByTarget(this.sendRedPacket);
    cc.tween(this.sendRedPacket).to(.3, {
      x: this.sendRpTargetPos.x,
      y: this.sendRpTargetPos.y
    }).call(function () {
      e.isStart = true;
      e.showRoleAnim(e.girlFriendNode, "step_1", true);
      e.curGfState = s.走;
      e.hideAllRelative();
      e.randmonRelative();
    }).start();
  };
  _ctor.prototype.randmonRelative = function () {
    var e = this.relativeId;
    for (this.relativeId = r_UtilsSystem.UtilsSystem.getRandomNum(1, 4); e == this.relativeId;) {
      this.relativeId = r_UtilsSystem.UtilsSystem.getRandomNum(1, 4);
    }
    cc.Tween.stopAllByTarget(this.relativeNodeList[this.relativeId - 1]);
    this.relativeNodeList[this.relativeId - 1].active = true;
    this.relativeNodeList[this.relativeId - 1].x = C[this.relativeId - 1].pos.x;
    this.relativeNodeList[this.relativeId - 1].y = C[this.relativeId - 1].pos.y;
    this.relativeNodeList[this.relativeId - 1].setSiblingIndex(100);
    var t = this.relativeNodeList[this.relativeId - 1].getChildByName("qipao");
    t.active = true;
    t.getChildByName("label").getComponent(cc.Label).string = C[this.relativeId - 1].desc;
  };
  _ctor.prototype.hideAllRelative = function () {
    for (var e = 0; e < this.relativeNodeList.length; e++) {
      this.relativeNodeList[e].active = false;
    }
    this.yanAnim.active = false;
  };
  _ctor.prototype.leaveRelative = function (e) {
    var t = this;
    var o = function (o) {
      if (o == i.relativeId - 1) {
        i.relativeNodeList[o].setSiblingIndex(200);
        i.relativeNodeList[o].getChildByName("qipao").active = false;
        i.showYanAnim();
        cc.Tween.stopAllByTarget(i.relativeNodeList[o]);
        cc.tween(i.relativeNodeList[o]).to(.1, {
          x: 100
        }).call(function () {
          t.relativeNodeList[o].active = false;
          e && e();
        }).start();
      }
    };
    var i = this;
    for (var n = 0; n < this.relativeNodeList.length; n++) {
      o(n);
    }
  };
  _ctor.prototype.showYanAnim = function () {
    this.yanAnim.active = true;
    this.yanAnim.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
  };
  _ctor.prototype.showRoleAnim = function (e, t, o, i) {
    undefined === o && (o = true);
    if (!("step_1" == t && this.curGfState == s.走 || "step_4" == t && this.curGfState == s.停)) {
      var n = e.getComponent(sp.Skeleton);
      n.paused = false;
      n.timeScale = 1;
      var a = n.setAnimation(0, t, o);
      o || n.setTrackCompleteListener(a, function () {
        i && i();
      });
    }
  };
  _ctor.prototype.showRoleQiPao = function (e, t, o) {
    var i = this;
    if (!(this.gfQiapaoNode.opacity > 0)) {
      r_SoundMgr.SoundMgr.stopAllSound();
      r_SoundMgr.SoundMgr.playSound("giveRedPacket/" + t);
      this.gfQiapaoNode.opacity = 255;
      this.gfQiapaoNode.parent.opacity = 255;
      this.gfQiapaoNode.getChildByName("label").getComponent(cc.Label).string = e;
      if (-1 == this.gfQiapaoNode.scaleX) {
        this.gfQiapaoNode.x = this.initRoleQipaoPos.x + 150;
      } else {
        this.gfQiapaoNode.x = this.initRoleQipaoPos.x;
      }
      cc.Tween.stopAllByTarget(this.gfQiapaoNode);
      cc.tween(this.gfQiapaoNode).delay(2).call(function () {
        o && o();
        i.gfQiapaoNode.opacity = 0;
      }).start();
    }
  };
  _ctor.prototype.showRoleAnim2 = function (e, t, o, i) {
    undefined === o && (o = true);
    var n = e.getComponent(sp.Skeleton);
    n.paused = false;
    n.timeScale = 1;
    var a = n.setAnimation(0, t, o);
    o || n.setTrackCompleteListener(a, function () {
      i && i();
    });
  };
  _ctor.prototype.showRoleQiPao2 = function (e, t, o) {
    var i = this;
    if (!(this.gfQiapaoNode2.opacity > 0)) {
      this.gfQiapaoNode2.opacity = 255;
      this.gfQiapaoNode2.parent.opacity = 255;
      this.gfQiapaoNode2.getChildByName("label").getComponent(cc.Label).string = e;
      cc.Tween.stopAllByTarget(this.gfQiapaoNode2);
      cc.tween(this.gfQiapaoNode2).delay(2).call(function () {
        o && o();
        i.gfQiapaoNode2.opacity = 0;
      }).start();
    }
  };
  _ctor.prototype.showSeedRedPacketAnim = function (e, t) {
    var o = this;
    undefined === t && (t = true);
    r_SoundMgr.SoundMgr.playSound("giveRedPacket/红包飞出");
    var i = this.sendRedPacket.getComponent(sp.Skeleton);
    i.paused = false;
    i.timeScale = 1;
    var n = i.setAnimation(0, e, t);
    i.setTrackCompleteListener(n, function () {
      i.setAnimation(0, "step_1", true);
      o.isSending = false;
    });
  };
  _ctor.prototype.updateGameTime = function () {
    this.lbGameTime.getComponent(r_ShowEffectCom_PicLabel.ShowEffectCom_PicLabel).setString(Math.floor(this.time) + "s");
  };
  _ctor.prototype.updateSendCount = function () {
    this.lbSend.getComponent(cc.Label).string = "" + this.curSendCount;
    this.lbHold.getComponent(cc.Label).string = "" + this.curHoldCount;
  };
  _ctor.prototype.onClickYes = function () {
    r_SoundMgr.SoundMgr.playSound("click");
  };
  _ctor.prototype.showDropRedPacket = function () {
    var e = cc.instantiate(this.redPacket);
    e.setPosition(this.redPacketStartPos.getPosition());
    var t = r_UtilsSystem.UtilsSystem.getRandomNum(0, 2);
    var o = cc.v2(0, 0);
    o.x = this.redPacketArea[t].x + -this.redPacketArea[t].width / 2 + Math.random() * this.redPacketArea[t].width;
    o.y = this.redPacketArea[t].y + -this.redPacketArea[t].height / 2 + Math.random() * this.redPacketArea[t].height;
    var i = cc.v2(e.x, e.y);
    i = o.x > this.redPacketStartPos.x ? cc.v2(e.x + r_UtilsSystem.UtilsSystem.getRandomNum(50, 100), e.y + r_UtilsSystem.UtilsSystem.getRandomNum(50, 100)) : cc.v2(e.x - r_UtilsSystem.UtilsSystem.getRandomNum(50, 100), e.y + r_UtilsSystem.UtilsSystem.getRandomNum(50, 100));
    this.sceneNode[1].addChild(e);
    cc.tween(e).bezierTo(.5, cc.v2(e.x, e.y), i, cc.v2(o.x, o.y)).call(function () {}).start();
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
  _ctor.prototype.onTouchStart = function (e) {
    var t = this;
    this.touchStartPos = e.getLocation();
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.startID = e.getID();
      this.moveInfo = {};
      if (this.isStart && !this.isSending && 1 == this.level && this.sendRedPacket.active && r_UtilsSystem.UtilsSystem.touchInNode(this.sendRedPacket, this.touchStartPos)) {
        this.showSeedRedPacketAnim("step_2", false);
        if (this.curGfState == s.停看 || this.curGfState == s.走看 || this.curGfState == s.拦截) {
          this.curHoldCount += 1;
          this.curLookStayTime = this.lookStayTime;
          this.showRoleQiPao("你多发点，我不客气啦", "你多发点，我不客气啦");
          var o = this.curGfState;
          if (this.girlFriendNode.x > 0) {
            this.curGfState = s.拦截;
            if (-1 == this.girlFriendNode.scaleX) {
              this.showRoleAnim(this.girlFriendNode, "step_7", false);
            } else {
              this.showRoleAnim(this.girlFriendNode, "step_6", false);
            }
            r_TimeSystem.TimeSystem.scheduleClear("step_7");
            r_TimeSystem.TimeSystem.scheduleOnce("step_7", .5, function () {
              if (o == s.停看) {
                t.showRoleAnim(t.girlFriendNode, "step_3", true);
                t.curGfState = s.停看;
              } else {
                t.showRoleAnim(t.girlFriendNode, "step_2", true);
                t.curGfState = s.走看;
              }
            });
          } else {
            this.curGfState = s.拦截;
            if (-1 == this.girlFriendNode.scaleX) {
              this.showRoleAnim(this.girlFriendNode, "step_6", false);
            } else {
              this.showRoleAnim(this.girlFriendNode, "step_7", false);
            }
            r_TimeSystem.TimeSystem.scheduleClear("step_6");
            r_TimeSystem.TimeSystem.scheduleOnce("step_6", .5, function () {
              if (o == s.停看) {
                t.showRoleAnim(t.girlFriendNode, "step_3", true);
                t.curGfState = s.停看;
              } else {
                t.showRoleAnim(t.girlFriendNode, "step_2", true);
                t.curGfState = s.走看;
              }
            });
          }
        } else {
          this.curSendCount += 1;
          this.leaveRelative();
          this.randmonRelative();
        }
        this.updateSendCount();
      }
      2 != this.level || this.isGameOver || this.girlFriendNode2.active && this.girlFriendNode2.activeInHierarchy && r_UtilsSystem.UtilsSystem.touchInNode(this.girlFriendNode2, this.touchStartPos) && (r_SoundMgr.SoundMgr.playSound("click"), this.clickCount++, this.showDropRedPacket(), this.showRoleAnim2(this.girlFriendNode2, "step_2", false, function () {
        t.showRoleAnim2(t.girlFriendNode2, "step_1", true);
      }), this.showRoleQiPao2("已经没有红包啦~", "已经没有红包了2"), this.isFirst || (this.isFirst = true, r_SoundMgr.SoundMgr.stopAllSound(), r_SoundMgr.SoundMgr.playSound("giveRedPacket/已经没有红包了2")));
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else if (this.moveInfo && this.moveInfo.node) {
      var t = e.getLocation().subtract(this.touchStartPos);
      var o = this.touchStartPos.add(t);
      this.moveInfo.node.parent.convertToNodeSpaceAR(o);
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    this.startID = null;
    this.moveInfo && this.moveInfo.node;
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
    displayName: "亲戚人物层"
  })], _ctor.prototype, "relativeLayer", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "场景1，场景2"
  })], _ctor.prototype, "sceneNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "女友"
  })], _ctor.prototype, "girlFriendNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "女友气泡"
  })], _ctor.prototype, "gfQiapaoNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "发红包"
  })], _ctor.prototype, "sendRedPacket", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "发红包移动位置"
  })], _ctor.prototype, "sendRpTargetPos", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "派发数"
  })], _ctor.prototype, "lbSend", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "拦截数"
  })], _ctor.prototype, "lbHold", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "游戏时间"
  })], _ctor.prototype, "lbGameTime", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "一溜烟动画"
  })], _ctor.prototype, "yanAnim", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "女友2"
  })], _ctor.prototype, "girlFriendNode2", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "女友气泡"
  })], _ctor.prototype, "gfQiapaoNode2", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "掉红包预制体"
  })], _ctor.prototype, "redPacket", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "掉红包开始位置"
  })], _ctor.prototype, "redPacketStartPos", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "掉红包区域"
  })], _ctor.prototype, "redPacketArea", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "亲戚节点列表"
  })], _ctor.prototype, "relativeNodeList", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_GiveRedPacketGameLogic;