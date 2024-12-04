var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CleanComponent = require("CleanComponent");
var r_SoundMgr = require("SoundMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var def_Level102Com = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.creamCleanComs = [];
    t.cream = [];
    t.isInitClean = false;
    t.cleanProgress = 0;
    t.curState = 1;
    t.curSelectTools = null;
    t.curToolHead = null;
    t.curCleanCom = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.initClean();
    this.registTouch();
  };
  _ctor.prototype.initClean = function () {
    if (!this.isInitClean) {
      this.scraperCleanCom.initPoints();
      this.scraperCleanCom.startClean(this.cleanSuccess.bind(this), this.scraper.getChildByName("head"), this.updateCleanProgress.bind(this));
      for (var e = 0; e < this.creamCleanComs.length; e++) {
        this.creamCleanComs[e].initPoints();
        this.creamCleanComs[e].startClean(this.cleanSuccess.bind(this), this.cream[e].getChildByName("head"), this.updateCleanProgress.bind(this));
      }
      this.isInitClean = true;
      console.log("清理初始化");
    }
  };
  _ctor.prototype.cleanSuccess = function () {
    this.cleanProgress = 1;
  };
  _ctor.prototype.updateCleanProgress = function (e) {
    1 != this.cleanProgress && (this.cleanProgress = e);
  };
  _ctor.prototype.getCreamIndex = function () {
    if (this.curState > 2) {
      return this.curState - 2;
    } else {
      return 0;
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    var t = null;
    var o = null;
    var i = 0;
    var n = 0;
    var a = null;
    this.touchBg.on(cc.Node.EventType.TOUCH_START, function (s) {
      t = null;
      a = null;
      if (!(e.curState >= 7)) {
        o = s.getLocation();
        for (var c = 0; c < e.cream.length; c++) {
          var l = e.cream[c];
          var u = l.convertToNodeSpaceAR(o);
          var h = l.getComponent(cc.PolygonCollider);
          if (cc.Intersection.pointInPolygon(u, h.points)) {
            t = l;
            i = l.x;
            n = l.y;
            e.curToolHead = t.getChildByName("head");
            r_SoundMgr.SoundMgr.playSound("getItem");
            a = "jiyaxifalu";
            if (2 != e.curState && null == e.curSelectTools) {
              e.curSelectTools = t;
              var p = e.getCreamIndex();
              (m = e.creamCleanComs[p]).cleanToolHead = e.curToolHead;
              e.curCleanCom = m;
              var d = m.node.getChildByName("mask1");
              for (var y = 1; y <= 5; y++) {
                d.getChildByName(y + "").active = y == c + 1;
              }
              if (0 == p) {
                var f = e.scraperCleanCom.node.getChildByName("mask1");
                for (y = 1; y <= 5; y++) {
                  f.getChildByName(y + "").active = y == c + 1;
                }
              }
            }
            break;
          }
        }
        if (!t && (u = e.scraper.convertToNodeSpaceAR(o), h = e.scraper.getComponent(cc.PolygonCollider), cc.Intersection.pointInPolygon(u, h.points) && (t = e.scraper, i = e.scraper.x, n = e.scraper.y, e.curToolHead = t.getChildByName("head"), r_SoundMgr.SoundMgr.playSound("getItem"), a = "tuoba", 2 == e.curState && null == e.curSelectTools))) {
          e.curSelectTools = t;
          var m = e.scraperCleanCom;
          e.curCleanCom = m;
        }
        if (e.curCleanCom) {
          if (t == e.curSelectTools) {
            e.curCleanCom.setCanTouchMask(true);
          } else {
            e.curCleanCom.setCanTouchMask(false);
          }
        }
        a && r_SoundMgr.SoundMgr.playSound(a, true);
      }
    });
    this.touchBg.on(cc.Node.EventType.TOUCH_MOVE, function (a) {
      if (!(e.curState >= 7) && t) {
        var s = a.getLocation();
        t.x = i + s.x - o.x;
        t.y = n + s.y - o.y;
        if (t != e.curSelectTools) {
          var r = e.curToolHead;
          var l = e.errorCollider.node.convertToNodeSpaceAR(r.convertToWorldSpaceAR(cc.Vec2.ZERO));
          if (cc.Intersection.pointInPolygon(l, e.errorCollider.points)) {
            r_TriggerActionMgr.TriggerActionMgr.trigger("游戏失败");
            t.x = i;
            t.y = n;
            t = null;
          }
        }
      }
    });
    this.touchBg.on(cc.Node.EventType.TOUCH_END, function () {
      if (a) {
        r_SoundMgr.SoundMgr.stopSound(a);
        a = null;
      }
      if (!(e.curState >= 7)) {
        if (t && (t.x = i, t.y = n, 1 == e.cleanProgress && (e.curCleanCom.cleanCompeleted(), e.cleanProgress = 0, e.curState = e.curState + 1, e.curSelectTools = null, e.curCleanCom = null, 3 == e.curState && r_TriggerActionMgr.TriggerActionMgr.trigger("移出刮刀"), e.curState >= 7))) {
          r_TriggerActionMgr.TriggerActionMgr.trigger("移出工具2");
          e.scraperCleanCom.unregistTouch();
          for (var o = 0; o < e.creamCleanComs.length; o++) {
            e.creamCleanComs[o].unregistTouch();
          }
        }
        t = null;
      }
    });
    this.touchBg._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.checkFail = function () {};
  __decorate([_property({
    type: [r_CleanComponent.default],
    displayName: "奶油胶清理节点"
  })], _ctor.prototype, "creamCleanComs", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "奶油胶列表"
  })], _ctor.prototype, "cream", undefined);
  __decorate([_property({
    type: r_CleanComponent.default,
    displayName: "刮刀清理节点"
  })], _ctor.prototype, "scraperCleanCom", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "刮刀"
  })], _ctor.prototype, "scraper", undefined);
  __decorate([_property({
    type: cc.PolygonCollider,
    displayName: "错误检测范围碰撞框"
  })], _ctor.prototype, "errorCollider", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击范围"
  })], _ctor.prototype, "touchBg", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_Level102Com;