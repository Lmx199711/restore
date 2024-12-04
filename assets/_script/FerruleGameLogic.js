var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FerruleGoodsList = undefined;
var s;
var r_LevelPreload = require("LevelPreload");
var r_DebugSystem = require("DebugSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_FerruleGameReward = require("FerruleGameReward");
var r_FerruleJianBao = require("FerruleJianBao");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e["未被套"] = 0] = "未被套";
  e[e["补货中"] = 1] = "补货中";
  e[e["被套走"] = 2] = "被套走";
})(s || (s = {}));
exports.FerruleGoodsList = [{
  id: 1,
  name: "铜钱",
  grade: 1,
  pr: [.9, .9],
  value: [5e4, 45e4, 6e3]
}, {
  id: 2,
  name: "红包",
  grade: 1,
  pr: [.9, .9],
  value: [2e4, 2e5, 5e3]
}, {
  id: 3,
  name: "关公",
  grade: 1,
  pr: [.9, .9],
  value: [1e5, 6e5, 6500]
}, {
  id: 4,
  name: "高达",
  grade: 1,
  pr: [.9, .9],
  value: [12e4, 8e5, 7e3]
}, {
  id: 5,
  name: "珊瑚",
  grade: 2,
  pr: [.8, .6],
  value: [5e5, 12e5, 2e4]
}, {
  id: 6,
  name: "元宝",
  grade: 2,
  pr: [.8, .6],
  value: [6e5, 2e6, 3e4]
}, {
  id: 7,
  name: "宝珠",
  grade: 2,
  pr: [.8, .6],
  value: [7e5, 28e5, 5e4]
}, {
  id: 8,
  name: "古董",
  grade: 3,
  pr: [.7, .3],
  value: [15e5, 5e6, 8e4]
}, {
  id: 9,
  name: "画卷",
  grade: 3,
  pr: [.7, .3],
  value: [3e6, 8e6, 1e5]
}, {
  id: 10,
  name: "皇冠",
  grade: 3,
  pr: [.7, .3],
  value: [5e6, 1e7, 5e5]
}];
var def_FerruleGameLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.roleNode = null;
    t.roleStartPos = null;
    t.roleQiPao = null;
    t.controlNode = null;
    t.moveNode = null;
    t.aimStartPos = null;
    t.labHitBoss = null;
    t.handCircle = null;
    t.hitSuccessTip = null;
    t.missTip = null;
    t.throwCircleAnim = null;
    t.LimitArea = null;
    t.btnBuHuo = null;
    t.cleanParent = null;
    t.labCircle = null;
    t.labJianbao = null;
    t.tipNode = null;
    t.pathPoint = null;
    t.points = [];
    t.pointNum = 14;
    t.m_curCircleNum = 0;
    t.m_itemList = [];
    t.m_itemStartPosList = [];
    t.m_time = 0;
    t.m_jianBaoList = [];
    t.m_buHuoList = [];
    t.m_isBuHuoIng = false;
    t.m_isHitBoss = false;
    t.moveSpeed = 0;
    t.isGameOver = false;
    t.m_isTrueClick = false;
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
    return null;
  };
  _ctor.prototype.resetLoadTouch = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.node);
  };
  _ctor.prototype.passLevel = function () {};
  _ctor.prototype.setBubble = function () {
    this.showRoleQiPao("套中什么就给什么", "套中什么就给什么");
  };
  _ctor.prototype.showSchedeuleBubble = function (e) {
    undefined === e && (e = true);
    if (e) {
      this.showRoleQiPao("套中什么就给什么", "套中什么就给什么");
      r_TimeSystem.TimeSystem.schedule("showBossSay", 600, this.setBubble.bind(this));
    } else {
      r_TimeSystem.TimeSystem.scheduleClear("showBossSay");
    }
  };
  _ctor.prototype.init = function () {
    this.showSchedeuleBubble(true);
    this.itemStartPos = this.moveNode.getPosition();
    this.controlStartPos = this.controlNode.getPosition();
    this.touchMovePos = null;
    for (var e = 1; e <= 10; e++) {
      var t = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.node, "item" + e);
      this.m_itemStartPosList.push(t.getPosition());
      var o = {};
      o.node = t;
      o.curCount = 0;
      o.state = s.未被套;
      o.oldSibIndex = t.getSiblingIndex();
      this.m_itemList.push(o);
    }
    r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoList.length > 0 && (this.m_jianBaoList = r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoList.concat());
    if (r_PlayerData.PlayerData.data.ferruleGameMap.isFirst) {
      this.m_curCircleNum = 5;
    } else {
      this.m_curCircleNum = 10;
      r_PlayerData.PlayerData.data.ferruleGameMap.isFirst = 1;
    }
    this.labHitBoss.node.parent.active = false;
    if (r_PlatformSystem.PlatformSystem.getIsWebPlatform() && r_DebugSystem.DebugSystem.ferruleType == r_DebugSystem.GMToolTypeFerrule.chongzhi) {
      r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum = 9;
      r_PlayerData.PlayerData.data.ferruleGameMap.caidan = 0;
    }
    if (r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum > 0 && !r_PlayerData.PlayerData.data.ferruleGameMap.caidan) {
      this.labHitBoss.node.parent.active = true;
      this.labHitBoss.string = r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum + "/10";
    }
    r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoNum = 3;
    r_PlayerData.PlayerData.saveData();
    this.refreshLab();
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
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
  _ctor.prototype.refreshJianBiaoList = function () {
    this.m_jianBaoList = [];
    r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoList.length > 0 && (this.m_jianBaoList = r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoList.concat());
    this.showSchedeuleBubble(true);
    this.refreshLab();
  };
  _ctor.prototype.refreshLab = function () {
    this.labCircle.string = "x" + this.m_curCircleNum;
    this.labJianbao.string = this.m_jianBaoList.length + "/6";
    for (var e = 0; e < 10; e++) {
      if (this.m_itemList[e].state == s.未被套) {
        var t = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.m_itemList[e].node, "label").getComponent(cc.Label);
        if (1 == exports.FerruleGoodsList[e].grade) {
          t.string = "套中就给";
        } else {
          t.string = this.m_itemList[e].curCount + " / " + exports.FerruleGoodsList[e].grade + " 次";
        }
      }
    }
  };
  _ctor.prototype.getCurGoodsCount = function () {
    var e = 0;
    for (var t = 0; t < 10; t++) {
      this.m_itemList[t].state == s.未被套 && e++;
    }
    return e;
  };
  _ctor.prototype.isGameIng = function () {
    var e = 0;
    for (var t = 0; t < 10; t++) {
      this.m_itemList[t].curCount > 0 && this.m_itemList[t].curCount < exports.FerruleGoodsList[t].grade && e++;
    }
    return e;
  };
  _ctor.prototype.showBuHuo = function () {
    var e = this;
    this.m_isBuHuoIng = true;
    this.labHitBoss.node.parent.active = false;
    var t = function () {
      if (e.m_buHuoList.length <= 0) {
        e.roleNode.x = e.roleStartPos.x;
        e.roleNode.y = e.roleStartPos.y;
        e.showNodeSpineAnim(e.roleNode, "step_3", true);
        e.btnBuHuo.active = true;
        e.m_isBuHuoIng = false;
        return void (r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum > 0 && !r_PlayerData.PlayerData.data.ferruleGameMap.caidan && (e.labHitBoss.node.parent.active = true, e.labHitBoss.string = r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum + "/10"));
      }
      var o = e.m_buHuoList[0];
      e.roleNode.x = e.m_itemStartPosList[o].x + 50;
      e.roleNode.y = e.m_itemStartPosList[o].y - 50;
      e.showNodeSpineAnim(e.roleNode, "step_4", false);
      r_TimeSystem.TimeSystem.scheduleOnce("addHuo", 2.4, function () {
        e.m_itemList[o].state = s.未被套;
        e.m_itemList[o].curCount = 0;
        e.m_itemList[o].node.scale = 1;
        e.m_itemList[o].node.x = e.m_itemStartPosList[o].x;
        e.m_itemList[o].node.y = e.m_itemStartPosList[o].y;
        e.m_itemList[o].node.getChildByName("di").active = true;
        e.refreshLab();
        e.m_buHuoList.splice(0, 1);
        e.m_isHitBoss || t();
      });
    };
    t();
  };
  _ctor.prototype.onClickBuHuo = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    if (this.getCurGoodsCount() != this.m_itemList.length) {
      r_PlatformSystem.PlatformSystem.showVideo("套圈补货", function () {
        for (var t = 0; t < 10; t++) {
          e.m_itemList[t].state == s.被套走 && e.m_buHuoList.push(t);
        }
        e.btnBuHuo.active = false;
        e.showBuHuo();
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("无需补货");
    }
  };
  _ctor.prototype.onClickAddCircle = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    r_PlatformSystem.PlatformSystem.showVideo("套圈加圈", function () {
      e.m_curCircleNum += 5;
      e.refreshLab();
      r_UtilsSystem.UtilsSystem.showTip("恭喜增加5个圈");
    });
  };
  _ctor.prototype.onClickJianBao = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    if (r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoList.length <= 0) {
      return r_UtilsSystem.UtilsSystem.showTip("背包是空的");
    }
    this.showSchedeuleBubble(false);
    r_FerruleJianBao.FerruleJianBao.showUI(false);
  };
  _ctor.prototype.onTouchStart = function (e) {
    var t = this;
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.startID = e.getID();
      this.moveInfo = {};
      if (!this.isGameOver) {
        if (this.m_curCircleNum <= 0) {
          this.isGameOver = true;
          return void r_TimeSystem.TimeSystem.scheduleOnce("alert_1", .1, function () {
            r_UtilsSystem.UtilsSystem.showAlert("是否观看广告增加5个圈", 2, function () {
              t.isGameOver = false;
              t.m_curCircleNum += 5;
              t.refreshLab();
              r_UtilsSystem.UtilsSystem.showTip("恭喜增加5个圈");
            }, t, "提示", "确定", "取消", function () {
              t.isGameOver = false;
            });
          });
        }
        this.m_isTrueClick = true;
        this.touchStartPos = e.getLocation();
        for (var o = 0; o < this.pointNum; o++) {
          var i = r_UtilsSystem.UtilsSystem.getDeepChildByName(this.moveNode.parent, "point" + o);
          i.setSiblingIndex(0);
          i.scale = 1 - .05 * o;
          i.active = false;
          this.points.push(i);
        }
        this.moveNode.active = true;
        this.drawLine();
      }
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.startID && this.startID != e.getID()) {
      e.stopPropagation();
    } else if (!this.isGameOver && !(this.m_curCircleNum <= 0) && this.m_isTrueClick) {
      var t = e.getLocation();
      e.getLocation();
      var o = t.subtract(this.touchStartPos);
      t = this.controlStartPos.add(o);
      cc.Vec2.ZERO;
      var i = 110;
      var n = t.subtract(this.controlStartPos);
      n.x < 0 && n.y < 0 && (i = 120);
      n.mag() > i && (t = this.controlStartPos.add(n.normalize().mul(i)));
      this.controlNode.setPosition(t);
      var a = this.controlNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var s = this.handCircle.parent.convertToNodeSpaceAR(a);
      r_UtilsSystem.UtilsSystem.getDeepChildByName(this.node, "按钮11").setPosition(s);
      this.setMovePos(t);
      this.moveNode.active = true;
      this.drawLine();
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    this.startID = null;
    this.moveInfo && this.moveInfo.node;
    if (!this.isGameOver && !(this.m_curCircleNum <= 0) && this.m_isTrueClick) {
      this.moveNode.active = false;
      for (var e = 0; e < this.points.length; e++) {
        this.points[e].active = false;
      }
      this.points = [];
      this.moveNode.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
      this.touchMovePos = null;
      this.m_curCircleNum -= 1;
      this.refreshLab();
      this.throwCircle();
      this.m_isTrueClick = false;
    }
  };
  _ctor.prototype.onTouchCancel = function () {
    this.startID = null;
    this.moveInfo = null;
    this.moveInfo && this.moveInfo.node;
    if (!this.isGameOver && !(this.m_curCircleNum <= 0) && this.m_isTrueClick) {
      this.moveNode.active = false;
      for (var e = 0; e < this.points.length; e++) {
        this.points[e].active = false;
      }
      this.points = [];
      this.moveNode.getComponent(cc.RigidBody).linearVelocity = cc.Vec2.ZERO;
      this.touchMovePos = null;
      this.m_curCircleNum -= 1;
      this.refreshLab();
      this.throwCircle();
      this.m_isTrueClick = false;
    }
  };
  _ctor.prototype.showNodeSpineAnim = function (e, t, o, i) {
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
  _ctor.prototype.showRoleQiPao = function (e, t, o) {
    var i = this;
    r_SoundMgr.SoundMgr.stopAllSound();
    r_SoundMgr.SoundMgr.playSound("ferruleGame/" + t);
    this.roleQiPao.opacity = 255;
    this.roleQiPao.parent.opacity = 255;
    this.roleQiPao.getChildByName("label").getComponent(cc.Label).string = e;
    cc.Tween.stopAllByTarget(this.roleQiPao);
    cc.tween(this.roleQiPao).delay(2).call(function () {
      o && o();
      i.roleQiPao.opacity = 0;
    }).start();
  };
  _ctor.prototype.throwCircle = function () {
    var e = this;
    this.isGameOver = true;
    this.showNodeSpineAnim(this.throwCircleAnim, "step_2", false, function () {
      e.showNodeSpineAnim(e.throwCircleAnim, "step_3", true);
    });
    r_TimeSystem.TimeSystem.scheduleOnce("throwCircle", .4, function () {
      e.moveCircleToTarget();
    });
  };
  _ctor.prototype.moveCircleToTarget = function () {
    var e = this;
    this.handCircle.active = true;
    var t = this.aimStartPos.convertToWorldSpaceAR(cc.Vec2.ZERO);
    var o = this.handCircle.parent.convertToNodeSpaceAR(t);
    this.handCircle.setPosition(o);
    cc.tween(this.handCircle).parallel(cc.tween().to(.3, {
      x: this.moveNode.x,
      y: this.moveNode.y
    }), cc.tween().to(.3, {
      scale: .7
    })).delay(.2).call(function () {
      e.checkIsHitTarget();
      e.moveNode.setPosition(e.itemStartPos);
      e.controlNode.setPosition(e.controlStartPos);
      e.showNodeSpineAnim(e.throwCircleAnim, "step_1", true);
      e.handCircle.active = false;
      var t = e.controlNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
      var o = e.handCircle.parent.convertToNodeSpaceAR(t);
      r_UtilsSystem.UtilsSystem.getDeepChildByName(e.node, "按钮11").setPosition(o);
    }).start();
    r_TimeSystem.TimeSystem.scheduleOnce("handCircle", 1, function () {
      e.isGameOver = false;
    });
  };
  _ctor.prototype.showHitTarget = function (e) {
    undefined === e && (e = true);
    if (e) {
      this.hitSuccessTip.active = true;
      this.hitSuccessTip.setPosition(this.handCircle.getPosition());
      this.hitSuccessTip.opacity = 255;
      this.hitSuccessTip.scale = 1;
      cc.tween(this.hitSuccessTip).to(.2, {
        scale: 2
      }).to(.3, {
        opacity: 0
      }).start();
      this.missTip.active = false;
      r_SoundMgr.SoundMgr.playSound("ferruleGame/套中音效");
    } else {
      this.missTip.active = true;
      this.missTip.setPosition(this.handCircle.getPosition());
      this.missTip.opacity = 255;
      this.missTip.scale = 1;
      cc.tween(this.missTip).to(.2, {
        scale: 2
      }).to(.3, {
        opacity: 0
      }).start();
      this.hitSuccessTip.active = false;
      r_SoundMgr.SoundMgr.playSound("ferruleGame/没套中音效");
    }
  };
  _ctor.prototype.checkIsHitTarget = function () {
    var e = this;
    var t = false;
    var i = this.moveNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
    if (1 == this.m_isBuHuoIng && r_UtilsSystem.UtilsSystem.touchInNode(this.roleNode, i)) {
      this.m_isHitBoss = true;
      if (!r_PlayerData.PlayerData.data.ferruleGameMap.caidan) {
        r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum += 1;
        this.labHitBoss.node.parent.active = true;
        this.labHitBoss.string = r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum + "/10";
      }
      this.showRoleQiPao("你往哪套呢", "你往哪套呢");
      r_PlayerData.PlayerData.saveData();
      this.showNodeSpineAnim(this.roleNode, "step_5", false);
      r_TimeSystem.TimeSystem.scheduleOnce("nextBuHuo1", .5, function () {
        e.showNodeSpineAnim(e.roleNode, "step_6", true);
        r_PlayerData.PlayerData.data.ferruleGameMap.caidan || 10 - r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum <= 0 && r_FerruleGameReward.FerruleGameReward.showUI({
          hideCallBack: function () {
            e.m_isHitBoss = false;
            e.labHitBoss.node.parent.active = false;
            if (e.m_buHuoList.length <= 0) {
              e.roleNode.x = e.roleStartPos.x;
              e.roleNode.y = e.roleStartPos.y;
              e.showNodeSpineAnim(e.roleNode, "step_3", true);
              e.btnBuHuo.active = true;
              e.m_isBuHuoIng = false;
              if (r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum > 0 && !r_PlayerData.PlayerData.data.ferruleGameMap.caidan) {
                e.labHitBoss.node.parent.active = true;
                e.labHitBoss.string = r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum + "/10";
              }
            } else {
              e.showBuHuo();
            }
          }
        });
      });
      10 - r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum > 0 && r_TimeSystem.TimeSystem.scheduleOnce("nextBuHuo", 2, function () {
        e.m_isHitBoss = false;
        if (e.m_buHuoList.length <= 0) {
          e.roleNode.x = e.roleStartPos.x;
          e.roleNode.y = e.roleStartPos.y;
          e.showNodeSpineAnim(e.roleNode, "step_3", true);
          e.btnBuHuo.active = true;
          e.m_isBuHuoIng = false;
        } else {
          e.showBuHuo();
        }
      });
    } else {
      var n = function (e) {
        if (a.m_itemList[e].state != s.未被套) {
          return "continue";
        }
        if (r_UtilsSystem.UtilsSystem.touchInNode(a.m_itemList[e].node.getChildByName("pic"), i)) {
          t = true;
          var n = Math.random();
          r_PlatformSystem.PlatformSystem.getIsWebPlatform() && r_DebugSystem.DebugSystem.ferruleType == r_DebugSystem.GMToolTypeFerrule.bizhong && (n = 0);
          if (n < exports.FerruleGoodsList[e].pr[0]) {
            a.m_itemList[e].curCount += 1;
            if (a.m_itemList[e].curCount >= exports.FerruleGoodsList[e].grade) {
              r_SoundMgr.SoundMgr.playSound("ferruleGame/套中音效");
              a.showHitTargetAnim(e);
              if (a.m_jianBaoList.length < 6) {
                a.m_jianBaoList.push(exports.FerruleGoodsList[e].id);
                r_PlayerData.PlayerData.data.ferruleGameMap.jianbaoList.push(exports.FerruleGoodsList[e].id);
              } else {
                a.showTipNode();
                r_TimeSystem.TimeSystem.scheduleOnce("", .5, function () {
                  r_PlayerData.PlayerData.addCoin("街头套圈", exports.FerruleGoodsList[e].value[0]);
                });
              }
            } else {
              a.showHitTarget(true);
            }
            a.refreshLab();
          } else {
            a.showHitTarget(false);
          }
        }
      };
      var a = this;
      for (var r = 0; r < this.m_itemList.length; r++) {
        n(r);
      }
      t || this.showHitTarget(false);
    }
  };
  _ctor.prototype.showTipNode = function () {
    var e = this;
    this.tipNode.active = true;
    this.tipNode.opacity = 255;
    var t = this.tipNode.getPosition();
    cc.tween(this.tipNode).to(.5, {
      y: t.y + 200
    }).delay(2).call(function () {
      e.tipNode.setPosition(t);
      e.tipNode.opacity = 0;
      e.tipNode.active = false;
    }).start();
  };
  _ctor.prototype.showHitTargetAnim = function (e) {
    var t = this;
    this.m_itemList[e].node.getChildByName("di").active = false;
    this.m_itemList[e].node.setSiblingIndex(999);
    this.m_itemList[e].state = s.被套走;
    cc.tween(this.m_itemList[e].node).to(.5, {
      scale: 2
    }).parallel(cc.tween().to(.5, {
      scale: 0
    }), cc.tween().to(.5, {
      x: this.labJianbao.node.parent.x,
      y: this.labJianbao.node.parent.y
    })).call(function () {
      t.m_itemList[e].node.setSiblingIndex(t.m_itemList[e].oldSibIndex);
    }).start();
  };
  _ctor.prototype.setMovePos = function (e) {
    var t = e.subtract(this.controlStartPos);
    var o = t.normalize().mul(3 * t.mag());
    e = this.itemStartPos.add(o);
    this.moveNode.setPosition(e);
  };
  _ctor.prototype.drawLine = function () {
    var e = this;
    if (!this.isGameOver) {
      var t = this.aimStartPos.getPosition();
      var o = this.aimStartPos.convertToWorldSpaceAR(cc.Vec2.ZERO);
      t = this.moveNode.parent.convertToNodeSpaceAR(o);
      var i = this.moveNode.getPosition();
      var n = this.getBezier(t, i);
      this.getBezierPoints(n, this.pointNum).forEach(function (t, o) {
        if (e.points[o]) {
          e.points[o].active = true;
          e.points[o].setPosition(t);
        }
      });
    }
  };
  _ctor.prototype.getBezier = function (e, t) {
    var o = t.sub(e);
    var i = e.add(o.mul(.2));
    i.x *= -1;
    return [e, i, t];
  };
  _ctor.prototype.getBezierPoints = function (e, t) {
    var o = [];
    for (var i = 0; i < t; i++) {
      var n = this.getBezierPoint(e, i / t);
      o.push(n);
    }
    return o;
  };
  _ctor.prototype.getBezierPoint = function (e, t) {
    var o = 1 - t;
    var i = e[0].x * o * o + e[1].x * t * o + e[2].x * t * t;
    var n = e[0].y * o * o + e[1].y * t * o + e[2].y * t * t;
    return cc.v2(i, n);
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    displayName: "人物节点",
    type: cc.Node
  })], _ctor.prototype, "roleNode", undefined);
  __decorate([_property({
    displayName: "人物节点初始位置",
    type: cc.Node
  })], _ctor.prototype, "roleStartPos", undefined);
  __decorate([_property({
    displayName: "人物气泡",
    type: cc.Node
  })], _ctor.prototype, "roleQiPao", undefined);
  __decorate([_property({
    displayName: "控制摇杆",
    type: cc.Node
  })], _ctor.prototype, "controlNode", undefined);
  __decorate([_property({
    displayName: "移动节点",
    type: cc.Node
  })], _ctor.prototype, "moveNode", undefined);
  __decorate([_property({
    displayName: "瞄准点起点位置",
    type: cc.Node
  })], _ctor.prototype, "aimStartPos", undefined);
  __decorate([_property({
    displayName: "中老板娘次数",
    type: cc.Label
  })], _ctor.prototype, "labHitBoss", undefined);
  __decorate([_property({
    displayName: "手里的圈圈",
    type: cc.Node
  })], _ctor.prototype, "handCircle", undefined);
  __decorate([_property({
    displayName: "命中提示",
    type: cc.Node
  })], _ctor.prototype, "hitSuccessTip", undefined);
  __decorate([_property({
    displayName: "未命中提示",
    type: cc.Node
  })], _ctor.prototype, "missTip", undefined);
  __decorate([_property({
    displayName: "丢圈动画",
    type: cc.Node
  })], _ctor.prototype, "throwCircleAnim", undefined);
  __decorate([_property({
    displayName: "圈圈最大范围",
    type: cc.Node
  })], _ctor.prototype, "LimitArea", undefined);
  __decorate([_property({
    displayName: "补货按钮",
    type: cc.Node
  })], _ctor.prototype, "btnBuHuo", undefined);
  __decorate([_property({
    displayName: "擦的父节点",
    type: cc.Node
  })], _ctor.prototype, "cleanParent", undefined);
  __decorate([_property({
    displayName: "当前多少个圈",
    type: cc.Label
  })], _ctor.prototype, "labCircle", undefined);
  __decorate([_property({
    displayName: "当前多少个鉴宝数",
    type: cc.Label
  })], _ctor.prototype, "labJianbao", undefined);
  __decorate([_property({
    displayName: "提示节点",
    type: cc.Node
  })], _ctor.prototype, "tipNode", undefined);
  __decorate([_property({
    displayName: "路径点图片",
    type: cc.SpriteFrame
  })], _ctor.prototype, "pathPoint", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_FerruleGameLogic;