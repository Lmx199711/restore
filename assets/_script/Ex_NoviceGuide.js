var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NOVICE_GUIDE_TYPE = undefined;
var r_BehaviorMgr = require("BehaviorMgr");
var r_CommonFunc = require("CommonFunc");
var r_TweenPosCom = require("TweenPosCom");
var r_TimeSystem = require("TimeSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
(function (e) {
  e[e["点击"] = 0] = "点击";
  e[e["移动"] = 1] = "移动";
})(exports.NOVICE_GUIDE_TYPE || (exports.NOVICE_GUIDE_TYPE = {}));
var def_Ex_NoviceGuide = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.DESC = "新手引导，配合res下的新手引导prefab";
    t.closeNode = null;
    t.isNeedClickSpine = true;
    t.touchCloseActionId = "";
    t.animationName = "";
    t.spineNode = null;
    t.sk = null;
    t.temp_v2 = cc.v2();
    t.isLoop = false;
    t.isStart = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.closeNode && this.closeNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.closeNode.active = false;
    if (this.spineNode) {
      this.sk = this.spineNode.getComponent(sp.Skeleton);
      this.spineNode.active = false;
    }
  };
  _ctor.prototype.onTouchStart = function () {
    if (this.isStart) {
      this.spineNode.active = false;
      this.sk.paused = true;
      if (this.posNodeInfo.target) {
        cc.Tween.stopAllByTarget(this.posNodeInfo.target);
        this.posNodeInfo.target.active = false;
        r_TimeSystem.TimeSystem.scheduleClear("guide");
      }
      this.closeNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
      this.isStart = false;
      "" != this.touchCloseActionId && r_BehaviorMgr.BehaviorMgr.trigger(this.touchCloseActionId);
    }
  };
  _ctor.prototype.guideMove = function () {
    var e = this;
    if (this.sk) {
      this.isNeedClickSpine || (this.sk.node.opacity = 0);
      r_CommonFunc.playSpineAni(this.sk, this.animationName, this.isLoop, "");
      this.sk.setCompleteListener(function () {
        e.spineNode.active = false;
        e.sk.paused = true;
        e.posNodeInfo.target.active = true;
        var t = e.posNodeInfo;
        if (t.targetPosNode && t.target) {
          var o;
          var i;
          var n = 0;
          var a = 0;
          if (t.originPosNode) {
            t.originPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO, e.temp_v2);
            t.target.parent.convertToNodeSpaceAR(e.temp_v2, e.temp_v2);
            n = e.temp_v2.x;
            a = e.temp_v2.y;
          }
          t.targetPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO, e.temp_v2);
          t.target.parent.convertToNodeSpaceAR(e.temp_v2, e.temp_v2);
          o = e.temp_v2.x;
          i = e.temp_v2.y;
          r_CommonFunc.tweenDataByTarget({
            duration: t.duration,
            target: t.target,
            originData: {
              x: n,
              y: a
            },
            to: {
              x: o,
              y: i
            },
            easing: "smooth"
          });
          r_TimeSystem.TimeSystem.scheduleOnce("guide", t.duration, function () {
            if (e.isStart) {
              e.spineNode.active = true;
              e.sk.paused = false;
            }
            e.posNodeInfo.target.active = false;
          });
        }
      });
    }
  };
  _ctor.prototype.guideClick = function () {
    if (this.sk) {
      this.sk.timeScale = 1;
      this.animationName = "dianji";
      r_CommonFunc.playSpineAni(this.sk, this.animationName, this.isLoop, "");
      this.sk.paused = true;
    }
  };
  _ctor.prototype.handleArg = function (e, t, o) {
    if (this.closeNode) {
      this.closeNode.active = true;
      this.closeNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
      this.closeNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }
    if (o && "0" != o) {
      this.isLoop = true;
      this.guideMove();
    } else {
      this.isLoop = true;
      this.guideClick();
    }
    this.isStart = true;
    this.sk.paused = false;
    this.spineNode.active = true;
  };
  __decorate([_property({
    displayName: "说明",
    readonly: true
  })], _ctor.prototype, "DESC", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "点击关闭引导节点"
  })], _ctor.prototype, "closeNode", undefined);
  __decorate([_property({
    type: Boolean,
    displayName: "移动的是否需要点击的动画"
  })], _ctor.prototype, "isNeedClickSpine", undefined);
  __decorate([_property({
    displayName: "触摸关闭执行的Id"
  })], _ctor.prototype, "touchCloseActionId", undefined);
  __decorate([_property({
    displayName: "播放动画的名字"
  })], _ctor.prototype, "animationName", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "播放动画的spine节点"
  })], _ctor.prototype, "spineNode", undefined);
  __decorate([_property({
    type: r_TweenPosCom.TweenPosNodeInfo,
    displayName: "移动节点信息"
  })], _ctor.prototype, "posNodeInfo", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/新手引导")], _ctor);
}(cc.Component);
exports.default = def_Ex_NoviceGuide;