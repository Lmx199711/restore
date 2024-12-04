Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuctionHouseSystem = exports._AuctionHouseSystem = undefined;
var r_AuctionHouseCfg = require("AuctionHouseCfg");
var r_UtilsSystem = require("UtilsSystem");
var exp__AuctionHouseSystem = function () {
  function _ctor() {
    this.m_npcs = [0, 1, 2];
    this.m_roundTime = 2.5;
    this.m_currPrice = 0;
    this.maxPrice = 0;
  }
  Object.defineProperty(_ctor.prototype, "currPrice", {
    get: function () {
      return this.m_currPrice;
    },
    set: function (e) {
      this.m_currPrice = e;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.getRandomNpcList = function () {
    var e = r_UtilsSystem.UtilsSystem.getRandomNum(1, 3);
    var t = this.m_npcs.concat().sort(function () {
      return Math.random() - .5;
    });
    t.length = e;
    return t;
  };
  _ctor.prototype.getRandomRoundTime = function () {
    return r_UtilsSystem.UtilsSystem.getRandomNum(10, 10 * (this.m_roundTime - .5)) / 10;
  };
  _ctor.prototype.getRandomPrice = function (e) {
    var t = r_AuctionHouseCfg.AuctionHouseCfg[e].addCoinList.length - 1;
    return r_AuctionHouseCfg.AuctionHouseCfg[e].addCoinList[r_UtilsSystem.UtilsSystem.getRandomNum(0, t)];
  };
  _ctor.prototype.setRandomMaxPrice = function (e) {
    var t = this.getCfg(e);
    this.maxPrice = r_UtilsSystem.UtilsSystem.getRandomNum(t.maxPrice[0], t.maxPrice[t.maxPrice.length - 1]);
    this.maxPrice *= 1e8;
  };
  _ctor.prototype.getCfg = function (e) {
    return r_AuctionHouseCfg.AuctionHouseCfg[e];
  };
  return _ctor;
}();
exports._AuctionHouseSystem = exp__AuctionHouseSystem;
exports.AuctionHouseSystem = new exp__AuctionHouseSystem();