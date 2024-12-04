Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = undefined;
var r_Index = require("Index");
var exp_Scene = function () {
  function _ctor() {}
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.addTask = function (e) {
    this.loadTask.addTask(e);
  };
  _ctor.prototype.addRes = function (e, t, o) {
    undefined === t && (t = null);
    undefined === o && (o = false);
  };
  _ctor.prototype.onEnter = function () {};
  _ctor.prototype.onExit = function () {};
  _ctor.prototype.enter = function (e, t, o) {
    this.loadResTask = new r_Index.LoadResGroup();
    this.loadTask = new r_Index.TaskList(r_Index.ActionsExecutionMode.RunInSequence);
    this.loadTask.addTask(this.loadResTask);
    this.onLoad(e);
    this.loadTask.setComplete(t).setProgressUpdate(o).execute();
  };
  Object.defineProperty(_ctor, "curScene", {
    get: function () {
      return this.mCurScene;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.addScene = function (e) {
    this.allScenes.has(e) || this.allScenes.set(e, new e());
  };
  _ctor.gotoScene = function (e, t, o, n) {
    var a = this;
    undefined === o && (o = null);
    undefined === n && (n = null);
    if (null != this.mCurScene && this.mCurScene instanceof e) {
      console.warn("无法重复进入相同场景");
    } else {
      var s = this.allScenes.get(e);
      s || console.error("要进入的场景不存在", e);
      r_Index.ResMgr.pushRes();
      s.enter(t, function () {
        a.curScene && a.curScene.onExit();
        a.mCurScene = s;
        s.onEnter(t);
        r_Index.ResMgr.popRes();
        o && o();
      }, n);
    }
  };
  _ctor.allScenes = new Map();
  return _ctor;
}();
exports.Scene = exp_Scene;