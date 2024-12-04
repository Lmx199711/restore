var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_CoinSystem = require("CoinSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_BattleLevelNewUI = require("BattleLevelNewUI");
var r_BattleUpUI = require("BattleUpUI");
var def_BattleFailUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Battle, r_UIDef.UIDef.Res.UI.BattleFailUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.BattleFailUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BattleFailUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBack, this.btnRestart, this.btnVideo);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.btnVideo.visible = true;
    this.refreshContinue();
  };
  _ctor.prototype.refreshContinue = function () {
    var e = r_CoinSystem.CoinSystem.showContinueCoff();
    this.labContine.text = "一次点击=" + e + "次";
    if (r_CoinSystem.CoinSystem.checkContimieMax()) {
      this.btnContine.getController("max").selectedIndex = 1;
      this.btnVideo.visible = false;
    } else {
      this.btnContine.getController("max").selectedIndex = 0;
    }
    this.btnContine.title = r_CoinSystem.CoinSystem.showContinueCoff() ? "X" + r_CoinSystem.CoinSystem.showContinueCoff() : "MAX";
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.hide();
    r_BattleLevelNewUI.default.hide();
  };
  _ctor.prototype.onClickbtnRestart = function () {
    this.hide();
    r_BattleLevelNewUI.default.Inst && r_BattleLevelNewUI.default.Inst.restart();
    r_BattleUpUI.default.instace && r_BattleUpUI.default.instace.hide();
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    if (r_CoinSystem.CoinSystem.checkContimieMax()) {
      r_UtilsSystem.UtilsSystem.showTip("已是最高点击收益");
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("增加连点收益", function () {
        r_CoinSystem.CoinSystem.setContinue();
        r_UtilsSystem.UtilsSystem.showTip("连点器升级成功");
        e.refreshContinue();
      });
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRestart")], _ctor.prototype, "btnRestart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labContine")], _ctor.prototype, "labContine", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnContine")], _ctor.prototype, "btnContine", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_BattleFailUI;