var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainCtrl = undefined;
var a;
var r_PreloadSystem = require("PreloadSystem");
var r_ResSystem = require("ResSystem");
var r_TYIndex = require("TYIndex");
var r_GamingUI = require("GamingUI");
var r_MainUI = require("MainUI");
(function (e) {
  e[e.None = 0] = "None";
  e[e.Playing = 1] = "Playing";
  e[e.Pause = 2] = "Pause";
  e[e.Stop = 3] = "Stop";
})(a || (a = {}));
var exp_MainCtrl = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    for (var t = 0; t < r_PreloadSystem.PreloadSystem.loadingFguiList.length; t++) {
      this.addTask(new r_TYIndex.LoadFGUIPackTask(r_PreloadSystem.PreloadSystem.loadingFguiList[t]));
    }
  };
  _ctor.prototype.loadFont = function () {
    r_ResSystem.ResSystem.loadBundleRes("resources1", "font/FZCuYSJ", cc.Font, function (e, t) {
      fgui.registerFont("FZCuYSJ", t);
    });
  };
  _ctor.startGame = function () {
    if (this.gameState == a.None) {
      this.gameState = a.Playing;
      r_GamingUI.GamingUI.showUI(null, function () {
        r_MainUI.MainUI.hide();
      });
    }
  };
  _ctor.stopGame = function () {
    this.gameState != a.Stop && this.gameState != a.None && (this.gameState = a.Stop);
  };
  _ctor.pauseGame = function () {
    this.gameState == a.Playing && (this.gameState = a.Pause);
  };
  _ctor.resumeGame = function () {
    this.gameState == a.Pause && (this.gameState = a.Playing);
  };
  _ctor.exitGame = function () {
    if (this.gameState != a.None) {
      this.gameState = a.None;
      r_MainUI.MainUI.showUI(null, function () {
        r_GamingUI.GamingUI.hide();
      });
    }
  };
  _ctor.gameState = a.None;
  return _ctor;
}(r_TYIndex.IGameCtrl);
exports.MainCtrl = exp_MainCtrl;