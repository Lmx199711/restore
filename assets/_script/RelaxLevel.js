var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelaxLevel = undefined;
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_LevelPreload = require("LevelPreload");
var r_Index = require("Index");
var r_SoundMgr = require("SoundMgr");
var r_RelaxSystem = require("RelaxSystem");
var r_PlatformSystem = require("PlatformSystem");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var exp_RelaxLevel = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.time = 60;
    t.timeLabel = null;
    t.levelNode = null;
    t.title = "看广告的关卡";
    t.lookADTime = 60;
    t.bgm = "lv0060/60bgm";
    t.loopKey = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.start = function () {
    this.levelNode || (this.levelNode = this.node);
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.loadLevelSuccess(this.levelNode);
    r_Index.App.inst.on("ZZXSUCCESS", this.passLevel, this);
    r_Index.App.inst.on("ZZXFAIL", this.failLevel, this);
    this.timeLabel.string = this.time + "s";
    this.loopKey = true;
    this.node.getChildByName("title").getComponent(cc.Label).string = this.title;
    r_SoundMgr.SoundMgr.playSound(this.bgm, true);
    r_SoundMgr.SoundMgr.stopMusic();
  };
  _ctor.prototype.update = function (e) {
    if (this.loopKey && !this.isPause) {
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.update(e);
      if (this.time > 0) {
        this.time -= e;
        this.timeLabel.string = (0 | this.time) + "s";
        this.time <= 0 && this.failLevel();
      }
    }
  };
  _ctor.prototype.addTime = function () {
    var e = this;
    this.loopKey = false;
    r_PlatformSystem.PlatformSystem.showVideo("找不同加时", function () {
      e.loopKey = true;
      e.time += e.lookADTime;
      e.timeLabel.string = (0 | e.time) + "s";
    }, function () {
      e.loopKey = true;
    });
  };
  _ctor.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
    r_Index.App.inst.off("ZZXSUCCESS", this.passLevel, this);
    r_Index.App.inst.off("ZZXFAIL", this.failLevel, this);
  };
  _ctor.prototype.failLevel = function () {
    this.loopKey = false;
    r_RelaxSystem.RelaxSystem.lose();
    r_SoundMgr.SoundMgr.stopSound(this.bgm);
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  _ctor.prototype.loadPreload = function () {
    return Promise.resolve(undefined);
  };
  _ctor.prototype.passLevel = function () {
    this.loopKey = false;
    r_RelaxSystem.RelaxSystem.win();
    r_SoundMgr.SoundMgr.stopSound(this.bgm);
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  __decorate([_property({
    displayName: "初始时间"
  })], _ctor.prototype, "time", undefined);
  __decorate([_property({
    type: cc.Label,
    displayName: "显示剩余时间"
  })], _ctor.prototype, "timeLabel", undefined);
  __decorate([_property({
    type: cc.Node
  })], _ctor.prototype, "levelNode", undefined);
  __decorate([_property({
    displayName: "关卡标题"
  })], _ctor.prototype, "title", undefined);
  __decorate([_property({
    displayName: "看广告增加的时间"
  })], _ctor.prototype, "lookADTime", undefined);
  __decorate([_property({
    displayName: "bgm"
  })], _ctor.prototype, "bgm", undefined);
  return __decorate([_ccclass()], _ctor);
}(r_LevelPreload.default);
exports.RelaxLevel = exp_RelaxLevel;