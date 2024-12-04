var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SecretUpUI = require("SecretUpUI");
var r_DatingUI = require("DatingUI");
var def_DatingResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Dating, r_UIDef.UIDef.Res.UI.DatingResultUI) || this;
    t.showAnimFlag = false;
    t.m_free = 5e4;
    return t;
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
    this.show(r_UIDef.UIDef.Urls.UI.DatingResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.DatingResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnVideo, this.btnOk);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_DatingUI.default.hide();
    r_SecretUpUI.SecretUpUI.Inst && r_SecretUpUI.SecretUpUI.Inst.refreshPersonInfo();
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data.index;
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("秘书约会双倍奖励", function () {
      var t = r_SecretUpSystem.SecretUpSystem.getSecretById(e.data.secretId);
      r_UtilsSystem.UtilsSystem.showTipTrash("恭喜获得" + r_UtilsSystem.UtilsSystem.numFormats(2 * e.m_free) + "亲密度");
      t.feel = t.feel + 2 * e.m_free;
      e.hide();
    });
  };
  _ctor.prototype.onClickbtnOk = function () {
    var e = r_SecretUpSystem.SecretUpSystem.getSecretById(this.data.secretId);
    r_UtilsSystem.UtilsSystem.showTipTrash("恭喜获得" + r_UtilsSystem.UtilsSystem.numFormats(this.m_free) + "亲密度");
    e.feel = e.feel + this.m_free;
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_DatingResultUI;