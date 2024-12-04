var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetLabelContent = undefined;
var r_GameKeyValueMgr = require("GameKeyValueMgr");
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
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
  return __decorate([_ccclass("ShowNodeInfo4")], e);
}();
var exp_SetLabelContent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.content = "";
    t.key = "";
    t.showNodeList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    if ("" == this.key) {
      this.label.string = this.content;
    } else {
      this.label.string = r_GameKeyValueMgr.GameKeyValueMgr.getValue(this.key);
    }
    for (var e = 0; e < this.showNodeList.length; e++) {
      var t = this.showNodeList[e];
      if (t.isShow) {
        t.target.active = true;
      } else {
        t.target.active = false;
      }
    }
  };
  _ctor.prototype.onStop = function () {
    this.clearTimeOut();
  };
  __decorate([_property({
    type: cc.Label,
    displayName: "label节点"
  })], _ctor.prototype, "label", undefined);
  __decorate([_property({
    displayName: "内容"
  })], _ctor.prototype, "content", undefined);
  __decorate([_property({
    displayName: "根据key设置内容"
  })], _ctor.prototype, "key", undefined);
  __decorate([_property({
    type: h,
    displayName: "设置节点显示隐藏列表"
  })], _ctor.prototype, "showNodeList", undefined);
  return __decorate([_ccclass("SetLabelContent")], _ctor);
}(r_ActionBase.ActionBase);
exports.SetLabelContent = exp_SetLabelContent;