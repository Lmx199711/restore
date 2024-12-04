var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s;
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TimeSystem = require("TimeSystem");
var r_LevelPreload = require("LevelPreload");
var r_PlayerData = require("PlayerData");
var r_SoundMgr = require("SoundMgr");
var r_CountMoneyQuestion = require("CountMoneyQuestion");
var r_CountMoneyResult = require("CountMoneyResult");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_CountMoneyUI = require("CountMoneyUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e["五块"] = 0] = "五块";
  e[e["十块"] = 1] = "十块";
  e[e["二十块"] = 2] = "二十块";
  e[e["五十块"] = 3] = "五十块";
  e[e["一百块"] = 4] = "一百块";
})(s || (s = {}));
var I = {
  gameTime: 30,
  totalMoneyCount: 270,
  countForQuest: [5, 10],
  clickNum: 3,
  clickNum2: 5,
  eyeNum: 3,
  content: ["你干嘛", "你讨厌", "现在还有人呢", "你不要这个样子", "好啦~好啦~，你赢了额外给你1亿奖励"],
  contentSound: ["你干嘛", "你讨厌", "现在还有人呢", "你不要这个样子", "好啦好啦，赢了给你1亿奖励"]
};
var def_CountMoneyLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.sceneNode = [];
    t.roleNode = null;
    t.roleQipao = null;
    t.dogNode = null;
    t.oprationTimeNode = null;
    t.moneyArea = null;
    t.moneyPlaceArea = null;
    t.btnTip = null;
    t.btnDisturb = null;
    t.moneyPrefab = [];
    t.moneySpritFrame = [];
    t.isGameOver = false;
    t.isStop = false;
    t.isStartGame = false;
    t.time = 0;
    t.oneS = 0;
    t.curSceneIndex = 0;
    t.moneyList = [];
    t.curCountMoneyList = [];
    t.curNum = 0;
    t.curClick = 0;
    t.curClick2 = 0;
    t.curContentIndex = 0;
    t.tiggerCaidan1 = false;
    t.tiggerCaidan2 = false;
    t.randomQuesNum = 0;
    t.curQuesNum = 0;
    t.isHitDog = false;
    t.isDogSteal = false;
    t.stealMoneyIndex = 0;
    t.isDisturb = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.registTouch();
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.update = function (e) {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
    if (!(this.isGameOver || this.isStop || !this.isStartGame)) {
      this.oneS += e;
      if (this.oneS >= 1) {
        this.oneS = 0;
        this.time -= 1;
        this.showOprationTime();
        if (this.time <= 0) {
          this.showOprationTime(false);
          this.isGameOver = true;
          this.curSceneIndex = 2;
          this.showSceneByIndex();
          this.showRoleQiPao("时间到，这里是多少钱");
          r_SoundMgr.SoundMgr.playSound("countMoney/时间到，这里是多少钱");
        }
      }
    }
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.loadPreload = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    this.init();
    this.startGame();
    if (r_CountMoneyUI.CountMoneyUI.Inst && r_CountMoneyUI.CountMoneyUI.Inst.isRestart) {
      r_CountMoneyUI.CountMoneyUI.Inst.isRestart = false;
      this.isStartGame = true;
      this.curSceneIndex = 1;
      this.showSceneByIndex();
      this.randomMoney();
      this.showRoleQiPao("那就这么说定了，开始吧~");
      r_SoundMgr.SoundMgr.playSound("countMoney/就这么说定啦");
    }
    return null;
  };
  _ctor.prototype.passLevel = function () {};
  _ctor.prototype.init = function () {
    this.isStartGame = false;
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
    r_TYEventDispatcher.TYEventDispatcher.off("countMoneyInput", this.checkInputCount, this);
  };
  _ctor.prototype.startGame = function () {
    this.showRoleAnim(this.roleNode, "step_1", true);
    this.showRoleQiPao("数钱，数对了翻1万倍奖励，数错了做我的仆人，敢不敢试试");
    r_SoundMgr.SoundMgr.playSound("countMoney/赢了1000倍奖励");
    r_TYEventDispatcher.TYEventDispatcher.on("countMoneyInput", this.checkInputCount, this);
  };
  _ctor.prototype.checkInputCount = function (e) {
    if (this.getTotalCountMoney() > 0 && e.data == this.getTotalCountMoney()) {
      r_CountMoneyResult.CountMoneyResult.showUI({
        mode: 1,
        money: this.getTotalCountMoney()
      });
    } else {
      r_CountMoneyResult.CountMoneyResult.showUI({
        mode: 0,
        money: this.getTotalCountMoney()
      });
    }
  };
  _ctor.prototype.showSceneByIndex = function () {
    for (var e = 0; e < this.sceneNode.length; e++) {
      if (e == this.curSceneIndex) {
        this.sceneNode[e].active = true;
      } else {
        this.sceneNode[e].active = false;
      }
    }
  };
  _ctor.prototype.showRoleAnim = function (e, t, o, i) {
    undefined === o && (o = true);
    var n = e.getComponent(sp.Skeleton);
    n.paused = false;
    n.timeScale = 1;
    console.log("人物动画 ", t);
    var a = n.setAnimation(0, t, o);
    o || n.setTrackCompleteListener(a, function () {
      i && i();
    });
  };
  _ctor.prototype.showRoleQiPao = function (e, t) {
    r_SoundMgr.SoundMgr.stopAllSound();
    this.roleQipao.opacity = 255;
    this.roleQipao.parent.opacity = 255;
    this.roleQipao.getChildByName("label").getComponent(cc.Label).string = e;
    cc.Tween.stopAllByTarget(this.roleQipao);
    cc.tween(this.roleQipao).delay(.1).call(function () {
      t && t();
    }).start();
  };
  _ctor.prototype.hideRoleQiPao = function (e) {
    cc.Tween.stopAllByTarget(this.roleQipao);
    cc.tween(this.roleQipao).to(.1, {
      opacity: 0
    }).call(function () {
      e && e();
    }).start();
  };
  _ctor.prototype.showOprationTime = function (e) {
    undefined === e && (e = true);
    if (e) {
      this.oprationTimeNode.active = true;
      this.oprationTimeNode.getChildByName("timeLabel").getComponent(cc.Label).string = "" + this.time;
    } else {
      this.oprationTimeNode.active = false;
    }
  };
  _ctor.prototype.getTotalCountMoney = function () {
    var e = [5, 10, 20, 50, 100];
    var t = 0;
    for (var o = 0; o < this.curCountMoneyList.length; o++) {
      t += e[this.curCountMoneyList[o].index];
    }
    return t;
  };
  _ctor.prototype.getLastMoneyInedx = function () {
    var e = 0;
    for (var t = this.moneyList.length - 1; t >= 0; t--) {
      if (!this.moneyList[t].isFinish) {
        e = t;
        break;
      }
    }
    return e;
  };
  _ctor.prototype.randomMoney = function () {
    this.moneyArea.removeAllChildren();
    for (var e = 0; e < I.totalMoneyCount; e++) {
      var t = r_UtilsSystem.UtilsSystem.getRandomNum(s.五块, s.一百块);
      var o = cc.instantiate(this.moneyPrefab[t]);
      this.moneyArea.addChild(o);
      o.setSiblingIndex(e);
      o.x = 0 - (this.moneyArea.width / 2 - o.width / 2) + Math.random() * (this.moneyArea.width / 2 - o.width / 2) * 2;
      o.y = 0 - (this.moneyArea.height / 2 - o.height / 2) + Math.random() * (this.moneyArea.height / 2 - o.height / 2) * 2;
      var i = {
        node: o,
        index: t,
        isFinish: false,
        zIndex: e
      };
      this.moneyList.push(i);
    }
    this.randomQuesNum = r_UtilsSystem.UtilsSystem.getRandomFromArr(I.countForQuest);
    this.time = I.gameTime;
    this.showOprationTime();
  };
  _ctor.prototype.moveMoneyToPlaceArea = function (e) {
    r_SoundMgr.SoundMgr.playSound("countMoney/数钱");
    this.curNum += 1;
    var t = this.curNum;
    e.setSiblingIndex(999);
    var o = cc.v2(0, 0);
    o.x = 0 - (this.moneyPlaceArea.width / 2 - e.width / 2) + Math.random() * (this.moneyPlaceArea.width / 2 - e.width / 2) * 2;
    o.y = 0 - (this.moneyPlaceArea.height / 2 - e.height / 2) + Math.random() * (this.moneyPlaceArea.height / 2 - e.height / 2) * 2;
    var i = this.moneyPlaceArea.convertToWorldSpaceAR(cc.Vec2.ZERO);
    i.x += o.x;
    i.y += o.y;
    var n = this.moneyArea.convertToNodeSpaceAR(i);
    cc.tween(e).to(.5, {
      x: n.x,
      y: n.y
    }).call(function () {
      e.setSiblingIndex(t);
    }).start();
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
  _ctor.prototype.onClickStartGame = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("数钱开始挑战", function () {
      e.isStartGame = true;
      e.curSceneIndex = 1;
      e.showSceneByIndex();
      e.randomMoney();
      e.showRoleQiPao("那就这么说定了，开始吧~");
      r_SoundMgr.SoundMgr.playSound("countMoney/就这么说定啦");
    });
  };
  _ctor.prototype.onClickDisturb = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    r_PlatformSystem.PlatformSystem.showVideo("数钱免打扰", function () {
      e.isDisturb = true;
      e.btnDisturb.active = false;
    });
  };
  _ctor.prototype.showBtnTipState = function (e) {
    undefined === e && (e = true);
    this.btnTip.getChildByName("video").active = e;
    if (this.btnTip.getChildByName("video").active) {
      this.btnTip.getChildByName("video").x = 68;
    } else {
      this.btnTip.getChildByName("video").x = 48;
    }
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    if (this.btnTip.getChildByName("video").active) {
      r_PlatformSystem.PlatformSystem.showVideo("数钱提示", function () {
        e.showBtnTipState(false);
        r_UtilsSystem.UtilsSystem.showAlert("您总共数了 " + e.getTotalCountMoney(), 1, function () {}, e);
      });
    } else {
      r_UtilsSystem.UtilsSystem.showAlert("您总共数了 " + this.getTotalCountMoney(), 1, function () {}, this);
    }
  };
  _ctor.prototype.checkPolygonInPolygon = function (e, t) {
    var o = e.getComponent(cc.PolygonCollider);
    var i = [];
    for (var n = 0; n < o.points.length; n++) {
      i[n] = new cc.Vec2(0, 0);
      i[n].x = o.points[n].x;
      i[n].y = o.points[n].y;
    }
    var a = e.convertToWorldSpaceAR(cc.Vec2.ZERO);
    for (n = 0; n < i.length; n++) {
      i[n].x += a.x;
      i[n].y += a.y;
    }
    var s = t.getComponent(cc.PolygonCollider);
    var r = [];
    for (n = 0; n < s.points.length; n++) {
      r[n] = new cc.Vec2(0, 0);
      r[n].x = s.points[n].x;
      r[n].y = s.points[n].y;
    }
    var c = t.convertToWorldSpaceAR(cc.Vec2.ZERO);
    for (n = 0; n < r.length; n++) {
      r[n].x += c.x;
      r[n].y += c.y;
    }
    var l = cc.Intersection.polygonPolygon(i, r);
    e.getBoundingBoxToWorld();
    t.getBoundingBoxToWorld();
    return l;
  };
  _ctor.prototype.isCanMove = function (e) {
    for (var t = this.moneyList.length - 1; t >= 0; t--) {
      if (t > e.zIndex && !this.moneyList[t].isFinish && this.checkPolygonInPolygon(this.moneyList[t].node, e.node)) {
        return false;
      }
    }
    return true;
  };
  _ctor.prototype.onTouchStart = function (e) {
    var t = this;
    this.touchStartPos = e.getLocation();
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.startID = e.getID();
      this.moveInfo = {};
      if (this.isStartGame) {
        if (this.dogNode.active && this.dogNode.activeInHierarchy && r_UtilsSystem.UtilsSystem.touchInNode(this.dogNode, this.touchStartPos) && this.isDogSteal) {
          this.isHitDog = true;
          r_SoundMgr.SoundMgr.playSound("countMoney/锤子");
          this.showNodeSpine(this.dogNode, "step_3", false, function () {
            t.dogNode.active = false;
            t.isHitDog = false;
            t.isDogSteal = false;
          });
          r_TimeSystem.TimeSystem.scheduleOnce("HitDog", .3, function () {
            r_SoundMgr.SoundMgr.playSound("countMoney/狗子惨叫");
          });
        }
        if (r_UtilsSystem.UtilsSystem.touchInNode(this.roleNode, this.touchStartPos)) {
          0 == this.curClick2 && r_TimeSystem.TimeSystem.scheduleOnce("caidan2Click", 1, function () {
            t.curClick2 = 0;
          });
          this.curClick2 += 1;
          if (!this.tiggerCaidan2 && !r_PlayerData.PlayerData.data.countMoneyGame.caidan2 && this.curClick2 >= I.clickNum2) {
            r_TimeSystem.TimeSystem.scheduleClear("caidan2Click");
            this.tiggerCaidan2 = true;
            this.showRoleAnim(this.roleNode, "step_3", false, function () {
              t.showRoleAnim(t.roleNode, "step_1", true);
            });
            this.showCaidan2();
            r_TimeSystem.TimeSystem.scheduleOnce("caidan2Move", 1, function () {
              r_SoundMgr.SoundMgr.playSound("countMoney/拿一堆钱");
            });
          }
        }
        var o = false;
        var i = false;
        for (var n = this.moneyList.length - 1; n >= 0; n--) {
          if (!this.moneyList[n].isFinish && r_UtilsSystem.UtilsSystem.touchInNode(this.moneyList[n].node, this.touchStartPos)) {
            i = true;
            if (this.isCanMove(this.moneyList[n])) {
              o = true;
              this.moneyList[n].isFinish = true;
              this.moveMoneyToPlaceArea(this.moneyList[n].node);
              this.curCountMoneyList.push(this.moneyList[n]);
              this.curQuesNum += 1;
              if (this.curQuesNum >= this.randomQuesNum && !this.isDisturb) {
                this.showDisturb();
                this.randomQuesNum = r_UtilsSystem.UtilsSystem.getRandomFromArr(I.countForQuest);
                this.curQuesNum = 0;
              }
              break;
            }
            o = false;
          }
        }
        if (i && !o) {
          var a = this.getLastMoneyInedx();
          this.moneyList[a].isFinish = true;
          this.moveMoneyToPlaceArea(this.moneyList[a].node);
          this.curCountMoneyList.push(this.moneyList[a]);
          this.curQuesNum += 1;
          if (this.curQuesNum >= this.randomQuesNum && !this.isDisturb) {
            this.showDisturb();
            this.randomQuesNum = r_UtilsSystem.UtilsSystem.getRandomFromArr(I.countForQuest);
            this.curQuesNum = 0;
          }
        }
      } else if (this.curContentIndex < I.content.length && r_UtilsSystem.UtilsSystem.touchInNode(this.roleNode, this.touchStartPos)) {
        this.curClick += 1;
        if (this.curClick >= 3) {
          this.curClick = 0;
          r_PlayerData.PlayerData.data.countMoneyGame.caidan1 && this.curContentIndex >= I.content.length - 1 && (this.curContentIndex = 0);
          this.showRoleAnim(this.roleNode, "step_2", false, function () {
            t.showRoleAnim(t.roleNode, "step_1", true);
          });
          this.showRoleQiPao(I.content[this.curContentIndex]);
          r_SoundMgr.SoundMgr.playSound("countMoney/" + I.contentSound[this.curContentIndex]);
          this.curContentIndex += 1;
          r_PlayerData.PlayerData.data.countMoneyGame.caidan1 || this.curContentIndex >= I.content.length && (this.tiggerCaidan1 = true, r_CountMoneyUI.CountMoneyUI.Inst.tiggerCaidan1 = true);
        }
      }
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.moveInfo && this.moveInfo.node && e.getLocation();
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
  _ctor.prototype.showCaidan2 = function () {
    var e = this;
    var t = Math.floor((this.moneyList.length - this.curCountMoneyList.length) / 2);
    var o = 0;
    for (var i = this.moneyList.length - 1; i >= 0 && (this.moneyList[i].isFinish || (this.moneyList[i].isFinish = true, this.moveMoneyToPlaceArea(this.moneyList[i].node), this.curCountMoneyList.push(this.moneyList[i]), !(++o >= t))); i--) {
      ;
    }
    this.showRoleQiPao("你真讨厌，现在是 " + this.getTotalCountMoney());
    r_SoundMgr.SoundMgr.playSound("countMoney/彩蛋2触发的音效");
    r_TimeSystem.TimeSystem.scheduleOnce("hideCaidan2", 3, function () {
      e.hideRoleQiPao();
    });
    if (!(r_PlayerData.PlayerData.data.countMoneyGame.caidan2 || r_PlatformSystem.PlatformSystem.getIsWebPlatform())) {
      r_PlayerData.PlayerData.data.countMoneyGame.caidan2 = 1;
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.showDisturb = function () {
    var e = this;
    if (r_UtilsSystem.UtilsSystem.isRandomSuccess(90)) {
      this.isStop = true;
      r_CountMoneyQuestion.CountMoneyQuestion.showUI({
        moneyList: this.curCountMoneyList,
        eye: Math.floor((I.gameTime - this.time) / I.eyeNum),
        anserCallBack: function () {
          e.isStop = false;
        }
      });
    } else {
      this.showGodStelMoney(function () {
        if (e.isHitDog) {
          e.dogNode.active = false;
        } else {
          e.curCountMoneyList.splice(e.stealMoneyIndex, 1);
          e.dogNode.active = false;
        }
        e.isHitDog = false;
        e.isDogSteal = false;
      });
    }
  };
  _ctor.prototype.showNodeSpine = function (e, t, o, i) {
    undefined === o && (o = true);
    if (e) {
      var n = e.getComponent(sp.Skeleton);
      var a = n.setAnimation(0, t, o);
      o || n.setTrackCompleteListener(a, function () {
        i && i();
      });
    }
  };
  _ctor.prototype.showGodStelMoney = function (e) {
    this.stealMoneyIndex = r_UtilsSystem.UtilsSystem.getRandomNum(0, this.curCountMoneyList.length - 1);
    this.dogNode.active = true;
    var t = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.dogNode, "money");
    t.active = true;
    t.getComponent(cc.Sprite).spriteFrame = this.moneySpritFrame[this.curCountMoneyList[this.stealMoneyIndex].index];
    this.isDogSteal = true;
    this.showNodeSpine(this.dogNode, "step_2", false, function () {
      e && e();
    });
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "场景（1,2,3）"
  })], _ctor.prototype, "sceneNode", undefined);
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
    displayName: "狗子动画"
  })], _ctor.prototype, "dogNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "操作倒计时节点"
  })], _ctor.prototype, "oprationTimeNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "钱生成区域"
  })], _ctor.prototype, "moneyArea", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "钱放置区域"
  })], _ctor.prototype, "moneyPlaceArea", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示按钮"
  })], _ctor.prototype, "btnTip", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "免打扰按钮"
  })], _ctor.prototype, "btnDisturb", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "钱拷贝节点"
  })], _ctor.prototype, "moneyPrefab", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "钱精灵的精灵帧"
  })], _ctor.prototype, "moneySpritFrame", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_CountMoneyLogic;