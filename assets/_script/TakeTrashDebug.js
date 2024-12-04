var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_TakeTrashUI = require("TakeTrashUI");
var def_TakeTrashDebug = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.TakeTrash, r_UIDef.UIDef.Res.UI.TakeTrashDebug) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.TakeTrashDebug, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TakeTrashDebug);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btn0, this.btn1);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickbtn0 = function () {
    r_TakeTrashUI.default.instance.isDebug = false;
    this.hide();
  };
  _ctor.prototype.onClickbtn1 = function () {
    r_TakeTrashUI.default.instance.isDebug = true;
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btn0")], _ctor.prototype, "btn0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btn1")], _ctor.prototype, "btn1", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_TakeTrashDebug;