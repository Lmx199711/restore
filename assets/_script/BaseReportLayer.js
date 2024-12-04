var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportBaseLayer = undefined;
var r_PlayerData = require("PlayerData");
var r_BaseLayer = require("BaseLayer");
var exp_ReportBaseLayer = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_PlayerData.PlayerData.addSystemUIShowCount(this.systemType);
  };
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.ReportBaseLayer = exp_ReportBaseLayer;