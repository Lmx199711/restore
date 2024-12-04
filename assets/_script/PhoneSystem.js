Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneSystem = exports._PhoneSystem = undefined;
var r_MomoPersonCfg = require("MomoPersonCfg");
var r_MomoTaskCfg = require("MomoTaskCfg");
var r_SleepAppData = require("SleepAppData");
var r_MomoTipUI = require("MomoTipUI");
var r_MomoUI = require("MomoUI");
var r_ChatSystem = require("ChatSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var exp__PhoneSystem = function () {
  function _ctor() {
    this.momoPersonMap = {};
    this.momoTaskMap = {};
  }
  _ctor.prototype.init = function () {
    for (var e = 0; e < r_MomoPersonCfg.MomoPersonCfg.length; e++) {
      this.momoPersonMap[r_MomoPersonCfg.MomoPersonCfg[e].id] = r_MomoPersonCfg.MomoPersonCfg[e];
    }
    for (e = 0; e < r_MomoTaskCfg.MomoTaskCfg.length; e++) {
      this.momoTaskMap[r_MomoTaskCfg.MomoTaskCfg[e].id] = r_MomoTaskCfg.MomoTaskCfg[e];
    }
  };
  _ctor.prototype.getPersonCfg = function (e) {
    return this.momoPersonMap[e];
  };
  _ctor.prototype.getChatTaskById = function (e) {
    return this.momoTaskMap[e];
  };
  _ctor.prototype.getTaskCfg = function (e) {
    return this.momoTaskMap[e];
  };
  _ctor.prototype.isTaskDoing = function (e) {
    return -1 != r_PlayerData.PlayerData.data.momoData.curChatTaskList.indexOf(e);
  };
  _ctor.prototype.isTaskFinish = function (e) {
    return -1 != r_PlayerData.PlayerData.data.momoData.finishChatTaskList.indexOf(e);
  };
  _ctor.prototype.needShowRedTip = function () {
    return !!r_ChatSystem.ChatSystem.needShowRedTip() || !!this.getMomoMsgNum() || !!r_SleepAppData.SleepAppData.getNewRecoredNum();
  };
  _ctor.prototype.getMomoMsgNum = function () {
    return r_PlayerData.PlayerData.data.momoData.curChatTaskList.length;
  };
  _ctor.prototype.checkOpen = function () {
    !r_PlayerData.PlayerData.data.momoData.isOpen && r_PlayerData.PlayerData.isCoinEnough(1e7) && (r_PlayerData.PlayerData.data.momoData.isOpen = true);
  };
  _ctor.prototype.resetData = function () {
    if (r_PlayerData.PlayerData.data.momoData.likeList) {
      this.clearList(r_PlayerData.PlayerData.data.momoData.curList);
      this.clearList(r_PlayerData.PlayerData.data.momoData.likeList);
      this.clearList(r_PlayerData.PlayerData.data.momoData.hateList);
      this.clearList(r_PlayerData.PlayerData.data.momoData.curChatTaskList);
      this.clearList(r_PlayerData.PlayerData.data.momoData.finishChatTaskList);
      return void this.clearList(r_PlayerData.PlayerData.data.momoData.finishChatStateMap);
    }
    r_PlayerData.PlayerData.data.momoData.isOpen = false;
    r_PlayerData.PlayerData.data.momoData.vipLevel = 0;
    r_PlayerData.PlayerData.data.momoData.selectTime = 0;
    r_PlayerData.PlayerData.data.momoData.selectNum = 0;
    r_PlayerData.PlayerData.data.momoData.curList = [];
    r_PlayerData.PlayerData.data.momoData.likeList = [];
    r_PlayerData.PlayerData.data.momoData.hateList = [];
    r_PlayerData.PlayerData.data.momoData.curChatTaskList = [];
    r_PlayerData.PlayerData.data.momoData.finishChatTaskList = [];
    r_PlayerData.PlayerData.data.momoData.finishChatStateMap = {};
  };
  _ctor.prototype.clearList = function (e) {
    var t = function (t) {
      var o = e[t];
      -1 == r_MomoTaskCfg.MomoTaskCfg.findIndex(function (e) {
        return e.id == o;
      }) && e.splice(t, 1);
    };
    for (var o = e.length - 1; o >= 0; o--) {
      t(o);
    }
    return e;
  };
  _ctor.prototype.finishChatTask = function (e, t) {
    var o = r_PlayerData.PlayerData.data.momoData;
    o.curChatTaskList.indexOf(e);
    o.curChatTaskList.splice(-1, 1);
    if (-1 == o.finishChatTaskList.indexOf(e)) {
      o.finishChatTaskList.push(e);
      t && (o.finishChatStateMap[e] = t);
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.getNewPerson = function () {
    var e = [];
    for (var t = 0; t < r_MomoPersonCfg.MomoPersonCfg.length; t++) {
      var o = r_MomoPersonCfg.MomoPersonCfg[t].id;
      r_PlayerData.PlayerData.data.momoData.curList.indexOf(o) > -1 || r_PlayerData.PlayerData.data.momoData.likeList.indexOf(o) > -1 || r_PlayerData.PlayerData.data.momoData.hateList.indexOf(o) > -1 || e.push(o);
    }
    if (e.length <= 0) {
      for (t = 0; t < r_PlayerData.PlayerData.data.momoData.hateList.length; t++) {
        o = r_PlayerData.PlayerData.data.momoData.hateList[t];
        r_PlayerData.PlayerData.data.momoData.curList.indexOf(o) > -1 || e.push(o);
      }
    }
    if (e.length <= 0) {
      for (t = 0; t < r_PlayerData.PlayerData.data.momoData.likeList.length; t++) {
        o = r_PlayerData.PlayerData.data.momoData.likeList[t];
        r_PlayerData.PlayerData.data.momoData.curList.indexOf(o) > -1 || e.push(o);
      }
    }
    return r_UtilsSystem.UtilsSystem.getRandomFromArr(e);
  };
  _ctor.prototype.checkInitCurList = function () {
    var e = 3 - r_PlayerData.PlayerData.data.momoData.curList.length;
    if (!(e <= 0)) {
      for (var t = 0; t < e; t++) {
        var o = this.getNewPerson();
        r_PlayerData.PlayerData.data.momoData.curList.push(o);
      }
    }
  };
  _ctor.prototype.canSelect = function () {
    return !(r_PlayerData.PlayerData.data.momoData.selectNum >= this.getMaxSelectNum());
  };
  _ctor.prototype.getMaxSelectNum = function () {
    if (r_PlayerData.PlayerData.data.momoData.vipLevel) {
      if (1 == r_PlayerData.PlayerData.data.momoData.vipLevel) {
        return 3;
      } else if (r_PlayerData.PlayerData.data.momoData.vipLevel >= 2) {
        return 5;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  };
  _ctor.prototype.addToHate = function () {
    var e = r_PlayerData.PlayerData.data.momoData.curList[0];
    r_PlayerData.PlayerData.data.momoData.curList.splice(0, 1);
    var t = this.getNewPerson();
    r_PlayerData.PlayerData.data.momoData.curList.push(t);
    -1 == r_PlayerData.PlayerData.data.momoData.hateList.indexOf(e) && r_PlayerData.PlayerData.data.momoData.hateList.push(e);
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.addToLove = function () {
    var e = r_PlayerData.PlayerData.data.momoData.curList[0];
    r_UtilsSystem.UtilsSystem.getRandomNum(1, 100) <= 50 && r_MomoTipUI.MomoTipUI.showUI({
      mode: 1,
      id: e
    });
    r_PlayerData.PlayerData.data.momoData.curList.splice(0, 1);
    var t = this.getNewPerson();
    r_PlayerData.PlayerData.data.momoData.curList.push(t);
    -1 == r_PlayerData.PlayerData.data.momoData.likeList.indexOf(e) && r_PlayerData.PlayerData.data.momoData.likeList.push(e);
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.addToChatList = function (e) {
    var t = exports.PhoneSystem.getPersonCfg(e).chatId;
    r_UtilsSystem.UtilsSystem.removeFromArray(r_PlayerData.PlayerData.data.momoData.curChatTaskList, t);
    r_UtilsSystem.UtilsSystem.removeFromArray(r_PlayerData.PlayerData.data.momoData.finishChatTaskList, t);
    r_PlayerData.PlayerData.data.momoData.finishChatStateMap[t] = null;
    r_PlayerData.PlayerData.data.momoData.curChatTaskList.push(t);
    r_PlayerData.PlayerData.saveData();
    r_MomoUI.MomoUI.Inst && r_MomoUI.MomoUI.Inst.refreshChatList();
  };
  _ctor.prototype.nextDay = function () {
    r_PlayerData.PlayerData.data.momoData.selectNum = 0;
    r_MomoUI.MomoUI.Inst && r_MomoUI.MomoUI.Inst.refreshSelectNum();
  };
  return _ctor;
}();
exports._PhoneSystem = exp__PhoneSystem;
exports.PhoneSystem = new exp__PhoneSystem();