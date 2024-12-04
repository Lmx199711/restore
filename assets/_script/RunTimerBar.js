var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BehaviorDef = require("BehaviorDef");
var r_BehaviorMgr = require("BehaviorMgr");
var r_RunTimerBase = require("RunTimerBase");
var r_PlatformSystem = require("PlatformSystem");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _menu = _decorator.menu;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_RunTimerBar = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.progressBar = null;
    t.overActionID = "";
    t.show = true;
    t.curProcess = 1;
    t.width = 0;
    t.addTimePfix = -1;
    t.speed = 1;
    t.dtRange = 1;
    t._timer = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    e.prototype.onLoad.call(this);
    this.barIcon = this.progressBar.node.getChildByName("bar");
    this.width = this.barIcon.width;
    this.moveIcon = this.barIcon.children[0];
    this.progressBar && this.barIcon && this.moveIcon || cc.warn(":::::::ProgressBarIcon组件不全");
  };
  _ctor.prototype.preInit = function (e) {
    !e[0] || !e[1] || isNaN(Number(e[0])) || isNaN(Number(e[0])) || this.init(Number(e[0]), Number(e[1]));
  };
  _ctor.prototype.init = function (t, o) {
    e.prototype.init.call(this, t, o);
    this.setSpeed(1);
  };
  _ctor.prototype.setSpeed = function (e) {
    if (0 == e) {
      this.loopKey = false;
    } else {
      this.speed = e;
      this.dtRange = 1 / Math.abs(this.speed);
      this.addTimePfix = this.speed > 0 ? 1 : -1;
    }
  };
  _ctor.prototype.begin = function () {
    this.changeProcessBar();
    this.loopKey = true;
  };
  _ctor.prototype.update = function (e) {
    if (e > 1) {
      console.log("出现超长帧,屏蔽掉");
    } else {
      this.isPause || this.loopKey && this.updateTime(e);
    }
  };
  _ctor.prototype.updateTime = function (e) {
    var t = this;
    this._timer += e;
    if (this._timer >= this.dtRange) {
      this._timer -= this.dtRange;
      this.addTime(this.addTimePfix);
      if (this.curSecond <= 0) {
        this.curSecond = 0;
        this.loopKey = false;
        if (this.show) {
          this.showAddTime({
            close: function () {
              t.overActionID && r_BehaviorMgr.BehaviorMgr.trigger(t.overActionID);
            },
            confirm: function () {
              var e = t.adAddTime;
              t.addTime(e);
              e > 0 && (t.loopKey = true);
            }
          });
        } else {
          this.overActionID && r_BehaviorMgr.BehaviorMgr.trigger(this.overActionID);
        }
      }
    }
  };
  _ctor.prototype.addTime = function (e) {
    if (0 != e) {
      this.curSecond += e;
      if (this.curSecond < 0) {
        this.curSecond = 0;
      } else {
        this.curSecond > this.maxSecond && (this.maxSecond = this.curSecond);
      }
      this.changeProcessBar();
    }
  };
  _ctor.prototype.changeProcessBar = function () {
    var e = this.curSecond / this.maxSecond;
    if (e < 0) {
      e = 0;
    } else {
      e > 1 && (e = 1);
    }
    this.curProcess = e;
    this.progressBar.progress = this.curProcess;
    this.moveIcon.x = this.curProcess * this.width;
  };
  _ctor.prototype.AcFun = function (e, t, o) {
    if (o) {
      if (o instanceof Array) {
        this.preInit(o);
      } else if (o[r_BehaviorDef.ARGS.childSelf]) {
        this.setSpeed(Number(o[r_BehaviorDef.ARGS.childSelf]) || this.speed);
      } else if (o[r_BehaviorDef.ARGS.childAdd]) {
        this.setSpeed(this.speed + (o[r_BehaviorDef.ARGS.childAdd] || 0));
      } else if (o[r_BehaviorDef.ARGS.now]) {
        this.setSpeed(Number(o[r_BehaviorDef.ARGS.now]) || this.speed);
        this.begin();
      } else {
        this.addTime(Number(o) || 0);
      }
    }
  };
  _ctor.prototype.timeEnd = function () {
    var e = this;
    this.showAddTime({
      confirm: function () {
        e.addTime(e.adAddTime);
        e.loopKey = true;
      }
    });
  };
  _ctor.prototype.videoAddTime = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("click");
    this.loopKey = false;
    r_PlatformSystem.PlatformSystem.showVideo("加时", function () {
      e.addTime(e.adAddTime);
      e.loopKey = true;
    }, function () {
      e.curSecond > 0 && (e.loopKey = true);
    });
  };
  __decorate([_property({
    displayName: "progressBar组件",
    type: cc.ProgressBar
  })], _ctor.prototype, "progressBar", undefined);
  __decorate([_property({
    displayName: "时间结束时执行"
  })], _ctor.prototype, "overActionID", undefined);
  __decorate([_property({
    displayName: "时间结束时是否弹窗"
  })], _ctor.prototype, "show", undefined);
  return __decorate([_ccclass, _menu("新系统/02快捷脚本/大量行为/计时器/进度条样式")], _ctor);
}(r_RunTimerBase.default);
exports.default = def_RunTimerBar;