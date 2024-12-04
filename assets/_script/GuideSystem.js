Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideSystem = exports._GuideSystem = undefined;
var r_RoleCfg = require("RoleCfg");
var r_MainHomeUI = require("MainHomeUI");
var r_BridePriceUI = require("BridePriceUI");
require("GuideMsgUI");
require("GuideStartUI");
var r_NewGuideChatUI = require("NewGuideChatUI");
var r_NewGuideGirlUI = require("NewGuideGirlUI");
var r_NewGuidePaperUI = require("NewGuidePaperUI");
var r_IconSystem = require("IconSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var exp__GuideSystem = function () {
  function _ctor() {
    this.guideStateMap = {};
    this.finger = null;
    this.guideType = "";
  }
  _ctor.prototype.checkGuideMsg = function () {
    return false;
  };
  _ctor.prototype.setGuideState = function (e, t) {
    this.guideStateMap[e] = t;
  };
  _ctor.prototype.getGuideState = function (e) {
    return this.guideStateMap[e];
  };
  _ctor.prototype.checkFinishMsg = function () {};
  _ctor.prototype.checkNewGuideMsg = function () {
    if (r_PlayerData.PlayerData.data.newGuideStep <= 0) {
      r_IconSystem.IconSystem.startGuide();
      r_NewGuideChatUI.default.showUI();
      return true;
    } else {
      return !(1 != r_PlayerData.PlayerData.data.newGuideStep || !r_PlayerData.PlayerData.data.newGuideBattle || (r_BridePriceUI.default.showUI(), 0));
    }
  };
  _ctor.prototype.finishNewGuide = function () {
    r_PlayerData.PlayerData.data.newGuideStep = 1;
    r_PlayerData.PlayerData.data.newGuideTime = r_RoleCfg.BattleTime;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.finishNewGuide2 = function () {
    r_PlayerData.PlayerData.data.newGuideStep = 2;
    r_PlayerData.PlayerData.data.newGuideTime2 = r_RoleCfg.BirdeTime;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.showFingerStep = function (e) {
    var t = this;
    this.guideType = "";
    this.showFinger(e, r_MainHomeUI.default.Inst.role.node);
    r_NewGuideGirlUI.default.showUI({
      content: "点击屏幕,获得钻石后可以提升地位",
      callBack: function () {}
    });
    r_TimeSystem.TimeSystem.scheduleClear("showFingerStep");
    r_TimeSystem.TimeSystem.scheduleOnce("showFingerStep", 10, function () {
      "guidePhone" != t.guideType && t.hideFingerStep();
    });
  };
  _ctor.prototype.showFinger = function (e, t) {
    var o = this;
    r_ResSystem.ResSystem.loadBundleRes("game3", "finger", cc.Prefab, function (i, n) {
      o.finger && o.finger.destroy();
      o.finger = null;
      o.finger = cc.instantiate(n);
      t.addChild(o.finger);
      o.finger.active = true;
      o.finger.zIndex = 10;
      o.finger.x = e.x;
      o.finger.y = e.y;
    });
  };
  _ctor.prototype.hideFinger = function () {
    return !!this.finger && (this.finger && this.finger.destroy(), this.finger = null, true);
  };
  _ctor.prototype.hideFingerStep = function () {
    var e = this;
    if (this.hideFinger()) {
      exports.GuideSystem.setGuideState("guidePhone", true);
      this.guideType = "guidePhone";
      r_IconSystem.IconSystem.flyMainHomeIcon("btnPhone", function () {
        var t = r_MainHomeUI.default.instance.btnPhone.node;
        var o = cc.v2(0, 0);
        e.showFinger(o, t);
      });
    }
  };
  _ctor.prototype.enterMainUI = function () {
    if (exports.GuideSystem.getGuideState("guideMain")) {
      exports.GuideSystem.setGuideState("guideMain", false);
      setTimeout(function () {
        r_NewGuideGirlUI.default.showUI({
          content: "每个建筑里都有赚钱的机遇,等你早日逆袭哦~",
          callBack: function () {}
        });
      }, 10);
    }
  };
  _ctor.prototype.onChatUIHide = function () {
    if (exports.GuideSystem.getGuideState("guidePhone")) {
      exports.GuideSystem.setGuideState("guidePhone", false);
      exports.GuideSystem.setGuideState("guideMain", true);
      r_NewGuidePaperUI.default.showUI();
      this.hideFinger();
    }
  };
  return _ctor;
}();
exports._GuideSystem = exp__GuideSystem;
exports.GuideSystem = new exp__GuideSystem();