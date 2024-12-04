Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provide = undefined;
var r_Container = require("Container");
var def_Docker = function () {
  function _ctor() {}
  Object.defineProperty(_ctor, "ins", {
    get: function () {
      this._ins || (this._ins = new r_Container.Container());
      return this._ins;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.regClass = function (e) {
    var t = new e();
    if (t.init) {
      this.classMap.push(t);
    } else {
      cc.error("该类尚未实现Provider", e.name);
    }
  };
  _ctor.init = function () {
    for (var e = 0; e < this.classMap.length; e++) {
      var t = this.classMap[e];
      null == t || t.init();
    }
  };
  _ctor._ins = null;
  _ctor.classMap = [];
  return _ctor;
}();
exports.default = def_Docker;
exports.Provide = function () {
  return function (e) {
    def_Docker.regClass(e);
  };
};