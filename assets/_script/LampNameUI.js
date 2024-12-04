var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LampNameUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_LampUI = require("LampUI");
var exp_LampNameUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.LampNameUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LampNameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LampNameUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    this.btnStart = this.contentPane.getChild("btnStart");
    this.btnStart.onClick(this.onClickStart, this);
    this.btnRename = this.contentPane.getChild("btnRename");
    this.btnRename.onClick(this.onClickRename, this);
    this.btnName0 = this.contentPane.getChild("btnName0");
    this.btnName0.onClick(this.onClickRename2.bind(this, 0), this);
    this.btnName1 = this.contentPane.getChild("btnName1");
    this.btnName1.onClick(this.onClickRename2.bind(this, 1), this);
    this.btnName2 = this.contentPane.getChild("btnName2");
    this.btnName2.onClick(this.onClickRename2.bind(this, 2), this);
    this.btnName3 = this.contentPane.getChild("btnName3");
    this.btnName3.onClick(this.onClickRename2.bind(this, 3), this);
    this.btnName4 = this.contentPane.getChild("btnName4");
    this.btnName4.onClick(this.onClickRename2.bind(this, 4), this);
    this.labE = this.contentPane.getChild("labE");
    this.contentPane.getController("c1").selectedIndex = r_TYIndex.Platform.isDarenPlatform() ? 0 : 1;
  };
  _ctor.prototype.onClickStart = function () {
    r_LampUI.LampUI.showUI(this.labE.text);
  };
  _ctor.prototype.onClickRename = function () {
    this.labE.requestFocus();
  };
  _ctor.prototype.onClickRename2 = function (e) {
    this.labE.text = this["btnName" + e].title;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.labE.text = "";
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.LampNameUI = exp_LampNameUI;