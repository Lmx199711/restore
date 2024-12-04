var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tip2BtnUI = undefined;
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_Tip2BtnUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pop, r_UIDef.UIDef.Res.UI.Tip2BtnUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.Tip2BtnUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.Tip2BtnUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnNo.onClick(this.close, this);
    this.btnOk.onClick(this.okEvent, this);
  };
  _ctor.prototype.close = function () {
    this.hide();
    this.data.closeCallback && this.data.closeCallback();
  };
  _ctor.prototype.okEvent = function () {
    this.hide();
    this.data.okCallback && this.data.okCallback();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data) {
      this.data.desc && (this.txtDesc.text = this.data.desc);
      this.data.title && (this.txtTitle.text = this.data.title);
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("txtTitle")], _ctor.prototype, "txtTitle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("txtDesc")], _ctor.prototype, "txtDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnNo")], _ctor.prototype, "btnNo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.Tip2BtnUI = exp_Tip2BtnUI;