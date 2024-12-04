Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlayBtnSystem = undefined;
var r_FlyGodUI = require("FlyGodUI");
var r_GameGuideSystem = require("GameGuideSystem");
var r_TimeSystem = require("TimeSystem");
var s = function () {
  function e() {
    this.awaitTime = 50;
  }
  e.prototype.bindBtn = function (e) {
    var t = this;
    this.mainHome = e;
    this.btnAward = e.btnAward;
    this.btnAward.onClick(function () {
      t.mainHome.contentPane.getTransition("flyBtn").setPaused(true);
      r_FlyGodUI.default.showUI();
    });
    this.btnAward.getChild("n68").animationName = "animation";
    this.btnAward.getChild("n68").loop = true;
    this.btnAward.getChild("n68").playing = true;
    this.restart();
  };
  e.prototype.restart = function () {
    this.awaitTime = 30;
    this.play();
  };
  e.prototype.play = function () {
    var e = this;
    r_TimeSystem.TimeSystem.scheduleOnce("FlyBtn", this.awaitTime, function () {
      e.btnAward.visible = true;
      r_GameGuideSystem.GameGuideSystem.isShowingGuide && (e.btnAward.visible = false);
      e.mainHome.contentPane.getTransition("flyBtn").play(function () {
        e.btnAward.visible = false;
        e.restart();
      });
    });
  };
  e.prototype.changeMainHome = function () {
    this.awaitTime = 15;
    this.play();
  };
  e.prototype.changeOhtor = function () {
    r_TimeSystem.TimeSystem.scheduleClear("FlayBtn");
    this.btnAward.visible = false;
    this.mainHome.contentPane.getTransition("flyBtn").stop();
  };
  e.prototype.btnStop = function () {
    this.mainHome.contentPane.getTransition("flyBtn").stop();
    this.btnAward.visible = false;
    this.restart();
  };
  e.prototype.btnGoon = function () {
    this.btnAward.visible = true;
    this.mainHome.contentPane.getTransition("flyBtn").setPaused(false);
  };
  return e;
}();
exports.FlayBtnSystem = new s();