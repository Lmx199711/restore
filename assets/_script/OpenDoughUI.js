var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenDoughUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_CutDoughUI = require("CutDoughUI");
var r_PlatformSystem = require("PlatformSystem");
var exp_OpenDoughUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Noodles, r_UIDef.UIDef.Res.UI.OpenDoughUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.OpenDoughUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.OpenDoughUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnAgain").onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("神奇刀削面选面团", function () {
        t.hide();
      });
    }, this);
    this.contentPane.getChild("btnOK").onClick(function () {
      t.hide();
      r_CutDoughUI.CutDoughUI.showUI({
        type: t.data.type
      });
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    var t = this.contentPane.getChild("item").asCom;
    t.getController("c1").selectedIndex = 1;
    t.getController("c2").selectedIndex = this.data.type;
    this.contentPane.getChild("name").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Noodles + "/name" + this.data.type;
    this.contentPane.getController("c1").selectedIndex = 3 == this.data.type ? 1 : 0;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.OpenDoughUI = exp_OpenDoughUI;