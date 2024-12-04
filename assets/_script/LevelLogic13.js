Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelLogic13 = exports._LevelLogic13 = exports.Level13State = undefined;
var i;
var r_CleanComponent = require("CleanComponent");
var r_Level13Component = require("Level13Component");
var r_RelaxSystem = require("RelaxSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
(function (e) {
  e[e.Eliminate = 0] = "Eliminate";
})(i = exports.Level13State || (exports.Level13State = {}));
var exp__LevelLogic13 = function () {
  function _ctor() {
    this.toolIndexList = [0, 1, 0, 1, 2, 3, 4];
    this.playingSound = "";
    this.missTakeCount = 0;
    this.maxMissTakeCount = 2;
  }
  _ctor.prototype.loadLevelSuccess = function (e) {
    var t = this;
    this.curState = i.Eliminate;
    this.levelNode = e;
    this.levelCom = this.levelNode.addComponent(r_Level13Component.default);
    this.toolList = [];
    this.startPosList = [];
    this.missTakeCount = 0;
    for (var o = 0; o < 5; o++) {
      var s = this.levelNode.getChildByName("tool" + (o + 1));
      var r = cc.v2(s.x, s.y);
      s.zIndex = 99;
      s.active = true;
      this.startPosList.push(r);
      this.toolList.push(s);
    }
    this.stepNodes = [];
    for (o = 0; o < 7; o++) {
      (s = this.levelNode.getChildByName("downPic" + (o + 1))).active = false;
      this.stepNodes.push(s);
    }
    this.curIndex = 0;
    this.curCleanTool = this.toolList[this.toolIndexList[this.curIndex]];
    this.curStepNode = this.stepNodes[this.curIndex];
    this.cleanCom = this.curStepNode.getChildByName("uper").getComponent(r_CleanComponent.default);
    this.mask = this.curStepNode.getChildByName("uper").getChildByName("Mask").getComponent(cc.Mask);
    this.curStepNode.active = true;
    this.curCleanTool.active = true;
    this.mask.inverted = true;
    this.levelNode.getChildByName("x").active = false;
    var l = this.curCleanTool.getChildByName("skel");
    l && (l.getComponent(sp.Skeleton).paused = true);
    r_UtilsSystem.UtilsSystem.scheduleOnce(100, function () {
      t.cleanCom.startClean(function () {
        cc.log("清理成功");
        t.isCleanUp = true;
      }, t.curCleanTool.getChildByName("head"));
    });
    this.registTouch();
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    r_RelaxSystem.RelaxSystem.unregistTouch();
    var t = null;
    var o = null;
    var i = 0;
    var a = 0;
    var u = cc.director.getScene().getChildByName("Canvas").getChildByName("touchBg");
    u.on(cc.Node.EventType.TOUCH_START, function (n) {
      if (!r_RelaxSystem.RelaxSystem.isFinishGame) {
        o = n.getLocation();
        e.toolList.forEach(function (n) {
          var s = n;
          var r = s.convertToNodeSpaceAR(o);
          var c = s.getComponent(cc.PolygonCollider);
          if (s.active && cc.Intersection.pointInPolygon(r, c.points)) {
            var u = s.getChildByName("effect");
            u && (u.active = true);
            i = (t = s).x;
            a = t.y;
            var h = s.getChildByName("skel");
            h && (h.getComponent(sp.Skeleton).paused = false);
            r_SoundMgr.SoundMgr.playSound("getItem");
            e.cleanCom.setCanTouchMask(true);
            if ("" != e.playingSound) {
              r_SoundMgr.SoundMgr.stopSound(e.playingSound);
              e.playingSound = "";
            }
            if (0 == e.toolIndexList[e.curIndex]) {
              e.playingSound = "yangyang";
              r_SoundMgr.SoundMgr.playSound(e.playingSound, true);
            } else if (1 == e.toolIndexList[e.curIndex]) {
              e.playingSound = "sprinkle";
              r_SoundMgr.SoundMgr.playSound(e.playingSound, true);
            } else if (2 == e.toolIndexList[e.curIndex]) {
              e.playingSound = "penwu";
              r_SoundMgr.SoundMgr.playSound(e.playingSound, true);
            } else if (3 == e.toolIndexList[e.curIndex]) {
              e.playingSound = "brush_l";
              r_SoundMgr.SoundMgr.playSound(e.playingSound, true);
            } else if (4 == e.toolIndexList[e.curIndex]) {
              e.playingSound = "scrub";
              r_SoundMgr.SoundMgr.playSound(e.playingSound, true);
            }
          }
        });
      }
    });
    u.on(cc.Node.EventType.TOUCH_MOVE, function (n) {
      if (t) {
        var s = n.getLocation();
        t.x = i + s.x - o.x;
        t.y = a + s.y - o.y;
        var r = cc.director.getScene().getChildByName("Canvas").getChildByName("touchBg");
        var c = t.getChildByName("head");
        var l = c.parent.convertToWorldSpaceAR(c.position);
        var u = r.convertToNodeSpaceAR(l);
        var h = e.stepNodes[e.curIndex].getComponent(cc.PolygonCollider);
        if (cc.Intersection.pointInPolygon(u, h.points) && t != e.curCleanTool) {
          e.cleanCom.setCanTouchMask(false);
          e.restorePos(t);
          e.missTake();
          return void (t = null);
        }
      }
    });
    u.on(cc.Node.EventType.TOUCH_END, function () {
      if (t) {
        e.restorePos(t);
        if (e.isCleanUp) {
          if (e.curIndex >= e.stepNodes.length - 1) {
            e.curStepNode.getChildByName("gaoguang").active = true;
            e.isCleanUp = false;
            e.cleanCom.clear();
            r_SoundMgr.SoundMgr.playSound("flash");
            return void r_TimeSystem.TimeSystem.scheduleOnce("level3Win", 2, function () {
              r_RelaxSystem.RelaxSystem.win();
            });
          }
          e.isCleanUp = false;
          e.curCleanTool.active = false;
          e.curStepNode.active = false;
          e.curIndex++;
          e.curStepNode = e.stepNodes[e.curIndex];
          e.curStepNode.active = true;
          e.curCleanTool = e.toolList[e.toolIndexList[e.curIndex]];
          e.toolList.forEach(function (e) {
            e.active = true;
          });
          var o = e.curCleanTool.getChildByName("skel");
          o && (o.getComponent(sp.Skeleton).paused = true);
          e.cleanCom = e.curStepNode.getChildByName("uper").getComponent(r_CleanComponent.default);
          e.cleanCom.setCanTouchMask(true);
          e.curIndex;
          e.curCleanTool.angle = 0;
          if (4 == e.curIndex) {
            e.curCleanState = r_CleanComponent.CleanState.AddPic;
            var i = [];
            var a = e.curStepNode.getChildByName("uper").getChildByName("Mask").getChildByName("upPic5");
            for (var u = 0; u < a.childrenCount; u++) {
              var h = a.children[u];
              h.active = false;
              i.push(h);
            }
            r_UtilsSystem.UtilsSystem.scheduleOnce(100, function () {
              e.cleanCom.startAddPic(e.curCleanTool.getChildByName("head"), i, function () {
                e.isCleanUp = true;
                cc.log("泡沫涂完");
              });
            });
          } else {
            e.curIndex;
            e.curCleanState = r_CleanComponent.CleanState.Clean;
            r_UtilsSystem.UtilsSystem.scheduleOnce(100, function () {
              e.cleanCom.startClean(function () {
                cc.log("清理成功");
                e.isCleanUp = true;
              }, e.curCleanTool.getChildByName("head"));
            });
          }
        }
        t = null;
      }
    });
  };
  _ctor.prototype.changeNextTool = function (e) {
    var t = this;
    this.curCleanTool.active = false;
    this.curStepNode.active = false;
    this.curIndex = e;
    this.curCleanTool = this.toolList[this.toolIndexList[this.curIndex]];
    this.curStepNode = this.stepNodes[this.curIndex];
    this.curCleanTool.active = true;
    this.curStepNode.active = true;
    this.cleanCom.startClean(function () {
      t.isCleanUp = true;
      cc.log("清理完成");
    }, this.curCleanTool.getChildByName("head"));
  };
  _ctor.prototype.missTake = function () {
    var e = this;
    this.missTakeCount++;
    var t = this.levelNode.getChildByName("x");
    t.active = true;
    t.scale = 0;
    r_SoundMgr.SoundMgr.playSound("fail1");
    cc.tween(t).to(.3, {
      scale: 1.1
    }).to(.2, {
      scale: .9
    }).to(.2, {
      scale: 1.1
    }).to(.2, {
      scale: 1
    }).delay(1).to(.3, {
      scale: 0
    }).call(function () {
      t.active = false;
      e.missTakeCount >= e.maxMissTakeCount && r_RelaxSystem.RelaxSystem.lose();
    }).start();
    console.log("错误：", this.missTakeCount);
  };
  _ctor.prototype.review = function () {
    this.missTakeCount = 0;
  };
  _ctor.prototype.restorePos = function (e) {
    this.cleanCom.setCanTouchMask(false);
    var t = this.toolList.indexOf(e);
    var o = this.startPosList[t].x;
    var i = this.startPosList[t].y;
    cc.tween(e).to(.5, {
      x: o,
      y: i
    }).start();
    var n = e.getChildByName("effect");
    n && (n.active = false);
    var a = e.getChildByName("skel");
    a && (a.getComponent(sp.Skeleton).paused = true);
    if (this.playingSound) {
      r_SoundMgr.SoundMgr.stopSound(this.playingSound);
      this.playingSound = "";
    }
  };
  return _ctor;
}();
exports._LevelLogic13 = exp__LevelLogic13;
exports.LevelLogic13 = new exp__LevelLogic13();