Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenPropSys = undefined;
var r_TweenPropCom = require("TweenPropCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_TweenPropSys = function () {
  function _ctor() {}
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onStart = function () {
    this.entity.tranInfo.forEach(function (e) {
      e.isInit && (e.target[e.NodeProp] = e.start);
    });
  };
  _ctor.prototype.trigger = function (e) {
    var t = !!e;
    for (var o = 0; o < this.entity.tranInfo.length; o++) {
      var i = this.entity.tranInfo[o];
      if (t) {
        i.target[i.NodeProp] = i.end;
        cc.tween(i.target).delay(i.delay).to(i.duration, i.StartPropInfo).start();
      } else {
        i.target[i.NodeProp] = i.start;
        cc.tween(i.target).delay(i.delay).to(i.duration, i.EndPropInfo).start();
      }
    }
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_TweenPropCom.TweenPropCom)], _ctor);
}();
exports.TweenPropSys = exp_TweenPropSys;