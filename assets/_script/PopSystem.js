Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopSystem = exports._PopSystem = undefined;
var r_UIDef = require("UIDef");
var r_UIWind = require("UIWind");
var r_NewGuideGirlUI = require("NewGuideGirlUI");
var r_BankSystem = require("BankSystem");
var r_EmgcSystem = require("EmgcSystem");
var r_GameGuideSystem = require("GameGuideSystem");
var r_PlayerData = require("PlayerData");
var r_RankSystem = require("RankSystem");
var r_RoleSystem = require("RoleSystem");
var r_SDKMgr1 = require("SDKMgr1");
var exp__PopSystem = function () {
  function _ctor() {
    this.isShowRankPaper = false;
    this.enterCallList = [];
    this.curEnterIndex = 0;
  }
  _ctor.prototype.init = function () {
    r_UIWind.UIWind.popSystem = this;
  };
  _ctor.prototype.checkShowRankPaper = function () {
    var e = this;
    return !exports.PopSystem.isShowRankPaper && !!r_PlayerData.PlayerData.data && (r_RankSystem.RankSystem.getAreaRank(function (t) {
      if (t) {
        if (r_PlayerData.PlayerData.data.guideIndex < 2) {
          return void e.triggerNext();
        }
        if (r_RankSystem.RankSystem.rankList.length < 0) {
          return void e.triggerNext();
        }
        exports.PopSystem.isShowRankPaper = true;
      }
    }), true);
  };
  _ctor.prototype.enterMainUI = function () {
    r_EmgcSystem.EmgcSystem.checkTriggerEmgc();
    this.enterCallList = [];
    this.curEnterIndex = 0;
    this.enterCallList.push(r_EmgcSystem.EmgcSystem.checkShowEmgcUI.bind(r_EmgcSystem.EmgcSystem));
    this.triggerNext();
    r_BankSystem.BankSystem.triggerNext();
  };
  _ctor.prototype.triggerNext = function () {
    if (!(this.curEnterIndex >= this.enterCallList.length)) {
      for (var e = this.curEnterIndex; e < this.enterCallList.length; e++) {
        var t = this.enterCallList[e];
        if (t && t()) {
          return void (this.curEnterIndex = e + 1);
        }
      }
    }
  };
  _ctor.prototype.checkNewGuideMsg = function () {
    r_GameGuideSystem.GameGuideSystem.checkGuide();
  };
  _ctor.prototype.checkNewGuideBattle = function () {
    if (r_UIWind.UIWind.curMainUI == r_UIDef.UIDef.Res.UI.MainHomeUI && 1 == r_UIWind.UIWind.curWindList.length && 1 == r_RoleSystem.RoleSystem.getRoleLevel() && 0 == r_RoleSystem.RoleSystem.getCurDiamondNum() && 0 == r_PlayerData.PlayerData.data.onceBattle) {
      r_PlayerData.PlayerData.data.onceBattle = 1;
      r_PlayerData.PlayerData.saveData();
      r_NewGuideGirlUI.default.showUI({
        content: "尝试下“升级挑战”吧，每次挑战成功后可以进行一次免费的抽奖",
        callBack: function () {}
      });
    }
  };
  _ctor.prototype.showGameClubButton = function () {
    r_SDKMgr1.SDKMgr1.showGameClubButton();
  };
  _ctor.prototype.hideGameClubButton = function () {
    r_SDKMgr1.SDKMgr1.hideGameClubButton();
  };
  return _ctor;
}();
exports._PopSystem = exp__PopSystem;
exports.PopSystem = new exp__PopSystem();