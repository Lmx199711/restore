var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TouchBase = require("TouchBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
_decorator.menu;
var def_CanNotTouchByKey = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.canNotTouchKey = [];
    return t;
  }
  __extends(_ctor, e);
  return __decorate([_ccclass], _ctor);
}(r_TouchBase.default);
exports.default = def_CanNotTouchByKey;