Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableMgr = undefined;
var exp_TableMgr = function () {
  function _ctor() {}
  _ctor.regTable = function (e) {
    if (this.tables.has(e)) {
      cc.warn("注册数据表失败", e);
    } else {
      this.tables.set(e, new e());
    }
  };
  _ctor.init = function (e) {
    this.tables.forEach(function (t) {
      e(t.resUrl);
    });
  };
  _ctor.loaded = function () {
    this.tables.forEach(function (e) {
      e.onSerialization(cc.resources.get(e.resUrl));
    });
  };
  _ctor.tables = new Map();
  return _ctor;
}();
exports.TableMgr = exp_TableMgr;