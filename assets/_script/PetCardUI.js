var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetCardUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PetData = require("PetData");
var r_TimeSystem = require("TimeSystem");
var r_PetCardOpenUI = require("PetCardOpenUI");
var r_PetCommon = require("PetCommon");
var exp_PetCardUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetCardUI) || this;
    t.cost = 100;
    t.MaxOpenCount = 5;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetCardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetCardUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.contentPane.getChild("btnOpen1").onClick(function () {
      if (r_PlayerData.PlayerData.deleteDiamond(t.cost, true)) {
        var e = r_PetData.PetData.getData("openCount", 5) - 1;
        r_PetData.PetData.setData("openCount", e);
        t.showOpenCount();
        if (e == t.MaxOpenCount - 1) {
          r_PetData.PetData.setData("openCountTime", Math.floor(Date.now() / 1e3));
          t.downTimeRun();
        }
        r_PetCardOpenUI.PetCardOpenUI.showUI({
          count: 1
        });
      } else {
        r_UtilsSystem.UtilsSystem.showTip("钻石不足");
      }
    }, this);
    this.contentPane.getChild("btnOpen5").onClick(function () {
      if (r_PetData.PetData.getData("firstOpen5")) {
        r_PlatformSystem.PlatformSystem.showVideo("宠物5连抽", function () {
          r_PetCardOpenUI.PetCardOpenUI.showUI({
            count: 5
          });
        });
      } else {
        r_PetData.PetData.setData("firstOpen5", true);
        t.contentPane.getChild("btnOpen5").asCom.getController("type").selectedIndex = 0;
        t.contentPane.getController("c1").selectedIndex = 0;
        r_PetCardOpenUI.PetCardOpenUI.showUI({
          count: 5,
          firstOpen5: true
        });
        r_PetCommon.PetCommon.showGuide(t.contentPane.getChild("guideOpen5"), true);
      }
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.downTimeRun();
    this.showOpenCount();
    var t = r_PetData.PetData.getData("firstOpen5") ? 0 : 1;
    this.contentPane.getChild("btnOpen5").asCom.getController("type").selectedIndex = t;
    this.contentPane.getController("c1").selectedIndex = t;
    this.showSSRTip();
    r_PetCommon.PetCommon.showGuide(this.contentPane.getChild("guideOpen5"));
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("openCountDownTime");
    r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PetInfoUI).showInfo();
    r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PetWeaponUI).initList();
  };
  _ctor.prototype.showSSRTip = function () {
    var e = 50 - r_PetData.PetData.getData("totalOpenCount", 0) % 50;
    var t = Math.ceil(e / 5);
    this.contentPane.getChild("ssrTip5").asTextField.setVar("num", "" + t).flushVars();
    this.contentPane.getChild("ssrTip1").asTextField.setVar("num", "" + e).flushVars();
  };
  _ctor.prototype.showOpenCount = function () {
    var e = r_PetData.PetData.getData("openCount", this.MaxOpenCount);
    this.contentPane.getChild("btnOpen1").asButton.getChild("count").text = e + "/" + this.MaxOpenCount;
    this.contentPane.getChild("btnOpen1").asButton.enabled = e > 0;
  };
  _ctor.prototype.downTimeRun = function () {
    var e = this;
    var t = r_PetData.PetData.getData("openCount", this.MaxOpenCount);
    var o = Math.floor(Date.now() / 1e3);
    var i = o - r_PetData.PetData.getData("openCountTime", o);
    var n = Math.floor(i / 600);
    i %= 600;
    if (n > 0) {
      t = Math.min(t + n, this.MaxOpenCount);
      r_PetData.PetData.setData("openCount", t);
      r_PetData.PetData.setData("openCountTime", o - i);
      this.showOpenCount();
    }
    var a = this.contentPane.getChild("downTime").asTextField;
    a.visible = false;
    if (!(t >= this.MaxOpenCount)) {
      a.visible = true;
      var s = function () {
        var e = 600 - i;
        var t = Math.floor(e % 3600 / 60);
        var o = e % 60;
        a.setVar("time", t.toString().padStart(2, "0") + ":" + o.toString().padStart(2, "0")).flushVars();
      };
      s();
      r_TimeSystem.TimeSystem.registSecondUpdate("openCountDownTime", function () {
        if (++i >= 600) {
          i = 0;
          var t = r_PetData.PetData.getData("openCount", e.MaxOpenCount) + 1;
          r_PetData.PetData.setData("openCount", t);
          r_PetData.PetData.setData("openCountTime", Math.floor(Date.now() / 1e3));
          e.showOpenCount();
          if (t >= e.MaxOpenCount) {
            r_TimeSystem.TimeSystem.unregistSecondUpdate("openCountDownTime");
            a.visible = false;
          }
        }
        s();
      });
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetCardUI = exp_PetCardUI;