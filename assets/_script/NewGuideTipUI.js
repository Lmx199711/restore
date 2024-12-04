var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_GroupSystem = require("GroupSystem");
var r_GuideSystem = require("GuideSystem");
var r_IconSystem = require("IconSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_RoleSystem = require("RoleSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_BattleLvelUI = require("BattleLvelUI");
var def_NewGuideTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.NewGuide, r_UIDef.UIDef.Res.UI.NewGuideTipUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.NewGuideTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.NewGuideTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.anim.loop = true;
    this.anim.animationName = "animation";
    this.anim.playing = true;
    this.bindBtnCallback(this.btnBattle, this.btnVideo, this.btnTip);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    r_TimeSystem.TimeSystem.schedule("updateGuideTime", 1, function () {
      t.labTime.text = "倒计时 " + r_RoleSystem.RoleSystem.getNewGuideTime();
    });
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("updateGuideTime");
    if (this.data && this.data.needGuide) {
      this.data.needGuide = false;
      r_IconSystem.IconSystem.flyMainHomeIcon("btnMarry", function () {
        r_GuideSystem.GuideSystem.showFingerStep(cc.v2(0, 130));
      });
    }
  };
  _ctor.prototype.restart = function () {
    if (r_IconSystem.IconSystem.isGuiding) {
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
    }
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("越阶挑战老马", function () {
      e.hide();
      r_BattleLvelUI.default.showUI(999);
    });
  };
  _ctor.prototype.onClickbtnBattle = function () {
    if (r_RoleSystem.RoleSystem.getRoleLevel() < r_GroupSystem.GroupSystem.getRoleCfg()[99].battleLevel) {
      r_UtilsSystem.UtilsSystem.showTip("需要达到等级“正式员工”");
    } else {
      this.hide();
      r_BattleLvelUI.default.showUI(99);
    }
  };
  _ctor.prototype.onClickbtnTip = function () {
    r_UtilsSystem.UtilsSystem.showTip("等升级后再来挑战");
  };
  __decorate([r_DecorateFunction1.AutoFind("labTime")], _ctor.prototype, "labTime", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBattle")], _ctor.prototype, "btnBattle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTip")], _ctor.prototype, "btnTip", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_NewGuideTipUI;