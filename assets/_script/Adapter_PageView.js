var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_Adapter_PageView = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.scrollView = null;
    t.handNode = null;
    t.beginX = 0;
    t.beginY = 0;
    t.ifFirst = true;
    t.isPickUp = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onEnable = function () {
    var e = this;
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (t) {
      cc.log("@@@@@@cancel");
      e.onTouchEnd(t);
    });
  };
  _ctor.prototype.onDisable = function () {
    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onTouchBegin = function (e) {
    this.isPickUp = false;
    this.ifFirst = true;
    if (e) {
      this.beginX = e.getLocationX();
      this.beginY = e.getLocationY();
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.scrollView.enabled && (Math.abs(e.getLocationX() - this.beginX) > 0 || Math.abs(e.getLocationY() - this.beginY) > 0)) {
      this.isPickUp = true;
      this.scrollView.enabled = false;
      r_SoundMgr.SoundMgr.playSound("click");
    }
  };
  _ctor.prototype.onTouchEnd = function () {
    if (this.isPickUp) {
      this.scrollView.enabled = true;
      this.scrollView.scrollToPage(this.scrollView.getCurrentPageIndex(), .1);
    }
  };
  __decorate([_property({
    displayName: "滚动条",
    type: cc.PageView
  })], _ctor.prototype, "scrollView", undefined);
  __decorate([_property({
    displayName: "顶层节点",
    type: cc.Node
  })], _ctor.prototype, "handNode", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/移动禁用页布局")], _ctor);
}(cc.Component);
exports.default = def_Adapter_PageView;