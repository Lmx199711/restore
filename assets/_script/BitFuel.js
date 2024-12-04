Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_BitFuel = function () {
  function _ctor() {
    this.subNum = 3;
    this.m_maxNum = 100;
    this.m_maxLen = 300;
    this.m_isLoss = false;
  }
  _ctor.prototype.init = function () {
    this.fuel = this.m_maxNum;
  };
  Object.defineProperty(_ctor.prototype, "isLoss", {
    set: function (e) {
      this.m_isLoss = e;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.subFuel = function (e) {
    this.m_isLoss && (this.fuel = this.m_fuel - e * this.subNum);
  };
  Object.defineProperty(_ctor.prototype, "fuel", {
    get: function () {
      return this.m_fuel;
    },
    set: function (e) {
      this.m_fuel = e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "len", {
    get: function () {
      return this.m_fuel / 100 * this.m_maxLen;
    },
    enumerable: false,
    configurable: true
  });
  return _ctor;
}();
exports.default = def_BitFuel;