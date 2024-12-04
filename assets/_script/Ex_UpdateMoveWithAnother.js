var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_UpdateMoveWithAnother = undefined;
var r_ExAB_Update = require("ExAB_Update");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_Ex_UpdateMoveWithAnother = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.DESC = "移动此物体时，同时会移动另一个物体";
    t.anotherNode = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.initCom = function () {};
  _ctor.prototype.moveUpdate = function (e) {
    if (e) {
      0 != e.x && (this.anotherNode.x += e.x);
      0 != e.y && (this.anotherNode.y += e.y);
    }
  };
  __decorate([_property({
    displayName: "附加效果",
    readonly: true
  })], _ctor.prototype, "DESC", undefined);
  __decorate([_property({
    displayName: "镜像物体",
    type: cc.Node,
    tooltip: "镜像物体"
  })], _ctor.prototype, "anotherNode", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/99追加/镜像移动")], _ctor);
}(r_ExAB_Update.ExAB_Update);
exports.Ex_UpdateMoveWithAnother = exp_Ex_UpdateMoveWithAnother;