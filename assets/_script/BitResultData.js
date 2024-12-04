Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitResultData = undefined;
var exp_BitResultData = function () {
  function _ctor() {}
  _ctor.init = function () {
    this.m_loss = 0;
    this.m_income = 0;
    this.m_dis = 0;
  };
  _ctor.addLoss = function (e) {
    this.m_loss += e;
  };
  _ctor.addIncome = function (e) {
    this.m_income += e;
  };
  Object.defineProperty(_ctor, "dis", {
    get: function () {
      return this.m_dis;
    },
    set: function (e) {
      this.m_dis = e;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "loss", {
    get: function () {
      return this.m_loss;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "income", {
    get: function () {
      return this.m_income;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor, "total", {
    get: function () {
      return this.m_income - this.m_loss;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.m_loss = 0;
  _ctor.m_income = 0;
  _ctor.m_dis = 0;
  return _ctor;
}();
exports.BitResultData = exp_BitResultData;