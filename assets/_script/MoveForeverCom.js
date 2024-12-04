var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_MoveForeverCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.time = .3;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.node.x = this.startPos.x;
    this.node.y = this.startPos.y;
    var e = cc.tween().to(this.time, {
      x: this.endPos.x,
      y: this.endPos.y
    }).to(this.time, {
      x: this.startPos.x,
      y: this.startPos.y
    });
    cc.tween(this.node).then(e).repeatForever().start();
  };
  __decorate([_property({
    type: cc.Node,
    tooltip: "开始坐标"
  })], _ctor.prototype, "startPos", undefined);
  __decorate([_property({
    type: cc.Node,
    tooltip: "结束坐标"
  })], _ctor.prototype, "endPos", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "移动时间"
  })], _ctor.prototype, "time", undefined);
  return __decorate([_ccclass, _menu("文字游戏/来回移动")], _ctor);
}(cc.Component);
exports.default = def_MoveForeverCom;