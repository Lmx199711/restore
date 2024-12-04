var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_CleanGroupComponent = require("CleanGroupComponent");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_EraseCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isCleanSuccess = false;
    t.cleanSuccessCallBack = null;
    t.cleanAllSuccessCallBack = null;
    t.touchMove = null;
    t.touchEnd = null;
    t.cleanPro = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.init();
    this.registTouch();
  };
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
    this.registTouch();
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
    this.head.x = 2e3;
    this.head.y = 2e3;
  };
  _ctor.prototype.startClean = function () {
    this.cleanPro = 0;
    this.touchArea.active = true;
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
    r_SoundMgr.SoundMgr.stopSound("timao");
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
  _ctor.prototype.updateCleanProgress = function (e) {
    this.cleanPro = e;
  };
  _ctor.prototype.registTouch = function () {
    var e = this;
    this.unregistTouch();
    this.touchArea.on(cc.Node.EventType.TOUCH_START, function (t) {
      var o = t.getLocation();
      var i = e.cleanCom.node.convertToNodeSpaceAR(o);
      e.head.x = i.x;
      e.head.y = i.y;
      e.touchMove && e.touchMove(t);
      e.cleanCom.node.active && r_SoundMgr.SoundMgr.playSound("timao", true);
    }, this);
    this.touchArea.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
      var o = t.touch.getLocation();
      var i = e.cleanCom.node.convertToNodeSpaceAR(o);
      e.head.x = i.x;
      e.head.y = i.y;
      e.touchMove && e.touchMove(t);
    }, this);
    this.touchArea.on(cc.Node.EventType.TOUCH_END, function (t) {
      r_SoundMgr.SoundMgr.stopSound("timao");
      e.checkResult();
      e.touchEnd && e.touchEnd(t);
    }, this);
    this.touchArea.on(cc.Node.EventType.TOUCH_CANCEL, function (t) {
      r_SoundMgr.SoundMgr.stopSound("timao");
      e.checkResult();
      e.touchEnd && e.touchEnd(t);
    }, this);
    setTimeout(function () {
      e.touchArea._touchListener.setSwallowTouches(false);
    }, 1);
  };
  _ctor.prototype.checkResult = function () {
    if (this.isCleanSuccess) {
      this.isCleanSuccess = false;
      this.cleanCom.node.active = false;
      this.cleanAllSuccessCallBack && this.cleanAllSuccessCallBack();
    }
  };
  __decorate([_property({
    type: r_CleanGroupComponent.default,
    displayName: "清理组件"
  })], _ctor.prototype, "cleanCom", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_EraseCom;