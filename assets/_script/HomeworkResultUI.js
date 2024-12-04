var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_HomeworkUI = require("HomeworkUI");
var def_HomeworkResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Homework, r_UIDef.UIDef.Res.UI.HomeworkResultUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.HomeworkResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HomeworkResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnRestart, this.btnGet, this.btnDouble, this.btnClose);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data.index;
  };
  _ctor.prototype.onClickbtnRestart = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("寒假作业重开游戏", function () {
      e.hide();
      r_HomeworkUI.default.Inst && r_HomeworkUI.default.Inst.restart();
    });
  };
  _ctor.prototype.onClickbtnGet = function () {
    r_PlayerData.PlayerData.addCoin("领取寒假作业", 5e6, r_ReportSystem.SystemKey.寒假作业);
    this.hide();
    r_HomeworkUI.default.hide();
  };
  _ctor.prototype.onClickbtnDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双倍领取寒假作业奖励", function () {
      r_PlayerData.PlayerData.addCoin("领取寒假作业", 1e7, r_ReportSystem.SystemKey.寒假作业);
      e.hide();
      r_HomeworkUI.default.hide();
    });
  };
  _ctor.prototype.onClickbtnClose = function () {
    this.hide();
    r_HomeworkUI.default.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnRestart")], _ctor.prototype, "btnRestart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_HomeworkResultUI;