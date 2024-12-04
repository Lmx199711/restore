var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HideSeekScene = exports.RoleInfo = exports.RoleTargetInfo = exports.RoleAnimInfo = undefined;
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_RoleAnimInfo = function () {
  function _ctor() {
    this.animName = "";
    this.nextAnimList = [];
    this.isDown = false;
    this.isLoop = false;
    this.sound = "";
  }
  __decorate([_property({
    displayName: "动画名称"
  })], _ctor.prototype, "animName", undefined);
  __decorate([_property({
    type: [String],
    displayName: "连续播放动画列表"
  })], _ctor.prototype, "nextAnimList", undefined);
  __decorate([_property({
    displayName: "是否下滑切换"
  })], _ctor.prototype, "isDown", undefined);
  __decorate([_property({
    displayName: "动画切换是否循环"
  })], _ctor.prototype, "isLoop", undefined);
  __decorate([_property({
    displayName: "动画音效"
  })], _ctor.prototype, "sound", undefined);
  return __decorate([_ccclass("RoleAnimInfo")], _ctor);
}();
exports.RoleAnimInfo = exp_RoleAnimInfo;
var exp_RoleTargetInfo = function () {
  function _ctor() {
    this.animName = "";
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "目标节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "动画名称"
  })], _ctor.prototype, "animName", undefined);
  return __decorate([_ccclass("RoleTargetInfo")], _ctor);
}();
exports.RoleTargetInfo = exp_RoleTargetInfo;
var exp_RoleInfo = function () {
  function _ctor() {
    this.animList = [];
    this.isAnimLoop = false;
    this.target = [];
    this.loseSound = "";
    this.loseAnim = "";
    this.curAnim = 0;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "顾客节点"
  })], _ctor.prototype, "roleRoot", undefined);
  __decorate([_property({
    type: [exp_RoleAnimInfo],
    displayName: "动画列表"
  })], _ctor.prototype, "animList", undefined);
  __decorate([_property({
    displayName: "动画切换是否循环"
  })], _ctor.prototype, "isAnimLoop", undefined);
  __decorate([_property({
    type: [exp_RoleTargetInfo],
    displayName: "特殊目标"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "失败音效"
  })], _ctor.prototype, "loseSound", undefined);
  __decorate([_property({
    displayName: "失败动画"
  })], _ctor.prototype, "loseAnim", undefined);
  return __decorate([_ccclass("RoleInfo")], _ctor);
}();
exports.RoleInfo = exp_RoleInfo;
var exp_HideSeekScene = function () {
  function _ctor() {
    this.time = 15;
    this.targetList = [];
    this.roleList = [];
    this.winSound = "";
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "场景根节点"
  })], _ctor.prototype, "rootNode", undefined);
  __decorate([_property({
    type: Number,
    displayName: "关卡时间"
  })], _ctor.prototype, "time", undefined);
  __decorate([_property({
    type: [cc.Node],
    displayName: "目标列表"
  })], _ctor.prototype, "targetList", undefined);
  __decorate([_property({
    type: [exp_RoleInfo],
    displayName: "角色列表"
  })], _ctor.prototype, "roleList", undefined);
  __decorate([_property({
    displayName: "胜利音效"
  })], _ctor.prototype, "winSound", undefined);
  return __decorate([_ccclass("HideSeekScene")], _ctor);
}();
exports.HideSeekScene = exp_HideSeekScene;
var def_HideSeekLevel = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.sceneList = [];
    t.changeAnimSound = "";
    t.curSceneIndex = 0;
    t.passTime = 0;
    t.isCheckResult = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.init();
    this.curSceneIndex = 0;
    this.curScene = this.sceneList[this.curSceneIndex];
    this.findRole.active = false;
    this.tipLb.node.active = false;
  };
  _ctor.prototype.onDestroy = function () {
    r_TimeSystem.TimeSystem.scheduleClear("showNext");
    r_TimeSystem.TimeSystem.scheduleClear("touchAnim");
  };
  _ctor.prototype.onRevive = function () {};
  _ctor.prototype.init = function () {
    var e = this;
    this.guideLayer = this.node.getChildByName("guideLayer");
    this.guideLayer.parent = cc.director.getScene();
    this.guideLayer.active = false;
    this.guideLayer.x = 667;
    this.guideLayer.y = 375;
    this.guideLayer.getChildByName("bg").on(cc.Node.EventType.TOUCH_START, function () {
      console.log("引导界面屏蔽");
    });
    r_TimeSystem.TimeSystem.scheduleOnce("showGuide", 1, function () {
      e.guideLayer.active = true;
      r_TimeSystem.TimeSystem.scheduleOnce("showGuide", 3, function () {
        e.registTouch();
        e.guideLayer.destroy();
        e.enterScene();
      });
    });
  };
  _ctor.prototype.enterScene = function () {
    for (var e = 0; e < this.curScene.roleList.length; e++) {
      var t = this.curScene.roleList[e];
      t.roleRoot.startX = t.roleRoot.x;
      t.roleRoot.startY = t.roleRoot.y;
      t.roleRoot.getComponent(sp.Skeleton).setAnimation(0, t.animList[0].animName, true);
    }
    this.passTime = 0;
    this.isCheckResult = false;
    this.tipLb.node.active = true;
  };
  _ctor.prototype.playNextAnimList = function (e, t, o) {
    var i = this;
    if (t.nextAnimList[o + 1]) {
      var n = e.roleRoot.getComponent(sp.Skeleton).setAnimation(0, t.nextAnimList[o], false);
      e.roleRoot.getComponent(sp.Skeleton).setTrackCompleteListener(n, function () {
        i.playNextAnimList(e, t, o + 1);
      });
    } else {
      e.roleRoot.getComponent(sp.Skeleton).setAnimation(0, t.nextAnimList[o], true);
    }
  };
  _ctor.prototype.changeToNextAnim = function (e) {
    var t = this;
    if (e.lastAnim) {
      e.lastAnim.active = false;
      e.lastAnim = null;
    }
    e.curAnim = e.curAnim + 1;
    var o = e.animList[e.curAnim];
    if (!o) {
      e.curAnim = 0;
      o = e.animList[e.curAnim];
    }
    if ("" != o.sound) {
      r_SoundMgr.SoundMgr.playSound(o.sound);
    } else {
      "" != this.changeAnimSound && r_SoundMgr.SoundMgr.playSound(this.changeAnimSound);
    }
    var i = e.roleRoot.getChildByName(o.animName);
    if (i && i.getChildByName("anim")) {
      e.roleRoot.getComponent(sp.Skeleton).enabled = false;
      var n = i.getChildByName("anim");
      n.active = true;
      e.lastAnim = n;
      var a = n.getComponent(sp.Skeleton).setAnimation(0, o.animName, false);
      n.getComponent(sp.Skeleton).setTrackCompleteListener(a, function () {});
    } else {
      e.roleRoot.getComponent(sp.Skeleton).enabled = true;
      a = e.roleRoot.getComponent(sp.Skeleton).setAnimation(0, o.animName, false);
      e.roleRoot.getComponent(sp.Skeleton).setTrackCompleteListener(a, function () {
        o.nextAnimList.length > 0 && t.playNextAnimList(e, o, 0);
      });
    }
    for (var s = 0; s < this.curScene.roleList.length; s++) {
      var c = this.curScene.roleList[s];
      if (e != c && this.isRoleCollider(c, e)) {
        c.roleRoot.x = c.roleRoot.startX;
        c.roleRoot.y = c.roleRoot.startY;
      }
    }
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.touchNode = new cc.Node();
    this.touchNode.width = 1668;
    this.touchNode.height = 1002;
    this.node.addChild(this.touchNode);
    var t = null;
    var o = null;
    var i = null;
    var n = 0;
    var a = false;
    var c = 0;
    this.touchNode.on(cc.Node.EventType.TOUCH_START, function (l) {
      if (!e.isCheckResult) {
        t = null;
        o = null;
        a = false;
        i = l.getLocation();
        var u = function (l) {
          var u = e.curScene.roleList[l];
          var h = u.roleRoot.getChildByName(u.animList[u.curAnim].animName);
          var p = h.convertToNodeSpaceAR(i);
          var d = h.getComponent(cc.PolygonCollider);
          if (cc.Intersection.pointInPolygon(p, d.points)) {
            t = u.roleRoot;
            o = u;
            n = u.roleRoot.x;
            r_SoundMgr.SoundMgr.playSound("getItem");
            r_TimeSystem.TimeSystem.hasSchedule("touchAnim") || !u.animList[u.curAnim + 1] && !u.isAnimLoop || r_TimeSystem.TimeSystem.scheduleOnce("touchAnim", .5, function () {
              if (u.animList[u.curAnim].isDown) {
                a = true;
                c = i.y;
              } else {
                e.changeToNextAnim(u);
              }
            });
            return {
              value: undefined
            };
          }
        };
        for (var h = 0; h < e.curScene.roleList.length; h++) {
          var p = u(h);
          if ("object" == typeof p) {
            return p.value;
          }
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, function (r) {
      if (!e.isCheckResult && t) {
        var l = r.getLocation();
        var u = l.x - i.x;
        t.x = n + u;
        if (Math.abs(u) >= 5) {
          a = false;
          r_TimeSystem.TimeSystem.scheduleClear("touchAnim");
        }
        if (a && c - l.y > 100) {
          a = false;
          e.changeToNextAnim(o);
        }
      }
    });
    this.touchNode.on(cc.Node.EventType.TOUCH_END, function (i) {
      if (!e.isCheckResult && (r_TimeSystem.TimeSystem.scheduleClear("touchAnim"), a = false, t)) {
        i.getLocation();
        for (var r = 0; r < e.curScene.roleList.length; r++) {
          var c = e.curScene.roleList[r];
          if (c != o && e.isRoleCollider(o, c)) {
            t.x = n;
            return void (t = null);
          }
        }
      }
    });
    this.touchNode._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.isRoleCollider = function (e, t) {
    var o = e.roleRoot.getChildByName(e.animList[e.curAnim].animName);
    var i = t.roleRoot.getChildByName(t.animList[t.curAnim].animName);
    var n = o.getComponent(cc.PolygonCollider);
    var a = i.getComponent(cc.PolygonCollider);
    for (var s = 0; s < n.points.length; s++) {
      var r = o.convertToWorldSpaceAR(n.points[s]);
      var c = i.convertToNodeSpaceAR(r);
      if (cc.Intersection.pointInPolygon(c, a.points)) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.isRoleInTarget = function (e, t) {
    var o = e.roleRoot.getChildByName(e.animList[e.curAnim].animName);
    var i = o.getComponent(cc.PolygonCollider);
    var n = t.getComponent(cc.PolygonCollider);
    for (var a = 0; a < i.points.length; a++) {
      var s = o.convertToWorldSpaceAR(i.points[a]);
      var r = t.convertToNodeSpaceAR(s);
      if (!cc.Intersection.pointInPolygon(r, n.points)) {
        return false;
      }
    }
    return true;
  };
  _ctor.prototype.update = function (e) {
    if (!this.isCheckResult && this.curScene && (e > .1 && (e = .016), this.passTime = this.passTime + e, this.passTime)) {
      var t = Math.ceil(this.curScene.time - this.passTime);
      t = Math.max(t, 0);
      this.tipLb.string = "距离被发现还有" + t + "秒";
      t <= 0 && this.checkResult();
    }
  };
  _ctor.prototype.moveEye = function (e) {
    var t = e.x;
    e.x = t - 7;
    cc.tween(e).to(5, {
      x: t + 7
    }).call(function () {}).start();
  };
  _ctor.prototype.checkResult = function () {
    var e = this;
    this.findRole.getChildByName("win1").active = false;
    this.tipLb.node.active = false;
    this.isCheckResult = true;
    var t = null;
    var o = 1;
    for (var i = 0; i < this.curScene.roleList.length; i++) {
      var n = false;
      if ((c = this.curScene.roleList[i]).target.length > 0) {
        c.animList[c.curAnim].animName == c.target[0].animName && this.isRoleInTarget(c, c.target[0].target) && (n = true);
      } else {
        for (var a = 0; a < this.curScene.targetList.length; a++) {
          this.isRoleInTarget(c, this.curScene.targetList[a]) && (n = true);
        }
      }
      if (!n) {
        t = c;
        o = i + 1;
        break;
      }
    }
    this.findRole.active = true;
    this.findRole.x = -800;
    this.findRole.getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
    if (t) {
      cc.tween(this.findRole).to(2, {
        x: -380
      }).call(function () {
        e.findRole.getChildByName("" + o).active = true;
        e.findRole.getComponent(sp.Skeleton).setAnimation(0, "step_2", true);
        if (t.lastAnim) {
          t.lastAnim.active = false;
          t.lastAnim = null;
        }
        t.roleRoot.getComponent(sp.Skeleton).enabled = true;
        if ("" != t.loseAnim) {
          t.roleRoot.getComponent(sp.Skeleton).setAnimation(0, t.loseAnim, false);
        } else {
          t.roleRoot.getComponent(sp.Skeleton).setAnimation(0, "step_1", false);
        }
        "" != t.loseSound && r_SoundMgr.SoundMgr.playSound(t.loseSound);
        r_TimeSystem.TimeSystem.scheduleOnce("showNext", 2, function () {});
      }).start();
    } else {
      for (i = 0; i < this.curScene.roleList.length; i++) {
        var c;
        var l = (c = this.curScene.roleList[i]).roleRoot.getChildByName(c.animList[c.curAnim].animName).getChildByName("pic");
        if (l) {
          c.roleRoot.getComponent(sp.Skeleton).enabled = false;
          c.roleRoot.getChildByName("anim") && (c.roleRoot.getChildByName("anim").active = false);
          l.active = true;
          this.moveEye(l.getChildByName("eye1"));
          this.moveEye(l.getChildByName("eye2"));
        }
      }
      var u = this.curScene;
      this.curSceneIndex = this.curSceneIndex + 1;
      this.curScene = this.sceneList[this.curSceneIndex];
      r_TimeSystem.TimeSystem.scheduleOnce("timeWin", .5, function () {
        "" != u.winSound && r_SoundMgr.SoundMgr.playSound(u.winSound);
        if (e.curScene) {
          e.findRole.getChildByName("win1").active = true;
        } else {
          e.findRole.getChildByName("win2").active = true;
        }
      });
      cc.tween(this.findRole).to(6, {
        x: 1800
      }).call(function () {
        if (e.curScene) {
          cc.tween(u.rootNode).to(1, {
            opacity: 0
          }).call(function () {
            u.rootNode.active = false;
          }).start();
          e.curScene.rootNode.active = true;
          e.curScene.rootNode.opacity = 0;
          cc.tween(e.curScene.rootNode).to(1, {
            opacity: 255
          }).call(function () {
            e.isCheckResult = false;
            e.enterScene();
          }).start();
        }
      }).start();
    }
  };
  __decorate([_property({
    type: [exp_HideSeekScene],
    displayName: "场景列表"
  })], _ctor.prototype, "sceneList", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "找茬节点"
  })], _ctor.prototype, "findRole", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "场景提示"
  })], _ctor.prototype, "tipLb", undefined);
  __decorate([_property({
    displayName: "默认切换动画音效"
  })], _ctor.prototype, "changeAnimSound", undefined);
  return __decorate([_ccclass, _menu("躲猫猫/关卡组件")], _ctor);
}(cc.Component);
exports.default = def_HideSeekLevel;