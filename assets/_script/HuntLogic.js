var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s;
var r;
var c;
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TimeSystem = require("TimeSystem");
var r_PlayerData = require("PlayerData");
var r_SoundMgr = require("SoundMgr");
var r_LevelPreload = require("LevelPreload");
var r_HuntResult = require("HuntResult");
var r_PicLabel1 = require("PicLabel1");
(function (e) {
  e[e["向左"] = -1] = "向左";
  e[e["向右"] = 1] = "向右";
})(s || (s = {}));
(function (e) {
  e[e["狼"] = 0] = "狼";
  e[e["兔子"] = 1] = "兔子";
})(r || (r = {}));
(function (e) {
  e[e["待机"] = 0] = "待机";
  e[e["跑"] = 1] = "跑";
  e[e["死掉"] = 2] = "死掉";
})(c || (c = {}));
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_HuntLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.gameBg = null;
    t.sceneList = [];
    t.click = null;
    t.tipNode = null;
    t.tipTargetNode = null;
    t.gunAnimNode = null;
    t.arrowAnimNode = null;
    t.labCount = null;
    t.curBullet = null;
    t.curArrow = null;
    t.targetNode = null;
    t.targetArea1 = null;
    t.targetArea2 = null;
    t.targetArea3 = null;
    t.bulletLayer = null;
    t.arrawStartPos = null;
    t.bulletStartPos = null;
    t.arrowNode = null;
    t.bulletNode = null;
    t.arrowPointNode = null;
    t.bulletPointNode = null;
    t.langNode = null;
    t.tuziNode = null;
    t.labHit = null;
    t.langPos = [];
    t.limit = 300;
    t.m_cdTime = 0;
    t.m_canFir = true;
    t.m_isGameOver = false;
    t.m_weaponType = 1;
    t.m_curData = null;
    t.m_curDir = 1;
    t.m_curCount = 0;
    t.m_bulletList = [];
    t.m_curLevel = 1;
    t.m_targetList = [];
    t.m_hitCount = 0;
    t.m_hitTuzi = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.registTouch();
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.update = function (e) {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
    if (!this.m_isGameOver) {
      this.targetMove();
      this.weaponMove();
      this.IsNoArrowInScreen() && this.checkIsGameOver();
    }
  };
  _ctor.prototype.failLevel = function () {};
  _ctor.prototype.loadPreload = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
    this.init();
    return null;
  };
  _ctor.prototype.passLevel = function () {};
  _ctor.prototype.init = function () {
    this.refreshHitLabel();
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
    this.tipNode && cc.Tween.stopAllByTarget(this.tipNode);
  };
  _ctor.prototype.startGame = function (e, t) {
    var o = this;
    this.m_weaponType = e;
    this.m_curData = t;
    this.m_curCount = this.m_curData.arrowCount;
    this.m_curDir = s.向左;
    this.m_hitTuzi = false;
    1 == r_UtilsSystem.UtilsSystem.getRandomNum(0, 1) && (this.m_curDir = s.向右);
    if (1 == this.m_weaponType) {
      this.arrowAnimNode.active = true;
      this.gunAnimNode.active = false;
      this.curArrow.active = true;
      this.curBullet.active = false;
    } else {
      this.arrowAnimNode.active = false;
      this.gunAnimNode.active = true;
      this.curArrow.active = false;
      this.curBullet.active = true;
    }
    this.refreshWeaponLabel();
    this.m_isGameOver = true;
    var i = 3;
    if (r_PlayerData.PlayerData.data.huntMap.isGuide) {
      this.m_curLevel = 2;
      this.showScene(2);
      if (r_PlayerData.PlayerData.data.huntMap.isGuide2) {
        i = 1;
      } else {
        this.showGirlTip(3, true);
      }
    } else {
      this.m_curLevel = 1;
      this.showScene(1);
      this.showGirlTip(1, true);
      i = 3;
    }
    r_TimeSystem.TimeSystem.scheduleOnce("huntStart", i, function () {
      o.showGirlTip(1, false);
      o.m_isGameOver = false;
      o.showAnimalRun(c.跑);
    });
  };
  _ctor.prototype.showNextScene = function () {
    var e = this;
    this.m_isGameOver = true;
    this.showGirlTip(2, true);
    r_TimeSystem.TimeSystem.scheduleOnce("huntStart2", 2, function () {
      e.m_curLevel = 2;
      e.showScene(2);
      e.showGirlTip(3, true);
      r_PlayerData.PlayerData.data.huntMap.isGuide = 1;
      r_PlayerData.PlayerData.saveData();
    });
    r_TimeSystem.TimeSystem.scheduleOnce("huntStart3", 4, function () {
      e.showGirlTip(1, false);
      e.m_isGameOver = false;
      e.showAnimalRun(c.跑);
    });
  };
  _ctor.prototype.showScene = function (e) {
    undefined === e && (e = 1);
    for (var t = 0; t < this.sceneList.length; t++) {
      this.sceneList[t].active = t == e - 1;
    }
    2 == e && this.randomLangPos();
  };
  _ctor.prototype.continueGame = function () {
    this.m_isGameOver = false;
    this.m_hitTuzi = false;
    this.clearAllArrow();
    this.resetTuziState();
  };
  _ctor.prototype.targetMove = function () {
    if (this.targetNode.x <= -this.limit) {
      this.m_curDir = s.向右;
    } else {
      this.targetNode.x >= this.limit && (this.m_curDir = s.向左);
    }
    if (1 == this.m_curLevel) {
      this.targetNode.x += this.m_curDir * this.m_curData.targetSpeed;
    } else {
      for (var e = 0; e < this.m_targetList.length; e++) {
        if (this.m_targetList[e].state != c.死掉) {
          if (this.m_targetList[e].node.x <= -this.limit) {
            this.m_targetList[e].dir = s.向右;
            this.m_targetList[e].node.scaleX = -1;
          } else if (this.m_targetList[e].node.x >= this.limit) {
            this.m_targetList[e].dir = s.向左;
            this.m_targetList[e].node.scaleX = 1;
          }
          this.m_targetList[e].node.x += this.m_targetList[e].dir * this.m_targetList[e].speed;
        }
      }
    }
  };
  _ctor.prototype.weaponMove = function () {
    for (var e = 0; e < this.m_bulletList.length; e++) {
      if (!this.m_bulletList[e].isFinish) {
        if (1 == this.m_curLevel) {
          if (this.checkPolygonInPolygon(this.m_bulletList[e].node, this.targetArea1)) {
            this.createArrowPoint(true, this.m_bulletList[e].node);
            this.m_bulletList[e].isFinish = true;
            this.m_bulletList[e].node.destroy();
            this.clearAllArrow();
            this.showNextScene();
          } else if (this.checkPolygonInPolygon(this.m_bulletList[e].node, this.targetArea2)) {
            this.createArrowPoint(true, this.m_bulletList[e].node);
            this.m_bulletList[e].isFinish = true;
            this.m_bulletList[e].node.destroy();
          } else if (this.checkPolygonInPolygon(this.m_bulletList[e].node, this.targetArea3)) {
            this.createArrowPoint(true, this.m_bulletList[e].node);
            this.m_bulletList[e].isFinish = true;
            this.m_bulletList[e].node.destroy();
          } else if (this.checkPolygonInPolygon(this.m_bulletList[e].node, this.bulletLayer)) {
            this.createArrowPoint(false);
            this.m_bulletList[e].isFinish = true;
            this.m_bulletList[e].node.destroy();
          }
        } else {
          for (var t = 0; t < this.m_targetList.length; t++) {
            this.m_targetList[t].state != c.死掉 && this.m_targetList[t].index != this.m_bulletList[e].index && (this.m_hitTuzi || this.checkPolygonInPolygon(this.m_bulletList[e].node, this.m_targetList[t].node) && (this.m_targetList[t].index = this.m_bulletList[e].index, this.m_targetList[t].type == r.兔子 ? (this.m_targetList[t].state = c.死掉, this.showAnimalRun(c.死掉), r_SoundMgr.SoundMgr.playSound("hunt/击中音效"), this.m_hitTuzi = true) : (this.m_targetList[t].hp -= this.m_weaponType, r_SoundMgr.SoundMgr.playSound("hunt/击中音效"), this.m_targetList[t].hp <= 0 && (this.m_hitCount += 1, this.m_targetList[t].state = c.死掉, this.showAnimalRun(c.死掉), this.refreshHitLabel()), this.updateHp())));
          }
        }
        if (1 == this.m_weaponType) {
          this.m_bulletList[e].node.y += this.m_curData.arrawSpeed;
        } else {
          this.m_bulletList[e].node.y += this.m_curData.bulletSpeed;
        }
        if (this.m_bulletList[e].node && this.m_bulletList[e].node.y > 1e3) {
          this.m_bulletList[e].isFinish = true;
          this.m_bulletList[e].node.destroy();
        }
      }
    }
  };
  _ctor.prototype.IsNoArrowInScreen = function () {
    for (var e = 0; e < this.m_bulletList.length; e++) {
      if (!this.m_bulletList[e].isFinish) {
        return false;
      }
    }
    return true;
  };
  _ctor.prototype.clearAllArrow = function () {
    for (var e = 0; e < this.m_bulletList.length; e++) {
      if (!this.m_bulletList[e].isFinish) {
        this.m_bulletList[e].isFinish = true;
        this.m_bulletList[e].node.destroy();
      }
    }
  };
  _ctor.prototype.checkIsGameOver = function () {
    for (var e = 0; e < this.m_targetList.length; e++) {
      if (this.m_targetList[e].type == r.兔子 && this.m_targetList[e].state == c.死掉) {
        return void this.showGameOver(false);
      }
    }
    if (this.m_hitCount >= 6) {
      r_PlayerData.PlayerData.data.huntMap.pass = 1;
      r_PlayerData.PlayerData.saveData();
      this.showGameOver(true);
    }
  };
  _ctor.prototype.resetTuziState = function () {
    for (var e = 0; e < this.m_targetList.length; e++) {
      var t = this.m_targetList[e].node.getChildByName("动画");
      if (this.m_targetList[e].type == r.兔子) {
        this.m_targetList[e].state = c.跑;
        this.showNodeSpineAnim(t, "walk", true);
      }
    }
  };
  _ctor.prototype.randomLangPos = function () {
    var e = r_UtilsSystem.UtilsSystem.getRandomNum(2, 4);
    var t = cc.instantiate(this.tuziNode);
    t.setPosition(this.langPos[e].getPosition());
    this.sceneList[1].addChild(t);
    var o = s.向左;
    1 == r_UtilsSystem.UtilsSystem.getRandomNum(0, 1) && (o = s.向右);
    t.scaleX = o == s.向左 ? 1 : -1;
    this.m_targetList.push({
      node: t,
      type: r.兔子,
      index: -1,
      state: c.待机,
      hp: 1,
      dir: o,
      speed: this.m_curData.tuziSpeed
    });
    for (var i = 0; i < this.langPos.length; i++) {
      if (i != e) {
        var n = cc.instantiate(this.langNode);
        n.setPosition(this.langPos[i].getPosition());
        this.sceneList[1].addChild(n);
        n.x = r_UtilsSystem.UtilsSystem.getRandomNum(-200, 200);
        var a = s.向左;
        1 == r_UtilsSystem.UtilsSystem.getRandomNum(0, 1) && (a = s.向右);
        n.scaleX = a == s.向左 ? 1 : -1;
        this.m_targetList.push({
          node: n,
          type: r.狼,
          index: -1,
          state: c.待机,
          hp: 2,
          dir: a,
          speed: r_UtilsSystem.UtilsSystem.getRandomFromArr(this.m_curData.langSpeed)
        });
      }
    }
    this.updateHp();
    this.showAnimalRun(c.待机);
  };
  _ctor.prototype.showAnimalRun = function (e) {
    undefined === e && (e = c.待机);
    var t = "idle";
    if (e == c.跑) {
      t = "walk";
    } else {
      e == c.死掉 && (t = "dead");
    }
    for (var o = 0; o < this.m_targetList.length; o++) {
      if (e != c.死掉 || e == this.m_targetList[o].state) {
        var i = this.m_targetList[o].node.getChildByName("动画");
        this.showNodeSpineAnim(i, t, true);
      }
    }
  };
  _ctor.prototype.updateHp = function () {
    for (var e = 0; e < this.m_targetList.length; e++) {
      if (this.m_targetList[e].type == r.狼) {
        var t = this.m_targetList[e].node.getChildByName("progress");
        t.getComponent(cc.ProgressBar).progress = this.m_targetList[e].hp / 2;
        if (this.m_targetList[e].hp <= 0 || this.m_targetList[e].hp / 2 == 1) {
          t.active = false;
        } else {
          t.active = true;
        }
      }
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
  _ctor.prototype.showGameOver = function (e) {
    var t = this;
    undefined === e && (e = true);
    this.m_isGameOver = true;
    r_TimeSystem.TimeSystem.scheduleOnce("resultSuccess", 1, function () {
      if (e) {
        r_HuntResult.HuntResult.showUI({
          mode: 1,
          count: t.m_hitCount,
          rewardMoneyList: t.m_curData.rewardMoneyList
        });
      } else {
        r_HuntResult.HuntResult.showUI({
          mode: 0,
          count: t.m_hitCount,
          rewardMoneyList: t.m_curData.rewardMoneyList
        });
      }
    });
  };
  _ctor.prototype.onClickAdd = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    var t = "子弹";
    1 == this.m_weaponType && (t = "箭");
    r_PlatformSystem.PlatformSystem.showVideo("狩猎增加子弹", function () {
      e.m_isGameOver = false;
      e.m_curCount += e.m_curData.videoAdd;
      e.refreshWeaponLabel();
      r_UtilsSystem.UtilsSystem.showTip("恭喜增加" + e.m_curData.videoAdd + "个" + t);
    });
  };
  _ctor.prototype.onClickJump = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    r_PlatformSystem.PlatformSystem.showVideo("狩猎跳过练习", function () {
      e.showNextScene();
    });
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
  _ctor.prototype.showGirlTip = function (e, t, o) {
    undefined === t && (t = true);
    this.tipNode.active = true;
    var i = this.tipNode.getChildByName("提示1");
    var n = this.tipNode.getChildByName("提示2");
    var a = this.tipNode.getChildByName("提示3");
    if (t) {
      i.active = false;
      n.active = false;
      a.active = false;
      this.tipNode.x = -1e3;
      cc.tween(this.tipNode).to(1, {
        x: this.tipTargetNode.x
      }).call(function () {
        if (1 == e) {
          i.active = true;
          r_SoundMgr.SoundMgr.playSound("hunt/点击屏幕发射");
        } else if (2 == e) {
          n.active = true;
          r_SoundMgr.SoundMgr.playSound("hunt/我们去猎场吧");
        } else {
          a.active = true;
          r_PlayerData.PlayerData.data.huntMap.isGuide2 = 1;
          r_PlayerData.PlayerData.saveData();
        }
        o && o();
      }).start();
    } else {
      cc.tween(this.tipNode).to(1, {
        x: -1e3
      }).call(function () {
        o && o();
      }).start();
    }
  };
  _ctor.prototype.refreshWeaponLabel = function () {
    this.labCount.setString("x" + this.m_curCount);
  };
  _ctor.prototype.refreshHitLabel = function () {
    this.labHit.getComponent(cc.Label).string = "(" + this.m_hitCount + "/6)";
  };
  _ctor.prototype.shooting = function () {
    var e = this;
    if (this.m_canFir) {
      this.m_curCount -= 1;
      if (this.m_curCount < 0) {
        var t = "子弹";
        1 == this.m_weaponType && (t = "箭");
        this.m_isGameOver = true;
        return void r_TimeSystem.TimeSystem.scheduleOnce("alert_1", .1, function () {
          r_UtilsSystem.UtilsSystem.showAlert("是否观看广告增加10个" + t, 2, function () {
            e.m_isGameOver = false;
            e.m_curCount += e.m_curData.videoAdd;
            e.refreshWeaponLabel();
            r_UtilsSystem.UtilsSystem.showTip("恭喜增加" + e.m_curData.videoAdd + "个" + t);
          }, e, "提示", "确定", "取消", function () {
            e.m_isGameOver = false;
          });
        });
      }
      this.m_canFir = false;
      this.refreshWeaponLabel();
      if (1 == this.m_weaponType) {
        this.showNodeSpineAnim(this.arrowAnimNode, "attack", false, null, function () {
          e.createArrow();
          e.m_canFir = true;
        });
      } else {
        this.showNodeSpineAnim(this.gunAnimNode, "skill", false, null, function () {
          e.createArrow();
          e.m_canFir = true;
        });
      }
    }
  };
  _ctor.prototype.createArrow = function () {
    var e = null;
    if (1 == this.m_weaponType) {
      (e = cc.instantiate(this.arrowNode)).x = this.arrawStartPos.x;
      e.y = this.arrawStartPos.y;
      r_SoundMgr.SoundMgr.playSound("hunt/射箭音效");
    } else {
      (e = cc.instantiate(this.bulletNode)).x = this.bulletStartPos.x;
      e.y = this.bulletStartPos.y;
      r_SoundMgr.SoundMgr.playSound("hunt/枪声");
    }
    this.gameBg.addChild(e);
    this.m_bulletList.push({
      node: e,
      index: this.m_bulletList.length,
      isFinish: false
    });
  };
  _ctor.prototype.createArrowPoint = function (e, t) {
    undefined === e && (e = false);
    var o = null;
    (o = 1 == this.m_weaponType ? cc.instantiate(this.arrowPointNode) : cc.instantiate(this.bulletPointNode)).x = 0;
    o.y = 0;
    if (e) {
      var i = t.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var n = this.targetNode.convertToNodeSpaceAR(i);
      o.x = n.x;
      this.targetNode.addChild(o);
    } else {
      this.bulletLayer.addChild(o);
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
  _ctor.prototype.onTouchStart = function (e) {
    this.m_touchStartPos = e.getLocation();
    if (this.m_startID && this.m_startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.m_startID = e.getID();
      this.m_moveInfo = {};
      this.m_isGameOver || this.m_hitTuzi || r_UtilsSystem.UtilsSystem.touchInNode(this.click, this.m_touchStartPos) && this.shooting();
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
  _ctor.prototype.onTouchEnd = function () {
    this.m_startID = null;
    this.m_moveInfo && this.m_moveInfo.node;
    this.m_moveInfo = null;
  };
  _ctor.prototype.onTouchCancel = function () {
    this.m_startID = null;
    this.m_moveInfo && this.m_moveInfo.node && this.m_moveInfo.node.setPosition(this.m_moveInfo.mirrorOriginPos);
    this.m_moveInfo = null;
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "游戏背景"
  })], _ctor.prototype, "gameBg", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "游戏场景"
  })], _ctor.prototype, "sceneList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击发射"
  })], _ctor.prototype, "click", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示节点"
  })], _ctor.prototype, "tipNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示节点移动目标节点"
  })], _ctor.prototype, "tipTargetNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "手枪武器动画"
  })], _ctor.prototype, "gunAnimNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "弓箭武器动画"
  })], _ctor.prototype, "arrowAnimNode", undefined);
  __decorate([_property({
    type: r_PicLabel1.PicLabel1,
    displayName: "当前子弹/箭数量"
  })], _ctor.prototype, "labCount", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "当前子弹"
  })], _ctor.prototype, "curBullet", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "当前箭"
  })], _ctor.prototype, "curArrow", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "靶子"
  })], _ctor.prototype, "targetNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "靶子命中1"
  })], _ctor.prototype, "targetArea1", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "靶子命中2"
  })], _ctor.prototype, "targetArea2", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "靶子命中3"
  })], _ctor.prototype, "targetArea3", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "弹孔层"
  })], _ctor.prototype, "bulletLayer", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "箭射击开始位置"
  })], _ctor.prototype, "arrawStartPos", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "子弹射击开始位置"
  })], _ctor.prototype, "bulletStartPos", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "箭节点"
  })], _ctor.prototype, "arrowNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "子弹节点"
  })], _ctor.prototype, "bulletNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "箭尾吧节点"
  })], _ctor.prototype, "arrowPointNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "弹孔节点"
  })], _ctor.prototype, "bulletPointNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "狼节点"
  })], _ctor.prototype, "langNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "兔子"
  })], _ctor.prototype, "tuziNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "当前击毙财狼个数"
  })], _ctor.prototype, "labHit", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "狼兔子初始位置"
  })], _ctor.prototype, "langPos", undefined);
  __decorate([_property({
    type: Number,
    displayName: "靶子/狼移动范围(x轴)"
  })], _ctor.prototype, "limit", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_HuntLogic;