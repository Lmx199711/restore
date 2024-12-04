var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_BartenderUI = require("BartenderUI");
var r_PlatformSystem = require("PlatformSystem");
var r_BartenderJCUI = require("BartenderJCUI");
var def_BartenderTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Bartender, r_UIDef.UIDef.Res.UI.BartenderTipUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BartenderTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BartenderTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose = this.contentPane.getChild("btnClose");
    this.btnClose.onClick(this.onClikClose, this);
    this.btnVideo = this.contentPane.getChild("btnVideo");
    this.btnVideo.onClick(this.onClickVideo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClikClose = function () {
    r_BartenderUI.default.instace && r_BartenderUI.default.instace.hide();
    this.hide();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("把金晨送回家", function () {
      r_BartenderUI.default.instace && r_BartenderUI.default.instace.hide();
      e.hide();
      r_BartenderJCUI.default.showUI();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_BartenderTipUI;