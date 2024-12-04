var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_Adapter_ScrollView = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.scrollView = null;
    t.handNode = null;
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
      this.beginY = e.getLocationY();
      this.handNode.worldPosition = e.getLocation();
      this.handNode.spriteCom.spriteFrame = e.target.spriteCom.spriteFrame;
    }
  };
  _ctor.prototype.onTouchMove = function (e) {
    if (this.scrollView.enabled && e.getLocationY() - this.beginY > 30) {
      this.isPickUp = true;
      this.scrollView.enabled = false;
      this.handNode.active = true;
      this.handNode.scale = 1.2;
      r_SoundMgr.SoundMgr.playSound("click");
    }
    this.handNode.worldPosition = e.getLocation();
  };
  _ctor.prototype.onTouchEnd = function () {
    if (this.isPickUp) {
      this.scrollView.enabled = true;
      this.handNode.active = false;
    }
  };
  __decorate([_property({
    displayName: "滚动条",
    type: cc.ScrollView
  })], _ctor.prototype, "scrollView", undefined);
  __decorate([_property({
    displayName: "顶层节点",
    type: cc.Node
  })], _ctor.prototype, "handNode", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/移动禁用滚动条")], _ctor);
}(cc.Component);
exports.default = def_Adapter_ScrollView;