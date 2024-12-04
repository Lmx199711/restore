var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CommonFunc = require("CommonFunc");
var r_ICom = require("ICom");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_ComClickAndMove = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.tempV2 = new cc.Vec2();
    t.infoI = 0;
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
  _ctor.prototype.startFunc = function (e) {
    var t = e.target;
    if (r_CommonFunc.checkTouchNode(e.getLocation(), t)) {
      e.stopPropagation();
      this.isClicking = true;
      this.moveDistance = 0;
      this.firstTouchWorldPos = e.getLocation();
    }
  };
  _ctor.prototype.moveFunc = function (e) {
    this.isClicking && e.stopPropagation();
  };
  _ctor.prototype.endFunc = function (e) {
    if (this.isClicking) {
      e.stopPropagation();
      this.isClicking = false;
      var t = e.getLocation();
      if (this.callback) {
        console.log(":抬起事件,传递：" + this.infoI + ",endPos:" + t);
        this.callback(this.infoI, t);
      }
    }
  };
  return __decorate([_ccclass], _ctor);
}(r_ICom.default);
exports.default = def_ComClickAndMove;