var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_RunTimerBase = require("RunTimerBase");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var def_Ex_VideoBtn = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.useTimer = null;
    t.callbackId = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.ACFun = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    this.timerRun(false);
    r_PlatformSystem.PlatformSystem.showVideo("加时", function () {
      e.callbackId && r_BehaviorMgr.BehaviorMgr.trigger(e.callbackId);
      e.timerRun(true);
    }, function () {
      e.timerRun(true);
    });
  };
  _ctor.prototype.timerRun = function (e) {
    this.useTimer && (this.useTimer.loopKey = e);
  };
  __decorate([_property({
    displayName: "计时器",
    type: r_RunTimerBase.default
  })], _ctor.prototype, "useTimer", undefined);
  __decorate([_property({
    displayName: "回调行为id"
  })], _ctor.prototype, "callbackId", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/普通脚本/视频按钮")], _ctor);
}(cc.Component);
exports.default = def_Ex_VideoBtn;