var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;
var r_EventDispatcher = require("EventDispatcher");
var r_TaskList = require("TaskList");
var r_TableMgr = require("TableMgr");
var r_GameData = require("GameData");
var r_Config = require("Config");
var r_UIWind = require("UIWind");
var r_UIDef = require("UIDef");
var exp_App = function (e) {
  function _ctor() {
    var o = e.call(this) || this;
    _ctor.mInst = o;
    return o;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor, "inst", {
    get: function () {
      this.mInst || new _ctor();
      return this.mInst;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.start = function () {
    this.initUIConfig();
    this.gameCtrl.init();
    this.loadingUI = r_UIWind.UIWind.get(r_UIDef.UIDef.Urls.UI.LoaingUI);
    this.loadingUI.setStartTask(this.loadFirstRes.bind(this));
    this.loadingUI.showUI();
  };
  _ctor.prototype.loadFirstRes = function () {
    var e = this;
    new r_TaskList.TaskList(r_TaskList.ActionsExecutionMode.RunInSequence).addTask(this.gameCtrl.taskList).setProgressUpdate(this.loadingUI.setProgress.bind(this.loadingUI)).setComplete(function () {
      r_TableMgr.TableMgr.loaded();
      r_GameData.GameData.taskFinished();
      e.showScene();
    }).execute();
  };
  _ctor.prototype.showScene = function () {
    this.loadingUI.onFinish();
    this.gameCtrl.showGameScene();
  };
  _ctor.prototype.initUIConfig = function () {
    fgui.UIConfig.bringWindowToFrontOnClick = false;
    fgui.UIConfig.modalLayerColor = r_Config.default.modalLayerColor;
    fgui.UIConfig.tooltipsWin = r_Config.default.tooltipsWin;
    fgui.UIConfig.defaultFont = r_Config.default.defaultFont;
    fgui.UIConfig.buttonSound = r_Config.default.buttonSound ? r_Config.default.buttonSound : fgui.UIConfig.buttonSound;
    fgui.GRoot.create();
    r_Config.default.uiClass && r_Config.default.uiClass.length > 0 && r_Config.default.uiClass.forEach(function (e) {
      r_UIWind.UIWind.add(e);
    });
    r_Config.default.uiExtensions && r_Config.default.uiExtensions.length > 0 && r_Config.default.uiExtensions.forEach(function (e) {
      for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) {
        var o = e[t];
        fgui.UIObjectFactory.setExtension(t, o);
      }
    });
  };
  return _ctor;
}(r_EventDispatcher.EventDispatcher);
exports.App = exp_App;