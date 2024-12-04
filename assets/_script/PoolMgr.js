Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PoolMgr = undefined;
var r_Pool = require("Pool");
var exp_PoolMgr = function () {
  function _ctor() {}
  _ctor.createPool = function (e, t, o, n, a, s) {
    var r;
    undefined === o && (o = 3);
    undefined === n && (n = null);
    undefined === a && (a = null);
    undefined === s && (s = null);
    this.pools.has(e) && this.destroyPool(e);
    r = new r_Pool.Pool(e, t, o, n, a, s);
    this.pools.set(e, r);
    return r;
  };
  _ctor.createObj = function (e) {
    var t;
    var o = [];
    for (var i = 1; i < arguments.length; i++) {
      o[i - 1] = arguments[i];
    }
    if (this.pools.has(e)) {
      return (t = this.pools.get(e)).getObject.apply(t, o);
    } else {
      return null;
    }
  };
  _ctor.revert = function (e, t) {
    this.pools.has(e) && this.pools.get(e).revert(t, e);
  };
  _ctor.destroyPool = function (e) {
    if (this.pools.has(e)) {
      this.pools.get(e).clear();
      this.pools.delete(e);
    }
  };
  _ctor.clearPool = function (e) {
    this.pools.has(e) && this.pools.get(e).clear();
  };
  _ctor.pools = new Map();
  return _ctor;
}();
exports.PoolMgr = exp_PoolMgr;