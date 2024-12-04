var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_GameEvent = require("GameEvent");
// var r_Index = require("Index");
var r_LoadMgr = require("LoadMgr");
var r_LevelTimeCom = require("LevelTimeCom");
// var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
// var r_TimeSystem = require("TimeSystem");
var _decorator = cc._decorator;
_decorator.ccclass;
_decorator.property;
_decorator.menu;
var def_LevelPreload = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.levelTimeCom = null;
    t.tempList = null;
    t.isPause = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    require("Index").App.inst.on(r_GameEvent.default.PauseGame, this.pauseGame, this);
    require("Index").App.inst.on(r_GameEvent.default.ResumeGame, this.resumeGame, this);
    require("Index").App.inst.on(r_GameEvent.default.WinGame, this.winGame, this);
    require("Index").App.inst.on(r_GameEvent.default.LoseGame, this.loseGame, this);
    require("Index").App.inst.on(r_GameEvent.default.RestartGame, this.restartGame, this);
    require("Index").App.inst.on(r_GameEvent.default.OnShowGameTip, this.onShowGameTip, this);
    this.levelTimeCom = this.node.getComponent(r_LevelTimeCom.default);
    this.levelTimeCom && this.levelTimeCom.init(this);
  };
  _ctor.prototype.onDestroy = function () {
    require("Index").App.inst.off(r_GameEvent.default.WinGame, this.pauseGame, this);
    require("Index").App.inst.off(r_GameEvent.default.LoseGame, this.loseGame, this);
    require("Index").App.inst.off(r_GameEvent.default.PauseGame, this.pauseGame, this);
    require("Index").App.inst.off(r_GameEvent.default.ResumeGame, this.resumeGame, this);
    require("Index").App.inst.off(r_GameEvent.default.RestartGame, this.restartGame, this);
    require("Index").App.inst.off(r_GameEvent.default.OnShowGameTip, this.onShowGameTip, this);
    this.endTime();
  };
  _ctor.prototype.endTime = function () {
    this.levelTimeCom && this.levelTimeCom.end();
  };
  _ctor.prototype.pauseGame = function () {
    this.isPause = true;
    this.tempList = cc.director.getActionManager().pauseAllRunningActions();
    cc.director.getScheduler().pauseTarget(this);
  };
  _ctor.prototype.resumeGame = function () {
    this.isPause = false;
    cc.director.getScheduler().resumeTarget(this);
    if (this.tempList) {
      cc.director.getActionManager().resumeTargets(this.tempList);
      this.tempList = null;
    }
  };
  _ctor.prototype.restartGame = function () {
    require("TimeSystem").TimeSystem.scheduleOnce("restartGame", .01, function () {
      require("RelaxLevelLogicSystem").RelaxLevelLogicSystem.clearLevel();
      r_LoadMgr.default.reloadAgain();
    });
  };
  _ctor.prototype.onShowGameTip = function () {};
  _ctor.prototype.winGame = function () {
    this.passLevel();
  };
  _ctor.prototype.loseGame = function () {
    this.failLevel();
  };
  _ctor.prototype.update = function (e) {
    this.isPause || this.levelTimeCom && this.levelTimeCom.updateTime(e);
  };
  return _ctor;
}(cc.Component);
exports.default = def_LevelPreload;