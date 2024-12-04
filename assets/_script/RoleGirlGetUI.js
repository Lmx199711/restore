var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_RoleGirlSystem = require("RoleGirlSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var def_RoleGirlGetUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.RoleGirl, r_UIDef.UIDef.Res.UI.RoleGirlGetUI) || this;
    t.levelMap = {
      0: "N",
      1: "R",
      2: "SR",
      3: "SSR",
      4: "UR"
    };
    t.animMap = {
      0: "n",
      1: "r",
      2: "sr",
      3: "ssr",
      4: "ur"
    };
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RoleGirlGetUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RoleGirlGetUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    _ref__ctor.instance = this;
    if (this.anim) {
      this.anim.destroy();
      this.anim = null;
    }
    r_SoundMgr.SoundMgr.playSound("drawCard/成功签约");
    this.contentPane.visible = false;
    var i = this.data.roleGirlId;
    var n = r_RoleGirlSystem.RoleGirlSystem.getRoleCfg(i);
    this.showTalk(i, n.talk, "secretUp/秘书" + i);
    r_ResSystem.ResSystem.loadBundleRes("game1", "secret/anim/nv_" + i, cc.Prefab, function (e, o) {
      t.anim = cc.instantiate(o);
      t.anim.scale = 2;
      t.contentPane.getChild("icon").node.addChild(t.anim);
      var i = t.anim.getComponent(sp.Skeleton);
      i.setCompleteListener(function () {
        i.setAnimation(0, "idel1", true);
        i.setCompleteListener(null);
      });
      i.setAnimation(0, "idel4", false);
      t.contentPane.visible = true;
    });
    this.grade.url = "ui://RoleGirl/" + this.levelMap[n.quality];
    this.lbName.text = n.name;
    r_UtilsSystem.UtilsSystem.playAnim(this.animLight, this.animMap[n.quality], true);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.instance = null;
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
    this.data.callBack && this.data.callBack();
  };
  _ctor.prototype.showTalk = function (e, t, o) {
    undefined === o && (o = null);
    if (o) {
      this.lastSound && r_SoundMgr.SoundMgr.stopSound(this.lastSound);
      this.lastSound = o;
      r_SoundMgr.SoundMgr.playSound(this.lastSound);
    }
    this.talk.title = t;
  };
  __decorate([r_DecorateFunction1.AutoFind("talk")], _ctor.prototype, "talk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("grade")], _ctor.prototype, "grade", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbName")], _ctor.prototype, "lbName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animLight")], _ctor.prototype, "animLight", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_RoleGirlGetUI;