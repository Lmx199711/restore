var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_Bezier = require("Bezier");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var l = _decorator.executeInEditMode;
var _property = _decorator.property;
var def_Demo1 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bezier = null;
    t.node1 = null;
    t.node2 = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.onBtnChangeP2 = function () {
    this.node2.setPosition(this.node2.x, this.node2.y + 300);
  };
  _ctor.prototype.onBtnFire = function () {
    this.bezier.updateTracker();
    this.bezier.startMove(this.node1, 1, this.onBezierAnimFinish, this);
  };
  _ctor.prototype.onBezierAnimFinish = function () {
    console.log("动画完毕");
  };
  __decorate([_property(r_Bezier.default)], _ctor.prototype, "bezier", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "node1", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "node2", undefined);
  return __decorate([_ccclass, l], _ctor);
}(cc.Component);
exports.default = def_Demo1;