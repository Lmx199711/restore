var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncisionLine = undefined;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_IncisionLine = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.linePrefab = null;
    t.canCutColor = cc.color(0, 255, 24);
    t.noCutColor = cc.Color.RED;
    t.startPos = cc.v2();
    t.tempVec2 = cc.v2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.list = this.node.getChildByName("list");
    this.point_1 = this.node.getChildByName("point_1");
    this.spacingX = this.list.getComponent(cc.Layout).spacingX;
  };
  _ctor.prototype.setVisible = function (e, t) {
    e || this.list.destroyAllChildren();
    this.node.active = e;
    if (t) {
      this.node.setPosition(t.x, t.y);
      cc.Vec2.set(this.startPos, t.x, t.y);
      this.point_1 && this.point_1.setPosition(0, 0);
    }
  };
  _ctor.prototype.setLengthAndAngle = function (e, t) {
    var o = this;
    this.node.parent.convertToWorldSpaceAR(e, this.tempVec2);
    this.node.convertToNodeSpaceAR(this.tempVec2, this.tempVec2);
    this.point_1 && this.point_1.setPosition(this.tempVec2.x, this.tempVec2.y);
    e.sub(this.startPos, this.tempVec2);
    var i = this.tempVec2.len();
    this.list.width = i;
    var n = i / (this.linePrefab.data.width + this.spacingX);
    var a = this.list.childrenCount;
    var s = n - a;
    if (s > 0) {
      for (var r = 0; r < s; r++) {
        var c = cc.instantiate(this.linePrefab);
        this.list.addChild(c);
      }
    } else if (s < 0) {
      for (r = a - 1; r >= a - Math.abs(s); r--) {
        this.list.children[r].destroy();
      }
    }
    this.node.angle = this.radToAngle(Math.atan2(this.tempVec2.y, this.tempVec2.x));
    this.list.children.forEach(function (e) {
      e.color = t ? o.canCutColor : o.noCutColor;
    });
  };
  _ctor.prototype.radToAngle = function (e) {
    return 180 * e / Math.PI;
  };
  __decorate([_property({
    displayName: "线段预制",
    type: cc.Prefab,
    tooltip: "请使用自己业务的预制体"
  })], _ctor.prototype, "linePrefab", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.IncisionLine = exp_IncisionLine;