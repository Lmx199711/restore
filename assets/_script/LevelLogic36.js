Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelLogic36 = exports._LevelLogic36 = exports.Level36State = undefined;
var a;
var r_CleanComponent = require("CleanComponent");
var r_RelaxSystem = require("RelaxSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_GamingUI = require("GamingUI");
var r_SoundMgr = require("SoundMgr");
(function (e) {
  e[e.AddMask1 = 0] = "AddMask1";
  e[e.AddPic1 = 1] = "AddPic1";
  e[e.Clean1 = 2] = "Clean1";
  e[e.AddMask2 = 3] = "AddMask2";
  e[e.Clean2 = 4] = "Clean2";
  e[e.AddMask3 = 5] = "AddMask3";
  e[e.Clean3 = 6] = "Clean3";
  e[e.Dry = 7] = "Dry";
  e[e.Iron = 8] = "Iron";
})(a = exports.Level36State || (exports.Level36State = {}));
var exp__LevelLogic36 = function () {
  function _ctor() {
    this.toolList = [];
    this.toolIndexList = [0, 1, 2, 3, 2, 4, 2, 5, 6];
    this.layerList = [];
    this.curState = a.AddMask1;
    this.maxZIndex = 0;
    this.playingSound = null;
    this.toolSound = ["xiyifen", "bursh", "sprinkle", "feizao", "spray", "chuifengji", "yundou"];
    this.isCleanUp = false;
    this.isPlayAnim = false;
    this.water = null;
  }
  _ctor.prototype.loadLevelSuccess = function (e) {
    var t = this;
    this.toolList = [];
    this.layerList = [];
    this.levelNode = e;
    this.curState = a.AddMask1;
    var o = [];
    for (var i = 1; i <= 7; i++) {
      var n = this.levelNode.getChildByName("tool" + i);
      var r = n.getChildByName("effect");
      r && (r.active = false);
      n.startX = n.x;
      n.startY = n.y;
      n.startScale = n.scale;
      n.levelIndex = i - 1;
      this.toolList.push(n);
      o.push(n);
    }
    for (i = 1; i <= 8; i++) {
      var c = this.levelNode.getChildByName("layer" + i);
      var u = c.getComponent(r_CleanComponent.default);
      u && u.initPoints();
      this.layerList.push(c);
      c.active = false;
      o.push(c);
    }
    this.layerList[0].active = true;
    this.layerList[1].active = true;
    this.dressArea = this.levelNode.getChildByName("dressArea");
    this.water = this.levelNode.getChildByName("water");
    this.isCleanUp = false;
    this.registTouch();
    r_UtilsSystem.UtilsSystem.scheduleOnce(10, function () {
      t.changeState();
    });
  };
  _ctor.prototype.playWaterAnim = function (e, t) {
    this.water.scale = 0;
    this.water.opacity = 255 * e;
    cc.tween(this.water).to(1, {
      scale: 1
    }).call(function () {
      t && t();
    }).start();
  };
  _ctor.prototype.changeState = function () {
    var e = this;
    this.curTool = this.toolList[this.toolIndexList[this.curState]];
    if (this.curState == a.AddMask1) {
      this.water.active = true;
      this.water.scale = 1;
      this.water.opacity = 204;
      cc.tween(this.water).delay(1).to(1, {
        opacity: 0
      }).call(function () {}).start();
      this.curItemCleanCpt = this.layerList[0].getComponent(r_CleanComponent.default);
      this.curItemCleanCpt.startClean(function () {
        console.log("清理成功 AddMask1");
        e.isCleanUp = true;
      }, this.curTool.getChildByName("head"));
    } else if (this.curState == a.AddPic1) {
      this.curItemCleanCpt = this.layerList[1].getComponent(r_CleanComponent.default);
      var t = this.layerList[1].getChildByName("Mask");
      var o = [];
      for (var i = 0; i < t._children.length; i++) {
        (n = t._children[i])._name.includes("pic") && o.push(n);
      }
      this.curItemCleanCpt.startAddPic(this.curTool.getChildByName("head"), o, function () {
        console.log("清理成功 AddPic1");
        e.isCleanUp = true;
      });
    } else if (this.curState == a.Clean1) {
      this.layerList[1].getComponent(r_CleanComponent.default).showAllPic();
      this.water.scale = 0;
      this.water.opacity = 153;
      this.curItemCleanCpt = this.layerList[1].getComponent(r_CleanComponent.default);
      this.curItemCleanCpt.startClean(function () {
        console.log("清理成功 Clean1");
        e.isCleanUp = true;
      }, this.curTool.getChildByName("head"), function (t) {
        cc.Tween.stopAllByTarget(e.water);
        cc.tween(e.water).to(1, {
          scale: .8 + t / 5
        }).start();
      });
    } else if (this.curState == a.AddMask2) {
      cc.tween(this.water).to(1, {
        opacity: 0
      }).call(function () {}).start();
      this.layerList[1].active = false;
      this.curItemCleanCpt = this.layerList[2].getComponent(r_CleanComponent.default);
      this.curItemCleanCpt.startClean(function () {
        console.log("清理成功 AddMask2");
        e.isCleanUp = true;
      }, this.curTool.getChildByName("head"));
    } else if (this.curState == a.Clean2) {
      this.water.scale = 0;
      this.water.opacity = 102;
      this.layerList[2].active = false;
      this.curItemCleanCpt = this.layerList[3].getComponent(r_CleanComponent.default);
      this.curItemCleanCpt.startClean(function () {
        console.log("清理成功 Clean2");
        e.isCleanUp = true;
      }, this.curTool.getChildByName("head"), function (t) {
        cc.Tween.stopAllByTarget(e.water);
        cc.tween(e.water).to(1, {
          scale: .8 + t / 5
        }).start();
      });
    } else if (this.curState == a.AddMask3) {
      cc.tween(this.water).to(1, {
        opacity: 0
      }).call(function () {}).start();
      this.layerList[3].active = false;
      this.layerList[4].active = true;
      this.layerList[4].getChildByName("dress1").active = true;
      this.layerList[4].getChildByName("dress2").active = false;
      this.curItemCleanCpt = this.layerList[4].getComponent(r_CleanComponent.default);
      t = this.layerList[4].getChildByName("Mask");
      o = [];
      for (i = 0; i < t._children.length; i++) {
        var n;
        (n = t._children[i])._name.includes("pic") && o.push(n);
      }
      this.curItemCleanCpt.startAddPic(this.curTool.getChildByName("head"), o, function () {
        console.log("清理成功 AddMask3");
        e.isCleanUp = true;
      });
    } else if (this.curState == a.Clean3) {
      this.layerList[4].getComponent(r_CleanComponent.default).showAllPic();
      this.water.scale = 0;
      this.water.opacity = 51;
      this.layerList[4].getChildByName("dress1").active = false;
      this.layerList[4].getChildByName("dress2").active = true;
      this.curItemCleanCpt = this.layerList[4].getComponent(r_CleanComponent.default);
      this.curItemCleanCpt.startClean(function () {
        console.log("清理成功 Clean3");
        e.isCleanUp = true;
      }, this.curTool.getChildByName("head"), function (t) {
        cc.Tween.stopAllByTarget(e.water);
        cc.tween(e.water).to(1, {
          scale: .8 + t / 5
        }).start();
      });
    } else if (this.curState == a.Dry) {
      cc.tween(this.water).to(1, {
        opacity: 0
      }).call(function () {}).start();
      this.layerList[4].active = false;
      this.layerList[5].active = true;
      this.curItemCleanCpt = this.layerList[5].getComponent(r_CleanComponent.default);
      this.curItemCleanCpt.startClean(function () {
        console.log("清理成功 Clean2");
        e.isCleanUp = true;
      }, this.curTool.getChildByName("head"));
    } else if (this.curState == a.Iron) {
      this.layerList[5].active = false;
      this.layerList[6].active = true;
      this.curItemCleanCpt = this.layerList[6].getComponent(r_CleanComponent.default);
      this.curItemCleanCpt.startClean(function () {
        console.log("清理成功 Clean2");
        e.isCleanUp = true;
      }, this.curTool.getChildByName("head"));
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    r_RelaxSystem.RelaxSystem.unregistTouch();
    var t = null;
    var o = null;
    var i = 0;
    var n = 0;
    var s = cc.director.getScene().getChildByName("Canvas").getChildByName("touchBg");
    var c = false;
    s.on(cc.Node.EventType.TOUCH_START, function (a) {
      t = null;
      if (!e.isPlayAnim && !r_RelaxSystem.RelaxSystem.isFinishGame) {
        c = false;
        o = a.getLocation();
        for (var s = 0; s < e.toolList.length; s++) {
          var l = e.toolList[s];
          var u = l.convertToNodeSpaceAR(o);
          var p = l.getComponent(cc.PolygonCollider);
          if (l.active && cc.Intersection.pointInPolygon(u, p.points)) {
            t = l;
            0 == s && (t.angle = 45);
            var d = l.getChildByName("effect");
            d && (d.active = true);
            l.scale = 1;
            i = t.x;
            n = t.y;
            t.zIndex = e.maxZIndex + 1;
            e.maxZIndex = t.zIndex;
            r_SoundMgr.SoundMgr.playSound("getItem");
            var y = e.toolIndexList[e.curState];
            if (l.levelIndex == y) {
              c = true;
              e.curItemCleanCpt && e.curItemCleanCpt.setCanTouchMask(true);
            }
            var f = e.toolIndexList[e.curState - 1];
            l.levelIndex == f && (c = true);
            e.playingSound = e.toolSound[s];
            t.getChildByName("effect") && (t.getChildByName("effect").active = true);
            return void (e.playingSound && r_SoundMgr.SoundMgr.playSound(e.playingSound, true));
          }
        }
      }
    });
    s.on(cc.Node.EventType.TOUCH_MOVE, function (a) {
      if (!r_RelaxSystem.RelaxSystem.isFinishGame && t) {
        var s = a.getLocation();
        t.x = i + s.x - o.x;
        t.y = n + s.y - o.y;
        if (!c) {
          var l = t.getChildByName("head").convertToWorldSpaceAR(cc.Vec2.ZERO);
          var u = e.dressArea.convertToNodeSpaceAR(l);
          var h = e.dressArea.getComponent(cc.PolygonCollider);
          cc.Intersection.pointInPolygon(u, h.points) && e.loseAnim();
        }
      }
    });
    s.on(cc.Node.EventType.TOUCH_END, function (o) {
      if (e.playingSound) {
        r_SoundMgr.SoundMgr.stopSound(e.playingSound);
        e.playingSound = null;
      }
      if (!r_RelaxSystem.RelaxSystem.isFinishGame && (e.curItemCleanCpt && e.curItemCleanCpt.setCanTouchMask(false), t)) {
        var i = t.getChildByName("effect");
        i && (i.active = false);
        t.getChildByName("effect") && (t.getChildByName("effect").active = false);
        o.getLocation();
        t.x = t.startX;
        t.y = t.startY;
        t.angle = 0;
        t.scale = t.startScale;
        t = null;
        if (e.isCleanUp) {
          e.isCleanUp = false;
          if (e.curState == a.AddPic1) {
            e.layerList[0].active = false;
            e.layerList[2].active = true;
          } else if (e.curState == a.AddMask2) {
            e.layerList[2].active = false;
            e.layerList[3].active = true;
          }
          if (e.curState >= a.Iron) {
            e.layerList[6].active = false;
            e.layerList[7].active = true;
            e.levelNode.getChildByName("winEffect").active = true;
            r_RelaxSystem.RelaxSystem.win();
          } else {
            e.curState = e.curState + 1;
            e.changeState();
          }
        }
      }
    });
  };
  _ctor.prototype.loseAnim = function () {
    var e = this;
    r_RelaxSystem.RelaxSystem.isFinishGame = true;
    r_GamingUI.GamingUI.Inst && (r_GamingUI.GamingUI.Inst.miao.visible = true);
    r_SoundMgr.SoundMgr.playSound("miao_" + r_UtilsSystem.UtilsSystem.getRandomNum(1, 3));
    r_TimeSystem.TimeSystem.scheduleOnce("GameLoseTime1", 1, function () {
      r_GamingUI.GamingUI.Inst && (r_GamingUI.GamingUI.Inst.miao.visible = false);
    });
    r_TimeSystem.TimeSystem.scheduleOnce("GameLoseTime", 1, function () {
      __awaiter(e, undefined, undefined, function () {
        return __generator(this, function () {
          r_RelaxSystem.RelaxSystem.lose();
          return [2];
        });
      });
    });
  };
  return _ctor;
}();
exports._LevelLogic36 = exp__LevelLogic36;
exports.LevelLogic36 = new exp__LevelLogic36();