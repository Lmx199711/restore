Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolOrderSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_ToolOrderCom = require("ToolOrderCom");
var r_BehaviorDef = require("BehaviorDef");
var r_CommonFunc = require("CommonFunc");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_ToolOrderSys = function () {
  function _ctor() {
    this.duration = 1;
    this.curTool = -1;
  }
  var t = _ctor;
  _ctor.prototype.trigger = function (e) {
    var o = r_BehaviorDef.HandleData(e);
    var i = o[0];
    o[1];
    var n = -1;
    switch (i) {
      case r_BehaviorDef.ARGS.childAll:
      case r_BehaviorDef.ARGS.childSelf:
        break;
      default:
        if (e) {
          var a = e;
          if (isNaN(parseInt(a))) {
            if ("L" === a || "l" === a) {
              n = this.curTool - 1;
            } else {
              "R" !== a && "r" !== a || (n = this.curTool + 1);
            }
          } else {
            a && (n = parseInt(a));
          }
        } else {
          n = this.curTool + 1;
        }
    }
    if (this.curTool > -1 && this.curTool < this.entity.toolNodes.length && this.entity.toolNodes[this.curTool]) {
      var l = (d = this.entity.toolNodes[this.curTool].parent).position.x;
      var u = d.position.y;
      this.entity.centerPos.convertToWorldSpaceAR(cc.Vec2.ZERO, t.temp_v2);
      d.convertToNodeSpaceAR(t.temp_v2, t.temp_v2);
      var h = t.temp_v2.x;
      var p = t.temp_v2.y;
      r_CommonFunc.tweenDataByTarget({
        duration: this.duration,
        target: this.entity.toolNodes[this.curTool],
        originData: {
          x: h,
          y: p
        },
        to: {
          x: l,
          y: u
        },
        easing: this.entity.moveWay
      });
    }
    if (n > -2 && n < this.entity.toolNodes.length + 1) {
      var d;
      this.curTool = n;
      if (this.curTool > -1 && this.curTool < this.entity.toolNodes.length && this.entity.toolNodes[this.curTool]) {
        l = (d = this.entity.toolNodes[this.curTool].parent).position.x;
        u = d.position.y;
        this.entity.centerPos.convertToWorldSpaceAR(cc.Vec2.ZERO, t.temp_v2);
        d.convertToNodeSpaceAR(t.temp_v2, t.temp_v2);
        h = t.temp_v2.x;
        p = t.temp_v2.y;
        r_CommonFunc.tweenDataByTarget({
          duration: this.duration,
          target: this.entity.toolNodes[this.curTool],
          originData: {
            x: l,
            y: u
          },
          to: {
            x: h,
            y: p
          },
          easing: this.entity.moveWay
        });
      }
      var y = this.entity.toolOrderInfos;
      if (y.length > 0) {
        for (var f = 0; f < y.length; f++) {
          y[f].time > this.entity.toolNodes.length && this.curTool == this.entity.toolNodes.length && y[f].actions.forEach(function (e) {
            return r_BehaviorMgr.BehaviorMgr.trigger(e);
          });
          y[f].time == this.curTool && y[f].actions.forEach(function (e) {
            return r_BehaviorMgr.BehaviorMgr.trigger(e);
          });
        }
      }
    } else {
      console.log(":出界了");
    }
  };
  _ctor.prototype.onStart = function () {
    this.duration = this.entity.moveTime > 0 ? this.entity.moveTime : 1;
  };
  _ctor.prototype.onDestroy = function () {
    for (var e = 0; e < this.entity.toolNodes.length; e++) {
      var t = this.entity.toolNodes[e];
      cc.Tween.stopAllByTarget(t);
    }
    this.entity = null;
  };
  _ctor.temp_v2 = cc.v2();
  return t = __decorate([r_DecorateBehavior.bindActionCom(r_ToolOrderCom.ToolOrderCom)], _ctor);
}();
exports.ToolOrderSys = exp_ToolOrderSys;