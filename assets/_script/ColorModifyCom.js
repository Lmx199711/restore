var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorModifyCom = exports.ColorModifyInfo = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_ColorModifyInfo = function () {
  function _ctor() {
    this.node = null;
    this.color2 = new cc.Color(255, 255, 255, 255);
  }
  __decorate([_property({
    displayName: "node",
    type: cc.Node
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    displayName: "目标色值",
    type: cc.Color
  })], _ctor.prototype, "color2", undefined);
  return __decorate([_ccclass("ColorModifyInfo")], _ctor);
}();
exports.ColorModifyInfo = exp_ColorModifyInfo;
var exp_ColorModifyCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.infos = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "颜色信息",
    type: exp_ColorModifyInfo
  })], _ctor.prototype, "infos", undefined);
  return __decorate([_ccclass("ColorModifyCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.ColorModifyCom = exp_ColorModifyCom;