Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenOpacitySys = undefined;
var r_TweenOpacityCom = require("TweenOpacityCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var r_BehaviorDef = require("BehaviorDef");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_TweenOpacitySys = function () {
  function _ctor() {
    this.strEase = "smooth";
    this.curNode = 0;
  }
  _ctor.prototype.trigger = function (e) {
    var t = r_BehaviorDef.HandleData(e);
    var o = t[0];
    var i = t[1];
    switch (o) {
      case r_BehaviorDef.ARGS.back:
        for (var n = 0; n < this.entity.nodes.length; n++) {
          var a = this.entity.nodes[n];
          this.tweenDataByTarget({
            duration: a.duration,
            originData: {
              opacity: a.targetOpacityNum
            },
            target: a.target,
            to: {
              opacity: a.originOpacityNum
            },
            easing: this.strEase
          }, a.delay);
        }
        break;
      case r_BehaviorDef.ARGS.childAdd:
        for (n = 0; n < this.entity.nodes.length; n++) {
          if (null != (a = this.entity.nodes[n]).target.getChildByName(i[0])) {
            this.tweenDataByTarget({
              duration: a.duration,
              originData: {
                opacity: a.originOpacityNum
              },
              target: a.target.getChildByName(i[0]),
              to: {
                opacity: a.targetOpacityNum
              },
              easing: this.strEase
            }, a.delay);
          } else {
            cc.log("-childAdd失败，检查是否被移除了??");
          }
        }
        break;
      case r_BehaviorDef.ARGS.childSelf:
        for (n = 0; n < this.entity.nodes.length; n++) {
          a = this.entity.nodes[n];
          var s = parseInt(i[1]) || 1;
          for (var c = [a.target]; s > 0;) {
            if (1 === s) {
              for (var l = 0; l < c.length; l++) {
                var u = c[l].children.length;
                for (var h = 0; h < u; h++) {
                  if (c[l].children[h].name != i[0]) {
                    c[l].children[h].opacity = a.originOpacityNum;
                  } else {
                    this.tweenDataByTarget({
                      duration: a.duration,
                      originData: {
                        opacity: a.originOpacityNum
                      },
                      target: c[l].children[h],
                      to: {
                        opacity: a.targetOpacityNum
                      },
                      easing: this.strEase
                    }, a.delay);
                  }
                }
              }
              break;
            }
            var p = [];
            for (l = 0; l < c.length; l++) {
              for (h = 0; h < c[l].children.length; h++) {
                p.push(c[l].children[h]);
              }
              c[l] = null;
            }
            c = p;
            s--;
          }
        }
        break;
      case r_BehaviorDef.ARGS.childPP:
        for (n = 0; n < this.entity.nodes.length && (a = this.entity.nodes[n], !(this.curNode >= a.target.children.length)); n++) {
          this.tweenDataByTarget({
            duration: a.duration,
            originData: {
              opacity: a.originOpacityNum
            },
            target: a.target.children[this.curNode],
            to: {
              opacity: a.targetOpacityNum
            },
            easing: this.strEase
          }, a.delay);
          console.log("childPP:" + a.target.children[this.curNode].name);
        }
        this.curNode++;
        break;
      default:
        for (n = 0; n < this.entity.nodes.length; n++) {
          a = this.entity.nodes[n];
          this.tweenDataByTarget({
            duration: a.duration,
            originData: {
              opacity: a.originOpacityNum
            },
            target: a.target,
            to: {
              opacity: a.targetOpacityNum
            },
            easing: this.strEase
          }, a.delay);
        }
    }
  };
  _ctor.prototype.tweenDataByTarget = function (e, t) {
    if (0 == t) {
      r_CommonFunc.tweenDataByTarget(e);
    } else {
      r_BehaviorMgr.BehaviorMgr.timeout(t, function () {
        r_CommonFunc.tweenDataByTarget(e);
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
  return __decorate([r_DecorateBehavior.bindActionCom(r_TweenOpacityCom.TweenOpacityCom)], _ctor);
}();
exports.TweenOpacitySys = exp_TweenOpacitySys;