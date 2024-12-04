var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CleanGroupComponent28010 = require("CleanGroupComponent28010");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_EraseCom28010 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cleanCom = null;
    t.isCleanSuccess = false;
    t.cleanSuccessCallBack = null;
    t.cleanAllSuccessCallBack = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {};
  _ctor.prototype.init = function () {
    if (!this.touchArea) {
      this.touchArea = new cc.Node("touchArea");
      this.node.addChild(this.touchArea);
      this.touchArea.width = 2e3;
      this.touchArea.height = 2e3;
      this.head = new cc.Node("head");
      this.node.addChild(this.head);
      this.head.x = 2e3;
      this.head.y = 2e3;
    }
  };
  _ctor.prototype.onEnable = function () {
    this.init();
  };
  _ctor.prototype.clear = function () {
    this.cleanCom.reset();
    this.cleanCom.cleanEnd();
  };
  _ctor.prototype.unregistTouch = function () {
    this.touchArea.off(cc.Node.EventType.TOUCH_START);
    this.touchArea.off(cc.Node.EventType.TOUCH_MOVE);
    this.touchArea.off(cc.Node.EventType.TOUCH_END);
    this.touchArea.off(cc.Node.EventType.TOUCH_CANCEL);
    console.log("(this.touchArea as any)._touchListener:", this.touchArea._touchListener);
    this.touchArea._touchListener && this.touchArea._touchListener.setSwallowTouches(true);
  };
  _ctor.prototype.startClean = function (e) {
    undefined === e && (e = true);
    e && this.registTouch();
    this.isCleanSuccess = false;
    this.cleanCom.node.active = true;
    this.cleanCom.initPoints();
    this.cleanCom.reset();
    this.cleanCom.cleanEnd();
    this.cleanCom.startClean(this.head, this.cleanSuccess.bind(this), this.cleanAllSuccess.bind(this), this.updateCleanProgress.bind(this));
    this.cleanCom.setCanTouchMask(true);
  };
  _ctor.prototype.stopClean = function () {
    this.touchArea.active = false;
  };
  _ctor.prototype.initPointsWithCfg = function (e) {
    this.cleanCom.refreshPointByCfg(e);
    this.cleanCom.checkInit();
  };
  _ctor.prototype.cleanSuccess = function (e) {
    console.log("eraseCom cleanSuccess index=", e);
    this.cleanSuccessCallBack && this.cleanSuccessCallBack(e);
  };
  _ctor.prototype.cleanAllSuccess = function () {
    console.log("eraseCom cleanAllSuccess");
    this.isCleanSuccess = true;
  };
  _ctor.prototype.updateCleanProgress = function () {};
  _ctor.prototype.registTouch = function () {
    this.unregistTouch();
    this.touchArea.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
    this.touchArea.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
    this.touchArea.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    this.touchArea.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
    this.touchArea._touchListener.setSwallowTouches(false);
  };
  _ctor.prototype.touchStart = function (e) {
    var t = e.getLocation();
    var o = this.cleanCom.node.convertToNodeSpaceAR(t);
    this.head.x = o.x;
    this.head.y = o.y;
    this.cleanCom.touchStart(e);
  };
  _ctor.prototype.touchMove = function (e) {
    var t = e.touch.getLocation();
    var o = this.cleanCom.node.convertToNodeSpaceAR(t);
    this.head.x = o.x;
    this.head.y = o.y;
    this.cleanCom.touchMove(e);
  };
  _ctor.prototype.touchEnd = function (e) {
    this.checkResult();
    this.cleanCom.touchEnd(e);
  };
  _ctor.prototype.checkResult = function () {
    if (this.isCleanSuccess) {
      this.isCleanSuccess = false;
      this.cleanCom.node.active = false;
      this.cleanAllSuccessCallBack && this.cleanAllSuccessCallBack();
    }
  };
  __decorate([_property({
    type: r_CleanGroupComponent28010.default,
    displayName: "清理组件"
  })], _ctor.prototype, "cleanCom", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_EraseCom28010;