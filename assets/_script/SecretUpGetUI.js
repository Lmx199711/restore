var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_TimeSystem = require("TimeSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_SecretCodexUI = require("SecretCodexUI");
var def_SecretUpGetUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.SecretUp, r_UIDef.UIDef.Res.UI.SecretUpGetUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.SecretUpGetUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretUpGetUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    this.contentPane.getController("talk").selectedIndex = 0;
    _ctor.instance = this;
    if (this.anim) {
      this.anim.destroy();
      this.anim = null;
    }
    r_SoundMgr.SoundMgr.playSound("drawCard/成功签约");
    this.contentPane.visible = false;
    var i = this.data.roleGirlId;
    r_SecretCodexUI.default.instance && r_SecretCodexUI.default.instance.restart();
    r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + i, cc.Prefab, function (e, t) {
      o.anim = cc.instantiate(t);
      o.contentPane.getChild("icon").node.addChild(o.anim);
      var n = o.anim.getComponent(sp.Skeleton);
      o.effect.visible = false;
      n.setCompleteListener(function () {
        n.setAnimation(0, "idel1", true);
        n.setCompleteListener(null);
        o.effect.visible = true;
      });
      n.setAnimation(0, "idel4", false);
      var a = r_SecretUpSystem.SecretUpSystem.getSecretCfgById(i);
      o.showTalk(i, a.talk, "secretUp/秘书" + i);
      o.contentPane.visible = true;
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instance = null;
    r_TimeSystem.TimeSystem.scheduleClear("talk");
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
    this.data.callBack && this.data.callBack();
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
  __decorate([r_DecorateFunction1.AutoFind("effect")], _ctor.prototype, "effect", undefined);
  __decorate([r_DecorateFunction1.AutoFind("talk")], _ctor.prototype, "talk", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_SecretUpGetUI;