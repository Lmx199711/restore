var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_JobFindUI = require("JobFindUI");
var r_JobAnswerUI = require("JobAnswerUI");
var exp_JobResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Job, r_UIDef.UIDef.Res.UI.JobResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.JobResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.JobResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("mode").selectedIndex = this.data.mode;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.data.callBack && this.data.callBack();
    r_JobFindUI.JobFindUI.Inst && r_JobFindUI.JobFindUI.Inst.hide();
    r_JobAnswerUI.JobAnswerUI.hide();
  };
  _ctor.prototype.onClickHot = function () {
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.JobResultUI = exp_JobResultUI;