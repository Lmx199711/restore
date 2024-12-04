var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TriggerActionMgr = require("TriggerActionMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_ClickTriggerComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.actionName = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {};
  _ctor.prototype.onClick = function () {
    r_TriggerActionMgr.TriggerActionMgr.trigger(this.actionName);
  };
  __decorate([_property({
    tooltip: "触发action名字"
  })], _ctor.prototype, "actionName", undefined);
  return __decorate([_ccclass, _menu("Action/事件/点击按钮")], _ctor);
}(cc.Component);
exports.default = def_ClickTriggerComponent;