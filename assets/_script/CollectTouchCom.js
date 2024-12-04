var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
_decorator.menu;
var def_CollectTouchCom = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {};
  _ctor.prototype.touchBegin = function () {};
  _ctor.prototype.touchMove = function () {};
  _ctor.prototype.touchEnd = function () {};
  _ctor.prototype.putSuccess = function () {};
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_CollectTouchCom;