Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenPosSys = undefined;
var r_TweenPosCom = require("TweenPosCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var r_BehaviorDef = require("BehaviorDef");
var r_TimeSystem = require("TimeSystem");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_TweenPosSys = function () {
  function _ctor() {
    this.strEase = "smooth";
  }
  var t = _ctor;
  _ctor.prototype.trigger = function (e) {
    var o = false;
    var i = r_BehaviorDef.HandleData(e);
    var n = i[0];
    var a = i[1];
    switch (n) {
      case r_BehaviorDef.ARGS.back:
        o = true;
    }
    var l;
    var u;
    var h = function (e) {
      var i = p.entity.targetNodes[e];
      if (i.targetPosNode && i.target) {
        var n = 0;
        var r = 0;
        var h = 0;
        var d = 0;
        if (i.originPosNode) {
          i.originPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO, t.temp_v2);
          i.target.parent.convertToNodeSpaceAR(t.temp_v2, t.temp_v2);
          n = t.temp_v2.x;
          r = t.temp_v2.y;
        } else {
          if (o) {
            o = false;
            console.warn("没有起点，无法back");
          }
          n = i.target.x;
          r = i.target.y;
        }
        i.targetPosNode.convertToWorldSpaceAR(cc.Vec2.ZERO, t.temp_v2);
        i.target.parent.convertToNodeSpaceAR(t.temp_v2, t.temp_v2);
        h = t.temp_v2.x;
        d = t.temp_v2.y;
        if (o) {
          l = h;
          u = d;
          h = n;
          d = r;
          n = l;
          r = u;
        }
        r_CommonFunc.tweenDataByTarget({
          duration: i.duration,
          target: i.target,
          originData: {
            x: n,
            y: r
          },
          to: {
            x: h,
            y: d
          },
          easing: p.strEase
        });
        a && 0 == a[1] && r_TimeSystem.TimeSystem.scheduleOnce(p.entity.behaviorId + e, i.duration, function () {
          i.target.active = false;
        });
      }
    };
    var p = this;
    for (var d = 0; d < this.entity.targetNodes.length; d++) {
      h(d);
    }
  };
  _ctor.prototype.onStart = function () {
    if ("smooth" != this.entity.easeWay && "fade" != this.entity.easeWay) {
      this.strEase = this.entity.easeWay + this.entity.easeWayInfo;
    } else {
      this.strEase = this.entity.easeWay;
    }
  };
  _ctor.prototype.onDestroy = function () {
    for (var e = 0; e < this.entity.targetNodes.length; e++) {
      var t = this.entity.targetNodes[e];
      cc.Tween.stopAllByTarget(t.target);
      r_TimeSystem.TimeSystem.scheduleClear(this.entity.behaviorId + e);
    }
    this.entity = null;
  };
  _ctor.temp_v2 = cc.v2();
  return t = __decorate([r_DecorateBehavior.bindActionCom(r_TweenPosCom.TweenPosCom)], _ctor);
}();
exports.TweenPosSys = exp_TweenPosSys;