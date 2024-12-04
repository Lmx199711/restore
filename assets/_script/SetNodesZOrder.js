var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetNodesZOrder = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var u = function () {
  function e() {
    this.target = null;
    this.zIndex = 0;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "需要设置层级的节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "层级"
  })], e.prototype, "zIndex", undefined);
  return __decorate([_ccclass("SetNodesZOrderInfo")], e);
}();
var exp_SetNodesZOrder = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodes = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    for (var t = 0; t < this.nodes.length; t++) {
      var o = this.nodes[t];
      o.target && (o.target.zIndex = o.zIndex);
    }
  };
  _ctor.prototype.destroy = function () {
    e.prototype.destroy.call(this);
  };
  __decorate([_property({
    type: u,
    displayName: "要设置透明度的节点"
  })], _ctor.prototype, "nodes", undefined);
  return __decorate([_ccclass("SetNodesZOrder")], _ctor);
}(r_ActionBase.ActionBase);
exports.SetNodesZOrder = exp_SetNodesZOrder;