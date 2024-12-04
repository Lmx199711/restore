var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_CoinSystem = require("CoinSystem");
var r_LevelRoleSystem = require("LevelRoleSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_OnlineCfg = require("OnlineCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_TouchGiftCom = require("TouchGiftCom");
var def_OnlineGiftUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Online, r_UIDef.UIDef.Res.UI.OnlineGiftUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.OnlineGiftUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.OnlineGiftUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBack);
    this.list.itemRenderer = this.onListRendererItem.bind(this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.list.numItems = r_OnlineCfg.OnlineCfg.length;
    r_TimeSystem.TimeSystem.registSecondUpdate("onlineGiftUI", function () {
      t.list.numItems = r_OnlineCfg.OnlineCfg.length;
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("onlineGiftUI");
  };
  _ctor.prototype.onListRendererItem = function (e, t) {
    var o = this;
    var i = r_OnlineCfg.OnlineCfg[e];
    t.getChild("icon").url = "ui://Online/icon" + i.type;
    t.getChild("time").text = "在线" + i.time + "分钟";
    t.getChild("content").text = i.content;
    if (i.type == r_OnlineCfg.OnlineGiftType.金币) {
      var n = 25 * r_CoinSystem.CoinSystem.getClickCoin();
      t.getChild("content").text = "金币+" + r_UtilsSystem.UtilsSystem.getShowCoin(n, 1);
    }
    if (Math.floor(r_PlayerData.PlayerData.data.onlinePassTime / 60) >= i.time) {
      if (-1 == r_PlayerData.PlayerData.data.onlineGetList.indexOf(i.id)) {
        if (i.video) {
          t.getController("state").selectedIndex = 2;
        } else {
          t.getController("state").selectedIndex = 1;
        }
      } else {
        t.getController("state").selectedIndex = 3;
      }
    } else {
      t.getChild("leftTime").text = this.getHourMinTime(60 * i.time - r_PlayerData.PlayerData.data.onlinePassTime);
      t.getController("state").selectedIndex = 0;
    }
    t.getChild("btnVideo").clearClick();
    t.getChild("btnVideo").onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      r_PlatformSystem.PlatformSystem.showVideo("在线奖励", function () {
        o.getReward(i);
        o.onListRendererItem(e, t);
      });
    }, this);
    t.getChild("btnGet").clearClick();
    t.getChild("btnGet").onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      o.getReward(i);
      o.onListRendererItem(e, t);
    }, this);
  };
  _ctor.prototype.getHourMinTime = function (e) {
    var t = e;
    var o = Math.floor(t / 3600);
    var i = Math.floor(t % 3600 / 60);
    var n = t % 60;
    var a = "";
    if (o > 0) {
      o < 10 && (o = "0" + o);
      a = a + o + ":";
    }
    i < 10 && (i = "0" + i);
    n < 10 && (n = "0" + n);
    return (a = a + i + ":") + n;
  };
  _ctor.prototype.getReward = function (e) {
    if (-1 == r_PlayerData.PlayerData.data.onlineGetList.indexOf(e.id)) {
      r_PlayerData.PlayerData.data.onlineGetList.push(e.id);
      if (e.type == r_OnlineCfg.OnlineGiftType.金币) {
        var t = 25 * r_CoinSystem.CoinSystem.getClickCoin();
        r_PlayerData.PlayerData.addCoin("在线奖励", t);
      } else if (e.type == r_OnlineCfg.OnlineGiftType.宝箱) {
        for (var o = 0; o < 5; o++) {
          var i = r_TouchGiftCom.TouchGiftCom.Inst.getGiftIndex();
          if (-1 == i) {
            return;
          }
          r_TouchGiftCom.TouchGiftCom.Inst.m_hasGiftNum++;
          r_TouchGiftCom.TouchGiftCom.Inst.showGift(i);
        }
      } else if (e.type == r_OnlineCfg.OnlineGiftType.自动点击) {
        r_CoinSystem.CoinSystem.setAutoTime(r_CoinSystem.EarnTimeType.自动);
      } else if (e.type == r_OnlineCfg.OnlineGiftType.升级) {
        r_LevelRoleSystem.LevelRoleSystem.upLevel(e.num);
        r_SoundMgr.SoundMgr.playSound("升级成功音效");
        r_UtilsSystem.UtilsSystem.showTip("升级成功!");
      }
    }
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_OnlineGiftUI;