var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobTipUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var exp_JobTipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Job, r_UIDef.UIDef.Res.UI.JobTipUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.JobTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.JobTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    if (this.data.name[this.data.name.length - 1] > 2) {
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
    }
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/job/tip/" + this.data.name, cc.SpriteFrame, function (e, o) {
      t.contentPane.getChild("icon").texture = o;
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.data.callBack && this.data.callBack();
  };
  _ctor.prototype.onClickHot = function () {
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.JobTipUI = exp_JobTipUI;