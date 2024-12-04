var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_JobFindUI = require("JobFindUI");
var r_JobAnswerUI = require("JobAnswerUI");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_SDKMgr1 = require("SDKMgr1");
var exp_JobUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Job, r_UIDef.UIDef.Res.UI.JobUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.JobUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.JobUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    var o = this.contentPane.getChild("btnPaper").asButton;
    o.onClick(this.onClickPaper, this);
    o.getChild("labAward").text = "+" + r_UtilsSystem.UtilsSystem.numFormats(_ctor.paperCoin);
    var i = this.contentPane.getChild("btnTest").asButton;
    i.onClick(this.onClickTest, this);
    i.getChild("labAward").text = "+" + r_UtilsSystem.UtilsSystem.numFormats(_ctor.testCoin);
    this.contentPane.getChild("btnTxt").asButton.onClick(this.onClickTxt, this);
    this.contentPane.getChild("btnTxt").asButton.getChild("labAward").text = "+" + r_UtilsSystem.UtilsSystem.numFormats(_ctor.testCoin);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.playShowAnim(this.contentPane.getChild("btnPaper").node);
    this.playShowAnim(this.contentPane.getChild("btnTest").node);
    r_SDKMgr1.SDKMgr1.showBanner();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SDKMgr1.SDKMgr1.hideBanner();
  };
  _ctor.prototype.playShowAnim = function (e) {
    e.scale = 1.5;
    e.opacity = 0;
    cc.tween(e).to(.2, {
      scale: 1,
      opacity: 255
    }, {
      easing: null
    }).call(function () {}).start();
  };
  _ctor.prototype.onClickFind = function () {
    r_UtilsSystem.UtilsSystem.showTip("暂未开启");
  };
  _ctor.prototype.onClickPaper = function () {
    r_JobFindUI.JobFindUI.showUI();
    r_PlatformSystem.PlatformSystem.report("Play_click_Level2", {
      stage: "审批试卷"
    });
  };
  _ctor.prototype.onClickTest = function () {
    r_JobAnswerUI.JobAnswerUI.showUI();
    r_PlatformSystem.PlatformSystem.report("Play_click_Level2", {
      stage: "智商测试"
    });
  };
  _ctor.prototype.onClickTxt = function () {
    r_JobAnswerUI.JobAnswerUI.showUI("3");
    r_PlatformSystem.PlatformSystem.report("Play_click_Level2", {
      stage: "甲骨文写诗"
    });
  };
  _ctor.paperCoin = 5e4;
  _ctor.testCoin = 1e5;
  return _ctor;
}(r_TYIndex.UIWind);
exports.JobUI = exp_JobUI;