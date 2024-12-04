var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositionSetCom = exports.NamePNode = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_NamePNode = function () {
  function _ctor() {
    this.name = "";
    this.posNode = null;
  }
  __decorate([_property({
    displayName: "代号"
  })], _ctor.prototype, "name", undefined);
  __decorate([_property({
    displayName: "位置",
    type: cc.Node
  })], _ctor.prototype, "posNode", undefined);
  return __decorate([_ccclass("NamePNode")], _ctor);
}();
exports.NamePNode = exp_NamePNode;
var exp_PositionSetCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.flashNode = null;
    t.flashMap = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "闪现物体",
    type: cc.Node
  })], _ctor.prototype, "flashNode", undefined);
  __decorate([_property({
    displayName: "闪现点",
    type: exp_NamePNode
  })], _ctor.prototype, "flashMap", undefined);
  return __decorate([_ccclass("PositionSetCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.PositionSetCom = exp_PositionSetCom;