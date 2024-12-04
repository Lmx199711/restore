var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_DrawUI = require("DrawUI");
var r_GameGuideUI = require("GameGuideUI");
var r_SecretUpUI = require("SecretUpUI");
var def_SecretSelectUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SecretUp, r_UIDef.UIDef.Res.UI.SecretSelectUI) || this;
    t.showAnimFlag = false;
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
    this.show(r_UIDef.UIDef.Urls.UI.SecretSelectUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretSelectUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnRecruit, this.btnUp);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickbtnRecruit = function () {
    r_DrawUI.DrawUI.showUI();
    r_GameGuideUI.default.Inst && this.hide();
    r_GameGuideUI.default.finishStep(2);
  };
  _ctor.prototype.onClickbtnUp = function () {
    r_SecretUpUI.SecretUpUI.showUI();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnRecruit")], _ctor.prototype, "btnRecruit", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnUp")], _ctor.prototype, "btnUp", undefined);
  __decorate([r_DecorateFunction1.AutoFind("BtnClose")], _ctor.prototype, "BtnClose", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_SecretSelectUI;