var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BanquetEnterUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_EatBanquetUI = require("EatBanquetUI");
var exp_BanquetEnterUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Banquet, r_UIDef.UIDef.Res.UI.BanquetEnterUI) || this;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BanquetEnterUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BanquetEnterUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose = this.contentPane.getChild("btnClose").asButton;
    this.btnClose.onClick(this.hide, this);
    this.btnCancel = this.contentPane.getChild("btnCancel").asButton;
    this.btnCancel.onClick(this.hide, this);
    this.btnVideo = this.contentPane.getChild("btnVideo").asButton;
    this.btnVideo.onClick(this.onClickVideo, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onShown = function () {};
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("吃席走后门", function () {
      e.hide();
      r_EatBanquetUI.EatBanquetUI.showUI("high");
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BanquetEnterUI = exp_BanquetEnterUI;