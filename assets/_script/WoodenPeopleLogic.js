var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s;
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_CommonTipUI = require("CommonTipUI");
var r_TimeSystem = require("TimeSystem");
var r_CheckHasKeys = require("CheckHasKeys");
var r_LevelPreload = require("LevelPreload");
var r_PlayerData = require("PlayerData");
var r_BehaviorMgr = require("BehaviorMgr");
var r_WoodenPeopleResultUI = require("WoodenPeopleResultUI");
var r_GameKeyMgr = require("GameKeyMgr");
var r_SoundMgr = require("SoundMgr");
var r_WoodenPeopleUI = require("WoodenPeopleUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e["上"] = 0] = "上";
  e[e["右上"] = 1] = "右上";
  e[e["左上"] = 2] = "左上";
  e[e["左下"] = 3] = "左下";
  e[e["右下"] = 4] = "右下";
  e[e["下"] = 5] = "下";
})(s || (s = {}));
var x = [{
  id: 1,
  name: "话筒人",
  moveSpeed: 3,
  daijiAnim: "huat_daiji",
  posY: 220,
  goAnim: "huat_pao",
  happyAnim: "huat_change"
}, {
  id: 2,
  name: "恐龙人",
  moveSpeed: 3.2,
  daijiAnim: "kl_daiji",
  posY: 150,
  goAnim: "kl_pao",
  happyAnim: "kl_tiaowu"
}, {
  id: 3,
  name: "一撮毛人",
  moveSpeed: 3,
  daijiAnim: "yicm_daiji",
  posY: 220,
  goAnim: "yicm_pao",
  happyAnim: "yicm_tiaowu"
}, {
  id: 4,
  name: "帅气人",
  moveSpeed: 3.2,
  daijiAnim: "shuai_daiji",
  posY: 140,
  goAnim: "shuai_pao",
  happyAnim: "shuai_tiaowu"
}, {
  id: 5,
  name: "幼儿园人",
  moveSpeed: 3,
  daijiAnim: "yous_daiji",
  posY: 210,
  goAnim: "yous_pao",
  happyAnim: "yous_wadi"
}, {
  id: 6,
  name: "职业人",
  moveSpeed: 3,
  daijiAnim: "zhiye_daiji",
  posY: 200,
  goAnim: "zhiye_pao",
  happyAnim: "zhiye_dao"
}];
var P = [s.上, s.右上, s.左上, s.左下, s.右下, s.下];
var _ = function () {
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
  return __decorate([_ccclass("WoodenPeopleTips")], e);
}();
var def_WoodenPeopleLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.xiGuaRole = null;
    t.xiGuaRoleQipao = null;
    t.otherRoleQipao = null;
    t.keSanQipao = null;
    t.newGuideTip = null;
    t.oprationTimeNode = null;
    t.labCurPass = null;
    t.titleNode1 = null;
    t.titleNode2 = null;
    t.keSanRole = null;
    t.lineNode = null;
    t.jianNode = null;
    t.btnTip = null;
    t.roleNodeList = [];
    t.daojuNodeList = [];
    t.clickNodeList = [];
    t.clickSpriteFrameList = [];
    t.bulletLayer = null;
    t.bulletNode = null;
    t.bulletSpriteFrame = [];
    t.gameTips = [];
    t.daojuNodeInitPosList = [];
    t.jianNodeInitPos = null;
    t.isGameStart = false;
    t.isCanMove = false;
    t.finishRoleList = [false, false, false, false, false, false];
    t.curRound = 0;
    t.curLevel = 1;
    t.moveTime = 0;
    t.curPass = 0;
    t.time = 0;
    t.oneS = 0;
    t.curRoleMove = 0;
    t.bulletNodeList = [];
    t.isChangeBullet = false;
    t.keSanActList = [];
    t.isTirggerCaiDan = false;
    t.curHitCount = 0;
    t.totalHitCount = 0;
    t.isGameOver = false;
    t.isStop = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.registTouch();
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.update = function (e) {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
    this.isStop || this.isGameStart && (this.oneS > 1 && (this.oneS = 0, this.time > 0 && (this.time -= 1, this.time <= 0 ? (this.time = 0, this.showOprationTime(false), this.showXiGuaCountDown()) : this.showOprationTime())), this.oneS += e, this.isCanMove && (this.moveTime += e, this.moveTime > .1 && (this.updateRolePos(), this.moveTime = 0)));
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.loadPreload = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    this.init();
    return null;
  };
  _ctor.prototype.passLevel = function () {};
  _ctor.prototype.init = function () {
    this.btnTip.active = false;
    this.time = 0;
    this.curPass = 0;
    this.curRound = 0;
    this.curLevel = 1;
    this.finishRoleList = [false, false, false, false, false, false];
    for (var e = 0; e < this.daojuNodeList.length; e++) {
      this.daojuNodeInitPosList[e] = new cc.Vec2(this.daojuNodeList[e].x, this.daojuNodeList[e].y);
    }
    this.jianNodeInitPos = new cc.Vec2(this.jianNode.x, this.jianNode.y);
    this.showAllRole(false);
    this.showXiGuaRoleAnim("xigua_daiji1");
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
  };
  _ctor.prototype.startGame = function () {
    this.btnTip.active = true;
    this.showXiGuaCountDown();
  };
  _ctor.prototype.showAllRole = function (e) {
    undefined === e && (e = true);
    for (var t = 0; t < this.roleNodeList.length; t++) {
      this.roleNodeList[t] && !this.finishRoleList[t] && (this.roleNodeList[t].active = e);
    }
  };
  _ctor.prototype.showAllRoleMoveAnim = function () {
    for (var e = 0; e < this.roleNodeList.length; e++) {
      this.roleNodeList[e] && this.showRoleAnim(this.roleNodeList[e], x[e].goAnim, true);
    }
  };
  _ctor.prototype.showAllRoleStopAnim = function () {
    for (var e = 0; e < this.roleNodeList.length; e++) {
      this.roleNodeList[e] && (this.roleNodeList[e].getComponent(sp.Skeleton).paused = true);
    }
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.touchDisabled = false;
  };
  _ctor.prototype.updateRolePos = function () {
    for (var e = 0; e < this.roleNodeList.length; e++) {
      if (this.roleNodeList[e] && (this.roleNodeList[e].y -= x[e].moveSpeed, this.roleNodeList[e].active && this.roleNodeList[e].y < this.lineNode.y)) {
        this.isGameOver = true;
        r_TimeSystem.TimeSystem.unregistSecondUpdate("xigua_CountDwon");
        this.isGameStart = false;
        this.isCanMove = false;
        r_SoundMgr.SoundMgr.stopAllSound();
        r_SoundMgr.SoundMgr.playSound("woodenPeople/游戏失败");
        this.showOprationTime(false);
        this.showXiGuaRoleQiPao("", false);
        return void r_TimeSystem.TimeSystem.scheduleOnce("wp_gameover", 2, function () {
          r_WoodenPeopleResultUI.default.showUI({
            mode: 3
          });
        });
      }
    }
  };
  _ctor.prototype.showRoleAnim = function (e, t, o) {
    undefined === o && (o = true);
    var i = e.getComponent(sp.Skeleton);
    i.paused = false;
    i.timeScale = 1;
    i.setAnimation(0, t, o);
  };
  _ctor.prototype.showXiGuaRoleAnim = function (e, t) {
    undefined === t && (t = true);
    var o = this.xiGuaRole.getComponent(sp.Skeleton);
    var i = o.setAnimation(0, e, t);
    o.paused = false;
    o.timeScale = 1;
    "xigua_zhuans" == e && o.setTrackCompleteListener(i, function () {
      o.setAnimation(0, "xigua_daiji2", true);
    });
  };
  _ctor.prototype.showXiGuaCountDown = function () {
    var e = this;
    this.isGameStart = true;
    this.curRound += 1;
    var t = ["3、2、1\n木头人", "3、2、1", "3、2", "3"];
    var o = ["木头人", "1", "2", "3"];
    var i = 5;
    this.showXiGuaRoleAnim("xigua_daiji1");
    r_TimeSystem.TimeSystem.registSecondUpdate("xigua_CountDwon", function () {
      if (!e.isStop) {
        if (5 == i) {
          e.showAllRole(true);
          e.showAllRoleMoveAnim();
          e.isCanMove = true;
          r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.touchDisabled = true;
        }
        if ((i -= 1) > 0 && i <= 4) {
          r_SoundMgr.SoundMgr.playSound("woodenPeople/" + o[i - 1]);
          e.showXiGuaRoleQiPao(t[i - 1]);
        }
        if (i <= 0) {
          r_TimeSystem.TimeSystem.unregistSecondUpdate("xigua_CountDwon");
          if (!e.isGameOver) {
            e.showXiGuaRoleQiPao("", false);
            e.isCanMove = false;
            e.showAllRoleStopAnim();
            e.showXiGuaRoleAnim("xigua_zhuans", false);
            if (1 == e.curRound) {
              r_BehaviorMgr.BehaviorMgr.trigger("职业人倒地");
              r_PlayerData.PlayerData.data.woodenPeopleMap.isGuide || (e.newGuideTip.active = true);
            }
            e.time = 20;
            e.showOprationTime();
          }
        }
      }
    });
  };
  _ctor.prototype.otherRoleSay = function (e, t, o) {
    var i = ["我可没动你不要冤枉我", "是不是玩不起", "去看看眼科主任吧", "你行不行啊~细狗"];
    var n = r_UtilsSystem.UtilsSystem.getRandomNum(0, i.length - 1);
    this.otherRoleQipao.opacity = 255;
    var a = this.otherRoleQipao.getChildByName("label");
    a.getComponent(cc.Label).string = i[n];
    if (o && o.length > 0) {
      r_SoundMgr.SoundMgr.stopAllSound();
      r_SoundMgr.SoundMgr.playSound("woodenPeople/" + [["雪（我可没动）", "雪（是不是玩不起）", "雪（去看看眼科主任）", "雪（你行不行啊）"], ["扛狼（我可没动）", "扛狼（是不是玩不起）", "扛狼（去看看眼科主任吧）", "扛狼（你行不行啊）"], ["一戳毛（我可没动）", "一戳毛（是不是玩不起）", "一戳毛（去看看眼科主任）", "一戳毛（你行不行啊）"], ["阳光（我可没动）", "阳光（是不是玩不起）", "阳关（去看看眼科主任）", "阳关（你行不行啊）"], ["幼师（我可没动）", "幼师（是不是玩不起）", "幼师（去看看眼科主任）", "幼师（你行不行啊）"]][parseInt(o)][n]);
      this.otherRoleQipao.parent.setPosition(this.roleNodeList[parseInt(o)].getPosition());
      if (0 == parseInt(o) || 1 == parseInt(o)) {
        this.otherRoleQipao.parent.scaleX = -1;
        a.scaleX = -1;
      } else {
        this.otherRoleQipao.parent.scaleX = 1;
        a.scaleX = 1;
      }
    }
    cc.Tween.stopAllByTarget(this.otherRoleQipao);
    cc.tween(this.otherRoleQipao).delay(2).to(.5, {
      opacity: 0
    }).start();
  };
  _ctor.prototype.otherRoleSay1 = function (e, t, o) {
    var i = this;
    var n = ["我才不要，又想骗我动"];
    var a = r_UtilsSystem.UtilsSystem.getRandomNum(0, n.length - 1);
    this.otherRoleQipao.opacity = 255;
    var s = this.otherRoleQipao.getChildByName("label");
    s.getComponent(cc.Label).string = n[a];
    if (o && o.length > 0) {
      var r = o.split("|");
      r_TimeSystem.TimeSystem.scheduleOnce("otherRoleSay1", .2, function () {
        i.daojuNodeList[parseInt(r[0])].active = true;
        cc.tween().to(.1, {
          x: i.daojuNodeInitPosList[r[0]].x,
          y: i.daojuNodeInitPosList[r[0]].y
        }).start();
      });
      this.otherRoleQipao.parent.setPosition(this.roleNodeList[parseInt(r[1])].getPosition());
      if (0 == parseInt(r[1]) || 1 == parseInt(r[1])) {
        this.otherRoleQipao.parent.scaleX = -1;
        s.scaleX = -1;
      } else {
        this.otherRoleQipao.parent.scaleX = 1;
        s.scaleX = 1;
      }
    }
    cc.Tween.stopAllByTarget(this.otherRoleQipao);
    cc.tween(this.otherRoleQipao).delay(2).to(.5, {
      opacity: 0
    }).start();
  };
  _ctor.prototype.showKeSanQiPao = function () {
    var e = ["家人们谁懂啊"];
    r_SoundMgr.SoundMgr.stopAllSound();
    var t = r_UtilsSystem.UtilsSystem.getRandomNum(0, e.length - 1);
    r_SoundMgr.SoundMgr.playSound("woodenPeople/" + ["家人们谁懂啊"][t]);
    this.keSanQipao.opacity = 255;
    this.keSanQipao.parent.opacity = 255;
    this.keSanQipao.getChildByName("label").getComponent(cc.Label).string = e[t];
    cc.Tween.stopAllByTarget(this.keSanQipao);
    cc.tween(this.keSanQipao).delay(2).to(.5, {
      opacity: 0
    }).start();
  };
  _ctor.prototype.onClickSuccess = function (e, t, o) {
    this.curPass += 1;
    this.labCurPass.getComponent(cc.Label).string = "(" + this.curPass + "/6)";
    o && o.length > 0 && (this.finishRoleList[parseInt(o)] = true);
    this.curRoleMove -= 1;
    this.curRoleMove <= 0 && (this.isGameStart = true);
    if (this.curPass >= 6) {
      this.isCanMove = false;
      this.isGameStart = false;
      this.time = 0;
      r_SoundMgr.SoundMgr.playSound("woodenPeople/游戏胜利");
      r_TimeSystem.TimeSystem.scheduleOnce("clickwin", 1, function () {
        r_WoodenPeopleResultUI.default.showUI({
          mode: 1
        });
      });
    }
    this.checkVideoIsFinish();
  };
  _ctor.prototype.roleMove = function () {
    r_SoundMgr.SoundMgr.stopAllSound();
    this.curRoleMove += 1;
    this.isGameStart = false;
  };
  _ctor.prototype.setNewGuide = function () {
    r_PlayerData.PlayerData.data.woodenPeopleMap.isGuide = 1;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.setGameMusic = function () {};
  _ctor.prototype.calcAngle = function (e, t) {
    return t.sub(e).normalize().signAngle(cc.v2(1, 0)) / Math.PI * 180;
  };
  _ctor.prototype.onMoveJian = function (e, t, o) {
    var i = this;
    if (o && o.length > 0) {
      var n = parseInt(o);
      this.jianNode.active = true;
      this.jianNode.x = this.jianNodeInitPos.x;
      this.jianNode.y = this.jianNodeInitPos.y;
      var a = this.calcAngle(this.jianNode.getPosition(), cc.v2(this.roleNodeList[n].getPosition().x, this.roleNodeList[n].getPosition().y + 100));
      5 == n && (a = this.calcAngle(this.jianNode.getPosition(), cc.v2(this.roleNodeList[n].getPosition().x - 100, this.roleNodeList[n].getPosition().y)));
      this.jianNode.angle = 90 - a + 180;
      if (5 == n) {
        cc.tween(this.jianNode).to(.4, {
          x: this.roleNodeList[n].getPosition().x - 100,
          y: this.roleNodeList[n].getPosition().y
        }).call(function () {
          i.jianNode.active = false;
        }).start();
      } else {
        cc.tween(this.jianNode).to(.4, {
          x: this.roleNodeList[n].getPosition().x,
          y: this.roleNodeList[n].getPosition().y + 100
        }).call(function () {
          i.jianNode.active = false;
        }).start();
      }
    }
  };
  _ctor.prototype.showLevelTitel = function () {
    this.titleNode1.active = false;
    this.titleNode2.active = true;
    this.curLevel = 2;
    cc.tween(this.titleNode2).repeat(2, cc.tween().to(.2, {
      scale: 2
    }).to(.2, {
      scale: 1
    })).start();
  };
  _ctor.prototype.startLevel2 = function () {
    this.showOprationTime(false);
    this.showLevelTitel();
    r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan && r_GameKeyMgr.GameKeyMgr.add("触发科目三");
  };
  _ctor.prototype.showXiGuaRoleQiPao = function (e, t) {
    undefined === t && (t = true);
    if (t) {
      this.xiGuaRoleQipao.opacity = 255;
      this.xiGuaRoleQipao.getChildByName("label").getComponent(cc.Label).string = e;
    } else {
      this.xiGuaRoleQipao.opacity = 0;
    }
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
  _ctor.prototype.showBtnTipState = function (e) {
    undefined === e && (e = true);
    this.btnTip.getChildByName("video").active = e;
    this.btnTip.getChildByName("noVideo").active = !e;
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    var t = function (t) {
      if (o.gameTips[t].keyList.length > 0 && !r_CheckHasKeys.checkHasKeys(o.gameTips[t].keyList)) {
        return "continue";
      } else {
        if (o.gameTips[t].isGet) {
          o.isStop = true;
          r_CommonTipUI.CommonTipUI.showUI({
            desc: o.gameTips[t].anwserText,
            callback: function () {
              e.isStop = false;
            }
          });
        } else {
          r_PlatformSystem.PlatformSystem.showVideo("热梗合集提示", function () {
            e.gameTips[t].isGet = true;
            e.showBtnTipState(false);
            e.isStop = true;
            r_CommonTipUI.CommonTipUI.showUI({
              desc: e.gameTips[t].anwserText,
              callback: function () {
                e.isStop = false;
              }
            });
          });
        }
        return "break";
      }
    };
    var o = this;
    for (var i = 0; i < this.gameTips.length && "break" !== t(i); i++) {
      ;
    }
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.touchStartPos = e.getLocation();
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.startID = e.getID();
      this.moveInfo = null;
      if (!(this.curLevel <= 1) && !this.isTirggerCaiDan && !this.isGameOver && r_UtilsSystem.UtilsSystem.touchInNode(this.bulletLayer, this.touchStartPos)) {
        this.createBullet(this.touchStartPos);
        for (var t = 0; t < this.clickNodeList.length; t++) {
          if (r_UtilsSystem.UtilsSystem.touchInNode(this.clickNodeList[t], this.touchStartPos) && (t == s.右上 || t == s.右下 ? (this.keSanRole.x -= 50, this.keSanRole.x < -300 && (this.keSanRole.x = -300, this.keSanRole.x += 50)) : t == s.左上 || t == s.左下 ? (this.keSanRole.x += 50, this.keSanRole.x > 300 && (this.keSanRole.x = 300, this.keSanRole.x -= 50)) : t == s.上 ? (this.keSanRole.y -= 20, this.keSanRole.y < -100 && (this.keSanRole.y = -100, this.keSanRole.x += 50, this.keSanRole.x > 300 && (this.keSanRole.x = 300, this.keSanRole.x -= 50))) : t == s.下 && (this.keSanRole.y += 20, this.keSanRole.y > 200 && (this.keSanRole.y = 200, this.keSanRole.x -= 50, this.keSanRole.x < -300 && (this.keSanRole.x = -300, this.keSanRole.x += 50))), this.totalHitCount += 1, this.showKeSanRoleAct(t), this.isChangeBullet && (this.curHitCount += 1), this.curHitCount >= 50)) {
            this.isGameOver = true;
            this.isGameStart = false;
            r_SoundMgr.SoundMgr.playSound("woodenPeople/游戏胜利");
            r_BehaviorMgr.BehaviorMgr.trigger("游戏失败");
            return void r_TimeSystem.TimeSystem.scheduleOnce("clickwin", 2, function () {
              r_WoodenPeopleResultUI.default.showUI({
                mode: 2
              });
            });
          }
        }
      }
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else if (this.moveInfo) {
      var t = e.getLocation().subtract(this.touchStartPos);
      var o = this.touchStartPos.add(t);
      var i = this.moveInfo.node.parent.convertToNodeSpaceAR(o);
      this.moveInfo.node.setPosition(i);
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    this.startID = null;
    this.moveInfo && this.moveInfo.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
  };
  _ctor.prototype.onTouchCancel = function () {
    this.startID = null;
    this.moveInfo = null;
    this.moveInfo.node.setPosition(this.moveInfo.mirrorOriginPos);
  };
  _ctor.prototype.changeBullet = function () {
    this.isChangeBullet = true;
    r_UtilsSystem.UtilsSystem.showTip("装备加特林武器");
  };
  _ctor.prototype.caiDanAddMoney = function () {
    this.isTirggerCaiDan = false;
    if (!r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan) {
      r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan = 1;
      r_PlayerData.PlayerData.saveData();
      r_PlayerData.PlayerData.addCoin("热梗合集", 1e7);
    }
  };
  _ctor.prototype.resetKeSanAct = function () {
    this.keSanRole.getChildByName("role").getComponent(cc.Sprite).spriteFrame = this.clickSpriteFrameList[this.clickSpriteFrameList.length - 1];
  };
  _ctor.prototype.showKeSanRoleAct = function (e) {
    var t = this;
    this.keSanRole.getChildByName("role").getComponent(cc.Sprite).spriteFrame = this.clickSpriteFrameList[e];
    this.totalHitCount > 0 && this.totalHitCount % 30 == 0 && this.showKeSanQiPao();
    this.keSanActList.push(e);
    var o = false;
    if (this.keSanActList.length > 6 && !this.isTirggerCaiDan && !r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan) {
      for (var i = P.length - 1; i >= 0; i--) {
        if (P[i] != this.keSanActList[this.keSanActList.length - 1 - (P.length - 1 - i)]) {
          o = false;
          break;
        }
        o = true;
      }
    }
    this.isTirggerCaiDan || !o || r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan || (this.isTirggerCaiDan = true);
    r_TimeSystem.TimeSystem.scheduleClear("kesanAct");
    r_TimeSystem.TimeSystem.scheduleOnce("kesanAct", .3, function () {
      t.resetKeSanAct();
      if (1 == t.isTirggerCaiDan && o && !r_PlayerData.PlayerData.data.woodenPeopleMap.getCaidan) {
        t.isTirggerCaiDan = true;
        r_BehaviorMgr.BehaviorMgr.trigger("触发科目三");
        t.setGameMusic(null, null, 0);
        r_WoodenPeopleUI.WoodenPeopleUI.Inst && r_WoodenPeopleUI.WoodenPeopleUI.Inst.showBackVisible(false);
        r_TimeSystem.TimeSystem.scheduleOnce("kesan", 20, function () {
          r_WoodenPeopleUI.WoodenPeopleUI.Inst && r_WoodenPeopleUI.WoodenPeopleUI.Inst.showBackVisible(true);
          t.setGameMusic(null, null, 1);
          t.checkVideoIsFinish();
        });
      }
    });
  };
  _ctor.prototype.createBullet = function (e) {
    if (this.bulletNodeList.length > 500) {
      this.bulletNodeList[0].destroy();
      this.bulletNodeList.splice(0, 1);
    }
    var t = this.bulletLayer.convertToNodeSpaceAR(e);
    var o = cc.instantiate(this.bulletNode);
    if (this.isChangeBullet) {
      o.getComponent(cc.Sprite).spriteFrame = this.bulletSpriteFrame[0];
      r_SoundMgr.SoundMgr.playSound("woodenPeople/加特林音效");
    } else {
      r_SoundMgr.SoundMgr.playSound("woodenPeople/弓箭音效");
    }
    this.bulletLayer.addChild(o);
    o.setPosition(t);
    this.bulletNodeList.push(o);
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "西瓜人物"
  })], _ctor.prototype, "xiGuaRole", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "西瓜人物气泡"
  })], _ctor.prototype, "xiGuaRoleQipao", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "其他人物气泡"
  })], _ctor.prototype, "otherRoleQipao", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "科目三人物气泡"
  })], _ctor.prototype, "keSanQipao", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "新手引导提示"
  })], _ctor.prototype, "newGuideTip", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "操作倒计时节点"
  })], _ctor.prototype, "oprationTimeNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "当前成功的个数"
  })], _ctor.prototype, "labCurPass", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "标题1"
  })], _ctor.prototype, "titleNode1", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "标题2"
  })], _ctor.prototype, "titleNode2", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "科目三主角"
  })], _ctor.prototype, "keSanRole", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "终点线"
  })], _ctor.prototype, "lineNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "马桶塞子"
  })], _ctor.prototype, "jianNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示按钮"
  })], _ctor.prototype, "btnTip", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "玩家节点"
  })], _ctor.prototype, "roleNodeList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "拖动道具节点"
  })], _ctor.prototype, "daojuNodeList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "科目三动作点击碰撞节点"
  })], _ctor.prototype, "clickNodeList", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "科目三动作精灵帧"
  })], _ctor.prototype, "clickSpriteFrameList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "子弹层"
  })], _ctor.prototype, "bulletLayer", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "子弹节点"
  })], _ctor.prototype, "bulletNode", undefined);
  __decorate([_property({
    type: cc.SpriteFrame,
    displayName: "子弹精灵帧"
  })], _ctor.prototype, "bulletSpriteFrame", undefined);
  __decorate([_property({
    type: [_],
    tooltip: "提示列表"
  })], _ctor.prototype, "gameTips", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_WoodenPeopleLogic;