Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenScaleSys = undefined;
var r_TweenScaleCom = require("TweenScaleCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_TweenScaleSys = function () {
  function _ctor() {
    this.strEase = "smooth";
  }
  _ctor.prototype.trigger = function (e) {
    var t = false;
    e && "back" == e.trim() && (t = true);
    for (var o = 0; o < this.entity.targetNodes.length; o++) {
      var i = this.entity.targetNodes[o];
      var n = {
        scaleX: i.originScale.x,
        scaleY: i.originScale.y
      };
      var a = {
        scaleX: i.targetScale.x,
        scaleY: i.targetScale.y
      };
      if (t) {
        n = {
          scaleX: i.targetScale.x,
          scaleY: i.targetScale.y
        };
        a = {
          scaleX: i.originScale.x,
          scaleY: i.originScale.y
        };
      }
      r_CommonFunc.tweenDataByTarget({
        duration: i.duration,
        originData: n,
        target: i.target,
        to: a,
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
    for (var e = 0; e < this.entity.targetNodes.length; e++) {
      var t = this.entity.targetNodes[e];
      cc.Tween.stopAllByTarget(t.target);
    }
    this.entity = null;
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_TweenScaleCom.TweenScaleCom)], _ctor);
}();
exports.TweenScaleSys = exp_TweenScaleSys;