var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddProgressAction = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_AddProgressAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.addValue = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.trigger = function () {
    e.prototype.trigger.call(this);
    this.progress.node.active = true;
    var t = this.progress.progress;
    t += this.addValue;
    t = Math.max(0, t);
    t = Math.min(1, t);
    this.progress.progress = t;
  };
  __decorate([_property({
    type: cc.ProgressBar,
    displayName: "进度条"
  })], _ctor.prototype, "progress", undefined);
  __decorate([_property({
    type: Number,
    displayName: "增加值"
  })], _ctor.prototype, "addValue", undefined);
  return __decorate([_ccclass("AddProgressAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.AddProgressAction = exp_AddProgressAction;