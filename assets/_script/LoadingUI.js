var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_GameSelfSystem = require("GameSelfSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_TimeSystem = require("TimeSystem");
var r_GameSystem = require("GameSystem");
var r_MainHomeUI = require("MainHomeUI");
var r_Config = require("Config");
var r_VerifyUI = require("VerifyUI");
var r_MainAuditUI = require("MainAuditUI");
var exp_LoadingUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Loading, r_UIDef.UIDef.Res.UI.LoadingUI) || this;
    t.startTime = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.show = function () {
    e.show.call(this, r_UIDef.UIDef.Urls.UI.LoaingUI);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LoaingUI);
  };
  _ctor.prototype.showUI = function () {
    this.show();
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    r_GameSystem.GameSystem.init();
    r_GameSelfSystem.GameSelfSystem.initFrist();
    this.ProgressBar = this.contentPane.getChild("ProgressBar").asProgress;
    this.ProgressBar.value = 0;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_PlatformSystem.PlatformSystem.report("Loading", {});
    this.startTime = r_TimeSystem.TimeSystem.getServerTime();
    this.startTask();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.setStartTask = function (e) {
    this.startTask = e;
  };
  _ctor.prototype.setProgress = function (e) {
    this.ProgressBar.tweenValue(100 * Math.floor(e), .7);
  };
  _ctor.prototype.onFinish = function () {
    var e = this;
    r_GameSelfSystem.GameSelfSystem.init();
    var t = function () {
      var t = cc.sys.localStorage.getItem("loadingStage");
      t || (t = 0);
      t += 1;
      var o = r_TimeSystem.TimeSystem.getServerTime() - e.startTime;
      r_PlatformSystem.PlatformSystem.report("Loading_end", {
        stage: "" + t,
        time: "" + o
      });
      cc.find("Canvas").getChildByName("qianyan") && (cc.find("Canvas").getChildByName("qianyan").active = false);
      e.hide();
    };
    var o = function () {
      r_TimeSystem.TimeSystem.scheduleOnce("等待loading进度条跑完", 2, function () {
        if ("0" == r_PlatformSystem.PlatformSystem.shenhe) {
          r_MainAuditUI.default.showUI(null, t);
        } else {
          e.showMain();
        }
      });
    };
    r_Config.default.needVerify = false; // cccc
    if (r_Config.default.needVerify && r_TYIndex.Platform.isDarenPlatform()) {
      r_VerifyUI.VerifyUI.showUI(function () {
        o();
      });
    } else {
      o();
    }
  };
  _ctor.prototype.showMain = function () {
    var e = this;
    r_MainHomeUI.default.showUI(null, function () {
      var t = cc.sys.localStorage.getItem("loadingStage");
      t || (t = 0);
      t += 1;
      var o = r_TimeSystem.TimeSystem.getServerTime() - e.startTime;
      r_PlatformSystem.PlatformSystem.report("Loading_end", {
        stage: "" + t,
        time: "" + o
      });
      cc.find("Canvas").getChildByName("qianyan") && (cc.find("Canvas").getChildByName("qianyan").active = false);
      e.hide();
      cc.find("Canvas").getChildByName("qianyan") && cc.find("Canvas").getChildByName("qianyan").destroy();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.LoadingUI = exp_LoadingUI;