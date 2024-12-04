var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetNodeOpacityAction = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var u = function () {
  function e() {
    this.target = null;
    this.originOpacityNum = 255;
    this.targetOpacityNum = 0;
    this.duration = 1;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "需要设置透明度的节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "初始透明度"
  })], e.prototype, "originOpacityNum", undefined);
  __decorate([_property({
    displayName: "目标透明度"
  })], e.prototype, "targetOpacityNum", undefined);
  __decorate([_property({
    displayName: "持续时间"
  })], e.prototype, "duration", undefined);
  return __decorate([_ccclass("SetNodeOpacityInfo")], e);
}();
var h = function () {
  function e() {
    this.target = null;
    this.isShow = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "节点"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    displayName: "显示"
  })], e.prototype, "isShow", undefined);
  return __decorate([_ccclass("ShowNodeInfo5")], e);
}();
var exp_SetNodeOpacityAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.nodes = [];
    t.showNodeList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    for (var t = 0; t < this.showNodeList.length; t++) {
      var o = this.showNodeList[t];
      if (o.isShow) {
        o.target.active = true;
      } else {
        o.target.active = false;
      }
    }
    for (t = 0; t < this.nodes.length; t++) {
      var i = this.nodes[t];
      if (i.target) {
        if (0 == i.duration) {
          i.target.opacity = i.targetOpacityNum;
        } else {
          i.target.opacity = i.originOpacityNum;
          cc.tween(i.target).to(i.duration, {
            opacity: i.targetOpacityNum
          }, {
            easing: cc.easing.smooth
          }).start();
        }
      }
    }
  };
  _ctor.prototype.destroy = function () {
    e.prototype.destroy.call(this);
    for (var t = 0; t < this.nodes.length; t++) {
      var o = this.nodes[t];
      o.target && cc.Tween.stopAllByTarget(o.target);
    }
  };
  __decorate([_property({
    type: u,
    displayName: "要设置透明度的节点"
  })], _ctor.prototype, "nodes", undefined);
  __decorate([_property({
    type: h,
    displayName: "设置节点显示隐藏列表"
  })], _ctor.prototype, "showNodeList", undefined);
  return __decorate([_ccclass("SetNodeOpacityAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.SetNodeOpacityAction = exp_SetNodeOpacityAction;