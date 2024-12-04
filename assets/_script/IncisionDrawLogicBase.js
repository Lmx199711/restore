var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncisionDrawLogicBase = undefined;
var r_IncisionLine = require("IncisionLine");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_IncisionDrawLogicBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.incisionLine = null;
    t._startPoint = cc.v2();
    t.tempPos = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.touchNode = this.node.getChildByName("TouchNode");
    this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  };
  _ctor.prototype.onDisable = function () {
    this.touchNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.touchNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  };
  _ctor.prototype.onTouchStart = function (e) {
    this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.convertToNodeSpaceAR(e.getLocation(), this.tempPos);
    cc.Vec2.set(this._startPoint, this.tempPos.x, this.tempPos.y);
    this.incisionLine.setVisible(true, this._startPoint);
  };
  _ctor.prototype.onTouchMove = function (e) {
    this.node.convertToNodeSpaceAR(e.getLocation(), this.tempPos);
    this.incisionLine.setLengthAndAngle(this.tempPos, this.canCut());
  };
  _ctor.prototype.onTouchEnd = function (e) {
    this.stopDraw();
    this.node.convertToNodeSpaceAR(e.getLocation(), this.tempPos);
    if (this.canCut()) {
      this.node.convertToWorldSpaceAR(this._startPoint, this._startPoint);
      this.cutSuccess();
    }
  };
  _ctor.prototype.stopDraw = function (e) {
    e && e();
    this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.incisionLine.setVisible(false);
  };
  _ctor.prototype.canCut = function () {
    return true;
  };
  _ctor.prototype.cutSuccess = function () {};
  __decorate([_property({
    type: r_IncisionLine.IncisionLine
  })], _ctor.prototype, "incisionLine", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.IncisionDrawLogicBase = exp_IncisionDrawLogicBase;