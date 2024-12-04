var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCClickShowUI = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_ScrapCarCfg = require("ScrapCarCfg");
var r_TYIndex = require("TYIndex");
var exp_SCClickShowUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.ScrapingCar, r_UIDef.UIDef.Res.UI.SCClickShowUI) || this;
    t.btnOk = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SCClickShowUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SCClickShowUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnOk = this.contentPane.getChild("btnOk");
    this.btnOk.onClick(this.hide, this);
    this.imageLoader = this.contentPane.getChild("image");
  };
  _ctor.prototype.loadImage = function () {
    var e = this;
    if (-1 != r_PlayerData.PlayerData.data.getCarId) {
      var t = r_ScrapCarCfg.ScrapCarCfg[r_PlayerData.PlayerData.data.getCarId].iconUrl;
      "" != t && r_ResSystem.ResSystem.loadBundleRes("game2", t, cc.SpriteFrame, function (t, o) {
        e.imageLoader.texture = o;
      });
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.loadImage();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SCClickShowUI = exp_SCClickShowUI;