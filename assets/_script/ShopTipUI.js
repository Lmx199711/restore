var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_ShopResultUI = require("ShopResultUI");
var def_ShopTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Shop, r_UIDef.UIDef.Res.UI.ShopTipUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ShopTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ShopTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnOk, this.btnVideo);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickbtnOk = function () {
    this.data.earn = .5;
    r_ShopResultUI.default.showUI(this.data);
    this.hide();
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双十一免除处罚", function () {
      e.data.earn = 1;
      r_ShopResultUI.default.showUI(e.data);
      e.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_ShopTipUI;