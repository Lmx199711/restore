Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigNumSystem = exports._BigNumSystem = undefined;
var r_jsbi = require("jsbi");
var exp__BigNumSystem = function () {
  function _ctor() {
    this.two = r_jsbi.default.BigInt(2);
    this.bigMap = {};
  }
  _ctor.prototype.getNum = function (e) {
    if (this.bigMap[e]) {
      return this.bigMap[e];
    } else {
      this.bigMap[e] = r_jsbi.default.BigInt(e);
      return this.bigMap[e];
    }
  };
  return _ctor;
}();
exports._BigNumSystem = exp__BigNumSystem;
exports.BigNumSystem = new exp__BigNumSystem();