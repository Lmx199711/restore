var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignGetUI = undefined;
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var exp_SignGetUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SignIn2, r_UIDef.UIDef.Res.UI.SignGetUI) || this;
    t.showAnimFlag = true;
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
    this.show(r_UIDef.UIDef.Urls.UI.SignGetUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SignGetUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnOK.onClick(this.onClickOK, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data) {
      this.closeCallback = this.data.closeCallback;
      if (this.data.sprite) {
        this.itemIcon.texture = this.data.sprite;
      } else {
        this.data.iconUrl && (this.itemIcon.url = this.data.iconUrl);
      }
      this.data.desc && (this.itemDesc.text = this.data.desc);
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickOK = function () {
    this.hide();
    this.closeCallback && this.closeCallback();
    this.closeCallback = null;
  };
  __decorate([r_DecorateFunction1.AutoFind("itemIcon")], _ctor.prototype, "itemIcon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("itemDesc")], _ctor.prototype, "itemDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOK")], _ctor.prototype, "btnOK", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.SignGetUI = exp_SignGetUI;