var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetNodeShow = undefined;
var r_ActionBase = require("ActionBase");
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
  return __decorate([_ccclass("SetNodeShowNodeInfo")], e);
}();
var exp_SetNodeShow = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodes = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    var t = this;
    e.prototype.onTrigger.call(this);
    this.nodes.forEach(function (e) {
      if (e.target) {
        if (e.delay > 0) {
          var o = setTimeout(function () {
            e.target && (e.target.active = e.isShow);
          }, 1e3 * e.delay);
          t.timeoutIndex.push(o);
        } else {
          e.target.active = e.isShow;
        }
      }
    });
  };
  _ctor.prototype.start = function () {
    this.nodes.forEach(function (e) {
      e.target && (e.target.active = e.originIsShow);
      e.target.name;
    });
  };
  __decorate([_property({
    type: [u],
    displayName: "操作节点信息",
    tooltip: "所有要显示或者隐藏的节点信息"
  })], _ctor.prototype, "nodes", undefined);
  return __decorate([_ccclass("SetNodeShow")], _ctor);
}(r_ActionBase.ActionBase);
exports.SetNodeShow = exp_SetNodeShow;