var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = exports.Status = undefined;
(function (e) {
  e[e.None = 0] = "None";
  e[e.Running = 1] = "Running";
  e[e.Success = 2] = "Success";
  e[e.Failure = 3] = "Failure";
})(i = exports.Status || (exports.Status = {}));
var exp_Task = function () {
  function _ctor() {
    this.mStatus = i.None;
    this.mErr = "";
    this.mProgress = 0;
  }
  Object.defineProperty(_ctor.prototype, "progress", {
    get: function () {
      return this.mProgress;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "elapsedTime", {
    get: function () {
      return this.mElapsedTimeTime;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "status", {
    get: function () {
      return this.mStatus;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "taskName", {
    get: function () {
      return "";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "errInfo", {
    get: function () {
      return this.mErr;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "isRunning", {
    get: function () {
      return this.status == i.Running;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.setComplete = function (e, t) {
    undefined === t && (t = null);
    this.onFinish = e;
    this._finishTarget = t;
    return this;
  };
  _ctor.prototype.setProgressUpdate = function (e, t) {
    undefined === t && (t = null);
    this.progressUpdate = e;
    this._progressUpdateTarget = t;
    return this;
  };
  _ctor.prototype.execute = function (e) {
    undefined === e && (e = null);
    this.mOwnerSystem = e;
    this.mProgress = 0;
    this.mElapsedTimeTime = 0;
    if (!this.isRunning) {
      cc.director.getScheduler().enableForTarget(this);
      cc.director.getScheduler().schedule(this.update, this, 0);
    }
  };
  _ctor.prototype.tick = function (e) {
    if (this.status == i.Running) {
      this.onUpdate();
      this.latch = false;
      return this.mStatus;
    } else if (this.latch) {
      this.latch = false;
      return this.mStatus;
    } else {
      this.mElapsedTimeTime += e;
      this.mStatus = i.Running;
      this.onExecute();
      i.Running == this.mStatus && this.onUpdate();
      return this.mStatus;
    }
  };
  _ctor.prototype.callFinished = function (e) {
    if (null != this.onFinish) {
      if (null != this._finishTarget) {
        this.onFinish.call(this._finishTarget, e);
      } else {
        this.onFinish(e);
      }
    }
  };
  _ctor.prototype.callProgressUpdate = function (e) {
    if (null != this.progressUpdate) {
      if (null != this._progressUpdateTarget) {
        this.progressUpdate.call(this._progressUpdateTarget, e);
      } else {
        this.progressUpdate(e);
      }
    }
  };
  _ctor.prototype.update = function (e) {
    if (this.tick(e) != i.Running) {
      this.callProgressUpdate(1);
      this.callFinished(this.status == i.Success);
      cc.director.getScheduler().enableForTarget(this);
      cc.director.getScheduler().isScheduled(this.update, this) && cc.director.getScheduler().unschedule(this.update, this);
    } else {
      this.progressUpdate && this.callProgressUpdate(this.progress);
    }
  };
  _ctor.prototype.endAction = function (e) {
    undefined === e && (e = true);
    if (this.status == i.Running) {
      this.latch = true;
      this.mStatus = e ? i.Success : i.Failure;
      this.mProgress = this.mStatus == i.Success ? 1 : 0;
      this.onStop();
    } else {
      this.onForcedStop();
    }
  };
  _ctor.prototype.reset = function () {
    this.mElapsedTimeTime = 0;
    this.latch = false;
    this.mStatus = i.None;
    cc.director.getScheduler().enableForTarget(this);
    cc.director.getScheduler().isScheduled(this.update, this) && cc.director.getScheduler().unschedule(this.update, this);
    this.onReset();
    this.onForcedStop();
  };
  _ctor.prototype.onExecute = function () {};
  _ctor.prototype.onUpdate = function () {};
  _ctor.prototype.onStop = function () {};
  _ctor.prototype.onReset = function () {};
  _ctor.prototype.onForcedStop = function () {};
  return _ctor;
}();
exports.Task = exp_Task;