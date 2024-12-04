Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatSystem = exports._ChatSystem = undefined;
var r_ChatTaskCfg = require("ChatTaskCfg");
var r_SoundMgr = require("SoundMgr");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var exp__ChatSystem = function () {
  function _ctor() {
    this.monkeyTaskId = 15;
    this.ggBondTaskId = 45;
    this.oneTimeTaskList = [15, 45];
    this.noShowTaskList = [16];
    this.chatBgSpriteFrame1 = null;
    this.chatBgSpriteFrame2 = null;
    this.chatTaskMap = {};
    this.redPacketPrefab = null;
    this.transferPrefab = null;
  }
  _ctor.prototype.init = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/chat/chatBg1", cc.SpriteFrame, function (t, o) {
      e.chatBgSpriteFrame1 = o;
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/chat/chatBg2", cc.SpriteFrame, function (t, o) {
      e.chatBgSpriteFrame2 = o;
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "uiPrefabs/redPacket", cc.Prefab, function (t, o) {
      e.redPacketPrefab = o;
    });
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/chat/prefab/zhuanzhang", cc.Prefab, function (t, o) {
      e.transferPrefab = o;
    });
    for (var t = 0; t < r_ChatTaskCfg.ChatTaskCfg.length; t++) {
      this.chatTaskMap[r_ChatTaskCfg.ChatTaskCfg[t].id] = r_ChatTaskCfg.ChatTaskCfg[t];
    }
    this.checkTriggerTask();
  };
  _ctor.prototype.getChatTaskById = function (e) {
    return this.chatTaskMap[e];
  };
  _ctor.prototype.isOneTimeTask = function (e) {
    return -1 != this.oneTimeTaskList.indexOf(e);
  };
  _ctor.prototype.isNotShowTask = function (e) {
    return -1 != this.noShowTaskList.indexOf(e);
  };
  _ctor.prototype.isTaskDoing = function (e) {
    return -1 != r_PlayerData.PlayerData.data.curChatTaskList.indexOf(e);
  };
  _ctor.prototype.isTaskFinish = function (e) {
    return -1 != r_PlayerData.PlayerData.data.finishChatTaskList.indexOf(e);
  };
  _ctor.prototype.resetData = function () {
    if (!this.chatTaskMap[1]) {
      for (var e = 0; e < r_ChatTaskCfg.ChatTaskCfg.length; e++) {
        this.chatTaskMap[r_ChatTaskCfg.ChatTaskCfg[e].id] = r_ChatTaskCfg.ChatTaskCfg[e];
      }
    }
    if (r_PlayerData.PlayerData.data.curChatTaskList.length > 0) {
      this.clearList(r_PlayerData.PlayerData.data.curChatTaskList);
      r_PlayerData.PlayerData.data.curChatTaskList = this.getScreenList(r_PlayerData.PlayerData.data.curChatTaskList);
      return void this.clearList(r_PlayerData.PlayerData.data.finishChatTaskList);
    }
  };
  _ctor.prototype.clearList = function (e) {
    var t = function (t) {
      var o = e[t];
      -1 == r_ChatTaskCfg.ChatTaskCfg.findIndex(function (e) {
        return e.id == o;
      }) && e.splice(t, 1);
    };
    for (var o = e.length - 1; o >= 0; o--) {
      t(o);
    }
    return e;
  };
  _ctor.prototype.getScreenList = function (e) {
    var t = [];
    var i = [];
    e.forEach(function (e) {
      var n = exports.ChatSystem.getChatTaskById(e).name;
      if (!i.includes(n)) {
        i.push(n);
        t.push(e);
      }
    });
    return t;
  };
  _ctor.prototype.checkTriggerTask = function () {
    var e = {};
    for (var t = 0; t < r_PlayerData.PlayerData.data.curChatTaskList.length; t++) {
      var o = r_PlayerData.PlayerData.data.curChatTaskList[t];
      e[(l = this.getChatTaskById(o)).personId] = true;
    }
    var r = false;
    var c = r_DaySystem.DaySystem.getShowDay();
    for (t = 0; t < r_ChatTaskCfg.ChatTaskCfg.length; t++) {
      var l;
      if (!(e[(l = r_ChatTaskCfg.ChatTaskCfg[t]).personId] || this.isTaskFinish(l.id) || this.isTaskDoing(l.id) || l.beforeTaskId && !this.isTaskFinish(l.beforeTaskId) || l.triggerDay && l.triggerDay > c || l.emergencyId)) {
        r_PlayerData.PlayerData.data.curChatTaskList.push(l.id);
        r = true;
      }
    }
    if (r) {
      r_SoundMgr.SoundMgr.playSound("xinxiaoxi");
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.addNewChatTaskById = function (e) {
    var t = {};
    for (var o = 0; o < r_PlayerData.PlayerData.data.curChatTaskList.length; o++) {
      var r = r_PlayerData.PlayerData.data.curChatTaskList[o];
      t[(l = this.getChatTaskById(r)).personId] = true;
    }
    var c = false;
    r_DaySystem.DaySystem.getShowDay();
    for (o = 0; o < r_ChatTaskCfg.ChatTaskCfg.length; o++) {
      var l;
      if (e == (l = r_ChatTaskCfg.ChatTaskCfg[o]).id && l.emergencyId) {
        if (t[l.personId] || this.isTaskFinish(l.id) || this.isTaskDoing(l.id)) {
          continue;
        }
        if (l.beforeTaskId && !this.isTaskFinish(l.beforeTaskId)) {
          continue;
        }
        r_PlayerData.PlayerData.data.curChatTaskList.push(l.id);
        c = true;
      }
    }
    if (c) {
      r_SoundMgr.SoundMgr.playSound("xinxiaoxi");
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.needShowRedTip = function () {
    var e = this;
    return r_PlayerData.PlayerData.data.curChatTaskList.filter(function (t) {
      return !e.oneTimeTaskList.includes(t) && !e.noShowTaskList.includes(t);
    }).length > 0;
  };
  _ctor.prototype.getMsgNum = function () {
    var e = this;
    console.log(r_PlayerData.PlayerData.data.curChatTaskList);
    return r_PlayerData.PlayerData.data.curChatTaskList.filter(function (t) {
      return !e.oneTimeTaskList.includes(t) && !e.noShowTaskList.includes(t);
    }).length;
  };
  _ctor.prototype.triggerTask = function (e) {
    if (!this.isTaskDoing(e)) {
      r_PlayerData.PlayerData.data.curChatTaskList.push(e);
      r_SoundMgr.SoundMgr.playSound("xinxiaoxi");
      r_PlayerData.PlayerData.saveData();
    }
  };
  return _ctor;
}();
exports._ChatSystem = exp__ChatSystem;
exports.ChatSystem = new exp__ChatSystem();