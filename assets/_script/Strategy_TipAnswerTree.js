var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RecursiveFunction = require("RecursiveFunction");
var r_ExAB_TipAnswerStrategy = require("ExAB_TipAnswerStrategy");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_Strategy_TipAnswerTree = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.treeKeyInfo = null;
    t.operationType = r_RecursiveFunction.OperationTp.有;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.GetKey = function () {
    throw new Error("Method not implemented.");
  };
  _ctor.prototype.initStrategy = function () {
    this.treeKeyInfo = new r_RecursiveFunction.TreeKeyInfo("");
    var e = this.treeKeyInfo;
    this.treeKeyInfo.operationType = this.operationType;
    r_RecursiveFunction.BuildTree(this.node, e);
  };
  __decorate([_property({
    type: cc.Enum(r_RecursiveFunction.OperationTp),
    displayName: "结果来自第一个"
  })], _ctor.prototype, "operationType", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/关卡答案提示/key策略/Tree")], _ctor);
}(r_ExAB_TipAnswerStrategy.default);
exports.default = def_Strategy_TipAnswerTree;