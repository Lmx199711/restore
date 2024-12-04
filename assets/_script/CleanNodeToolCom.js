var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CleanNodeToolCom = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_ToolComBase = require("ToolComBase");
var r_OperationToolCom = require("OperationToolCom");
var r_CleanNodeInfo = require("CleanNodeInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var y = _decorator.requireComponent;
var exp_CleanNodeToolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cleanInfos = [];
    t.cleanPoint = null;
    t.finishedBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "清理组件",
    type: r_CleanNodeInfo.CleanNodeInfo
  })], _ctor.prototype, "cleanInfos", undefined);
  __decorate([_property({
    displayName: "清理点",
    type: cc.Node,
    visible: function () {
      return 0 != this.cleanInfos.length;
    }
  })], _ctor.prototype, "cleanPoint", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  return __decorate([_ccclass, y(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/清理工具")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.CleanNodeToolCom = exp_CleanNodeToolCom;