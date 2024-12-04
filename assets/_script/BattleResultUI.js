var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_RoleSystem = require("RoleSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_RoleCfg = require("RoleCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_BattleDebugUI = require("BattleDebugUI");
var def_BattleResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Battle, r_UIDef.UIDef.Res.UI.BattleResultUI) || this;
    t.showAnimFlag = true;
    t.labNums = [];
    t.debugNum = null;
    t.debugUnit = null;
    t.initSpeed = .001;
    t.addSpeed = .001;
    t.allTime = .6;
    t.m_units = ["元", "万", "亿"];
    t.m_unitNum = [1, 1e4, 1e8];
    t.m_sortNum = 0;
    t.m_sortUnit = 0;
    t.m_indexs = [3, 2, 1, 0, 4];
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
    this.show(r_UIDef.UIDef.Urls.UI.BattleResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BattleResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    for (var t = 0; t < 5; t++) {
      var o = this.contentPane.getChild("num" + t);
      this.labNums.push(o);
    }
    this.bindBtnCallback(this.btnStart, this.btnDebug);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.stopSound("monopoly/支票数字滚动");
  };
  _ctor.prototype.restart = function () {
    for (var e = 3; e >= 0; e--) {
      this.labNums[e].text = "0";
    }
    this.labNums[4].text = "";
    this.btnStart.enabled = true;
    this.debugUnit = null;
    this.debugNum = null;
  };
  _ctor.prototype.getSortNum = function () {
    this.m_sortNum > 9 && (this.m_sortNum = 0);
    return this.m_sortNum++;
  };
  _ctor.prototype.getSortUnit = function () {
    this.m_sortUnit >= this.m_units.length && (this.m_sortUnit = 0);
    return this.m_sortUnit++;
  };
  _ctor.prototype.setView = function () {
    var e;
    var t;
    var o = this;
    this.btnStart.enabled = false;
    var i = r_RoleCfg.BattleSuccAwardCfg[r_RoleSystem.RoleSystem.getRoleLevel()];
    if (null != this.debugNum) {
      e = this.debugNum;
      t = e + this.m_units[this.debugUnit];
    } else {
      e = r_UtilsSystem.UtilsSystem.getRandomNum(i.award[0], i.award[1]);
      t = e + this.m_units[i.danwei];
    }
    if (t.length < 5) {
      var n = 5 - t.length;
      for (var a = 0; a < n; a++) {
        t = "0" + t;
      }
    }
    var s = 0;
    var d = 0;
    var y = this.initSpeed;
    var m = function () {
      r_SoundMgr.SoundMgr.playSound("battle/支票数字滚动");
      r_TimeSystem.TimeSystem.timeMapUpdate("randomCoin", o.allTime, function (n) {
        d > 1 && (d = 1);
        if (!(1 != n && n < d)) {
          var a;
          var l = o.m_indexs[s];
          a = l < 4 ? o.getSortNum() + "" : o.m_units[o.getSortUnit()];
          var u = o.labNums[l];
          y += o.addSpeed;
          u.text = a;
          d += y;
          if (1 == n) {
            u.text = t.substring(l, l + 1);
            cc.tween(o).delay(.5).call(function () {
              d = 0;
              y = o.initSpeed;
              if (++s < o.m_indexs.length) {
                m();
              } else {
                r_PlayerData.PlayerData.addCoin("获得挑战奖励", e * o.m_unitNum[null != o.debugUnit ? o.debugUnit : i.danwei], r_ReportSystem.SystemKey.挑战奖励);
                o.end();
              }
            }).start();
          }
        }
      });
    };
    m();
  };
  _ctor.prototype.end = function () {
    var e = this;
    r_TimeSystem.TimeSystem.scheduleOnce("battleAward", 2, function () {
      e.hide();
      e.data.awardCompleteFun && e.data.awardCompleteFun();
    });
  };
  _ctor.prototype.onClickbtnStart = function () {
    this.setView();
  };
  _ctor.prototype.onClickbtnDebug = function () {
    r_Index.Platform.isDarenPlatform() && r_BattleDebugUI.default.showUI({
      ui: this
    });
  };
  _ctor.prototype.setDebugNum = function (e, t) {
    this.debugNum = e;
    this.debugUnit = t;
  };
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDebug")], _ctor.prototype, "btnDebug", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BattleResultUI;