Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoGameSystem = exports._VideoGameSystem = undefined;
var r_BlockSystem = require("BlockSystem");
var r_VideoGameCfg = require("VideoGameCfg");
var exp__VideoGameSystem = function () {
  function _ctor() {
    this.videoGameMap = {};
    this.videoGameList = [];
  }
  _ctor.prototype.init = function () {};
  _ctor.prototype.getVideoGame = function (e) {
    return !r_BlockSystem.BlockSystem.isBlock(e);
  };
  _ctor.prototype.getVideoGameList = function () {
    return r_VideoGameCfg.VideoGameCfg.filter(function (e) {
      return !r_BlockSystem.BlockSystem.isBlock(Number(e.videoGameId));
    });
  };
  _ctor.prototype.removeVideoGame = function (e) {
    this.videoGameMap[e] = false;
  };
  _ctor.prototype.getCfg = function (e, t) {
    return e.filter(function (e) {
      var o = true;
      for (var i in t) if (e[i] != t[i]) {
        o = false;
        break;
      }
      return o;
    });
  };
  return _ctor;
}();
exports._VideoGameSystem = exp__VideoGameSystem;
exports.VideoGameSystem = new exp__VideoGameSystem();