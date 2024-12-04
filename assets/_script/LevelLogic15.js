Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelLogic15 = exports._LevelLogic15 = exports.Level15State = undefined;
var i;
var r_CleanComponent = require("CleanComponent");
var r_RelaxSystem = require("RelaxSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
(function (e) {
  e[e.Clean1 = 0] = "Clean1";
  e[e.Tongs = 1] = "Tongs";
  e[e.Clean2 = 2] = "Clean2";
  e[e.Clean3 = 3] = "Clean3";
  e[e.Horseshoe = 4] = "Horseshoe";
  e[e.Nail = 5] = "Nail";
})(i = exports.Level15State || (exports.Level15State = {}));
var exp__LevelLogic15 = function () {
  function _ctor() {
    this.toolIndexList = [0, 2, 3, 1, 0];
    this.toolSound = ["sprinkle", "null", "hook", "saw", "pliers", "spray", "spray"];
    this.cleanLayerList = [];
    this.toolList = [];
    this.maxZIndex = 10;
    this.curState = i.Clean1;
    this.curCleanState = r_CleanComponent.CleanState.AddPic;
    this.curCleanTool = null;
    this.curItemCleanCpt = null;
    this.isCleanUp = false;
    this.playingSound = null;
    this.nailPos = null;
    this.bandagePos = null;
    this.soundPic = null;
    this.winEffect = null;
    this.isPlayAnim = false;
    this.nailList = [];
  }
  _ctor.prototype.loadLevelSuccess = function (e) {
    var t = this;
    this.curState = i.Clean1;
    this.isCleanUp = false;
    this.maxZIndex = 10;
    this.levelNode = e;
    var o = [];
    var a = [];
    this.cleanLayerList = [];
    this.toolList = [];
    this.nailList = [];
    a.push(this.levelNode.getChildByName("move"));
    this.footArea = this.levelNode.getChildByName("footArea");
    this.winEffect = this.levelNode.getChildByName("winEffect");
    this.soundPic = this.levelNode.getChildByName("sound");
    this.soundPic.active = false;
    for (var s = 1; s <= 6; s++) {
      var c = (l = this.levelNode.getChildByName("move").getChildByName("cleanLayer" + s)).getComponent(r_CleanComponent.default);
      c && c.initPoints();
      l.startZIndex = l.zIndex;
      l.levelIndex = s - 1;
      l.startX = l.x;
      l.startY = l.y;
      o.push(l);
      this.cleanLayerList.push(l);
    }
    for (s = 1; s <= 6; s++) {
      var l;
      (l = this.levelNode.getChildByName("tool" + s)).getChildByName("effect") && (l.getChildByName("effect").active = false);
      l.zIndex = 99;
      l.levelIndex = s - 1;
      l.startX = l.x;
      l.startY = l.y;
      this.toolList.push(l);
    }
    var u = this.levelNode.getChildByName("move").getChildByName("cleanLayer2")._children;
    for (s = 0; s < u.length; s++) {
      var h = u[s];
      "nail" == h._name && this.nailList.push(h);
    }
    var p = this.levelNode.getChildByName("tool5Pos");
    this.tool5Pos = p.convertToWorldSpaceAR(cc.Vec3.ZERO);
    this.nailPic = this.levelNode.getChildByName("nailPic");
    this.nailPic.active = false;
    this.nailPic.zIndex = 999;
    this.nailPicPos = this.nailPic.convertToWorldSpaceAR(cc.Vec3.ZERO);
    this.dropItem = this.levelNode.getChildByName("dropItem");
    this.dropItem.active = false;
    this.playEnterAnim(a);
    this.registTouch();
    r_UtilsSystem.UtilsSystem.scheduleOnce(100, function () {
      t.changeTools();
    });
  };
  _ctor.prototype.playEnterAnim = function (e) {
    var t = this;
    this.isPlayAnim = true;
    r_UtilsSystem.UtilsSystem.scheduleOnce(1e3, function () {
      r_SoundMgr.SoundMgr.playSound("horse");
      t.soundPic.active = true;
      r_UtilsSystem.UtilsSystem.scheduleOnce(1e3, function () {
        t.soundPic.active = false;
      });
    });
    for (var o = 0; o < e.length; o++) {
      var i = e[o];
      if (i.active) {
        i.recStartY = i.y;
        i.y = i.recStartY + 750;
        cc.tween(i).delay(2).to(1, {
          position: cc.v2(i.x, i.recStartY)
        }, {
          easing: "backOut"
        }).start();
      }
    }
    r_UtilsSystem.UtilsSystem.scheduleOnce(3e3, function () {
      t.isPlayAnim = false;
    });
  };
  _ctor.prototype.changeTools = function () {
    var e = this;
    this.curCleanTool = this.toolList[this.curState];
    var t = this.cleanLayerList[this.curState];
    if (t && (this.curItemCleanCpt = t.getComponent(r_CleanComponent.default), this.curItemCleanCpt)) {
      var o = 0;
      var a = [.3, .6, .8];
      this.curItemCleanCpt.startClean(function () {
        console.log("清理成功");
        e.isCleanUp = true;
      }, this.curCleanTool.getChildByName("head"), function (t) {
        if (e.curState == i.Clean2 && a[o] && t >= a[o]) {
          o += 1;
          var n = cc.instantiate(e.dropItem);
          e.dropItem.parent.addChild(n);
          n.active = true;
          var s = e.curCleanTool.getChildByName("head").convertToWorldSpaceAR(cc.Vec3.ZERO);
          var c = n.parent.convertToNodeSpaceAR(s);
          n.x = c.x;
          n.y = c.y;
          cc.tween(n).to(1, {
            position: cc.v2(n.x, n.y - 750)
          }, {
            easing: "backOut"
          }).start();
          r_UtilsSystem.UtilsSystem.scheduleOnce(1e3, function () {
            n.destroy();
          });
        }
      });
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    r_RelaxSystem.RelaxSystem.unregistTouch();
    var t = null;
    var o = null;
    var n = 0;
    var s = 0;
    var r = cc.director.getScene().getChildByName("Canvas").getChildByName("touchBg");
    var l = false;
    r.on(cc.Node.EventType.TOUCH_START, function (r) {
      t = null;
      if (!e.isPlayAnim && !r_RelaxSystem.RelaxSystem.isFinishGame) {
        l = false;
        o = r.getLocation();
        for (var u = 0; u < e.toolList.length; u++) {
          var h = e.toolList[u];
          var p = h.convertToNodeSpaceAR(o);
          var d = h.getComponent(cc.PolygonCollider);
          if (h.active && cc.Intersection.pointInPolygon(p, d.points)) {
            n = (t = h).x;
            s = t.y;
            t.angle = 0;
            t.zIndex = e.maxZIndex + 1;
            e.maxZIndex = t.zIndex;
            r_SoundMgr.SoundMgr.playSound("getItem");
            if (h.levelIndex == e.curState) {
              l = true;
              e.curItemCleanCpt && e.curItemCleanCpt.setCanTouchMask(true);
            }
            e.curState != i.Clean1 && e.curState != i.Clean2 && e.curState != i.Clean3 || (e.playingSound = e.toolSound[e.curState]);
            t.getChildByName("effect") && (t.getChildByName("effect").active = true);
            return void (e.playingSound && r_SoundMgr.SoundMgr.playSound(e.playingSound, true));
          }
        }
      }
    });
    r.on(cc.Node.EventType.TOUCH_MOVE, function (a) {
      if (t) {
        var r = a.getLocation();
        t.x = n + r.x - o.x;
        t.y = s + r.y - o.y;
        if (!l) {
          var u = (y = t.getChildByName("head")).parent.convertToWorldSpaceAR(y.position);
          var h = e.footArea.convertToNodeSpaceAR(u);
          var p = e.footArea.getComponent(cc.PolygonCollider);
          if (cc.Intersection.pointInPolygon(h, p.points)) {
            t = null;
            if (e.playingSound) {
              r_SoundMgr.SoundMgr.stopSound(e.playingSound);
              e.playingSound = null;
            }
            return void e.showLoseAnim();
          }
        }
        if (e.curState == i.Tongs) {
          var d = e.levelNode.getChildByName("move").getChildByName("cleanLayer2").getChildByName("item");
          if (d.isFinish) {
            return;
          }
          u = (y = t.getChildByName("head")).parent.convertToWorldSpaceAR(y.position);
          var y;
          for (var f = 0; f < e.nailList.length; f++) {
            var m = e.nailList[f];
            var g = m.parent.convertToWorldSpaceAR(m.position);
            if (Math.abs(u.x - g.x) <= 30 && Math.abs(u.y - g.y) <= 30) {
              e.isCleanUp = true;
              d.isFinish = true;
              cc.tween(d).to(1, {
                position: cc.v2(d.x, d.y - 750)
              }, {
                easing: "backOut"
              }).start();
            }
          }
        }
      }
    });
    r.on(cc.Node.EventType.TOUCH_END, function (o) {
      e.curItemCleanCpt && e.curItemCleanCpt.setCanTouchMask(false);
      if (t) {
        if (e.playingSound) {
          r_SoundMgr.SoundMgr.stopSound(e.playingSound);
          e.playingSound = null;
        }
        t.getChildByName("effect") && (t.getChildByName("effect").active = false);
        o.getLocation();
        if (e.curState == i.Horseshoe) {
          var n = t.getChildByName("head").convertToWorldSpaceAR(cc.Vec3.ZERO);
          if (Math.abs(n.x - e.tool5Pos.x) <= 100 && Math.abs(n.y - e.tool5Pos.y) <= 100) {
            var s = t.parent.convertToNodeSpaceAR(e.tool5Pos);
            t.x = s.x;
            t.y = s.y;
            t = null;
            e.curState = e.curState + 1;
            return void e.changeTools();
          }
        }
        if (e.curState == i.Nail && (n = t.getChildByName("head").convertToWorldSpaceAR(cc.Vec3.ZERO), Math.abs(n.x - e.nailPicPos.x) <= 200 && Math.abs(n.y - e.nailPicPos.y) <= 200)) {
          r_SoundMgr.SoundMgr.playSound("ding");
          e.nailPic.active = true;
          t.active = false;
          e.winEffect.active = true;
          r_RelaxSystem.RelaxSystem.win();
          return void e.changeTools();
        }
        t.x = t.startX;
        t.y = t.startY;
        t = null;
        if (e.isCleanUp) {
          e.isCleanUp = false;
          e.curState != i.Clean3 && e.curItemCleanCpt && e.curItemCleanCpt.clear();
          e.curState = e.curState + 1;
          e.changeTools();
        }
      }
    });
  };
  _ctor.prototype.showLoseAnim = function () {
    var e = this;
    r_TimeSystem.TimeSystem.scheduleClear("GameLoseTime");
    r_TimeSystem.TimeSystem.scheduleClear("GameLoseTime1");
    r_RelaxSystem.RelaxSystem.isFinishGame = true;
    r_SoundMgr.SoundMgr.playSound("horse");
    this.soundPic.active = true;
    r_UtilsSystem.UtilsSystem.scheduleOnce(1e3, function () {
      e.soundPic.active = false;
    });
    for (var t = 0; t < this.toolList.length; t++) {
      this.toolList[t].animStartX = this.toolList[t].x;
    }
    var o = this.levelNode.getChildByName("move");
    cc.tween(o).delay(1).call(function () {
      r_TimeSystem.TimeSystem.timeMapUpdate("gameLoseAnim", .5, function (t) {
        for (var o = 0; o < e.toolList.length; o++) {
          e.toolList[o].x = e.toolList[o].animStartX - 2e3 * t;
        }
      });
    }).to(.5, {
      angle: -120
    }).start();
    r_UtilsSystem.UtilsSystem.scheduleOnce(1500, function () {
      r_RelaxSystem.RelaxSystem.lose();
    });
  };
  _ctor.prototype.loseAnim = function () {
    this.showLoseAnim();
  };
  return _ctor;
}();
exports._LevelLogic15 = exp__LevelLogic15;
exports.LevelLogic15 = new exp__LevelLogic15();