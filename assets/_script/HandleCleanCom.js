var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandleCleanCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var r_CleanComponent = require("CleanComponent");
var r_CleanNodeToolCom = require("CleanNodeToolCom");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_HandleCleanCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cleanInfos = [];
    t.cleanPoint = null;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "清理工具",
    type: r_CleanNodeToolCom.CleanNodeToolCom
  })], _ctor.prototype, "cleanTool", undefined);
  __decorate([_property({
    displayName: "清理组件",
    type: r_CleanComponent.default
  })], _ctor.prototype, "cleanInfos", undefined);
  __decorate([_property({
    displayName: "清理点",
    type: cc.Node,
    visible: function () {
      return 0 != this.cleanInfos.length;
    }
  })], _ctor.prototype, "cleanPoint", undefined);
  return __decorate([_ccclass("HandleCleanCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.HandleCleanCom = exp_HandleCleanCom;