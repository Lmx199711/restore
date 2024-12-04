var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolComBase = undefined;
var r_EventComBase = require("EventComBase");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_ToolComBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.needPrecondition = false;
    return t;
  }
  __extends(_ctor, e);
  return _ctor;
}(r_EventComBase.EventComBase);
exports.ToolComBase = exp_ToolComBase;