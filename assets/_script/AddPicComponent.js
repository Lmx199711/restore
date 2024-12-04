var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CleanState = undefined;
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
(function (e) {
  e[e.None = 1] = "None";
  e[e.AddPic = 2] = "AddPic";
  e[e.Clean = 3] = "Clean";
})(exports.CleanState || (exports.CleanState = {}));
var def_AddPicComponent = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {};
  __decorate([_property({
    type: cc.Node,
    tooltip: "拷贝的图片"
  })], _ctor.prototype, "drawNode", undefined);
  __decorate([_property({
    type: cc.Node,
    tooltip: "碰撞节点"
  })], _ctor.prototype, "collideNode", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_AddPicComponent;