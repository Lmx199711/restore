Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeSizeXYSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_ChangeSizeXYCom = require("ChangeSizeXYCom");
var r_CommonFunc = require("CommonFunc");
var r_BehaviorDef = require("BehaviorDef");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_ChangeSizeXYSys = function () {
  function _ctor() {
    this.strEase = "smooth";
    this.curTime = 1;
  }
  _ctor.prototype.trigger = function (e) {
    var t = false;
    var o = 1;
    var i = 0;
    var n = "";
    var a = r_BehaviorDef.HandleData(e);
    var c = a[0];
    var l = a[1];
    switch (c) {
      case r_BehaviorDef.ARGS.back:
        t = true;
        break;
      case r_BehaviorDef.ARGS.childAll:
        n = l[1] || "";
        o = parseInt(l[2]) || 1;
        break;
      case r_BehaviorDef.ARGS.childAdd:
        n = l[0] || "";
        i = this.curTime * (parseInt(l[1]) || 1);
    }
    for (var u = 0; u < this.entity.nodes.length; u++) {
      var h = this.entity.nodes[u];
      var p = h.originSizeNum.x;
      var d = h.originSizeNum.y;
      var y = h.targetSizeNum.x;
      var f = h.targetSizeNum.y;
      -1 == n.indexOf("w") && -1 == n.indexOf("x") || (y = h.targetSizeNum.x * o + i);
      -1 == n.indexOf("h") && -1 == n.indexOf("y") || (f = h.targetSizeNum.y * o + i);
      if (!h.isUseOrigin) {
        p = h.target.width;
        d = h.target.height;
      }
      if (t) {
        var m = p;
        p = y;
        y = m;
        m = d;
        d = f;
        f = m;
      }
      r_CommonFunc.tweenDataByTarget({
        duration: h.duration,
        originData: {
          width: p,
          height: d
        },
        target: h.target,
        to: {
          width: y,
          height: f
        },
        easing: this.strEase
      });
      this.curTime++;
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
    this.entity = null;
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_ChangeSizeXYCom.ChangeSizeXYCom)], _ctor);
}();
exports.ChangeSizeXYSys = exp_ChangeSizeXYSys;