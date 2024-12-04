var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobFindUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_JobTipUI = require("JobTipUI");
var r_JobFindCom = require("JobFindCom");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var exp_JobFindUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Job, r_UIDef.UIDef.Res.UI.JobFindUI) || this;
    t.uiType = "fullScreen";
    t.selectIndex = 0;
    t.maxNum = 2;
    t.isWatch = false;
    t.isEnter = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.JobFindUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.JobFindUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnTip = this.contentPane.getChild("btnTip").asButton;
    this.btnTip.onClick(this.onClickTip, this);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.isWatch = false;
    this.btnTip.getController("mode").selectedIndex = 0;
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
    if (this.selectIndex) {
      this.selectIndex = this.selectIndex + 1;
      this.selectIndex > this.maxNum && (this.selectIndex = 1);
    } else {
      this.selectIndex = 1;
    }
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/job/jobFind" + this.selectIndex, cc.Prefab, function (e, t) {
      o.prefab = cc.instantiate(t);
      o.prefab.active = true;
      o.contentPane.getChild("center").node.addChild(o.prefab);
      o.findCom = o.prefab.getComponent(r_JobFindCom.default);
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.onClickTip = function () {
    var e = this;
    if (!this.isEnter) {
      this.isEnter = true;
      setTimeout(function () {
        e.isEnter = false;
      }, 500);
      this.findCom.isPause = true;
      if (this.isWatch) {
        r_JobTipUI.JobTipUI.showUI({
          name: "f" + this.selectIndex,
          callBack: function () {
            e.findCom.isPause = false;
          }
        });
      } else {
        console.log("BBBBBBBB@@@@@@@@");
        r_PlatformSystem.PlatformSystem.showVideo("试卷提示", function () {
          e.isWatch = true;
          e.btnTip.getController("mode").selectedIndex = 1;
          r_JobTipUI.JobTipUI.showUI({
            name: "f" + e.selectIndex,
            callBack: function () {
              e.findCom.isPause = false;
            }
          });
        }, function () {
          e.findCom.isPause = false;
        });
      }
    }
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.JobFindUI = exp_JobFindUI;