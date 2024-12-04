Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContinueCoff = exports.EarnTimeType = exports.CoinSystem = exports._CoinSystem = undefined;
var i;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_jsbi = require("jsbi");
var r_LevelUpCfg = require("LevelUpCfg");
var r_MainHomeUI = require("MainHomeUI");
var r_GameGuideUI = require("GameGuideUI");
var r_SoundMgr = require("SoundMgr");
var r_BigNumSystem = require("BigNumSystem");
var r_CitySystem = require("CitySystem");
var r_GroupSystem = require("GroupSystem");
var r_PlayerData = require("PlayerData");
var r_PoolSystem = require("PoolSystem");
var r_ReportSystem = require("ReportSystem");
var r_RoleGirlSystem = require("RoleGirlSystem");
var r_TimeSystem = require("TimeSystem");
var exp__CoinSystem = function () {
  function _ctor() {
    this.daySecond = 86400;
    this.addEnergyTime = 600;
    this.maxEnergy = 3;
    this.passTime = 0;
    this.autoPassTime = 0;
    this.oneSecondTime = 360;
    this.lastSaveTime = 0;
    this.isPause = false;
    this.isStageHide = false;
    this.touchLayer = null;
    this.levelAddMap = {};
    this.isAutoClick = true;
    this.autoAddTime = 300;
    this.touchNum = 0;
    this.touchMaxNum = 10;
    this.vec2Temp2 = cc.v2();
    this.vec2Temp = cc.v2();
    this.tempPos = new cc.Vec2();
    this.touchList = [];
  }
  _ctor.prototype.init = function () {
    for (var e = 0; e < r_LevelUpCfg.LevelAddCfg.length; e++) {
      var t = r_LevelUpCfg.LevelAddCfg[e];
      this.levelAddMap[t.type] || (this.levelAddMap[t.type] = {});
      this.levelAddMap[t.type][t.id] = t;
    }
  };
  _ctor.prototype.getLevelAddInfo = function (e, t) {
    if (this.levelAddMap[e]) {
      return this.levelAddMap[e][t];
    } else {
      return null;
    }
  };
  _ctor.prototype.getRoleAddClickRate = function () {
    var e = 0;
    for (var t in r_RoleGirlSystem.RoleGirlSystem.roleCfgMap) {
      var i = r_RoleGirlSystem.RoleGirlSystem.getRoleCfg(t);
      var n = r_RoleGirlSystem.RoleGirlSystem.getRoleLevel(i.id);
      var a = exports.CoinSystem.getLevelAddInfo("role", i.id);
      n >= a.unlock && (e += a.add);
    }
    return e;
  };
  _ctor.prototype.getBusinessAddClickRate = function () {
    var e = 0;
    for (var t = 0; t < r_PlayerData.PlayerData.data.businessMap.businessList.length; t++) {
      var i = r_PlayerData.PlayerData.data.businessMap.businessList[t];
      e += exports.CoinSystem.getLevelAddInfo("business", i.id).add;
    }
    return e;
  };
  _ctor.prototype.getClickCoin = function () {
    var e = r_GroupSystem.GroupSystem.getLevelUpCfg();
    var t = e[r_PlayerData.PlayerData.data.level];
    t || (t = e[e.length - 1]);
    var o = Number(t.click);
    var n = 1;
    n += this.getRoleAddClickRate();
    var a = o * (n += this.getBusinessAddClickRate());
    var s = this.getContinueCoff();
    s && (a *= s);
    a = Math.ceil(a);
    this.getHasAutoTouch(i.倍数) && (a *= 3);
    return a;
  };
  _ctor.prototype.getClickOnceCoin = function () {
    var e = r_GroupSystem.GroupSystem.getLevelUpCfg();
    var t = e[r_PlayerData.PlayerData.data.level];
    t || (t = e[e.length - 1]);
    var o = Number(t.click);
    var i = 1;
    i += this.getRoleAddClickRate();
    var n = o * (i += this.getBusinessAddClickRate());
    var a = this.getContinueCoff();
    a && (n *= a);
    return Math.ceil(n);
  };
  _ctor.prototype.flyCoinAnim = function (e, t) {
    var o = r_PoolSystem.PoolSystem.createObj(r_PoolSystem.PoolSystem.MianCoinImg);
    o.x = e.x;
    o.y = e.y;
    var i = t.sub(e).len();
    cc.tween(o).to(i / 1e3 * .8, {
      x: t.x,
      y: t.y
    }).start();
    r_TimeSystem.TimeSystem.timeUpdate(i / 1e3 * .8 + .1, function (e) {
      1 == e && r_PoolSystem.PoolSystem.revert(r_PoolSystem.PoolSystem.MianCoinImg, o);
    });
  };
  _ctor.prototype.update = function (e) {
    if (r_PlayerData.PlayerData && r_PlayerData.PlayerData.data && !this.isPause && !this.isStageHide && (this.autoPassTime += e, this.autoPassTime >= .33 && (this.autoPassTime = 0, r_MainHomeUI.default.Inst && this.getHasAutoTouch(i.自动) && this.playTouchEfeect(cc.v2(r_MainHomeUI.default.Inst.btnGuide0.x, r_MainHomeUI.default.Inst.btnGuide0.y))), this.passTime = this.passTime + e, this.passTime > 1)) {
      this.passTime = 0;
      var t = r_TimeSystem.TimeSystem.getServerTime();
      if (t - r_PlayerData.PlayerData.data.addCoinTime > 0) {
        this.touchNum = 0;
        var o = this.getAllAddCoin().allCoin;
        r_jsbi.default.LE(r_BigNumSystem.BigNumSystem.getNum("0"), o) && r_PlayerData.PlayerData.addCoin("每秒奖励", o, r_ReportSystem.SystemKey.雇佣系统, false, false, false);
        r_PlayerData.PlayerData.data.addCoinTime = t;
        this.getHasAutoTouch(i.自动) && r_PlayerData.PlayerData.data.earnTimestamp[i.自动]--;
        this.getHasAutoTouch(i.倍数) && r_PlayerData.PlayerData.data.earnTimestamp[i.倍数]--;
        if (t - this.lastSaveTime >= 10) {
          this.lastSaveTime = t;
          r_PlayerData.PlayerData.saveData();
        }
      }
    }
  };
  _ctor.prototype.getAllAddCoinNoDouble = function () {
    var e = r_CitySystem.CitySystem.countSecondAllIncome();
    var t = r_RoleGirlSystem.RoleGirlSystem.getSecondCoin();
    return {
      allCoin: r_jsbi.default.ADD(e, t),
      cityCoin: e,
      roleCoin: t
    };
  };
  _ctor.prototype.getAllAddCoin = function () {
    var e = r_CitySystem.CitySystem.countSecondAllIncome();
    var t = r_RoleGirlSystem.RoleGirlSystem.getSecondCoin();
    var o = r_jsbi.default.ADD(e, t);
    if (this.getHasAutoTouch(i.倍数)) {
      e = r_jsbi.default.multiply(e, r_BigNumSystem.BigNumSystem.getNum(3));
      t = r_jsbi.default.multiply(t, r_BigNumSystem.BigNumSystem.getNum(3));
      o = r_jsbi.default.multiply(o, r_BigNumSystem.BigNumSystem.getNum(3));
    }
    return {
      allCoin: o,
      cityCoin: e,
      roleCoin: t
    };
  };
  _ctor.prototype.registMainTouch = function (e) {
    var t = this;
    this.touchList = [];
    e.on(fgui.Event.TOUCH_BEGIN, this.layerTouchStart.bind(this), this);
    var o = 0;
    e.on(fgui.Event.TOUCH_END, function (e) {
      var i = e.touchId;
      var s = t.touchList.indexOf(i);
      if (-1 != s && (t.touchNum++, !(t.touchNum > t.touchMaxNum))) {
        t.touchList.splice(s, 1);
        var r = e.pos;
        t.playTouchEfeect(r);
        r_SoundMgr.SoundMgr.playSound("大厅点击屏幕音效");
        o >= 5 && r_GameGuideUI.default.finishStep(1);
        r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.touchEarn);
        o++;
      }
    }, this);
  };
  _ctor.prototype.playTouchEfeect = function (e) {
    var t = cc.v2(r_MainHomeUI.default.Inst.contentPane.getChild("head").x, r_MainHomeUI.default.Inst.contentPane.getChild("head").y);
    r_MainHomeUI.default.Inst.contentPane.globalToLocal(e.x, e.y, this.tempPos);
    r_MainHomeUI.default.Inst.playBbq();
    var o = this.getClickCoin();
    r_PlayerData.PlayerData.addCoin("每秒奖励", o, r_ReportSystem.SystemKey.雇佣系统, false, false, false);
    var s = r_PlayerData.PlayerData.data.earnTimestamp[i.连点] + 1 > 7 ? 7 : r_PlayerData.PlayerData.data.earnTimestamp[i.连点] + 1;
    t.sub(this.tempPos, this.vec2Temp);
    for (var r = 0; r < s; r++) {
      this.tempPos.add(this.vec2Temp.clone().mulSelf(.1 * r), this.vec2Temp2);
      this.flyCoinAnim(this.vec2Temp2, t);
    }
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.touchEarn);
  };
  _ctor.prototype.layerTouchStart = function (e) {
    var t = this;
    var i = e.touchId;
    e.captureTouch();
    exports.CoinSystem.isAutoClick && (this.touchList.length >= this.getFingerNum() || -1 == this.touchList.indexOf(i) && (this.touchList.push(i), r_TimeSystem.TimeSystem.scheduleOnce("fingerUnregist" + i, 5, function () {
      var e = t.touchList.indexOf(i);
      if (-1 != e) {
        console.log("失效的touchId=", i);
        t.touchList.splice(e, 1);
      }
    })));
  };
  _ctor.prototype.getFingerNum = function () {
    return 1;
  };
  _ctor.prototype.setAutoTime = function (e) {
    r_PlayerData.PlayerData.data.earnTimestamp[e] += this.autoAddTime;
  };
  _ctor.prototype.getHasAutoTouch = function (e) {
    return this.getAutoTime(e) > 0;
  };
  _ctor.prototype.getAutoTime = function (e) {
    return r_PlayerData.PlayerData.data.earnTimestamp[e];
  };
  _ctor.prototype.getContinueCoff = function () {
    this.checkContimieMax() && (r_PlayerData.PlayerData.data.earnTimestamp[i.连点] = exports.ContinueCoff.length - 1);
    return exports.ContinueCoff[r_PlayerData.PlayerData.data.earnTimestamp[i.连点]];
  };
  _ctor.prototype.showContinueCoff = function () {
    this.checkContimieMax() && (r_PlayerData.PlayerData.data.earnTimestamp[i.连点] = exports.ContinueCoff.length - 1);
    return exports.ContinueCoff[r_PlayerData.PlayerData.data.earnTimestamp[i.连点] + 1] || null;
  };
  _ctor.prototype.setContinue = function () {
    if (this.checkContimieMax()) {
      r_PlayerData.PlayerData.data.earnTimestamp[i.连点] = exports.ContinueCoff.length - 1;
    } else {
      r_PlayerData.PlayerData.data.earnTimestamp[i.连点]++;
    }
  };
  _ctor.prototype.getCurContinueCoff = function () {
    return exports.ContinueCoff[r_PlayerData.PlayerData.data.earnTimestamp[i.连点]];
  };
  _ctor.prototype.checkContimieMax = function () {
    return r_PlayerData.PlayerData.data.earnTimestamp[i.连点] >= exports.ContinueCoff.length - 1;
  };
  return _ctor;
}();
exports._CoinSystem = exp__CoinSystem;
exports.CoinSystem = new exp__CoinSystem();
(function (e) {
  e["自动"] = "auto";
  e["倍数"] = "multiple";
  e["连点"] = "continue";
})(i = exports.EarnTimeType || (exports.EarnTimeType = {}));
exports.ContinueCoff = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 30, 32, 34, 36, 38, 40];