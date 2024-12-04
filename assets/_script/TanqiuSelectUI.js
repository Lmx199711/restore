var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_TanqiuUI = require("TanqiuUI");
var def_TanqiuSelectUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Tanqiu, r_UIDef.UIDef.Res.UI.TanqiuSelectUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.TanqiuSelectUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TanqiuSelectUI);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.touch.off(cc.Node.EventType.TOUCH_START);
    this.touch.on(cc.Node.EventType.TOUCH_START, function () {}, this);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnSelect0 = this.contentPane.getChild("btnSelect0");
    this.btnSelect0.onClick(this.onClickSelect.bind(this, 0), this);
    this.btnSelect1 = this.contentPane.getChild("btnSelect1");
    this.btnSelect1.onClick(this.onClickSelect.bind(this, 1), this);
    this.btnSelect2 = this.contentPane.getChild("btnSelect2");
    this.btnSelect2.onClick(this.onClickSelect.bind(this, 2), this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    this.touch = this.contentPane.getChild("touch");
    this.touch.onClick(function () {}, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickSelect = function (e) {
    r_TanqiuUI.default.showUI({
      index: e
    });
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_TanqiuSelectUI;