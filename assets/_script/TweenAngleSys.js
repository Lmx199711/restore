Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenAngleSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var r_TweenAngleCom = require("TweenAngleCom");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_TweenAngleSys = function () {
  function _ctor() {
    this.strEase = "smooth";
  }
  _ctor.prototype.trigger = function (e) {
    var t = false;
    e && "back" == e.trim() && (t = true);
    for (var o = 0; o < this.entity.nodes.length; o++) {
      var i = this.entity.nodes[o];
      var n = t ? i.targetAngleNum : i.originAngleNum;
      var s = t ? i.originAngleNum : i.targetAngleNum;
      r_CommonFunc.tweenDataByTarget({
        duration: i.duration,
        originData: {
          angle: n
        },
        target: i.target,
        to: {
          angle: s
        },
        easing: this.strEase
      });
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
    for (var e = 0; e < this.entity.nodes.length; e++) {
      var t = this.entity.nodes[e];
      cc.Tween.stopAllByTarget(t.target);
    }
    this.entity = null;
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_TweenAngleCom.TweenAngleCom)], _ctor);
}();
exports.TweenAngleSys = exp_TweenAngleSys;