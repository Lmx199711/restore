var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorDef = require("BehaviorDef");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_Ex_LookAt = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.lookAtNode = null;
    t.shapeNode = null;
    t.activeLook = true;
    t.startWidth = 0;
    t.startDis = 0;
    t._timer = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    if (this.shapeNode) {
      this.startWidth = this.shapeNode.width;
      this.startDis = this.lookAtNode.position.sub(this.node.position).len();
    }
  };
  _ctor.prototype.update = function () {
    this.activeLook && this.funLookAt();
  };
  _ctor.prototype.funLookAt = function () {
    if (this.lookAtNode) {
      var e = this.lookAtNode.position.sub(this.node.position);
      var t = Math.atan2(e.y, e.x) / Math.PI * 180;
      this.node.angle = t;
      this.shapeNode && (this.shapeNode.width = this.startWidth + (e.len() - this.startDis));
    }
  };
  _ctor.prototype.AcFun = function (e, t, o) {
    o && (o instanceof Array || o[r_BehaviorDef.ARGS.childSelf] || o[r_BehaviorDef.ARGS.childAdd] || o[r_BehaviorDef.ARGS.now] && this.begin());
  };
  _ctor.prototype.begin = function () {
    this.activeLook = true;
  };
  __decorate([_property({
    displayName: "看向的节点",
    type: cc.Node
  })], _ctor.prototype, "lookAtNode", undefined);
  __decorate([_property({
    displayName: "变化size的光线",
    type: cc.Node
  })], _ctor.prototype, "shapeNode", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/自旋转注视")], _ctor);
}(cc.Component);
exports.default = def_Ex_LookAt;