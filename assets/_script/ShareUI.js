var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_ShareSystem = require("ShareSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_ShareUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.MainHome, r_UIDef.UIDef.Res.UI.ShareUI) || this;
    t.showAnimFlag = false;
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
    this.show(r_UIDef.UIDef.Urls.UI.ShareUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ShareUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnNext, this.btnStart);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onUpdateTime = function () {};
  _ctor.prototype.onClickbtnNext = function () {
    this.hide();
  };
  _ctor.prototype.onClickbtnStart = function () {
    r_ShareSystem.ShareSystem.startRecord();
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnNext")], _ctor.prototype, "btnNext", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_ShareUI;