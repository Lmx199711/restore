var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_BathGameUI = require("BathGameUI");
var r_BathUI = require("BathUI");
var def_BathResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Bath, r_UIDef.UIDef.Res.UI.BathResultUI) || this;
    t.showAnimFlag = false;
    t.stars = [];
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
    this.show(r_UIDef.UIDef.Urls.UI.BathResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BathResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    for (var t = 1; t <= 5; t++) {
      var o = this.contentPane.getChild("star" + t).asLoader;
      this.stars.push(o);
      o.onClick(this.onClickStar.bind(this, t), this);
    }
    this.bindBtnCallback(this.btnOk);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_BathUI.default.Inst.returnUI();
    r_BathGameUI.default.hide();
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("type").selectedIndex = this.data.index;
    this.contentPane.getController("c1").selectedIndex = 0;
    this.contentPane.getTransition("init").play();
    this.contentPane.getTransition("bubble").play();
    null != this.data.cId && (this.clothes.getController("c1").selectedIndex = parseInt(this.data.cId));
  };
  _ctor.prototype.onClickStar = function (e) {
    this.contentPane.getController("c1").selectedIndex = e;
    this.contentPane.getTransition("t0").play();
    5 == e && this.contentPane.getTransition("aixin").play();
  };
  _ctor.prototype.onClickbtnOk = function () {
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clothes")], _ctor.prototype, "clothes", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BathResultUI;