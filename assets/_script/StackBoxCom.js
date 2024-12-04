var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StackBoxCom = exports.StackBoxInternalItem = undefined;
var r_EventComBase = require("EventComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_StackBoxInternalItem = function () {
  function _ctor() {
    this.action = "";
    this.showToTouchPos = false;
    this.placeOffsetX = 0;
    this.placeOffsetY = 0;
  }
  __decorate([_property({
    displayName: "要显示的操作节点",
    type: cc.Node
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    displayName: "隐藏节点",
    type: cc.Node
  })], _ctor.prototype, "hideNode", undefined);
  __decorate([_property({
    displayName: "需要执行的action"
  })], _ctor.prototype, "action", undefined);
  __decorate([_property({
    displayName: "放置在点击点"
  })], _ctor.prototype, "showToTouchPos", undefined);
  __decorate([_property({
    displayName: "显示后坐标偏移X",
    visible: function () {
      return this.showToTouchPos;
    }
  })], _ctor.prototype, "placeOffsetX", undefined);
  __decorate([_property({
    displayName: "显示后坐标放置后偏移Y",
    visible: function () {
      return this.showToTouchPos;
    }
  })], _ctor.prototype, "placeOffsetY", undefined);
  return __decorate([_ccclass("StackBoxInternalItem")], _ctor);
}();
exports.StackBoxInternalItem = exp_StackBoxInternalItem;
var exp_StackBoxCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.stackInfos = [];
    t.allHide = true;
    t.dragItem = false;
    t.allFinishedActionId = "";
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "内部物品",
    type: exp_StackBoxInternalItem
  })], _ctor.prototype, "stackInfos", undefined);
  __decorate([_property({
    displayName: "所有内容显示完成后是否隐藏"
  })], _ctor.prototype, "allHide", undefined);
  __decorate([_property({
    displayName: "生成后拖动物体"
  })], _ctor.prototype, "dragItem", undefined);
  __decorate([_property({
    displayName: "所有任务完成后"
  })], _ctor.prototype, "allFinishedActionId", undefined);
  return __decorate([_ccclass, _menu("新系统/玩家操作/箱子")], _ctor);
}(r_EventComBase.EventComBase);
exports.StackBoxCom = exp_StackBoxCom;