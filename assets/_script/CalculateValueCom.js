var i;
var exp_LogicType;
var exp_CompareType;
var exp_OperationType;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalculateValueCom = exports.CalculateInfo = exports.OperationType = exports.OPERATION_TYPE = exports.ConditionInfo = exports.CompareType = exports.COMPARE_TYPE = exports.LogicInfo = exports.LogicType = exports.LOGIC_TYPE = undefined;
var l;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
(function (e) {
  e[e["并且"] = 0] = "并且";
  e[e["或者"] = 1] = "或者";
  e[e["取反"] = 2] = "取反";
})(l = exports.LOGIC_TYPE || (exports.LOGIC_TYPE = {}));
(exp_LogicType = {})[l.并且] = "";
exp_LogicType[l.或者] = "";
exp_LogicType[l.取反] = "";
exports.LogicType = exp_LogicType;
var y;
var exp_LogicInfo = function () {
  function _ctor() {
    this.type = l.并且;
    this.varName = "";
    this.varOpType = l.并且;
    this.var_Var = 0;
  }
  __decorate([_property({
    type: cc.Enum(l),
    displayName: "逻辑运算符"
  })], _ctor.prototype, "type", undefined);
  __decorate([_property({
    displayName: "操作变量"
  })], _ctor.prototype, "varName", undefined);
  __decorate([_property({
    type: cc.Enum(l),
    displayName: "变量使用运算符"
  })], _ctor.prototype, "varOpType", undefined);
  __decorate([_property({
    displayName: "被操作值"
  })], _ctor.prototype, "var_Var", undefined);
  return __decorate([_ccclass("LogicInfo")], _ctor);
}();
exports.LogicInfo = exp_LogicInfo;
(function (e) {
  e[e["大于"] = 0] = "大于";
  e[e["小于"] = 1] = "小于";
  e[e["等于"] = 2] = "等于";
})(y = exports.COMPARE_TYPE || (exports.COMPARE_TYPE = {}));
(exp_CompareType = {})[y.大于] = "";
exp_CompareType[y.小于] = "";
exp_CompareType[y.等于] = "";
exports.CompareType = exp_CompareType;
var m;
var exp_ConditionInfo = function () {
  function _ctor() {
    this.logicType = l.并且;
    this.varName = "";
    this.compareType = y.大于;
    this.var_Var = "";
  }
  __decorate([_property({
    type: cc.Enum(l),
    displayName: "逻辑运算符"
  })], _ctor.prototype, "logicType", undefined);
  __decorate([_property({
    displayName: "操作变量"
  })], _ctor.prototype, "varName", undefined);
  __decorate([_property({
    type: cc.Enum(y),
    displayName: "比较运算符"
  })], _ctor.prototype, "compareType", undefined);
  __decorate([_property({
    displayName: "被比较值"
  })], _ctor.prototype, "var_Var", undefined);
  return __decorate([_ccclass("ConditionInfo")], _ctor);
}();
exports.ConditionInfo = exp_ConditionInfo;
(function (e) {
  e[e["加"] = 0] = "加";
  e[e["减"] = 1] = "减";
  e[e["除"] = 2] = "除";
  e[e["取余"] = 3] = "取余";
  e[e["乘"] = 4] = "乘";
  e[e["赋值为"] = 5] = "赋值为";
})(m = exports.OPERATION_TYPE || (exports.OPERATION_TYPE = {}));
(exp_OperationType = {})[m.加] = "jia";
exp_OperationType[m.减] = "jian";
exp_OperationType[m.除] = "chu";
exp_OperationType[m.取余] = "mo";
exp_OperationType[m.乘] = "cc";
exp_OperationType[m.赋值为] = "cc";
exports.OperationType = exp_OperationType;
var exp_CalculateInfo = function () {
  function _ctor() {
    this.type = m.加;
    this.a = "";
    this.a2b = m.加;
    this.b = "";
  }
  __decorate([_property({
    type: cc.Enum(m),
    displayName: "结算方法+-*/%"
  })], _ctor.prototype, "type", undefined);
  __decorate([_property({
    displayName: "a"
  })], _ctor.prototype, "a", undefined);
  __decorate([_property({
    type: cc.Enum(m),
    displayName: "+-*/%"
  })], _ctor.prototype, "a2b", undefined);
  __decorate([_property({
    displayName: "b"
  })], _ctor.prototype, "b", undefined);
  return __decorate([_ccclass("CalculateInfo")], _ctor);
}();
exports.CalculateInfo = exp_CalculateInfo;
var exp_CalculateValueCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.varKey = "";
    t.initValue = 0;
    t.idsBefore = "";
    t.calculateInfos = Array();
    t.conditionInfos = Array();
    t.idsPass = "";
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "新建和写入变量名"
  })], _ctor.prototype, "varKey", undefined);
  __decorate([_property({
    displayName: "初始化值"
  })], _ctor.prototype, "initValue", undefined);
  __decorate([_property({
    displayName: "计算开始前的执行事件",
    tooltip: "用逗号隔开每个id"
  })], _ctor.prototype, "idsBefore", undefined);
  __decorate([_property([exp_CalculateInfo])], _ctor.prototype, "calculateInfos", undefined);
  __decorate([_property([exp_ConditionInfo])], _ctor.prototype, "conditionInfos", undefined);
  __decorate([_property({
    displayName: "条件通过时的执行事件",
    tooltip: "用逗号隔开每个id"
  })], _ctor.prototype, "idsPass", undefined);
  return __decorate([_ccclass("CalculateValueCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.CalculateValueCom = exp_CalculateValueCom;