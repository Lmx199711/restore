var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tip2BtnAdUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_Tip2BtnAdUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pop, r_UIDef.UIDef.Res.UI.Tip2BtnAdUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.Tip2BtnAdUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.Tip2BtnAdUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnNo.onClick(this.close, this);
    this.btnOk.onClick(this.lookVideo, this);
  };
  _ctor.prototype.close = function () {
    this.hide();
    this.data.closeCallback && this.data.closeCallback();
  };
  _ctor.prototype.lookVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("锻造失败救材料", function () {
      e.data.okCallback && e.data.okCallback();
      e.hide();
    });
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
exports.Tip2BtnAdUI = exp_Tip2BtnAdUI;