Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskState = exports.TaskSystem = exports._TaskSystem = undefined;
var i;
var r_TaskCfg = require("TaskCfg");
var r_TaskUI = require("TaskUI");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_RoleSystem = require("RoleSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp__TaskSystem = function () {
  function _ctor() {}
  _ctor.prototype.iniData = function () {
    r_PlayerData.PlayerData.data.taskMap || (r_PlayerData.PlayerData.data.taskMap = {});
    r_PlayerData.PlayerData.data.taskMap.main || (r_PlayerData.PlayerData.data.taskMap.main = {});
    if (r_PlayerData.PlayerData.data.taskMap.main.locks) {
      if (this.getTapList().length - r_PlayerData.PlayerData.data.taskMap.main.locks.length > 0) {
        for (var e = r_PlayerData.PlayerData.data.taskMap.main.locks.length - 1; e < this.getTapList().length; e++) {
          r_PlayerData.PlayerData.data.taskMap.main.locks.push(false);
        }
      }
    } else {
      r_PlayerData.PlayerData.data.taskMap.main.locks = [];
      for (var t = 0; t < this.getTapList().length; t++) {
        r_PlayerData.PlayerData.data.taskMap.main.locks.push(false);
      }
    }
    if (r_PlayerData.PlayerData.data.taskMap.main.list) {
      var o = this.getTapList();
      var i = r_TaskCfg.TaskCfgClass.TaskMainCfg.length;
      var a = function () {
        var e = o[t].list;
        var i = r_PlayerData.PlayerData.data.taskMap.main.list[t];
        e.filter(function (e) {
          i.findIndex(function (t) {
            return e.id == t.id;
          });
        }).forEach(function (e) {
          r_PlayerData.PlayerData.data.taskMap.main.list[t].push({
            id: e.id,
            isGet: false
          });
        });
      };
      for (t = 0; t < i; t++) {
        a();
      }
      for (t = 0; t < i; t++) {
        var s = r_PlayerData.PlayerData.data.taskMap.main.list[t];
        var c = function (e) {
          var i = s[e];
          -1 == o[t].list.findIndex(function (e) {
            return e.id == i.id;
          }) && s.splice(e, 1);
        };
        for (var l = s.length - 1; l >= 0; l--) {
          c(l);
        }
      }
    } else {
      r_PlayerData.PlayerData.data.taskMap.main.list = [];
      for (var u = 0; u < this.getTapList().length; u++) {
        r_PlayerData.PlayerData.data.taskMap.main.list.push([]);
        for (t = 0; t < this.getMainList(u).length; t++) {
          var h = this.getMainList(u)[t];
          r_PlayerData.PlayerData.data.taskMap.main.list[u].push({
            id: h.id,
            isGet: false
          });
        }
      }
    }
    r_PlayerData.PlayerData.data.taskMap.dayTask || (r_PlayerData.PlayerData.data.taskMap.dayTask = {});
    r_PlayerData.PlayerData.data.taskMap.dayTask.awards || (r_PlayerData.PlayerData.data.taskMap.dayTask.awards = [false, false, false]);
    if (r_PlayerData.PlayerData.data.taskMap.dayTask.list) {
      var p = r_PlayerData.PlayerData.data.taskMap.dayTask.list;
      var d = this.getDayCfg();
      if (p.length == d.length) {
        var y = true;
        p.forEach(function (e) {
          -1 == d.findIndex(function (t) {
            return e.id == t.id;
          }) && (y = false);
        });
        if (!y) {
          this.initDayList();
          r_PlayerData.PlayerData.data.taskMap.dayTask.awards = [false, false, false];
          r_PlayerData.PlayerData.data.taskMap.dayTask.exp = 0;
        }
      } else {
        this.initDayList();
        r_PlayerData.PlayerData.data.taskMap.dayTask.awards = [false, false, false];
        r_PlayerData.PlayerData.data.taskMap.dayTask.exp = 0;
      }
    } else {
      this.initDayList();
    }
    r_PlayerData.PlayerData.data.taskMap.dayTask.exp || (r_PlayerData.PlayerData.data.taskMap.dayTask.exp = 0);
    var f = new Date().toLocaleDateString();
    if (r_PlayerData.PlayerData.data.taskMap.dayTask.saveTime != f) {
      this.initDayList();
      r_PlayerData.PlayerData.data.taskMap.dayTask.exp = 0;
      r_PlayerData.PlayerData.data.taskMap.dayTask.awards = [false, false, false];
      r_PlayerData.PlayerData.data.taskMap.dayTask.saveTime = f;
    }
    this.addDayTaskValue(r_TaskCfg.TaskDayType.登录游戏);
  };
  _ctor.prototype.initDayList = function () {
    var e = this.getDayCfg();
    r_PlayerData.PlayerData.data.taskMap.dayTask.list = [];
    e.forEach(function (e) {
      r_PlayerData.PlayerData.data.taskMap.dayTask.list.push({
        id: e.id,
        maxNum: e.maxNum,
        value: 0,
        isGet: false,
        type: e.type,
        exp: e.award
      });
    });
  };
  _ctor.prototype.sortMainList = function () {
    var e = this;
    this.getTapList().forEach(function (t, o) {
      r_PlayerData.PlayerData.data.taskMap.main.list[o].sort(function (t, i) {
        return e.getMainItemState(o, i.id) - e.getMainItemState(o, t.id);
      });
    });
    r_PlayerData.PlayerData.data.taskMap.dayTask.list.sort(function (t, o) {
      return e.getDayItemState(o.id) - e.getDayItemState(t.id);
    });
  };
  _ctor.prototype.unlockTop = function (e) {
    r_PlayerData.PlayerData.data.taskMap.main.locks[e] = true;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.getMainTaskPanelId = function () {
    var e = this;
    var t = this.getTapList();
    for (var o = 0; o < t.length; o++) {
      var i = t[o];
      if (r_DaySystem.DaySystem.getShowDay() >= i.day && !r_PlayerData.PlayerData.data.taskMap.main.locks[o]) {
        return {
          index: o,
          id: null
        };
      }
    }
    for (o = 0; o < t.length; o++) {
      if (r_PlayerData.PlayerData.data.taskMap.main.locks[o]) {
        var n = this.getMainData(o).find(function (t) {
          return e.getMainItemState(o, t.id) >= 2;
        });
        if (n) {
          return {
            index: o,
            id: n.id
          };
        }
      }
    }
    return null;
  };
  _ctor.prototype.getTapList = function () {
    return r_TaskCfg.TaskCfgClass.TaskMainCfg;
  };
  _ctor.prototype.getMainList = function (e) {
    return r_TaskCfg.TaskCfgClass.TaskMainCfg[e].list;
  };
  _ctor.prototype.getMainCfg = function (e, t) {
    return this.getMainList(e).find(function (e) {
      return e.id == t;
    });
  };
  _ctor.prototype.getMainData = function (e) {
    return r_PlayerData.PlayerData.data.taskMap.main.list[e];
  };
  _ctor.prototype.getMainItemData = function (e, t) {
    return this.getMainData(e).find(function (e) {
      return e.id == t;
    });
  };
  _ctor.prototype.getTapIsOpen = function (e) {
    return this.getTapList()[e].isOpen;
  };
  _ctor.prototype.getTapIsLock = function (e) {
    return this.getTapList()[e].day <= r_DaySystem.DaySystem.getShowDay();
  };
  _ctor.prototype.getMainLock = function (e) {
    return r_PlayerData.PlayerData.data.taskMap.main.locks[e];
  };
  _ctor.prototype.getMainItemState = function (e, t) {
    var o = this.getMainList(e).find(function (e) {
      return e.id == t;
    });
    switch (o.type) {
      case r_TaskCfg.TaskMainType.秘书数量:
        return this.getMainTaskState(e, t, r_SecretUpSystem.SecretUpSystem.getSecretList().length, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.挑战次数:
        return this.getMainTaskState(e, t, r_RoleSystem.RoleSystem.getRoleLevel(), o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.打螺丝:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.makeNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.刮刮乐:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.luckyNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.买石头:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.rockNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.买榴莲:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.fruitsNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.弹球:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.tanqiuNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.升级秘书:
        return this.getMainTaskState(e, t, this.getSecretLevelTask(), o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.领取财神:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.flyGodNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.买油田:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.fieldNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.抓狗:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.catchDogNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.锻造武器:
        return this.getMainTaskState(e, t, r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons), o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.使用熔炉:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.fairyLandTgNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.拜招财猫:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.godWealthNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.房产数量:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.houseData.hasHouseId, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.研发产品:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.industrysNum, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.点击能力:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.mainHome.touchLevel, o.maxNum, o.minNum);
      case r_TaskCfg.TaskMainType.挑战老马:
      case r_TaskCfg.TaskMainType.付清彩礼:
      case r_TaskCfg.TaskMainType.完成结婚:
        return this.getMainTaskState(e, t, r_PlayerData.PlayerData.data.newGuideType, o.maxNum, o.minNum);
    }
    return i.未知;
  };
  _ctor.prototype.getMainTaskValue = function (e) {
    switch (e) {
      case r_TaskCfg.TaskMainType.秘书数量:
        return r_SecretUpSystem.SecretUpSystem.getSecretList().length;
      case r_TaskCfg.TaskMainType.挑战次数:
        return r_RoleSystem.RoleSystem.getRoleLevel();
      case r_TaskCfg.TaskMainType.打螺丝:
        return r_PlayerData.PlayerData.data.makeNum;
      case r_TaskCfg.TaskMainType.刮刮乐:
        return r_PlayerData.PlayerData.data.luckyNum;
      case r_TaskCfg.TaskMainType.买石头:
        return r_PlayerData.PlayerData.data.rockNum;
      case r_TaskCfg.TaskMainType.买榴莲:
        return r_PlayerData.PlayerData.data.fruitsNum;
      case r_TaskCfg.TaskMainType.弹球:
        return r_PlayerData.PlayerData.data.tanqiuNum;
      case r_TaskCfg.TaskMainType.升级秘书:
        return this.getSecretLevelTask();
      case r_TaskCfg.TaskMainType.领取财神:
        return r_PlayerData.PlayerData.data.flyGodNum;
      case r_TaskCfg.TaskMainType.买油田:
        return r_PlayerData.PlayerData.data.fieldNum;
      case r_TaskCfg.TaskMainType.抓狗:
        return r_PlayerData.PlayerData.data.catchDogNum;
      case r_TaskCfg.TaskMainType.锻造武器:
        return r_UtilsSystem.UtilsSystem.getMapNum(r_PlayerData.PlayerData.data.weapon.weapons);
      case r_TaskCfg.TaskMainType.使用熔炉:
        return r_PlayerData.PlayerData.data.fairyLandTgNum;
      case r_TaskCfg.TaskMainType.拜招财猫:
        return r_PlayerData.PlayerData.data.godWealthNum;
      case r_TaskCfg.TaskMainType.房产数量:
        return r_PlayerData.PlayerData.data.houseData.hasHouseId;
      case r_TaskCfg.TaskMainType.研发产品:
        return r_PlayerData.PlayerData.data.industrysNum;
      case r_TaskCfg.TaskMainType.点击能力:
        return r_PlayerData.PlayerData.data.mainHome.touchLevel;
      case r_TaskCfg.TaskMainType.挑战老马:
        if (r_PlayerData.PlayerData.data.newGuideType >= 1) {
          return 1;
        } else {
          return 0;
        }
      case r_TaskCfg.TaskMainType.付清彩礼:
        if (r_PlayerData.PlayerData.data.newGuideType >= 2) {
          return 2;
        } else {
          return 1;
        }
      case r_TaskCfg.TaskMainType.完成结婚:
        if (r_PlayerData.PlayerData.data.newGuideType >= 3) {
          return 3;
        } else {
          return 2;
        }
    }
  };
  _ctor.prototype.addDayTaskValue = function (e) {
    this.getDayItemByType(e).forEach(function (e) {
      return e.value++;
    });
    r_PlayerData.PlayerData.saveData();
    r_TaskUI.default.Inst && r_TaskUI.default.Inst.restart();
  };
  _ctor.prototype.getDayItemState = function (e) {
    var t = this.getDayItem(e);
    var o = t.value;
    var n = t.maxNum;
    var a = t.isGet;
    if (null == o) {
      return i.未知;
    } else if (a) {
      return i.已领取;
    } else if (o <= 0) {
      return i.未开始;
    } else if (o > 0 && o < n) {
      return i.进行中;
    } else if (o >= n) {
      return i.已完成;
    } else {
      return undefined;
    }
  };
  _ctor.prototype.checkDayTasksState = function () {
    var e = this;
    return -1 != this.getDayList().findIndex(function (t) {
      return e.getDayItemState(t.id) == i.已完成;
    });
  };
  _ctor.prototype.checkMainTasksState = function () {
    var e = this;
    var t = false;
    var o = r_PlayerData.PlayerData.data.taskMap.main.locks.findIndex(function (e) {
      return !e;
    });
    var n = -1 == o ? this.getTapList().length : o;
    var a = function (o) {
      -1 != s.getMainList(o).findIndex(function (t) {
        return e.getMainItemState(o, t.id) == i.已完成;
      }) && (t = true);
    };
    var s = this;
    for (var c = 0; c < n; c++) {
      a(c);
    }
    return t;
  };
  _ctor.prototype.getMainTaskAward = function (e, t) {
    var o = this.getMainCfg(e, t);
    this.getMainItemData(e, t).isGet = true;
    r_PlayerData.PlayerData.addCoin("完成任务奖励", o.award[0], r_ReportSystem.SystemKey.任务系统);
    r_PlayerData.PlayerData.addDiamond(r_RoleSystem.ExpType.点击, o.award[1] / 20);
  };
  _ctor.prototype.getDayTaskAward = function (e) {
    var t = this.getDayInfo(e);
    this.getDayItem(e).isGet = true;
    r_PlayerData.PlayerData.data.taskMap.dayTask.exp += t.award;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.getDayTaskAllExp = function () {
    var e = this.getDayList().filter(function (e) {
      return e.isGet;
    });
    var t = 0;
    e.forEach(function (e) {
      return t += e.exp;
    });
    return t;
  };
  _ctor.prototype.getSecretLevelTask = function () {
    var e = 1;
    r_SecretUpSystem.SecretUpSystem.getSecretList().forEach(function (t) {
      var o = r_SecretUpSystem.SecretUpSystem.getLevelByFeel(t.id, t.feel);
      e < o && (e = o);
    });
    return e;
  };
  _ctor.prototype.getMainTaskState = function (e, t, o, n, a) {
    if (null == o) {
      return i.未知;
    } else if (r_PlayerData.PlayerData.data.taskMap.main.list[e].find(function (e) {
      return e.id == t;
    }).isGet) {
      return i.已领取;
    } else if (o <= a) {
      return i.未开始;
    } else if (o > a && o < n) {
      return i.进行中;
    } else if (o >= n) {
      return i.已完成;
    } else {
      return undefined;
    }
  };
  _ctor.prototype.getDayCfg = function () {
    return r_TaskCfg.TaskCfgClass.TaskDayCfg;
  };
  _ctor.prototype.getDayInfo = function (e) {
    return r_TaskCfg.TaskCfgClass.TaskDayCfg.find(function (t) {
      return t.id == e;
    });
  };
  _ctor.prototype.getDayList = function () {
    return r_PlayerData.PlayerData.data.taskMap.dayTask.list;
  };
  _ctor.prototype.getDayItem = function (e) {
    return r_PlayerData.PlayerData.data.taskMap.dayTask.list.find(function (t) {
      return e == t.id;
    });
  };
  _ctor.prototype.getDayItemByType = function (e) {
    return r_PlayerData.PlayerData.data.taskMap.dayTask.list.filter(function (t) {
      return e == t.type;
    });
  };
  _ctor.prototype.getDayAwardList = function () {
    return r_PlayerData.PlayerData.data.taskMap.dayTask.awards;
  };
  _ctor.prototype.getDayAward = function (e) {
    r_PlayerData.PlayerData.data.taskMap.dayTask.awards[e] = true;
  };
  return _ctor;
}();
exports._TaskSystem = exp__TaskSystem;
exports.TaskSystem = new exp__TaskSystem();
(function (e) {
  e[e["未知"] = 0] = "未知";
  e[e["已领取"] = 1] = "已领取";
  e[e["未开始"] = 2] = "未开始";
  e[e["进行中"] = 3] = "进行中";
  e[e["已完成"] = 4] = "已完成";
})(i = exports.TaskState || (exports.TaskState = {}));