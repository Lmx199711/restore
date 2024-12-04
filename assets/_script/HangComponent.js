var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_HangComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.itemIdList = [];
    t.putIdList = [];
    t.zorder = 0;
    t.overlay = false;
    t.rotation = 0;
    t.scale = 1;
    t.putAreaX = 20;
    t.putAreaY = 20;
    t.curItemList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {};
  __decorate([_property({
    type: [cc.Integer],
    tooltip: "对应item的id列表"
  })], _ctor.prototype, "itemIdList", undefined);
  __decorate([_property({
    type: [cc.Integer],
    tooltip: "可放置的id列表"
  })], _ctor.prototype, "putIdList", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "放置物层级"
  })], _ctor.prototype, "zorder", undefined);
  __decorate([_property({
    type: Boolean,
    tooltip: "可重叠"
  })], _ctor.prototype, "overlay", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "放置物旋转角度"
  })], _ctor.prototype, "rotation", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "放置物缩放"
  })], _ctor.prototype, "scale", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "可放置x距离"
  })], _ctor.prototype, "putAreaX", undefined);
  __decorate([_property({
    type: cc.Integer,
    tooltip: "可放置y距离"
  })], _ctor.prototype, "putAreaY", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_HangComponent;