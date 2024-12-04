var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VarPoolCom = exports.VarInfo = undefined;
var r_EventComBase = require("EventComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_VarInfo = function () {
  function _ctor() {
    this.key = "";
    this.value = "";
  }
  __decorate([_property({
    displayName: "变量名"
  })], _ctor.prototype, "key", undefined);
  __decorate([_property({
    displayName: "值"
  })], _ctor.prototype, "value", undefined);
  return __decorate([_ccclass("VarInfo")], _ctor);
}();
exports.VarInfo = exp_VarInfo;
var exp_VarPoolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.curLevelKey = "";
    t.varInfos = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "使用变量保存当前关卡数"
  })], _ctor.prototype, "curLevelKey", undefined);
  __decorate([_property([exp_VarInfo])], _ctor.prototype, "varInfos", undefined);
  return __decorate([_ccclass, _menu("新系统/玩家操作/变量池")], _ctor);
}(r_EventComBase.EventComBase);
exports.VarPoolCom = exp_VarPoolCom;