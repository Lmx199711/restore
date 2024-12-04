var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_Bezier = require("Bezier");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var l = _decorator.executeInEditMode;
var _property = _decorator.property;
var def_Demo3 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.bezier = null;
    t.node1 = null;
    t.position1 = null;
    t.isFire = false;
    t.delta = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.position1 = this.node1.position;
  };
  _ctor.prototype.onBtnFire = function () {
    this.isFire = !this.isFire;
  };
  _ctor.prototype.emit = function () {
    for (var e = 0; e < 10; e++) {
      var t = cc.instantiate(this.node1);
      t.parent = this.node;
      this.bezier.startMove(t, 1, this.onBezierAnimFinish, this);
    }
  };
  _ctor.prototype.update = function (e) {
    if (this.isFire) {
      this.delta -= e;
      if (this.delta <= 0) {
        this.delta = .03;
        this.emit();
      }
    }
  };
  _ctor.prototype.onBezierAnimFinish = function (e) {
    e.removeFromParent();
  };
  __decorate([_property(r_Bezier.default)], _ctor.prototype, "bezier", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "node1", undefined);
  return __decorate([_ccclass, l], _ctor);
}(cc.Component);
exports.default = def_Demo3;