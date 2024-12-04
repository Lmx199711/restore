var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecretGetUI = undefined;
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_TYIndex = require("TYIndex");
var exp_SecretGetUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Secret, r_UIDef.UIDef.Res.UI.SecretGetUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SecretGetUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretGetUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickBack, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    if (this.anim) {
      this.anim.destroy();
      this.anim = null;
    }
    r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + this.data.cfg.id, cc.Prefab, function (e, o) {
      t.anim = cc.instantiate(o);
      t.contentPane.getChild("icon").node.addChild(t.anim);
    });
    var o = this.contentPane.getChild("effect").node;
    o.opacity = 0;
    o.scale = 0;
    cc.Tween.stopAllByTarget(o);
    cc.tween(o).to(.3, {
      opacity: 255,
      scale: 1
    }).call(function () {
      cc.tween(o).repeatForever(cc.tween().by(.5, {
        angle: -100
      })).start();
    }).start();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
    this.data.callBack && this.data.callBack();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SecretGetUI = exp_SecretGetUI;