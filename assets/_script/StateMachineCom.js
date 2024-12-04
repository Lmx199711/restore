var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateMachineCom = exports.MACHINE_TYPE = undefined;
var r_EventComBase = require("EventComBase");
var r_BehaviorDef = require("BehaviorDef");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
(function (e) {
  e[e["由多个key组成状态机"] = 0] = "由多个key组成状态机";
  e[e["由多个节点表现组成状态机"] = 1] = "由多个节点表现组成状态机";
  e[e["由多个行为组成状态机"] = 2] = "由多个行为组成状态机";
})(exports.MACHINE_TYPE || (exports.MACHINE_TYPE = {}));
var exp_StateMachineCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.fillKeys = "";
    t.ids = "";
    t.scores = "";
    t.scoresGroup = "total";
    t.useInChild = false;
    t.propertyType = r_BehaviorDef.PROPERTY_TYPE.Position;
    t.node_arr = Array();
    t.arg1 = new cc.Vec2(0, 0);
    t.arg2 = new cc.Vec2(0, 0);
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "请填写key,逗号分割",
    tooltip: "用逗号隔开每个key"
  })], _ctor.prototype, "fillKeys", undefined);
  __decorate([_property({
    displayName: "状态切换时事件ID",
    tooltip: "用逗号隔开每个id"
  })], _ctor.prototype, "ids", undefined);
  __decorate([_property({
    displayName: "对应分数",
    tooltip: "用逗号隔开每个数字"
  })], _ctor.prototype, "scores", undefined);
  __decorate([_property({
    displayName: "将分数保存到变量",
    tooltip: "用逗号隔开每个变量,默认为total,保存所有状态机的对应分数"
  })], _ctor.prototype, "scoresGroup", undefined);
  __decorate([_property({
    displayName: "是否使用子节点",
    tooltip: "用逗号隔开每个key"
  })], _ctor.prototype, "useInChild", undefined);
  __decorate([_property({
    displayName: "属性类型",
    type: cc.Enum(r_BehaviorDef.PROPERTY_TYPE)
  })], _ctor.prototype, "propertyType", undefined);
  __decorate([_property([cc.Node])], _ctor.prototype, "node_arr", undefined);
  __decorate([_property({
    displayName: "参数值一"
  })], _ctor.prototype, "arg1", undefined);
  __decorate([_property({
    displayName: "参数值二",
    visible: function () {
      return false;
    }
  })], _ctor.prototype, "arg2", undefined);
  return __decorate([_ccclass, _menu("新系统/状态机/控制器")], _ctor);
}(r_EventComBase.EventComBase);
exports.StateMachineCom = exp_StateMachineCom;