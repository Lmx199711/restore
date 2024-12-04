var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamingUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var exp_GamingUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Game, r_UIDef.UIDef.Res.UI.GamingUI) || this;
    t.isWatchTipVideo = false;
    t.isPlayTimeAnim = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GamingUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GamingUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onClickBack = function () {
    r_PlatformSystem.PlatformSystem.stopRecorder();
    r_PlatformSystem.PlatformSystem.report("level_exit", {
      id: "1"
    });
    this.hide();
  };
  _ctor.prototype.onClickHome = function () {};
  _ctor.prototype.onClickTip = function () {};
  _ctor.prototype.onShown = function () {
    _ctor.Inst = this;
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.GamingUI = exp_GamingUI;