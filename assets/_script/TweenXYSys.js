Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenXYSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var r_TweenXYCom = require("TweenXYCom");
var r_BehaviorMgr = require("BehaviorMgr");
var r_BehaviorDef = require("BehaviorDef");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_TweenXYSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    var t = r_BehaviorDef.HandleData(e);
    var o = t[0];
    var i = t[1];
    switch (o) {
      case r_BehaviorDef.ARGS.now:
        var n = function (e) {
          var t = s.entity.positionInfo[e];
          var o = i[0] || "";
          var n = parseInt(i[1]) || 0;
          var c = t.targetNode.position.x;
          var l = t.targetNode.position.y;
          var u = c;
          var h = l;
          -1 != o.indexOf("x") && (u = c + n);
          -1 != o.indexOf("y") && (h = l + n);
          if (t.targetNode) {
            if (t.delay > 0) {
              r_BehaviorMgr.BehaviorMgr.timeout(t.delay, function () {
                r_CommonFunc.tweenDataByTarget({
                  duration: t.duration,
                  target: t.targetNode,
                  originData: {
                    x: c,
                    y: l
                  },
                  to: {
                    x: u,
                    y: h
                  }
                });
              });
            } else {
              r_CommonFunc.tweenDataByTarget({
                duration: t.duration,
                target: t.targetNode,
                originData: {
                  x: c,
                  y: l
                },
                to: {
                  x: u,
                  y: h
                }
              });
            }
          }
        };
        var s = this;
        for (var l = 0; l < this.entity.positionInfo.length; l++) {
          n(l);
        }
        break;
      default:
        var u = function (e) {
          var t = h.entity.positionInfo[e];
          if (t.targetNode) {
            var o = t.originPos.x;
            var i = t.originPos.y;
            var n = t.targetPos.x;
            var s = t.targetPos.y;
            if (t.delay > 0) {
              r_BehaviorMgr.BehaviorMgr.timeout(t.delay, function () {
                r_CommonFunc.tweenDataByTarget({
                  duration: t.duration,
                  target: t.targetNode,
                  originData: {
                    x: o,
                    y: i
                  },
                  to: {
                    x: n,
                    y: s
                  }
                });
              });
            } else {
              r_CommonFunc.tweenDataByTarget({
                duration: t.duration,
                target: t.targetNode,
                originData: {
                  x: o,
                  y: i
                },
                to: {
                  x: n,
                  y: s
                }
              });
            }
          }
        };
        var h = this;
        for (l = 0; l < this.entity.positionInfo.length; l++) {
          u(l);
        }
    }
  };
  _ctor.prototype.onStart = function () {
    for (var e = 0; e < this.entity.positionInfo.length; e++) {
      var t = this.entity.positionInfo[e];
      if (t.targetNode && t.initPos) {
        t.targetNode.x = t.originPos.x;
        t.targetNode.y = t.originPos.y;
      }
    }
  };
  _ctor.prototype.onDestroy = function () {
    for (var e = 0; e < this.entity.positionInfo.length; e++) {
      var t = this.entity.positionInfo[e];
      cc.Tween.stopAllByTarget(t.targetNode);
    }
    this.entity = null;
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_TweenXYCom.TweenXYCom)], _ctor);
}();
exports.TweenXYSys = exp_TweenXYSys;