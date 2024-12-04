var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScreenController = undefined;
var r_UtilsSystem = require("UtilsSystem");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TYEventType = require("TYEventType");
var r_Index = require("Index");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_ScreenController = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.screenNode = null;
    t.bgNode = null;
    t.touchNode = null;
    t.scaleAction = new cc.Vec2(1, 1);
    t.beginDistance = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.init();
  };
  _ctor.prototype.init = function () {
    this.screenNode = this.screenNode || this.bgNode;
    if (!r_Index.Platform.isMiniPlatform) {
      console.warn("测试平台注册滚轮事件");
      fgui.GRoot.inst.on(cc.Node.EventType.MOUSE_WHEEL, this.mouseWheel, this);
    }
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.touchNode);
    this.registTouch();
    this.getMoveDis();
  };
  _ctor.prototype.mouseWheel = function (e) {
    var t = e.getScrollY() / 1200;
    var o = this.bgNode.scale += t;
    var i = cc.misc.clampf(o, this.scaleAction.x, this.scaleAction.y);
    this.bgNode.scale = i;
    this.getMoveDis();
    this.moveBgNode(e, e.getLocation());
  };
  _ctor.prototype.getMoveDis = function () {
    this.widthDis = (this.bgNode.width * this.bgNode.scale - this.screenNode.width) / 2;
    this.widthDis = Math.max(this.widthDis, 0);
    this.heightDis = (this.bgNode.height * this.bgNode.scale - this.screenNode.height) / 2;
    this.heightDis = Math.max(this.heightDis, 0);
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    var t = null;
    var o = false;
    this.touchNode.on(r_TYEventType.TYEventType.TOUCH_BEGIN, function (i) {
      o = false;
      t = i.getLocation();
      e.beginDistance = 0;
      e.beginScale = e.bgNode.scale;
      r_UtilsSystem.UtilsSystem.touchInNode(e.bgNode.parent, t) && (e.bgOriginPos = e.bgNode.getPosition());
    });
    this.touchNode.on(r_TYEventType.TYEventType.DRAG_MOVE, function (i) {
      var n = i.getTouches();
      1 != n.length || o || e.moveBgNode(i, t);
      if (2 == n.length) {
        o = true;
        var a = n[0].getLocation();
        var s = n[1].getLocation();
        var r = a.sub(s).len();
        e.beginDistance <= 0 && (e.beginDistance = r);
        var c = r / e.beginDistance * e.beginScale;
        var l = cc.misc.clampf(c, e.scaleAction.x, e.scaleAction.y);
        e.bgNode.scale = l;
        e.getMoveDis();
        e.moveBgNode(i, t);
      }
    });
    this.touchNode.on(r_TYEventType.TYEventType.TOUCH_END, function () {});
  };
  _ctor.prototype.moveBgNode = function (e, t) {
    if (this.bgOriginPos) {
      var o = e.getLocation();
      var i = this.bgOriginPos.add(o.subtract(t));
      i.x < -this.widthDis && (i.x = -this.widthDis);
      i.x > this.widthDis && (i.x = this.widthDis);
      i.y < -this.heightDis && (i.y = -this.heightDis);
      i.y > this.heightDis && (i.y = this.heightDis);
      this.bgNode.setPosition(i);
    }
  };
  _ctor.prototype.start = function () {};
  _ctor.prototype.onDestroy = function () {};
  __decorate([_property({
    displayName: "显示区域",
    type: cc.Node,
    tooltip: "可见的范围大小，背景在此范围内移动(不填则不可移动)"
  })], _ctor.prototype, "screenNode", undefined);
  __decorate([_property({
    displayName: "背景",
    type: cc.Node,
    tooltip: "挂载内容节点的地方"
  })], _ctor.prototype, "bgNode", undefined);
  __decorate([_property({
    displayName: "点击区域",
    type: cc.Node,
    tooltip: "点击区域"
  })], _ctor.prototype, "touchNode", undefined);
  __decorate([_property({
    displayName: "缩放范围"
  })], _ctor.prototype, "scaleAction", undefined);
  return __decorate([_ccclass, _menu("新系统/工具/屏幕控制")], _ctor);
}(cc.Component);
exports.ScreenController = exp_ScreenController;