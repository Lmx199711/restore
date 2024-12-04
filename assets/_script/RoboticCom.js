var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoboticCom = exports.ROBOTIC_HAND_TYPE = undefined;
var s;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
(function (e) {
  e[e["无"] = 0] = "无";
  e[e["滑动"] = 1] = "滑动";
  e[e["拖动"] = 2] = "拖动";
})(s = exports.ROBOTIC_HAND_TYPE || (exports.ROBOTIC_HAND_TYPE = {}));
var exp_RoboticCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.default1 = "点击事件相关";
    t.isClick = false;
    t.clickRange = 20;
    t.clickNeedKey = "";
    t.clickActionId = "";
    t.default2 = "手势交互相关";
    t.handType = s.拖动;
    t.isUpLayer = true;
    t.handNeedKey = "";
    t.handActionId = "";
    t.startTouchActionId = "";
    t.endTouchActionId = "";
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "**点击**",
    readonly: true
  })], _ctor.prototype, "default1", undefined);
  __decorate([_property({
    displayName: "是否检测点击"
  })], _ctor.prototype, "isClick", undefined);
  __decorate([_property({
    displayName: "点击范围",
    type: cc.Integer,
    tooltip: "默认值就行",
    visible: function () {
      return this.isClick;
    }
  })], _ctor.prototype, "clickRange", undefined);
  __decorate([_property({
    displayName: "前提key",
    visible: function () {
      return this.isClick;
    }
  })], _ctor.prototype, "clickNeedKey", undefined);
  __decorate([_property({
    displayName: "执行Id",
    visible: function () {
      return this.isClick;
    }
  })], _ctor.prototype, "clickActionId", undefined);
  __decorate([_property({
    displayName: "**手势**",
    readonly: true
  })], _ctor.prototype, "default2", undefined);
  __decorate([_property({
    displayName: "手势交互",
    type: cc.Enum(s)
  })], _ctor.prototype, "handType", undefined);
  __decorate([_property({
    displayName: "是否拖动时提升层级",
    visible: function () {
      return this.handType == s.拖动;
    }
  })], _ctor.prototype, "isUpLayer", undefined);
  __decorate([_property({
    displayName: "手势Key",
    visible: function () {
      return this.handType !== s.无;
    }
  })], _ctor.prototype, "handNeedKey", undefined);
  __decorate([_property({
    displayName: "执行Id"
  })], _ctor.prototype, "handActionId", undefined);
  __decorate([_property({
    displayName: "开始触摸执行的Id"
  })], _ctor.prototype, "startTouchActionId", undefined);
  __decorate([_property({
    displayName: "结束触摸执行的Id"
  })], _ctor.prototype, "endTouchActionId", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.RoboticCom = exp_RoboticCom;