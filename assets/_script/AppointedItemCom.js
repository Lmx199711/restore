var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppointItemCom = exports.AppointNodeInfo = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_AppointNodeInfo = function () {
  function _ctor() {
    this.name = "";
    this.node = null;
    this.isUseChild = false;
    this.useChildIndex = 0;
  }
  __decorate([_property({
    displayName: "名字"
  })], _ctor.prototype, "name", undefined);
  __decorate([_property({
    displayName: "节点",
    type: cc.Node
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    displayName: "是否使用子节点"
  })], _ctor.prototype, "isUseChild", undefined);
  __decorate([_property({
    displayName: "子节点下标",
    type: cc.Integer,
    visible: function () {
      return this.isUseChild;
    }
  })], _ctor.prototype, "useChildIndex", undefined);
  return __decorate([_ccclass("AppointNodeInfo")], _ctor);
}();
exports.AppointNodeInfo = exp_AppointNodeInfo;
var exp_AppointItemCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.appointNodes = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "节点表",
    type: exp_AppointNodeInfo
  })], _ctor.prototype, "appointNodes", undefined);
  return __decorate([_ccclass("AppointItemCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.AppointItemCom = exp_AppointItemCom;