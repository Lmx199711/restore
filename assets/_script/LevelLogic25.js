Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelLogic25 = exports.Level25State = undefined;
var a;
var r_CleanComponent = require("CleanComponent");
var r_RelaxSystem = require("RelaxSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
(function (e) {
  e[e.SmoothHair = 0] = "SmoothHair";
  e[e.Wash = 1] = "Wash";
  e[e.TuPaoMo = 2] = "TuPaoMo";
  e[e.Wash1 = 3] = "Wash1";
  e[e.TuPaoMo1 = 4] = "TuPaoMo1";
  e[e.Wash2 = 5] = "Wash2";
  e[e.SmoothAgain = 6] = "SmoothAgain";
  e[e.CutHair = 7] = "CutHair";
  e[e.BlowWind = 8] = "BlowWind";
})(a = exports.Level25State || (exports.Level25State = {}));
var def_LevelLogic25 = function () {
  function _ctor() {
    this.skinList = ["0", "1", "2", "4", "5", "9", "8"];
    this.toolIndexList = [0, 1, 6, 1, 2, 1, 3, 4, 5];
    this.toolSound = ["jimaodanzi", "sprinkle", "feizao", "brush_l", "timao", "chuifengji", "feizao"];
    this.toolHoldScales = [.5, 1, .7, 1, 1, 1, 1];
    this.toolHoldAngle = [60, 0, 0, 0, 60, 0, 0];
    this.isPlayingAnim = false;
    this.breakDirtyDis = 50;
    this.maxDeathCount = 1;
  }
  _ctor.prototype.loadLevelSuccess = function (e) {
    var t = this;
    this.levelNode = e;
    this.layerList = [];
    for (var o = 0; o < 7; o++) {
      var i = this.levelNode.getChildByName("layer" + o);
      if (o < 5) {
        i.getChildByName("jinmao").getComponent(sp.Skeleton).setSkin(this.skinList[o + 1]);
        i.getChildByName("eventNode").getChildByName("Mask").getChildByName("jinmao").getComponent(sp.Skeleton).setSkin(this.skinList[o]);
      } else if (o > 5) {
        i.getChildByName("jinmao").getComponent(sp.Skeleton).setSkin(this.skinList[o]);
        i.getChildByName("eventNode").getChildByName("Mask").getChildByName("jinmao").getComponent(sp.Skeleton).setSkin(this.skinList[o - 1]);
      }
      i.active = false;
      this.layerList.push(i);
    }
    this.toolList = [];
    this.toolStartPoses = [];
    this.toolOrigScales = [];
    this.toolOrigAngle = [];
    for (o = 0; o < 7; o++) {
      var n = (i = this.levelNode.getChildByName("tool" + o)).getChildByName("skel");
      n && (n.getComponent(sp.Skeleton).paused = true);
      var r = i.getChildByName("effect");
      r && (r.active = false);
      var l = i.getChildByName("holddown");
      var u = i.getChildByName("holdon");
      if (l && u) {
        l.active = true;
        u.active = false;
      }
      this.toolOrigScales.push(i.scale);
      this.toolOrigAngle.push(i.angle);
      this.toolStartPoses.push(i.getPosition());
      this.toolList.push(i);
    }
    this.lightEffect = this.levelNode.getChildByName("lightEffect");
    this.hair = this.levelNode.getChildByName("hair");
    this.hairNode = this.levelNode.getChildByName("hairNode");
    this.checkNode = this.levelNode.getChildByName("checkNode");
    this.levelNode.getChildByName("x").active = false;
    this.curState = a.SmoothHair;
    this.curCleanState = r_CleanComponent.CleanState.Clean;
    this.isPlayingAnim = false;
    this.curLayerIndex = 0;
    this.curLayer = this.layerList[this.curLayerIndex];
    this.curLayer.active = true;
    this.isDirtyBreaks = [];
    this.breakTotalCount = 0;
    this.breakCount = 0;
    var h = this.curLayer.getChildByName("dirtys");
    for (o = 0; o < h.childrenCount; o++) {
      this.isDirtyBreaks.push(false);
      this.breakTotalCount++;
    }
    this.deathCount = 0;
    this.isAddedDeathCount = false;
    this.curCleanTool = this.toolList[this.toolIndexList[this.curState]];
    this.curItemCleanCpt = this.curLayer.getChildByName("eventNode").getComponent(r_CleanComponent.default);
    this.curItemCleanCpt.initPoints();
    r_UtilsSystem.UtilsSystem.scheduleOnce(100, function () {
      t.curItemCleanCpt.startClean(function () {
        t.isCleanUp = true;
        console.log("顺毛完成");
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
    var n = 0;
    var s = cc.director.getScene().getChildByName("Canvas").getChildByName("touchBg");
    var u = false;
    s.on(cc.Node.EventType.TOUCH_START, function (s) {
      t = null;
      if (!e.isPlayingAnim) {
        o = s.getLocation();
        u = false;
        for (var r = 0; r < e.toolList.length; r++) {
          var c = e.toolList[r];
          var h = c.convertToNodeSpaceAR(o);
          var p = c.getComponent(cc.PolygonCollider);
          if (c.active && cc.Intersection.pointInPolygon(h, p.points)) {
            t = c;
            e.curSelectToolIndex = r;
            i = t.x;
            n = t.y;
            t.scale = e.toolHoldScales[r];
            t.angle = e.toolHoldAngle[r];
            r_SoundMgr.SoundMgr.playSound("getItem");
            e.playingSound = e.toolSound[e.toolIndexList[e.curState]];
            e.playingSound && r_SoundMgr.SoundMgr.playSound(e.playingSound, true);
            t.getChildByName("effect") && (t.getChildByName("effect").active = true);
            var d = t.getChildByName("skel");
            d && (d.getComponent(sp.Skeleton).paused = false);
            var y = t.getChildByName("holddown");
            var f = t.getChildByName("holdon");
            if (y && f) {
              y.active = false;
              f.active = true;
            }
            e.curState == a.BlowWind && r == e.toolIndexList[e.curState] && (e.curLayer.getChildByName("jinmao_cm").getComponent(sp.Skeleton).paused = false);
            if (r == e.toolIndexList[e.curState]) {
              e.curCleanTool = e.toolList[e.toolIndexList[e.curState]];
              u = true;
              e.curItemCleanCpt && e.curItemCleanCpt.setCanTouchMask(true);
            }
          }
        }
      }
    });
    s.on(cc.Node.EventType.TOUCH_MOVE, function (s) {
      if (t) {
        var r = t.getChildByName("head");
        var c = r.parent.convertToWorldSpaceAR(r.getPosition());
        if (!u && !e.isAddedDeathCount) {
          var l = e.checkNode.convertToNodeSpaceAR(c);
          var h = e.checkNode.getComponent(cc.PolygonCollider);
          if (cc.Intersection.pointInPolygon(l, h.points)) {
            if (e.deathCount >= e.maxDeathCount) {
              e.missTake();
              e.restorePos(t);
              e.loseAnim();
            } else {
              e.missTake();
              e.restorePos(t);
            }
            return void (t = null);
          }
        }
        var p = s.getLocation();
        t.x = i + p.x - o.x;
        t.y = n + p.y - o.y;
        if (e.curState == a.SmoothHair && e.curSelectToolIndex == a.SmoothHair) {
          var d = e.curLayer.getChildByName("dirtys");
          var y = t.getChildByName("head");
          var f = y.parent.convertToWorldSpaceAR(y.getPosition());
          l = d.convertToNodeSpaceAR(f);
          for (var m = 0; m < d.childrenCount; m++) {
            var g = d.children[m];
            if (g.name.includes("dirty") && !e.isDirtyBreaks[m] && Math.abs(l.x - g.x) < e.breakDirtyDis && Math.abs(l.y - g.y) < e.breakDirtyDis) {
              e.moveDown(g);
              e.breakCount++;
              e.isDirtyBreaks[m] = true;
            }
          }
          e.breakCount / e.breakTotalCount >= .9 && (e.isCleanUp = true);
        }
      }
    });
    s.on(cc.Node.EventType.TOUCH_END, function (o) {
      if (t) {
        o.getLocation();
        if ("" != e.playingSound) {
          r_SoundMgr.SoundMgr.stopSound(e.playingSound);
          e.playingSound = "";
        }
        t.getChildByName("effect") && (t.getChildByName("effect").active = false);
        var i = t.getChildByName("skel");
        i && (i.getComponent(sp.Skeleton).paused = true);
        var n = t.getChildByName("holddown");
        var s = t.getChildByName("holdon");
        if (n && s) {
          n.active = true;
          s.active = false;
        }
        if (!e.isPlayingAnim && (e.curItemCleanCpt && e.curItemCleanCpt.setCanTouchMask(false), e.curState == a.BlowWind && (e.curLayer.getChildByName("jinmao_cm").getComponent(sp.Skeleton).paused = true), t.x = e.toolStartPoses[e.curSelectToolIndex].x, t.y = e.toolStartPoses[e.curSelectToolIndex].y, t.scale = e.toolOrigScales[e.curSelectToolIndex], t.angle = e.toolOrigAngle[e.curSelectToolIndex], e.isAddedDeathCount = false, e.playingSound && (r_SoundMgr.SoundMgr.stopSound(e.playingSound), e.playingSound = null), e.isCleanUp)) {
          e.isCleanUp = false;
          e.isPlayingAnim = true;
          var r = function () {
            if (e.curState >= e.toolIndexList.length - 1) {
              e.playerWinAnim();
            } else if (e.curState == a.Wash || e.curState == a.Wash1 || e.curState == a.Wash2) {
              e.isPlayingAnim = true;
              var t = e.curLayer.getChildByName("water");
              cc.tween(t).to(.5, {
                opacity: 0
              }).call(function () {
                e.changeState();
              }).start();
            } else if (e.curState == a.SmoothAgain) {
              e.moveOutAnim(function () {
                e.changeState();
                e.moveInAnim(function () {});
              }, false);
            } else if (e.curState == a.CutHair) {
              e.moveOutAnim(function () {
                e.changeState();
                e.moveInAnim(function () {}, false);
              });
            } else {
              e.changeState();
            }
          };
          if (e.curState == a.SmoothHair || e.curState == a.SmoothAgain || e.curState == a.BlowWind) {
            if (e.curState == a.SmoothHair) {
              var u = e.curLayer.getChildByName("dirtys");
              for (var h = 0; h < u.childrenCount; h++) {
                u.children[h].active = false;
              }
            }
            var p = e.curLayer.getChildByName("jinmao_cm");
            p && (p.active = false);
            e.curItemCleanCpt.clear();
            var d = e.curLayer.getChildByName("aixin");
            d && r_UtilsSystem.UtilsSystem.scheduleOnce(1e3, function () {
              d.active = true;
            });
            (y = e.curLayer.getChildByName("jinmao").getComponent(sp.Skeleton)).setTrackCompleteListener(y.setAnimation(0, "1", false), function () {
              r();
            });
            r_SoundMgr.SoundMgr.playSound("goukaixin", false);
          } else if (e.curState == a.Wash || e.curState == a.Wash1 || e.curState == a.Wash2) {
            e.curItemCleanCpt.clear();
            var y;
            var f = e.curLayer.getChildByName("gg_shui");
            f && (f.active = true);
            (y = e.curLayer.getChildByName("jinmao").getComponent(sp.Skeleton)).setTrackCompleteListener(y.setAnimation(0, "2", false), function () {
              r();
            });
            r_SoundMgr.SoundMgr.playSound("shuaishui", false);
          } else {
            r();
          }
        }
      }
    });
  };
  _ctor.prototype.missTake = function () {
    this.isAddedDeathCount = false;
    this.deathCount++;
    var e = this.levelNode.getChildByName("x");
    e.active = true;
    e.scale = 0;
    r_SoundMgr.SoundMgr.playSound("fail1");
    cc.tween(e).to(.3, {
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
      e.active = false;
    }).start();
  };
  _ctor.prototype.restorePos = function (e) {
    var t = this.toolStartPoses[this.curSelectToolIndex].x;
    var o = this.toolStartPoses[this.curSelectToolIndex].y;
    cc.tween(e).to(.5, {
      x: t,
      y: o
    }).call(function () {
      e = null;
    }).start();
    e.scale = this.toolOrigScales[this.curSelectToolIndex];
    e.angle = this.toolOrigAngle[this.curSelectToolIndex];
    e.getChildByName("effect") && (e.getChildByName("effect").active = false);
    var i = e.getChildByName("skel");
    i && (i.getComponent(sp.Skeleton).paused = true);
    var n = e.getChildByName("holddown");
    var a = e.getChildByName("holdon");
    if (n && a) {
      n.active = true;
      a.active = false;
    }
    if (!this.isPlayingAnim) {
      this.curItemCleanCpt && this.curItemCleanCpt.setCanTouchMask(false);
      if (this.playingSound) {
        r_SoundMgr.SoundMgr.stopSound(this.playingSound);
        this.playingSound = null;
      }
    }
  };
  _ctor.prototype.changeState = function () {
    var e = this;
    this.isPlayingAnim = false;
    if (this.curState != a.TuPaoMo && this.curState != a.TuPaoMo1) {
      this.curLayer.active = false;
      this.curLayerIndex++;
      this.curLayer = this.layerList[this.curLayerIndex];
      this.curLayer.active = true;
    }
    this.curState++;
    this.curCleanTool = this.toolList[this.toolIndexList[this.curState]];
    if (this.curState == a.TuPaoMo || this.curState == a.TuPaoMo1) {
      this.curCleanState = r_CleanComponent.CleanState.AddPic;
    } else {
      this.curCleanState = r_CleanComponent.CleanState.Clean;
    }
    var t = this.curLayer.getChildByName("eventNode");
    if (t) {
      this.curItemCleanCpt = t.getComponent(r_CleanComponent.default);
      if (this.curCleanState == r_CleanComponent.CleanState.Clean) {
        this.curItemCleanCpt.initPoints();
        if (this.curState == a.Wash || this.curState == a.Wash1 || this.curState == a.Wash2) {
          var o = false;
          var i = false;
          var n = false;
          var r = false;
          var l = false;
          var u = this.curLayer.getChildByName("water");
          r_UtilsSystem.UtilsSystem.scheduleOnce(100, function () {
            e.curItemCleanCpt.startClean(function () {
              e.isCleanUp = true;
              console.log("清理完成");
            }, e.curCleanTool.getChildByName("head"), function (e) {
              if (e >= 0 && e < .2 && !o) {
                u.active = true;
                u.scale = 0;
                o = true;
                cc.tween(u).to(.2, {
                  scale: .2
                }).start();
              } else if (e >= .2 && e < .4 && !i) {
                i = true;
                u.active = true;
                cc.tween(u).to(.2, {
                  scale: .4
                }).start();
              } else if (e >= .4 && e < .55 && !n) {
                n = true;
                u.active = true;
                cc.tween(u).to(.2, {
                  scale: .6
                }).start();
              } else if (e >= .55 && e < .7 && !r) {
                r = true;
                u.active = true;
                cc.tween(u).to(.2, {
                  scale: .8
                }).start();
              } else if (e >= .7 && e < .85 && !l) {
                l = true;
                u.active = true;
                cc.tween(u).to(.2, {
                  scale: 1
                }).start();
              }
            });
          });
        } else if (this.curState == a.CutHair) {
          var h = false;
          var p = false;
          var d = false;
          var y = false;
          var f = false;
          r_UtilsSystem.UtilsSystem.scheduleOnce(100, function () {
            e.curItemCleanCpt.startClean(function () {
              e.isCleanUp = true;
            }, e.curCleanTool.getChildByName("head"), function (t) {
              if (t >= 0 && t < .2 && !h) {
                (n = cc.instantiate(e.hair)).active = true;
                n.parent = e.hairNode;
                var o = e.curItemCleanCpt.cleanToolHead.parent.convertToWorldSpaceAR(e.curItemCleanCpt.cleanToolHead.position);
                o = e.hairNode.convertToNodeSpaceAR(o);
                n.setPosition(o);
                var i = n.y - 1e3;
                cc.tween(n).to(2, {
                  y: i
                }).start();
                h = true;
              } else if (t >= .2 && t < .4 && !p) {
                p = true;
                (n = cc.instantiate(e.hair)).active = true;
                n.parent = e.hairNode;
                o = e.curItemCleanCpt.cleanToolHead.parent.convertToWorldSpaceAR(e.curItemCleanCpt.cleanToolHead.position);
                o = e.hairNode.convertToNodeSpaceAR(o);
                n.setPosition(o);
                i = n.y - 1e3;
                cc.tween(n).to(2, {
                  y: i
                }).start();
              } else if (t >= .4 && t < .55 && !d) {
                d = true;
                (n = cc.instantiate(e.hair)).active = true;
                n.parent = e.hairNode;
                o = e.curItemCleanCpt.cleanToolHead.parent.convertToWorldSpaceAR(e.curItemCleanCpt.cleanToolHead.position);
                o = e.hairNode.convertToNodeSpaceAR(o);
                n.setPosition(o);
                i = n.y - 1e3;
                cc.tween(n).to(2, {
                  y: i
                }).start();
              } else if (t >= .55 && t < .7 && !y) {
                y = true;
                (n = cc.instantiate(e.hair)).active = true;
                n.parent = e.hairNode;
                o = e.curItemCleanCpt.cleanToolHead.parent.convertToWorldSpaceAR(e.curItemCleanCpt.cleanToolHead.position);
                o = e.hairNode.convertToNodeSpaceAR(o);
                n.setPosition(o);
                i = n.y - 1e3;
                cc.tween(n).to(2, {
                  y: i
                }).start();
              } else if (t >= .7 && t < .85 && !f) {
                var n;
                f = true;
                (n = cc.instantiate(e.hair)).active = true;
                n.parent = e.hairNode;
                o = e.curItemCleanCpt.cleanToolHead.parent.convertToWorldSpaceAR(e.curItemCleanCpt.cleanToolHead.position);
                o = e.hairNode.convertToNodeSpaceAR(o);
                n.setPosition(o);
                i = n.y - 1e3;
                cc.tween(n).to(2, {
                  y: i
                }).start();
              }
            });
          });
        } else if (this.curState == a.BlowWind) {
          this.curLayer.getChildByName("jinmao_cm").getComponent(sp.Skeleton).paused = true;
          r_UtilsSystem.UtilsSystem.scheduleOnce(100, function () {
            e.curItemCleanCpt.startClean(function () {
              e.isCleanUp = true;
              console.log("清理完成");
            }, e.curCleanTool.getChildByName("head"));
          });
        } else {
          r_UtilsSystem.UtilsSystem.scheduleOnce(100, function () {
            e.curItemCleanCpt.startClean(function () {
              e.isCleanUp = true;
              console.log("清理完成");
            }, e.curCleanTool.getChildByName("head"));
          });
        }
      } else {
        var m = this.curLayer.getChildByName("eventNode").getChildByName("Mask");
        var g = [];
        for (var v = 0; v < m.childrenCount; v++) {
          var C = m.children[v];
          C.name.includes("toolPic") && g.push(C);
        }
        r_UtilsSystem.UtilsSystem.scheduleOnce(100, function () {
          e.curItemCleanCpt.startAddPic(e.curCleanTool.getChildByName("head"), g, function () {
            e.isCleanUp = true;
            console.log("涂抹泡沫完成");
          });
        });
      }
    }
  };
  _ctor.prototype.moveDown = function (e) {
    cc.tween(e).to(1, {
      y: e.y - 1002
    }).start();
  };
  _ctor.prototype.moveOutAnim = function (e, t) {
    var o;
    undefined === t && (t = true);
    o = t ? 1668 : -1668;
    for (var i = 0; i < this.curLayer.childrenCount; i++) {
      var n = this.curLayer.children[i];
      if (i == this.curLayer.childrenCount - 1) {
        cc.tween(n).to(.5, {
          x: n.x + o
        }).call(function () {
          e();
        }).start();
      } else {
        cc.tween(n).to(.5, {
          x: n.x + o
        }).start();
      }
    }
  };
  _ctor.prototype.moveInAnim = function (e, t) {
    undefined === t && (t = true);
    for (var o = 0; o < this.curLayer.childrenCount; o++) {
      var i = this.curLayer.children[o];
      var n = i.x;
      if (t) {
        i.x += 1668;
      } else {
        i.x -= 1668;
      }
      if (o == this.curLayer.childrenCount - 1) {
        cc.tween(i).to(.5, {
          x: n
        }).call(function () {
          e();
        }).start();
      } else {
        cc.tween(i).to(.5, {
          x: n
        }).start();
      }
    }
  };
  _ctor.prototype.moveBackAnim = function () {};
  _ctor.prototype.playerWinAnim = function () {
    this.lightEffect.active = true;
    r_SoundMgr.SoundMgr.playSound("flash");
    r_UtilsSystem.UtilsSystem.scheduleOnce(1500, function () {
      r_RelaxSystem.RelaxSystem.win();
    });
  };
  _ctor.prototype.loseAnim = function () {
    this.showLoseAnim();
  };
  _ctor.prototype.showLoseAnim = function () {
    __awaiter(this, undefined, undefined, function () {
      return __generator(this, function () {
        r_RelaxSystem.RelaxSystem.lose();
        return [2];
      });
    });
  };
  return _ctor;
}();
exports.default = def_LevelLogic25;
exports.LevelLogic25 = new def_LevelLogic25();