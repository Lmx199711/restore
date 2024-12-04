Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndustryResultState = exports.IndustryState = exports.HouseSystem = exports.HouseData = undefined;
var r_jsbi = require("jsbi");
var r_HomeCfg = require("HomeCfg");
var r_HouseCfg = require("HouseCfg");
var r_HouseMarketUI = require("HouseMarketUI");
var r_HouseOutUI = require("HouseOutUI");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_UtilsSystem = require("UtilsSystem");
var d = function (e) {
  this.id = 0;
  this.state = 1;
  this.resultState = -1;
  this.startTime = 0;
  this.mishu = 0;
  this.project = -1;
  this.id = e || 0;
};
var exp_HouseData = function () {
  function _ctor(e) {
    this.hasBeds = [];
    this.hasNurses = [];
    this.fenqis = [];
    this.hasStoreHouses = [];
    this.storesPrice = [];
    if (e) {
      this.copy(e);
    } else {
      this.houseId = 0;
      this.hasHouseId = 0;
      this.bedId = 0;
      this.nurseId = 0;
      this.hasBeds = [0];
      this.fenqis = [];
      this.hasNurses = [];
      this.randomCeff = r_UtilsSystem.UtilsSystem.getRandomNum(r_HouseCfg.minCeff, r_HouseCfg.maxCeff) / 100;
      this.day = r_DaySystem.DaySystem.getShowDay();
      this.hasStoreHouses = [];
      this.lodgerMap = {};
      this.storesPrice = [];
      this.industrys = [];
    }
  }
  _ctor.prototype.copy = function (e) {
    this.houseId = e.houseId;
    this.hasHouseId = e.hasHouse;
    this.bedId = e.bedId;
    this.nurseId = e.nurseId;
    this.hasBeds = e.hasBeds;
    this.hasNurses = e.hasNurses;
    this.fenqis = e.fenqis;
    this.day = e.day;
    this.randomCeff = e.randomCeff;
    this.hasStoreHouses = e.hasStoreHouses;
    this.lodgerMap = e.lodgerMap;
    this.storesPrice = e.storePrice;
  };
  return _ctor;
}();
exports.HouseData = exp_HouseData;
var f;
var m;
var g = function () {
  function e() {
    this.isBuyNewHouse = false;
  }
  e.prototype.getHouseData = function () {
    return r_PlayerData.PlayerData.data.houseData;
  };
  e.prototype.resetData = function () {
    if (r_PlayerData.PlayerData.data.houseData) {
      var e = new exp_HouseData();
      Object.keys(e).forEach(function (t) {
        Object.keys(r_PlayerData.PlayerData.data.houseData).includes(t) || (r_PlayerData.PlayerData.data.houseData[t] = e[t]);
      });
    }
  };
  e.prototype.refreshPrice = function () {
    if (!(r_HouseOutUI.default.instance && r_HouseOutUI.default.instance.isShowing)) {
      r_PlayerData.PlayerData.data.houseData.randomCeff = r_UtilsSystem.UtilsSystem.getRandomNum(r_HouseCfg.minCeff, r_HouseCfg.maxCeff) / 100;
      r_PlayerData.PlayerData.data.houseData.day = r_DaySystem.DaySystem.getShowDay();
      r_HouseMarketUI.default.Inst && r_HouseMarketUI.default.Inst.restart();
    }
  };
  e.prototype.addLodger = function (e, t, o) {
    r_PlayerData.PlayerData.data.houseData.lodgerMap[e] = {};
    r_PlayerData.PlayerData.data.houseData.lodgerMap[e].lodgerId = t;
    r_PlayerData.PlayerData.data.houseData.lodgerMap[e].price = o;
  };
  e.prototype.buyHouseId = function (e) {
    r_PlayerData.PlayerData.data.houseData.hasHouseId = e;
    this.setHouseId(e);
  };
  e.prototype.setHouseId = function (e) {
    r_PlayerData.PlayerData.data.houseData.houseId = e;
    r_PlayerData.PlayerData.saveData();
    this.isBuyNewHouse = 4 == e;
  };
  e.prototype.hasLodger = function () {};
  e.prototype.getLodgerInfo = function (e) {
    return r_PlayerData.PlayerData.data.houseData.lodgerMap[e];
  };
  e.prototype.removeLodger = function (e) {
    r_PlayerData.PlayerData.data.houseData.lodgerMap[e] && delete r_PlayerData.PlayerData.data.houseData.lodgerMap[e];
  };
  e.prototype.sellStore = function (e) {
    var t = r_PlayerData.PlayerData.data.houseData.hasStoreHouses.indexOf(e);
    if (-1 != t) {
      r_PlayerData.PlayerData.data.houseData.hasStoreHouses.splice(t, 1);
      r_PlayerData.PlayerData.data.houseData.storesPrice.splice(t, 1);
    }
    this.removeLodger(e);
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.addStore = function (e, t) {
    if (!r_PlayerData.PlayerData.data.houseData.hasStoreHouses.includes(e)) {
      r_PlayerData.PlayerData.data.houseData.hasStoreHouses.push(e);
      r_PlayerData.PlayerData.data.houseData.storesPrice.push(t);
      r_PlayerData.PlayerData.saveData();
    }
  };
  e.prototype.getStorePrice = function (e) {
    var t = r_PlayerData.PlayerData.data.houseData.hasStoreHouses.indexOf(e);
    return r_PlayerData.PlayerData.data.houseData.storesPrice[t] || 0;
  };
  e.prototype.checkHasStore = function (e) {
    return r_PlayerData.PlayerData.data.houseData.hasStoreHouses.includes(e);
  };
  e.prototype.getStoreType = function (e) {
    if (this.checkHasStore(e)) {
      if (null == r_PlayerData.PlayerData.data.houseData.lodgerMap[e]) {
        return 1;
      } else {
        return 2;
      }
    } else {
      return 0;
    }
  };
  e.prototype.checkDoor = function (e) {
    var t = r_HomeCfg.HomeDoorRuleCfg[e];
    return !r_jsbi.default.LT(r_PlayerData.PlayerData.bigCoin, t.price + "");
  };
  e.prototype.toNextDay = function () {
    var e = 0;
    Object.values(r_PlayerData.PlayerData.data.houseData.lodgerMap).forEach(function (t) {
      e += t.price;
    });
    if (0 != e) {
      r_PlayerData.PlayerData.addCoin("收租", e, r_ReportSystem.SystemKey.楼市, false);
      r_UtilsSystem.UtilsSystem.showTip("今日收租：" + r_UtilsSystem.UtilsSystem.getShowCoin(e));
    }
  };
  e.prototype.addIndustrys = function (e) {
    !this.checkIndustry(e) && r_PlayerData.PlayerData.data.houseData.industrys.push(new d(e));
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.checkIndustry = function (e) {
    return -1 != r_PlayerData.PlayerData.data.houseData.industrys.findIndex(function (t) {
      return t.id == e;
    });
  };
  e.prototype.getIndustryData = function (e) {
    return r_PlayerData.PlayerData.data.houseData.industrys.find(function (t) {
      return t.id == e;
    });
  };
  e.prototype.startIndustryProject = function (e, t, o) {
    undefined === o && (o = 0);
    if (!this.checkIndustry(e)) {
      return 0;
    }
    var i = r_PlayerData.PlayerData.data.houseData.industrys.findIndex(function (t) {
      return t.id == e;
    });
    r_PlayerData.PlayerData.data.houseData.industrys[i];
    r_PlayerData.PlayerData.data.houseData.industrys[i].project = t;
    r_PlayerData.PlayerData.data.houseData.industrys[i].startTime = Date.now();
    r_PlayerData.PlayerData.data.houseData.industrys[i].state = f.研发中;
    r_PlayerData.PlayerData.data.houseData.industrys[i].mishu = o;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.addTimeIndustry = function (e) {
    if (!this.checkIndustry(e)) {
      return 0;
    }
    var t = r_PlayerData.PlayerData.data.houseData.industrys.findIndex(function (t) {
      return t.id == e;
    });
    r_PlayerData.PlayerData.data.houseData.industrys[t];
    r_PlayerData.PlayerData.data.houseData.industrys[t].startTime -= 6e5;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.getIndustryState = function (e) {
    if (!this.checkIndustry(e)) {
      return 0;
    }
    var t = r_PlayerData.PlayerData.data.houseData.industrys.findIndex(function (t) {
      return t.id == e;
    });
    var o = r_PlayerData.PlayerData.data.houseData.industrys[t];
    var i = r_HouseCfg.HousePrejectCfg[o.id];
    if (r_PlayerData.PlayerData.data.houseData.industrys[t].state == f.研发中 && r_PlayerData.PlayerData.data.houseData.industrys[t].startTime > 0 && Date.now() - r_PlayerData.PlayerData.data.houseData.industrys[t].startTime >= 1e3 * i.time && -1 != r_PlayerData.PlayerData.data.houseData.industrys[t].project) {
      r_PlayerData.PlayerData.data.houseData.industrys[t].startTime = 0;
      r_PlayerData.PlayerData.data.houseData.industrys[t].state = f.研发结果;
      r_PlayerData.PlayerData.saveData();
    }
    if (6 != r_PlayerData.PlayerData.data.houseData.industrys[t].state) {
      return r_PlayerData.PlayerData.data.houseData.industrys[t].state;
    }
    if (r_PlayerData.PlayerData.data.houseData.industrys[t].resultState == m.无成果) {
      r_PlayerData.PlayerData.data.houseData.industrys[t].resultState = this.getIndustryResult(r_PlayerData.PlayerData.data.houseData.industrys[t].mishu);
      r_PlayerData.PlayerData.data.houseData.industrys[t].mishu = 0;
      r_PlayerData.PlayerData.saveData();
    }
  };
  e.prototype.checkIndustryComplate = function () {
    return -1 != r_PlayerData.PlayerData.data.houseData.industrys.findIndex(function (e) {
      return 6 == e.state;
    });
  };
  e.prototype.getIndustryPr = function (e) {
    if (0 == e) {
      return r_HouseCfg.HouseIndustryResultPr0Cfg;
    }
    var t;
    var o = r_SecretUpSystem.SecretUpSystem.getSecretById(e);
    if ((t = r_SecretUpSystem.SecretUpSystem.getLevelByFeel(o.id, o.feel)) > 0 && t <= 10) {
      return r_HouseCfg.HouseIndustryResultPr1Cfg;
    } else if (t > 10 && t <= 20) {
      return r_HouseCfg.HouseIndustryResultPr1Cfg;
    } else if (t > 20 && t <= 30) {
      return r_HouseCfg.HouseIndustryResultPr2Cfg;
    } else if (t > 30 && t <= 40) {
      return r_HouseCfg.HouseIndustryResultPr3Cfg;
    } else {
      return r_HouseCfg.HouseIndustryResultPr4Cfg;
    }
  };
  e.prototype.checkMishuJob = function (e) {
    return -1 != r_PlayerData.PlayerData.data.houseData.industrys.findIndex(function (t) {
      return t.mishu == e;
    });
  };
  e.prototype.getIndustryResult = function (e) {
    var t = this.getIndustryPr(e);
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(t).id;
  };
  e.prototype.industryAwardGet = function (e) {
    if (this.checkIndustry(e)) {
      var t = r_PlayerData.PlayerData.data.houseData.industrys.findIndex(function (t) {
        return t.id == e;
      });
      r_PlayerData.PlayerData.data.houseData.industrys[t];
      r_PlayerData.PlayerData.data.houseData.industrys[t].state = 1;
      r_PlayerData.PlayerData.data.houseData.industrys[t].resultState = -1;
      r_PlayerData.PlayerData.data.houseData.industrys[t].startTime = 0;
      r_PlayerData.PlayerData.data.houseData.industrys[t].mishu = 0;
      r_PlayerData.PlayerData.data.houseData.industrys[t].project = -1;
      r_PlayerData.PlayerData.saveData();
    }
  };
  e.prototype.getHouseCfgByCount = function (e) {
    var t = Object.values(r_HouseCfg.HouseCfg);
    var o = e > t.length ? t.length : e;
    return t.filter(function (e) {
      return e.id < o;
    });
  };
  return e;
}();
exports.HouseSystem = new g();
(function (e) {
  e[e["研发产品"] = 1] = "研发产品";
  e[e["研发中"] = 4] = "研发中";
  e[e["研发结果"] = 6] = "研发结果";
})(f = exports.IndustryState || (exports.IndustryState = {}));
(function (e) {
  e[e["无成果"] = -1] = "无成果";
  e[e["研发成功"] = 0] = "研发成功";
  e[e["研发失败"] = 1] = "研发失败";
  e[e["研发无果"] = 2] = "研发无果";
})(m = exports.IndustryResultState || (exports.IndustryResultState = {}));