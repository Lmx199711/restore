var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RubbingClean = undefined;
var r_MoveToClean = require("MoveToClean");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var _menu = _decorator.menu;
var exp_RubbingClean = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.resetPos = function () {};
  _ctor.prototype._OnDragEnd = function (t) {
    e.prototype._OnDragEnd.call(this, t);
    var o = this.cleanToolHead.convertToWorldSpaceAR(cc.Vec2.ZERO);
    this.cleanCom.calculateProgressOnce(o);
    o = this.cleanCom.mask.node.convertToNodeSpaceAR(o);
    this.cleanCom._addRect(o);
  };
  _ctor.prototype.updateCleanProgress = function (t) {
    e.prototype.updateCleanProgress.call(this, t);
  };
  _ctor.prototype.setCanClean = function (t) {
    e.prototype.setCanClean.call(this, !t);
  };
  _ctor.prototype.cleanCompeleted = function () {
    e.prototype.cleanCompeleted.call(this);
    e.prototype.setCanClean.call(this, false);
  };
  return __decorate([_ccclass, _menu("Action/事件/拓印的方式去清理")], _ctor);
}(r_MoveToClean.MoveToClean);
exports.RubbingClean = exp_RubbingClean;