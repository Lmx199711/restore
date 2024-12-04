Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BagSystem = undefined;
var r_BagGoodsCfg = require("BagGoodsCfg");
var r_PlayerData = require("PlayerData");
var s = function () {
  function e() {
    this.bagGoodsMap = {};
  }
  e.prototype.init = function () {
    for (var e in r_BagGoodsCfg.BagGoodsList) r_BagGoodsCfg.BagGoodsList.hasOwnProperty(e) && (this.bagGoodsMap[r_BagGoodsCfg.BagGoodsList[e].id] = r_BagGoodsCfg.BagGoodsList[e]);
  };
  e.prototype.getGoodsInfoById = function (e) {
    for (var t in this.bagGoodsMap) if (this.bagGoodsMap[t].id == e) {
      return __rest(this.bagGoodsMap[t], []);
    }
    return null;
  };
  e.prototype.getPlayerGoodsInfoById = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.bagInfo.goodsList.length; t++) {
      if (r_PlayerData.PlayerData.data.bagInfo.goodsList[t].id == e) {
        return r_PlayerData.PlayerData.data.bagInfo.goodsList[t];
      }
    }
    return null;
  };
  e.prototype.getPlayerGoodsKindByType = function (e) {
    var t = 0;
    for (var o = 0; o < r_PlayerData.PlayerData.data.bagInfo.goodsList.length; o++) {
      var i = this.getGoodsInfoById(r_PlayerData.PlayerData.data.bagInfo.goodsList[o].id);
      i && i.classify == e && r_PlayerData.PlayerData.data.bagInfo.goodsList[o].num > 0 && t++;
    }
    return t;
  };
  e.prototype.setPlayerGoodsInfoById = function (e, t) {
    for (var o = 0; o < r_PlayerData.PlayerData.data.bagInfo.goodsList.length; o++) {
      if (r_PlayerData.PlayerData.data.bagInfo.goodsList[o].id == e) {
        r_PlayerData.PlayerData.data.bagInfo.goodsList[o].num += t;
        return void (r_PlayerData.PlayerData.data.bagInfo.goodsList[o].num <= 0 && r_PlayerData.PlayerData.data.bagInfo.goodsList.splice(o, 1));
      }
    }
    var i = {
      id: e,
      num: t,
      level: 0
    };
    r_PlayerData.PlayerData.data.bagInfo.goodsList.push(i);
    r_PlayerData.PlayerData.saveData();
  };
  return e;
}();
exports.BagSystem = new s();