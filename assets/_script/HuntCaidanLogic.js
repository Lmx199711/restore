var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var r_LevelPreload = require("LevelPreload");
var r_PicLabel1 = require("PicLabel1");
var r_HuntCaidanResult = require("HuntCaidanResult");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_HuntCaidanLogic = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchNode = null;
    t.lightNode = null;
    t.zhuaZiNode = null;
    t.timeBg = null;
    t.tipNode = null;
    t.langNodeList = [];
    t.langTargetPos = [];
    t.labTime = null;
    t.m_isGameOver = false;
    t.m_Time = 3;
    t.m_curShow = 0;
    t.m_hitCount = 0;
    t.m_finishList = [false, false, false, false, false, false];
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
      this.m_Time -= e;
      if (this.m_Time <= 0) {
        this.m_Time = 0;
        this.labTime.setString(this.m_Time.toFixed(2));
        this.zhuaZiNode.active = true;
        r_SoundMgr.SoundMgr.playSound("hunt/爪击");
        return void this.showGameOver(false);
      }
      this.labTime.setString(this.m_Time.toFixed(2));
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
    for (var e = 0; e < this.langNodeList.length; e++) {
      this.langNodeList[e].active = false;
      this.langNodeList[e].getChildByName("绿").active = false;
    }
    this.timeBg.active = false;
    this.tipNode.active = false;
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
    for (var t = 0; t < this.langNodeList.length; t++) {
      this.langNodeList[t] && cc.Tween.stopAllByTarget(this.langNodeList[t]);
    }
    this.tipNode && cc.Tween.stopAllByTarget(this.tipNode);
  };
  _ctor.prototype.startGame = function () {
    var e = this;
    this.m_isGameOver = true;
    var t = this;
    var o = function () {
      if (t.m_curShow >= 6) {
        r_TimeSystem.TimeSystem.scheduleOnce("showTipNode", .5, function () {
          e.showLangMove();
        });
      } else {
        t.showLangAnim(t.langNodeList[t.m_curShow], "walk_2", false);
        r_TimeSystem.TimeSystem.scheduleOnce("show" + t.m_curShow, .3, function () {
          t.m_curShow += 1;
          o();
        });
      }
    };
    o();
    this.showTipNode();
    this.lightNode.active = true;
  };
  _ctor.prototype.showLangMove = function () {
    this.m_isGameOver = false;
    this.lightNode.active = false;
    this.timeBg.active = true;
    this.labTime.setString(this.m_Time.toFixed(2));
    cc.Tween.stopAllByTarget(this.tipNode);
    this.tipNode.active = false;
    for (var e = 0; e < this.langNodeList.length; e++) {
      this.showLangGreenAnim(this.langNodeList[e], "idle", true);
      cc.tween(this.langNodeList[e]).to(3, {
        x: this.langTargetPos[e].x,
        y: this.langTargetPos[e].y
      }).start();
    }
  };
  _ctor.prototype.showLangAnim = function (e, t, o, i) {
    e.active = true;
    var n = e.getChildByName("动画").getComponent(sp.Skeleton);
    var a = n.setAnimation(0, t, o);
    o || n.setTrackCompleteListener(a, function () {
      i && i();
      n.setAnimation(0, "walk", true);
    });
  };
  _ctor.prototype.showLangGreenAnim = function (e, t, o, i) {
    e.getChildByName("绿").active = true;
    var n = e.getChildByName("绿").getComponent(sp.Skeleton);
    var a = n.setAnimation(0, t, o);
    o || n.setTrackCompleteListener(a, function () {
      i && i();
    });
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
  _ctor.prototype.showTipNode = function () {
    this.tipNode.active = true;
    cc.tween(this.tipNode).repeatForever(cc.tween().to(.5, {
      opacity: 0
    }).to(.5, {
      opacity: 255
    })).start();
  };
  _ctor.prototype.showGameOver = function (e) {
    undefined === e && (e = true);
    this.m_isGameOver = true;
    this.timeBg.active = false;
    var t = 1;
    e || (t = 2);
    r_TimeSystem.TimeSystem.scheduleOnce("resultSuccess", t, function () {
      if (e) {
        r_HuntCaidanResult.HuntCaidanResult.showUI({
          mode: 1
        });
      } else {
        r_HuntCaidanResult.HuntCaidanResult.showUI({
          mode: 0
        });
      }
    });
  };
  _ctor.prototype.onClickAdd = function () {
    r_SoundMgr.SoundMgr.playSound("click");
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
    this.m_touchStartPos = e.getLocation();
    if (this.m_startID && this.m_startID != e.getID()) {
      e.stopPropagation();
    } else {
      this.m_startID = e.getID();
      this.m_moveInfo = {};
      if (!this.m_isGameOver) {
        var o = function (e) {
          if (i.m_finishList[e]) {
            return "continue";
          }
          r_SoundMgr.SoundMgr.stopAllSound();
          r_SoundMgr.SoundMgr.playSound("hunt/枪声");
          if (r_UtilsSystem.UtilsSystem.touchInNode(i.langNodeList[e].getChildByName("绿"), i.m_touchStartPos)) {
            i.m_finishList[e] = true;
            i.m_hitCount += 1;
            cc.Tween.stopAllByTarget(i.langNodeList[e]);
            i.showLangGreenAnim(i.langNodeList[e], "skill_1", false, function () {
              t.langNodeList[e].active = false;
            });
            if (i.m_hitCount >= i.m_finishList.length) {
              r_SoundMgr.SoundMgr.playMusic("hunt/猎场BGM");
              i.showGameOver();
            }
          }
        };
        var i = this;
        for (var n = 0; n < this.langNodeList.length; n++) {
          o(n);
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
    displayName: "光闪烁"
  })], _ctor.prototype, "lightNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "爪子动画"
  })], _ctor.prototype, "zhuaZiNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "倒计时bg"
  })], _ctor.prototype, "timeBg", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "提示节点"
  })], _ctor.prototype, "tipNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "狼"
  })], _ctor.prototype, "langNodeList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "狼初始位置"
  })], _ctor.prototype, "langTargetPos", undefined);
  __decorate([_property({
    type: r_PicLabel1.PicLabel1,
    displayName: "倒计时"
  })], _ctor.prototype, "labTime", undefined);
  return __decorate([_ccclass], _ctor);
}(r_LevelPreload.default);
exports.default = def_HuntCaidanLogic;