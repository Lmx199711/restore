var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_CheckGroupNodePack = exports.PackDistInfo = undefined;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_PackDistInfo = function () {
  function _ctor() {
    this.checkKeys = "";
    this.distNode = null;
    this.distActionId = "";
  }
  __decorate([_property({
    displayName: "前提key"
  })], _ctor.prototype, "checkKeys", undefined);
  __decorate([_property({
    displayName: "位置节点",
    type: cc.Node
  })], _ctor.prototype, "distNode", undefined);
  __decorate([_property({
    displayName: "执行Id"
  })], _ctor.prototype, "distActionId", undefined);
  return __decorate([_ccclass("PackDistInfo")], _ctor);
}();
exports.PackDistInfo = exp_PackDistInfo;
var exp_Ex_CheckGroupNodePack = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cantMove = false;
    t.isMustOnDist = false;
    t.distInfos = Array();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "道具不移动"
  })], _ctor.prototype, "cantMove", undefined);
  __decorate([_property({
    displayName: "击中结果是否影响松手后的移动",
    visible: function () {
      return !this.cantMove;
    }
  })], _ctor.prototype, "isMustOnDist", undefined);
  __decorate([_property([exp_PackDistInfo])], _ctor.prototype, "distInfos", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/99追加/松手检查/N转1节点(Pack)")], _ctor);
}(cc.Component);
exports.Ex_CheckGroupNodePack = exp_Ex_CheckGroupNodePack;