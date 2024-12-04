Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BusinessSystem = exports._BusinessSystem = undefined;
var r_jsbi = require("jsbi");
var r_BusinessCfg = require("BusinessCfg");
var r_SoundMgr = require("SoundMgr");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var exp__BusinessSystem = function () {
  function _ctor() {
    this.businessCfgMap = null;
  }
  _ctor.prototype.checkInit = function () {
    if (!this.businessCfgMap) {
      this.businessCfgMap = {};
      for (var e = 0; e < r_BusinessCfg.BusinessCfg.length; e++) {
        this.businessCfgMap[r_BusinessCfg.BusinessCfg[e].id] = r_BusinessCfg.BusinessCfg[e];
      }
    }
    r_PlayerData.PlayerData.data.businessMap.businessList || (r_PlayerData.PlayerData.data.businessMap.businessList = []);
    r_TimeSystem.TimeSystem.registSecondUpdate("BusinessSystem", this.onSecondUpdate.bind(this));
  };
  _ctor.prototype.onSecondUpdate = function () {
    if (!r_PlayerData.PlayerData.data.businessMap.businessList) {
      return false;
    }
    for (var e = 0; e < r_PlayerData.PlayerData.data.businessMap.businessList.length; e++) {
      r_PlayerData.PlayerData.data.businessMap.businessList[e].addTime || (r_PlayerData.PlayerData.data.businessMap.businessList[e].addTime = 0);
      r_PlayerData.PlayerData.data.businessMap.businessList[e].addTime = r_PlayerData.PlayerData.data.businessMap.businessList[e].addTime + 1;
    }
  };
  _ctor.prototype.getBusinessCfg = function (e) {
    return this.businessCfgMap[e];
  };
  _ctor.prototype.isBuyBusiness = function (e) {
    if (!r_PlayerData.PlayerData.data.businessMap.businessList) {
      return false;
    }
    for (var t = 0; t < r_PlayerData.PlayerData.data.businessMap.businessList.length; t++) {
      if (r_PlayerData.PlayerData.data.businessMap.businessList[t].id == e) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.getBuyInfo = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.businessMap.businessList.length; t++) {
      if (r_PlayerData.PlayerData.data.businessMap.businessList[t].id == e) {
        return r_PlayerData.PlayerData.data.businessMap.businessList[t];
      }
    }
    return null;
  };
  _ctor.prototype.buyBusiness = function (e) {
    if (!this.isBuyBusiness(e)) {
      var t = {};
      t.time = r_TimeSystem.TimeSystem.getServerTime();
      t.id = e;
      t.addTime = 0;
      r_PlayerData.PlayerData.data.businessMap.businessList.push(t);
    }
  };
  _ctor.prototype.getSellCoin = function (e) {
    var t = this.getBuyInfo(e.id);
    if (!t) {
      return r_jsbi.default.BigInt(e.buy);
    }
    var o = t.addTime;
    o || (o = 0);
    var n = r_jsbi.default.multiply(r_jsbi.default.BigInt(o), r_jsbi.default.BigInt(e.increase));
    return r_jsbi.default.add(n, r_jsbi.default.BigInt(e.buy));
  };
  _ctor.prototype.sellBusiness = function (e) {
    var t = this.getSellCoin(e);
    r_PlayerData.PlayerData.addCoin("卖出企业", t, r_ReportSystem.SystemKey.企业, true, true, true);
    for (var o = r_PlayerData.PlayerData.data.businessMap.businessList.length - 1; o >= 0; o--) {
      r_PlayerData.PlayerData.data.businessMap.businessList[o].id == e.id && r_PlayerData.PlayerData.data.businessMap.businessList.splice(o, 1);
    }
  };
  _ctor.prototype.sellAllBusiness = function () {
    var e = r_jsbi.default.BigInt(0);
    for (var t = r_PlayerData.PlayerData.data.businessMap.businessList.length - 1; t >= 0; t--) {
      var n = r_PlayerData.PlayerData.data.businessMap.businessList[t];
      var c = exports.BusinessSystem.getBusinessCfg(n.id);
      var l = exports.BusinessSystem.getSellCoin(c);
      e = r_jsbi.default.add(e, l);
      r_PlayerData.PlayerData.data.businessMap.businessList.splice(t, 1);
    }
    if (r_jsbi.default.GE(e, 0)) {
      r_PlayerData.PlayerData.addCoin("卖出所有企业", e, r_ReportSystem.SystemKey.企业, true, true, true);
    } else {
      r_SoundMgr.SoundMgr.playSound("click");
    }
  };
  _ctor.prototype.needShowRedTip = function () {
    if (!r_PlayerData.PlayerData.data.businessMap || !r_PlayerData.PlayerData.data.businessMap.businessList) {
      return false;
    }
    for (var e = 0; e < r_BusinessCfg.BusinessCfg.length; e++) {
      var t = r_BusinessCfg.BusinessCfg[e];
      if (!this.isBuyBusiness(t.id) && r_PlayerData.PlayerData.isCoinEnough(t.buy)) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.getBoughtBusinessCount = function () {
    return r_PlayerData.PlayerData.data.businessMap.businessList.length;
  };
  return _ctor;
}();
exports._BusinessSystem = exp__BusinessSystem;
exports.BusinessSystem = new exp__BusinessSystem();