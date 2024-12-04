var i;
var exp_ComponentType;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveComponentCom = exports.NodeComponentInfo = exports.ComponentType = exports.CtType = undefined;
var r;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
(function (e) {
  e[e.Mask = 0] = "Mask";
  e[e.Sprite = 1] = "Sprite";
})(r = exports.CtType || (exports.CtType = {}));
(exp_ComponentType = {})[r.Mask] = "Mask";
exp_ComponentType[r.Sprite] = "Sprite";
exports.ComponentType = exp_ComponentType;
var exp_NodeComponentInfo = function () {
  function _ctor() {
    this.target = null;
    this.type = r.Mask;
    this.arg1 = new cc.Vec2(0, 0);
    this.arg2 = new cc.Vec2(0, 0);
    this.isInit = true;
  }
  Object.defineProperty(_ctor.prototype, "NodeProp", {
    get: function () {
      return exports.ComponentType[this.type];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "StartPropInfo", {
    get: function () {
      var e = {};
      e[this.NodeProp] = this.arg1.x;
      return e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "EndPropInfo", {
    get: function () {
      var e = {};
      e[this.NodeProp] = this.arg1.y;
      return e;
    },
    enumerable: false,
    configurable: true
  });
  __decorate([_property({
    type: cc.Node,
    displayName: "节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    type: cc.Enum(r),
    displayName: "组件"
  })], _ctor.prototype, "type", undefined);
  __decorate([_property({
    displayName: "参数一"
  })], _ctor.prototype, "arg1", undefined);
  __decorate([_property({
    displayName: "参数二",
    visible: function () {
      return false;
    }
  })], _ctor.prototype, "arg2", undefined);
  __decorate([_property({
    displayName: "初始化时设置为开始值"
  })], _ctor.prototype, "isInit", undefined);
  return __decorate([_ccclass("NodeComponentInfo")], _ctor);
}();
exports.NodeComponentInfo = exp_NodeComponentInfo;
var exp_ActiveComponentCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.tranInfo = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: exp_NodeComponentInfo,
    displayName: "节点组件信息"
  })], _ctor.prototype, "tranInfo", undefined);
  return __decorate([_ccclass("ActiveComponentCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.ActiveComponentCom = exp_ActiveComponentCom;