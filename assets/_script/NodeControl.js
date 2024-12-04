var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeControl = exports.type = undefined;
var s;
var _decorator = cc._decorator;
_decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e["点击"] = 0] = "点击";
  e[e["拖动"] = 1] = "拖动";
})(s = exports.type || (exports.type = {}));
var exp_NodeControl = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.node = null;
    t.type = s.拖动;
    t.click_event = "";
    t.take_node = null;
    t.take_node_event = "";
    t.target_node = null;
    t.target_node_event = "";
    t.is_move_event = false;
    t.move_event = "";
    t.up_move_event = "";
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "节点",
    type: cc.Node
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    displayName: "操作类型",
    type: cc.Enum(s)
  })], _ctor.prototype, "type", undefined);
  __decorate([_property({
    displayName: "单击事件",
    visible: function () {
      return this.type == s.点击;
    }
  })], _ctor.prototype, "click_event", undefined);
  __decorate([_property({
    displayName: "挂载节点",
    type: cc.Node,
    visible: function () {
      return this.type == s.拖动;
    }
  })], _ctor.prototype, "take_node", undefined);
  __decorate([_property({
    displayName: "挂载节点事件",
    visible: function () {
      return null != this.take_node;
    }
  })], _ctor.prototype, "take_node_event", undefined);
  __decorate([_property({
    displayName: "目标节点",
    type: cc.Node,
    visible: function () {
      return null != this.take_node;
    }
  })], _ctor.prototype, "target_node", undefined);
  __decorate([_property({
    displayName: "目标节点事件",
    visible: function () {
      return null != this.target_node;
    }
  })], _ctor.prototype, "target_node_event", undefined);
  __decorate([_property({
    displayName: "是否需要移动节点事件",
    visible: function () {
      return this.type == s.拖动;
    }
  })], _ctor.prototype, "is_move_event", undefined);
  __decorate([_property({
    displayName: "移动节点事件",
    visible: function () {
      return this.is_move_event;
    }
  })], _ctor.prototype, "move_event", undefined);
  __decorate([_property({
    displayName: "抬起移动节点事件",
    visible: function () {
      return this.is_move_event;
    }
  })], _ctor.prototype, "up_move_event", undefined);
  return __decorate([_ccclass("NodeControl")], _ctor);
}(cc.Component);
exports.NodeControl = exp_NodeControl;