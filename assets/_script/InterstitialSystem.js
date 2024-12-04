Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InterstitialSystem = undefined;
var r_UIDef = require("UIDef");
var r_SDKMgr1 = require("SDKMgr1");
var r_Index = require("Index");
var r_GameGuideSystem = require("GameGuideSystem");
var r_PlayerData = require("PlayerData");
var c = function () {
  function e() {
    this.passTime = 0;
    this.m_currTime = 0;
    this.m_maxTime = 300;
  }
  e.prototype.update = function (e) {
    r_PlayerData.PlayerData && r_PlayerData.PlayerData.data && (r_GameGuideSystem.GameGuideSystem.isShowingGuide || (this.passTime = this.passTime + e, this.passTime > 1 && (this.m_currTime += this.passTime, this.passTime = 0, this.m_maxTime <= this.m_currTime && 1 == r_Index.UIWind.curWindList.length && r_Index.UIWind.curWindList.findIndex(function (e) {
      return e.resName == r_UIDef.UIDef.Res.UI.MainHomeUI;
    }) > -1 && (this.m_currTime = 0, r_SDKMgr1.SDKMgr1.showInterstitialAd(null)))));
  };
  return e;
}();
exports.InterstitialSystem = new c();