var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTipUI2 = undefined;
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_CommonTipUI2 = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pop, r_UIDef.UIDef.Res.UI.CommonTipUI2) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.CommonTipUI2, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CommonTipUI2);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.hide, this);
    this.btnConfirm.onClick(this.onClickConfirm, this);
    this.count = this.contentPane.getController("count");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data) {
      if (this.data.desc) {
        this.tipDesc.text = this.data.desc;
      } else {
        this.tipDesc.text = "";
      }
      if (this.data.confirmCallback) {
        this.confirmCallback = this.data.confirmCallback;
        this.count.selectedIndex = 1;
      }
    }
  };
  _ctor.prototype.onClickConfirm = function () {
    this.hide();
    this.confirmCallback();
  };
  __decorate([r_DecorateFunction1.AutoFind("tipDesc")], _ctor.prototype, "tipDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnConfirm")], _ctor.prototype, "btnConfirm", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.CommonTipUI2 = exp_CommonTipUI2;