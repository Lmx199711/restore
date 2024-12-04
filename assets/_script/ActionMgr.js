var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionMgr = undefined;
var r_SubActionGroup = require("SubActionGroup");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var _menu = _decorator.menu;
var u = _decorator.executeInEditMode;
var exp_ActionMgr = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor, "inst", {
    get: function () {
      return this.mInst;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onLoad = function () {
    _ref__ctor.mInst = this;
  };
  return _ref__ctor = __decorate([_ccclass("ActionMgr"), u, _menu("Action/Action管理器(已弃用，用行为组代替)")], _ctor);
}(r_SubActionGroup.SubActionGroup);
exports.ActionMgr = exp_ActionMgr;