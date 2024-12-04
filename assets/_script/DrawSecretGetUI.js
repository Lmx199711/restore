var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawSecretGetUI = undefined;
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_TimeSystem = require("TimeSystem");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var exp_DrawSecretGetUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.DrawCard, r_UIDef.UIDef.Res.UI.DrawSecretGetUI) || this;
    t.lastSound = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.DrawSecretGetUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DrawSecretGetUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickBack, this);
    this.talk = this.contentPane.getChild("talk");
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.contentPane.getController("talk").selectedIndex = 0;
    if (this.anim) {
      this.anim.destroy();
      this.anim = null;
    }
    r_SoundMgr.SoundMgr.playSound("drawCard/成功签约");
    r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + this.data.cfg.id, cc.Prefab, function (e, o) {
      t.anim = cc.instantiate(o);
      t.contentPane.getChild("icon").node.addChild(t.anim);
      var i = r_SecretUpSystem.SecretUpSystem.getSecretCfgById(t.data.cfg.id);
      t.showTalk(t.data.cfg.id, i.talk, "secretUp/秘书" + i.id);
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
  _ctor.prototype.showTalk = function (e, t, o) {
    var i = this;
    undefined === o && (o = null);
    if (o) {
      this.lastSound && r_SoundMgr.SoundMgr.stopSound(this.lastSound);
      this.lastSound = o;
      r_SoundMgr.SoundMgr.playSound(this.lastSound);
    }
    this.talk.text = t;
    this.contentPane.getController("talk").selectedIndex = 1;
    r_TimeSystem.TimeSystem.scheduleOnce("talk", 3, function () {
      i.contentPane.getController("talk").selectedIndex = 0;
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("talk");
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
    this.data.callBack && this.data.callBack();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.DrawSecretGetUI = exp_DrawSecretGetUI;