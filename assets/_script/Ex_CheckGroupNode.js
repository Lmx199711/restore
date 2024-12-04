var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ex_CheckGroupNode = undefined;
var r_BehaviorMgr = require("BehaviorMgr");
var r_CommonFunc = require("CommonFunc");
var r_ExAB_CheckDist = require("ExAB_CheckDist");
var r_Ex_CheckGoupNodePack = require("Ex_CheckGoupNodePack");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_Ex_CheckGroupNode = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.DESC = "抬起时检查N个节点";
    t.packNode = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.checkDist = function (e, t, o, i) {
    var n = false;
    var a = 0;
    for (var c = this.packNode.distInfos; a < c.length; a++) {
      var l = c[a];
      if (r_CommonFunc.chekHasStringKeys(l.checkKeys) && l.distNode && r_CommonFunc.checkTouchNode(t, l.distNode)) {
        r_BehaviorMgr.BehaviorMgr.trigger(i);
        r_BehaviorMgr.BehaviorMgr.trigger(l.distActionId);
        n = true;
        break;
      }
    }
    return !this.packNode.cantMove && (!this.packNode.isMustOnDist || n);
  };
  __decorate([_property({
    displayName: "附加效果",
    readonly: true
  })], _ctor.prototype, "DESC", undefined);
  __decorate([_property(r_Ex_CheckGoupNodePack.Ex_CheckGroupNodePack)], _ctor.prototype, "packNode", undefined);
  return __decorate([_ccclass, _menu("新系统/01机关/99追加/松手检查/N转1节点(机关)")], _ctor);
}(r_ExAB_CheckDist.ExAB_CheckDist);
exports.Ex_CheckGroupNode = exp_Ex_CheckGroupNode;