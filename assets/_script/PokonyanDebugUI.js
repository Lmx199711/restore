var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_PokonyanDebugUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pokonyan, r_UIDef.UIDef.Res.UI.PokonyanDebugUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.PokonyanDebugUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PokonyanDebugUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnHouse0.onClick(this.onClickHouse.bind(this, [0, 6]), this);
    this.btnHouse1.onClick(this.onClickHouse.bind(this, [0, 4]), this);
    this.btnSecret0.onClick(this.onClickHouse.bind(this, [2, 19]), this);
    this.btnSecret1.onClick(this.onClickHouse.bind(this, [2, 20]), this);
    this.btnSecret2.onClick(this.onClickHouse.bind(this, [2, 21]), this);
    this.btnCar0.onClick(this.onClickHouse.bind(this, [1, 9]), this);
    this.btnCar1.onClick(this.onClickHouse.bind(this, [1, 8]), this);
    this.btnCoin0.onClick(this.onClickHouse.bind(this, [3, 3]), this);
    this.btnCoin1.onClick(this.onClickHouse.bind(this, [3, 0]), this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickHouse = function (e) {
    this.data.ui.setDebugData(e);
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnHouse0")], _ctor.prototype, "btnHouse0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnHouse1")], _ctor.prototype, "btnHouse1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSecret0")], _ctor.prototype, "btnSecret0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSecret1")], _ctor.prototype, "btnSecret1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSecret2")], _ctor.prototype, "btnSecret2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnCar0")], _ctor.prototype, "btnCar0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnCar1")], _ctor.prototype, "btnCar1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnCoin0")], _ctor.prototype, "btnCoin0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnCoin1")], _ctor.prototype, "btnCoin1", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_PokonyanDebugUI;