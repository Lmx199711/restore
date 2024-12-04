var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobAnswerUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_JobTestCom = require("JobTestCom");
var r_PlatformSystem = require("PlatformSystem");
var r_JobTipUI = require("JobTipUI");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_ResSystem = require("ResSystem");
var exp_JobAnswerUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Job, r_UIDef.UIDef.Res.UI.JobAnswerUI) || this;
    t.uiType = "fullScreen";
    t.selectIndex = 0;
    t.maxNum = 2;
    t.isWatch = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.JobAnswerUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.JobAnswerUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnTip = this.contentPane.getChild("btnTip").asButton;
    this.btnTip.onClick(this.onClickTip, this);
    this.contentPane.getChild("btnUp").asButton.onClick(this.onClickUp, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
    this.isWatch = false;
    this.btnTip.getController("mode").selectedIndex = 0;
    if (this.selectIndex) {
      this.selectIndex = this.selectIndex + 1;
      this.selectIndex > this.maxNum && (this.selectIndex = 1);
    } else {
      this.selectIndex = 1;
    }
    this.contentPane.getChild("btnUp").visible = true;
    if (this.data) {
      this.selectIndex = this.data;
      this.contentPane.getChild("btnUp").visible = false;
    }
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/job/jobTest" + this.selectIndex, cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.testCom = t.prefab.getComponent(r_JobTestCom.default);
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    this.testCom && (this.testCom.isPause = true);
    if (this.isWatch) {
      r_JobTipUI.JobTipUI.showUI({
        name: "t" + this.selectIndex,
        callBack: function () {
          e.testCom && (e.testCom.isPause = false);
        }
      });
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("试卷提示", function () {
        e.isWatch = true;
        e.btnTip.getController("mode").selectedIndex = 1;
        r_JobTipUI.JobTipUI.showUI({
          name: "t" + e.selectIndex,
          callBack: function () {
            e.testCom && (e.testCom.isPause = false);
          }
        });
      }, function () {
        e.testCom && (e.testCom.isPause = false);
      });
    }
  };
  _ctor.prototype.onClickUp = function () {
    this.testCom && this.testCom.onClickUp();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.JobAnswerUI = exp_JobAnswerUI;