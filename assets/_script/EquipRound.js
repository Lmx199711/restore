var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_EquipRound = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.roundX = 15;
    t.roundY = 15;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    tooltip: "x轴吸附范围"
  })], _ctor.prototype, "roundX", undefined);
  __decorate([_property({
    tooltip: "y轴吸附范围"
  })], _ctor.prototype, "roundY", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_EquipRound;