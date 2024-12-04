var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowNodesCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var u = function () {
  function e() {
    this.target = null;
    this.isShow = false;
    this.delay = 0;
    this.originIsShow = true;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "显示"
  })], e.prototype, "isShow", undefined);
  __decorate([_property({
    displayName: "延时显示或者隐藏"
  })], e.prototype, "delay", undefined);
  __decorate([_property({
    displayName: "初始是否显示"
  })], e.prototype, "originIsShow", undefined);
  return __decorate([_ccclass("ShowNodeInfo")], e);
}();
var exp_ShowNodesCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodes = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: [u],
    displayName: "操作节点信息",
    tooltip: "所有要显示或者隐藏的节点信息"
  })], _ctor.prototype, "nodes", undefined);
  return __decorate([_ccclass("ShowNodesCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.ShowNodesCom = exp_ShowNodesCom;