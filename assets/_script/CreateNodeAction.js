var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateNodeAction = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_CreateNodeAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.createNode = null;
    t.posNode = null;
    t.delTime = -1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    var t = cc.instantiate(this.createNode);
    t.active = true;
    t.parent = this.posNode.parent;
    t.x = this.posNode.x;
    t.y = this.posNode.y;
    if (this.delTime > 0) {
      var o = setTimeout(function () {
        t.destroy();
      }, 1e3 * this.delTime);
      this.timeoutIndex.push(o);
    }
  };
  _ctor.prototype.destroy = function () {
    e.prototype.destroy.call(this);
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "需要创建的节点"
  })], _ctor.prototype, "createNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "创建节点的位置"
  })], _ctor.prototype, "posNode", undefined);
  __decorate([_property({
    type: Number,
    displayName: "延迟删除时间,默认不删除"
  })], _ctor.prototype, "delTime", undefined);
  return __decorate([_ccclass("CreateNodeAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.CreateNodeAction = exp_CreateNodeAction;