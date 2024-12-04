var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextTipUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var exp_TextTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.TextTipUI) || this;
    t.isShow = false;
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
    this.show(r_UIDef.UIDef.Urls.UI.TextTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TextTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    _ctor.Inst = this;
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.content = this.contentPane.getChild("content").asTextField;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.content.text = this.data;
    this.isShow = true;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.isShow = false;
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.TextTipUI = exp_TextTipUI;