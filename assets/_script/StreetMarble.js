var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameDataMgr = require("GameDataMgr");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_LevelPreload = require("LevelPreload");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_TanqiuUI = require("TanqiuUI");
var r_TanqiuCfg = require("TanqiuCfg");
var r_BehaviorMgr = require("BehaviorMgr");
var r_ReportSystem = require("ReportSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_StreetMarble = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.titleLab = null;
    t.marbleNode = null;
    t.marbleSprite = null;
    t.marbleNodePos = new cc.Vec2(220, -145);
    t.marbleMaxSpeed = new cc.Vec2(0, 2e3);
    t.marbleMinSpeed = new cc.Vec2(0, 50);
    t.handNode = null;
    t.handNodePos = new cc.Vec2(224, -240);
    t.handMaxMoveDis = 80;
    t.blackHoleNodes = [];
    t.specialBlackHoleNode = null;
    t.flyWheelNode = null;
    t.flyWheelSpeed = 100;
    t.socreLabel = null;
    t.marbleCountLabel = null;
    t.targetScore = 1e8;
    t.initMarbleCount = 999999999;
    t.threeMarbleRate = 5;
    t.itemScoreNode = [];
    t.assets = [];
    t.sf0 = [];
    t.sf1 = [];
    t.sf2 = [];
    t.sf3 = [];
    t.blackHoleSfs = [];
    t.anim = null;
    t.moveTouchPos = null;
    t.moveDistance = 0;
    t.marbleLineSpeed = null;
    t.itemSocreList = [];
    t.curScore = 0;
    t.curMarbleCount = 0;
    t.startCheckTime = null;
    t.startCheckPos = null;
    t.checkTime = 500;
    t.blackHoleNodeList = [];
    t.curDouble = 0;
    t.curFlyWheelSpeed = 0;
    t.randomMarFlag = false;
    t.isStartGame = false;
    t.isOverGame = false;
    t.gameBeforeScore = 0;
    t.tempColor = cc.color(255, 255, 255, 255);
    t.m_tempVect = cc.v2();
    t.isTouchMove = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.loadPreload = function () {
    return __awaiter(this, undefined, Promise, function () {
      return __generator(this, function (e) {
        switch (e.label) {
          case 0:
            return [4, this.init()];
          case 1:
            e.sent();
            return [2, null];
        }
      });
    });
  };
  _ctor.prototype.passLevel = function () {
    this.isPlayAnim = true;
    this.isPause = true;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    cc.director.getPhysicsManager().enabled = false;
  };
  _ctor.prototype.failLevel = function () {
    r_TimeSystem.TimeSystem.scheduleClear("perAnim3");
    this.isPlayAnim = true;
    this.isPause = true;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    cc.director.getPhysicsManager().enabled = false;
  };
  _ctor.prototype.onLoad = function () {
    var t = this;
    e.prototype.onLoad.call(this);
    cc.director.getPhysicsManager().enabled = true;
    this.anim.setCompleteListener(function () {
      t.anim.node.active = false;
      r_TanqiuUI.default.instance.changeCaidan();
      t.resetGame();
      r_TanqiuUI.default.instance.next();
    });
  };
  _ctor.prototype.init = function () {
    return __awaiter(this, undefined, undefined, function () {
      return __generator(this, function () {
        this.lvDir = r_GameDataMgr.default.getSoundDir();
        this.curMarbleCount = this.initMarbleCount;
        this.curFlyWheelSpeed = this.flyWheelSpeed;
        this.initGame();
        this.registTouch();
        return [2];
      });
    });
  };
  _ctor.prototype.initGame = function () {
    this.curScore = 0;
    this.updateScore();
    this.updateMarbleLabel();
    this.flyWheelNode.getComponent(cc.RigidBody).angularVelocity = this.curFlyWheelSpeed;
    this.resetGame();
  };
  _ctor.prototype.resetGame = function () {
    var e = this;
    this.caiLeft.x = -157;
    this.caiRight.x = -99;
    if (this.blackHoleNodeList.length > 0) {
      for (var t = 0; t < this.blackHoleNodeList.length; t++) {
        this.blackHoleNodeList[t].active = false;
        this.blackHoleNodeList[t].removeFromParent(true);
        this.blackHoleNodeList[t].parent = null;
      }
    }
    this.blackHoleNodeList = [];
    this.randomMarFlag = false;
    this.isOverGame = false;
    this.isStartGame = false;
    this.marbleNode.active = true;
    this.blackHoleNodes.forEach(function (t) {
      t.getComponent(cc.Animation) && t.getComponent(cc.Animation).resume();
      t.getComponent(cc.RigidBody).enabledContactListener = true;
      t.scale = 1;
      t.spriteCom.spriteFrame = e.blackHoleSfs[0];
    });
    this.specialBlackHoleNode.getComponent(cc.RigidBody).enabledContactListener = true;
    this.blackHoleNodes[1].active = false;
    this.blackHoleNodes[2].active = false;
    this.startCheckPos = null;
    this.startCheckTime = null;
    this.updateScore();
    this.marbleNode.setPosition(this.marbleNodePos);
    this.isTouchMove = true;
    this.anim.node.active = false;
  };
  _ctor.prototype.changeScene = function () {
    var e = r_TanqiuUI.default.instance.index;
    this.itemSocreList = r_TanqiuCfg.TanqiuAwardCfg[e];
    var t = this["sf" + e];
    this.assets.forEach(function (e, o) {
      var i = t[o];
      e.spriteFrame = i;
    });
    this.marbleSprite.spriteCom.spriteFrame = t[12];
    if (3 == e) {
      this.blackHoleNodes.forEach(function (e) {
        e.active = false;
      });
      this.specialBlackHoleNode.active = true;
    } else {
      this.specialBlackHoleNode.active = false;
      this.blackHoleNodes.forEach(function (e) {
        e.active = false;
      });
      this.blackHoleNodes[0].active = true;
    }
    this.resetGame();
  };
  _ctor.prototype.updateScore = function (e) {
    var t = this.numberToUnitString(this.curScore);
    this.socreLabel && (this.socreLabel.string = t);
    if (e) {
      r_UtilsSystem.UtilsSystem.showTip(this.numberToUnitString(e));
      r_SoundMgr.SoundMgr.playSound("lv0119/得钱音效");
    }
  };
  _ctor.prototype.setBlackHole = function () {
    for (var e = 0; e < this.blackHoleNodes.length; e++) {
      var t = this.blackHoleNodes[e];
      t.scale = 0;
      cc.tween(t).to(.2, {
        scale: 1.2
      }).start();
      t.active = true;
      t.spriteCom.spriteFrame = this.blackHoleSfs[1];
    }
  };
  _ctor.prototype.setBlackHole2 = function () {
    for (var e = 0; e < this.blackHoleNodes.length; e++) {
      this.blackHoleNodes[e].active = false;
    }
    this.specialBlackHoleNode.active = true;
  };
  _ctor.prototype.numberToUnitString = function (e) {
    var t = 0;
    var o = 0;
    var i = "";
    var n = "";
    var a = "";
    if (Math.abs(e / 1e8) >= 1) {
      t = Math.abs(e / 1e8);
    } else if (Math.abs(e / 1e4) >= 0) {
      var s = e - 1e10 * t;
      o = Math.abs(Math.floor(s / 1e4));
    }
    e < 0 && (i = "负");
    t > 0 && (n = t + "亿");
    o > 0 && (a = o + "万");
    if ("" == i && "" == n && "" == a) {
      return e + "";
    } else {
      return i + n + a;
    }
  };
  _ctor.prototype.registTouch = function () {
    this.handNode.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.handNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.handNode.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    this.handNode.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    this.marbleNode.getComponent(cc.RigidBody).onBeginContact = this.onBeginContact.bind(this);
    this.marbleNode.getComponent(cc.RigidBody).onEndContact = this.onEndContact.bind(this);
    this.marbleNode.getComponent(cc.RigidBody).onPreSolve = this.onPreSolve.bind(this);
    this.marbleNode.getComponent(cc.RigidBody).onPostSolve = this.onPostSolve.bind(this);
  };
  _ctor.prototype.unregistTouch = function () {
    this.handNode.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.handNode.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.handNode.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    this.handNode.off(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
  };
  _ctor.prototype.touchStart = function (e) {
    if (!r_TanqiuUI.default.instance.imgMask.visible) {
      e.getLocation();
      return !this.isPlayAnim && undefined;
    }
    e = null;
  };
  _ctor.prototype.touchMove = function (e) {
    if (r_TanqiuUI.default.instance.imgMask.visible) {
      e = null;
    } else {
      var t = e.getLocation();
      var o = this.handNode.parent.convertToNodeSpaceAR(t);
      if (o.y >= this.handNodePos.y) {
        o.y = this.handNodePos.y;
      } else {
        o.y <= this.handNodePos.y - this.handMaxMoveDis && (o.y = this.handNodePos.y - this.handMaxMoveDis);
      }
      if (this.moveTouchPos) {
        if (o.y - this.moveTouchPos.y >= 0) {
          this.moveDistance = o.y - this.moveTouchPos.y;
          var i = (new Date().getTime() - this.moveTime) / 1e3;
          i < .05 && (i = .05);
          this.marbleLineSpeed = new cc.Vec2(0, (o.y - this.moveTouchPos.y) / i);
          this.limitMarbleSpeed();
        }
        this.moveTouchPos = new cc.Vec2(o.x, o.y);
        this.moveTime = new Date().getTime();
      } else {
        this.moveTouchPos = new cc.Vec2(o.x, o.y - 10);
        this.moveTime = new Date().getTime();
      }
      o.x = this.handNodePos.x;
      this.handNode.setPosition(o);
    }
  };
  _ctor.prototype.touchEnd = function () {
    var e = this;
    if (!r_TanqiuUI.default.instance.imgMask.visible) {
      this.isPlayAnim = true;
      cc.tween(this.handNode).to(.1, {
        position: new cc.Vec3(this.handNodePos.x, this.handNodePos.y, 0)
      }, {
        easing: cc.easing.sineOut
      }).call(function () {
        e.isPlayAnim = false;
      }).start();
      this.moveDistance = this.handNodePos.y - this.handNode.y;
      this.marbleLineSpeed = new cc.Vec2(0, this.moveDistance / .1);
      this.moveDistance > this.handMaxMoveDis - 20 && (this.marbleLineSpeed = new cc.Vec2(0, this.marbleMaxSpeed.y));
      this.limitMarbleSpeed();
      this.moveTouchPos = null;
      r_TimeSystem.TimeSystem.scheduleOnce("perAnim3", .1, function () {
        e.moveDistance = 0;
      });
    }
  };
  _ctor.prototype.onBeginContact = function (e, t, o) {
    var i = this;
    var n = o.getComponent(cc.PhysicsCollider);
    if (5 == n.tag && n.node.getComponent(cc.RigidBody).enabledContactListener) {
      if (this.blackHoleNodes.includes(n.node)) {
        n.node.getComponent(cc.Animation) && n.node.getComponent(cc.Animation).pause();
        n.node.getComponent(cc.RigidBody).enabledContactListener = false;
        var a = cc.instantiate(this.marbleSprite);
        a.setPosition(t.node.getPosition());
        a.parent = t.node.parent;
        a.active = true;
        t.node.active = false;
        cc.tween(a).to(.5, {
          position: new cc.Vec3(n.node.x, o.node.y, 0)
        }).to(.5, {
          scale: 0
        }).call(function () {
          a.removeFromParent(true);
          a.parent = null;
          i.randomMarble(n.node, t.node);
        }).start();
      } else if (n.node == this.specialBlackHoleNode) {
        n.node.getComponent(cc.Animation) && n.node.getComponent(cc.Animation).pause();
        n.node.getComponent(cc.RigidBody).enabledContactListener = false;
        var s = cc.instantiate(this.marbleSprite);
        s.setPosition(t.node.getPosition());
        s.parent = t.node.parent;
        s.active = true;
        t.node.active = false;
        cc.tween(s).to(.5, {
          position: new cc.Vec3(n.node.x, o.node.y, 0)
        }).to(.5, {
          scale: 0
        }).call(function () {
          s.removeFromParent(true);
          s.parent = null;
          i.randomMarble(n.node, t.node);
          r_TimeSystem.TimeSystem.schedule("lianxupengfa", 1, function () {
            i.randomMarble(n.node, t.node);
          }, 4);
        }).start();
      }
    }
    5 != n.tag && r_SoundMgr.SoundMgr.playSound("lv0119/弹球碰撞");
  };
  _ctor.prototype.onEndContact = function (e, t, o) {
    o.getComponent(cc.PhysicsCollider);
  };
  _ctor.prototype.onPreSolve = function (e, t, o) {
    var i = o.getComponent(cc.PhysicsCollider);
    i.tag;
    if (4 == i.tag) {
      if (this.moveDistance > 0) {
        this.marbleNode.getComponent(cc.RigidBody).linearVelocity = this.marbleLineSpeed;
        this.isStartGame = true;
      }
      this.marbleLineSpeed = null;
      this.moveTime = 0;
      this.moveTouchPos = null;
      this.moveDistance = 0;
    }
  };
  _ctor.prototype.onPostSolve = function (e, t, o) {
    o.getComponent(cc.PhysicsCollider);
  };
  _ctor.prototype.limitMarbleSpeed = function () {
    if (this.marbleLineSpeed.y < 10) {
      this.marbleLineSpeed.y = 0;
    } else if (this.marbleLineSpeed.y <= this.marbleMinSpeed.y) {
      this.marbleLineSpeed.y = this.marbleMinSpeed.y;
    } else {
      this.marbleLineSpeed.y >= this.marbleMaxSpeed.y && (this.marbleLineSpeed.y = this.marbleMaxSpeed.y);
    }
  };
  _ctor.prototype.update = function () {
    var e = this;
    if (!this.isOverGame && this.isStartGame && cc.Vec2.distance(this.marbleNodePos, this.marbleNode.getPosition()) > 2) {
      var t = new Date().getTime();
      if (this.startCheckTime) {
        if (t - this.startCheckTime > 100) {
          this.startCheckTime = null;
          var o = [this.marbleNode];
          var i = 0;
          for (var n = (o = o.concat(this.blackHoleNodeList)).length - 1; n >= 0; n--) {
            var a = o[n];
            a.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint(a.convertToWorldSpaceAR(cc.Vec2.ZERO), this.m_tempVect);
            var s = cc.Vec2.distance(this.m_tempVect, cc.Vec2.ZERO);
            s > i && (i = s);
          }
          var r = this.itemScoreNode.findIndex(function (t) {
            return e.checkPolygonInPolygon(t, e.marbleNode);
          });
          console.log("maxDis: ", i, r);
          i <= 5 && 0 != r && this.accountResult(o);
        }
      } else {
        this.startCheckPos = new cc.Vec2(this.marbleNode.x, this.marbleNode.y);
        this.startCheckTime = new Date().getTime();
      }
    }
  };
  _ctor.prototype.accountResult = function (e) {
    var t = this;
    var o = 0;
    this.isOverGame = true;
    e.forEach(function (e) {
      t.itemScoreNode.forEach(function (i, n) {
        t.checkPolygonInPolygon(e, i) && n > 0 && (o += t.itemSocreList[n - 1]);
      });
    });
    if (o >= 0) {
      r_PlayerData.PlayerData.addCoin("弹球获得", o, r_ReportSystem.SystemKey.弹球);
    } else {
      o = -o;
      if (r_PlayerData.PlayerData.isCoinEnough(o)) {
        r_PlayerData.PlayerData.deleteCoin("弹球损失", o, r_ReportSystem.SystemKey.弹球);
        r_UtilsSystem.UtilsSystem.showTip("损失" + r_UtilsSystem.UtilsSystem.getShowCoin(o));
      } else {
        r_PlayerData.PlayerData.deleteCoin("弹球损失", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.弹球, true);
        r_UtilsSystem.UtilsSystem.showTip("损失" + r_UtilsSystem.UtilsSystem.getShowCoin(r_PlayerData.PlayerData.bigCoin));
      }
    }
    if (this.isStartGame) {
      this.isTouchMove = false;
      if (r_TanqiuUI.default.instance.checkIsCaidan() && 2 == r_TanqiuUI.default.instance.index && 1 != this.blackHoleNodes[0].scale) {
        return void r_TimeSystem.TimeSystem.scheduleOnce("caidanTanqiu", 1, function () {
          t.anim.node.active = true;
          t.anim.setAnimation(0, "animation", false);
        });
      }
      if (!r_TanqiuUI.default.instance.checkIsCaidan() && 3 == r_TanqiuUI.default.instance.index) {
        r_TanqiuUI.default.instance.playEffect();
        return void r_TimeSystem.TimeSystem.scheduleOnce("huilaiTanqiu", .5, function () {
          r_TanqiuUI.default.instance.changeScene(2);
          t.resetGame();
          r_TanqiuUI.default.instance.next();
        });
      }
      this.resetGame();
      r_TanqiuUI.default.instance.next();
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
  _ctor.prototype.randomMarble = function (e, t) {
    var o = this;
    this.randomMarFlag = true;
    var i = 2;
    Math.floor(100 * Math.random()) < this.threeMarbleRate && (i = 3);
    i += 1 != e.scale ? 3 : 0;
    for (var n = 0; n < i - 1; n++) {
      var a = cc.instantiate(t);
      a.setPosition(e.getPosition());
      a.parent = t.parent;
      a.active = true;
      var s = 1e3 * Math.random() - 500;
      var r = 1e3 * Math.random() - 500;
      a.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(s, r);
      a.getComponent(cc.RigidBody).onBeginContact = this.onBeginContact.bind(this);
      this.blackHoleNodeList.push(a);
    }
    var c = 1e3 * Math.random() - 500;
    var l = 1e3 * Math.random() - 500;
    t.active = true;
    t.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(c, l);
    setTimeout(function () {
      r_SoundMgr.SoundMgr.playSound("lv0119/黑洞吐出");
      o.randomMarFlag = false;
    }, 100);
  };
  _ctor.prototype.videoAddDouble = function () {
    this.curDouble++;
    this.curDouble >= 5 && (this.curDouble = 5);
  };
  _ctor.prototype.videoAddMarbleCount = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    r_PlatformSystem.PlatformSystem.showVideo("加步数", function () {
      e.curMarbleCount += 5;
      e.updateMarbleLabel();
    }, function () {});
  };
  _ctor.prototype.updateMarbleLabel = function () {
    this.marbleCountLabel && this.curMarbleCount >= 0 && (this.marbleCountLabel.string = this.curMarbleCount + "个");
  };
  _ctor.prototype.addWheelFlySpeed = function () {
    this.curFlyWheelSpeed = this.flyWheelNode.getComponent(cc.RigidBody).angularVelocity;
    this.curFlyWheelSpeed += 20;
    this.curFlyWheelSpeed > 1e3 && (this.curFlyWheelSpeed = 1e3);
    this.flyWheelNode.getComponent(cc.RigidBody).angularVelocity = this.curFlyWheelSpeed;
  };
  _ctor.prototype.btnCaidan = function () {
    if (!(0 != r_PlayerData.PlayerData.data.tanqiuCaidan && cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER)) {
      r_BehaviorMgr.BehaviorMgr.triggerActions("游戏胜利");
      r_PlayerData.PlayerData.data.tanqiuCaidan++;
      cc.tween(this.caiLeft).to(.7, {
        x: -169
      }).start();
      cc.tween(this.caiRight).to(.7, {
        x: -87.299
      }).start();
    }
  };
  _ctor.prototype.colse = function () {
    r_TimeSystem.TimeSystem.scheduleClear("perAnim3");
    this.isPlayAnim = true;
    this.isPause = true;
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    cc.director.getPhysicsManager().enabled = false;
  };
  __decorate([_property({
    displayName: "游戏标题",
    type: cc.Node
  })], _ctor.prototype, "titleLab", undefined);
  __decorate([_property({
    displayName: "弹珠",
    type: cc.Node
  })], _ctor.prototype, "marbleNode", undefined);
  __decorate([_property({
    displayName: "弹珠黑洞碰撞使用",
    type: cc.Node
  })], _ctor.prototype, "marbleSprite", undefined);
  __decorate([_property({
    displayName: "弹珠初始位置",
    type: cc.Vec2
  })], _ctor.prototype, "marbleNodePos", undefined);
  __decorate([_property({
    displayName: "弹珠最大速度",
    type: cc.Vec2
  })], _ctor.prototype, "marbleMaxSpeed", undefined);
  __decorate([_property({
    displayName: "弹珠最小速度",
    type: cc.Vec2
  })], _ctor.prototype, "marbleMinSpeed", undefined);
  __decorate([_property({
    displayName: "手",
    type: cc.Node
  })], _ctor.prototype, "handNode", undefined);
  __decorate([_property({
    displayName: "手初始位置",
    type: cc.Vec2
  })], _ctor.prototype, "handNodePos", undefined);
  __decorate([_property({
    displayName: "向下移动的最大距离"
  })], _ctor.prototype, "handMaxMoveDis", undefined);
  __decorate([_property({
    displayName: "黑洞",
    type: [cc.Node]
  })], _ctor.prototype, "blackHoleNodes", undefined);
  __decorate([_property({
    displayName: "黑洞彩蛋",
    type: [cc.Node]
  })], _ctor.prototype, "specialBlackHoleNode", undefined);
  __decorate([_property({
    displayName: "飞轮",
    type: cc.Node
  })], _ctor.prototype, "flyWheelNode", undefined);
  __decorate([_property({
    displayName: "飞轮初始角速度"
  })], _ctor.prototype, "flyWheelSpeed", undefined);
  __decorate([_property({
    displayName: "得分label",
    type: cc.Label
  })], _ctor.prototype, "socreLabel", undefined);
  __decorate([_property({
    displayName: "弹珠个数label",
    type: cc.Label
  })], _ctor.prototype, "marbleCountLabel", undefined);
  __decorate([_property({
    displayName: "目标得分"
  })], _ctor.prototype, "targetScore", undefined);
  __decorate([_property({
    displayName: "开局球的个数"
  })], _ctor.prototype, "initMarbleCount", undefined);
  __decorate([_property({
    displayName: "黑洞发三个小球的概率"
  })], _ctor.prototype, "threeMarbleRate", undefined);
  __decorate([_property({
    displayName: "检测得分",
    type: cc.Node
  })], _ctor.prototype, "itemScoreNode", undefined);
  __decorate([_property([cc.Sprite])], _ctor.prototype, "assets", undefined);
  __decorate([_property([cc.SpriteFrame])], _ctor.prototype, "sf0", undefined);
  __decorate([_property([cc.SpriteFrame])], _ctor.prototype, "sf1", undefined);
  __decorate([_property([cc.SpriteFrame])], _ctor.prototype, "sf2", undefined);
  __decorate([_property([cc.SpriteFrame])], _ctor.prototype, "sf3", undefined);
  __decorate([_property([cc.SpriteFrame])], _ctor.prototype, "blackHoleSfs", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "caiLeft", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "caiRight", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "anim", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_StreetMarble;