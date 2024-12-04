var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CommonFunc = require("CommonFunc");
var r_ICom = require("ICom");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_ComShowWhenDrag = function (e) {
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
    this.node.opacity = 0;
    this.node.on(cc.Node.EventType.TOUCH_START, this.startFunc, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.moveFunc, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.endFunc, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.endFunc, this);
  };
  _ctor.prototype.startFunc = function (e) {
    var t = e.target;
    if (r_CommonFunc.checkTouchNode(e.getLocation(), t)) {
      this.isClicking = true;
      e.stopPropagation();
      this.startPos = t.worldPosition;
      cc.tween(this.node).to(.2, {
        opacity: 255
      }, {
        easing: cc.easing.quadOut
      }).start();
    }
  };
  _ctor.prototype.moveFunc = function (e) {
    if (this.isClicking) {
      e.stopPropagation();
      this.node.getWorldScale(this.tempV2);
      this.node.x += e.getDeltaX() / this.tempV2.x;
      this.node.y += e.getDeltaY() / this.tempV2.y;
    }
  };
  _ctor.prototype.endFunc = function (e) {
    var t = this;
    if (this.isClicking) {
      this.isClicking = false;
      e.stopPropagation();
      var o = e.getLocation();
      this.callback && this.callback(this.infoI, o);
      cc.tween(this.node).to(.1, {
        opacity: 0
      }, {
        easing: cc.easing.quadOut
      }).call(function () {
        t.node.worldPosition = t.startPos;
      }).start();
    }
  };
  _ctor.prototype.onDestroy = function () {
    cc.Tween.stopAllByTarget(this.node);
  };
  return __decorate([_ccclass], _ctor);
}(r_ICom.default);
exports.default = def_ComShowWhenDrag;