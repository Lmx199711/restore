var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_ScaleForeverCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.startScale = 0;
    t.endScale = 1;
    t.time = 1;
    t.isStart = true;
    t.tw = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.node.scale = this.startScale;
    var e = cc.tween().to(this.time, {
      scale: this.endScale
    }).to(this.time, {
      scale: this.startScale
    });
    this.tw = cc.tween(this.node).then(e).repeatForever();
    this.isStart && this.startTween();
  };
  _ctor.prototype.startTween = function () {
    this.tw.start();
  };
  _ctor.prototype.stopTween = function () {
    this.tw.stop();
    this.node.scale = this.startScale;
  };
  __decorate([_property({
    type: Number,
    tooltip: "开始Scale"
  })], _ctor.prototype, "startScale", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "结束Scale"
  })], _ctor.prototype, "endScale", undefined);
  __decorate([_property({
    type: Number,
    tooltip: "时间"
  })], _ctor.prototype, "time", undefined);
  __decorate([_property({
    type: Boolean,
    tooltip: "是否直接开始"
  })], _ctor.prototype, "isStart", undefined);
  return __decorate([_ccclass, _menu("文字游戏/来回缩放")], _ctor);
}(cc.Component);
exports.default = def_ScaleForeverCom;