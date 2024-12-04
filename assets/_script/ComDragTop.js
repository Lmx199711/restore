var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_IComDrag = require("IComDrag");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_ComDragTop = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.infoI = 0;
    t.tempV2 = new cc.Vec2();
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.bindCallBack = function (e, t) {
    this.infoI = e;
    this.init();
    t && (this.callback = t);
  };
  _ctor.prototype.init = function () {
    this.node.on(cc.Node.EventType.TOUCH_START, this.startFunc, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveFunc, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.endFunc, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.endFunc, this);
  };
  _ctor.prototype.startFunc = function (t) {
    e.prototype.startFunc.call(this, t);
  };
  _ctor.prototype.moveFunc = function (t) {
    e.prototype.moveFunc.call(this, t);
  };
  _ctor.prototype.endFunc = function (t) {
    e.prototype.endFunc.call(this, t);
    console.log("::::移动结束----:");
  };
  return __decorate([_ccclass], _ctor);
}(r_IComDrag.default);
exports.default = def_ComDragTop;