var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_PolygonTouchBg = require("PolygonTouchBg");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_PolygonBtn = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.clickEvents = [];
    t.isMain = false;
    t.touchBg = null;
    t.isScale = true;
    t.isCollider = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.touchBg.addPolygonNode(this);
  };
  _ctor.prototype.onEnable = function () {};
  _ctor.prototype.touchBegin = function (e) {
    if (!(this.isMain && r_TYIndex.UIWind.getShowNum() > 1)) {
      this.isCollider = false;
      var t = e.getLocation();
      var o = this.node.convertToNodeSpaceAR(t);
      var i = this.node.getComponent(cc.PolygonCollider);
      if (cc.Intersection.pointInPolygon(o, i.points)) {
        this.isCollider = true;
        cc.Tween.stopAllByTarget(this.node);
        if (this.isScale) {
          this.node.scale = 1;
          cc.tween(this.node).to(.1, {
            scale: .98
          }).start();
        }
      }
    }
  };
  _ctor.prototype.touchMove = function () {};
  _ctor.prototype.touchEnd = function () {
    this.isMain && r_TYIndex.UIWind.getShowNum() > 1 || this.isCollider && (cc.Tween.stopAllByTarget(this.node), this.isScale && cc.tween(this.node).to(.1, {
      scale: 1
    }).start(), this.emitEvents());
  };
  _ctor.prototype.onDisable = function () {
    this.isScale && (this.node.scale = 1);
  };
  _ctor.prototype.emitEvents = function () {
    for (var e = 0; e < this.clickEvents.length; e++) {
      cc.Component.EventHandler.emitEvents(this.clickEvents);
    }
  };
  __decorate([_property({
    type: [cc.Component.EventHandler],
    displayName: "点击事件"
  })], _ctor.prototype, "clickEvents", undefined);
  __decorate([_property({
    type: Boolean,
    displayName: "是否是主界面"
  })], _ctor.prototype, "isMain", undefined);
  __decorate([_property({
    type: r_PolygonTouchBg.default,
    displayName: "点击背景"
  })], _ctor.prototype, "touchBg", undefined);
  __decorate([_property({
    type: Boolean,
    displayName: "点击缩放"
  })], _ctor.prototype, "isScale", undefined);
  return __decorate([_ccclass, _menu("公用/多边形按钮")], _ctor);
}(cc.Component);
exports.default = def_PolygonBtn;