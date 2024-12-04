var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AXIS_TYPE = undefined;
var s;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
(function (e) {
  e[e["x轴"] = 0] = "x轴";
  e[e["y轴"] = 1] = "y轴";
})(s = exports.AXIS_TYPE || (exports.AXIS_TYPE = {}));
var def_Ex_LockAxis = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.DESC = "指定唯一轴向";
    t.moveDir = s.x轴;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "附加效果",
    readonly: true
  })], _ctor.prototype, "DESC", undefined);
  __decorate([_property({
    displayName: "指定移动方向",
    type: cc.Enum(s)
  })], _ctor.prototype, "moveDir", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/99追加/指定唯一轴向")], _ctor);
}(cc.Component);
exports.default = def_Ex_LockAxis;