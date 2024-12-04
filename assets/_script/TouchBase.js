var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CheckHasKeys = require("CheckHasKeys");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var def_TouchBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.desc = "";
    t.canNotClickKey = [];
    t._vec2_temp = cc.v2();
    t.timeOutIndex = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.node._hitTest = this._hitTest.bind(this);
    this.polygon = this.node.getComponent(cc.PolygonCollider);
    this.node.off(cc.Node.EventType.TOUCH_START, this.onDragStart, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this.onDragEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_START, this.onDragStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onDragEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onDragEnd, this);
  };
  _ctor.prototype.checkHasNotClickKey = function () {
    return this.canNotClickKey.length > 0 && r_CheckHasKeys.checkHasKeys(this.canNotClickKey);
  };
  _ctor.prototype._hitTest = function (e) {
    var t = [];
    for (var o = 1; o < arguments.length; o++) {
      t[o - 1] = arguments[o];
    }
    if (!this.hitTest()) {
      return false;
    }
    this.node.convertToNodeSpaceAR(e, this._vec2_temp);
    if (this.polygon) {
      var i = cc.Intersection.pointInPolygon(this._vec2_temp, this.polygon.points);
      return i;
    }
    var n = cc.rect(this.node.x, this.node.y, this.node.width, this.node.height);
    return n.contains(this._vec2_temp);
  };
  _ctor.prototype.hitTest = function () {
    return true;
  };
  _ctor.prototype.onDragStart = function (e) {
    this.checkHasNotClickKey() || this._OnDragStart(e);
  };
  _ctor.prototype.onDragEnd = function (e) {
    this.checkHasNotClickKey() || this._OnDragEnd(e);
  };
  _ctor.prototype._OnDragStart = function () {};
  _ctor.prototype._OnDragEnd = function () {};
  _ctor.prototype.onDestroy = function () {
    for (var e = 0; e < this.timeOutIndex.length; e++) {
      clearTimeout(this.timeOutIndex[e]);
    }
    this.timeOutIndex.length = 0;
  };
  __decorate([_property({
    displayName: "在这里写这个组件的功能描述"
  })], _ctor.prototype, "desc", undefined);
  __decorate([_property({
    type: [r_CheckHasKeys.GameKeyInfo],
    displayName: "当有这些key时,无法点击或者拖动"
  })], _ctor.prototype, "canNotClickKey", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_TouchBase;