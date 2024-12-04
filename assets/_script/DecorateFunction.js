Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindActionCom = exports.bindEventCom = undefined;
var r_ECSWorld = require("ECSWorld");
exports.bindEventCom = function (e) {
  return function (t) {
    var o = e.prototype.onLoad;
    e.prototype.onLoad = function () {
      var e = new t();
      r_ECSWorld.ECSWorld.bindSystem(this, e);
      o && o.call(this);
    };
    var n = e.prototype.onDestroy;
    e.prototype.onDestroy = function () {
      n && n.call(this);
      r_ECSWorld.ECSWorld.unBindSystem(this);
    };
  };
};
exports.bindActionCom = function (e) {
  return function (t) {
    var o = e.prototype.onStart;
    e.prototype.onStart = function () {
      var e = new t();
      r_ECSWorld.ECSWorld.bindSystem(this, e);
      o.call(this);
    };
    var n = e.prototype.onDestroy;
    e.prototype.onDestroy = function () {
      n && n.call(this);
      r_ECSWorld.ECSWorld.unBindSystem(this);
    };
  };
};