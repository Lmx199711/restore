var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CommonFunc = require("CommonFunc");
var r_ICom = require("ICom");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_ComClick = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
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
    if (1 == e.getTouches().length) {
      if (r_CommonFunc.checkTouchNode(e.getLocation(), this.node)) {
        e.stopPropagation();
        this.isClicking = true;
        if (this.callback) {
          console.log(":Click事件,传递：" + this.infoI + ",e.getLocation():" + e.getLocation());
          this.callback(this.infoI);
        }
      }
    } else {
      this.isClicking = false;
    }
  };
  _ctor.prototype.moveFunc = function (e) {
    this.isClicking && e.stopPropagation();
  };
  _ctor.prototype.endFunc = function (e) {
    if (this.isClicking) {
      e.stopPropagation();
      this.isClicking = false;
    }
  };
  return __decorate([_ccclass], _ctor);
}(r_ICom.default);
exports.default = def_ComClick;