var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HangActionData = exports.ItemSetData = undefined;
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_CheckHasKeys = require("CheckHasKeys");
var r_HangComponent = require("HangComponent");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_ItemSetData = function () {
  function _ctor() {
    this.target = null;
    this.show = true;
  }
  __decorate([_property({
    type: cc.Node,
    tooltip: "要操作的节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    tooltip: "显示还是隐藏"
  })], _ctor.prototype, "show", undefined);
  return __decorate([_ccclass("ItemSetData")], _ctor);
}();
exports.ItemSetData = exp_ItemSetData;
var exp_HangActionData = function () {
  function _ctor() {
    this.hang = null;
    this.action = "";
  }
  __decorate([_property({
    type: r_HangComponent.default,
    displayName: "挂点"
  })], _ctor.prototype, "hang", undefined);
  __decorate([_property({
    displayName: "action"
  })], _ctor.prototype, "action", undefined);
  return __decorate([_ccclass("HangActionData")], _ctor);
}();
exports.HangActionData = exp_HangActionData;
var def_ItemComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.itemId = 0;
    t.preItemList = [];
    t.moveToStart = false;
    t.equipId = 0;
    t.equipList = [];
    t.equipIdList = [];
    t.needDrop = false;
    t.putZorder = 0;
    t.needShowNodes = [];
    t.ignoreCheck = false;
    t.canAdsorption = true;
    t.needChangePic = false;
    t.isTool = false;
    t.putSoundName = "";
    t.isRandomAngle = true;
    t.putAction = "";
    t.putTriggerOneTime = false;
    t.getAction = "";
    t.createByBtn = true;
    t.putCannotTouch = true;
    t.canPutKey = [];
    t.hangActionList = [];
    t.curHang = null;
    t.equipItem = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.changePic = function (e) {
    if (this.needChangePic) {
      var t = this.node.children[0];
      var o = this.node.children[1];
      t && (t.active = e);
      o && (o.active = !e);
    }
  };
  _ctor.prototype.triggerPutAction = function (e) {
    if ("" != this.putAction) {
      r_TriggerActionMgr.TriggerActionMgr.trigger(this.putAction);
      this.putTriggerOneTime && (this.putAction = "");
    }
    if (e) {
      for (var t = 0; t < this.hangActionList.length; t++) {
        this.hangActionList[t].hang == e && r_TriggerActionMgr.TriggerActionMgr.trigger(this.hangActionList[t].action);
      }
    }
  };
  _ctor.prototype.triggerGetAction = function () {
    "" != this.getAction && r_TriggerActionMgr.TriggerActionMgr.trigger(this.getAction);
  };
  __decorate([_property({
    tooltip: "对应挂点的Id"
  })], _ctor.prototype, "itemId", undefined);
  __decorate([_property({
    type: [cc.Node],
    tooltip: "需要先装备的物品列表"
  })], _ctor.prototype, "preItemList", undefined);
  __decorate([_property({
    tooltip: "方下的时候返回最开始坐标"
  })], _ctor.prototype, "moveToStart", undefined);
  __decorate([_property({
    tooltip: "装备Id"
  })], _ctor.prototype, "equipId", undefined);
  __decorate([_property({
    type: [cc.Node],
    tooltip: "装备节点列表"
  })], _ctor.prototype, "equipList", undefined);
  __decorate([_property({
    type: [Number],
    tooltip: "装备节点Id列表"
  })], _ctor.prototype, "equipIdList", undefined);
  __decorate([_property({
    tooltip: "需要丢弃的"
  })], _ctor.prototype, "needDrop", undefined);
  __decorate([_property({
    tooltip: "放下时候的层级"
  })], _ctor.prototype, "putZorder", undefined);
  __decorate([_property({
    type: [exp_ItemSetData],
    tooltip: "点击后要操作的对象"
  })], _ctor.prototype, "needShowNodes", undefined);
  __decorate([_property({
    displayName: "忽略检测"
  })], _ctor.prototype, "ignoreCheck", undefined);
  __decorate([_property({
    type: [Boolean],
    tooltip: "是否可以被吸附"
  })], _ctor.prototype, "canAdsorption", undefined);
  __decorate([_property({
    type: Boolean,
    tooltip: "吸附到正确位置之后是否需要切换图片"
  })], _ctor.prototype, "needChangePic", undefined);
  __decorate([_property({
    type: Boolean,
    tooltip: "是否是工具"
  })], _ctor.prototype, "isTool", undefined);
  __decorate([_property({
    type: String,
    tooltip: "放置的音效名称"
  })], _ctor.prototype, "putSoundName", undefined);
  __decorate([_property({
    tooltip: "是否随机旋转"
  })], _ctor.prototype, "isRandomAngle", undefined);
  __decorate([_property({
    tooltip: "放上后触发的action"
  })], _ctor.prototype, "putAction", undefined);
  __decorate([_property({
    tooltip: "放上action是否只触发一次"
  })], _ctor.prototype, "putTriggerOneTime", undefined);
  __decorate([_property({
    tooltip: "抬起后触发的action"
  })], _ctor.prototype, "getAction", undefined);
  __decorate([_property({
    tooltip: "按钮创建"
  })], _ctor.prototype, "createByBtn", undefined);
  __decorate([_property({
    tooltip: "放上后不能再点击"
  })], _ctor.prototype, "putCannotTouch", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时才可以放置"
  })], _ctor.prototype, "canPutKey", undefined);
  __decorate([_property({
    type: [exp_HangActionData],
    displayName: "放到对应挂点后执行的action"
  })], _ctor.prototype, "hangActionList", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ItemComponent;