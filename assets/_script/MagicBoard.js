var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_MagicBoardUI = require("MagicBoardUI");
var r_TimeSystem = require("TimeSystem");
var r_MagicBoardTipUI = require("MagicBoardTipUI");
var r_MagicBoardEndUI = require("MagicBoardEndUI");
var r_OpenBoxUI = require("OpenBoxUI");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_MagicBoard = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.gameTime = 30;
    t.guide = null;
    t.progress = null;
    t.knife = null;
    t.speed = 5;
    t.knifeAnimation = null;
    t.knifeAnimation2 = null;
    t.countDown = null;
    t.goldBrick = null;
    t.money = null;
    t.giftBox = null;
    t.superGiftBox = null;
    t.moneyNum = "1000,2000,3000,5000,8000,10000,20000,25000,32000,45000";
    t.goldBrickNum = "50000,60000,80000,100000,120000,150000,180000,200000,220000,300000";
    t.tipNode = null;
    t.rewardNode = null;
    t.progressAnim = null;
    t.clickNum = 0;
    t.startPos = null;
    t.times = 0;
    t.type = null;
    t.bigSkill = false;
    t.canGetReward = false;
    t.knifeAngle = 0;
    t.giftArr = [];
    t.moneyArr = [];
    t.goldArr = [];
    t.reward = {
      money: 0,
      gold: 0,
      giftBox: 0,
      superGiftBox: 0
    };
    t.magDis = cc.v2(0, 0);
    t.time = 0;
    t.millisecond = 0;
    t.rectDis = null;
    t.skill2_baseAngle = 0;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onLoad = function () {
    cc.director.getPhysicsManager().enabled = true;
    this.changeKnife();
    this.initKnifePos = this.knife.getPosition();
    this.initKnifeAnchor = this.knife.getAnchorPoint();
    this.bigSkill = false;
    this.times = 0;
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.gameStart = false;
    this.knife.getComponent(cc.RigidBody).onBeginContact = this.onBeginContact.bind(this);
    this.knife.getComponent(cc.RigidBody).onEndContact = this.onEndContact.bind(this);
    this.triangle1 = this.progress.getChildByName("35");
    this.triangle2 = this.progress.getChildByName("60");
    this.moneyArr = this.moneyNum.split(",");
    this.goldArr = this.goldBrickNum.split(",");
    this.giftArr = [];
    this.node.getChildByName("动画").active = false;
    this.progressAnim.active = false;
  };
  _ctor.prototype.gameStartFunc = function () {
    this.changeKnife();
    this.knife.getComponent(sp.Skeleton).skeletonData = this.knifeAnimation;
    this.knife.getComponent(sp.Skeleton).setAnimation(0, "dao_daiji", true);
    this.isChangeKnife = false;
    this.type = 0;
    this.gameStart = true;
    this.bigSkill = false;
    this.guideAnimation();
    this.initGiftArr();
    this.countDown.string = this.gameTime.toString();
    this.progress.getComponent(cc.ProgressBar).progress = 0;
    this.progressAnim.active = false;
  };
  _ctor.prototype.gameEndFunc = function () {
    if (this.node) {
      this.gameStart = false;
      this.initGiftArr();
      this.countDown.string = this.gameTime.toString();
      this.progress.getComponent(cc.ProgressBar).progress = 0;
      this.knife.setPosition(this.initKnifePos);
      this.knife.setAnchorPoint(this.initKnifeAnchor);
      this.knife.angle = 0;
      this.changeKnife();
      this.reward = {
        money: 0,
        gold: 0,
        giftBox: 0,
        superGiftBox: 0
      };
      this.progressAnim.active = false;
    }
  };
  _ctor.prototype.guideAnimation = function () {
    this.guide.getChildByName("手").runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.5, .9), cc.moveBy(.5, cc.v2(0, 20)), cc.moveBy(.5, cc.v2(0, -20)), cc.scaleTo(.5, 1))));
    this.guide.getChildByName("指示").runAction(cc.repeatForever(cc.sequence(cc.delayTime(.5), cc.moveBy(.5, cc.v2(0, 20)), cc.moveBy(.5, cc.v2(0, -20)), cc.delayTime(.5))));
  };
  _ctor.prototype.stopGuideAnimation = function () {
    var e = this.guide.getChildByName("手");
    e.stopAllActions();
    e.active = false;
    var t = this.guide.getChildByName("指示");
    t.stopAllActions();
    t.active = false;
  };
  _ctor.prototype.update = function (e) {
    var t = this;
    if (this.gameStart && !_ref__ctor.pause) {
      this.time += e;
      this.millisecond += e;
      var i = this.progress.getComponent(cc.ProgressBar).progress;
      if (this.time >= 1) {
        this.time = 0;
        if (Number(this.countDown.string) <= 0 && this.gameStart) {
          this.gameStart = false;
          return void r_MagicBoardEndUI.MagicBoardEndUI.showUI({
            type: 1,
            reward: this.reward
          }, function () {
            t.gameEndFunc();
          });
        }
        this.countDown.string = (Number(this.countDown.string) - 1).toString();
        this.knife.getComponent(cc.RigidBody).enabledContactListener = true;
      }
      if (this.millisecond >= .2) {
        this.millisecond = 0;
        if (this.oldPos && 1 == this.times && this.magDis.mag() == this.oldPos.mag() && this.magDis.mag() > 100) {
          this.times = 0;
          if (this.clickNum > 1) {
            this.changeProgress(80, 35, 45);
          } else {
            this.changeProgress(35, 0, 35);
          }
          return void (this.magDis = cc.v2(0, 0));
        }
        this.oldPos = this.magDis;
      }
      i > 1 && (i = 1);
      if (i <= 0) {
        i = 0;
      } else {
        this.progressAnim.active || (this.progress.getComponent(cc.ProgressBar).progress -= e / (60 / this.speed));
        this.triangle1.getChildByName("三角形").active = i >= .35;
        this.triangle2.getChildByName("三角形").active = i >= .6;
        if (i <= .35 && i > 0) {
          this.changeKnife(0);
        } else if (i >= .35 && i < .6) {
          this.changeKnife(1);
        } else if (i >= .6 && i < .9) {
          this.changeKnife(2);
        } else {
          this.changeKnife(3);
        }
      }
    }
  };
  _ctor.prototype.registerCollision = function (e) {
    e.getComponent(cc.RigidBody).onBeginContact = this.onBeginContact.bind(this);
    e.getComponent(cc.RigidBody).onEndContact = this.onEndContact.bind(this);
    e.getComponent(cc.RigidBody).onPostSolve = this.onPostSolve.bind(this);
    e.getComponent(cc.RigidBody).onPreSolve = this.onPreSolve.bind(this);
    this.giftArr.push(e);
    e.name = this.giftArr.length.toString();
    if (this.giftArr.length > 60) {
      this.giftArr[this.giftArr.length - 61].destroy();
      this.giftArr.splice(this.giftArr.length - 61, 1);
    }
  };
  _ctor.prototype.onBeginContact = function (e, t, o) {
    if (1 == o.tag && 0 == t.tag) {
      t.sensor = false;
      t.apply();
      setTimeout(function () {
        t.node && t.node.getComponent(cc.PhysicsCircleCollider) && t.node.removeComponent(cc.PhysicsCircleCollider);
        t.node && t.node.getComponent(cc.RigidBody) && t.node.removeComponent(cc.RigidBody);
      }, 1e3);
    }
  };
  _ctor.prototype.onEndContact = function (e, t, o) {
    if (2 == t.tag && 3 == o.tag && this.gameStart && !this.node.getChildByName("动画").active) {
      this.gameStart = false;
      return void this.changeKnife(4);
    }
  };
  _ctor.prototype.onPostSolve = function () {};
  _ctor.prototype.onPreSolve = function () {};
  _ctor.prototype.onTouchStart = function (e) {
    if (this.gameStart && r_UtilsSystem.UtilsSystem.touchInNode(this.knife, e.getLocation()) && (this.stopGuideAnimation(), this.clickNum++, this.clickNum = this.clickNum > 2 ? 2 : this.clickNum, null == this.firstTouch)) {
      this.rectDis = null;
      this.changeAngle = null;
      this.startAgnle = null;
      this.firstTouch = e.getTouches()[0].getID();
      this.startPos = e.getLocation();
      this.speed /= 4;
      var t = this.knife.convertToNodeSpaceAR(e.getTouches()[0].getLocation());
      var o = {
        x: this.knife.getAnchorPoint().x,
        y: this.knife.getAnchorPoint().y
      };
      var i = this.knife.getContentSize();
      var n = {
        x: this.knife.getPosition().x,
        y: this.knife.getPosition().y
      };
      var a = this.knife.getAnchorPoint();
      o.x = (i.width / 2 + t.x) / i.width;
      o.y = (i.height / 2 + t.y) / i.height;
      n.x = (o.x - a.x) * i.width;
      n.y = (o.y - a.y) * i.height;
      var r = this.knife.convertToWorldSpaceAR(new cc.Vec2(n.x, n.y));
      this.knife.parent.convertToNodeSpaceAR(r, r);
      this.itemPos = this.knife.getPosition();
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    var t = this;
    if (4 != e.getTouches().length) {
      if (null != this.firstTouch) {
        if (2 == e.getTouches().length) {
          this.handoneStartPos || (this.handoneStartPos = new cc.Vec2(e.getTouches()[0].getLocation().x, e.getTouches()[0].getLocation().y));
          this.handtwoStartPos || (this.handtwoStartPos = new cc.Vec2(e.getTouches()[1].getLocation().x, e.getTouches()[1].getLocation().y));
          var i = 180 * Math.atan2(this.handoneStartPos.y - this.handtwoStartPos.y, this.handoneStartPos.x - this.handtwoStartPos.x) / Math.PI;
          var n = 180 * Math.atan2(e.getTouches()[0].getLocation().y - e.getTouches()[1].getLocation().y, e.getTouches()[0].getLocation().x - e.getTouches()[1].getLocation().x) / Math.PI;
          this.startAgnle || (this.startAgnle = i - n);
          i = this.getAngle(i);
          n = this.getAngle(n);
          var a = this.getChangeAngle(i, n);
          if (Math.abs(a) > 1) {
            this.knife.angle -= Math.abs(a) > 100 ? 0 : a;
            this.knifeAngle -= Math.abs(a) > 100 ? 0 : a;
          }
          if (this.knifeAngle > this.skill2_baseAngle + 70 && this.isChangeKnife) {
            this.skill2_baseAngle = this.knifeAngle;
            this.canShowSkill2 = true;
            console.log("技能2");
            r_TimeSystem.TimeSystem.hasSchedule("magicBoard_skill2") || r_TimeSystem.TimeSystem.scheduleOnce("magicBoard_skill2", 5, function () {
              t.skill2_baseAngle = t.knifeAngle;
              t.canShowSkill2 = false;
            });
          }
          if (this.knifeAngle < this.skill2_baseAngle - 140 && this.isChangeKnife && (console.error("技能2", this.knifeAngle, this.skill2_baseAngle), this.isChangeKnife && this.canShowSkill2 && (!r_PlayerData.PlayerData.data.magicBoard.skill2 || cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER))) {
            r_PlayerData.PlayerData.data.magicBoard.skill2 = true;
            var s = this.node.getChildByName("动画");
            this.knife.setPosition(this.initKnifePos);
            s.active = true;
            var c = s.getChildByName("动画2").getComponent(sp.Skeleton);
            c.node.active = true;
            c.setCompleteListener(function () {
              r_TimeSystem.TimeSystem.scheduleOnce("magicBoard_progress", 3, function () {
                t.progressAnim.active = false;
              });
              s.active = false;
              c.node.active = false;
              t.giveMoreGift();
            });
            c.setAnimation(0, "x", false);
            this.progressAnim.active = true;
          }
          if ((cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER) && Math.abs(this.knife.angle) > 180 && !this.bigSkill && !this.isChangeKnife || Math.abs(this.knife.angle) > 180 && !r_PlayerData.PlayerData.data.magicBoard.skill1 && !this.isChangeKnife) {
            this.bigSkill = true;
            r_PlayerData.PlayerData.data.magicBoard.skill1 = true;
            this.node.getChildByName("动画").active = true;
            this.knife.setPosition(this.initKnifePos);
            var u = this.node.getChildByName("动画").getChildByName("动画").getComponent(sp.Skeleton);
            u.node.active = true;
            u.setCompleteListener(function () {
              setTimeout(function () {
                t.progressAnim.active = false;
              }, 3e3);
              u.node.active = false;
              t.node.getChildByName("动画").active = false;
              t.giveMoreGift();
            });
            u.setAnimation(0, "x", false);
            this.progressAnim.active = true;
          }
        }
        if (e.getTouches()[0].getID() == this.firstTouch) {
          var h = e.getTouches()[0].getLocation();
          var p = h.subtract(this.startPos);
          h = this.itemPos.add(p);
          this.knife.setPosition(h);
          Math.abs(h.y - this.itemPos.y) < 100 && (this.times = 1);
          if (1 != this.times) {
            return;
          }
          var d = p.mag();
          if (Math.abs(h.y - this.itemPos.y) > 100 && this.magDis.mag() > d) {
            this.times = 0;
            if (e.getTouches().length > 1) {
              this.changeProgress(103, 55, 48);
            } else {
              this.changeProgress(55, 30, 25);
            }
            return void (this.magDis = cc.v2(0, 0));
          }
          this.magDis = p;
        }
      }
    } else {
      this.firstTouch = null;
      var y = e.getTouches()[0].getLocation();
      var f = e.getTouches()[1].getLocation();
      var m = e.getTouches()[2].getLocation();
      var g = e.getTouches()[3].getLocation();
      var v = cc.v2((y.x + f.x + m.x + g.x) / 4, (y.y + f.y + m.y + g.y) / 4);
      var C = v.sub(y).mag();
      var S = v.sub(f).mag();
      var I = v.sub(m).mag();
      var b = v.sub(g).mag();
      var x = Math.max(C, S, I, b);
      this.rectDis || (this.rectDis = x);
      if (Math.abs(x - this.rectDis) > 100 && !this.isChangeKnife) {
        this.isChangeKnife = true;
        var P = this.knife.getComponent(sp.Skeleton);
        var _ = this.knife.children[0];
        P.skeletonData = this.knifeAnimation2;
        P.enabled = false;
        _.active = true;
        _ref__ctor.pause = true;
        _.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
        this.changeKnife(1);
        this.changeKnife();
        _.getComponent(sp.Skeleton).setCompleteListener(function () {
          _ref__ctor.pause = false;
          _.active = false;
          P.enabled = true;
          t.skill2_baseAngle = t.knifeAngle;
        });
      }
    }
  };
  _ctor.prototype.onTouchEnd = function (e) {
    if (null != this.firstTouch) {
      this.clickNum--;
      this.clickNum = this.clickNum < 0 ? 0 : this.clickNum;
      if (this.firstTouch == e.getTouches()[0].getID()) {
        this.firstTouch = null;
        this.speed *= 4;
        this.knife.setAnchorPoint(this.initKnifeAnchor);
        this.itemPos = null;
      }
      this.handoneStartPos && (this.handoneStartPos = null);
      this.handtwoStartPos && (this.handtwoStartPos = null);
      this.gameStart || (this.knife.angle = 0);
      this.gameStart || this.knife.setPosition(this.initKnifePos);
      this.gameStart || this.knife.setAnchorPoint(this.initKnifeAnchor);
      this.times = 0;
    }
  };
  _ctor.prototype.getAngle = function (e) {
    e < 0 && (e = 360 + e);
    return e;
  };
  _ctor.prototype.getChangeAngle = function (e, t) {
    var o = e - t - this.startAgnle;
    if (this.changeAngle) {
      var i = this.changeAngle;
      this.changeAngle = o;
      return o - i;
    }
    this.changeAngle = o;
    return o;
  };
  _ctor.prototype.changeKnife = function (e) {
    var t = this;
    undefined === e && (e = 0);
    if (this.type != e) {
      this.knife.getComponent(sp.Skeleton) || (this.knife.addComponent(sp.Skeleton).skeletonData = this.knifeAnimation);
      var o = this.knife.getComponent(sp.Skeleton);
      switch (e) {
        case 0:
          o.setAnimation(0, "dao_daiji", true);
          this.type = e;
          break;
        case 1:
          o.setAnimation(0, "dao_yan1", true);
          this.type = e;
          break;
        case 2:
          o.setAnimation(0, "dao_yan2", true);
          this.type = e;
          break;
        case 3:
          o.setAnimation(0, "dao_huo", true);
          this.type = e;
          break;
        case 4:
          o.setAnimation(0, "dao_duan", false);
          setTimeout(function () {
            r_MagicBoardUI.MagicBoardUI.instance.isHide || r_MagicBoardEndUI.MagicBoardEndUI.showUI({
              type: 0
            }, function () {
              t.gameEndFunc();
              o.setAnimation(0, "dao_daiji", true);
              t.type = 0;
            });
          }, 500);
      }
    }
  };
  _ctor.prototype.changeProgress = function (e, t, o) {
    var i = this.progress.getComponent(cc.ProgressBar);
    var n = Math.min(Math.floor(Math.random() * o) / 100 + t / 100, e / 100);
    if ((n = Math.max(n, i.progress)) >= 1.2) {
      this.getReward(3);
      n = 1;
    } else if (n >= 1) {
      this.getReward(2);
    } else if (n >= .6) {
      this.getReward(1);
    } else {
      n >= .35 && this.getReward(0);
    }
    cc.tween(i).to(.5, {
      progress: n
    }).start();
  };
  _ctor.prototype.getReward = function (e) {
    if (this.gameStart) {
      var t = null;
      var o = this.magDis.mag() / 700;
      var i = this.moneyArr[Math.floor(o * this.moneyArr.length)];
      var n = this.goldArr[Math.floor(o * this.goldArr.length)];
      switch (e) {
        case 0:
          (t = cc.instantiate(this.money)).getChildByName("label").getComponent(cc.Label).string = r_UtilsSystem.UtilsSystem.getShowCoin(i);
          this.reward.money += Number(i);
          break;
        case 1:
          (t = cc.instantiate(this.goldBrick)).getChildByName("label").getComponent(cc.Label).string = r_UtilsSystem.UtilsSystem.getShowCoin(n);
          this.reward.gold += Number(n);
          break;
        case 2:
          t = cc.instantiate(this.giftBox);
          this.reward.giftBox += 1;
          break;
        case 3:
          t = cc.instantiate(this.superGiftBox);
          this.reward.superGiftBox += 1;
      }
      if (t) {
        t.parent = this.node;
        t.setSiblingIndex(1);
        this.registerCollision(t);
        t.setPosition(this.knife.getPosition());
        var a = (this.knife.angle + 90) * Math.PI / 180;
        var r = Math.cos(a);
        var c = Math.sin(a);
        t.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(1e3 * r, 1e3 * c);
      }
    }
  };
  _ctor.prototype.initGiftArr = function () {
    if (this.giftArr && 0 != this.giftArr.length) {
      for (var e = 0; e < this.giftArr.length; e++) {
        this.giftArr[e].destroy();
      }
      this.giftArr = [];
    }
  };
  _ctor.prototype.showTipUI = function () {
    _ref__ctor.pause = true;
    r_MagicBoardTipUI.MagicBoardTipUI.showUI();
  };
  _ctor.prototype.showOpenBoxUI = function () {
    if (!r_OpenBoxUI.OpenBoxUI.isShow) {
      r_OpenBoxUI.OpenBoxUI.isShow = true;
      _ref__ctor.pause = true;
      r_OpenBoxUI.OpenBoxUI.showUI();
    }
  };
  _ctor.prototype.giveMoreGift = function () {
    if (this.gameStart) {
      for (var e = 0; e < 360; e++) {
        var t = null;
        var o = 700 * Math.random() / 700;
        var i = this.moneyArr[Math.floor(o * this.moneyArr.length)];
        var n = this.goldArr[Math.floor(o * this.goldArr.length)];
        var a = Math.floor(3 * Math.random());
        (e += Math.floor(10 * Math.random())) + 1 >= 360 && (a = 3);
        switch (a) {
          case 0:
            (t = cc.instantiate(this.money)).getChildByName("label").getComponent(cc.Label).string = r_UtilsSystem.UtilsSystem.getShowCoin(i);
            this.reward.money += Number(i);
            break;
          case 1:
            (t = cc.instantiate(this.goldBrick)).getChildByName("label").getComponent(cc.Label).string = r_UtilsSystem.UtilsSystem.getShowCoin(n);
            this.reward.gold += Number(n);
            break;
          case 2:
            t = cc.instantiate(this.giftBox);
            this.reward.giftBox += 1;
            break;
          case 3:
            t = cc.instantiate(this.superGiftBox);
            this.reward.superGiftBox += 1;
        }
        if (t) {
          t.parent = this.node;
          t.setSiblingIndex(1);
          this.registerCollision(t);
          t.setPosition(this.knife.getPosition());
          var r = e * Math.PI / 180;
          var c = Math.cos(r);
          var l = Math.sin(r);
          t.getComponent(cc.RigidBody).linearVelocity = new cc.Vec2(1e3 * c, 1e3 * l);
        }
      }
    }
  };
  __decorate([_property({
    displayName: "游戏时间"
  })], _ctor.prototype, "gameTime", undefined);
  __decorate([_property({
    displayName: "新手引导",
    type: cc.Node
  })], _ctor.prototype, "guide", undefined);
  __decorate([_property({
    displayName: "进度条",
    type: cc.Node
  })], _ctor.prototype, "progress", undefined);
  __decorate([_property({
    displayName: "刀",
    type: cc.Node
  })], _ctor.prototype, "knife", undefined);
  __decorate([_property({
    displayName: "递减速度"
  })], _ctor.prototype, "speed", undefined);
  __decorate([_property({
    displayName: "刀动画",
    type: sp.SkeletonData
  })], _ctor.prototype, "knifeAnimation", undefined);
  __decorate([_property({
    displayName: "刀动画2",
    type: sp.SkeletonData
  })], _ctor.prototype, "knifeAnimation2", undefined);
  __decorate([_property({
    displayName: "倒计时",
    type: cc.Label
  })], _ctor.prototype, "countDown", undefined);
  __decorate([_property({
    displayName: "金砖",
    type: cc.Node
  })], _ctor.prototype, "goldBrick", undefined);
  __decorate([_property({
    displayName: "钱",
    type: cc.Node
  })], _ctor.prototype, "money", undefined);
  __decorate([_property({
    displayName: "神秘礼盒",
    type: cc.Node
  })], _ctor.prototype, "giftBox", undefined);
  __decorate([_property({
    displayName: "超级礼盒",
    type: cc.Node
  })], _ctor.prototype, "superGiftBox", undefined);
  __decorate([_property({
    displayName: "钱的金额"
  })], _ctor.prototype, "moneyNum", undefined);
  __decorate([_property({
    displayName: "金砖的金额"
  })], _ctor.prototype, "goldBrickNum", undefined);
  __decorate([_property({
    displayName: "提示节点",
    type: cc.Node
  })], _ctor.prototype, "tipNode", undefined);
  __decorate([_property({
    displayName: "奖品节点",
    type: cc.Node
  })], _ctor.prototype, "rewardNode", undefined);
  __decorate([_property({
    displayName: "进度条动画",
    type: cc.Node
  })], _ctor.prototype, "progressAnim", undefined);
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_MagicBoard;