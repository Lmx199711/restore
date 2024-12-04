var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CommonFunc = require("CommonFunc");
var r_ICom = require("ICom");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_ComDrag = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.infoI = 0;
    t.tempV2 = new cc.Vec2();
    t.toolOriginIndex = -1;
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
    if (1 == e.getTouches().length) {
      if (r_CommonFunc.checkTouchNode(e.getLocation(), t)) {
        this.isClicking = true;
        e.stopPropagation();
        this.startPos = t.worldPosition;
        this.toolOriginIndex = t.getSiblingIndex();
        this.node.setSiblingIndex(999);
      }
    } else {
      this.isClicking = false;
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
    if (this.isClicking) {
      e.stopPropagation();
      this.isClicking = false;
      var t = e.getLocation();
      var o = t.sub(this.startPos).len();
      this.callback && this.callback(this.infoI, t, o);
      this.node.worldPosition = this.startPos;
      this.node.setSiblingIndex(this.toolOriginIndex);
    }
  };
  return __decorate([_ccclass], _ctor);
}(r_ICom.default);
exports.default = def_ComDrag;