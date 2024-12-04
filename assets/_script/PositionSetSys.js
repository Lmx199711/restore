Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositionSetSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_PositionSetCom = require("PositionSetCom");
var exp_PositionSetSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    var t = null;
    e && this.entity.flashMap.forEach(function (o) {
      o.name == e && (t = o.posNode);
    });
    if (t) {
      var o = cc.Vec2.ZERO;
      t.convertToWorldSpaceAR(cc.Vec2.ZERO, o);
      this.entity.flashNode.parent.convertToNodeSpaceAR(o, o);
      this.entity.flashNode.x = o.x;
      this.entity.flashNode.y = o.y;
    } else {
      cc.warn("闪现没有终点");
    }
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_PositionSetCom.PositionSetCom)], _ctor);
}();
exports.PositionSetSys = exp_PositionSetSys;