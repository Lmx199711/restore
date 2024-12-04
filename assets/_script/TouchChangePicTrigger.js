var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameKeyMgr = require("GameKeyMgr");
var r_TouchTriggerBase = require("TouchTriggerBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var p = function () {
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
  return __decorate([_ccclass("SetNodeShowNodeInfo2")], e);
}();
var d = function () {
  function e() {
    this.nodeList = [];
  }
  __decorate([_property({
    type: p,
    displayName: "节点列表"
  })], e.prototype, "nodeList", undefined);
  return __decorate([_ccclass("PickPutNodeInfo2")], e);
}();
var def_TouchChangePicTrigger = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.stateList = [];
    t.saveKey = "";
    t.deleteKey = "";
    t.curState = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    this.curState = 0;
  };
  _ctor.prototype.onDragStart = function (t) {
    if (!this.checkHasNotClickKey()) {
      e.prototype.onDragStart.call(this, t);
      var o = this.stateList[this.curState];
      if (o) {
        for (var i = 0; i < o.nodeList.length; i++) {
          var n = o.nodeList[i];
          if (n.isShow) {
            n.target.active = true;
          } else {
            n.target.active = false;
          }
        }
        this.curState = this.curState + 1;
        if (this.curState > this.stateList.length - 1) {
          "" != this.saveKey && r_GameKeyMgr.GameKeyMgr.add(this.saveKey);
          "" != this.deleteKey && r_GameKeyMgr.GameKeyMgr.remove(this.deleteKey);
          this.trigger();
        }
      }
    }
  };
  __decorate([_property({
    type: d,
    displayName: "状态列表"
  })], _ctor.prototype, "stateList", undefined);
  __decorate([_property({
    displayName: "完成后储存一个标记"
  })], _ctor.prototype, "saveKey", undefined);
  __decorate([_property({
    displayName: "完成后删除一个标记"
  })], _ctor.prototype, "deleteKey", undefined);
  return __decorate([_ccclass, _menu("Action/事件/点击切换图片")], _ctor);
}(r_TouchTriggerBase.default);
exports.default = def_TouchChangePicTrigger;