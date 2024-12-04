var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerWaitUI = undefined;
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_TowerWaitUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Tower, r_UIDef.UIDef.Res.UI.TowerWaitUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.TowerWaitUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TowerWaitUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.hide, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.TowerWaitUI = exp_TowerWaitUI;