Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameFlag = undefined;
var exp_GameFlag = function () {
  function _ctor(e) {
    undefined === e && (e = 0);
    this.mValue = 0;
    this.mValue = e;
  }
  Object.defineProperty(_ctor.prototype, "value", {
    get: function () {
      return this.mValue;
    },
    set: function (e) {
      this.mValue = e;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.add = function (e) {
    this.has(e) || (this.mValue |= e);
    return this;
  };
  _ctor.prototype.remove = function (e) {
    this.has(e) && (this.mValue &= ~e);
    return this;
  };
  _ctor.prototype.has = function (e) {
    return 0 != (this.mValue & e);
  };
  return _ctor;
}();
exports.GameFlag = exp_GameFlag;