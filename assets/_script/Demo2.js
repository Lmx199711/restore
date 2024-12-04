var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_Bezier = require("Bezier");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var l = _decorator.executeInEditMode;
var _property = _decorator.property;
var def_Demo2 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bezier = null;
    t.node1 = null;
    t.position1 = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.position1 = this.node1.position;
  };
  _ctor.prototype.onBtnFire = function () {
    var e = this;
    var t = this.bezier.getBezierPoints(this.node1);
    this.node1.setPosition(t[0]);
    cc.tween(this.node1).bezierTo(1, t[1], t[2], t[3]).call(function () {
      e.onBezierAnimFinish();
    }).start();
  };
  _ctor.prototype.onBezierAnimFinish = function () {
    console.log("动画完毕");
    this.node1.setPosition(this.position1);
  };
  __decorate([_property(r_Bezier.default)], _ctor.prototype, "bezier", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "node1", undefined);
  return __decorate([_ccclass, l], _ctor);
}(cc.Component);
exports.default = def_Demo2;