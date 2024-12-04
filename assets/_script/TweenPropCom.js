var i;
var exp_ChangePropToNodeProp;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TweenPropCom = exports.TweenPropInfo = exports.ChangePropToNodeProp = exports.ChangeProp = undefined;
var r;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
(function (e) {
  e[e.x = 0] = "x";
  e[e.y = 1] = "y";
  e[e.opacity = 2] = "opacity";
  e[e.scaleX = 3] = "scaleX";
  e[e.scaleY = 4] = "scaleY";
})(r = exports.ChangeProp || (exports.ChangeProp = {}));
(exp_ChangePropToNodeProp = {})[r.x] = "x";
exp_ChangePropToNodeProp[r.y] = "y";
exp_ChangePropToNodeProp[r.opacity] = "opacity";
exp_ChangePropToNodeProp[r.scaleX] = "scaleX";
exp_ChangePropToNodeProp[r.scaleY] = "scaleY";
exports.ChangePropToNodeProp = exp_ChangePropToNodeProp;
var exp_TweenPropInfo = function () {
  function _ctor() {
    this.target = null;
    this.prop = r.x;
    this.start = 0;
    this.end = 0;
    this.duration = 1;
    this.delay = 0;
    this.isInit = true;
  }
  Object.defineProperty(_ctor.prototype, "NodeProp", {
    get: function () {
      return exports.ChangePropToNodeProp[this.prop];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "StartPropInfo", {
    get: function () {
      var e = {};
      e[this.NodeProp] = this.start;
      return e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "EndPropInfo", {
    get: function () {
      var e = {};
      e[this.NodeProp] = this.end;
      return e;
    },
    enumerable: false,
    configurable: true
  });
  __decorate([_property({
    type: cc.Node,
    displayName: "缓动对象"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    type: cc.Enum(r),
    displayName: "要改变的属性"
  })], _ctor.prototype, "prop", undefined);
  __decorate([_property({
    displayName: "开始值"
  })], _ctor.prototype, "start", undefined);
  __decorate([_property({
    displayName: "结束值"
  })], _ctor.prototype, "end", undefined);
  __decorate([_property({
    displayName: "持续时间"
  })], _ctor.prototype, "duration", undefined);
  __decorate([_property({
    displayName: "延迟"
  })], _ctor.prototype, "delay", undefined);
  __decorate([_property({
    displayName: "初始化时设置为开始值"
  })], _ctor.prototype, "isInit", undefined);
  return __decorate([_ccclass("TweenTranInfo")], _ctor);
}();
exports.TweenPropInfo = exp_TweenPropInfo;
var exp_TweenPropCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.tranInfo = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: exp_TweenPropInfo,
    displayName: "缓动信息"
  })], _ctor.prototype, "tranInfo", undefined);
  return __decorate([_ccclass("TweenPropCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.TweenPropCom = exp_TweenPropCom;