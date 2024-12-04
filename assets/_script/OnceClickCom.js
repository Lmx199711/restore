var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnceClickCom = undefined;
var r_EventComBase = require("EventComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_OnceClickCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.canClick = true;
    t.resetNeedKeys = "";
    t.isNeedAll = true;
    t.isScaleTween = false;
    t.scaleRate = .95;
    t.scaleDuration = .15;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "能否被点击"
  })], _ctor.prototype, "canClick", undefined);
  __decorate([_property({
    displayName: "重制为能点击需要的key",
    tooltip: "当有这些key发生变化时会触发按钮重置,多个用逗号隔开"
  })], _ctor.prototype, "resetNeedKeys", undefined);
  __decorate([_property({
    displayName: "检测方式",
    tooltip: "全部满足还是满足最新的key"
  })], _ctor.prototype, "isNeedAll", undefined);
  __decorate([_property({
    displayName: "按下时是否缩放"
  })], _ctor.prototype, "isScaleTween", undefined);
  __decorate([_property({
    displayName: "缩放系数",
    type: cc.Float,
    visible: function () {
      return this.isScaleTween;
    }
  })], _ctor.prototype, "scaleRate", undefined);
  __decorate([_property({
    displayName: "缩放所需时间",
    type: cc.Float,
    visible: function () {
      return this.isScaleTween;
    }
  })], _ctor.prototype, "scaleDuration", undefined);
  return __decorate([_ccclass, _menu("新系统/玩家操作/一次性点击")], _ctor);
}(r_EventComBase.EventComBase);
exports.OnceClickCom = exp_OnceClickCom;