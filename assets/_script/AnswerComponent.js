var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_AnswerComponent = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isCorrect = false;
    t.selectCallBack = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.init = function (e) {
    this.selectCallBack = e;
  };
  _ctor.prototype.start = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
  };
  _ctor.prototype.onTouchStart = function () {
    this.selectCallBack && this.selectCallBack(this.isCorrect, this);
  };
  _ctor.prototype.onDestroy = function () {
    this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
  };
  __decorate([_property({
    tooltip: "是否是正确答案"
  })], _ctor.prototype, "isCorrect", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_AnswerComponent;