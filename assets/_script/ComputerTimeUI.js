var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_ComputerResultUI = require("ComputerResultUI");
var def_ComputerTimeUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Computer, r_UIDef.UIDef.Res.UI.ComputerTimeUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.ComputerTimeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ComputerTimeUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnAddTime);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_ComputerResultUI.default.showUI({
      star: this.data.star
    });
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickbtnAddTime = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("砸电脑加时", function () {
      e.data.callBack && e.data.callBack();
      e.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnAddTime")], _ctor.prototype, "btnAddTime", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_ComputerTimeUI;