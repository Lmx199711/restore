var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var l = function () {
  function e() {
    this.target = null;
    this.delay = 0;
    this.show = false;
    this.isOpacity = false;
    this.opacityTime = .5;
    this.endOpacity = 255;
  }
  __decorate([_property({
    type: cc.Node,
    tooltip: "需要操作的对象"
  })], e.prototype, "target", undefined);
  __decorate([_property({
    tooltip: "延迟操作时间"
  })], e.prototype, "delay", undefined);
  __decorate([_property({
    tooltip: "是否显示"
  })], e.prototype, "show", undefined);
  __decorate([_property({
    tooltip: "是否有透明度变化"
  })], e.prototype, "isOpacity", undefined);
  __decorate([_property({
    tooltip: "透明度变化时间"
  })], e.prototype, "opacityTime", undefined);
  __decorate([_property({
    tooltip: "结束透明度"
  })], e.prototype, "endOpacity", undefined);
  return __decorate([_ccclass("ShowData")], e);
}();
var def_ShowOnPut = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isItemPutTrigger = true;
    t.nodes = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.do = function (e) {
    if (e && e.target) {
      if (e.isOpacity) {
        if (e.show) {
          e.target.active = true;
          e.target.opacity = 0;
          cc.tween(e.target).to(e.opacityTime, {
            opacity: e.endOpacity
          }).call(function () {}).start();
        } else {
          cc.tween(e.target).to(e.opacityTime, {
            opacity: e.endOpacity
          }).call(function () {
            e.target.active = false;
          }).start();
        }
      } else {
        e.target.active = e.show;
        e.target.opacity = e.endOpacity;
      }
    }
  };
  _ctor.prototype.trigger = function () {
    var e = this;
    this.nodes.forEach(function (t) {
      if (0 == t.delay) {
        e.do(t);
      } else {
        setTimeout(function () {
          e.do(t);
        }, 1e3 * t.delay);
      }
    });
  };
  _ctor.prototype.onDestroy = function () {};
  __decorate([_property({
    tooltip: "itemComponent放下是否会触发"
  })], _ctor.prototype, "isItemPutTrigger", undefined);
  __decorate([_property({
    type: [l]
  })], _ctor.prototype, "nodes", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ShowOnPut;