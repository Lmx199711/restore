var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameEvent = require("GameEvent");
var r_Index = require("Index");
var r_RelaxSystem = require("RelaxSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var def_RunTimerBase = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.adAddTime = 60;
    t.maxSecond = 0;
    t.curSecond = 0;
    t.loopKey = false;
    t.isPause = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.init = function (e, t) {
    this.maxSecond = t;
    this.curSecond = e;
  };
  _ctor.prototype.onLoad = function () {
    r_Index.App.inst.on(r_GameEvent.default.PauseGame, this.pauseRun, this);
    r_Index.App.inst.on(r_GameEvent.default.ResumeGame, this.resumeRun, this);
  };
  _ctor.prototype.onDestroy = function () {
    r_Index.App.inst.off(r_GameEvent.default.WinGame, this.pauseRun, this);
    r_Index.App.inst.off(r_GameEvent.default.PauseGame, this.pauseRun, this);
    r_Index.App.inst.off(r_GameEvent.default.ResumeGame, this.resumeRun, this);
  };
  _ctor.prototype.pauseRun = function () {
    this.isPause = true;
  };
  _ctor.prototype.resumeRun = function () {
    this.isPause = false;
  };
  _ctor.prototype.showAddTime = function () {
    r_RelaxSystem.RelaxSystem.lose();
  };
  __decorate([_property({
    displayName: "看广告加时多少",
    step: .5
  })], _ctor.prototype, "adAddTime", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_RunTimerBase;