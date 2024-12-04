Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IGameCtrl = undefined;
var i;
var r_TaskList = require("TaskList");
var r_LoadResGroup = require("LoadResGroup");
var r_TableMgr = require("TableMgr");
var r_GameData = require("GameData");
var r_LoadFGUIPackTask = require("LoadFGUIPackTask");
var r_UIDef = require("UIDef");
(function (e) {
  e[e.None = 0] = "None";
  e[e.Loading = 1] = "Loading";
  e[e.Finish = 2] = "Finish";
  e[e.NeedShow = 3] = "NeedShow";
})(i || (i = {}));
var exp_IGameCtrl = function () {
  function _ctor() {
    this.preloadType = i.None;
    this.defaultBundle = "resources";
  }
  Object.defineProperty(_ctor.prototype, "taskList", {
    get: function () {
      return this.mTaskList;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.addNeedLoadRes = function (e, t, o) {
    undefined === t && (t = null);
    undefined === o && (o = null);
    this.mLoadResGroup.addRes(e, t, o);
    return this;
  };
  _ctor.prototype.addTask = function (e) {
    this.mTaskList.addTask(e);
    return this;
  };
  _ctor.prototype.showGameScene = function () {
    if (this.preloadType != i.Loading) {
      this.onShowScene();
    } else {
      this.preloadType = i.NeedShow;
    }
  };
  _ctor.prototype.preloadScene = function () {
    this.mTaskList.clear();
    this.mLoadResGroup.reset();
    this.mTaskList.addTask(this.mLoadResGroup);
    this.onPreloadScene();
    this.preloadType = i.Loading;
    this.mTaskList.setComplete(this.preloadFinished.bind(this)).execute();
  };
  _ctor.prototype.preloadFinished = function () {
    var e = this.preloadType == i.NeedShow;
    this.preloadType = i.Finish;
    e && this.showGameScene();
    this.onPreloadFinished();
  };
  _ctor.prototype.gameOver = function (e) {
    this.onGameOver(e);
    if (e) {
      this.preloadScene();
    } else {
      this.onRePlay();
    }
  };
  _ctor.prototype.init = function () {
    this.mTaskList = new r_TaskList.TaskList(r_TaskList.ActionsExecutionMode.RunInParallel);
    this.mLoadResGroup = new r_LoadResGroup.LoadResGroup();
    this.taskList.addTask(this.mLoadResGroup);
    this.onInit();
  };
  _ctor.prototype.onShowScene = function () {};
  _ctor.prototype.onRePlay = function () {};
  _ctor.prototype.onPreloadScene = function () {};
  _ctor.prototype.onGameOver = function () {};
  _ctor.prototype.onInit = function () {
    var e = this;
    r_TableMgr.TableMgr.init(function (t) {
      e.addNeedLoadRes(t, e.defaultBundle, cc.JsonAsset);
    });
    r_GameData.GameData.init(function (t) {
      e.addTask(t);
    });
    this.addTask(new r_LoadFGUIPackTask.LoadFGUIPackTask(r_UIDef.UIDef.Pack.Main));
  };
  _ctor.prototype.onPreloadFinished = function () {};
  return _ctor;
}();
exports.IGameCtrl = exp_IGameCtrl;