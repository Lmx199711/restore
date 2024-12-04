var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickFailToolCom = exports.PICKCOUNT = exports.WhereToGO = undefined;
var r_OperationToolCom = require("OperationToolCom");
var r_ToolComBase = require("ToolComBase");
(function (e) {
  e[e["原位置"] = 0] = "原位置";
  e[e["目标处"] = 1] = "目标处";
  e[e["指定地点"] = 2] = "指定地点";
})(exports.WhereToGO || (exports.WhereToGO = {}));
(function (e) {
  e[e["无上限"] = 0] = "无上限";
  e[e["单个"] = 1] = "单个";
  e[e["两个"] = 2] = "两个";
  e[e["指定数量"] = 3] = "指定数量";
})(exports.PICKCOUNT || (exports.PICKCOUNT = {}));
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var p = _decorator.requireComponent;
var exp_PickFailToolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.stickPos = null;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "吸附在夹子上的位置",
    type: cc.Node
  })], _ctor.prototype, "stickPos", undefined);
  return __decorate([_ccclass, p(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/拾取掉落组件")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.PickFailToolCom = exp_PickFailToolCom;