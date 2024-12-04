var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignInUI = undefined;
var s;
var r_UIDef = require("UIDef");
var r_CoinSystem = require("CoinSystem");
var r_LevelRoleSystem = require("LevelRoleSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_RoleGirlSystem = require("RoleGirlSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_RoleGirlGetUI = require("RoleGirlGetUI");
(function (e) {
  e[e["三倍收益"] = 1] = "三倍收益";
  e[e["秘书"] = 2] = "秘书";
  e[e["连点器等级"] = 3] = "连点器等级";
  e[e["等级"] = 4] = "等级";
  e[e["金币"] = 5] = "金币";
})(s || (s = {}));
var exp_SignInUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SignIn, r_UIDef.UIDef.Res.UI.SignInUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SignInUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SignInUI);
  };
  _ctor.checkNextDay = function () {
    r_PlayerData.PlayerData.data.SignInStamp || (r_PlayerData.PlayerData.data.SignInStamp = r_TimeSystem.TimeSystem.getServerTime());
    if (r_PlayerData.PlayerData.data.curSignState > 0 && r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.SignInStamp)) {
      r_PlayerData.PlayerData.data.SignInStamp = r_TimeSystem.TimeSystem.getServerTime();
      r_PlayerData.PlayerData.data.curSignState = 0;
      r_PlayerData.PlayerData.data.curSignIndex = r_PlayerData.PlayerData.data.curSignIndex + 1;
    }
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.signState = this.contentPane.getController("signState");
    this.btnBack.onClick(this.hide, this);
    this.list.numItems = 6;
    this.btnGet.onClick(this.onClickGet, this);
    this.btnVideoGet.onClick(this.onClickVideoGet, this);
    this.updateDesc();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.checkNextDay();
    var t = r_PlayerData.PlayerData.data.curSignIndex;
    r_PlayerData.PlayerData.data.curSignState > 0 && (t += 1);
    this.day.text = t + "";
    this.refreshUI();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.updateDesc = function () {
    for (var e = 0; e < this.list.numChildren; e++) {
      this.list.getChildAt(e).asCom.getController("day").selectedIndex = e;
    }
  };
  _ctor.prototype.onClickGet = function () {
    this.signSuc();
  };
  _ctor.prototype.onClickVideoGet = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("再签一次" + (r_PlayerData.PlayerData.data.curSignIndex + 1), function () {
      e.signSuc();
    });
  };
  _ctor.prototype.refreshUI = function () {
    for (var e = 0; e < this.list.numChildren; e++) {
      var t = this.list.getChildAt(e).asCom;
      t.getController("day").selectedIndex = e;
      var o = t.getController("state");
      var i = t.getController("select");
      if (e == r_PlayerData.PlayerData.data.curSignIndex) {
        o.selectedIndex = r_PlayerData.PlayerData.data.curSignState >= 1 ? 0 : 2;
        i.selectedIndex = 1;
      } else if (e < r_PlayerData.PlayerData.data.curSignIndex) {
        o.selectedIndex = 0;
        i.selectedIndex = 0;
      } else {
        o.selectedIndex = 2;
        i.selectedIndex = 0;
      }
    }
    var n = this.btnDay7.getController("state");
    var a = this.btnDay7.getController("select");
    if (r_PlayerData.PlayerData.data.curSignIndex <= 6) {
      n.selectedIndex = 1;
    } else {
      n.selectedIndex = 0;
    }
    a.selectedIndex = 6 == r_PlayerData.PlayerData.data.curSignIndex ? 1 : 0;
    this.refreshBtn();
  };
  _ctor.prototype.refreshBtn = function () {
    var e = _ref__ctor.signCfgs[r_PlayerData.PlayerData.data.curSignIndex];
    if (0 == r_PlayerData.PlayerData.data.curSignState) {
      this.signState.selectedIndex = 2;
    } else if (1 != r_PlayerData.PlayerData.data.curSignState || e.noAgain) {
      this.signState.selectedIndex = 0;
    } else {
      this.signState.selectedIndex = 1;
    }
  };
  _ctor.prototype.signSuc = function () {
    var e = _ref__ctor.signCfgs[r_PlayerData.PlayerData.data.curSignIndex];
    if (e.type == s.三倍收益) {
      r_PlayerData.PlayerData.data.earnTimestamp[r_CoinSystem.EarnTimeType.倍数] = r_PlayerData.PlayerData.data.earnTimestamp[r_CoinSystem.EarnTimeType.倍数] + r_CoinSystem.CoinSystem.autoAddTime;
    } else if (e.type == s.秘书) {
      r_RoleGirlSystem.RoleGirlSystem.buyRole(e.id);
      r_RoleGirlGetUI.default.showUI({
        roleGirlId: e.id
      });
    } else if (e.type == s.连点器等级) {
      for (var t = 0; t < e.num && !r_CoinSystem.CoinSystem.checkContimieMax(); t++) {
        r_CoinSystem.CoinSystem.setContinue();
      }
    } else if (e.type == s.等级) {
      r_LevelRoleSystem.LevelRoleSystem.upLevel(e.num);
      r_SoundMgr.SoundMgr.playSound("升级成功音效");
    } else if (e.type == s.金币) {
      var i = 300 * r_CoinSystem.CoinSystem.getClickCoin();
      r_PlayerData.PlayerData.addCoin("在线奖励", i, r_ReportSystem.SystemKey.签到);
    } else if (e.type == s.秘书) {
      r_RoleGirlSystem.RoleGirlSystem.buyRole(e.id);
      r_RoleGirlGetUI.default.showUI({
        roleGirlId: e.id
      });
    }
    r_UtilsSystem.UtilsSystem.showTip(e.getDesc);
    r_PlayerData.PlayerData.data.curSignState = r_PlayerData.PlayerData.data.curSignState + 1;
    r_PlayerData.PlayerData.saveData();
    r_PlatformSystem.PlatformSystem.report("sign", {
      day: r_PlayerData.PlayerData.data.curSignIndex + 1
    });
    r_PlayerData.PlayerData.data.SignInStamp = r_TimeSystem.TimeSystem.getServerTime();
    this.refreshUI();
  };
  _ctor.onDayMilSec = 864e5;
  _ctor.signCfgs = [{
    type: s.三倍收益,
    getDesc: "恭喜获得三倍收益"
  }, {
    id: 15,
    type: s.秘书,
    getDesc: "恭喜获得SR秘书",
    noAgain: true
  }, {
    num: 1,
    type: s.连点器等级,
    getDesc: "恭喜获得连点器等级+2"
  }, {
    num: 15,
    type: s.等级,
    getDesc: "恭喜获得玩家等级+15"
  }, {
    type: s.金币,
    getDesc: "恭喜获得海量金币"
  }, {
    num: 30,
    type: s.等级,
    getDesc: "恭喜获得玩家等级+30"
  }, {
    id: 16,
    type: s.秘书,
    getDesc: "恭喜获得SSR秘书",
    noAgain: true
  }];
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDay7")], _ctor.prototype, "btnDay7", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideoGet")], _ctor.prototype, "btnVideoGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("day")], _ctor.prototype, "day", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseLayer.BaseLayer);
exports.SignInUI = exp_SignInUI;