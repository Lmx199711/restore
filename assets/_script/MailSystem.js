Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailSystem = exports._MailSystem = undefined;
var r_MailCfg = require("MailCfg");
var r_DebugSystem = require("DebugSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var exp__MailSystem = function () {
  function _ctor() {
    this.monkeyMailId = 5;
    this.mailCfgMap = {};
  }
  _ctor.prototype.init = function () {
    for (var e = 0; e < r_MailCfg.MailItemCfg.length; e++) {
      this.mailCfgMap[r_MailCfg.MailItemCfg[e].id] = r_MailCfg.MailItemCfg[e];
    }
  };
  _ctor.prototype.getMailCfg = function (e) {
    return this.mailCfgMap[e];
  };
  _ctor.prototype.getRandomMail = function (e) {
    undefined === e && (e = false);
    var t = r_DebugSystem.DebugSystem.getMailRareCfg(e);
    var o = r_UtilsSystem.UtilsSystem.randomPercentFromArray(t);
    if (r_PlayerData.PlayerData.data.mailData.curLucky >= 100) {
      r_PlayerData.PlayerData.data.mailData.curLucky = r_PlayerData.PlayerData.data.mailData.curLucky - 100;
      o = t[3];
    }
    var r = [];
    for (var c = 0; c < r_MailCfg.MailItemCfg.length; c++) {
      var l = r_MailCfg.MailItemCfg[c];
      l.rare == o.rare && r.push(l);
    }
    return r_UtilsSystem.UtilsSystem.getRandomFromArr(r);
  };
  _ctor.prototype.checkInit = function () {
    if (!r_PlayerData.PlayerData.data.mailData.mailList) {
      r_PlayerData.PlayerData.data.mailData.mailList = [];
      r_PlayerData.PlayerData.data.mailData.curLucky = 0;
      r_PlayerData.PlayerData.data.mailData.finishGroupList = [];
    }
  };
  _ctor.prototype.hasMail = function (e) {
    var t = r_PlayerData.PlayerData.data.mailData.mailList;
    for (var o = 0; o < t.length; o++) {
      if (t[o] == e.id) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.addMail = function (e) {
    if (!(r_PlayerData.PlayerData.data.mailData.mailList.indexOf(e.id) > -1)) {
      r_PlayerData.PlayerData.data.mailData.mailList.push(e.id);
      this.checkFinishGroup(e);
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.removeMail = function (e) {
    var t = r_PlayerData.PlayerData.data.mailData.mailList;
    for (var o = t.length - 1; o >= 0; o--) {
      e == t[o] && r_PlayerData.PlayerData.data.mailData.mailList.splice(o, 1);
    }
  };
  _ctor.prototype.removeGroup = function (e) {
    var t = r_PlayerData.PlayerData.data.mailData.mailList;
    for (var o = t.length - 1; o >= 0; o--) {
      e == this.mailCfgMap[t[o]].groupId && r_PlayerData.PlayerData.data.mailData.mailList.splice(o, 1);
    }
    var i = r_PlayerData.PlayerData.data.mailData.finishGroupList;
    for (o = i.length - 1; o >= 0; o--) {
      e == i[o] && r_PlayerData.PlayerData.data.mailData.finishGroupList.splice(o, 1);
    }
  };
  _ctor.prototype.checkFinishGroup = function (e) {
    r_PlayerData.PlayerData.data.mailData.finishGroupList.indexOf(e.groupId) > -1 || r_PlayerData.PlayerData.data.mailData.finishGroupList.push(e.groupId);
  };
  _ctor.prototype.hasFinishGroup = function (e) {
    return -1 != r_PlayerData.PlayerData.data.mailData.finishGroupList.indexOf(e);
  };
  _ctor.prototype.addLucky = function () {
    r_PlayerData.PlayerData.data.mailData.curLucky = r_PlayerData.PlayerData.data.mailData.curLucky + 1;
  };
  _ctor.prototype.getGroupMaxNum = function (e) {
    var t = 0;
    for (var o = 0; o < r_MailCfg.MailItemCfg.length; o++) {
      r_MailCfg.MailItemCfg[o].groupId == e && (t += 1);
    }
    return t;
  };
  _ctor.prototype.getMyGroupNum = function (e) {
    var t = 0;
    for (var o = 0; o < r_PlayerData.PlayerData.data.mailData.mailList.length; o++) {
      var i = r_PlayerData.PlayerData.data.mailData.mailList[o];
      this.mailCfgMap[i].groupId == e && (t += 1);
    }
    return t;
  };
  _ctor.prototype.getMyGroup = function (e) {
    var t = [];
    for (var o = 0; o < r_PlayerData.PlayerData.data.mailData.mailList.length; o++) {
      var i = r_PlayerData.PlayerData.data.mailData.mailList[o];
      var n = this.mailCfgMap[i];
      n.groupId == e && t.push(n);
    }
    return t;
  };
  _ctor.prototype.getAllGroupItem = function (e) {
    var t = [];
    for (var o = 0; o < r_MailCfg.MailItemCfg.length; o++) {
      var n = r_MailCfg.MailItemCfg[o];
      n.groupId == e && t.push(n);
    }
    return this.itemSort(t);
  };
  _ctor.prototype.getAllItem = function () {
    var e = r_MailCfg.MailItemCfg.filter(function () {
      return true;
    });
    return this.itemSort(e);
  };
  _ctor.prototype.itemSort = function (e) {
    var t = this;
    e.sort(function (e, o) {
      var i = t.hasMail(e);
      if (i != t.hasMail(o)) {
        if (i) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return o.rare - e.rare;
      }
    });
    return e;
  };
  _ctor.prototype.getCompIsCaidan = function (e) {
    for (var t = 0; t < r_MailCfg.MailCaiDanCfg.length; t++) {
      var o = r_MailCfg.MailCaiDanCfg[t];
      if (o.comp.includes(e[0]) && o.comp.includes(e[1])) {
        return o.result;
      }
    }
    return -1;
  };
  _ctor.prototype.getRandomComp = function (e, t) {
    var o = this.mailCfgMap[e[0]].rare + this.mailCfgMap[e[1]].rare + (t ? 2 : 0);
    var n = r_MailCfg.MailConpoundCfg[r_MailCfg.MailConpoundLevelCfg[o]];
    var a = r_UtilsSystem.UtilsSystem.randomPercentFromArray(n);
    var r = [];
    for (var c = 0; c < r_MailCfg.MailItemCfg.length; c++) {
      var l = r_MailCfg.MailItemCfg[c];
      l.rare == a.rare && r.push(l);
    }
    return r_UtilsSystem.UtilsSystem.getRandomFromArr(r);
  };
  return _ctor;
}();
exports._MailSystem = exp__MailSystem;
exports.MailSystem = new exp__MailSystem();